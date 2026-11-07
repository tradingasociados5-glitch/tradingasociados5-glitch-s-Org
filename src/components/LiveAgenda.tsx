import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  MessageCircle, 
  User, 
  Sparkles, 
  AlertCircle,
  Scissors,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { Appointment, ServiceAddon, ServiceItem, Technician } from '../types';
import { WhatsAppPreviewModal } from './WhatsAppPreviewModal';

interface LiveAgendaProps {
  technicians: Technician[];
  services: ServiceItem[];
  addons: ServiceAddon[];
  appointments: Appointment[];
  onAddAppointment: (apt: Appointment) => void;
  onUpdateStatus: (aptId: string, status: Appointment['status']) => void;
  onNavigateToPOS: (aptId: string) => void;
}

export const LiveAgenda: React.FC<LiveAgendaProps> = ({
  technicians,
  services,
  addons,
  appointments,
  onAddAppointment,
  onUpdateStatus,
  onNavigateToPOS
}) => {
  const [selectedTechFilter, setSelectedTechFilter] = useState<string>('all');
  const [isNewAptModalOpen, setIsNewAptModalOpen] = useState(false);
  const [whatsAppModalApt, setWhatsAppModalApt] = useState<Appointment | null>(null);

  // New Appointment Form State
  const [formClientName, setFormClientName] = useState('');
  const [formClientPhone, setFormClientPhone] = useState('');
  const [formTechId, setFormTechId] = useState(technicians[0]?.id || '');
  const [formServiceId, setFormServiceId] = useState(services[0]?.id || '');
  const [formSelectedAddons, setFormSelectedAddons] = useState<string[]>([]);
  const [formStartTime, setFormStartTime] = useState('15:00');
  const [formNotes, setFormNotes] = useState('');

  const formatCOP = (val: number) => `$ ${val.toLocaleString('es-CO')}`;

  const currentService = services.find(s => s.id === formServiceId);
  const currentSelectedAddonsList = addons.filter(a => formSelectedAddons.includes(a.id));

  const calculatedBaseDuration = currentService?.baseDurationMin || 60;
  const calculatedAddonsDuration = currentSelectedAddonsList.reduce((acc, a) => acc + a.extraMinutes, 0);
  const calculatedBuffer = currentService?.bufferMin || 15;
  const totalServiceDuration = calculatedBaseDuration + calculatedAddonsDuration;
  const totalOccupiedTime = totalServiceDuration + calculatedBuffer;

  const calculatedTotalPrice = (currentService?.basePrice || 50000) + currentSelectedAddonsList.reduce((acc, a) => acc + a.extraPrice, 0);

  const toggleAddon = (addonId: string) => {
    setFormSelectedAddons(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formClientName.trim()) return;

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      clientId: `cli-${Date.now()}`,
      clientName: formClientName,
      clientPhone: formClientPhone || '+52 55 0000 0000',
      technicianId: formTechId,
      serviceId: formServiceId,
      addonIds: formSelectedAddons,
      date: '2026-11-07',
      startTime: formStartTime,
      durationMinutes: totalServiceDuration,
      totalPrice: calculatedTotalPrice,
      status: 'confirmed',
      reminderSent: true,
      depositPaid: 15,
      notes: formNotes
    };

    onAddAppointment(newApt);
    setIsNewAptModalOpen(false);
    // Reset form
    setFormClientName('');
    setFormClientPhone('');
    setFormSelectedAddons([]);
    setFormNotes('');
  };

  const filteredAppointments = appointments.filter(apt => {
    if (selectedTechFilter === 'all') return true;
    return apt.technicianId === selectedTechFilter;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            <span>Operación en Cabina</span>
            <span aria-hidden="true">·</span>
            <span>Despacho de Turnos & Esterilización</span>
          </div>
          <h2 className="text-xl font-bold text-neutral-950 mt-1">
            Agenda Multi-Técnica & Despacho de Mesas
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Buffer automático de 15 min de desinfección en autoclave entre clientas. Cero sobreposición.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsNewAptModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Cita con Buffer</span>
          </button>
        </div>
      </div>

      {/* Technician Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedTechFilter('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            selectedTechFilter === 'all'
              ? 'bg-neutral-900 text-white'
              : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
          }`}
        >
          Todas las Mesas ({appointments.length} citas)
        </button>

        {technicians.map((tech) => {
          const techAptCount = appointments.filter(a => a.technicianId === tech.id).length;
          return (
            <button
              key={tech.id}
              onClick={() => setSelectedTechFilter(tech.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                selectedTechFilter === tech.id
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
              }`}
            >
              <span>Mesa {tech.chairNumber}: {tech.name}</span>
              <span className="font-mono text-[10px] opacity-70">({techAptCount})</span>
            </button>
          );
        })}
      </div>

      {/* Technicians Status Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {technicians.map((tech) => {
          const currentApt = appointments.find(a => a.technicianId === tech.id && a.status === 'in_chair');
          return (
            <div 
              key={tech.id} 
              className="bg-white border border-neutral-200 rounded-xl p-4 space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center font-bold text-neutral-700 text-xs">
                    {tech.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-neutral-900">{tech.name}</h4>
                    <span className="text-[11px] text-neutral-500 block">Mesa {tech.chairNumber} · {tech.specialty}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-neutral-500">Estado actual:</span>
                <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${
                  tech.status === 'in_service'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : tech.status === 'active'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-neutral-100 text-neutral-700'
                }`}>
                  {tech.status === 'in_service' ? 'En Cabina (Ocupada)' : tech.status === 'active' ? 'Disponible' : 'En Descanso'}
                </span>
              </div>

              {currentApt && (
                <div className="p-2 bg-amber-50/60 border border-amber-200/60 rounded text-[11px] text-amber-950">
                  <span className="font-semibold block truncate">Atendiendo a: {currentApt.clientName}</span>
                  <span className="text-amber-800 text-[10px]">Hasta: {currentApt.startTime} ({currentApt.durationMinutes}m)</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Appointment Timeline List */}
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
        <div className="px-5 py-3.5 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-neutral-600" />
            <h3 className="font-bold text-neutral-900 text-xs uppercase tracking-wider">
              Turnos Programados para Hoy (7 de Noviembre, 2026)
            </h3>
          </div>
          <span className="text-xs text-neutral-500 font-mono">
            {filteredAppointments.length} citas registradas
          </span>
        </div>

        <div className="divide-y divide-neutral-100">
          {filteredAppointments.length === 0 ? (
            <div className="p-12 text-center text-neutral-500 space-y-2">
              <p className="text-sm">No hay citas registradas para este filtro.</p>
              <button
                onClick={() => setIsNewAptModalOpen(true)}
                className="px-3 py-1.5 text-xs font-medium text-neutral-900 bg-neutral-100 rounded hover:bg-neutral-200"
              >
                Crear Primera Cita
              </button>
            </div>
          ) : (
            filteredAppointments.map((apt) => {
              const tech = technicians.find(t => t.id === apt.technicianId);
              const service = services.find(s => s.id === apt.serviceId);
              const aptAddons = addons.filter(a => apt.addonIds.includes(a.id));

              return (
                <div key={apt.id} className="p-4 sm:p-5 hover:bg-neutral-50/70 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Time and Client */}
                  <div className="flex items-start gap-4">
                    <div className="text-center w-16 shrink-0 py-1.5 px-2 bg-neutral-100 rounded-lg border border-neutral-200/80">
                      <span className="text-xs font-bold text-neutral-900 block font-mono">{apt.startTime}</span>
                      <span className="text-[10px] text-neutral-500 block font-mono">{apt.durationMinutes} min</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-950 text-sm">{apt.clientName}</span>
                        <span className="text-xs text-neutral-500 font-mono">· {apt.clientPhone}</span>
                      </div>
                      <p className="text-xs font-medium text-neutral-800">
                        {service?.name || 'Servicio'}
                      </p>

                      {aptAddons.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {aptAddons.map(ad => (
                            <span key={ad.id} className="px-1.5 py-0.5 bg-neutral-100 text-neutral-700 rounded text-[10px]">
                              +{ad.name} ({ad.extraMinutes}m)
                            </span>
                          ))}
                        </div>
                      )}

                      {apt.notes && (
                        <p className="text-[11px] text-neutral-500 italic">
                          Nota: {apt.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Center: Specialist assignment & Buffer */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-[11px] text-neutral-400 block">Especialista / Mesa</span>
                      <span className="font-semibold text-neutral-900">{tech?.name}</span>
                      <span className="text-neutral-500 block text-[11px]">Mesa #{tech?.chairNumber}</span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[11px] text-neutral-400 block">Total Servicio</span>
                      <span className="font-bold text-neutral-900 font-mono text-sm">{formatCOP(apt.totalPrice)}</span>
                      {apt.depositPaid > 0 && (
                        <span className="text-[10px] text-emerald-700 block">Anticipo: {formatCOP(apt.depositPaid)} pagado</span>
                      )}
                      {apt.modality && (
                        <span className="text-[10px] text-[#8C6B2D] font-medium block">
                          {apt.modality === 'domicilio' ? '🚗 A Domicilio' : '🏠 En Studio'}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-[11px] text-neutral-400 block mb-1">Estado de Cita</span>
                      <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${
                        apt.status === 'in_chair'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : apt.status === 'confirmed'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : apt.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}>
                        {apt.status === 'in_chair' ? 'En Cabina / Atendiendo' : apt.status === 'confirmed' ? 'Confirmada' : apt.status === 'completed' ? 'Completada / Pagada' : 'Cancelada'}
                      </span>
                    </div>
                  </div>

                  {/* Right: Operational Actions */}
                  <div className="flex items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-neutral-100 shrink-0">
                    {/* Trigger WhatsApp Simulator */}
                    <button
                      onClick={() => setWhatsAppModalApt(apt)}
                      title="Ver recordatorio WhatsApp automatizado"
                      className="p-2 text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors flex items-center gap-1.5 text-xs font-medium"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>

                    {apt.status === 'confirmed' && (
                      <button
                        onClick={() => onUpdateStatus(apt.id, 'in_chair')}
                        className="px-3 py-1.5 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                      >
                        Pasar a Cabina
                      </button>
                    )}

                    {apt.status === 'in_chair' && (
                      <button
                        onClick={() => onNavigateToPOS(apt.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>Cobrar en POS</span>
                      </button>
                    )}

                    {apt.status === 'completed' && (
                      <span className="text-xs text-emerald-700 font-medium flex items-center gap-1 px-2 py-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Liquidada</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* NEW APPOINTMENT MODAL */}
      {isNewAptModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-neutral-950">Agendar Cita con Buffer de Desinfección</h3>
                <p className="text-xs text-neutral-500">El motor calcula automáticamente el tiempo de manicura + add-ons + esterilización.</p>
              </div>
              <button
                onClick={() => setIsNewAptModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Nombre de la Clienta</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Mariana Solís"
                    value={formClientName}
                    onChange={(e) => setFormClientName(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Teléfono WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+52 55 ..."
                    value={formClientPhone}
                    onChange={(e) => setFormClientPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Especialista / Mesa</label>
                  <select
                    value={formTechId}
                    onChange={(e) => setFormTechId(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-neutral-900 bg-white"
                  >
                    {technicians.map(t => (
                      <option key={t.id} value={t.id}>
                        Mesa {t.chairNumber}: {t.name} ({t.specialty})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Hora de Inicio</label>
                  <select
                    value={formStartTime}
                    onChange={(e) => setFormStartTime(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-mono bg-white"
                  >
                    <option value="10:00">10:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:30">04:30 PM</option>
                    <option value="18:00">06:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-neutral-800 block mb-1">Servicio Base</label>
                <select
                  value={formServiceId}
                  onChange={(e) => setFormServiceId(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-neutral-900 bg-white"
                >
                  {services.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} — {formatCOP(s.basePrice)} ({s.baseDurationMin} min)
                    </option>
                  ))}
                </select>
              </div>

              {/* Add-ons selection */}
              <div>
                <label className="font-semibold text-neutral-800 block mb-1.5">
                  Complementos / Add-ons (Calculan tiempo extra real)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {addons.map(addon => {
                    const isSelected = formSelectedAddons.includes(addon.id);
                    return (
                      <button
                        type="button"
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                        }`}
                      >
                        <div>
                          <span className="font-medium block leading-tight">{addon.name}</span>
                          <span className={`text-[10px] ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                            +{addon.extraMinutes} min · +{formatCOP(addon.extraPrice)}
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className="w-3.5 h-3.5 rounded text-neutral-900 focus:ring-0"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Duration Math Banner */}
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between text-neutral-600">
                  <span>Duración servicio + add-ons:</span>
                  <span className="font-bold text-neutral-900">{totalServiceDuration} minutos</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Buffer desinfección/esterilización:</span>
                  <span className="font-semibold text-amber-700">+{calculatedBuffer} minutos</span>
                </div>
                <div className="flex justify-between border-t border-neutral-200 pt-1 text-xs font-bold text-neutral-900">
                  <span>Slot total reservado en silla:</span>
                  <span>{totalOccupiedTime} minutos</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-emerald-800">
                  <span>Precio estimado:</span>
                  <span>{formatCOP(calculatedTotalPrice)} COP</span>
                </div>
              </div>

              <div>
                <label className="font-semibold text-neutral-800 block mb-1">Notas especiales (Alergias, diseño deseado)</label>
                <input
                  type="text"
                  placeholder="ej. Desea almendradas tono milky white"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsNewAptModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 shadow-xs"
                >
                  Confirmar y Bloquear Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WhatsApp Modal Simulator */}
      {whatsAppModalApt && (
        <WhatsAppPreviewModal
          isOpen={!!whatsAppModalApt}
          onClose={() => setWhatsAppModalApt(null)}
          appointment={whatsAppModalApt}
          service={services.find(s => s.id === whatsAppModalApt.serviceId)}
          technician={technicians.find(t => t.id === whatsAppModalApt.technicianId)}
          onConfirmAppointment={(id) => {
            onUpdateStatus(id, 'confirmed');
          }}
        />
      )}
    </div>
  );
};
