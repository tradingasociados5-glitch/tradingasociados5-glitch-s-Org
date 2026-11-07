import React, { useState } from 'react';
import { 
  User, 
  AlertTriangle, 
  Sparkles, 
  Heart, 
  Phone, 
  Mail, 
  Instagram, 
  Calendar, 
  DollarSign,
  Award,
  Plus
} from 'lucide-react';
import { ClientNailProfile } from '../types';

interface ClientDossierProps {
  clients: ClientNailProfile[];
  onUpdateClient: (client: ClientNailProfile) => void;
}

export const ClientDossier: React.FC<ClientDossierProps> = ({ clients, onUpdateClient }) => {
  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'loyalty'>('profile');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedClient = clients.find(c => c.id === selectedClientId) || clients[0];

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  const handleAddLoyaltyStamp = () => {
    if (!selectedClient) return;
    const nextPoints = (selectedClient.loyaltyPoints + 1) > 10 ? 1 : selectedClient.loyaltyPoints + 1;
    onUpdateClient({
      ...selectedClient,
      loyaltyPoints: nextPoints,
      visitsCount: selectedClient.visitsCount + 1
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            <span>Retención & Salud Ungueal</span>
            <span aria-hidden="true">·</span>
            <span>Ficha Técnica Personalizada</span>
          </div>
          <h2 className="text-xl font-bold text-neutral-950 mt-1">
            Ficha Clínica y Registro Estético de Clientas
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Registro de alergias a metacrilatos (HEMA-Free), tipología de cutícula y archivo fotográfico de diseños anteriores.
          </p>
        </div>
      </div>

      {/* Main Grid: Client List on left + Deep Dossier on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Client Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white p-3 rounded-xl border border-neutral-200 space-y-2">
            <input
              type="text"
              placeholder="Buscar clienta por nombre o teléfono..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden divide-y divide-neutral-100">
            {filteredClients.map((client) => {
              const isSelected = client.id === selectedClientId;
              const hasAllergies = client.allergies.length > 0 && !client.allergies[0].includes('Ninguna');

              return (
                <button
                  key={client.id}
                  onClick={() => setSelectedClientId(client.id)}
                  className={`w-full p-4 text-left transition-colors flex items-start justify-between gap-3 ${
                    isSelected ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-50 text-neutral-800'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm">{client.name}</span>
                      {hasAllergies && (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          isSelected ? 'bg-rose-500 text-white' : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          Alergia
                        </span>
                      )}
                    </div>
                    <span className={`text-xs block font-mono ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {client.phone}
                    </span>
                    <span className={`text-[11px] block ${isSelected ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      {client.visitsCount} visitas · Última: {client.lastVisit}
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`font-mono text-xs font-bold block ${isSelected ? 'text-white' : 'text-neutral-900'}`}>
                      $ {client.totalSpent.toLocaleString('es-CO')}
                    </span>
                    <span className={`text-[10px] ${isSelected ? 'text-neutral-400' : 'text-neutral-400'}`}>
                      LTV gastado (COP)
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Dossier (8 cols) */}
        {selectedClient && (
          <div className="lg:col-span-8 space-y-6">
            {/* Client Hero Banner */}
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center font-bold text-neutral-800 text-sm">
                    {selectedClient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-950">{selectedClient.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-neutral-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span className="font-mono">{selectedClient.phone}</span>
                      </span>
                      {selectedClient.instagram && (
                        <span className="flex items-center gap-1 text-pink-700">
                          <Instagram className="w-3 h-3" />
                          <span>{selectedClient.instagram}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddLoyaltyStamp}
                    className="px-3 py-1.5 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir Sello de Visita</span>
                  </button>
                </div>
              </div>

              {/* ALLERGY WARNING ALERT BOX */}
              {selectedClient.allergies.length > 0 && !selectedClient.allergies[0].includes('Ninguna') && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-xs text-rose-950">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold text-rose-900 uppercase tracking-wide">
                      Alerta Clínica Obligatoria para la Técnica:
                    </span>
                    <p className="leading-relaxed">
                      {selectedClient.allergies.join(' · ')}. 
                      <span className="font-semibold ml-1">Utilizar exclusivamente insumos hipoalergénicos HEMA-Free certificados.</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Technical Profile Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200/60 space-y-1">
                  <span className="font-bold text-neutral-900 block">Tipo y Sensibilidad de Cutícula:</span>
                  <p className="text-neutral-600 leading-relaxed">{selectedClient.cuticleType}</p>
                </div>

                <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200/60 space-y-1">
                  <span className="font-bold text-neutral-900 block">Condición de la Placa Ungueal:</span>
                  <p className="text-neutral-600 leading-relaxed">{selectedClient.nailPlateCondition}</p>
                </div>

                <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200/60 space-y-1">
                  <span className="font-bold text-neutral-900 block">Técnica Habitual Recomendada:</span>
                  <p className="text-neutral-600 leading-relaxed">{selectedClient.preferredTechnique}</p>
                </div>

                <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200/60 space-y-1">
                  <span className="font-bold text-neutral-900 block">Tonos & Colores Favoritos:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedClient.favoriteColors.map(c => (
                      <span key={c} className="px-2 py-0.5 bg-white border border-neutral-300 rounded text-[11px] font-medium text-neutral-800">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Past Design Photo Archive */}
              <div className="pt-4 border-t border-neutral-100">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
                  <span>Historial Fotográfico del Último Set</span>
                </h4>
                {selectedClient.pastDesignImage ? (
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-3 bg-neutral-50 rounded-xl border border-neutral-200/60">
                    <img
                      src={selectedClient.pastDesignImage}
                      alt="Set anterior de la clienta"
                      className="w-full sm:w-48 h-36 object-cover rounded-lg border border-neutral-200 shadow-xs"
                    />
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-neutral-900 block">Set Registrado el 18 de Octubre, 2026</span>
                      <p className="text-neutral-600 leading-relaxed">
                        Manicura rusa combinada con fresa llama 021 roja. Nivelación con base Rubber Kiki #04 y micro-nail art minimalista de puntos dorados.
                      </p>
                      <span className="text-[11px] text-neutral-400 block pt-1">
                        Atendida por: Sofía Ramos (Mesa 2)
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500 italic">No hay fotos archivadas para esta clienta aún.</p>
                )}
              </div>

              {/* Digital Loyalty Stamp Card */}
              <div className="pt-4 border-t border-neutral-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                      Tarjeta de Sellos Digital de Fidelidad
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-neutral-900 font-mono">
                    {selectedClient.loyaltyPoints} / 10 Sellos
                  </span>
                </div>

                <p className="text-xs text-neutral-500">
                  Premio: <strong>Al completar el sello 10, recibe un retiro + manicura spa o 50% en su siguiente set.</strong>
                </p>

                {/* Punch Card visual */}
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 p-3 bg-neutral-100 rounded-xl border border-neutral-200">
                  {Array.from({ length: 10 }).map((_, i) => {
                    const isStamped = i < selectedClient.loyaltyPoints;
                    const isReward = i === 9;
                    return (
                      <div
                        key={i}
                        className={`aspect-square rounded-lg flex flex-col items-center justify-center font-bold text-xs transition-transform ${
                          isStamped
                            ? 'bg-neutral-900 text-white shadow-xs'
                            : isReward
                            ? 'bg-amber-100 text-amber-900 border border-dashed border-amber-400'
                            : 'bg-white text-neutral-400 border border-neutral-200'
                        }`}
                      >
                        {isStamped ? (
                          <span>✓</span>
                        ) : isReward ? (
                          <span className="text-[10px]">🎁</span>
                        ) : (
                          <span className="text-[10px] font-mono">{i + 1}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
