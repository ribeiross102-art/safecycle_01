"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Send, Bot, User, Phone, Mail } from "lucide-react";

interface ChatBotProps {
  onClose: () => void;
}

export default function ChatBot({ onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      type: "bot",
      text: "Olá! Sou o assistente virtual do SafeCycle. Como posso ajudá-lo hoje?",
      timestamp: new Date()
    },
    {
      id: 2,
      type: "bot",
      text: "Posso responder dúvidas sobre:\n• Redução de danos\n• Efeitos colaterais\n• Monitoramento de saúde\n• Uso seguro de substâncias\n\nOu conectá-lo com nosso suporte humano.",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "Como reduzir acne?",
    "Sintomas de pressão alta",
    "Hidratação adequada",
    "Falar com suporte"
  ];

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText;
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: messageText,
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = getBotResponse(messageText);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: "bot",
        text: botResponse,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage: string) => {
    const msg = userMessage.toLowerCase();

    if (msg.includes("acne")) {
      return "Para reduzir acne relacionada ao uso de esteroides:\n\n1. Lave o rosto 2x ao dia com sabonete específico\n2. Use produtos oil-free\n3. Evite tocar o rosto\n4. Considere ácido salicílico tópico\n5. Mantenha fronhas limpas\n\nSe a acne for severa ou cística, consulte um dermatologista.";
    }

    if (msg.includes("pressão") || msg.includes("alta")) {
      return "⚠️ Sintomas de pressão alta incluem:\n\n• Dor de cabeça persistente\n• Visão turva\n• Tontura\n• Dor no peito\n• Falta de ar\n\n🚨 IMPORTANTE: Se sua pressão estiver acima de 140/90 persistentemente ou 160/100 em qualquer momento, procure um médico IMEDIATAMENTE.\n\nMonitore sua pressão diariamente e reduza o consumo de sódio.";
    }

    if (msg.includes("hidrata") || msg.includes("água")) {
      return "💧 Hidratação adequada é essencial:\n\n• Beba 3-4 litros de água por dia\n• Aumente para 4-5L em dias de treino\n• Sua urina deve estar clara/amarelo claro\n• Evite bebidas diuréticas em excesso (café, chá)\n• Distribua a ingestão ao longo do dia\n\nA hidratação adequada protege seus rins e fígado, especialmente durante o uso de substâncias.";
    }

    if (msg.includes("suporte") || msg.includes("humano") || msg.includes("atendente")) {
      return "📞 Você pode falar com nossa equipe de suporte:\n\n• WhatsApp: (11) 96221-4246\n• E-mail: safecyclesuporte@gmail.com\n\nHorário de atendimento:\nSegunda a Sexta: 8h às 20h\nSábado: 9h às 18h\n\nPara emergências médicas, ligue 192 (SAMU).";
    }

    if (msg.includes("colateral") || msg.includes("efeito")) {
      return "Os efeitos colaterais mais comuns incluem:\n\n• Acne\n• Retenção de líquidos\n• Alterações de humor\n• Pressão alta\n• Ginecomastia\n• Queda de cabelo\n\nVocê pode registrar seus sintomas na aba 'Colaterais' do app para receber recomendações personalizadas.\n\nQual sintoma específico você gostaria de saber mais?";
    }

    return "Entendo sua dúvida. Para informações mais específicas, recomendo:\n\n1. Consultar a seção correspondente no app\n2. Falar com nosso suporte humano\n3. Agendar consulta com médico especializado\n\nPosso ajudar com algo mais específico?";
  };

  return (
    <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 md:w-96 md:h-[600px] bg-white md:rounded-2xl shadow-2xl z-50 flex flex-col animate-in slide-in-from-bottom md:slide-in-from-right duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 md:rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold">Assistente SafeCycle</h3>
            <p className="text-xs text-blue-100">Online agora</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.type === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === "user"
                  ? "bg-blue-600"
                  : "bg-gradient-to-r from-cyan-500 to-blue-500"
              }`}
            >
              {message.type === "user" ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-white" />
              )}
            </div>
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                message.type === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-800 shadow-sm"
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.type === "user" ? "text-blue-100" : "text-slate-500"
                }`}
              >
                {message.timestamp.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="p-3 bg-white border-t border-slate-200">
        <div className="flex flex-wrap gap-2 mb-3">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(reply)}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs rounded-full transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-200 md:rounded-b-2xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-2 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-sm"
          />
          <Button
            onClick={() => handleSendMessage()}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-3 flex items-center justify-center gap-4 text-xs text-slate-600">
          <a
            href="https://wa.me/5511962214246"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-green-600 transition-colors"
          >
            <Phone className="w-3 h-3" />
            WhatsApp
          </a>
          <span>•</span>
          <a
            href="mailto:safecyclesuporte@gmail.com"
            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
          >
            <Mail className="w-3 h-3" />
            E-mail
          </a>
        </div>
      </div>
    </div>
  );
}
