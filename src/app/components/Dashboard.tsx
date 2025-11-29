"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Calendar, 
  Activity, 
  AlertCircle, 
  Dumbbell, 
  Camera,
  MessageCircle,
  User,
  Settings,
  Shield,
  BarChart3
} from "lucide-react";

import DailyChallenges from "./dashboard/DailyChallenges";
import Scanner from "./dashboard/Scanner";
import MonitoringCalendar from "./dashboard/MonitoringCalendar";
import SideEffects from "./dashboard/SideEffects";
import TreatmentArea from "./dashboard/TreatmentArea";
import WorkoutPlan from "./dashboard/WorkoutPlan";
import ChatBot from "./dashboard/ChatBot";
import Analytics from "./dashboard/Analytics";
import NotificationSystem from "./NotificationSystem";

interface DashboardProps {
  quizData: any;
}

export default function Dashboard({ quizData }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [showChat, setShowChat] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <DailyChallenges quizData={quizData} />;
      case "scanner":
        return <Scanner />;
      case "calendar":
        return <MonitoringCalendar />;
      case "treatment":
        return <TreatmentArea />;
      case "side-effects":
        return <SideEffects />;
      case "workout":
        return <WorkoutPlan quizData={quizData} />;
      case "analytics":
        return <Analytics />;
      default:
        return <DailyChallenges quizData={quizData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-800">SafeCycle</h1>
            </div>
            <div className="flex items-center gap-2">
              <NotificationSystem />
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
        <div className="container mx-auto px-2">
          <div className="flex items-center justify-around py-2">
            <NavButton
              icon={<Home className="w-5 h-5" />}
              label="Início"
              active={activeTab === "home"}
              onClick={() => setActiveTab("home")}
            />
            <NavButton
              icon={<Camera className="w-5 h-5" />}
              label="Scanner"
              active={activeTab === "scanner"}
              onClick={() => setActiveTab("scanner")}
            />
            <NavButton
              icon={<Calendar className="w-5 h-5" />}
              label="Calendário"
              active={activeTab === "calendar"}
              onClick={() => setActiveTab("calendar")}
            />
            <NavButton
              icon={<Activity className="w-5 h-5" />}
              label="Tratamento"
              active={activeTab === "treatment"}
              onClick={() => setActiveTab("treatment")}
            />
            <NavButton
              icon={<AlertCircle className="w-5 h-5" />}
              label="Colaterais"
              active={activeTab === "side-effects"}
              onClick={() => setActiveTab("side-effects")}
            />
            <NavButton
              icon={<Dumbbell className="w-5 h-5" />}
              label="Treino"
              active={activeTab === "workout"}
              onClick={() => setActiveTab("workout")}
            />
            <NavButton
              icon={<BarChart3 className="w-5 h-5" />}
              label="Análises"
              active={activeTab === "analytics"}
              onClick={() => setActiveTab("analytics")}
            />
          </div>
        </div>
      </nav>

      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Bot */}
      {showChat && <ChatBot onClose={() => setShowChat(false)} />}
    </div>
  );
}

function NavButton({
  icon,
  label,
  active,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all duration-300 ${
        active
          ? "text-blue-600 bg-blue-50"
          : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
