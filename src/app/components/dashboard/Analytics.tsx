"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, Calendar, BarChart3 } from "lucide-react";

export default function Analytics() {
  // Dados simulados - em produção viriam do banco de dados
  const weeklyData = [
    { day: "Seg", applications: 1, challenges: 5, sideEffects: 2 },
    { day: "Ter", applications: 0, challenges: 6, sideEffects: 1 },
    { day: "Qua", applications: 1, challenges: 4, sideEffects: 2 },
    { day: "Qui", applications: 0, challenges: 5, sideEffects: 1 },
    { day: "Sex", applications: 1, challenges: 6, sideEffects: 0 },
    { day: "Sáb", applications: 0, challenges: 3, sideEffects: 1 },
    { day: "Dom", applications: 0, challenges: 4, sideEffects: 1 }
  ];

  const monthlyDosage = [
    { week: "Sem 1", dosage: 500 },
    { week: "Sem 2", dosage: 500 },
    { week: "Sem 3", dosage: 750 },
    { week: "Sem 4", dosage: 750 }
  ];

  const bodyLocationData = [
    { location: "Glúteo Direito", count: 8, percentage: 33 },
    { location: "Glúteo Esquerdo", count: 7, percentage: 29 },
    { location: "Deltoide Direito", count: 5, percentage: 21 },
    { location: "Deltoide Esquerdo", count: 4, percentage: 17 }
  ];

  const maxApplications = Math.max(...weeklyData.map(d => d.applications));
  const maxChallenges = Math.max(...weeklyData.map(d => d.challenges));
  const maxDosage = Math.max(...monthlyDosage.map(d => d.dosage));

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <BarChart3 className="w-12 h-12" />
          <div>
            <h2 className="text-2xl font-bold mb-1">Análise e Estatísticas</h2>
            <p className="text-cyan-100">
              Visualize seu progresso e padrões de uso
            </p>
          </div>
        </div>
      </Card>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">Total Aplicações</h3>
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-slate-800">24</div>
          <div className="flex items-center gap-1 mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-semibold">+12%</span>
            <span className="text-slate-600">vs mês anterior</span>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">Dosagem Total</h3>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-slate-800">2500mg</div>
          <div className="flex items-center gap-1 mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-semibold">+8%</span>
            <span className="text-slate-600">este mês</span>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">Desafios Completos</h3>
            <Calendar className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-slate-800">33/42</div>
          <div className="flex items-center gap-1 mt-2 text-sm">
            <span className="text-green-600 font-semibold">79%</span>
            <span className="text-slate-600">taxa de conclusão</span>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">Colaterais Ativos</h3>
            <Activity className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-slate-800">3</div>
          <div className="flex items-center gap-1 mt-2 text-sm">
            <TrendingDown className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-semibold">-2</span>
            <span className="text-slate-600">vs semana passada</span>
          </div>
        </Card>
      </div>

      {/* Weekly Activity Chart */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Atividade Semanal</h3>
        <div className="space-y-6">
          {/* Applications */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-slate-700">Aplicações</h4>
              <span className="text-sm text-slate-600">
                {weeklyData.reduce((acc, d) => acc + d.applications, 0)} esta semana
              </span>
            </div>
            <div className="flex items-end gap-2 h-32">
              {weeklyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-slate-100 rounded-t-lg relative flex items-end justify-center" style={{ height: '100%' }}>
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-cyan-600 rounded-t-lg transition-all duration-500"
                      style={{ height: `${(data.applications / maxApplications) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-600 font-medium">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-slate-700">Desafios Completos</h4>
              <span className="text-sm text-slate-600">
                {weeklyData.reduce((acc, d) => acc + d.challenges, 0)} esta semana
              </span>
            </div>
            <div className="flex items-end gap-2 h-32">
              {weeklyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-slate-100 rounded-t-lg relative flex items-end justify-center" style={{ height: '100%' }}>
                    <div
                      className="w-full bg-gradient-to-t from-green-600 to-emerald-600 rounded-t-lg transition-all duration-500"
                      style={{ height: `${(data.challenges / maxChallenges) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-600 font-medium">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Monthly Dosage Trend */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Dosagem Mensal (mg)</h3>
        <div className="flex items-end gap-4 h-48">
          {monthlyDosage.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-3">
              <div className="w-full bg-slate-100 rounded-t-lg relative flex items-end justify-center" style={{ height: '100%' }}>
                <div
                  className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg transition-all duration-500 flex items-center justify-center"
                  style={{ height: `${(data.dosage / maxDosage) * 100}%` }}
                >
                  <span className="text-white font-bold text-sm">{data.dosage}</span>
                </div>
              </div>
              <span className="text-sm text-slate-700 font-medium">{data.week}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Body Location Distribution */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6">
          Distribuição por Local do Corpo
        </h3>
        <div className="space-y-4">
          {bodyLocationData.map((location, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-700 font-medium">{location.location}</span>
                <span className="text-slate-600">
                  {location.count} aplicações ({location.percentage}%)
                </span>
              </div>
              <div className="bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${location.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Activity className="w-6 h-6 text-blue-600" />
          Insights Personalizados
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
            <p className="text-slate-700">
              Você está mantendo uma boa consistência nas aplicações, com intervalos regulares.
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
            <p className="text-slate-700">
              Sua taxa de conclusão de desafios diários está acima da média (79%).
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
            <p className="text-slate-700">
              Considere alternar mais os locais de aplicação para evitar sobrecarga em áreas específicas.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
