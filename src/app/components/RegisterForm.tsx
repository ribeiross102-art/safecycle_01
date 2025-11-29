"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Mail, Lock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface RegisterFormProps {
  onComplete: () => void;
  quizData: any;
}

export default function RegisterForm({ onComplete, quizData }: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!password || password.length < 6) {
      newErrors.password = "Senha deve ter no mínimo 6 caracteres";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    if (!acceptTerms) {
      newErrors.terms = "Você deve aceitar os termos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Aqui você salvaria os dados no backend
      console.log("Cadastro completo:", { email, quizData });
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-lg p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Criar Conta
          </h2>
          <p className="text-slate-600">
            Complete seu cadastro para acessar o SafeCycle
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                placeholder="seu@email.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Confirmar Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                placeholder="Repita sua senha"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1 w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms" className="text-sm text-slate-600">
              Eu aceito os{" "}
              <Link href="/terms" target="_blank" className="text-blue-600 hover:underline">
                Termos de Uso
              </Link>
              {" "}e{" "}
              <Link href="/privacy" target="_blank" className="text-blue-600 hover:underline">
                Política de Privacidade
              </Link>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms}</p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Criar Conta
          </Button>
        </form>

        {/* Privacy Note */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-xs text-slate-600 text-center">
            🔒 Seus dados são criptografados e protegidos. Nunca compartilhamos suas informações.
          </p>
        </div>
      </Card>
    </div>
  );
}
