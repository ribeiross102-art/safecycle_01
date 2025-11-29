'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, Lock, Mail, User, Loader2, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (!termsAccepted || !privacyAccepted) {
      setError('Você deve aceitar os Termos de Uso e Política de Privacidade');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          termsAccepted,
          privacyAccepted,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar conta');
      }

      // Cadastro bem-sucedido
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#D60000] mb-2">SafeCycle</h1>
          <p className="text-gray-400">Crie sua conta e comece agora</p>
        </div>

        {/* Card de Cadastro */}
        <div className="bg-[#111111] border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Criar conta</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">
                Nome completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  className="pl-10 bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-[#D60000] focus:ring-[#D60000]"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mínimo 8 caracteres"
                  className="pl-10 bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-[#D60000] focus:ring-[#D60000]"
                  required
                  disabled={loading}
                  minLength={8}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirmar senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Digite a senha novamente"
                  className="pl-10 bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-[#D60000] focus:ring-[#D60000]"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Termos e Privacidade */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  className="mt-1 border-gray-600 data-[state=checked]:bg-[#D60000] data-[state=checked]:border-[#D60000]"
                  disabled={loading}
                />
                <label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed cursor-pointer">
                  Li e concordo com os{' '}
                  <Link href="/terms" target="_blank" className="text-[#D60000] hover:underline font-semibold">
                    Termos de Uso
                  </Link>
                </label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="privacy"
                  checked={privacyAccepted}
                  onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                  className="mt-1 border-gray-600 data-[state=checked]:bg-[#D60000] data-[state=checked]:border-[#D60000]"
                  disabled={loading}
                />
                <label htmlFor="privacy" className="text-sm text-gray-300 leading-relaxed cursor-pointer">
                  Li e concordo com a{' '}
                  <Link href="/privacy" target="_blank" className="text-[#D60000] hover:underline font-semibold">
                    Política de Privacidade
                  </Link>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !termsAccepted || !privacyAccepted}
              className="w-full bg-[#D60000] hover:bg-red-700 text-white font-semibold py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Criando conta...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Criar conta
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-[#D60000] hover:text-red-400 font-semibold transition-colors">
                Faça login
              </Link>
            </p>
          </div>
        </div>

        {/* Aviso de Segurança */}
        <div className="mt-6 bg-[#D60000]/10 border border-[#D60000]/30 rounded-xl p-4">
          <p className="text-sm text-gray-300 text-center">
            <strong className="text-[#D60000]">⚠️ Importante:</strong> Este aplicativo é apenas informativo e não substitui acompanhamento médico profissional.
          </p>
        </div>
      </div>
    </div>
  );
}
