import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';
import { comparePassword, generateAccessToken, generateRefreshToken } from '@/lib/auth';
import { sanitizeInput, isValidEmail, checkLoginRateLimit, getClientIp, addSecurityHeaders } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting específico para login
    const ip = getClientIp(request);
    const canProceed = await checkLoginRateLimit(ip);
    if (!canProceed) {
      return NextResponse.json(
        { error: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
        { status: 429 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { email, password } = body;

    // Validações básicas
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Sanitizar email
    const sanitizedEmail = sanitizeInput(email.toLowerCase());

    // Validar formato de email
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Email ou senha inválidos' },
        { status: 401 }
      );
    }

    // Buscar usuário
    const user = await User.findOne({ email: sanitizedEmail });
    if (!user) {
      return NextResponse.json(
        { error: 'Email ou senha inválidos' },
        { status: 401 }
      );
    }

    // Verificar senha
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Email ou senha inválidos' },
        { status: 401 }
      );
    }

    // Gerar tokens JWT
    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      email: user.email,
    });

    const response = NextResponse.json(
      {
        message: 'Login realizado com sucesso',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
        },
        accessToken,
        refreshToken,
      },
      { status: 200 }
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
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro ao fazer login. Tente novamente.' },
      { status: 500 }
    );
  }
}
