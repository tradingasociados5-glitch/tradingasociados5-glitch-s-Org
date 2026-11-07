import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  MapPin, 
  Calendar, 
  Check, 
  Instagram, 
  Phone, 
  ShieldCheck, 
  Heart, 
  ExternalLink,
  FileImage,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { MICHELLE_BRAND } from '../data/salonMockData';
import { Appointment, ServiceAddon, ServiceItem, Technician } from '../types';

interface ClientBookingPortalProps {
  services: ServiceItem[];
  addons: ServiceAddon[];
  technicians: Technician[];
  onBookAppointment: (apt: Appointment) => void;
  onViewPriceSheet: () => void;
}

export const ClientBookingPortal: React.FC<ClientBookingPortalProps> = ({
  services,
  addons,
  technicians,
  onBookAppointment,
  onViewPriceSheet
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || 'srv-poly-tip');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [selectedTechId, setSelectedTechId] = useState<string>(technicians[0]?.id || 'tech-michelle');
  const [modality, setModality] = useState<'studio' | 'domicilio'>('studio');
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-08');
  const [selectedTime, setSelectedTime] = useState<string>('10:00');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [domicilioAddress, setDomicilioAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const selectedService = services.find(s => s.id === selectedServiceId);
  const selectedAddonsList = addons.filter(a => selectedAddonIds.includes(a.id));
  const selectedTech = technicians.find(t => t.id === selectedTechId);

  const basePrice = selectedService?.basePrice || 100000;
  const addonsPrice = selectedAddonsList.reduce((acc, a) => acc + a.extraPrice, 0);
  const domicilioFee = modality === 'domicilio' ? 10000 : 0;
  const grandTotalCOP = basePrice + addonsPrice + domicilioFee;

  const baseDuration = selectedService?.baseDurationMin || 90;
  const extraDuration = selectedAddonsList.reduce((acc, a) => acc + a.extraMinutes, 0);
  const totalDuration = baseDuration + extraDuration;

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const formatCOP = (val: number) => {
    return `$ ${val.toLocaleString('es-CO')}`;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      alert('Por favor ingresa tu nombre y número de WhatsApp para confirmar.');
      return;
    }

    const newApt: Appointment = {
      id: `apt-online-${Date.now()}`,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientId: `cli-${Date.now()}`,
      technicianId: selectedTechId,
      serviceId: selectedServiceId,
      addonIds: selectedAddonIds,
      date: selectedDate,
      startTime: selectedTime,
      durationMinutes: totalDuration,
      totalPrice: grandTotalCOP,
      status: 'confirmed',
      reminderSent: true,
      depositPaid: 0,
      notes: notes.trim(),
      modality: modality,
      address: modality === 'domicilio' ? domicilioAddress.trim() : 'Studio Michelle Pérez'
    };

    onBookAppointment(newApt);
    setIsSuccessModalOpen(true);
  };

  // WhatsApp text formatting for direct booking
  const whatsAppMessage = `Hola Michelle ✨ Quisiera confirmar mi cita en @michellenails.co:
• Servicio: ${selectedService?.name} (${formatCOP(basePrice)})
${selectedAddonsList.length > 0 ? `• Adicionales: ${selectedAddonsList.map(a => `${a.name} (+${formatCOP(a.extraPrice)})`).join(', ')}\n` : ''}• Modalidad: ${modality === 'studio' ? 'En Studio' : `A Domicilio (${domicilioAddress || 'Pereira/Dosquebradas'})`}
• Fecha y Hora: ${selectedDate} a las ${selectedTime}
• Especialista: ${selectedTech?.name}
• Total estimado: ${formatCOP(grandTotalCOP)}
• Mi Nombre: ${clientName || 'Cliente'}
${notes ? `• Nota: ${notes}` : ''}`;

  const whatsAppUrl = `https://wa.me/${MICHELLE_BRAND.whatsappRaw}?text=${encodeURIComponent(whatsAppMessage)}`;

  return (
    <div className="space-y-8 pb-16">
      {/* Brand Luxury Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#F5EFEB] via-[#FAF7F2] to-[#F3ECE2] border border-[#E3D7C5] p-6 sm:p-10 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* Circular Gold Badge Logo */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#D4AF37]/50 shadow-md bg-white p-1">
                <img
                  src={MICHELLE_BRAND.assets.logoCircular}
                  alt="Michelle Pérez Nails Studio Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs uppercase tracking-[0.2em] text-[#8C6B2D] font-medium">
                <span>Nails Studio</span>
                <span aria-hidden="true">·</span>
                <span>Pereira & Dosquebradas</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#261F1A]">
                Michelle Pérez Nails
              </h1>
              <p className="text-xs sm:text-sm text-[#5C4D42] max-w-lg leading-relaxed">
                Reserva tu cita online. Especialistas en <strong>Polygel, Press On y Nivelación Rubber</strong>. Atención exclusiva en Studio y servicio A Domicilio.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#735F48]">
                <a
                  href={MICHELLE_BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#261F1A] transition-colors font-medium text-[#8C6B2D]"
                >
                  <Instagram className="w-4 h-4" />
                  <span>{MICHELLE_BRAND.instagram}</span>
                </a>
                <span className="flex items-center gap-1.5 font-mono">
                  <Phone className="w-3.5 h-3.5 text-[#8C6B2D]" />
                  <span>{MICHELLE_BRAND.whatsappNumber}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>5 días de garantía en sistemas</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick CTA: View Original Menu & WhatsApp */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={onViewPriceSheet}
              className="px-4 py-2.5 bg-white border border-[#D9C8B2] hover:border-[#8C6B2D] rounded-xl text-xs font-semibold text-[#3D3025] hover:bg-[#FAF6F0] transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <FileImage className="w-4 h-4 text-[#8C6B2D]" />
              <span>Ver Folleto de Precios Original</span>
            </button>
            <a
              href={`https://wa.me/${MICHELLE_BRAND.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#261F1A] hover:bg-[#1A1614] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Escríbenos a WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Booking Interactive Form */}
      <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Services, Modality & Add-ons (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Modality Selection (Studio vs Domicilio) */}
          <div className="bg-white rounded-2xl border border-[#E8DEC8] p-5 sm:p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#8C6B2D] uppercase tracking-wider">
                1. Selecciona la Modalidad de Atención
              </h2>
              <span className="text-[11px] text-[#735F48]">Pereira & Dosquebradas</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setModality('studio')}
                className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                  modality === 'studio'
                    ? 'bg-[#FAF6F0] border-[#8C6B2D] ring-1 ring-[#8C6B2D]'
                    : 'bg-white border-[#E8DEC8] hover:bg-[#FAF7F2]'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                  modality === 'studio' ? 'bg-[#8C6B2D] text-white' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  🏠
                </div>
                <div>
                  <span className="font-bold text-xs sm:text-sm text-[#261F1A] block">Atención en Studio</span>
                  <span className="text-[11px] text-[#5C4D42] block mt-0.5">
                    Ambiente climatizado, café de cortesía e instrumental esterilizado en autoclave.
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setModality('domicilio')}
                className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                  modality === 'domicilio'
                    ? 'bg-[#FAF6F0] border-[#8C6B2D] ring-1 ring-[#8C6B2D]'
                    : 'bg-white border-[#E8DEC8] hover:bg-[#FAF7F2]'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                  modality === 'domicilio' ? 'bg-[#8C6B2D] text-white' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  🚗
                </div>
                <div>
                  <span className="font-bold text-xs sm:text-sm text-[#261F1A] block">Servicio A Domicilio</span>
                  <span className="text-[11px] text-[#5C4D42] block mt-0.5">
                    En la comodidad de tu hogar en Pereira o Dosquebradas (+{formatCOP(10000)} transporte).
                  </span>
                </div>
              </button>
            </div>

            {modality === 'domicilio' && (
              <div className="pt-2 animate-in fade-in slide-in-from-top-1">
                <label className="font-semibold text-xs text-[#261F1A] block mb-1">
                  Dirección exacta en Pereira o Dosquebradas (Barrio / Conjunto / Torre / Apto)
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. Pereira · Sector Pinares, Edificio Torreón Apt 602"
                  value={domicilioAddress}
                  onChange={(e) => setDomicilioAddress(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[#D9C8B2] rounded-xl text-xs focus:outline-hidden focus:ring-1 focus:ring-[#8C6B2D] bg-[#FAF8F5]"
                />
              </div>
            )}
          </div>

          {/* Step 2: Choose Official Service from Michelle's Menu */}
          <div className="bg-white rounded-2xl border border-[#E8DEC8] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#8C6B2D] uppercase tracking-wider">
                2. Elige tu Servicio Principal (Catálogo Oficial)
              </h2>
              <span className="text-xs text-[#735F48] font-mono">11 servicios disponibles</span>
            </div>

            <div className="space-y-2.5">
              {services.map((srv) => {
                const isSelected = srv.id === selectedServiceId;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#FAF6F0] border-[#8C6B2D] shadow-xs ring-1 ring-[#8C6B2D]'
                        : 'bg-white border-[#EAE0CD] hover:border-[#C4B29A] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#261F1A] font-serif">
                          {srv.name}
                        </span>
                        {srv.isPopular && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F3ECE2] text-[#8C6B2D] border border-[#DECDB8]">
                            Más Pedido
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#5C4D42] line-clamp-2 leading-relaxed">
                        {srv.description}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-[#735F48] pt-1">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-[#8C6B2D]" />
                          <span>{srv.baseDurationMin} minutos</span>
                        </span>
                        <span>·</span>
                        <span className="capitalize">{srv.category}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-base font-bold text-[#261F1A] block">
                        {formatCOP(srv.basePrice)}
                      </span>
                      <span className="text-[10px] text-[#735F48]">COP</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Add-ons from Michelle's Menu */}
          <div className="bg-white rounded-2xl border border-[#E8DEC8] p-5 sm:p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#8C6B2D] uppercase tracking-wider">
                3. Adicionales de Preparación y Retiro
              </h2>
              <span className="text-[11px] text-[#735F48]">Calcula tiempo y tarifa exacta</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {addons.map((addon) => {
                const isSelected = selectedAddonIds.includes(addon.id);
                return (
                  <button
                    type="button"
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#261F1A] text-white border-[#261F1A]'
                        : 'bg-white text-[#261F1A] border-[#E8DEC8] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-xs block leading-tight">
                        {addon.name}
                      </span>
                      <span className={`text-[11px] font-mono mt-0.5 block ${isSelected ? 'text-[#D4AF37]' : 'text-[#8C6B2D]'}`}>
                        +{formatCOP(addon.extraPrice)} · +{addon.extraMinutes}m
                      </span>
                    </div>
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] shrink-0 mt-0.5 ${
                      isSelected ? 'bg-white text-[#261F1A] border-white font-bold' : 'border-neutral-300'
                    }`}>
                      {isSelected ? '✓' : ''}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Specialist, Date, Time & WhatsApp Checkout (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E8DEC8] p-5 sm:p-6 shadow-xs space-y-5 sticky top-20">
            {/* Monogram Brand Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE0CD]">
              <div className="flex items-center gap-3">
                <img
                  src={MICHELLE_BRAND.assets.logoMonogram}
                  alt="Michelle Pérez Monogram"
                  className="w-10 h-10 object-contain rounded-lg border border-[#E8DEC8] p-0.5 bg-[#FAF7F2]"
                />
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#261F1A]">Resumen de tu Cita</h3>
                  <span className="text-[11px] text-[#8C6B2D] block font-medium">@michellenails.co</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#8C6B2D] bg-[#F5EFEB] px-2 py-1 rounded-md border border-[#E3D7C5]">
                {totalDuration} min
              </span>
            </div>

            {/* Specialist Picker */}
            <div>
              <label className="font-semibold text-xs text-[#261F1A] block mb-1.5">
                Especialista
              </label>
              <div className="space-y-1.5">
                {technicians.map((t) => (
                  <label
                    key={t.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                      selectedTechId === t.id
                        ? 'bg-[#FAF6F0] border-[#8C6B2D] font-bold text-[#261F1A]'
                        : 'border-[#E8DEC8] text-[#5C4D42] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="specialist"
                        value={t.id}
                        checked={selectedTechId === t.id}
                        onChange={() => setSelectedTechId(t.id)}
                        className="text-[#8C6B2D] focus:ring-0"
                      />
                      <span>{t.name}</span>
                    </div>
                    <span className="text-[10px] text-[#8C6B2D] font-normal">{t.specialty.split('·')[0]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="font-semibold text-[#261F1A] block mb-1">Fecha</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D9C8B2] rounded-xl text-xs font-mono bg-[#FAF8F5] focus:outline-hidden focus:ring-1 focus:ring-[#8C6B2D]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#261F1A] block mb-1">Hora</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D9C8B2] rounded-xl text-xs font-mono bg-[#FAF8F5] focus:outline-hidden focus:ring-1 focus:ring-[#8C6B2D]"
                >
                  <option value="09:00">09:00 AM</option>
                  <option value="10:30">10:30 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:30">03:30 PM</option>
                  <option value="17:00">05:00 PM</option>
                </select>
              </div>
            </div>

            {/* Client Personal Info */}
            <div className="space-y-2 pt-2 border-t border-[#EAE0CD] text-xs">
              <div>
                <label className="font-semibold text-[#261F1A] block mb-1">Tu Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Valentina Montoya"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D9C8B2] rounded-xl text-xs focus:outline-hidden focus:ring-1 focus:ring-[#8C6B2D]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#261F1A] block mb-1">Tu WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="+57 3..."
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D9C8B2] rounded-xl text-xs font-mono focus:outline-hidden focus:ring-1 focus:ring-[#8C6B2D]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#261F1A] block mb-1">Detalle o diseño deseado (opcional)</label>
                <input
                  type="text"
                  placeholder="ej. Francés en V con baby boomer suave"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D9C8B2] rounded-xl text-xs focus:outline-hidden focus:ring-1 focus:ring-[#8C6B2D]"
                />
              </div>
            </div>

            {/* Price Breakdown in COP */}
            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-[#5C4D42]">
                <span>{selectedService?.name}:</span>
                <span className="font-bold text-[#261F1A]">{formatCOP(basePrice)}</span>
              </div>

              {selectedAddonsList.map((a) => (
                <div key={a.id} className="flex justify-between text-[#735F48] text-[11px]">
                  <span>+{a.name}:</span>
                  <span>+{formatCOP(a.extraPrice)}</span>
                </div>
              ))}

              {modality === 'domicilio' && (
                <div className="flex justify-between text-[#8C6B2D] text-[11px]">
                  <span>+ Transporte Domicilio:</span>
                  <span>+{formatCOP(domicilioFee)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-[#DECDB8] flex justify-between text-sm sm:text-base font-bold text-[#261F1A]">
                <span>Total a Pagar:</span>
                <span className="text-[#8C6B2D]">{formatCOP(grandTotalCOP)} COP</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#261F1A] hover:bg-[#1A1614] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Confirmar Cita & Notificar a Michelle</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>

            <p className="text-[11px] text-center text-[#735F48]">
              No cobramos anticipo por la web. Pagas al finalizar tu servicio en efectivo o transferencia.
            </p>
          </div>
        </div>
      </form>

      {/* Success Modal with direct WhatsApp Dispatch */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#261F1A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D9C8B2] space-y-5 animate-in fade-in zoom-in-95 duration-150 text-center">
            <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border-2 border-[#D4AF37] flex items-center justify-center mx-auto text-2xl shadow-sm">
              ✨
            </div>

            <div className="space-y-1">
              <span className="text-xs font-serif italic text-[#8C6B2D] block">Michelle Pérez Nails Studio</span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#261F1A]">
                ¡Tu Cita ha sido Reservada con Éxito!
              </h3>
              <p className="text-xs text-[#5C4D42] max-w-sm mx-auto leading-relaxed">
                Hemos registrado tu espacio en la agenda de <strong>{selectedTech?.name}</strong> para el <strong>{selectedDate}</strong> a las <strong>{selectedTime}</strong>.
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] text-left text-xs font-mono space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#735F48]">Servicio:</span>
                <span className="font-bold text-[#261F1A]">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#735F48]">Modalidad:</span>
                <span className="font-medium text-[#261F1A]">{modality === 'studio' ? 'En Studio' : 'A Domicilio'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#735F48]">Total:</span>
                <span className="font-bold text-[#8C6B2D]">{formatCOP(grandTotalCOP)} COP</span>
              </div>
            </div>

            {/* Direct WhatsApp button */}
            <div className="space-y-2 pt-2">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Enviar Confirmación a WhatsApp de Michelle (304 4420816)</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setIsSuccessModalOpen(false)}
                className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Cerrar y Ver Mi Agenda
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
