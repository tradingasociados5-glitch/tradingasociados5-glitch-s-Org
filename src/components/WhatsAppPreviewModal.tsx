import React, { useState } from 'react';
import { X, Check, Calendar, MessageSquare, Phone, User, CheckCheck } from 'lucide-react';
import { Appointment, ServiceItem, Technician } from '../types';

interface WhatsAppPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  service: ServiceItem | undefined;
  technician: Technician | undefined;
  onConfirmAppointment: (aptId: string) => void;
}

export const WhatsAppPreviewModal: React.FC<WhatsAppPreviewModalProps> = ({
  isOpen,
  onClose,
  appointment,
  service,
  technician,
  onConfirmAppointment
}) => {
  const [simulationState, setSimulationState] = useState<'sent' | 'client_confirmed'>('sent');

  if (!isOpen || !appointment) return null;

  const handleSimulateClientConfirm = () => {
    setSimulationState('client_confirmed');
    onConfirmAppointment(appointment.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 bg-[#075E54] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white p-0.5 border border-[#D4AF37] flex items-center justify-center overflow-hidden shrink-0">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-11-07_at_1.2842_PM_ca1cd693.jpeg"
                alt="Michelle Pérez Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Michelle Pérez Nails Studio</h3>
              <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                <span>+57 304 4420816</span>
                <span aria-hidden="true">·</span>
                <span>Pereira / Dosquebradas</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-100 hover:text-white rounded-lg hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Canvas (WhatsApp styling) */}
        <div className="p-4 bg-[#EFEAE2] min-h-[360px] space-y-4 text-xs font-sans">
          <div className="text-center">
            <span className="bg-white/80 px-2.5 py-1 rounded text-[10px] text-neutral-600 shadow-xs">
              HOY · RECORDATORIO AUTOMATIZADO 24H PREVIO
            </span>
          </div>

          {/* Business Message Bubble */}
          <div className="max-w-[88%] bg-white rounded-xl rounded-tl-none p-3.5 shadow-sm space-y-2 text-neutral-800">
            <p className="font-semibold text-emerald-800">
              ¡Hola {appointment.clientName.split(' ')[0]}! ✨ Saludos de Michelle Pérez Nails Studio
            </p>
            <p className="leading-relaxed">
              Te recordamos tu cita agendada para mañana:
            </p>
            <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200/60 space-y-1 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-neutral-500">Servicio:</span>
                <span className="font-semibold text-neutral-900">{service?.name || 'Servicio'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Especialista:</span>
                <span className="font-semibold text-neutral-900">{technician?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Modalidad:</span>
                <span className="font-semibold text-neutral-900">{appointment.modality === 'domicilio' ? '🚗 A Domicilio' : '🏠 En Studio'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Horario:</span>
                <span className="font-bold text-neutral-900">{appointment.startTime} hrs ({appointment.durationMinutes} min)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Total aprox:</span>
                <span className="font-bold text-emerald-700">$ {appointment.totalPrice.toLocaleString('es-CO')} COP</span>
              </div>
            </div>
            <p className="text-[11px] text-neutral-600 leading-normal">
              Tu set y herramientas ya están esterilizados en autoclave. Por favor ayúdanos confirmando tu asistencia en un clic:
            </p>

            {/* Interactive WhatsApp Buttons */}
            <div className="pt-2 border-t border-neutral-100 flex flex-col gap-1.5">
              <button
                onClick={handleSimulateClientConfirm}
                className="w-full py-2 bg-emerald-50 text-emerald-800 font-semibold rounded-md border border-emerald-200 text-center hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>✅ Confirmar mi Asistencia</span>
              </button>
              <button
                onClick={() => alert('Simulación: La clienta solicitó reagendar. El sistema libera el slot en la agenda y le envía el link de reprogramación.')}
                className="w-full py-1.5 bg-neutral-50 text-neutral-700 font-medium rounded-md border border-neutral-200 text-center hover:bg-neutral-100 transition-colors"
              >
                🔄 Reagendar o Cancelar
              </button>
            </div>

            <div className="flex justify-end items-center gap-1 text-[10px] text-neutral-400 pt-1">
              <span>10:30 AM</span>
              <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
            </div>
          </div>

          {/* Client response if simulated */}
          {simulationState === 'client_confirmed' && (
            <div className="flex justify-end">
              <div className="max-w-[80%] bg-[#D9FDD3] rounded-xl rounded-tr-none p-2.5 shadow-sm space-y-1 text-neutral-800 animate-in fade-in slide-in-from-bottom-2">
                <p className="font-medium text-xs">
                  ✅ ¡Confirmada! Allá estaré puntual mañana a las {appointment.startTime}. Muchas gracias.
                </p>
                <div className="flex justify-end items-center gap-1 text-[10px] text-neutral-500">
                  <span>10:32 AM</span>
                  <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-600">
          <span>Integración: <strong>Evolution API / WhatsApp Cloud</strong></span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-white border border-neutral-300 rounded text-neutral-700 hover:bg-neutral-100 transition-colors font-medium"
          >
            Cerrar Simulador
          </button>
        </div>
      </div>
    </div>
  );
};
