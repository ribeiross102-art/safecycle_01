"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Check, CreditCard, Smartphone } from "lucide-react";

interface CheckoutModalProps {
  onClose: () => void;
  onComplete: (plan: string) => void;
}

export default function CheckoutModal({ onClose, onComplete }: CheckoutModalProps) {
  const [showDiscount, setShowDiscount] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "debit" | "pix" | null>(null);

  const handleClose = () => {
    if (!showDiscount) {
      setShowDiscount(true);
    } else {
      onClose();
    }
  };

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
  };

  const handlePayment = () => {
    if (selectedPlan && paymentMethod) {
      // Aqui você integraria com o gateway de pagamento
      console.log("Processando pagamento:", { selectedPlan, paymentMethod });
      onComplete(selectedPlan);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <Card className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {showDiscount ? "🎉 Oferta Especial!" : "Escolha Seu Plano"}
              </h2>
              <p className="text-blue-100">
                {showDiscount 
                  ? "Última chance! Desconto exclusivo por tempo limitado"
                  : "Desbloqueie todo o potencial do SafeCycle"
                }
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="p-6 md:p-8">
          {!showDiscount ? (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Plan */}
              <PlanCard
                title="Plano Básico"
                price="19,90"
                features={[
                  "Monitoramento completo",
                  "Calendário inteligente",
                  "Scanner de produtos",
                  "Desafios diários",
                  "Gráficos e análises",
                  "Chat com IA",
                  "Alertas de segurança"
                ]}
                selected={selectedPlan === "basic"}
                onSelect={() => handleSelectPlan("basic")}
              />

              {/* Premium Plan */}
              <PlanCard
                title="Plano Premium"
                price="29,90"
                badge="MAIS POPULAR"
                features={[
                  "Tudo do Plano Básico",
                  "Treino personalizado completo",
                  "Vídeos de execução de exercícios",
                  "Fotos demonstrativas",
                  "Atualização semanal de treinos",
                  "Suporte prioritário",
                  "Análises avançadas"
                ]}
                highlighted
                selected={selectedPlan === "premium"}
                onSelect={() => handleSelectPlan("premium")}
              />
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              {/* Discount Plan */}
              <div className="relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                  50% DE DESCONTO
                </div>
                <PlanCard
                  title="Plano Básico - Oferta Especial"
                  price="9,90"
                  originalPrice="19,90"
                  features={[
                    "Monitoramento completo",
                    "Calendário inteligente",
                    "Scanner de produtos",
                    "Desafios diários",
                    "Gráficos e análises",
                    "Chat com IA",
                    "Alertas de segurança"
                  ]}
                  highlighted
                  selected={selectedPlan === "discount"}
                  onSelect={() => handleSelectPlan("discount")}
                />
              </div>
            </div>
          )}

          {/* Payment Method */}
          {selectedPlan && (
            <div className="mt-8 p-6 bg-slate-50 rounded-xl animate-in slide-in-from-bottom duration-500">
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Método de Pagamento
              </h3>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <PaymentMethodButton
                  icon={<CreditCard className="w-6 h-6" />}
                  label="Cartão de Crédito"
                  sublabel="Parcelamento disponível"
                  selected={paymentMethod === "credit"}
                  onClick={() => setPaymentMethod("credit")}
                />
                <PaymentMethodButton
                  icon={<CreditCard className="w-6 h-6" />}
                  label="Cartão de Débito"
                  sublabel="À vista"
                  selected={paymentMethod === "debit"}
                  onClick={() => setPaymentMethod("debit")}
                />
                <PaymentMethodButton
                  icon={<Smartphone className="w-6 h-6" />}
                  label="PIX"
                  sublabel="Aprovação instantânea"
                  selected={paymentMethod === "pix"}
                  onClick={() => setPaymentMethod("pix")}
                />
              </div>

              {/* Payment Info */}
              <div className="bg-white p-4 rounded-lg border-2 border-slate-200 mb-4">
                <p className="text-sm text-slate-600 mb-2">
                  <strong>Conta de destino:</strong>
                </p>
                <p className="text-sm text-slate-700">
                  Agência: <strong>1832</strong> | Conta: <strong>16108-5</strong>
                </p>
              </div>

              <Button
                onClick={handlePayment}
                disabled={!paymentMethod}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="w-5 h-5 mr-2" />
                Confirmar Pagamento
              </Button>

              <p className="text-xs text-slate-500 text-center mt-4">
                🔒 Pagamento 100% seguro e criptografado
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function PlanCard({
  title,
  price,
  originalPrice,
  badge,
  features,
  highlighted,
  selected,
  onSelect
}: {
  title: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  features: string[];
  highlighted?: boolean;
  selected?: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
        highlighted
          ? "border-blue-600 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-xl"
          : "border-slate-200 bg-white hover:border-blue-300"
      } ${selected ? "ring-4 ring-blue-600 ring-opacity-50" : ""}`}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
          {badge}
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <div className="flex items-center justify-center gap-2">
          {originalPrice && (
            <span className="text-lg text-slate-400 line-through">
              R$ {originalPrice}
            </span>
          )}
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-slate-800">R$ {price}</span>
            <span className="text-slate-600 ml-1">/mês</span>
          </div>
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-slate-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        className={`w-full py-6 rounded-xl font-semibold transition-all duration-300 ${
          selected
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : highlighted
            ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
            : "bg-slate-100 hover:bg-slate-200 text-slate-800"
        }`}
      >
        {selected ? "Selecionado" : "Selecionar Plano"}
      </Button>
    </div>
  );
}

function PaymentMethodButton({
  icon,
  label,
  sublabel,
  selected,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
        selected
          ? "border-blue-600 bg-blue-50 shadow-lg"
          : "border-slate-200 bg-white hover:border-blue-300"
      }`}
    >
      <div className="flex flex-col items-center text-center gap-2">
        <div className={selected ? "text-blue-600" : "text-slate-600"}>
          {icon}
        </div>
        <div>
          <div className="font-semibold text-slate-800 text-sm">{label}</div>
          <div className="text-xs text-slate-500">{sublabel}</div>
        </div>
      </div>
    </button>
  );
}
