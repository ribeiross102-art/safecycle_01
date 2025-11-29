import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';
import { hashPassword, generateAccessToken, generateRefreshToken, generateVerificationToken } from '@/lib/auth';
import { sanitizeInput, isValidEmail, isStrongPassword, checkApiRateLimit, getClientIp, addSecurityHeaders } from '@/lib/security';

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
    const { name, email, password, termsAccepted, privacyAccepted } = body;

    // Validações
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    if (!termsAccepted || !privacyAccepted) {
      return NextResponse.json(
        { error: 'Você deve aceitar os Termos de Uso e Política de Privacidade' },
        { status: 400 }
      );
    }

    // Sanitizar inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email.toLowerCase());

    // Validar email
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Validar senha forte
    if (!isStrongPassword(password)) {
      return NextResponse.json(
        { error: 'Senha deve ter no mínimo 8 caracteres, incluindo maiúsculas, minúsculas e números' },
        { status: 400 }
      );
    }

    // Verificar se usuário já existe
    const existingUser = await User.findOne({ email: sanitizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 409 }
      );
    }

    // Hash da senha
    const hashedPassword = await hashPassword(password);

    // Gerar token de verificação
    const verificationToken = generateVerificationToken();

    // Criar usuário
    const user = await User.create({
      name: sanitizedName,
      email: sanitizedEmail,
      password: hashedPassword,
      verificationToken,
      termsAccepted: true,
      termsAcceptedAt: new Date(),
      privacyAccepted: true,
      privacyAcceptedAt: new Date(),
      emailVerified: false,
    });

    // Gerar tokens JWT
    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      email: user.email,
    });

    // TODO: Enviar email de verificação
    // await sendVerificationEmail(user.email, verificationToken);

    const response = NextResponse.json(
      {
        message: 'Cadastro realizado com sucesso',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
        },
        accessToken,
        refreshToken,
      },
      { status: 201 }
    );

    // Adicionar headers de segurança
    addSecurityHeaders(response);

    // Definir cookies
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutos
      path: '/',
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 dias
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Erro no registro:', error);
    return NextResponse.json(
      { error: 'Erro ao criar conta. Tente novamente.' },
      { status: 500 }
    );
  }
}
