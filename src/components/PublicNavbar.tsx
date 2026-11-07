import React from 'react';
import { Sparkles, Phone, Lock, FileImage } from 'lucide-react';
import { MICHELLE_BRAND } from '../data/salonMockData';

interface PublicNavbarProps {
  onOpenFlyerModal: () => void;
  onOpenAdminLogin: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  onOpenFlyerModal,
  onOpenAdminLogin
}) => {
  return (
    <header className="border-b border-[#E8DEC8] bg-[#FAF7F2]/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Brand Wordmark with Circular Emblem */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#D4AF37] p-0.5 bg-white shadow-xs shrink-0">
              <img
                src={MICHELLE_BRAND.assets.logoCircular}
                alt="Michelle Pérez Circular Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <a 
              href="#" 
              className="flex flex-col text-left hover:opacity-90 transition-opacity"
            >
              <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-[#261F1A] whitespace-nowrap leading-none">
                Michelle Pérez
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#8C6B2D] leading-tight">
                Nails Studio · Pereira
              </span>
            </a>
          </div>

          {/* Zone 2: Clean single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#5C4D42]">
            <a 
              href="#precios" 
              className="hover:text-[#261F1A] transition-colors whitespace-nowrap"
            >
              Servicios & Precios
            </a>

            <a 
              href="#agendar" 
              className="hover:text-[#261F1A] transition-colors whitespace-nowrap"
            >
              Agendar Cita
            </a>

            <button
              onClick={onOpenFlyerModal}
              className="hover:text-[#261F1A] transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <FileImage className="w-3.5 h-3.5 text-[#8C6B2D]" />
              <span>Menú Físico Original</span>
            </button>

            <a 
              href={MICHELLE_BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#261F1A] transition-colors whitespace-nowrap text-[#8C6B2D]"
            >
              {MICHELLE_BRAND.instagram}
            </a>
          </nav>

          {/* Zone 3: Primary Action + Discreet Staff Lock */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={`https://wa.me/${MICHELLE_BRAND.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-[#261F1A] hover:bg-[#1A1614] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">WhatsApp Citas</span>
              <span className="sm:hidden">Citas</span>
            </a>

            <button
              onClick={onOpenAdminLogin}
              title="Acceso Privado para Michelle y Staff del Studio"
              className="p-2 bg-[#FAF6F0] hover:bg-[#F3ECE2] border border-[#DECDB8] hover:border-[#8C6B2D] rounded-xl text-[#8C6B2D] transition-colors shrink-0 flex items-center gap-1 text-xs font-semibold"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px]">Acceso Studio</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
