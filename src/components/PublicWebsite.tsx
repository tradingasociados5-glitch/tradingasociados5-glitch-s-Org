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
  ArrowRight,
  ChevronDown,
  Lock,
  Star,
  CheckCircle2,
  Home,
  Car
} from 'lucide-react';
import { MICHELLE_BRAND } from '../data/salonMockData';
import { Appointment, ServiceAddon, ServiceItem, Technician } from '../types';

interface PublicWebsiteProps {
  services: ServiceItem[];
  addons: ServiceAddon[];
  technicians: Technician[];
  onBookAppointment: (apt: Appointment) => void;
  onOpenFlyerModal: () => void;
  onOpenAdminLogin: () => void;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({
  services,
  addons,
  technicians,
  onBookAppointment,
  onOpenFlyerModal,
  onOpenAdminLogin
}) => {
  // Booking widget form state
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
  const [menuFilter, setMenuFilter] = useState<string>('all');

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

  const formatCOP = (val: number) => `$ ${val.toLocaleString('es-CO')}`;

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
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

  const whatsAppBookingMessage = `Hola Michelle ✨ Quisiera confirmar mi cita en @michellenails.co:
• Servicio: ${selectedService?.name} (${formatCOP(basePrice)})
${selectedAddonsList.length > 0 ? `• Adicionales: ${selectedAddonsList.map(a => `${a.name} (+${formatCOP(a.extraPrice)})`).join(', ')}\n` : ''}• Modalidad: ${modality === 'studio' ? 'En Studio' : `A Domicilio (${domicilioAddress || 'Pereira/Dosquebradas'})`}
• Fecha y Hora: ${selectedDate} a las ${selectedTime}
• Especialista: ${selectedTech?.name}
• Total estimado: ${formatCOP(grandTotalCOP)}
• Mi Nombre: ${clientName || 'Cliente'}
${notes ? `• Nota: ${notes}` : ''}`;

  const whatsAppBookingUrl = `https://wa.me/${MICHELLE_BRAND.whatsappRaw}?text=${encodeURIComponent(whatsAppBookingMessage)}`;

  const filteredMenuServices = services.filter(s => {
    if (menuFilter === 'all') return true;
    return s.category === menuFilter;
  });

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#FAF4EC] via-[#FAF7F2] to-[#F5ECE0] border border-[#E3D7C5] p-6 sm:p-12 lg:p-16 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6F0] border border-[#D9C8B2] text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6B2D] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Nails Studio · Pereira & Dosquebradas</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#261F1A] leading-[1.1]">
                El arte de unas uñas impecables y saludables
              </h1>
              <p className="text-sm sm:text-base text-[#5C4D42] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Bienvenida a <strong>Michelle Pérez Nails</strong>. Tu espacio exclusivo en Pereira especializado en <strong>Polygel, Press On y Nivelación con Base Rubber</strong>. Diseños elegantes con máxima atención al detalle e instrumental 100% esterilizado en autoclave.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#agendar"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#261F1A] hover:bg-[#1A1614] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Agendar mi Cita Online</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </a>

              <button
                onClick={onOpenFlyerModal}
                className="w-full sm:w-auto px-5 py-3.5 bg-white border border-[#D9C8B2] hover:border-[#8C6B2D] text-[#3D3025] rounded-xl text-xs font-semibold hover:bg-[#FAF8F5] transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <FileImage className="w-4 h-4 text-[#8C6B2D]" />
                <span>Ver Carta de Precios Original</span>
              </button>

              <a
                href={`https://wa.me/${MICHELLE_BRAND.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp: 304 4420816</span>
              </a>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 border-t border-[#EAE0CD] grid grid-cols-3 gap-3 text-center sm:text-left">
              <div>
                <span className="font-serif font-bold text-lg sm:text-xl text-[#261F1A] block">5 Días</span>
                <span className="text-[11px] text-[#735F48]">Garantía oficial en sistemas</span>
              </div>
              <div>
                <span className="font-serif font-bold text-lg sm:text-xl text-[#261F1A] block">Autoclave</span>
                <span className="text-[11px] text-[#735F48]">Bioseguridad grado clínico</span>
              </div>
              <div>
                <span className="font-serif font-bold text-lg sm:text-xl text-[#261F1A] block">2 Opciones</span>
                <span className="text-[11px] text-[#735F48]">En Studio o A Domicilio</span>
              </div>
            </div>
          </div>

          {/* Right Logo & Branding Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
            <div className="relative group">
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2 border-2 border-[#D4AF37]/60 bg-white shadow-xl overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-102">
                <img
                  src={MICHELLE_BRAND.assets.logoCircular}
                  alt="Michelle Pérez Nails Studio Emblem"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#8C6B2D] font-medium bg-white/80 px-4 py-1.5 rounded-full border border-[#E3D7C5] shadow-xs">
              <Instagram className="w-3.5 h-3.5" />
              <span>Síguenos en Instagram: <strong>{MICHELLE_BRAND.instagram}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES & OFFICIAL PRICES CATALOG (COP) */}
      <section id="precios" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C6B2D]">
              <span>Tarifas Oficiales en Pesos Colombianos</span>
              <span aria-hidden="true">·</span>
              <span>Pereira & Dosquebradas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#261F1A] mt-1">
              Nuestros Precios & Servicios
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4D42] mt-0.5 max-w-xl">
              Precios claros, sin costos ocultos. Todos nuestros servicios incluyen limpieza estética de cutícula y sellado duradero.
            </p>
          </div>

          <button
            onClick={onOpenFlyerModal}
            className="px-4 py-2 bg-white border border-[#D9C8B2] hover:border-[#8C6B2D] text-[#8C6B2D] rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-xs shrink-0 self-start sm:self-auto"
          >
            <FileImage className="w-4 h-4" />
            <span>Ver Folleto Original Impreso</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setMenuFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              menuFilter === 'all'
                ? 'bg-[#261F1A] text-white shadow-xs'
                : 'bg-white text-[#5C4D42] hover:text-[#261F1A] border border-[#E8DEC8]'
            }`}
          >
            Todos ({services.length})
          </button>
          <button
            onClick={() => setMenuFilter('polygel')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              menuFilter === 'polygel'
                ? 'bg-[#261F1A] text-white shadow-xs'
                : 'bg-white text-[#5C4D42] hover:text-[#261F1A] border border-[#E8DEC8]'
            }`}
          >
            Polygel (Tip / Forrado)
          </button>
          <button
            onClick={() => setMenuFilter('presson')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              menuFilter === 'presson'
                ? 'bg-[#261F1A] text-white shadow-xs'
                : 'bg-white text-[#5C4D42] hover:text-[#261F1A] border border-[#E8DEC8]'
            }`}
          >
            Press On
          </button>
          <button
            onClick={() => setMenuFilter('semipermanente')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              menuFilter === 'semipermanente'
                ? 'bg-[#261F1A] text-white shadow-xs'
                : 'bg-white text-[#5C4D42] hover:text-[#261F1A] border border-[#E8DEC8]'
            }`}
          >
            Base Rubber & Semipermanente
          </button>
          <button
            onClick={() => setMenuFilter('pies')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              menuFilter === 'pies'
                ? 'bg-[#261F1A] text-white shadow-xs'
                : 'bg-white text-[#5C4D42] hover:text-[#261F1A] border border-[#E8DEC8]'
            }`}
          >
            Pies & Pedicura
          </button>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMenuServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-[#E8DEC8] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#8C6B2D] transition-colors relative"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[11px] font-bold text-[#8C6B2D] uppercase tracking-wider">
                    {service.category}
                  </span>
                  <span className="font-mono text-base font-bold text-[#261F1A]">
                    {formatCOP(service.basePrice)}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-[#261F1A] text-lg leading-snug">
                  {service.name}
                </h3>

                <p className="text-xs text-[#5C4D42] leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EAE0CD] flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[#735F48] font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#8C6B2D]" />
                  <span>{service.baseDurationMin} min</span>
                </span>

                <a
                  href="#agendar"
                  onClick={() => setSelectedServiceId(service.id)}
                  className="font-semibold text-xs text-[#8C6B2D] hover:underline flex items-center gap-1"
                >
                  <span>Reservar este</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Official Add-ons Table */}
        <div className="bg-white border border-[#E8DEC8] rounded-2xl overflow-hidden shadow-xs mt-6">
          <div className="p-5 bg-[#FAF7F2] border-b border-[#E8DEC8] flex items-center justify-between">
            <h3 className="font-serif font-bold text-[#261F1A] text-base uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8C6B2D]" />
              <span>Adicionales (Retiros y Reparaciones)</span>
            </h3>
            <span className="text-xs text-[#735F48]">Folleto Oficial Michelle Pérez</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white text-[#735F48] font-semibold border-b border-[#E8DEC8] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-5">Adicional</th>
                  <th className="py-3.5 px-5">Duración</th>
                  <th className="py-3.5 px-5">Tarifa Oficial</th>
                  <th className="py-3.5 px-5">Detalle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE0CD]">
                {addons.map((ad) => (
                  <tr key={ad.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-3.5 px-5 font-serif font-bold text-[#261F1A] text-sm">
                      {ad.name}
                    </td>
                    <td className="py-3.5 px-5 font-mono text-[#5C4D42]">
                      +{ad.extraMinutes} min
                    </td>
                    <td className="py-3.5 px-5 font-mono font-bold text-[#8C6B2D] text-sm">
                      {formatCOP(ad.extraPrice)}
                    </td>
                    <td className="py-3.5 px-5 text-[#5C4D42]">
                      {ad.name.includes('Otro Lugar') 
                        ? 'Retiro cuidadoso con torno para uñas con material previo de otros salones.' 
                        : ad.name.includes('Uña')
                        ? 'Reposición individual en uña fracturada.'
                        : 'Remoción higiénica y nutrición con aceite de cutícula.'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. INTEGRATED ONLINE BOOKING ENGINE */}
      <section id="agendar" className="space-y-6 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#D9C8B2] text-xs font-semibold text-[#8C6B2D] uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Reserva en Línea 24/7</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#261F1A]">
            Agenda tu Cita con Michelle Pérez
          </h2>
          <p className="text-xs sm:text-sm text-[#5C4D42] leading-relaxed">
            Elige tu servicio, fecha y hora preferida. Sin pagos por adelantado: abonas al finalizar tu atención.
          </p>
        </div>

        <form onSubmit={handleBookingSubmit} className="bg-white rounded-3xl border border-[#E8DEC8] p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Configuration Steps (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Modality */}
            <div>
              <label className="text-xs font-bold text-[#8C6B2D] uppercase tracking-wider block mb-2">
                1. ¿Dónde deseas tu atención?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setModality('studio')}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                    modality === 'studio'
                      ? 'bg-[#FAF6F0] border-[#8C6B2D] ring-1 ring-[#8C6B2D]'
                      : 'border-[#E8DEC8] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <Home className={`w-5 h-5 shrink-0 mt-0.5 ${modality === 'studio' ? 'text-[#8C6B2D]' : 'text-neutral-400'}`} />
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-[#261F1A] block">En Studio</span>
                    <span className="text-[11px] text-[#5C4D42] block mt-0.5">Espacio climatizado en Pereira</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setModality('domicilio')}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                    modality === 'domicilio'
                      ? 'bg-[#FAF6F0] border-[#8C6B2D] ring-1 ring-[#8C6B2D]'
                      : 'border-[#E8DEC8] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <Car className={`w-5 h-5 shrink-0 mt-0.5 ${modality === 'domicilio' ? 'text-[#8C6B2D]' : 'text-neutral-400'}`} />
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-[#261F1A] block">A Domicilio (+{formatCOP(10000)})</span>
                    <span className="text-[11px] text-[#5C4D42] block mt-0.5">Pereira y Dosquebradas</span>
                  </div>
                </button>
              </div>

              {modality === 'domicilio' && (
                <div className="mt-3 animate-in fade-in">
                  <input
                    type="text"
                    required
                    placeholder="Barrio, conjunto residencial, torre y número de apto..."
                    value={domicilioAddress}
                    onChange={(e) => setDomicilioAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-[#D9C8B2] rounded-xl text-xs focus:outline-hidden focus:ring-1 focus:ring-[#8C6B2D] bg-[#FAF8F5]"
                  />
                </div>
              )}
            </div>

            {/* 2. Service */}
            <div>
              <label className="text-xs font-bold text-[#8C6B2D] uppercase tracking-wider block mb-2">
                2. Selecciona tu Servicio Principal
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-[#D9C8B2] rounded-xl text-xs font-serif text-[#261F1A] bg-[#FAF8F5] focus:outline-hidden focus:ring-1 focus:ring-[#8C6B2D]"
              >
                {services.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} — {formatCOP(s.basePrice)} ({s.baseDurationMin} min)
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Add-ons */}
            <div>
              <label className="text-xs font-bold text-[#8C6B2D] uppercase tracking-wider block mb-2">
                3. Adicionales de Preparación y Retiro
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {addons.map(addon => {
                  const isSelected = selectedAddonIds.includes(addon.id);
                  return (
                    <button
                      type="button"
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#261F1A] text-white border-[#261F1A]'
                          : 'bg-white text-[#261F1A] border-[#E8DEC8] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div>
                        <span className="font-semibold block leading-tight">{addon.name}</span>
                        <span className={`text-[10px] font-mono mt-0.5 block ${isSelected ? 'text-[#D4AF37]' : 'text-[#8C6B2D]'}`}>
                          +{formatCOP(addon.extraPrice)}
                        </span>
                      </div>
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[10px] shrink-0 ${
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

          {/* Right: Specialist, Time & Submission (5 cols) */}
          <div className="lg:col-span-5 space-y-5 bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DEC8]">
            <div className="pb-3 border-b border-[#EAE0CD] flex items-center justify-between">
              <span className="font-serif font-bold text-sm text-[#261F1A]">Detalle de tu Cita</span>
              <span className="font-mono text-xs text-[#8C6B2D] font-bold">{totalDuration} min estimados</span>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div>
                <label className="font-semibold text-[#261F1A] block mb-1">Fecha Deseada</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D9C8B2] rounded-xl text-xs font-mono bg-white focus:outline-hidden focus:ring-1 focus:ring-[#8C6B2D]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#261F1A] block mb-1">Hora</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D9C8B2] rounded-xl text-xs font-mono bg-white focus:outline-hidden focus:ring-1 focus:ring-[#8C6B2D]"
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

            {/* Client Info */}
            <div className="space-y-2.5 text-xs">
              <div>
                <label className="font-semibold text-[#261F1A] block mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre..."
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D9C8B2] rounded-xl text-xs bg-white focus:outline-hidden focus:ring-1 focus:ring-[#8C6B2D]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#261F1A] block mb-1">Teléfono / WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="+57 3..."
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D9C8B2] rounded-xl text-xs font-mono bg-white focus:outline-hidden focus:ring-1 focus:ring-[#8C6B2D]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#261F1A] block mb-1">Nota o diseño deseado</label>
                <input
                  type="text"
                  placeholder="ej. Francés con baby boomer..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D9C8B2] rounded-xl text-xs bg-white focus:outline-hidden focus:ring-1 focus:ring-[#8C6B2D]"
                />
              </div>
            </div>

            {/* Price Total */}
            <div className="p-3.5 bg-white rounded-xl border border-[#E8DEC8] space-y-1 text-xs font-mono">
              <div className="flex justify-between text-[#5C4D42]">
                <span>Servicio:</span>
                <span className="font-bold text-[#261F1A]">{formatCOP(basePrice)}</span>
              </div>
              {selectedAddonsList.map(a => (
                <div key={a.id} className="flex justify-between text-[#735F48] text-[11px]">
                  <span>+{a.name}:</span>
                  <span>+{formatCOP(a.extraPrice)}</span>
                </div>
              ))}
              {modality === 'domicilio' && (
                <div className="flex justify-between text-[#8C6B2D] text-[11px]">
                  <span>+ Domicilio:</span>
                  <span>+{formatCOP(domicilioFee)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#EAE0CD] flex justify-between font-serif font-bold text-base text-[#261F1A]">
                <span>Total:</span>
                <span className="text-[#8C6B2D]">{formatCOP(grandTotalCOP)} COP</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#261F1A] hover:bg-[#1A1614] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Confirmar Cita Online</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        </form>
      </section>

      {/* 4. ABOUT MICHELLE & THE STUDIO PHILOSOPHY */}
      <section className="bg-white rounded-3xl border border-[#E8DEC8] p-6 sm:p-12 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              <img
                src={MICHELLE_BRAND.assets.logoMonogram}
                alt="Monograma Michelle Pérez"
                className="w-64 h-64 object-contain rounded-2xl p-4 bg-[#FAF7F2] border border-[#E8DEC8] shadow-sm"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C6B2D]">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Conoce a tu Manicurista</span>
            </div>

            <h2 className="text-3xl font-serif font-bold text-[#261F1A]">
              Dedicación, Estilo & Salud en Cada Uña
            </h2>

            <p className="text-xs sm:text-sm text-[#5C4D42] leading-relaxed">
              En <strong>Michelle Pérez Nails</strong> entendemos que tus uñas son tu carta de presentación diaria. No realizamos limados agresivos ni procesos invasivos. Nuestra técnica se enfoca en preservar la arquitectura y la integridad de tu placa ungueal natural mediante nivelación con base rubber, polygel reforzado y tips press on de ajuste perfecto.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#5C4D42] text-left">
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8C6B2D] shrink-0 mt-0.5" />
                <span>Productos HEMA-Free y marcas certificadas que no irritan tu piel.</span>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8C6B2D] shrink-0 mt-0.5" />
                <span>Atención personalizada sin prisas: dedicamos el tiempo que tu set merece.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INSTAGRAM PORTFOLIO SHOWCASE */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C6B2D]">
              <Instagram className="w-3.5 h-3.5" />
              <span>Portafolio Oficial @michellenails.co</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#261F1A] mt-1">
              Últimos Diseños & Sets Realizados
            </h2>
          </div>

          <a
            href={MICHELLE_BRAND.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs shrink-0 self-start sm:self-auto"
          >
            <Instagram className="w-4 h-4" />
            <span>Seguir en Instagram</span>
          </a>
        </div>

        {/* Instagram Feed Screenshot Preview */}
        <div className="bg-white p-4 rounded-3xl border border-[#E8DEC8] shadow-xs">
          <div className="rounded-2xl overflow-hidden border border-[#E8DEC8] max-h-[460px] flex items-center justify-center bg-black/5">
            <img
              src={MICHELLE_BRAND.assets.instagramFeed}
              alt="Feed de Instagram @michellenails.co"
              className="w-full object-contain max-h-[460px]"
            />
          </div>
        </div>
      </section>

      {/* 6. SUCCESS BOOKING MODAL */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#261F1A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D9C8B2] space-y-5 animate-in fade-in zoom-in-95 duration-150 text-center">
            <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border-2 border-[#D4AF37] flex items-center justify-center mx-auto text-2xl shadow-sm">
              ✨
            </div>

            <div className="space-y-1">
              <span className="text-xs font-serif italic text-[#8C6B2D] block">Michelle Pérez Nails</span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#261F1A]">
                ¡Tu Cita ha sido Reservada!
              </h3>
              <p className="text-xs text-[#5C4D42] max-w-sm mx-auto leading-relaxed">
                Hemos registrado tu espacio para el <strong>{selectedDate}</strong> a las <strong>{selectedTime}</strong> ({modality === 'domicilio' ? 'A Domicilio' : 'En Studio'}).
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] text-left text-xs font-mono space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#735F48]">Servicio:</span>
                <span className="font-bold text-[#261F1A]">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#735F48]">Total estimado:</span>
                <span className="font-bold text-[#8C6B2D]">{formatCOP(grandTotalCOP)} COP</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={whatsAppBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Enviar Confirmación a WhatsApp (304 4420816)</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setIsSuccessModalOpen(false)}
                className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. DISCREET STAFF ACCESS FOOTER CTA */}
      <section className="pt-8 border-t border-[#EAE0CD] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#735F48]">
        <div>
          <span>¿Eres Michelle o parte del equipo del studio?</span>
        </div>
        <button
          onClick={onOpenAdminLogin}
          className="px-4 py-2 bg-white border border-[#D9C8B2] hover:border-[#261F1A] text-[#261F1A] rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 shadow-2xs"
        >
          <Lock className="w-3.5 h-3.5 text-[#8C6B2D]" />
          <span>Acceder al Dashboard Privado de Negocio (Clave)</span>
        </button>
      </section>
    </div>
  );
};
