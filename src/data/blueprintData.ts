import { GitHubRepoEvaluation, ScopeFeature } from '../types';

export const ASSUMPTIONS = {
  businessSize: 'Salón boutique o estudio especializado en uñas de 3 a 8 manicuristas/técnicas, 4 a 6 mesas/sillones.',
  volume: '40 a 120 citas semanales con ticket promedio de $28 - $55 USD por cliente.',
  teamBudget: 'Equipo técnico lean (1 a 2 desarrolladores full-stack o fundador técnico), presupuesto inicial de infraestructura menor a $60 USD/mes.',
  clientBehavior: '92% de los clientes reservan desde smartphone; WhatsApp es el canal preferido de confirmación y comunicación en LATAM y España.',
  operatingModel: 'Modelo mixto: técnicas con comisión sobre servicio (45%-60%) + 10% sobre reventa de productos cosméticos + 100% de propinas recibidas.',
};

export const SCOPE_FEATURES: ScopeFeature[] = [
  // 1. Citas y Agenda
  {
    id: 'citas-mvp-1',
    name: 'Agenda visual multi-técnica con cálculo dinámico de duración y tiempos de desinfección',
    phase: 'MVP Inmediato',
    category: 'Citas & Agenda',
    customerValue: 'Disponibilidad precisa en tiempo real; evita esperas en sala y retrasos por servicios subestimados.',
    businessValue: 'Bloquea automáticamente 10-15 min de esterilización y evita colisiones entre mesas de trabajo.',
    complexity: 'Media'
  },
  {
    id: 'citas-mvp-2',
    name: 'Link de auto-reserva web responsivo optimizado para Bio de Instagram / WhatsApp',
    phase: 'MVP Inmediato',
    category: 'Citas & Agenda',
    customerValue: 'Reserva 24/7 en 3 clics sin depender de que la recepcionista responda chats a medianoche.',
    businessValue: 'Convierte el tráfico de redes sociales en reservas confirmadas al instante.',
    complexity: 'Baja'
  },
  {
    id: 'citas-saas-1',
    name: 'Depósito / Anticipo obligatorio contra no-shows (Stripe / Mercado Pago)',
    phase: 'SaaS v2 (Crecimiento)',
    category: 'Citas & Agenda',
    customerValue: 'Garantía de cita y atención prioritaria asegurada.',
    businessValue: 'Reduce la tasa de inasistencia (no-shows) del 18% al menos del 3%, protegiendo el sueldo de las técnicas.',
    complexity: 'Media'
  },
  {
    id: 'citas-saas-2',
    name: 'Despacho inteligente de sillones y balanceo de carga entre técnicas',
    phase: 'SaaS v3 (Escala & Multi-Sucursal)',
    category: 'Citas & Agenda',
    customerValue: 'Menor tiempo de espera y asignación a especialistas óptimas.',
    businessValue: 'Maximiza la utilización del metro cuadrado del local y equilibra la facturación del equipo.',
    complexity: 'Alta'
  },

  // 2. Recordatorios & Notificaciones
  {
    id: 'notif-mvp-1',
    name: 'Recordatorio automático por WhatsApp 24h y 2h previas con botón "Confirmar" o "Reagendar"',
    phase: 'MVP Inmediato',
    category: 'Reportes & WhatsApp',
    customerValue: 'Comodidad para confirmar en 1 tap sin llamadas incómodas.',
    businessValue: 'Libera hasta 2 horas diarias de recepción manual y recupera slots cancelados con antelación.',
    complexity: 'Media'
  },
  {
    id: 'notif-saas-1',
    name: 'Campañas automatizadas de reactivación ("Tus uñas cumplen 21 días, es hora de tu retoque")',
    phase: 'SaaS v2 (Crecimiento)',
    category: 'Reportes & WhatsApp',
    customerValue: 'Mantiene la salud ungueal previniendo desprendimientos y quiebres dolorosos.',
    businessValue: 'Aumenta el Lifetime Value (LTV) y la frecuencia de visita recurrente en un 28%.',
    complexity: 'Media'
  },

  // 3. Catálogo & Add-ons
  {
    id: 'cat-mvp-1',
    name: 'Catálogo de servicios con add-ons acumulativos (Retiro previo, Nivel de Nail Art, Efectos)',
    phase: 'MVP Inmediato',
    category: 'Catálogo & Precios',
    customerValue: 'Transparencia de precios: la clienta sabe el costo total antes de sentarse en la silla.',
    businessValue: 'Termina con la subestimación de tiempo: si pide nail art complejo, el sistema suma 30 min y $15 USD.',
    complexity: 'Baja'
  },
  {
    id: 'cat-saas-1',
    name: 'Precios dinámicos por franja horaria / Happy Hour (llenado de horarios muertos)',
    phase: 'SaaS v3 (Escala & Multi-Sucursal)',
    category: 'Catálogo & Precios',
    customerValue: 'Acceso a descuentos en mañanas o días de baja demanda (martes/miércoles).',
    businessValue: 'Monetiza horas valle y aplana la curva de ocupación semanal.',
    complexity: 'Media'
  },

  // 4. Ficha de Clientes
  {
    id: 'cli-mvp-1',
    name: 'Ficha clínica y técnica: Registro de alergias (HEMA), tipo de cutícula y notas de brocas',
    phase: 'MVP Inmediato',
    category: 'Ficha Clínica',
    customerValue: 'Atención médica y estética segura; no sufre cortes ni dermatitis por productos incompatibles.',
    businessValue: 'Cualquier técnica del spa puede atender a la clienta conociendo sus especificaciones exactas.',
    complexity: 'Baja'
  },
  {
    id: 'cli-mvp-2',
    name: 'Galería de fotos de servicios previos y tonos de esmalte favoritos',
    phase: 'MVP Inmediato',
    category: 'Ficha Clínica',
    customerValue: 'Satisfacción: la manicurista sabe exactamente qué tono de nude o qué largo le gusta.',
    businessValue: 'Construye lealtad emocional y acelera la toma de decisión en cabina.',
    complexity: 'Baja'
  },

  // 5. Cobros y Comisiones
  {
    id: 'pos-mvp-1',
    name: 'Módulo de cobro rápido con cálculo automático de comisión por técnica y propinas',
    phase: 'MVP Inmediato',
    category: 'POS & Comisiones',
    customerValue: 'Proceso de pago rápido, desglose limpio y facilidad para dejar propinas digitales.',
    businessValue: 'Elimina disputas diarias y horas de hojas de Excel calculando comisiones manuales a fin de semana.',
    complexity: 'Media'
  },
  {
    id: 'pos-saas-1',
    name: 'Liquidación multi-banco y portal de autoservicio para técnicas (ver sus ganancias en tiempo real)',
    phase: 'SaaS v2 (Crecimiento)',
    category: 'POS & Comisiones',
    customerValue: 'Técnicas más motivadas y transparentes en el trato.',
    businessValue: 'Reduce la rotación de manicuristas, que es el mayor dolor operacional de un spa de uñas.',
    complexity: 'Alta'
  },

  // 6. Fidelización
  {
    id: 'fid-mvp-1',
    name: 'Tarjeta de sellos digital básica (ej. "En tu 5ta visita 20% off, en tu 10ma retoque gratis")',
    phase: 'MVP Inmediato',
    category: 'Fidelización',
    customerValue: 'Recompensa tangible por fidelidad sin tener que cargar un cartón físico que se pierde.',
    businessValue: 'Incentiva a la clienta a agendar su siguiente sesión de inmediato.',
    complexity: 'Baja'
  },
  {
    id: 'fid-saas-1',
    name: 'Programa de referidos con créditos acumulables en wallet y niveles VIP',
    phase: 'SaaS v2 (Crecimiento)',
    category: 'Fidelización',
    customerValue: 'Descuentos al recomendar a amigas o familiares.',
    businessValue: 'Canal de adquisición orgánica con costo de adquisición (CAC) cercano a cero.',
    complexity: 'Media'
  },

  // 7. Inventario
  {
    id: 'inv-mvp-1',
    name: 'Control de stock de productos de reventa y alerta de insumos críticos agotados',
    phase: 'MVP Inmediato',
    category: 'Inventario',
    customerValue: 'Disponibilidad constante de aceites hidratantes y productos recomendados.',
    businessValue: 'Evita perder ventas de retail con alto margen (40-60%) y faltantes de guantes o desinfectante.',
    complexity: 'Baja'
  },
  {
    id: 'inv-saas-1',
    name: 'Escandallo ungueal: Descuento milimétrico de gel/monómero por servicio y costeo unitario',
    phase: 'SaaS v3 (Escala & Multi-Sucursal)',
    category: 'Inventario',
    customerValue: 'Estandarización de calidad en cualquier sucursal.',
    businessValue: 'Control de mermas y auditoría de uso de producto por técnica.',
    complexity: 'Alta'
  },

  // 8. Reportes
  {
    id: 'rep-mvp-1',
    name: 'Reporte diario de cierre de caja, servicios realizados y ticket promedio',
    phase: 'MVP Inmediato',
    category: 'Reportes & WhatsApp',
    customerValue: 'Garantía de cobros exactos y consistencia de servicio.',
    businessValue: 'Visibilidad financiera diaria para el dueño en 3 minutos desde el móvil.',
    complexity: 'Baja'
  },
  {
    id: 'rep-saas-1',
    name: 'Analítica predictiva de retención de clientas y ranking de productividad por técnica',
    phase: 'SaaS v2 (Crecimiento)',
    category: 'Reportes & WhatsApp',
    customerValue: 'Premia a las mejores manicuristas con mejores horarios.',
    businessValue: 'Identifica fugas de clientas y detecta qué servicios tienen mayor margen neto real.',
    complexity: 'Media'
  }
];

