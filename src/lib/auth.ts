import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';

export interface TokenPayload {
  userId: string;
  email: string;
}

// Gerar token de acesso (15 minutos)
export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '15m',
  });
}

// Gerar refresh token (7 dias)
export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });
}

// Verificar token de acesso
export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

// Verificar refresh token
export function verifyRefreshToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

// Hash de senha
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

// Comparar senha
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Gerar token de verificação
export function generateVerificationToken(): string {
  return nanoid(32);
}

// Gerar token de reset de senha
export function generateResetToken(): string {
  return nanoid(32);
}

// Extrair token do header Authorization
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}
