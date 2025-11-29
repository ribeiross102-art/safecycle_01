'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Lock, Mail, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      // Login bem-sucedido
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#D60000] mb-2">SafeCycle</h1>
          <p className="text-gray-400">Segurança em primeiro lugar</p>
        </div>

        {/* Card de Login */}
        <div className="bg-[#111111] border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Entrar na sua conta</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="pl-10 bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-[#D60000] focus:ring-[#D60000]"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-[#D60000] focus:ring-[#D60000]"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/recovery"
                className="text-sm text-[#D60000] hover:text-red-400 transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D60000] hover:bg-red-700 text-white font-semibold py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Não tem uma conta?{' '}
              <Link href="/register" className="text-[#D60000] hover:text-red-400 font-semibold transition-colors">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Ao continuar, você concorda com nossos{' '}
            <Link href="/terms" className="text-[#D60000] hover:underline">
              Termos de Uso
            </Link>{' '}
            e{' '}
            <Link href="/privacy" className="text-[#D60000] hover:underline">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
