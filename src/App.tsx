import React, { useState, useEffect } from 'react';
import { PublicNavbar } from './components/PublicNavbar';
import { PublicWebsite } from './components/PublicWebsite';
import { PrivateDashboard } from './components/PrivateDashboard';
import { AccessKeyModal } from './components/AccessKeyModal';
import { PriceFlyerModal } from './components/PriceFlyerModal';
import { ExportModal } from './components/ExportModal';
import { 
  INITIAL_ADDONS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_CLIENTS, 
  INITIAL_SERVICES, 
  INITIAL_TECHNICIANS,
  MICHELLE_BRAND 
} from './data/salonMockData';
import { Appointment, ClientNailProfile } from './types';
import { Lock, Phone, Instagram } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'public' | 'private'>('public');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFlyerModalOpen, setIsFlyerModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Business Operational State
  const [technicians, setTechnicians] = useState(INITIAL_TECHNICIANS);
  const [services] = useState(INITIAL_SERVICES);
  const [addons] = useState(INITIAL_ADDONS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [clients, setClients] = useState<ClientNailProfile[]>(INITIAL_CLIENTS);

  // Check persisted session
  useEffect(() => {
    try {
      const savedAuth = sessionStorage.getItem('mp_nails_admin_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch {
      // Ignore storage errors in sandboxed iframes
    }
  }, []);

  const handleOpenAdminLogin = () => {
    if (isAuthenticated) {
      setViewMode('private');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    setViewMode('private');
    try {
      sessionStorage.setItem('mp_nails_admin_auth', 'true');
    } catch {
      // Ignore storage errors
    }
  };

  const handleLogout = () => {
    setViewMode('public');
  };

  const handleAddAppointment = (newApt: Appointment) => {
    setAppointments(prev => [newApt, ...prev]);
  };

  const handleUpdateStatus = (aptId: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === aptId) {
        return { ...a, status };
      }
      return a;
    }));
  };

  const handleUpdateClient = (updatedClient: ClientNailProfile) => {
    setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
  };

  const handleCompletePayment = (aptId: string) => {
    handleUpdateStatus(aptId, 'completed');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#261F1A] flex flex-col font-sans selection:bg-[#F3E7D3] selection:text-[#8C6B2D]">
      {/* 1. PUBLIC WEBSITE MODE */}
      {viewMode === 'public' && (
        <>
          <PublicNavbar
            onOpenFlyerModal={() => setIsFlyerModalOpen(true)}
            onOpenAdminLogin={handleOpenAdminLogin}
          />

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            <PublicWebsite
              services={services}
              addons={addons}
              technicians={technicians}
              onBookAppointment={handleAddAppointment}
              onOpenFlyerModal={() => setIsFlyerModalOpen(true)}
              onOpenAdminLogin={handleOpenAdminLogin}
            />
          </main>

          {/* Luxury Brand Footer */}
          <footer className="border-t border-[#E8DEC8] bg-[#FAF7F2] py-10 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#735F48]">
              <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                <div className="w-8 h-8 rounded-full border border-[#D4AF37] p-0.5 bg-white shrink-0">
                  <img
                    src={MICHELLE_BRAND.assets.logoCircular}
                    alt="Michelle Pérez Circular Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <span className="font-serif font-bold text-[#261F1A] text-sm block">
                    Michelle Pérez Nails Studio
                  </span>
                  <span>Pereira & Dosquebradas (Colombia) · WhatsApp: {MICHELLE_BRAND.whatsappNumber}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={MICHELLE_BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8C6B2D] hover:underline font-semibold flex items-center gap-1"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>{MICHELLE_BRAND.instagram}</span>
                </a>
                <span aria-hidden="true">·</span>
                <button
                  onClick={() => setIsFlyerModalOpen(true)}
                  className="text-[#5C4D42] hover:text-[#261F1A] transition-colors"
                >
                  Menú Original
                </button>
                <span aria-hidden="true">·</span>
                <button
                  onClick={handleOpenAdminLogin}
                  className="text-[#8C6B2D] hover:text-[#261F1A] font-semibold transition-colors flex items-center gap-1"
                >
                  <Lock className="w-3 h-3" />
                  <span>Acceso Studio (Privado)</span>
                </button>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* 2. PRIVATE BUSINESS DASHBOARD MODE */}
      {viewMode === 'private' && (
        <div className="flex-1 flex flex-col">
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <PrivateDashboard
              technicians={technicians}
              services={services}
              addons={addons}
              appointments={appointments}
              clients={clients}
              onAddAppointment={handleAddAppointment}
              onUpdateStatus={handleUpdateStatus}
              onUpdateClient={handleUpdateClient}
              onCompletePayment={handleCompletePayment}
              onLogout={handleLogout}
            />
          </main>
        </div>
      )}

      {/* Access Key Modal */}
      <AccessKeyModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Original Physical Price Sheet Flyer Modal */}
      <PriceFlyerModal
        isOpen={isFlyerModalOpen}
        onClose={() => setIsFlyerModalOpen(false)}
      />

      {/* PRD Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
