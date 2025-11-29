import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Report from '@/lib/models/Report';
import { verifyAccessToken, extractTokenFromHeader } from '@/lib/auth';
import { sanitizeInput, checkApiRateLimit, getClientIp, addSecurityHeaders } from '@/lib/security';

// POST - Criar relatório
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const canProceed = await checkApiRateLimit(ip);
    if (!canProceed) {
      return NextResponse.json({ error: 'Rate limit excedido' }, { status: 429 });
    }

    // Verificar autenticação
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader) || request.cookies.get('accessToken')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const payload = verifyAccessToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const { deviceId, dosageTaken, sideEffects, mood, energy, sleep, notes } = body;

    // Validações
    if (!deviceId || !dosageTaken) {
      return NextResponse.json(
        { error: 'Device ID e dosagem são obrigatórios' },
        { status: 400 }
      );
    }

    // Sanitizar inputs
    const sanitizedData = {
      userId: payload.userId,
      deviceId,
      date: new Date(),
      dosageTaken: sanitizeInput(dosageTaken),
      sideEffects: sideEffects?.map((effect: string) => sanitizeInput(effect)),
      mood,
      energy,
      sleep,
      notes: notes ? sanitizeInput(notes) : undefined,
    };

    // Criar relatório
    const report = await Report.create(sanitizedData);

    const response = NextResponse.json(
      { message: 'Relatório criado com sucesso', report },
      { status: 201 }
    );
    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Erro ao criar relatório:', error);
    return NextResponse.json({ error: 'Erro ao criar relatório' }, { status: 500 });
  }
}

// GET - Listar relatórios
export async function GET(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const canProceed = await checkApiRateLimit(ip);
    if (!canProceed) {
      return NextResponse.json({ error: 'Rate limit excedido' }, { status: 429 });
    }

    // Verificar autenticação
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader) || request.cookies.get('accessToken')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const payload = verifyAccessToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    await connectDB();

    // Buscar relatórios do usuário
    const reports = await Report.find({ userId: payload.userId })
      .populate('deviceId')
      .sort({ date: -1 })
      .limit(50);

    const response = NextResponse.json({ reports }, { status: 200 });
    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Erro ao listar relatórios:', error);
    return NextResponse.json({ error: 'Erro ao buscar relatórios' }, { status: 500 });
  }
}
