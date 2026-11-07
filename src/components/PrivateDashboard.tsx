import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Package, 
  Layers, 
  LogOut, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { LiveAgenda } from './LiveAgenda';
import { ClientDossier } from './ClientDossier';
import { CommissionPOS } from './CommissionPOS';
import { InventoryTracker } from './InventoryTracker';
import { StrategicBlueprint } from './StrategicBlueprint';
import { Appointment, ClientNailProfile, ServiceAddon, ServiceItem, Technician } from '../types';

interface PrivateDashboardProps {
  technicians: Technician[];
  services: ServiceItem[];
  addons: ServiceAddon[];
  appointments: Appointment[];
  clients: ClientNailProfile[];
  onAddAppointment: (apt: Appointment) => void;
  onUpdateStatus: (aptId: string, status: Appointment['status']) => void;
  onUpdateClient: (client: ClientNailProfile) => void;
  onCompletePayment: (aptId: string) => void;
  onLogout: () => void;
}

export const PrivateDashboard: React.FC<PrivateDashboardProps> = ({
  technicians,
  services,
  addons,
  appointments,
  clients,
  onAddAppointment,
  onUpdateStatus,
  onUpdateClient,
  onCompletePayment,
  onLogout
}) => {
  const [activeDashboardTab, setActiveDashboardTab] = useState<'agenda' | 'clients' | 'pos' | 'inventory' | 'blueprint'>('agenda');
  const [posAptId, setPosAptId] = useState<string | undefined>(undefined);

  const formatCOP = (val: number) => `$ ${val.toLocaleString('es-CO')}`;

  // KPI Calculations
  const totalRevenueCOP = appointments.reduce((acc, a) => acc + (a.status === 'completed' || a.status === 'in_chair' ? a.totalPrice : 0), 0);
  const activeCount = appointments.filter(a => a.status === 'in_chair' || a.status === 'confirmed').length;

  const handleNavigateToPOS = (aptId: string) => {
    setPosAptId(aptId);
    setActiveDashboardTab('pos');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Private Admin Header Bar */}
      <div className="bg-[#261F1A] text-white rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center font-serif text-[#D4AF37] font-bold text-sm shrink-0">
            MP
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] text-[#D4AF37] uppercase tracking-widest font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sesión Privada Activa · Modo Administradora</span>
            </div>
            <h1 className="text-lg sm:text-xl font-serif font-bold text-white">
              Studio OS: Control Operativo & Finanzas
            </h1>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 border border-white/15 shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Web Pública</span>
        </button>
      </div>

      {/* Quick KPI Cards Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E8DEC8] shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-[#8C6B2D] uppercase tracking-wider block">
            Facturación en Curso
          </span>
          <span className="font-mono text-lg font-bold text-[#261F1A] block">
            {formatCOP(totalRevenueCOP)}
          </span>
          <span className="text-[10px] text-[#735F48]">Turnos del día en Pereira</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E8DEC8] shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-[#8C6B2D] uppercase tracking-wider block">
            Citas Programadas
          </span>
          <span className="font-mono text-lg font-bold text-[#261F1A] block">
            {activeCount} Citas Activas
          </span>
          <span className="text-[10px] text-emerald-700 font-medium">1 en cabina ahora mismo</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E8DEC8] shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-[#8C6B2D] uppercase tracking-wider block">
            Clientas en Expediente
          </span>
          <span className="font-mono text-lg font-bold text-[#261F1A] block">
            {clients.length} Fichas Clínicas
          </span>
          <span className="text-[10px] text-[#735F48]">Con control de alergias HEMA</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E8DEC8] shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-[#8C6B2D] uppercase tracking-wider block">
            Especialistas Activas
          </span>
          <span className="font-mono text-lg font-bold text-[#261F1A] block">
            {technicians.length} Mesas de Trabajo
          </span>
          <span className="text-[10px] text-[#735F48]">Michelle, Valentina & Camila</span>
        </div>
      </div>

      {/* Internal Dashboard Tabs */}
      <div className="flex items-center gap-1.5 border-b border-[#E8DEC8] pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveDashboardTab('agenda')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeDashboardTab === 'agenda'
              ? 'bg-[#261F1A] text-white shadow-xs'
              : 'bg-white text-[#5C4D42] hover:text-[#261F1A] border border-[#E8DEC8]'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Agenda & Mesas de Trabajo</span>
        </button>

        <button
          onClick={() => setActiveDashboardTab('clients')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeDashboardTab === 'clients'
              ? 'bg-[#261F1A] text-white shadow-xs'
              : 'bg-white text-[#5C4D42] hover:text-[#261F1A] border border-[#E8DEC8]'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Fichas Clínicas & Retención</span>
        </button>

        <button
          onClick={() => setActiveDashboardTab('pos')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeDashboardTab === 'pos'
              ? 'bg-[#261F1A] text-white shadow-xs'
              : 'bg-white text-[#5C4D42] hover:text-[#261F1A] border border-[#E8DEC8]'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Caja, POS & Comisiones</span>
        </button>

        <button
          onClick={() => setActiveDashboardTab('inventory')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeDashboardTab === 'inventory'
              ? 'bg-[#261F1A] text-white shadow-xs'
              : 'bg-white text-[#5C4D42] hover:text-[#261F1A] border border-[#E8DEC8]'
          }`}
        >
          <Package className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Insumos & Inventario</span>
        </button>

        <button
          onClick={() => setActiveDashboardTab('blueprint')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeDashboardTab === 'blueprint'
              ? 'bg-[#261F1A] text-white shadow-xs'
              : 'bg-white text-[#5C4D42] hover:text-[#261F1A] border border-[#E8DEC8]'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Blueprint SaaS & Repos GitHub</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="pt-2">
        {activeDashboardTab === 'agenda' && (
          <LiveAgenda
            technicians={technicians}
            services={services}
            addons={addons}
            appointments={appointments}
            onAddAppointment={onAddAppointment}
            onUpdateStatus={onUpdateStatus}
            onNavigateToPOS={handleNavigateToPOS}
          />
        )}

        {activeDashboardTab === 'clients' && (
          <ClientDossier
            clients={clients}
            onUpdateClient={onUpdateClient}
          />
        )}

        {activeDashboardTab === 'pos' && (
          <CommissionPOS
            technicians={technicians}
            services={services}
            appointments={appointments}
            preSelectedAptId={posAptId}
            onCompletePayment={onCompletePayment}
          />
        )}

        {activeDashboardTab === 'inventory' && (
          <InventoryTracker />
        )}

        {activeDashboardTab === 'blueprint' && (
          <StrategicBlueprint onNavigateToTab={(tab) => {
            if (tab === 'agenda' || tab === 'clients' || tab === 'pos' || tab === 'inventory') {
              setActiveDashboardTab(tab);
            }
          }} />
        )}
      </div>
    </div>
  );
};
