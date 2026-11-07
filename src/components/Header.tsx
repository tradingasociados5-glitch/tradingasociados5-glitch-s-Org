import React from 'react';
import { Download, Sparkles, FileImage, Calendar, Users, DollarSign, BookOpen, Layers } from 'lucide-react';
import { MICHELLE_BRAND } from '../data/salonMockData';
import { SystemTab } from '../types';

interface HeaderProps {
  currentTab: SystemTab;
  onTabChange: (tab: SystemTab) => void;
  onOpenExport: () => void;
  onOpenFlyer: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentTab, 
  onTabChange, 
  onOpenExport,
  onOpenFlyer 
}) => {
  return (
    <header className="border-b border-[#E8DEC8] bg-[#FAF7F2]/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Single text element wordmark + Monogram Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div 
              onClick={() => onTabChange('booking')}
              className="w-9 h-9 rounded-full overflow-hidden border border-[#D4AF37] p-0.5 bg-white cursor-pointer shadow-xs shrink-0"
            >
              <img
                src={MICHELLE_BRAND.assets.logoCircular}
                alt="Michelle Pérez Circular Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <a 
              href="#booking" 
              onClick={(e) => { e.preventDefault(); onTabChange('booking'); }}
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

          {/* Zone 2: Navigation tabs with single-line labels */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
            <button
              onClick={() => onTabChange('booking')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                currentTab === 'booking'
                  ? 'bg-[#261F1A] text-white shadow-xs'
                  : 'text-[#5C4D42] hover:text-[#261F1A] hover:bg-[#F3ECE2]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Reserva Online</span>
            </button>

            <button
              onClick={() => onTabChange('catalog')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                currentTab === 'catalog'
                  ? 'bg-[#261F1A] text-white shadow-xs'
                  : 'text-[#5C4D42] hover:text-[#261F1A] hover:bg-[#F3ECE2]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Catálogo COP</span>
            </button>

            <button
              onClick={() => onTabChange('agenda')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                currentTab === 'agenda'
                  ? 'bg-[#261F1A] text-white shadow-xs'
                  : 'text-[#5C4D42] hover:text-[#261F1A] hover:bg-[#F3ECE2]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agenda Studio</span>
            </button>

            <button
              onClick={() => onTabChange('clients')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                currentTab === 'clients'
                  ? 'bg-[#261F1A] text-white shadow-xs'
                  : 'text-[#5C4D42] hover:text-[#261F1A] hover:bg-[#F3ECE2]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Fichas Clínicas</span>
            </button>

            <button
              onClick={() => onTabChange('pos')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                currentTab === 'pos'
                  ? 'bg-[#261F1A] text-white shadow-xs'
                  : 'text-[#5C4D42] hover:text-[#261F1A] hover:bg-[#F3ECE2]'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>POS & Comisiones</span>
            </button>

            <button
              onClick={() => onTabChange('brand')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                currentTab === 'brand'
                  ? 'bg-[#261F1A] text-white shadow-xs'
                  : 'text-[#5C4D42] hover:text-[#261F1A] hover:bg-[#F3ECE2]'
              }`}
            >
              <span>Brand Kit & IG</span>
            </button>

            <button
              onClick={() => onTabChange('blueprint')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                currentTab === 'blueprint'
                  ? 'bg-[#261F1A] text-white shadow-xs'
                  : 'text-[#5C4D42] hover:text-[#261F1A] hover:bg-[#F3ECE2]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Blueprint SaaS</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenFlyer}
              title="Ver el folleto físico de precios original de Michelle"
              className="px-3 py-1.5 text-xs font-semibold text-[#8C6B2D] bg-[#F5EFEB] border border-[#DECDB8] rounded-lg hover:bg-[#EAE0CD] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <FileImage className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ver Menú Original</span>
              <span className="sm:hidden">Menú</span>
            </button>

            <button
              onClick={onOpenExport}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#261F1A] hover:bg-[#1A1614] rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">PRD</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
