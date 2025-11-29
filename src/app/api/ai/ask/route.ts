import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import AILog from '@/lib/models/AILog';
import { verifyAccessToken, extractTokenFromHeader } from '@/lib/auth';
import { sanitizeInput, checkAIRateLimit, getClientIp, addSecurityHeaders, containsDangerousContent } from '@/lib/security';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Você é um assistente de saúde do aplicativo SafeCycle, especializado em fornecer informações educacionais sobre substâncias e ciclos.

REGRAS IMPORTANTES:
1. NUNCA diagnostique condições médicas
2. NUNCA prescreva medicamentos ou dosagens
3. SEMPRE recomende consultar um profissional de saúde qualificado
4. Forneça informações educacionais baseadas em evidências
5. Seja claro sobre riscos e efeitos colaterais
6. Incentive práticas seguras e responsáveis
7. Se detectar conteúdo perigoso (suicídio, overdose), responda com empatia e encaminhe para ajuda profissional

IMPORTANTE: Sempre termine suas respostas com:
"⚠️ Este aplicativo não substitui acompanhamento médico profissional. Sempre consulte um profissional qualificado antes de tomar qualquer decisão sobre sua saúde."`;

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    
    // Rate limiting específico para IA (10 perguntas por hora)
    const canProceed = await checkAIRateLimit(ip);
    if (!canProceed) {
      return NextResponse.json(
        { error: 'Limite de perguntas excedido. Você pode fazer até 10 perguntas por hora.' },
        { status: 429 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { question } = body;

    if (!question || question.trim().length === 0) {
      return NextResponse.json(
        { error: 'Pergunta é obrigatória' },
        { status: 400 }
      );
    }

    if (question.length > 2000) {
      return NextResponse.json(
        { error: 'Pergunta muito longa. Máximo 2000 caracteres.' },
        { status: 400 }
      );
    }

    // Sanitizar pergunta
    const sanitizedQuestion = sanitizeInput(question);

    // Detectar conteúdo perigoso
    const dangerCheck = containsDangerousContent(sanitizedQuestion);
    
    let answer = '';
    let flagged = false;
    let flagReason = '';

    if (dangerCheck.dangerous) {
      flagged = true;
      flagReason = dangerCheck.reason || 'Conteúdo perigoso detectado';
      
      // Resposta empática para conteúdo perigoso
      answer = `Percebo que você pode estar passando por um momento difícil. É muito importante que você busque ajuda profissional imediatamente.

🆘 RECURSOS DE AJUDA:
• CVV (Centro de Valorização da Vida): 188 (24h, gratuito)
• CAPS (Centro de Atenção Psicossocial): Busque a unidade mais próxima
• UPA/Pronto Socorro: Em caso de emergência

Você não está sozinho. Profissionais qualificados podem te ajudar a superar este momento.

⚠️ Este aplicativo não substitui acompanhamento médico profissional. Por favor, procure ajuda especializada.`;
    } else {
      // Chamar OpenAI para resposta
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: sanitizedQuestion },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        });

        answer = completion.choices[0]?.message?.content || 'Desculpe, não consegui processar sua pergunta.';
      } catch (aiError: any) {
        console.error('Erro ao chamar OpenAI:', aiError);
        answer = 'Desculpe, estou com dificuldades técnicas no momento. Por favor, tente novamente mais tarde ou consulte um profissional de saúde.';
      }
    }

    // Obter userId se autenticado
    let userId = null;
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader) || request.cookies.get('accessToken')?.value;
    
    if (token) {
      const payload = verifyAccessToken(token);
      if (payload) {
        userId = payload.userId;
      }
    }

    // Salvar log da interação
    await AILog.create({
      userId,
      ipAddress: ip,
      question: sanitizedQuestion,
      answer,
      flagged,
      flagReason: flagged ? flagReason : undefined,
    });

    const response = NextResponse.json(
      {
        answer,
        flagged,
        warning: 'Sempre consulte um profissional qualificado. O aplicativo não substitui acompanhamento médico.',
      },
      { status: 200 }
    );

    return addSecurityHeaders(response);
  } catch (error: any) {
    console.error('Erro na API de IA:', error);
    return NextResponse.json(
      { error: 'Erro ao processar pergunta. Tente novamente.' },
      { status: 500 }
    );
  }
}
