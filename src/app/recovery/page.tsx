'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Mail, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function RecoveryPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch('/api/auth/recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar email');
      }

      setSuccess(true);
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
          <p className="text-gray-400">Recuperação de senha</p>
        </div>

        {/* Card de Recuperação */}
        <div className="bg-[#111111] border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#D60000] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para login
          </Link>

          <h2 className="text-2xl font-bold text-white mb-2">Esqueceu sua senha?</h2>
          <p className="text-gray-400 mb-6">
            Digite seu email e enviaremos instruções para redefinir sua senha.
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          {success ? (
            <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-6 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Email enviado!</h3>
              <p className="text-sm text-gray-300 mb-4">
                Se o email estiver cadastrado, você receberá instruções para recuperar sua senha.
              </p>
              <p className="text-xs text-gray-400">
                Não recebeu? Verifique sua caixa de spam ou tente novamente em alguns minutos.
              </p>
            </div>
          ) : (
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

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D60000] hover:bg-red-700 text-white font-semibold py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar instruções'
                )}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Lembrou sua senha?{' '}
              <Link href="/login" className="text-[#D60000] hover:text-red-400 font-semibold transition-colors">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
