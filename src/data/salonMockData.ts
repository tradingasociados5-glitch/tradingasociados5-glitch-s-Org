import { Appointment, ClientNailProfile, ServiceAddon, ServiceItem, Technician } from '../types';

export const MICHELLE_BRAND = {
  name: 'Michelle Pérez Nails Studio',
  shortName: 'Michelle Pérez',
  instagram: '@michellenails.co',
  instagramUrl: 'https://instagram.com/michellenails.co',
  whatsappNumber: '+57 304 4420816',
  whatsappRaw: '573044420816',
  city: 'Pereira y Dosquebradas, Risaralda (Colombia)',
  modalities: ['En Studio', 'A Domicilio (Pereira & Dosquebradas)'],
  assets: {
    logoMonogram: '/assets/aistudio/WhatsApp_Image_2026-11-07_at_1.28.42_PM_55e748b5.jpeg',
    logoCircular: '/assets/aistudio/WhatsApp_Image_2026-11-07_at_1.2842_PM_ca1cd693.jpeg',
    priceListFlyer: '/assets/aistudio/WhatsApp_Image_2026-11-07_at_1.24.46_PM_b62e3c8c.jpeg',
    instagramFeed: '/assets/aistudio/WhatsApp_Image_2026-11-07_at_1.30.23_PM_545e1f3d.jpeg',
  },
  highlights: [
    { title: 'Reseñas', icon: 'Heart', desc: 'Más de 350 clientas felices' },
    { title: 'Horarios', icon: 'Clock', desc: 'Lunes a Sábado 8:00 AM - 7:00 PM' },
    { title: 'Garantía', icon: 'Shield', desc: '5 días de garantía en sistemas artificiales' },
  ]
};

export const INITIAL_TECHNICIANS: Technician[] = [
  {
    id: 'tech-michelle',
    name: 'Michelle Pérez',
    specialty: 'Master Nail Artist · Polygel, Press On & Diseños de Alta Gama',
    chairNumber: 1,
    avatarUrl: '/assets/aistudio/WhatsApp_Image_2026-11-07_at_1.2842_PM_ca1cd693.jpeg',
    commissionRate: 1.0, // Dueña / Master
    retailCommissionRate: 1.0,
    rating: 5.0,
    status: 'in_service'
  },
  {
    id: 'tech-vale',
    name: 'Valentina Osorio',
    specialty: 'Especialista en Base Rubber, Dipping & Nivelación',
    chairNumber: 2,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    commissionRate: 0.50,
    retailCommissionRate: 0.10,
    rating: 4.95,
    status: 'active'
  },
  {
    id: 'tech-camila',
    name: 'Camila Restrepo',
    specialty: 'Especialista en Pedicura Spa & Manos Tradicionales',
    chairNumber: 3,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    commissionRate: 0.50,
    retailCommissionRate: 0.10,
    rating: 4.90,
    status: 'active'
  }
];

