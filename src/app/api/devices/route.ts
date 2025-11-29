import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Device from '@/lib/models/Device';
import { verifyAccessToken, extractTokenFromHeader } from '@/lib/auth';
import { sanitizeInput, checkApiRateLimit, getClientIp, addSecurityHeaders } from '@/lib/security';

// GET - Listar dispositivos do usuário
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

    // Buscar dispositivos do usuário
    const devices = await Device.find({ userId: payload.userId }).sort({ createdAt: -1 });

    const response = NextResponse.json({ devices }, { status: 200 });
    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Erro ao listar dispositivos:', error);
    return NextResponse.json({ error: 'Erro ao buscar dispositivos' }, { status: 500 });
  }
}

// POST - Adicionar novo dispositivo
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
    const { name, type, substance, concentration, dosage, frequency, startDate, notes } = body;

    // Validações
    if (!name || !type || !substance || !concentration || !dosage || !frequency) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando' },
        { status: 400 }
      );
    }

    // Sanitizar inputs
    const sanitizedData = {
      userId: payload.userId,
      name: sanitizeInput(name),
      type,
      substance: sanitizeInput(substance),
      concentration: sanitizeInput(concentration),
      dosage: sanitizeInput(dosage),
      frequency: sanitizeInput(frequency),
      startDate: startDate ? new Date(startDate) : new Date(),
      notes: notes ? sanitizeInput(notes) : undefined,
      active: true,
    };

    // Criar dispositivo
    const device = await Device.create(sanitizedData);

    const response = NextResponse.json(
      { message: 'Dispositivo adicionado com sucesso', device },
      { status: 201 }
    );
    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Erro ao adicionar dispositivo:', error);
    return NextResponse.json({ error: 'Erro ao adicionar dispositivo' }, { status: 500 });
  }
}