export const GITHUB_REPOSITORIES: GitHubRepoEvaluation[] = [
  {
    id: 'cal-com',
    name: 'Cal.com (calcom/cal.com)',
    repoUrl: 'https://github.com/calcom/cal.com',
    category: 'Reservas & Agenda',
    license: 'AGPLv3 / Commercial Enterprise',
    licenseCommercialViability: 'Media (AGPLv3 / Restrictiva)',
    stars: '34.5k+',
    maintenanceStatus: 'Muy Activo (Actualizaciones semanales)',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    reusableModule: 'Motor de cálculo de slots libres, buffers de preparación, manejo de zonas horarias y widgets de reserva embebibles.',
    recommendationType: 'Referencia de Modelo de Datos',
    verdictSummary: 'Excelente arquitectura de referencia para algoritmos de disponibilidad y buffers, pero desaconsejado copiar código directo como base de SaaS propietario debido al copyleft AGPLv3.',
    pros: [
      'Algoritmo de cálculo de disponibilidad multi-usuario probado con millones de reservas.',
      'Soporte nativo de "buffer time" previo y posterior (crucial para desinfección de herramientas de manicura).',
      'Código TypeScript limpio y modular con Prisma Schema de referencia.'
    ],
    cons: [
      'Licencia AGPLv3: Si modificas y expones el servicio en la web, estás obligado por ley a liberar todo tu código fuente propietario.',
      'Demasiado sobredimensionado para un spa (incluye videoconferencias, calendarios de oficina, etc.).'
    ],
    howToLeverage: 'Estudiar su esquema Prisma de `Schedule`, `Availability`, `Booking` y `EventType` para replicar el modelo de datos limpio en PostgreSQL con Drizzle/Prisma bajo licencia propietaria o MIT.'
  },
  {
    id: 'medusa',
    name: 'Medusa.js (medusajs/medusa)',
    repoUrl: 'https://github.com/medusajs/medusa',
    category: 'E-Commerce / POS',
    license: 'MIT',
    licenseCommercialViability: 'Alta (MIT / Apache 2.0)',
    stars: '26.8k+',
    maintenanceStatus: 'Muy Activo (Actualizaciones semanales)',
    techStack: ['Node.js', 'TypeScript', 'Express', 'PostgreSQL', 'Redis'],
    reusableModule: 'Motor transaccional de carrito, catálogo con variantes (color/tamaño), inventario multi-ubicación y abstracción de pasarelas de pago.',
    recommendationType: 'Base de Arquitectura',
    verdictSummary: 'El mejor motor headless open-source en Node.js/TypeScript con licencia MIT 100% permisiva para soportar el módulo transaccional de venta de servicios + retail de cosméticos.',
    pros: [
      'Licencia MIT 100% permisiva para uso comercial SaaS sin obligación de liberar código.',
      'Arquitectura basada en plugins y módulos desacoplados (Orders, Products, Inventory, Customers).',
      'Excelente integración nativa con Stripe, PayPal y Mercado Pago.'
    ],
    cons: [
      'Pensado primordialmente para e-commerce de productos físicos; requiere modelar las citas como "servicios con duración y asignación de técnica".'
    ],
    howToLeverage: 'Utilizar el backend de Medusa como motor de comercio headless para gestionar clientes, órdenes, pagos con tarjeta y productos de venta al por menor (aceites de cutícula, kits de cuidado).'
  },
  {
    id: 'refine',
    name: 'Refine (refinedev/refine)',
    repoUrl: 'https://github.com/refinedev/refine',
    category: 'Framework Admin / CRM',
    license: 'MIT',
    licenseCommercialViability: 'Alta (MIT / Apache 2.0)',
    stars: '30.1k+',
    maintenanceStatus: 'Muy Activo (Actualizaciones semanales)',
    techStack: ['React', 'TypeScript', 'Next.js / Vite', 'Tailwind / AntD / Mantine'],
    reusableModule: 'Generación acelerada de paneles de administración, tablas de auditoría, formularios complejos, autenticación RBAC y sincronización en tiempo real.',
    recommendationType: 'Base de Arquitectura',
    verdictSummary: 'La mejor opción para construir el panel de administración del dueño del spa y la pantalla de recepción en 1/4 del tiempo habitual.',
    pros: [
      'Licencia MIT permisiva con adopción masiva empresarial.',
      'Agnóstico al backend: se conecta directo a REST, GraphQL, Supabase o NestJS mediante data providers.',
      'Maneja automáticamente estados de carga, paginación, filtros de búsqueda, exportación a Excel/PDF y control de permisos (Admin vs Recepción vs Manicurista).'
    ],
    cons: [
      'La curva de aprendizaje requiere entender su abstracción de "Hooks" (`useTable`, `useForm`).'
    ],
    howToLeverage: 'Usar Refine con React + Tailwind para montar toda la suite de back-office del spa: Gestión de técnicas, Liquidación de comisiones, Catálogo y Reportes de ventas.'
  },
  {
    id: 'novu',
    name: 'Novu (novuhq/novu)',
    repoUrl: 'https://github.com/novuhq/novu',
    category: 'Notificaciones & WhatsApp',
    license: 'MIT / Apache 2.0 (Open-core)',
    licenseCommercialViability: 'Alta (MIT / Apache 2.0)',
    stars: '36.2k+',
    maintenanceStatus: 'Muy Activo (Actualizaciones semanales)',
    techStack: ['NestJS', 'React', 'TypeScript', 'Redis', 'PostgreSQL'],
    reusableModule: 'Orquestador visual de flujos de notificación multicanal (WhatsApp, SMS, Email, Push e In-App) con delays y condiciones.',
    recommendationType: 'Librería / Microservicio desacoplado',
    verdictSummary: 'Elimina por completo la deuda técnica de programar recordatorios "hardcodeados" con cron jobs vulnerables.',
    pros: [
      'Permite diseñar flujos: "Enviar WhatsApp 24h antes -> Si no confirma en 6h -> Enviar SMS recordatorio".',
      'SDK oficial en TypeScript para disparar eventos simples (`novu.trigger("appointment-reminder", { client, time })`).',
      'Soporta múltiples proveedores: WhatsApp Cloud API, Twilio, SendGrid, Resend.'
    ],
    cons: [
      'El despliegue self-hosted completo tiene varios contenedores Docker (Nest, Redis, Mongo/Postgres). Conviene usar su cloud tier gratuito para iniciar el MVP.'
    ],
    howToLeverage: 'Integrar el SDK de Novu en el backend para gestionar todos los recordatorios automatizados de citas y avisos de comisiones a las manicuristas.'
  },
  {
    id: 'twenty',
    name: 'Twenty CRM (twentycrm/twenty)',
    repoUrl: 'https://github.com/twentycrm/twenty',
    category: 'CRM Clientes',
    license: 'AGPLv3',
    licenseCommercialViability: 'Media (AGPLv3 / Restrictiva)',
    stars: '24.1k+',
    maintenanceStatus: 'Muy Activo (Actualizaciones semanales)',
    techStack: ['TypeScript', 'NestJS', 'React', 'GraphQL', 'PostgreSQL'],
    reusableModule: 'Esquema de campos personalizados (custom fields), historial de interacciones, timeline de citas y segmentación de clientes.',
    recommendationType: 'Referencia de Modelo de Datos',
    verdictSummary: 'Excelente referente visual y técnico de cómo diseñar fichas de clientes flexibles y campos personalizados sin romper la base de datos.',
    pros: [
      'Diseño visual moderno (inspirado en Linear / Notion), muy intuitivo para el personal de belleza.',
      'Soporte de campos dinámicos (ideal para anotar alergias, cutículas o recetas de color sin cambiar código).'
    ],
    cons: [
      'Licencia AGPLv3 que restringe su distribución como código cerrado si se embebe directamente.',
      'Enfocado en ventas B2B tradicionales (leads, deals), por lo que requiere mucha adaptación.'
    ],
    howToLeverage: 'Inspirarse en su modelo de datos relacional para el perfil de clientes con metadatos JSONB para la ficha clínica/estética.'
  },
  {
    id: 'evolution-api',
    name: 'Evolution API (evolution-api/evolution-api)',
    repoUrl: 'https://github.com/evolution-api/evolution-api',
    category: 'Notificaciones & WhatsApp',
    license: 'Apache 2.0',
    licenseCommercialViability: 'Alta (MIT / Apache 2.0)',
    stars: '8.4k+',
    maintenanceStatus: 'Muy Activo (Actualizaciones semanales)',
    techStack: ['Node.js', 'TypeScript', 'Baileys', 'Fastify / Express', 'Redis'],
    reusableModule: 'Pasarela HTTP REST para interactuar directamente con WhatsApp mediante código QR, ideal para spas que quieren usar su número actual.',
    recommendationType: 'Librería / Microservicio desacoplado',
    verdictSummary: 'La solución más rentable y rápida para conectar el número de WhatsApp oficial del spa sin incurrir en los costos por mensaje de la API oficial de Meta en etapa temprana.',
    pros: [
      'Licencia Apache 2.0 amigable con desarrollo comercial.',
      'Envío de mensajes con botones interactivos, links y recepción de respuestas mediante webhooks.',
      'Ahorra cientos de dólares en costos de mensajería durante el MVP.'
    ],
    cons: [
      'Al usar emulación de WhatsApp Web (Baileys), existe riesgo de bloqueo si se envía spam masivo (se debe usar solo para recordatorios transaccionales con consentimiento).'
    ],
    howToLeverage: 'Desplegar como microservicio independiente en una pequeña instancia de VPS o Cloud Run para procesar las confirmaciones y cancelaciones automáticas del spa.'
  }
];

