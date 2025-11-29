"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus, MapPin, Clock, TrendingUp } from "lucide-react";

export default function MonitoringCalendar() {
  const [applications, setApplications] = useState<any[]>([
    {
      id: 1,
      date: "2024-01-15",
      time: "09:00",
      location: "Glúteo Direito",
      product: "Testosterona Enantato",
      dosage: "250mg"
    },
    {
      id: 2,
      date: "2024-01-18",
      time: "09:00",
      location: "Glúteo Esquerdo",
      product: "Testosterona Enantato",
      dosage: "250mg"
    },
    {
      id: 3,
      date: "2024-01-22",
      time: "09:00",
      location: "Glúteo Direito",
      product: "Testosterona Enantato",
      dosage: "250mg"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const bodyLocations = [
    "Glúteo Direito",
    "Glúteo Esquerdo",
    "Deltoide Direito",
    "Deltoide Esquerdo",
    "Vasto Lateral Direito",
    "Vasto Lateral Esquerdo"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CalendarIcon className="w-12 h-12" />
            <div>
              <h2 className="text-2xl font-bold mb-1">Calendário de Monitoramento</h2>
              <p className="text-indigo-100">
                Acompanhe seu histórico e próximas aplicações
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-white text-indigo-600 hover:bg-indigo-50"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nova Aplicação
          </Button>
        </div>
      </Card>

      {/* Add Application Form */}
      {showAddForm && (
        <Card className="p-6 border-2 border-indigo-200 bg-indigo-50">
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Registrar Nova Aplicação
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Data
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-indigo-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Horário
              </label>
              <input
                type="time"
                className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-indigo-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Local do Corpo
              </label>
              <select className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-indigo-600 focus:outline-none">
                {bodyLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Produto
              </label>
              <input
                type="text"
                placeholder="Ex: Testosterona Enantato"
                className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-indigo-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Dosagem
              </label>
              <input
                type="text"
                placeholder="Ex: 250mg"
                className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-indigo-600 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Salvar Aplicação
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowAddForm(false)}
            >
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">Total de Aplicações</h3>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-slate-800">{applications.length}</div>
          <p className="text-sm text-slate-600 mt-1">Últimos 30 dias</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">Última Aplicação</h3>
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-slate-800">3 dias</div>
          <p className="text-sm text-slate-600 mt-1">atrás</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">Próxima Aplicação</h3>
            <CalendarIcon className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-slate-800">1 dia</div>
          <p className="text-sm text-slate-600 mt-1">restante</p>
        </Card>
      </div>

      {/* Timeline */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6">
          Histórico de Aplicações
        </h3>
        <div className="space-y-4">
          {applications.map((app, index) => (
            <div
              key={app.id}
              className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-800">{app.product}</h4>
                  <span className="text-sm text-slate-600">{app.date}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4" />
                    {app.time}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4" />
                    {app.location}
                  </div>
                  <div className="font-semibold text-indigo-600">
                    {app.dosage}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Body Location Distribution */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6">
          Distribuição por Local do Corpo
        </h3>
        <div className="space-y-3">
          {bodyLocations.map((location) => {
            const count = applications.filter(app => app.location === location).length;
            const percentage = (count / applications.length) * 100;
            
            return (
              <div key={location}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-700">{location}</span>
                  <span className="font-semibold text-slate-800">{count} aplicações</span>
                </div>
                <div className="bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
