"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Search, AlertTriangle, Info, Package, X, Upload } from "lucide-react";

export default function Scanner() {
  const [scanning, setScanning] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      setStream(mediaStream);
      setShowCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Erro ao acessar câmera:", error);
      alert("Não foi possível acessar a câmera. Por favor, permita o acesso ou use o upload de imagem.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        // Aqui você enviaria a imagem para análise
        processImage(canvas.toDataURL());
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        processImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = (imageData: string) => {
    setScanning(true);
    stopCamera();
    
    // Simulação de processamento - em produção, você usaria uma API de reconhecimento de imagem
    setTimeout(() => {
      setScannedProduct({
        name: "Testosterona Enantato",
        concentration: "250mg/ml",
        halfLife: "4-5 dias",
        composition: "Testosterona Enantato, Óleo de Semente de Uva, Álcool Benzílico",
        risks: [
          "Supressão da produção natural de testosterona",
          "Ginecomastia (desenvolvimento de tecido mamário)",
          "Acne e pele oleosa",
          "Retenção de líquidos",
          "Aumento da pressão arterial",
          "Alterações no colesterol (HDL/LDL)"
        ],
        sideEffects: [
          "Alterações de humor e agressividade",
          "Insônia",
          "Queda de cabelo (em predispostos)",
          "Atrofia testicular",
          "Redução da fertilidade"
        ],
        interactions: [
          "Anticoagulantes: Pode aumentar o efeito",
          "Insulina: Pode alterar necessidade de dosagem",
          "Corticosteroides: Aumenta risco de retenção de líquidos"
        ],
        storage: "Armazenar em temperatura ambiente (15-30°C), protegido da luz e umidade",
        dosageInterval: "Aplicações típicas: 2x por semana (devido à meia-vida)"
      });
      setScanning(false);
    }, 2000);
  };

  const handleScan = () => {
    startCamera();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <Camera className="w-12 h-12" />
          <div>
            <h2 className="text-2xl font-bold mb-1">Scanner de Produtos</h2>
            <p className="text-purple-100">
              Escaneie ampolas e produtos para informações detalhadas
            </p>
          </div>
        </div>
      </Card>

      {/* Camera View */}
      {showCamera && (
        <Card className="p-6 relative">
          <div className="relative bg-black rounded-xl overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-4 border-white/50 rounded-lg" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button
              onClick={captureImage}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Camera className="w-5 h-5 mr-2" />
              Capturar Imagem
            </Button>
            <Button
              onClick={stopCamera}
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-50"
            >
              <X className="w-5 h-5 mr-2" />
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      {/* Scanner Area */}
      {!scannedProduct && !showCamera ? (
        <Card className="p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
              {scanning ? (
                <div className="animate-spin">
                  <Search className="w-16 h-16 text-purple-600" />
                </div>
              ) : (
                <Camera className="w-16 h-16 text-purple-600" />
              )}
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              {scanning ? "Escaneando..." : "Pronto para Escanear"}
            </h3>
            <p className="text-slate-600 mb-6">
              {scanning
                ? "Identificando o produto..."
                : "Aponte a câmera para o rótulo, ampola ou caixa do produto"}
            </p>

            <div className="space-y-3">
              <Button
                onClick={handleScan}
                disabled={scanning}
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Camera className="w-5 h-5 mr-2" />
                {scanning ? "Escaneando..." : "Abrir Câmera"}
              </Button>

              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={scanning}
                size="lg"
                variant="outline"
                className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                <Upload className="w-5 h-5 mr-2" />
                Fazer Upload de Imagem
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </Card>
      ) : scannedProduct ? (
        <div className="space-y-4">
          {/* Product Header */}
          <Card className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">{scannedProduct.name}</h3>
                </div>
                <p className="text-slate-300">
                  Concentração: {scannedProduct.concentration}
                </p>
                <p className="text-slate-300">
                  Meia-vida: {scannedProduct.halfLife}
                </p>
              </div>
              <Button
                onClick={() => {
                  setScannedProduct(null);
                  setShowCamera(false);
                }}
                variant="outline"
                className="text-white border-white hover:bg-white/20"
              >
                Novo Scan
              </Button>
            </div>
          </Card>

          {/* Composition */}
          <InfoCard
            title="Composição"
            icon={<Info className="w-5 h-5" />}
            color="blue"
          >
            <p className="text-slate-700">{scannedProduct.composition}</p>
          </InfoCard>

          {/* Main Risks */}
          <InfoCard
            title="Principais Riscos"
            icon={<AlertTriangle className="w-5 h-5" />}
            color="red"
          >
            <ul className="space-y-2">
              {scannedProduct.risks.map((risk: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span className="text-slate-700">{risk}</span>
                </li>
              ))}
            </ul>
          </InfoCard>

          {/* Side Effects */}
          <InfoCard
            title="Possíveis Efeitos Colaterais"
            icon={<AlertTriangle className="w-5 h-5" />}
            color="orange"
          >
            <ul className="space-y-2">
              {scannedProduct.sideEffects.map((effect: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span className="text-slate-700">{effect}</span>
                </li>
              ))}
            </ul>
          </InfoCard>

          {/* Interactions */}
          <InfoCard
            title="Interações Perigosas"
            icon={<AlertTriangle className="w-5 h-5" />}
            color="purple"
          >
            <ul className="space-y-2">
              {scannedProduct.interactions.map((interaction: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span className="text-slate-700">{interaction}</span>
                </li>
              ))}
            </ul>
          </InfoCard>

          {/* Storage */}
          <InfoCard
            title="Armazenamento Correto"
            icon={<Info className="w-5 h-5" />}
            color="green"
          >
            <p className="text-slate-700">{scannedProduct.storage}</p>
          </InfoCard>

          {/* Dosage Interval */}
          <InfoCard
            title="Intervalo Entre Doses"
            icon={<Info className="w-5 h-5" />}
            color="cyan"
          >
            <p className="text-slate-700">{scannedProduct.dosageInterval}</p>
            <div className="mt-3 p-3 bg-amber-50 border-l-4 border-amber-500 rounded">
              <p className="text-sm text-amber-800">
                ⚠️ <strong>Importante:</strong> Esta é apenas uma informação educativa. 
                Sempre consulte um médico para orientações sobre dosagem e uso.
              </p>
            </div>
          </InfoCard>
        </div>
      ) : null}
    </div>
  );
}

function InfoCard({
  title,
  icon,
  color,
  children
}: {
  title: string;
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
}) {
  const colorClasses = {
    blue: "from-blue-500 to-cyan-500",
    red: "from-red-500 to-rose-500",
    orange: "from-orange-500 to-amber-500",
    purple: "from-purple-500 to-pink-500",
    green: "from-green-500 to-emerald-500",
    cyan: "from-cyan-500 to-teal-500"
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} text-white`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
      </div>
      {children}
    </Card>
  );
}
