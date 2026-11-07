import React, { useState } from 'react';
import { Sparkles, Clock, FileImage, ShieldCheck } from 'lucide-react';
import { ServiceAddon, ServiceItem } from '../types';

interface ServiceCatalogProps {
  services: ServiceItem[];
  addons: ServiceAddon[];
  onOpenFlyerModal?: () => void;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({ 
  services, 
  addons,
  onOpenFlyerModal 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredServices = services.filter(s => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  const formatCOP = (val: number) => {
    return `$ ${val.toLocaleString('es-CO')}`;
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6B2D] uppercase tracking-wider">
            <span>Catálogo Oficial de Precios en COP</span>
            <span aria-hidden="true">·</span>
            <span>Michelle Pérez Nails</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#261F1A] mt-1">
            Nuestros Precios & Servicios Oficiales
          </h2>
          <p className="text-xs text-[#5C4D42] mt-0.5">
            Tarifas transparentes para Pereira y Dosquebradas en Studio y A Domicilio.
          </p>
        </div>

        {onOpenFlyerModal && (
          <button
            onClick={onOpenFlyerModal}
            className="px-4 py-2 bg-[#FAF6F0] border border-[#DECDB8] hover:border-[#8C6B2D] text-[#8C6B2D] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs shrink-0"
          >
            <FileImage className="w-4 h-4" />
            <span>Ver Folleto Físico Original</span>
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-[#261F1A] text-white shadow-xs'
              : 'bg-white text-[#5C4D42] hover:text-[#261F1A] border border-[#E8DEC8]'
          }`}
        >
          Todos los Servicios ({services.length})
        </button>
        <button
          onClick={() => setSelectedCategory('polygel')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            selectedCategory === 'polygel'
              ? 'bg-[#261F1A] text-white shadow-xs'
              : 'bg-white text-[#5C4D42] hover:text-[#261F1A] border border-[#E8DEC8]'
          }`}
        >
          Polygel (Tip / Forrado)
        </button>
        <button
          onClick={() => setSelectedCategory('presson')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            selectedCategory === 'presson'
              ? 'bg-[#261F1A] text-white shadow-xs'
              : 'bg-white text-[#5C4D42] hover:text-[#261F1A] border border-[#E8DEC8]'
          }`}
        >
          Press On (Set / Mant.)
        </button>
        <button
          onClick={() => setSelectedCategory('semipermanente')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            selectedCategory === 'semipermanente'
              ? 'bg-[#261F1A] text-white shadow-xs'
              : 'bg-white text-[#5C4D42] hover:text-[#261F1A] border border-[#E8DEC8]'
          }`}
        >
          Base Rubber & Semipermanente
        </button>
        <button
          onClick={() => setSelectedCategory('pies')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            selectedCategory === 'pies'
              ? 'bg-[#261F1A] text-white shadow-xs'
              : 'bg-white text-[#5C4D42] hover:text-[#261F1A] border border-[#E8DEC8]'
          }`}
        >
          Pies (Semi / Tradicional)
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white border border-[#E8DEC8] rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xs hover:border-[#8C6B2D] transition-colors"
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

            <div className="pt-3 border-t border-[#EAE0CD] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5 text-[#5C4D42]">
                <Clock className="w-3.5 h-3.5 text-[#8C6B2D]" />
                <span>{service.baseDurationMin} min de servicio</span>
              </div>
              <span className="text-[#8C6B2D] font-semibold bg-[#FAF6F0] px-2 py-0.5 rounded border border-[#E3D7C5] text-[10px]">
                +{service.bufferMin}m autoclave
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ADD-ONS SECTION MATCHING MICHELLE'S FLYER */}
      <div className="bg-white border border-[#E8DEC8] rounded-2xl overflow-hidden shadow-xs mt-8">
        <div className="p-5 bg-[#FAF7F2] border-b border-[#E8DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-serif font-bold text-[#261F1A] text-base uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8C6B2D]" />
              <span>Adicionales Oficiales (Michelle Pérez Nails)</span>
            </h3>
            <p className="text-xs text-[#5C4D42] mt-0.5">
              Tarifas por uña individual, retiro de otro salón o retiro definitivo en cabina.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white text-[#735F48] font-semibold border-b border-[#E8DEC8] uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Adicional</th>
                <th className="py-3.5 px-5">Tiempo Estimado</th>
                <th className="py-3.5 px-5">Tarifa Oficial COP</th>
                <th className="py-3.5 px-5">Protocolo en Cabina</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE0CD]">
              {addons.map((ad) => (
                <tr key={ad.id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-3.5 px-5 font-serif font-bold text-[#261F1A] text-sm">
                    {ad.name}
                  </td>
                  <td className="py-3.5 px-5 font-mono text-[#5C4D42]">
                    +{ad.extraMinutes} minutos
                  </td>
                  <td className="py-3.5 px-5 font-mono font-bold text-[#8C6B2D] text-sm">
                    {formatCOP(ad.extraPrice)}
                  </td>
                  <td className="py-3.5 px-5 text-[#5C4D42]">
                    {ad.name.includes('Otro Lugar') 
                      ? 'Retiro cuidadoso con torno y fresa cerámica para proteger la placa ungueal dañada en otros salones.' 
                      : ad.name.includes('Uña')
                      ? 'Reposición anatómica individual de uña rota.'
                      : 'Remoción higiénica y aplicación de aceite botánico reconstituyente.'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