// Exact prices from Michelle's Menu (in COP - Colombian Pesos)
export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-poly-tip',
    name: 'Polygel Con Tip',
    category: 'polygel',
    baseDurationMin: 120,
    bufferMin: 15,
    basePrice: 100000,
    description: 'Extensión completa estructural con tip y polygel de alta resistencia. Arquitectura perfecta, limado ergonómico y acabado brillante.',
    isPopular: true,
    canBeDomicilio: true
  },
  {
    id: 'srv-poly-forrado',
    name: 'Forrado Polygel',
    category: 'polygel',
    baseDurationMin: 90,
    bufferMin: 15,
    basePrice: 90000,
    description: 'Blindaje o recubrimiento protector en polygel sobre la uña natural para dar rigidez, fuerza y evitar quiebres sin añadir tip.',
    isPopular: true,
    canBeDomicilio: true
  },
  {
    id: 'srv-press-on',
    name: 'Press on (Set Completo)',
    category: 'presson',
    baseDurationMin: 75,
    bufferMin: 15,
    basePrice: 80000,
    description: 'Sistema moderno de tips completos full-cover adaptados milimétricamente con adherencia en gel. Ligero, resistente y no invasivo.',
    isPopular: true,
    canBeDomicilio: true
  },
  {
    id: 'srv-press-on-mant',
    name: 'Mantenimiento press on',
    category: 'presson',
    baseDurationMin: 65,
    bufferMin: 15,
    basePrice: 70000,
    description: 'Relleno de zona de crecimiento, rebalanceo estructural y cambio de diseño para sets de press on a 15-21 días.',
    isPopular: false,
    canBeDomicilio: true
  },
  {
    id: 'srv-base-rubber',
    name: 'Base Rubber',
    category: 'semipermanente',
    baseDurationMin: 70,
    bufferMin: 15,
    basePrice: 60000,
    description: 'Nivelación y refuerzo de la uña natural con base elástica rubber de alta densidad + esmaltado semipermanente de precisión bajo cutícula.',
    isPopular: true,
    canBeDomicilio: true
  },
  {
    id: 'srv-dipping-semi',
    name: 'Dipping + Semi',
    category: 'semipermanente',
    baseDurationMin: 70,
    bufferMin: 15,
    basePrice: 55000,
    description: 'Sistema en polvo de inmersión fortificado con minerales para máxima firmeza, sellado con esmaltado semipermanente.',
    isPopular: false,
    canBeDomicilio: true
  },
  {
    id: 'srv-mani-semi',
    name: 'Manicura Semi (Con diseño)',
    category: 'semipermanente',
    baseDurationMin: 60,
    bufferMin: 10,
    basePrice: 50000,
    description: 'Limpieza profunda de cutícula, limado anatómico, nivelación ligera y esmaltado semipermanente con diseño.',
    isPopular: true,
    canBeDomicilio: true
  },
  {
    id: 'srv-semi-solo-tono',
    name: 'Manicura Semi Solo Tono',
    category: 'semipermanente',
    baseDurationMin: 50,
    bufferMin: 10,
    basePrice: 45000,
    description: 'Manicura semipermanente en color liso uniforme con acabado espejo ultra brillante.',
    isPopular: false,
    canBeDomicilio: true
  },
  {
    id: 'srv-pies-semi',
    name: 'Pies semipermanente',
    category: 'pies',
    baseDurationMin: 50,
    bufferMin: 10,
    basePrice: 35000,
    description: 'Pedicura estética con limpieza de laterales, hidratación y esmaltado semipermanente curado en lámpara LED.',
    isPopular: true,
    canBeDomicilio: true
  },
  {
    id: 'srv-manos-trad',
    name: 'Manos tradicionales solo tono',
    category: 'tradicional',
    baseDurationMin: 40,
    bufferMin: 10,
    basePrice: 25000,
    description: 'Manicura clásica con exfoliación, hidratación y esmalte tradicional de secado al aire.',
    isPopular: false,
    canBeDomicilio: true
  },
  {
    id: 'srv-pies-trad',
    name: 'Pies tradicionales solo tono',
    category: 'pies',
    baseDurationMin: 40,
    bufferMin: 10,
    basePrice: 25000,
    description: 'Pedicura clásica con remoción de asperezas, exfoliación y esmalte tradicional liso.',
    isPopular: false,
    canBeDomicilio: true
  }
];

// Exact Adicionales from Michelle's Menu (in COP)
export const INITIAL_ADDONS: ServiceAddon[] = [
  {
    id: 'add-retiro-def-art',
    name: 'Retiro definitivo (sistema artificial)',
    extraMinutes: 25,
    extraPrice: 20000,
    category: 'prep'
  },
  {
    id: 'add-retiro-otro',
    name: 'Retiro Otro Lugar',
    extraMinutes: 20,
    extraPrice: 12000,
    category: 'prep'
  },
  {
    id: 'add-retiro-spa',
    name: 'Retiro spa',
    extraMinutes: 15,
    extraPrice: 10000,
    category: 'care'
  },
  {
    id: 'add-retiro-def-semi',
    name: 'Retiro definitivo (semipermanente)',
    extraMinutes: 15,
    extraPrice: 10000,
    category: 'prep'
  },
  {
    id: 'add-una-polygel',
    name: 'Uña Polygel (Reparación individual)',
    extraMinutes: 10,
    extraPrice: 10000,
    category: 'art'
  },
  {
    id: 'add-una-press-on',
    name: 'Uña Press on (Reparación individual)',
    extraMinutes: 10,
    extraPrice: 10000,
    category: 'art'
  }
];

