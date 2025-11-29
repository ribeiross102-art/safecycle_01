"use client";

import { useState, useEffect } from "react";
import { Bell, X, Droplet, Moon, Syringe, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  type: "water" | "sleep" | "application" | "warning";
  title: string;
  message: string;
  time: Date;
  read: boolean;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "water",
      title: "Hora de se hidratar!",
      message: "Você ainda não atingiu sua meta de 3L de água hoje.",
      time: new Date(),
      read: false
    },
    {
      id: "2",
      type: "sleep",
      title: "Hora de dormir",
      message: "Para manter seu ciclo de sono saudável, vá para a cama em 30 minutos.",
      time: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: "3",
      type: "application",
      title: "Próxima aplicação",
      message: "Sua próxima aplicação está programada para amanhã às 09:00.",
      time: new Date(Date.now() - 7200000),
      read: true
    },
    {
      id: "4",
      type: "warning",
      title: "Atenção aos colaterais",
      message: "Você reportou 3 efeitos colaterais esta semana. Considere consultar um médico.",
      time: new Date(Date.now() - 86400000),
      read: true
    }
  ]);

  const [showPanel, setShowPanel] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "water":
        return <Droplet className="w-5 h-5 text-blue-600" />;
      case "sleep":
        return <Moon className="w-5 h-5 text-indigo-600" />;
      case "application":
        return <Syringe className="w-5 h-5 text-purple-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      default:
        return <Bell className="w-5 h-5 text-slate-600" />;
    }
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return "Agora";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}min atrás`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h atrás`;
    return `${Math.floor(seconds / 86400)}d atrás`;
  };

  return (
    <>
      {/* Notification Bell Button */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="relative p-2 hover:bg-slate-100 rounded-full transition-colors"
      >
        <Bell className="w-6 h-6 text-slate-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {showPanel && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setShowPanel(false)}
          />

          {/* Panel */}
          <div className="fixed top-16 right-4 w-96 max-h-[600px] bg-white rounded-2xl shadow-2xl z-50 animate-in slide-in-from-top duration-300">
            {/* Header */}
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-800">
                  Notificações
                </h3>
                <button
                  onClick={() => setShowPanel(false)}
                  className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              {unreadCount > 0 && (
                <Button
                  onClick={markAllAsRead}
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  Marcar todas como lidas
                </Button>
              )}
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto max-h-[500px]">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">Nenhuma notificação</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer ${
                        !notification.read ? "bg-blue-50/50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold text-slate-800 text-sm">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-sm text-slate-600 mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">
                              {getTimeAgo(notification.time)}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="text-xs text-red-600 hover:text-red-700 hover:underline"
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
