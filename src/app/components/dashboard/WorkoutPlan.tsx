"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Play, Lock, Crown } from "lucide-react";

interface WorkoutPlanProps {
  quizData: any;
}

export default function WorkoutPlan({ quizData }: WorkoutPlanProps) {
  const isPremium = false; // Simulação - em produção, verificar plano do usuário

  const workoutDays = [
    {
      day: "Segunda-feira",
      focus: "Peito e Tríceps",
      exercises: [
        { name: "Supino Reto", sets: "4x8-10", rest: "90s" },
        { name: "Supino Inclinado", sets: "3x10-12", rest: "90s" },
        { name: "Crucifixo", sets: "3x12-15", rest: "60s" },
        { name: "Tríceps Testa", sets: "3x10-12", rest: "60s" },
        { name: "Tríceps Corda", sets: "3x12-15", rest: "60s" }
      ]
    },
    {
      day: "Terça-feira",
      focus: "Costas e Bíceps",
      exercises: [
        { name: "Barra Fixa", sets: "4x8-10", rest: "90s" },
        { name: "Remada Curvada", sets: "4x8-10", rest: "90s" },
        { name: "Pulldown", sets: "3x10-12", rest: "60s" },
        { name: "Rosca Direta", sets: "3x10-12", rest: "60s" },
        { name: "Rosca Martelo", sets: "3x12-15", rest: "60s" }
      ]
    },
    {
      day: "Quarta-feira",
      focus: "Pernas",
      exercises: [
        { name: "Agachamento", sets: "4x8-10", rest: "120s" },
        { name: "Leg Press", sets: "4x10-12", rest: "90s" },
        { name: "Cadeira Extensora", sets: "3x12-15", rest: "60s" },
        { name: "Cadeira Flexora", sets: "3x12-15", rest: "60s" },
        { name: "Panturrilha", sets: "4x15-20", rest: "60s" }
      ]
    }
  ];

  if (!isPremium) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 shadow-xl">
          <div className="flex items-center gap-4">
            <Dumbbell className="w-12 h-12" />
            <div>
              <h2 className="text-2xl font-bold mb-1">Treino Personalizado</h2>
              <p className="text-orange-100">
                Plano de treino completo baseado no seu perfil
              </p>
            </div>
          </div>
        </Card>

        {/* Premium Upsell */}
        <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-200">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown className="w-10 h-10 text-white" />
            </div>
            
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Desbloqueie Seu Treino Personalizado
            </h3>
            
            <p className="text-lg text-slate-700 mb-6">
              Com o Plano Premium, você terá acesso a:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Treino Completo Personalizado</h4>
                  <p className="text-sm text-slate-600">
                    Baseado nas suas medidas e objetivos do quiz
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Vídeos Demonstrativos</h4>
                  <p className="text-sm text-slate-600">
                    Execução correta de cada exercício
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Fotos de Referência</h4>
                  <p className="text-sm text-slate-600">
                    Posicionamento e técnica perfeitos
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Atualização Semanal</h4>
                  <p className="text-sm text-slate-600">
                    Treino evolui conforme seu progresso
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-center">
                  <div className="text-sm text-slate-600 mb-1">De R$ 29,90</div>
                  <div className="text-4xl font-bold text-slate-800">R$ 29,90</div>
                  <div className="text-sm text-slate-600">/mês</div>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-6 text-lg font-semibold shadow-lg">
                <Crown className="w-5 h-5 mr-2" />
                Fazer Upgrade para Premium
              </Button>
            </div>

            <p className="text-sm text-slate-600">
              🔒 Pagamento seguro • Cancele quando quiser
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // Premium Content
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Dumbbell className="w-12 h-12" />
            <div>
              <h2 className="text-2xl font-bold mb-1">Seu Treino Personalizado</h2>
              <p className="text-orange-100">
                Semana 1 - Hipertrofia Muscular
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
            <Crown className="w-5 h-5" />
            <span className="font-semibold">Premium</span>
          </div>
        </div>
      </Card>

      {/* Workout Days */}
      {workoutDays.map((day, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-800">{day.day}</h3>
              <p className="text-slate-600">{day.focus}</p>
            </div>
            <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white">
              <Play className="w-4 h-4 mr-2" />
              Iniciar Treino
            </Button>
          </div>

          <div className="space-y-3">
            {day.exercises.map((exercise, exIndex) => (
              <div
                key={exIndex}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-700 font-bold">
                    {exIndex + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{exercise.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                      <span>{exercise.sets}</span>
                      <span>•</span>
                      <span>Descanso: {exercise.rest}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Ver Vídeo
                </Button>
              </div>
            ))}
          </div>
        </Card>
      ))}

      {/* Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-3">
          💡 Dicas para Melhor Resultado
        </h3>
        <ul className="space-y-2 text-slate-700">
          <li>• Mantenha a técnica correta em todos os exercícios</li>
          <li>• Respeite os intervalos de descanso</li>
          <li>• Hidrate-se durante o treino</li>
          <li>• Faça aquecimento antes de começar</li>
          <li>• Alongue após finalizar</li>
        </ul>
      </Card>
    </div>
  );
}
