"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OnboardingQuizProps {
  onComplete: (data: any) => void;
}

export default function OnboardingQuiz({ onComplete }: OnboardingQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});

  const questions = [
    {
      id: "age",
      question: "Qual é a sua idade?",
      options: [
        "18-24 anos",
        "25-34 anos",
        "35-44 anos",
        "45+ anos"
      ]
    },
    {
      id: "weight",
      question: "Qual é o seu peso aproximado?",
      options: [
        "Menos de 60kg",
        "60-75kg",
        "76-90kg",
        "91-105kg",
        "Mais de 105kg"
      ]
    },
    {
      id: "height",
      question: "Qual é a sua altura?",
      options: [
        "Menos de 1,60m",
        "1,60m - 1,70m",
        "1,71m - 1,80m",
        "1,81m - 1,90m",
        "Mais de 1,90m"
      ]
    },
    {
      id: "goal",
      question: "Qual é o seu objetivo principal?",
      options: [
        "Ganho de massa muscular",
        "Perda de gordura",
        "Definição muscular",
        "Aumento de força",
        "Manutenção"
      ]
    },
    {
      id: "steroid_use",
      question: "Você utiliza ou já utilizou esteroides anabolizantes?",
      options: [
        "Sim, utilizo atualmente",
        "Já utilizei no passado",
        "Nunca utilizei",
        "Pretendo começar"
      ]
    },
    {
      id: "steroid_type",
      question: "Qual tipo de substância você utiliza/utilizou? (Se aplicável)",
      options: [
        "Testosterona (Enantato, Cipionato, Propionato)",
        "Nandrolona (Deca, NPP)",
        "Oxandrolona (Anavar)",
        "Stanozolol (Winstrol)",
        "Trembolona",
        "Boldenona",
        "Outros",
        "Não se aplica"
      ]
    },
    {
      id: "usage_duration",
      question: "Há quanto tempo você utiliza? (Se aplicável)",
      options: [
        "Menos de 3 meses",
        "3-6 meses",
        "6-12 meses",
        "Mais de 1 ano",
        "Não se aplica"
      ]
    },
    {
      id: "training_frequency",
      question: "Com que frequência você treina?",
      options: [
        "1-2 vezes por semana",
        "3-4 vezes por semana",
        "5-6 vezes por semana",
        "Todos os dias"
      ]
    },
    {
      id: "side_effects",
      question: "Você já experimentou algum efeito colateral?",
      options: [
        "Acne",
        "Alterações de humor",
        "Pressão alta",
        "Problemas de sono",
        "Ginecomastia",
        "Queda de cabelo",
        "Nenhum",
        "Múltiplos sintomas"
      ]
    },
    {
      id: "health_conditions",
      question: "Você possui alguma condição de saúde pré-existente?",
      options: [
        "Hipertensão",
        "Diabetes",
        "Problemas cardíacos",
        "Problemas hepáticos",
        "Problemas renais",
        "Nenhuma",
        "Outras"
      ]
    }
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [questions[currentStep].id]: answer };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-lg p-8 md:p-12 shadow-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-600">
              Pergunta {currentStep + 1} de {questions.length}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-600 to-cyan-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
            {questions[currentStep].question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {questions[currentStep].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                  answers[questions[currentStep].id] === option
                    ? "border-blue-600 bg-blue-50 shadow-lg"
                    : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <span className="text-slate-800 font-medium">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handleBack}
            variant="outline"
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </Button>

          <div className="flex gap-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep ? "bg-blue-600" : "bg-slate-300"
                }`}
              />
            ))}
          </div>

          {answers[questions[currentStep].id] && currentStep < questions.length - 1 && (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              Próxima
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
