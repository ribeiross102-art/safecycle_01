import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import validator from 'validator';

// Rate limiters
const loginLimiter = new RateLimiterMemory({
  points: 5, // 5 tentativas
  duration: 15 * 60, // por 15 minutos
});

const apiLimiter = new RateLimiterMemory({
  points: 100, // 100 requests
  duration: 15 * 60, // por 15 minutos
});

const aiLimiter = new RateLimiterMemory({
  points: 10, // 10 perguntas
  duration: 60 * 60, // por hora
});

// Obter IP do cliente
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown';
  return ip;
}

// Rate limiting para login
export async function checkLoginRateLimit(ip: string): Promise<boolean> {
  try {
    await loginLimiter.consume(ip);
    return true;
  } catch {
    return false;
  }
}

// Rate limiting para API geral
export async function checkApiRateLimit(ip: string): Promise<boolean> {
  try {
    await apiLimiter.consume(ip);
    return true;
  } catch {
    return false;
  }
}

// Rate limiting para IA
export async function checkAIRateLimit(ip: string): Promise<boolean> {
  try {
    await aiLimiter.consume(ip);
    return true;
  } catch {
    return false;
  }
}

// Sanitizar entrada de texto
export function sanitizeInput(input: string): string {
  // Remove tags HTML
  let sanitized = validator.stripLow(input);
  sanitized = validator.escape(sanitized);
  return sanitized.trim();
}

// Validar email
export function isValidEmail(email: string): boolean {
  return validator.isEmail(email);
}

// Validar senha forte
export function isStrongPassword(password: string): boolean {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  });
}

// Headers de segurança
export function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
  );
  return response;
}

// Detectar conteúdo perigoso para IA
export function containsDangerousContent(text: string): { dangerous: boolean; reason?: string } {
  const dangerousPatterns = [
    { pattern: /suicid/i, reason: 'Conteúdo relacionado a suicídio' },
    { pattern: /overdose/i, reason: 'Conteúdo relacionado a overdose' },
    { pattern: /como morrer/i, reason: 'Conteúdo perigoso' },
    { pattern: /matar(-| )se/i, reason: 'Conteúdo de autoagressão' },
  ];

  for (const { pattern, reason } of dangerousPatterns) {
    if (pattern.test(text)) {
      return { dangerous: true, reason };
    }
  }

  return { dangerous: false };
}
