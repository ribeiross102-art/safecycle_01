"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Droplet, 
  Moon, 
  Footprints, 
  Sparkles, 
  Salad, 
  Brain,
  Check,
  Trophy
} from "lucide-react";

interface DailyChallengesProps {
  quizData: any;
}

export default function DailyChallenges({ quizData }: DailyChallengesProps) {
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [points, setPoints] = useState(0);

  const challenges = [
    {
      id: "water",
      icon: <Droplet className="w-6 h-6" />,
      title: "Hidratação",
      description: "Beber 3 litros de água",
      progress: 2.1,
      target: 3,
      unit: "L",
      points: 10,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "sleep",
      icon: <Moon className="w-6 h-6" />,
      title: "Sono de Qualidade",
      description: "Dormir 8 horas",
      progress: 0,
      target: 8,
      unit: "h",
      points: 15,
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: "cardio",
      icon: <Footprints className="w-6 h-6" />,
      title: "Cardio",
      description: "30 minutos de caminhada",
      progress: 15,
      target: 30,
      unit: "min",
      points: 20,
      color: "from-orange-500 to-red-500"
    },
    {
      id: "skincare",
      icon: <Sparkles className="w-6 h-6" />,
      title: "Skincare",
      description: "Rotina de cuidados com a pele",
      progress: 0,
      target: 1,
      unit: "vez",
      points: 10,
      color: "from-pink-500 to-rose-500"
    },
    {
      id: "nutrition",
      icon: <Salad className="w-6 h-6" />,
      title: "Alimentação",
      description: "5 refeições balanceadas",
      progress: 3,
      target: 5,
      unit: "refeições",
      points: 15,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "meditation",
      icon: <Brain className="w-6 h-6" />,
      title: "Meditação",
      description: "10 minutos de relaxamento",
      progress: 0,
      target: 10,
      unit: "min",
      points: 15,
      color: "from-teal-500 to-cyan-500"
    }
  ];

  const handleCompleteChallenge = (challengeId: string, challengePoints: number) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges([...completedChallenges, challengeId]);
      setPoints(points + challengePoints);
    }
  };

  const totalPoints = challenges.reduce((acc, c) => acc + c.points, 0);
  const completionPercentage = (points / totalPoints) * 100;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Desafios Diários</h2>
            <p className="text-blue-100">Complete para ganhar pontos de bem-estar</p>
          </div>
          <div className="text-center">
            <Trophy className="w-12 h-12 mx-auto mb-2" />
            <div className="text-3xl font-bold">{points}</div>
            <div className="text-sm text-blue-100">pontos</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/20 rounded-full h-3 overflow-hidden">
          <div
            className="bg-white h-full rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <div className="text-sm text-blue-100 mt-2 text-center">
          {completedChallenges.length} de {challenges.length} desafios completos
        </div>
      </Card>

      {/* Challenges Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {challenges.map((challenge) => {
          const isCompleted = completedChallenges.includes(challenge.id);
          const progressPercentage = (challenge.progress / challenge.target) * 100;

          return (
            <Card
              key={challenge.id}
              className={`p-6 transition-all duration-300 hover:shadow-xl ${
                isCompleted ? "bg-green-50 border-2 border-green-500" : "bg-white"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${challenge.color} text-white`}>
                  {challenge.icon}
                </div>
                {isCompleted && (
                  <div className="bg-green-500 text-white p-2 rounded-full">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-1">
                {challenge.title}
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                {challenge.description}
              </p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Progresso</span>
                  <span className="font-semibold text-slate-800">
                    {challenge.progress}/{challenge.target} {challenge.unit}
                  </span>
                </div>
                <div className="bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${challenge.color} transition-all duration-500`}
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={() => handleCompleteChallenge(challenge.id, challenge.points)}
                disabled={isCompleted}
                className={`w-full ${
                  isCompleted
                    ? "bg-green-500 hover:bg-green-600"
                    : `bg-gradient-to-r ${challenge.color} hover:opacity-90`
                } text-white transition-all duration-300`}
              >
                {isCompleted ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Completo (+{challenge.points} pts)
                  </>
                ) : (
                  `Marcar como Completo (+${challenge.points} pts)`
                )}
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Tips Section */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          Dica do Dia
        </h3>
        <p className="text-slate-700">
          A hidratação adequada é essencial para a saúde renal e hepática, especialmente durante o uso de substâncias. 
          Mantenha-se sempre bem hidratado e monitore a cor da sua urina - ela deve estar clara.
        </p>
      </Card>
    </div>
  );
}
