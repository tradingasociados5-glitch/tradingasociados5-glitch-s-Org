export type SystemTab = 'booking' | 'catalog' | 'agenda' | 'clients' | 'pos' | 'inventory' | 'brand' | 'blueprint';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'polygel' | 'presson' | 'semipermanente' | 'tradicional' | 'pies' | 'adicionales';
  baseDurationMin: number;
  bufferMin: number;
  basePrice: number; // in COP
  description: string;
  isPopular?: boolean;
  canBeDomicilio?: boolean;
}

export interface ServiceAddon {
  id: string;
  name: string;
  extraMinutes: number;
  extraPrice: number;
  category: 'art' | 'prep' | 'care';
}

export interface Technician {
  id: string;
  name: string;
  specialty: string;
  chairNumber: number;
  avatarUrl: string;
  commissionRate: number; // e.g. 0.50 (50%)
  retailCommissionRate: number; // e.g. 0.10 (10%)
  rating: number;
  status: 'active' | 'in_service' | 'break';
}

export interface ClientNailProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  instagram?: string;
  allergies: string[]; // e.g. "HEMA / Metacrilatos", "Látex"
  cuticleType: string; // e.g. "Delgada y sensible", "Seca / Hiperqueratosis"
  nailPlateCondition: string; // e.g. "Estrías leves, lecho ungueal corto"
  preferredTechnique: string; // e.g. "Manicura Rusa Combinada + Rubber Base"
  lastVisit: string;
  visitsCount: number;
  loyaltyPoints: number; // e.g. 6 of 10 for free refill
  totalSpent: number;
  notes: string;
  pastDesignImage?: string;
  favoriteColors: string[];
}

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  clientId: string;
  technicianId: string;
  serviceId: string;
  addonIds: string[];
  date: string;
  startTime: string;
  durationMinutes: number;
  totalPrice: number; // in COP
  status: 'confirmed' | 'in_chair' | 'completed' | 'cancelled' | 'no_show';
  reminderSent: boolean;
  notes?: string;
  depositPaid: number;
  modality?: 'studio' | 'domicilio';
  address?: string; // e.g. "Pereira - Pinares" o "Dosquebradas"
}

export interface GitHubRepoEvaluation {
  id: string;
  name: string;
  repoUrl: string;
  category: 'Reservas & Agenda' | 'E-Commerce / POS' | 'Framework Admin / CRM' | 'Notificaciones & WhatsApp' | 'CRM Clientes';
  license: string;
  licenseCommercialViability: 'Alta (MIT / Apache 2.0)' | 'Media (AGPLv3 / Restrictiva)' | 'Baja';
  stars: string;
  maintenanceStatus: 'Muy Activo (Actualizaciones semanales)' | 'Activo' | 'Estable';
  techStack: string[];
  reusableModule: string;
  recommendationType: 'Base de Arquitectura' | 'Referencia de Modelo de Datos' | 'Librería / Microservicio desacoplado';
  verdictSummary: string;
  pros: string[];
  cons: string[];
  howToLeverage: string;
}

export interface ScopeFeature {
  id: string;
  name: string;
  phase: 'MVP Inmediato' | 'SaaS v2 (Crecimiento)' | 'SaaS v3 (Escala & Multi-Sucursal)';
  category: 'Citas & Agenda' | 'Ficha Clínica' | 'Catálogo & Precios' | 'POS & Comisiones' | 'Fidelización' | 'Inventario' | 'Reportes & WhatsApp';
  customerValue: string;
  businessValue: string;
  complexity: 'Baja' | 'Media' | 'Alta';
}
