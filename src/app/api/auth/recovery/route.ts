import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';
import { generateResetToken } from '@/lib/auth';
import { sanitizeInput, isValidEmail, checkApiRateLimit, getClientIp, addSecurityHeaders } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIp(request);
    const canProceed = await checkApiRateLimit(ip);
    if (!canProceed) {
      return NextResponse.json(
        { error: 'Muitas tentativas. Tente novamente em 15 minutos.' },
        { status: 429 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { email } = body;

    // Validações
    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      );
    }

    // Sanitizar email
    const sanitizedEmail = sanitizeInput(email.toLowerCase());

    // Validar formato de email
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Buscar usuário
    const user = await User.findOne({ email: sanitizedEmail });
    
    // Por segurança, sempre retornar sucesso mesmo se usuário não existir
    // Isso evita que atacantes descubram quais emails estão cadastrados
    if (!user) {
      const response = NextResponse.json(
        { message: 'Se o email estiver cadastrado, você receberá instruções para recuperar sua senha.' },
        { status: 200 }
      );
      return addSecurityHeaders(response);
    }

    // Gerar token de reset
    const resetToken = generateResetToken();
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    // Salvar token no usuário
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;
    await user.save();

    // TODO: Enviar email com link de reset
    // const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
    // await sendPasswordResetEmail(user.email, resetUrl);

    const response = NextResponse.json(
      { 
        message: 'Se o email estiver cadastrado, você receberá instruções para recuperar sua senha.',
        // Em desenvolvimento, retornar o token (REMOVER EM PRODUÇÃO)
        ...(process.env.NODE_ENV === 'development' && { resetToken })
      },
      { status: 200 }
    );

    return addSecurityHeaders(response);
  } catch (error: any) {
    console.error('Erro na recuperação de senha:', error);
    return NextResponse.json(
      { error: 'Erro ao processar solicitação. Tente novamente.' },
      { status: 500 }
    );
  }
}

// Rota para resetar a senha com o token
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { token, newPassword } = body;

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Token e nova senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar usuário com token válido
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Token inválido ou expirado' },
        { status: 400 }
      );
    }

    // Validar nova senha
    const { isStrongPassword } = await import('@/lib/security');
    if (!isStrongPassword(newPassword)) {
      return NextResponse.json(
        { error: 'Senha deve ter no mínimo 8 caracteres, incluindo maiúsculas, minúsculas e números' },
        { status: 400 }
      );
    }

    // Hash da nova senha
    const { hashPassword } = await import('@/lib/auth');
    user.password = await hashPassword(newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    const response = NextResponse.json(
      { message: 'Senha alterada com sucesso' },
      { status: 200 }
    );

    return addSecurityHeaders(response);
  } catch (error: any) {
    console.error('Erro ao resetar senha:', error);
    return NextResponse.json(
      { error: 'Erro ao resetar senha. Tente novamente.' },
      { status: 500 }
    );
  }
}