export const TECHNICAL_ARCHITECTURE = {
  recommendedStack: [
    {
      layer: 'Frontend & App Cliente',
      tech: 'Next.js 15 (App Router) + React 19 + Tailwind CSS + Lucide',
      rationale: 'Rendimiento SSR instantáneo para SEO local en Google ("spa de uñas cerca de mí"), componentes móviles fluidos y tiempo de carga menor a 1.2s en conexiones 4G.'
    },
    {
      layer: 'Backend API & Lógica de Negocio',
      tech: 'Node.js (TypeScript) + Fastify o Next.js Server Actions / Route Handlers',
      rationale: 'Tipado estricto extremo de extremo a extremo, alta concurrencia para manejo de locks de agenda y velocidad de iteración en equipo reducido.'
    },
    {
      layer: 'Base de Datos & ORM',
      tech: 'PostgreSQL + Drizzle ORM (o Supabase PostgreSQL)',
      rationale: 'Drizzle ofrece máxima velocidad sin el overhead de memoria de Prisma, soporte nativo de transacciones ACID para evitar colisiones de citas, y tipos TypeScript generados automáticamente.'
    },
    {
      layer: 'Autenticación & Roles (RBAC)',
      tech: 'Supabase Auth o Clerk (SaaS multi-tenant)',
      rationale: 'Soporte inmediato de 4 roles: 1) Dueño/Admin, 2) Recepcionista, 3) Manicurista (solo ve su agenda y comisiones), 4) Cliente final (login mágico sin contraseña vía SMS/WhatsApp).'
    },
    {
      layer: 'Pasarela de Cobro',
      tech: 'Stripe Elements (Internacional) / Mercado Pago SDK (LATAM) + Terminales POS',
      rationale: 'Permite cobrar depósitos de garantía con retención o split de comisiones directo a la cuenta de la técnica si opera como profesional independiente.'
    },
    {
      layer: 'Mensajería & Notificaciones',
      tech: 'Novu Cloud + WhatsApp Cloud API (con fallback de Evolution API / Twilio)',
      rationale: 'Aísla la lógica de negocio de los proveedores de mensajería; si Meta cambia sus tarifas, se conmuta de proveedor sin tocar el código central.'
    }
  ],
  risksAndMitigations: [
    {
      risk: 'Doble reserva / Carrera de concurrencia en la misma técnica o mesa',
      impact: 'Crítico (cliente molesta en la sala, daño de reputación inmediato)',
      probability: 'Media-Alta',
      mitigation: 'Implementar transacciones con bloqueo pesimista en PostgreSQL (`SELECT ... FOR UPDATE` en el rango horario de la técnica) al reservar, con TTL de 5 minutos mientras el cliente completa el pago.'
    },
    {
      risk: 'Alta tasa de no-shows (clientes que no asisten y no avisan)',
      impact: 'Alto (pérdida del 15-25% de la capacidad facturable del día)',
      probability: 'Muy Alta en el sector belleza',
      mitigation: 'Depósito de reserva no reembolsable del 25-30% descontable del servicio final, o validación de tarjeta con penalización por cancelación con menos de 12 horas de aviso.'
    },
    {
      risk: 'Fuga de clientes directa con la técnica (desintermediación)',
      impact: 'Alto (la clienta acuerda citas por chat personal con la manicurista)',
      probability: 'Alta',
      mitigation: 'Brindar al cliente una experiencia digital superior (puntos de fidelidad, historial de colores, recordatorios y factura) y comisiones justas y transparentes a la técnica.'
    },
    {
      risk: 'Bloqueo del número de WhatsApp del spa por spam de Meta',
      impact: 'Severo (se corta el canal de comunicación primordial)',
      probability: 'Media',
      mitigation: 'Utilizar plantillas transaccionales verificadas de Meta con opt-in explícito del cliente al agendar y nunca hacer broadcasts promocionales no solicitados desde la misma línea.'
    },
    {
      risk: 'Filtración de datos entre diferentes salones (Multi-tenancy breach)',
      impact: 'Catastrófico (demanda legal y pérdida total de confianza)',
      probability: 'Baja si se diseña bien',
      mitigation: 'En PostgreSQL activar Row Level Security (RLS) en todas las tablas con la clave `tenant_id` vinculada a la sesión del usuario autenticado.'
    }
  ],
  decisionsBeforeCoding: [
    {
      question: '¿Modelo de agenda centrado en la Técnica o en la Mesa/Silla?',
      answer: 'En salones de uñas el cliente reserva por TÉCNICA (confianza y estilo artístico). El modelo de datos debe asociar el turno a la `technician_id` y validar como recurso secundario la `chair_id`.'
    },
    {
      question: '¿Base de datos Multi-Tenant: Base separada o esquema compartido con `tenant_id`?',
      answer: 'Esquema compartido con `tenant_id` y PostgreSQL Row Level Security (RLS). Para un equipo de 1-2 personas y presupuesto limitado, mantener decenas de bases de datos individuales es insostenible operativamente.'
    },
    {
      question: '¿Comisión sobre bruto del servicio o sobre neto tras descontar costo de insumos?',
      answer: 'El estándar de la industria es 50% sobre el servicio base bruto. Sin embargo, para nail art complejo o cristalería cara, se debe permitir configurar "Deducción de insumo premium" antes del split de comisión.'
    },
    {
      question: '¿PWA móvil o App Nativa en iOS/Android?',
      answer: 'PWA Web Responsiva para el MVP. Las clientas NO descargan una app pesada de 80MB de la App Store solo para agendar uñas una vez al mes. El flujo debe ser 100% web vía link en Instagram/WhatsApp.'
    }
  ]
};
