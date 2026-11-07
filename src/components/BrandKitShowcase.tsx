import React, { useState } from 'react';
import { 
  Sparkles, 
  Instagram, 
  Phone, 
  ExternalLink, 
  FileImage, 
  ShieldCheck, 
  Heart, 
  Clock, 
  CheckCircle2, 
  Download,
  Eye
} from 'lucide-react';
import { MICHELLE_BRAND } from '../data/salonMockData';

interface BrandKitShowcaseProps {
  onOpenPriceFlyerModal: () => void;
}

export const BrandKitShowcase: React.FC<BrandKitShowcaseProps> = ({ onOpenPriceFlyerModal }) => {
  return (
    <div className="space-y-8 pb-16">
      {/* Brand Header */}
      <div className="bg-white rounded-2xl border border-[#E8DEC8] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] p-1 bg-white shadow-sm shrink-0">
              <img
                src={MICHELLE_BRAND.assets.logoCircular}
                alt="Michelle Pérez Circular Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold uppercase tracking-widest text-[#8C6B2D]">
                <span>Brand Identity & Portfolio</span>
                <span aria-hidden="true">·</span>
                <span>@michellenails.co</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#261F1A]">
                Identidad de Marca: Michelle Pérez Nails Studio
              </h1>
              <p className="text-xs sm:text-sm text-[#5C4D42]">
                Guía de branding, activos oficiales y catálogo para Pereira y Dosquebradas (Colombia).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={MICHELLE_BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
            >
              <Instagram className="w-4 h-4" />
              <span>Visitar Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Grid: Official Brand Assets Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Asset 1: Gold Monogram Logo */}
        <div className="bg-white rounded-2xl border border-[#E8DEC8] p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#8C6B2D] uppercase tracking-wider block">
              Logotipo 01 · Monograma 3D Gold
            </span>
            <div className="aspect-square bg-[#FAF7F2] rounded-xl border border-[#EAE0CD] p-4 flex items-center justify-center overflow-hidden">
              <img
                src={MICHELLE_BRAND.assets.logoMonogram}
                alt="Monograma Michelle Pérez"
                className="max-h-full object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="text-xs text-[#5C4D42] space-y-1">
            <span className="font-bold text-[#261F1A] block">Uso Primario:</span>
            <p>Cabeceras web, tarjetas de presentación, empaques y firmas oficiales.</p>
          </div>
        </div>

        {/* Asset 2: Circular Studio Insignia */}
        <div className="bg-white rounded-2xl border border-[#E8DEC8] p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#8C6B2D] uppercase tracking-wider block">
              Logotipo 02 · Emblema Circular Studio
            </span>
            <div className="aspect-square bg-[#FAF7F2] rounded-xl border border-[#EAE0CD] p-4 flex items-center justify-center overflow-hidden">
              <img
                src={MICHELLE_BRAND.assets.logoCircular}
                alt="Emblema Circular Michelle Nails Studio"
                className="max-h-full object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="text-xs text-[#5C4D42] space-y-1">
            <span className="font-bold text-[#261F1A] block">Uso Secundario:</span>
            <p>Foto de perfil en Instagram, stickers para clientas y sellos de garantía.</p>
          </div>
        </div>

        {/* Asset 3: Physical Price Flyer Asset */}
        <div className="bg-white rounded-2xl border border-[#E8DEC8] p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#8C6B2D] uppercase tracking-wider block">
                Folleto 03 · Carta de Precios Original
              </span>
              <button
                onClick={onOpenPriceFlyerModal}
                className="text-xs text-[#8C6B2D] hover:underline flex items-center gap-1 font-semibold"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Ampliar</span>
              </button>
            </div>
            <div 
              onClick={onOpenPriceFlyerModal}
              className="aspect-square bg-[#FAF7F2] rounded-xl border border-[#EAE0CD] p-2 flex items-center justify-center overflow-hidden cursor-pointer group relative"
            >
              <img
                src={MICHELLE_BRAND.assets.priceListFlyer}
                alt="Carta de Precios Michelle Pérez"
                className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300 rounded"
              />
              <div className="absolute inset-0 bg-[#261F1A]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold backdrop-blur-2xs">
                Clic para ver en alta resolución
              </div>
            </div>
          </div>
          <div className="text-xs text-[#5C4D42] space-y-1">
            <span className="font-bold text-[#261F1A] block">Catálogo Oficial:</span>
            <p>11 servicios principales y 6 adicionales digitalizados en el sistema.</p>
          </div>
        </div>
      </div>

      {/* Instagram Feed & Highlights Integration */}
      <div className="bg-white rounded-2xl border border-[#E8DEC8] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#8C6B2D] uppercase tracking-wider block">
              Canal de Conversión Primario
            </span>
            <h2 className="text-xl font-serif font-bold text-[#261F1A] mt-0.5">
              Presencia en Instagram: @michellenails.co
            </h2>
            <p className="text-xs text-[#5C4D42]">
              Pereira y Dosquebradas · WhatsApp: +57 304 4420816 · Citas a domicilio y en studio
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FAF6F0] rounded-lg border border-[#E8DEC8] text-xs font-semibold text-[#8C6B2D]">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>350+ Clientas Felices</span>
            </div>
          </div>
        </div>

        {/* Story Highlights Representation */}
        <div className="flex items-center gap-6 overflow-x-auto pb-2">
          {MICHELLE_BRAND.highlights.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-2 shrink-0 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] p-1 bg-white shadow-xs flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#8C6B2D] font-bold text-xs">
                  {h.title === 'Reseñas' ? '💌' : h.title === 'Horarios' ? '📅' : '🛡️'}
                </div>
              </div>
              <span className="text-xs font-bold text-[#261F1A]">{h.title}</span>
              <span className="text-[10px] text-[#735F48] max-w-[100px] leading-tight">{h.desc}</span>
            </div>
          ))}
        </div>

        {/* Real Instagram feed snapshot from attachment */}
        <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-[#261F1A]">Feed Oficial de Sets Realizados</span>
            <a
              href={MICHELLE_BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#8C6B2D] font-semibold hover:underline flex items-center gap-1"
            >
              <span>Ver en Instagram</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="rounded-xl overflow-hidden border border-[#E8DEC8] max-h-96 flex items-center justify-center bg-black/5">
            <img
              src={MICHELLE_BRAND.assets.instagramFeed}
              alt="Feed de Instagram @michellenails.co"
              className="w-full object-contain max-h-96"
            />
          </div>
        </div>

        {/* Brand Color Palette Specification */}
        <div className="pt-4 border-t border-[#EAE0CD] space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#261F1A]">
            Paleta Cromática de la Marca
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2]">
              <div className="w-full h-8 rounded-lg bg-[#FAF7F2] border border-[#E3D7C5] mb-2" />
              <span className="font-bold text-[#261F1A] block">Champagne Nude</span>
              <span className="font-mono text-[11px] text-[#735F48]">#FAF7F2 (60% Fondo)</span>
            </div>
            <div className="p-3 rounded-xl border border-[#E8DEC8] bg-white">
              <div className="w-full h-8 rounded-lg bg-[#D4AF37] mb-2" />
              <span className="font-bold text-[#261F1A] block">Gold Metallic</span>
              <span className="font-mono text-[11px] text-[#735F48]">#D4AF37 (10% Acentos)</span>
            </div>
            <div className="p-3 rounded-xl border border-[#E8DEC8] bg-white">
              <div className="w-full h-8 rounded-lg bg-[#8C6B2D] mb-2" />
              <span className="font-bold text-[#261F1A] block">Bronze Néctar</span>
              <span className="font-mono text-[11px] text-[#735F48]">#8C6B2D (Subtítulos)</span>
            </div>
            <div className="p-3 rounded-xl border border-[#E8DEC8] bg-white">
              <div className="w-full h-8 rounded-lg bg-[#261F1A] mb-2" />
              <span className="font-bold text-[#261F1A] block">Espresso Luxury</span>
              <span className="font-mono text-[11px] text-[#735F48]">#261F1A (Tipografía)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
