"use client";

import { Button } from "@/components/ui/button";
import { Shield, Heart, Calendar, LineChart } from "lucide-react";

interface LandingPageProps {
  onStartQuiz: () => void;
}

export default function LandingPage({ onStartQuiz }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 text-cyan-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            SafeCycle
          </h1>
          <p className="text-xl md:text-2xl text-cyan-100 mb-8 max-w-3xl mx-auto">
            Monitoramento inteligente e redução de danos para sua saúde e bem-estar
          </p>
          <Button 
            onClick={onStartQuiz}
            size="lg"
            className="bg-cyan-500 hover:bg-cyan-600 text-white text-lg px-8 py-6 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Iniciar Avaliação Gratuita
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <FeatureCard
            icon={<Heart className="w-8 h-8" />}
            title="Monitoramento Completo"
            description="Acompanhe todos os aspectos da sua saúde em tempo real"
          />
          <FeatureCard
            icon={<Calendar className="w-8 h-8" />}
            title="Calendário Inteligente"
            description="Histórico detalhado e previsões personalizadas"
          />
          <FeatureCard
            icon={<LineChart className="w-8 h-8" />}
            title="Gráficos e Análises"
            description="Visualize sua evolução com dados precisos"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            title="Redução de Danos"
            description="Orientações baseadas em evidências científicas"
          />
        </div>

        {/* How It Works */}
        <div className="mt-24 bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Como Funciona
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              number="1"
              title="Avaliação Inicial"
              description="Responda um questionário rápido e personalizado"
            />
            <StepCard
              number="2"
              title="Cadastro Seguro"
              description="Crie sua conta com total privacidade"
            />
            <StepCard
              number="3"
              title="Monitoramento"
              description="Acompanhe sua saúde diariamente"
            />
            <StepCard
              number="4"
              title="Resultados"
              description="Alcance seus objetivos com segurança"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
      <div className="text-cyan-300 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-cyan-100 text-sm">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-cyan-100 text-sm">{description}</p>
    </div>
  );
}
