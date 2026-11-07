import React, { useState } from 'react';
import { Lock, X, KeyRound, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { MICHELLE_BRAND } from '../data/salonMockData';

interface AccessKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AccessKeyModal: React.FC<AccessKeyModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [accessKey, setAccessKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const validKeys = ['michelle2026', '2026', 'mpnails', 'admin'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = accessKey.trim().toLowerCase();
    if (validKeys.includes(cleanKey)) {
      setErrorMsg('');
      onSuccess();
    } else {
      setErrorMsg('Clave incorrecta. Usa "michelle2026" o "2026" para acceder.');
    }
  };

  const handleQuickAccess = (demoKey: string) => {
    setAccessKey(demoKey);
    setErrorMsg('');
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#261F1A]/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#D9C8B2] space-y-6 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EAE0CD] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#D4AF37] flex items-center justify-center text-[#8C6B2D] shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#261F1A]">Acceso Privado Studio</h3>
              <p className="text-[11px] text-[#735F48]">Gestión interna de Michelle Pérez Nails</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs text-[#5C4D42]">
          <p className="leading-relaxed">
            Este panel contiene información confidencial del negocio: <strong>agenda privada, facturación en caja, liquidación de comisiones de especialistas, fichas clínicas e inventario de insumos</strong>.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="font-semibold text-[#261F1A] block mb-1.5">
                Ingresa tu clave de acceso de administradora:
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="Clave de acceso..."
                  value={accessKey}
                  onChange={(e) => {
                    setAccessKey(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  className="w-full px-3.5 py-2.5 pl-10 border border-[#D9C8B2] rounded-xl text-xs font-mono focus:outline-hidden focus:ring-1 focus:ring-[#8C6B2D] bg-[#FAF8F5]"
                />
                <KeyRound className="w-4 h-4 text-[#8C6B2D] absolute left-3.5 top-3" />
              </div>
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-[11px] flex items-center gap-1.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#261F1A] hover:bg-[#1A1614] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Ingresar al Dashboard Privado</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </form>

          {/* Quick-Access Helper for testing / demo */}
          <div className="pt-3 border-t border-[#EAE0CD] bg-[#FAF7F2] p-3 rounded-xl border border-dashed border-[#DECDB8] space-y-1.5">
            <span className="font-semibold text-[#261F1A] block text-[11px]">
              Credencial de Demostración:
            </span>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#8C6B2D] bg-white px-2 py-0.5 rounded border border-[#E3D7C5]">
                michelle2026
              </span>
              <button
                type="button"
                onClick={() => handleQuickAccess('michelle2026')}
                className="text-[11px] font-bold text-[#8C6B2D] hover:underline"
              >
                Ingresar con 1 clic
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
