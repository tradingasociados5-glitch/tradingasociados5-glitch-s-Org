import React from 'react';
import { X, ExternalLink, Download } from 'lucide-react';
import { MICHELLE_BRAND } from '../data/salonMockData';

interface PriceFlyerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PriceFlyerModal: React.FC<PriceFlyerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#261F1A]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#D9C8B2] animate-in fade-in zoom-in-95 duration-150">
        <div className="px-5 py-3.5 border-b border-[#E8DEC8] flex items-center justify-between bg-[#FAF7F2]">
          <div>
            <h3 className="font-serif font-bold text-sm text-[#261F1A]">Carta de Precios Original: Michelle Pérez Nails</h3>
            <span className="text-[11px] text-[#8C6B2D]">Folleto oficial digitalizado en el sistema</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-[#FAF7F2] flex items-center justify-center">
          <img
            src={MICHELLE_BRAND.assets.priceListFlyer}
            alt="Carta de Precios Michelle Pérez Nails"
            className="max-h-[75vh] w-auto object-contain rounded-xl shadow-md border border-[#E3D7C5]"
          />
        </div>

        <div className="px-5 py-3 border-t border-[#E8DEC8] bg-white flex items-center justify-between text-xs text-[#5C4D42]">
          <span>Pereira & Dosquebradas · WhatsApp: +57 304 4420816</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#261F1A] text-white rounded-lg text-xs font-semibold hover:bg-[#1A1614]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
