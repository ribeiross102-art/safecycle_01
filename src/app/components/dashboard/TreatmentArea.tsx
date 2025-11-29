"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Calendar, Droplet, Moon, Salad, AlertTriangle } from "lucide-react";

export default function TreatmentArea() {
  const nextDose = {
    hoursRemaining: 18,
    scheduledDate: "26 Jan 2024",
    scheduledTime: "09:00"
  };

  const lastDose = {
    date: "22 Jan 2024",
    time: "09:00",
    location: "Glúteo Direito",
    product: "Testosterona Enantato",
    dosage: "250mg"
  };

  const recommendations = [
    {
      icon: <Droplet className="w-5 h-5" />,
      title: "Hidratação",
      description: "Beba pelo menos 3-4 litros de água por dia",
      priority: "high",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Moon className="w-5 h-5" />,
      title: "Descanso",
      description: "Durma 7-9 horas por noite para recuperação adequada",
      priority: "high",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Salad className="w-5 h-5" />,
      title: "Alimentação",
      description: "Mantenha dieta rica em proteínas e vegetais",
      priority: "medium",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const potentialSideEffects = [
    "Acne leve a moderada",
    "Retenção de líquidos",
    "Aumento da pressão arterial",
    "Alterações de humor",
    "Supressão da produção natural de testosterona"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <Clock className="w-12 h-12" />
          <div>
            <h2 className="text-2xl font-bold mb-1">Área de Tratamento</h2>
            <p className="text-teal-100">
              Acompanhe seu protocolo e recomendações de redução de danos
            </p>
          </div>
        </div>
      </Card>

      {/* Next Dose Countdown */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            Próxima Dose Programada
          </h3>
          <div className="mb-6">
            <div className="text-6xl font-bold text-blue-600 mb-2">
              {nextDose.hoursRemaining}h
            </div>
            <p className="text-slate-600">restantes</p>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {nextDose.scheduledDate}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {nextDose.scheduledTime}
            </div>
          </div>
        </div>
      </Card>

      {/* Last Dose Info */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Clock className="w-6 h-6 text-teal-600" />
          Última Aplicação
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl">
            <div className="text-sm text-slate-600 mb-1">Data e Horário</div>
            <div className="font-semibold text-slate-800">
              {lastDose.date} às {lastDose.time}
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <div className="text-sm text-slate-600 mb-1">Local</div>
            <div className="font-semibold text-slate-800 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-600" />
              {lastDose.location}
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <div className="text-sm text-slate-600 mb-1">Produto</div>
            <div className="font-semibold text-slate-800">{lastDose.product}</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <div className="text-sm text-slate-600 mb-1">Dosagem</div>
            <div className="font-semibold text-slate-800">{lastDose.dosage}</div>
          </div>
        </div>
      </Card>

      {/* Harm Reduction Recommendations */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4">
          Recomendações de Redução de Danos
        </h3>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className={`p-3 rounded-lg bg-gradient-to-r ${rec.color} text-white flex-shrink-0`}>
                {rec.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-slate-800">{rec.title}</h4>
                  {rec.priority === "high" && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                      Alta Prioridade
                    </span>
                  )}
                </div>
                <p className="text-slate-600 text-sm">{rec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Potential Side Effects */}
      <Card className="p-6 bg-amber-50 border-2 border-amber-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
          Possíveis Efeitos Colaterais do Produto Atual
        </h3>
        <p className="text-slate-700 mb-4">
          Baseado no produto que você está utilizando ({lastDose.product}), 
          estes são os efeitos colaterais mais comuns que você deve monitorar:
        </p>
        <ul className="space-y-2">
          {potentialSideEffects.map((effect, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span className="text-slate-700">{effect}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white">
          Registrar Efeito Colateral
        </Button>
      </Card>

      {/* Application History */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4">
          Histórico de Datas
        </h3>
        <div className="space-y-3">
          {[
            { date: "22 Jan 2024", location: "Glúteo Direito", dosage: "250mg" },
            { date: "18 Jan 2024", location: "Glúteo Esquerdo", dosage: "250mg" },
            { date: "15 Jan 2024", location: "Glúteo Direito", dosage: "250mg" },
            { date: "11 Jan 2024", location: "Glúteo Esquerdo", dosage: "250mg" }
          ].map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">
                  {index + 1}
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{entry.date}</div>
                  <div className="text-sm text-slate-600">{entry.location}</div>
                </div>
              </div>
              <div className="text-sm font-semibold text-teal-600">
                {entry.dosage}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Important Notice */}
      <Card className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 p-6">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Importante: Acompanhamento Médico
            </h3>
            <p className="text-slate-700">
              Este aplicativo fornece informações educativas e ferramentas de monitoramento, 
              mas NÃO substitui o acompanhamento médico profissional. Sempre consulte um 
              endocrinologista ou médico especializado para orientações sobre seu tratamento.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
