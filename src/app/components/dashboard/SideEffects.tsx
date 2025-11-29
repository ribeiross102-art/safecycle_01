"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Frown,
  Meh,
  Smile
} from "lucide-react";

export default function SideEffects() {
  const [selectedEffects, setSelectedEffects] = useState<string[]>([]);
  const [selectedEffect, setSelectedEffect] = useState<any>(null);

  const sideEffects = [
    {
      id: "acne",
      name: "Acne",
      severity: "moderate",
      icon: "😣",
      causes: [
        "Aumento da produção de sebo devido à estimulação androgênica",
        "Obstrução dos poros",
        "Proliferação bacteriana"
      ],
      recommendations: [
        "Manter rotina de limpeza facial 2x ao dia",
        "Usar produtos oil-free e não comedogênicos",
        "Considerar uso de ácido salicílico tópico",
        "Evitar tocar o rosto com as mãos",
        "Trocar fronhas regularmente"
      ],
      whenToSeek: "Se acne for severa, cística ou não responder a tratamentos básicos em 2-3 semanas"
    },
    {
      id: "headache",
      name: "Dor de Cabeça",
      severity: "moderate",
      icon: "🤕",
      causes: [
        "Alterações na pressão arterial",
        "Retenção de líquidos",
        "Alterações hormonais",
        "Estresse e tensão muscular"
      ],
      recommendations: [
        "Manter hidratação adequada (3-4L água/dia)",
        "Monitorar pressão arterial regularmente",
        "Praticar técnicas de relaxamento",
        "Garantir sono de qualidade (7-9h)",
        "Evitar cafeína em excesso"
      ],
      whenToSeek: "Se dor for intensa, persistente, acompanhada de visão turva ou náuseas"
    },
    {
      id: "swelling",
      name: "Inchaço",
      severity: "moderate",
      icon: "💧",
      causes: [
        "Retenção de sódio e água",
        "Aumento da aromatização (conversão em estrogênio)",
        "Alterações na função renal"
      ],
      recommendations: [
        "Reduzir consumo de sódio (<2000mg/dia)",
        "Aumentar ingestão de água",
        "Consumir alimentos diuréticos naturais (melancia, pepino)",
        "Elevar pernas ao descansar",
        "Praticar atividade física leve"
      ],
      whenToSeek: "Se inchaço for súbito, severo, ou acompanhado de dificuldade respiratória"
    },
    {
      id: "high_bp",
      name: "Pressão Alta",
      severity: "high",
      icon: "⚠️",
      causes: [
        "Retenção de líquidos",
        "Aumento do volume sanguíneo",
        "Alterações na função vascular",
        "Aumento da viscosidade sanguínea"
      ],
      recommendations: [
        "Monitorar pressão arterial diariamente",
        "Reduzir drasticamente o sódio",
        "Praticar cardio moderado regularmente",
        "Evitar estimulantes (cafeína, pré-treinos)",
        "Considerar suplementação com Coenzima Q10"
      ],
      whenToSeek: "URGENTE: Se pressão >140/90 persistente ou >160/100 em qualquer momento"
    },
    {
      id: "mood",
      name: "Alterações de Humor",
      severity: "moderate",
      icon: "😤",
      causes: [
        "Flutuações hormonais",
        "Conversão de testosterona em estrogênio",
        "Alterações nos neurotransmissores",
        "Estresse psicológico"
      ],
      recommendations: [
        "Praticar meditação ou mindfulness diariamente",
        "Manter rotina de sono regular",
        "Exercícios físicos regulares",
        "Conversar com pessoas de confiança",
        "Evitar decisões importantes em momentos de irritação"
      ],
      whenToSeek: "Se houver pensamentos autodestrutivos, agressividade descontrolada ou depressão severa"
    },
    {
      id: "insomnia",
      name: "Problemas de Sono",
      severity: "moderate",
      icon: "😴",
      causes: [
        "Alterações no metabolismo",
        "Aumento da energia e agitação",
        "Alterações hormonais",
        "Ansiedade"
      ],
      recommendations: [
        "Estabelecer rotina de sono consistente",
        "Evitar telas 1h antes de dormir",
        "Criar ambiente escuro e fresco",
        "Evitar estimulantes após 14h",
        "Considerar suplementação com magnésio"
      ],
      whenToSeek: "Se insônia persistir por mais de 2 semanas ou afetar significativamente o dia a dia"
    },
    {
      id: "gyno",
      name: "Sensibilidade Mamária",
      severity: "high",
      icon: "🚨",
      causes: [
        "Aromatização excessiva (conversão em estrogênio)",
        "Desequilíbrio estrogênio/testosterona",
        "Prolactina elevada"
      ],
      recommendations: [
        "Monitorar diariamente a região",
        "Considerar uso de inibidor de aromatase (com orientação médica)",
        "Evitar alimentos ricos em fitoestrógenos",
        "Reduzir dosagem se possível",
        "Documentar qualquer alteração"
      ],
      whenToSeek: "URGENTE: Ao primeiro sinal de nódulo, dor ou secreção. Ginecomastia pode se tornar irreversível"
    },
    {
      id: "hair_loss",
      name: "Queda de Cabelo",
      severity: "moderate",
      icon: "💇",
      causes: [
        "Conversão de testosterona em DHT",
        "Predisposição genética",
        "Miniaturização dos folículos capilares"
      ],
      recommendations: [
        "Usar shampoos com cetoconazol",
        "Considerar finasterida (com orientação médica)",
        "Suplementar com biotina e zinco",
        "Evitar penteados que traccionam o cabelo",
        "Massagear couro cabeludo regularmente"
      ],
      whenToSeek: "Se queda for súbita, em placas, ou acompanhada de coceira/descamação severa"
    },
    {
      id: "libido",
      name: "Perda de Libido",
      severity: "moderate",
      icon: "😔",
      causes: [
        "Supressão do eixo hormonal natural",
        "Prolactina elevada",
        "Estrogênio muito alto ou muito baixo",
        "Fadiga e overtraining"
      ],
      recommendations: [
        "Verificar níveis hormonais (testosterona, estrogênio, prolactina)",
        "Garantir descanso adequado",
        "Reduzir estresse",
        "Manter alimentação balanceada",
        "Considerar ajuste de dosagem"
      ],
      whenToSeek: "Se perda de libido for acompanhada de disfunção erétil persistente ou depressão"
    }
  ];

  const toggleEffect = (effectId: string) => {
    if (selectedEffects.includes(effectId)) {
      setSelectedEffects(selectedEffects.filter(id => id !== effectId));
    } else {
      setSelectedEffects([...selectedEffects, effectId]);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "from-red-500 to-rose-500";
      case "moderate":
        return "from-orange-500 to-amber-500";
      default:
        return "from-blue-500 to-cyan-500";
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case "high":
        return "Alta Prioridade";
      case "moderate":
        return "Atenção Necessária";
      default:
        return "Monitorar";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <AlertCircle className="w-12 h-12" />
          <div>
            <h2 className="text-2xl font-bold mb-1">Monitoramento de Efeitos Colaterais</h2>
            <p className="text-red-100">
              Registre o que está sentindo para receber orientações personalizadas
            </p>
          </div>
        </div>
      </Card>

      {/* Status Summary */}
      {selectedEffects.length > 0 && (
        <Card className="p-6 bg-amber-50 border-2 border-amber-200">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Você está monitorando {selectedEffects.length} efeito(s) colateral(is)
              </h3>
              <p className="text-slate-700 mb-3">
                Clique em cada efeito abaixo para ver recomendações detalhadas de redução de danos.
              </p>
              <Button
                onClick={() => setSelectedEffects([])}
                variant="outline"
                size="sm"
                className="border-amber-600 text-amber-600 hover:bg-amber-100"
              >
                Limpar Todos
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Side Effects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sideEffects.map((effect) => {
          const isSelected = selectedEffects.includes(effect.id);
          
          return (
            <Card
              key={effect.id}
              onClick={() => toggleEffect(effect.id)}
              className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                isSelected
                  ? "bg-red-50 border-2 border-red-500 shadow-lg"
                  : "bg-white hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{effect.icon}</div>
                {isSelected && (
                  <CheckCircle2 className="w-6 h-6 text-red-600" />
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {effect.name}
              </h3>

              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getSeverityColor(effect.severity)}`}>
                {getSeverityLabel(effect.severity)}
              </div>

              {isSelected && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEffect(effect);
                  }}
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  size="sm"
                >
                  Ver Recomendações
                </Button>
              )}
            </Card>
          );
        })}
      </div>

      {/* Detailed View Modal */}
      {selectedEffect && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <Card className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className={`bg-gradient-to-r ${getSeverityColor(selectedEffect.severity)} text-white p-6 rounded-t-2xl`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{selectedEffect.icon}</div>
                  <div>
                    <h2 className="text-3xl font-bold mb-1">{selectedEffect.name}</h2>
                    <p className="text-white/90">{getSeverityLabel(selectedEffect.severity)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEffect(null)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Causes */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  Possíveis Causas
                </h3>
                <ul className="space-y-2">
                  {selectedEffect.causes.map((cause: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-slate-700">{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Recomendações de Redução de Danos
                </h3>
                <ul className="space-y-2">
                  {selectedEffect.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* When to Seek Medical Help */}
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <h3 className="text-lg font-bold text-red-800 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Quando Procurar um Médico
                </h3>
                <p className="text-red-700">{selectedEffect.whenToSeek}</p>
              </div>

              {/* Educational Resources */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <h3 className="text-lg font-bold text-blue-800 mb-2">
                  📚 Recursos Educativos
                </h3>
                <p className="text-blue-700 text-sm">
                  Para mais informações sobre este efeito colateral e como gerenciá-lo, 
                  consulte nosso chat com IA ou entre em contato com nosso suporte médico.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Emergency Contact */}
      <Card className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Em Caso de Emergência
            </h3>
            <p className="text-slate-700 mb-4">
              Se você estiver experimentando sintomas graves como dor no peito, dificuldade respiratória, 
              confusão mental ou qualquer sintoma que considere uma emergência, procure atendimento médico imediatamente.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Ligar para Emergência (192)
              </Button>
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                Contatar Suporte SafeCycle
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