export const INITIAL_CLIENTS: ClientNailProfile[] = [
  {
    id: 'cli-pereira-1',
    name: 'Isabella Gómez Restrepo',
    phone: '+57 312 884 1920',
    email: 'isabella.gomez@gmail.com',
    instagram: '@isabellag_pereira',
    allergies: ['HEMA / Metacrilatos puros (usar Base Rubber HEMA-Free)'],
    cuticleType: 'Cutícula muy delgada y sensible en zona proximal',
    nailPlateCondition: 'Placa plana, ligera debilidad por uso continuo de tips anteriores',
    preferredTechnique: 'Forrado en Polygel + Francés clásico delgado',
    lastVisit: '2026-10-22',
    visitsCount: 6,
    loyaltyPoints: 6,
    totalSpent: 540000,
    notes: 'Vive en Pinares (Pereira). Prefiere atención en Studio los sábados por la mañana.',
    pastDesignImage: '/assets/aistudio/WhatsApp_Image_2026-11-07_at_1.30.23_PM_545e1f3d.jpeg',
    favoriteColors: ['Blanco Francés Milky', 'Nude Travertine #02', 'Glazed Pearl']
  },
  {
    id: 'cli-pereira-2',
    name: 'Mariana Duque Henao',
    phone: '+57 320 651 4433',
    email: 'mariana.duque@hotmail.com',
    instagram: '@marianaduque_h',
    allergies: ['Ninguna'],
    cuticleType: 'Cutícula estándar, buena hidratación',
    nailPlateCondition: 'Fuerte, lecho ungueal largo',
    preferredTechnique: 'Press On Coffin + Cristales y Nail Art',
    lastVisit: '2026-10-29',
    visitsCount: 9,
    loyaltyPoints: 9,
    totalSpent: 810000,
    notes: 'Fanática del sistema Press On. Atendida habitualmente por Michelle.',
    pastDesignImage: '/assets/aistudio/WhatsApp_Image_2026-11-07_at_1.30.23_PM_545e1f3d.jpeg',
    favoriteColors: ['Rose Gold Chrome', 'Vino Tinto Catedral', 'French 3D']
  },
  {
    id: 'cli-pereira-3',
    name: 'Carolina Morales Gil',
    phone: '+57 310 994 3321',
    email: 'caro.morales@dosquebradas.co',
    allergies: ['Sensibilidad a la acetona pura (usar removedor oleoso con aceites botánicos)'],
    cuticleType: 'Cutícula adherida con tendencia a resequedad',
    nailPlateCondition: 'En recuperación tras retiro agresivo previo',
    preferredTechnique: 'Base Rubber con nivelación + Esmaltado solo tono',
    lastVisit: '2026-11-01',
    visitsCount: 3,
    loyaltyPoints: 3,
    totalSpent: 220000,
    notes: 'Reserva servicio A Domicilio en Dosquebradas (Sector Los Molinos).',
    favoriteColors: ['Nude Rosé Natural', 'Matcha Pastel']
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-miche-101',
    clientId: 'cli-pereira-1',
    clientName: 'Isabella Gómez Restrepo',
    clientPhone: '+57 312 884 1920',
    technicianId: 'tech-michelle',
    serviceId: 'srv-poly-tip',
    addonIds: ['add-retiro-otro'], // Trae material de otro salón
    date: '2026-11-07',
    startTime: '10:00',
    durationMinutes: 140, // 120 + 20
    totalPrice: 112000, // 100k + 12k
    status: 'in_chair',
    reminderSent: true,
    depositPaid: 30000,
    notes: 'Retiro cuidadoso de set antiguo + Polygel almendrado nuevo con efecto milky.',
    modality: 'studio'
  },
  {
    id: 'apt-miche-102',
    clientId: 'cli-pereira-2',
    clientName: 'Mariana Duque Henao',
    clientPhone: '+57 320 651 4433',
    technicianId: 'tech-michelle',
    serviceId: 'srv-press-on',
    addonIds: [],
    date: '2026-11-07',
    startTime: '13:00',
    durationMinutes: 75,
    totalPrice: 80000,
    status: 'confirmed',
    reminderSent: true,
    depositPaid: 25000,
    notes: 'Press On con francés moderno.',
    modality: 'studio'
  },
  {
    id: 'apt-miche-103',
    clientId: 'cli-pereira-3',
    clientName: 'Carolina Morales Gil',
    clientPhone: '+57 310 994 3321',
    technicianId: 'tech-vale',
    serviceId: 'srv-base-rubber',
    addonIds: ['add-retiro-spa'],
    date: '2026-11-07',
    startTime: '15:00',
    durationMinutes: 85,
    totalPrice: 70000,
    status: 'confirmed',
    reminderSent: false,
    depositPaid: 20000,
    notes: 'Servicio A Domicilio en Dosquebradas (Los Molinos).',
    modality: 'domicilio',
    address: 'Dosquebradas · Conjunto Residencial Los Molinos, Torre 3 Apt 402'
  }
];

export const INITIAL_INVENTORY = [
  { id: 'inv-poly-tube', name: 'Tubo Polygel Acrylgel Clear & Nude 60g', category: 'Insumo de Cabina', stock: 8, minStock: 3, unit: 'Tubos 60g', unitCost: 35000 },
  { id: 'inv-presson-box', name: 'Caja Full Cover Press On Almond & Coffin', category: 'Insumo de Cabina', stock: 12, minStock: 4, unit: 'Cajas 500 pcs', unitCost: 42000 },
  { id: 'inv-rubber-base', name: 'Base Rubber Niveladora HEMA-Free', category: 'Insumo de Cabina', stock: 6, minStock: 2, unit: 'Frascos 15ml', unitCost: 28000 },
  { id: 'inv-aceite-jojoba', name: 'Aceite de Cutícula Roll-On Botánico Jojoba', category: 'Reventa Retail', stock: 24, minStock: 6, unit: 'Goteros 10ml', unitCost: 8000, salePrice: 20000 },
  { id: 'inv-crema-karite', name: 'Crema Hidratante Seda de Manos con Karité', category: 'Reventa Retail', stock: 15, minStock: 5, unit: 'Pomos 60g', unitCost: 11000, salePrice: 25000 }
];
