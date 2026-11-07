import React, { useState } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  Banknote, 
  CheckCircle2, 
  Receipt, 
  ShoppingBag,
  ArrowRight,
  Smartphone
} from 'lucide-react';
import { Appointment, ServiceItem, Technician } from '../types';

interface CommissionPOSProps {
  technicians: Technician[];
  services: ServiceItem[];
  appointments: Appointment[];
  preSelectedAptId?: string;
  onCompletePayment: (aptId: string) => void;
}

export const CommissionPOS: React.FC<CommissionPOSProps> = ({
  technicians,
  services,
  appointments,
  preSelectedAptId,
  onCompletePayment
}) => {
  const [selectedAptId, setSelectedAptId] = useState<string>(
    preSelectedAptId || appointments.find(a => a.status === 'in_chair')?.id || appointments[0]?.id || ''
  );

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'nequi'>('nequi');
  const [tipAmount, setTipAmount] = useState<number>(5000);
  const [selectedRetailItem, setSelectedRetailItem] = useState<{ name: string; price: number } | null>(null);
  const [isSuccessPaid, setIsSuccessPaid] = useState<boolean>(false);

  const formatCOP = (val: number) => `$ ${val.toLocaleString('es-CO')}`;

  const selectedApt = appointments.find(a => a.id === selectedAptId);
  const selectedTech = technicians.find(t => t.id === selectedApt?.technicianId);
  const selectedService = services.find(s => s.id === selectedApt?.serviceId);

  // Calculation Math in COP
  const servicePrice = selectedApt?.totalPrice || 80000;
  const depositAlreadyPaid = selectedApt?.depositPaid || 0;
  const retailPrice = selectedRetailItem?.price || 0;
  const subtotalToCharge = (servicePrice - depositAlreadyPaid) + retailPrice;
  const grandTotal = subtotalToCharge + tipAmount;

  // Commission Math
  // If Michelle herself: 100% owner earnings. If specialist: 50% service, 10% retail, 100% tip.
  const isMichelle = selectedTech?.id === 'tech-michelle';
  const techCommissionRate = isMichelle ? 1.0 : (selectedTech?.commissionRate || 0.50);
  const techRetailRate = isMichelle ? 1.0 : (selectedTech?.retailCommissionRate || 0.10);

  const techServiceEarnings = isMichelle ? servicePrice : servicePrice * techCommissionRate;
  const techRetailEarnings = isMichelle ? retailPrice : retailPrice * techRetailRate;
  const techTipEarnings = tipAmount; // 100% of tip goes to technician
  const techTotalPayout = techServiceEarnings + techRetailEarnings + techTipEarnings;

  const salonServiceRevenue = isMichelle ? 0 : servicePrice * (1 - techCommissionRate);
  const salonRetailRevenue = isMichelle ? 0 : retailPrice * (1 - techRetailRate);
  const salonNetEarnings = salonServiceRevenue + salonRetailRevenue;

  const handleProcessPayment = () => {
    if (!selectedApt) return;
    setIsSuccessPaid(true);
    onCompletePayment(selectedApt.id);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6B2D] uppercase tracking-wider">
            <span>Punto de Venta & Liquidación (COP)</span>
            <span aria-hidden="true">·</span>
            <span>Michelle Pérez Nails Studio</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#261F1A] mt-1">
            Cobro en Caja y Liquidación de Especialistas
          </h2>
          <p className="text-xs text-[#5C4D42] mt-0.5">
            Cálculo instantáneo: Split sobre servicios, 10% en retail y 100% de la propina a la manicurista en Pesos Colombianos.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Appointment Selector & Upsell Options (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Select Appointment */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8] space-y-3 shadow-xs">
            <h3 className="text-xs font-bold text-[#8C6B2D] uppercase tracking-wider">
              1. Seleccionar Cita a Cobrar
            </h3>
            <div className="space-y-2">
              {appointments.map((apt) => {
                const isSelected = apt.id === selectedAptId;
                const tech = technicians.find(t => t.id === apt.technicianId);
                return (
                  <button
                    key={apt.id}
                    onClick={() => {
                      setSelectedAptId(apt.id);
                      setIsSuccessPaid(false);
                    }}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 text-xs ${
                      isSelected 
                        ? 'bg-[#261F1A] text-white border-[#261F1A] shadow-xs'
                        : 'bg-white text-[#261F1A] border-[#E8DEC8] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold font-serif text-sm block">{apt.clientName}</span>
                        {apt.modality && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-[#FAF6F0] text-[#8C6B2D]'
                          }`}>
                            {apt.modality === 'domicilio' ? 'A Domicilio' : 'En Studio'}
                          </span>
                        )}
                      </div>
                      <span className={`text-[11px] ${isSelected ? 'text-neutral-300' : 'text-[#735F48]'}`}>
                        {tech?.name} · {apt.startTime} hrs
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-bold text-sm block">{formatCOP(apt.totalPrice)}</span>
                      <span className={`text-[10px] font-medium ${
                        apt.status === 'in_chair' ? 'text-amber-400' : apt.status === 'completed' ? 'text-emerald-400' : 'text-neutral-400'
                      }`}>
                        {apt.status === 'in_chair' ? 'En Cabina' : apt.status === 'completed' ? 'Completada / Pagada' : 'Confirmada'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upsell / Retail Products */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8] space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#8C6B2D] uppercase tracking-wider flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-[#8C6B2D]" />
                <span>2. Añadir Producto de Cuidado en Casa (Reventa)</span>
              </h3>
              {selectedRetailItem && (
                <button
                  onClick={() => setSelectedRetailItem(null)}
                  className="text-xs text-rose-600 hover:underline"
                >
                  Quitar producto
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => setSelectedRetailItem({ name: 'Aceite de Cutícula Botánico con Jojoba', price: 20000 })}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  selectedRetailItem?.name.includes('Aceite')
                    ? 'bg-[#261F1A] text-white border-[#261F1A]'
                    : 'bg-white text-[#261F1A] border-[#E8DEC8] hover:bg-[#FAF8F5]'
                }`}
              >
                <span className="font-semibold block">Aceite Cutícula Jojoba Roll-on</span>
                <span className={`text-[11px] font-mono block mt-0.5 ${selectedRetailItem?.name.includes('Aceite') ? 'text-[#D4AF37]' : 'text-[#8C6B2D]'}`}>
                  +{formatCOP(20000)} (Comisión técnica: {formatCOP(2000)})
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRetailItem({ name: 'Crema Hidratante Seda de Manos con Karité', price: 25000 })}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  selectedRetailItem?.name.includes('Crema')
                    ? 'bg-[#261F1A] text-white border-[#261F1A]'
                    : 'bg-white text-[#261F1A] border-[#E8DEC8] hover:bg-[#FAF8F5]'
                }`}
              >
                <span className="font-semibold block">Crema de Manos Karité</span>
                <span className={`text-[11px] font-mono block mt-0.5 ${selectedRetailItem?.name.includes('Crema') ? 'text-[#D4AF37]' : 'text-[#8C6B2D]'}`}>
                  +{formatCOP(25000)} (Comisión técnica: {formatCOP(2500)})
                </span>
              </button>
            </div>
          </div>

          {/* Tip & Payment Method */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8] space-y-4 shadow-xs">
            <div>
              <h3 className="text-xs font-bold text-[#8C6B2D] uppercase tracking-wider mb-2">
                3. Propina Voluntaria para la Especialista (100% Directo a ella)
              </h3>
              <div className="grid grid-cols-4 gap-2 text-xs font-mono font-medium">
                {[0, 5000, 10000, 20000].map(tip => (
                  <button
                    key={tip}
                    type="button"
                    onClick={() => setTipAmount(tip)}
                    className={`py-2 rounded-xl border text-center transition-all ${
                      tipAmount === tip
                        ? 'bg-[#261F1A] text-white border-[#261F1A] font-bold'
                        : 'bg-white text-[#261F1A] border-[#E8DEC8] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {tip === 0 ? 'Sin propina' : `+${formatCOP(tip)}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#EAE0CD]">
              <h3 className="text-xs font-bold text-[#8C6B2D] uppercase tracking-wider mb-2">
                4. Método de Pago (Colombia)
              </h3>
              <div className="grid grid-cols-3 gap-2 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('nequi')}
                  className={`py-2.5 rounded-xl border text-center flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'nequi'
                      ? 'bg-[#261F1A] text-white border-[#261F1A]'
                      : 'bg-white text-[#261F1A] border-[#E8DEC8] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Nequi / Bancolombia</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2.5 rounded-xl border text-center flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-[#261F1A] text-white border-[#261F1A]'
                      : 'bg-white text-[#261F1A] border-[#E8DEC8] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Datáfono / Tarjeta</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`py-2.5 rounded-xl border text-center flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'cash'
                      ? 'bg-[#261F1A] text-white border-[#261F1A]'
                      : 'bg-white text-[#261F1A] border-[#E8DEC8] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <Banknote className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Efectivo</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Breakdown Receipt & Commission Voucher (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white border border-[#E8DEC8] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE0CD]">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#8C6B2D]" />
                <h3 className="font-serif font-bold text-[#261F1A] text-sm uppercase tracking-wider">
                  Ticket de Cobro
                </h3>
              </div>
              <span className="text-[11px] text-[#735F48] font-mono">
                {selectedApt?.clientName.split(' ')[0]}
              </span>
            </div>

            {/* Ticket line items */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-[#5C4D42]">
                <span>Servicio: {selectedService?.name || 'Manicura'}</span>
                <span className="font-bold text-[#261F1A]">{formatCOP(servicePrice)}</span>
              </div>

              {depositAlreadyPaid > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Anticipo previo acreditado:</span>
                  <span>-{formatCOP(depositAlreadyPaid)}</span>
                </div>
              )}

              {selectedRetailItem && (
                <div className="flex justify-between text-[#5C4D42]">
                  <span>Retail: {selectedRetailItem.name}</span>
                  <span className="font-bold text-[#261F1A]">+{formatCOP(retailPrice)}</span>
                </div>
              )}

              {tipAmount > 0 && (
                <div className="flex justify-between text-[#5C4D42]">
                  <span>Propina a la manicurista:</span>
                  <span className="font-bold text-[#261F1A]">+{formatCOP(tipAmount)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-[#DECDB8] flex justify-between text-base font-bold text-[#261F1A]">
                <span>Total a Cobrar:</span>
                <span className="text-[#8C6B2D]">{formatCOP(grandTotal)} COP</span>
              </div>
            </div>

            {/* AUTOMATED COMMISSION BREAKDOWN VOUCHER */}
            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] space-y-2 text-xs">
              <span className="font-bold text-[#8C6B2D] text-[11px] uppercase tracking-wider block font-serif">
                Liquidación: {selectedTech?.name} {isMichelle ? '(Dueña Studio)' : '(Especialista)'}
              </span>

              <div className="space-y-1 font-mono text-[11px]">
                <div className="flex justify-between text-[#5C4D42]">
                  <span>Comisión Servicio ({isMichelle ? '100%' : '50%'}):</span>
                  <span className="font-bold text-[#261F1A]">{formatCOP(techServiceEarnings)}</span>
                </div>
                {retailPrice > 0 && (
                  <div className="flex justify-between text-[#5C4D42]">
                    <span>Comisión Retail ({isMichelle ? '100%' : '10%'}):</span>
                    <span className="font-bold text-[#261F1A]">{formatCOP(techRetailEarnings)}</span>
                  </div>
                )}
                {tipAmount > 0 && (
                  <div className="flex justify-between text-[#5C4D42]">
                    <span>Propina directa (100%):</span>
                    <span className="font-bold text-[#261F1A]">{formatCOP(techTipEarnings)}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-[#DECDB8] flex justify-between font-bold text-xs text-[#8C6B2D]">
                  <span>Pago Neto a la Especialista:</span>
                  <span>{formatCOP(techTotalPayout)} COP</span>
                </div>

                {!isMichelle && (
                  <div className="flex justify-between text-[11px] text-[#735F48] pt-1">
                    <span>Margen Bruto para el Studio:</span>
                    <span>{formatCOP(salonNetEarnings)} COP</span>
                  </div>
                )}
              </div>
            </div>

            {/* Checkout Action */}
            {isSuccessPaid ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-900 space-y-1">
                <span className="font-bold flex items-center justify-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4" />
                  ¡Cobro y Liquidación Exitosa!
                </span>
                <p className="text-[11px]">Cita registrada como pagada y balance de especialista actualizado.</p>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleProcessPayment}
                className="w-full py-3.5 bg-[#261F1A] hover:bg-[#1A1614] text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                <span>Cobrar {formatCOP(grandTotal)} y Liquidar</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
