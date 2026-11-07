import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ExternalLink, 
  Layers, 
  ShieldAlert, 
  SlidersHorizontal, 
  ArrowRight,
  GitBranch,
  Sparkles,
  Zap,
  Clock,
  DollarSign,
  HeartHandshake
} from 'lucide-react';
import { ASSUMPTIONS, GITHUB_REPOSITORIES, SCOPE_FEATURES, TECHNICAL_ARCHITECTURE } from '../data/blueprintData';
import { SystemTab } from '../types';

interface StrategicBlueprintProps {
  onNavigateToTab: (tab: SystemTab) => void;
}

export const StrategicBlueprint: React.FC<StrategicBlueprintProps> = ({ onNavigateToTab }) => {
  const [activeSection, setActiveSection] = useState<'scope' | 'repos' | 'stack' | 'risks'>('scope');
  const [phaseFilter, setPhaseFilter] = useState<string>('all');
  const [repoCategoryFilter, setRepoCategoryFilter] = useState<string>('all');

  const filteredFeatures = SCOPE_FEATURES.filter(f => {
    if (phaseFilter === 'all') return true;
    return f.phase === phaseFilter;
  });

  const filteredRepos = GITHUB_REPOSITORIES.filter(r => {
    if (repoCategoryFilter === 'all') return true;
    return r.category === repoCategoryFilter;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Executive Summary */}
      <section className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              <span>Arquitectura & Consultoría de Producto</span>
              <span aria-hidden="true">·</span>
              <span>Beauty Tech & Nail Spa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
              Blueprint Estratégico: NailSpa OS & Roadmap MVP
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Plan maestro de ingeniería y producto diseñado para maximizar la <strong>experiencia del cliente</strong> (reserva en 3 clics, cero esperas, historial de uñas) y la <strong>productividad interna</strong> (desinfección sincronizada, fin a disputas de comisiones y automatización de WhatsApp).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateToTab('agenda')}
              className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            >
              <span>Probar MVP en Vivo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Explicit Assumptions Card */}
        <div className="mt-6 pt-6 border-t border-neutral-100">
          <h2 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-3">
            Supuestos de Partida (Ajustables según tu modelo)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/60">
              <span className="font-semibold text-neutral-900 block mb-1">Capacidad & Equipo</span>
              <p className="text-neutral-600">{ASSUMPTIONS.businessSize}</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/60">
              <span className="font-semibold text-neutral-900 block mb-1">Volumen & Ticket</span>
              <p className="text-neutral-600">{ASSUMPTIONS.volume}</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/60">
              <span className="font-semibold text-neutral-900 block mb-1">Presupuesto Técnico</span>
              <p className="text-neutral-600">{ASSUMPTIONS.teamBudget}</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/60">
              <span className="font-semibold text-neutral-900 block mb-1">Comportamiento Cliente</span>
              <p className="text-neutral-600">{ASSUMPTIONS.clientBehavior}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Navigation Controls */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveSection('scope')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeSection === 'scope'
              ? 'bg-neutral-900 text-white'
              : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>1. Alcance: MVP vs SaaS Completo</span>
        </button>

        <button
          onClick={() => setActiveSection('repos')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeSection === 'repos'
              ? 'bg-neutral-900 text-white'
              : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5" />
          <span>2. Repositorios GitHub Evaluados</span>
        </button>

        <button
          onClick={() => setActiveSection('stack')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeSection === 'stack'
              ? 'bg-neutral-900 text-white'
              : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>3. Recomendación Técnica & Stack</span>
        </button>

        <button
          onClick={() => setActiveSection('risks')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeSection === 'risks'
              ? 'bg-neutral-900 text-white'
              : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>4. Matriz de Riesgos & Decisiones Previas</span>
        </button>
      </div>

      {/* SECTION 1: SCOPE MVP VS SAAS */}
      {activeSection === 'scope' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-neutral-950">
                1. Alcance del Producto: Qué va en el MVP vs Versión SaaS
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                La regla de oro del spa: el MVP debe permitir agendar, atender sin retrasos, cobrar y liquidar comisiones el día 1.
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-lg">
              <button
                onClick={() => setPhaseFilter('all')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  phaseFilter === 'all' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Todas ({SCOPE_FEATURES.length})
              </button>
              <button
                onClick={() => setPhaseFilter('MVP Inmediato')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  phaseFilter === 'MVP Inmediato' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Solo MVP ({SCOPE_FEATURES.filter(f => f.phase === 'MVP Inmediato').length})
              </button>
              <button
                onClick={() => setPhaseFilter('SaaS v2 (Crecimiento)')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  phaseFilter === 'SaaS v2 (Crecimiento)' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                SaaS v2 ({SCOPE_FEATURES.filter(f => f.phase === 'SaaS v2 (Crecimiento)').length})
              </button>
              <button
                onClick={() => setPhaseFilter('SaaS v3 (Escala & Multi-Sucursal)')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  phaseFilter === 'SaaS v3 (Escala & Multi-Sucursal)' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                SaaS v3 ({SCOPE_FEATURES.filter(f => f.phase === 'SaaS v3 (Escala & Multi-Sucursal)').length})
              </button>
            </div>
          </div>

          {/* Value Cards Table */}
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 text-neutral-700 font-semibold border-b border-neutral-200 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Módulo / Funcionalidad</th>
                    <th className="py-3 px-4">Fase / Horizonte</th>
                    <th className="py-3 px-4">Valor para el Cliente Final</th>
                    <th className="py-3 px-4">Valor Operativo / Negocio</th>
                    <th className="py-3 px-4 text-center">Complejidad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredFeatures.map((feat) => (
                    <tr key={feat.id} className="hover:bg-neutral-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-neutral-900 block text-xs sm:text-sm">
                          {feat.name}
                        </span>
                        <span className="text-[11px] text-neutral-500 mt-0.5 block">
                          Categoría: {feat.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${
                          feat.phase === 'MVP Inmediato' 
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : feat.phase === 'SaaS v2 (Crecimiento)'
                            ? 'bg-blue-50 text-blue-800 border border-blue-200'
                            : 'bg-purple-50 text-purple-800 border border-purple-200'
                        }`}>
                          {feat.phase}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-neutral-600 max-w-xs leading-relaxed">
                        <div className="flex items-start gap-1.5">
                          <HeartHandshake className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                          <span>{feat.customerValue}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-neutral-600 max-w-xs leading-relaxed">
                        <div className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat.businessValue}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span className="text-neutral-700 font-medium">{feat.complexity}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategic Rationale Callout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-neutral-200 rounded-xl space-y-2">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-neutral-700" />
                <span>Por qué el MVP DEBE incluir tiempos de desinfección</span>
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                El error #1 de los software genéricos para salones es agendar citas espalda con espalda (ej. 10:00 a 11:30 y 11:30 a 13:00). En un spa de uñas, la manicurista necesita 10 a 15 minutos obligatorios para cambiar toallas, sumergir fresas/brocas en desinfectante hospitalario o autoclave, y limpiar el polvo de poligel. Si el software no calcula este colchón (buffer), el salón acumula retrasos de 45 minutos a media tarde.
              </p>
            </div>

            <div className="p-4 bg-white border border-neutral-200 rounded-xl space-y-2">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-neutral-700" />
                <span>Por qué el MVP DEBE liquidar comisiones</span>
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                El mayor punto de fricción interna en un spa de uñas no son los clientes, sino la rotación y desconfianza de las manicuristas al calcular el split del 50/50 manual en libretas. Automatizar el cálculo por servicio, restar el costo de cristalería y asignar el 100% de la propina en el checkout del MVP reduce la rotación del personal a menos de la mitad.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: GITHUB REPOSITORIES EVALUATION */}
      {activeSection === 'repos' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-neutral-950">
                2. Evaluación de Repositorios Open Source en GitHub
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Proyectos reales, activos y filtrados por viabilidad de licencia comercial (MIT / Apache / AGPL).
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-lg">
              <button
                onClick={() => setRepoCategoryFilter('all')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  repoCategoryFilter === 'all' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Todos ({GITHUB_REPOSITORIES.length})
              </button>
              <button
                onClick={() => setRepoCategoryFilter('Reservas & Agenda')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  repoCategoryFilter === 'Reservas & Agenda' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Agenda
              </button>
              <button
                onClick={() => setRepoCategoryFilter('E-Commerce / POS')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  repoCategoryFilter === 'E-Commerce / POS' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                POS / Commerce
              </button>
              <button
                onClick={() => setRepoCategoryFilter('Framework Admin / CRM')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  repoCategoryFilter === 'Framework Admin / CRM' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Admin Panel
              </button>
              <button
                onClick={() => setRepoCategoryFilter('Notificaciones & WhatsApp')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  repoCategoryFilter === 'Notificaciones & WhatsApp' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                WhatsApp / Notif
              </button>
            </div>
          </div>

          {/* Criteria Explanation Banner */}
          <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl text-xs space-y-1.5 text-amber-950">
            <span className="font-bold flex items-center gap-1.5 text-amber-900">
              <SlidersHorizontal className="w-4 h-4" />
              Criterios de Selección y Descarte Utilizados:
            </span>
            <p className="leading-relaxed">
              <strong>1. Licencia Comercial:</strong> Se priorizan <strong>MIT y Apache 2.0</strong> para el núcleo propietario del SaaS. Los repositorios con <strong>AGPLv3</strong> (como Cal.com y Twenty) se recomiendan estrictamente como <em>Referencia de Arquitectura y Esquema de Datos</em> o como microservicios aislados vía API, para evitar la obligación legal de publicar tu código comercial en GitHub.
              <br />
              <strong>2. Actividad y Mantenimiento:</strong> Descartados repositorios abandonados con más de 9 meses sin commits o con dependencias obsoletas de React 16/17 o Webpack.
              <br />
              <strong>3. Stack Homogéneo:</strong> 100% TypeScript (React / Node / PostgreSQL), eliminando proyectos en PHP (como Easy!Appointments clásico) o Python monolítico que fragmenten el equipo.
            </p>
          </div>

          {/* Repos Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRepos.map((repo) => (
              <div 
                key={repo.id}
                className="bg-white border border-neutral-200 rounded-xl p-5 flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div>
                  {/* Repo Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-neutral-900 text-sm sm:text-base">
                          {repo.name}
                        </h3>
                        <a
                          href={repo.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-400 hover:text-neutral-800 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
                        <span>{repo.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono">{repo.stars} stars</span>
                        <span aria-hidden="true">·</span>
                        <span>{repo.maintenanceStatus}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                        repo.licenseCommercialViability.startsWith('Alta')
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {repo.license}
                      </span>
                    </div>
                  </div>

                  {/* Recommendation Badge */}
                  <div className="mt-3 p-2 bg-neutral-50 rounded-lg border border-neutral-200/60 text-xs">
                    <span className="font-semibold text-neutral-900">Uso Recomendado: </span>
                    <span className="font-medium text-neutral-800">{repo.recommendationType}</span>
                    <p className="text-neutral-600 mt-1 leading-relaxed">{repo.verdictSummary}</p>
                  </div>

                  {/* Tech stack tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {repo.techStack.map(tech => (
                      <span key={tech} className="px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded text-[11px] font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* How to leverage */}
                  <div className="mt-4 space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-neutral-900 block">¿Qué parte aprovechar?</span>
                      <p className="text-neutral-600 mt-0.5">{repo.reusableModule}</p>
                    </div>

                    <div>
                      <span className="font-semibold text-neutral-900 block">Estrategia de Integración:</span>
                      <p className="text-neutral-600 mt-0.5 italic">{repo.howToLeverage}</p>
                    </div>
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="pt-3 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-semibold text-emerald-800 block mb-1">Ventajas Clave:</span>
                    <ul className="space-y-1 text-neutral-600 list-disc list-inside">
                      {repo.pros.map((p, idx) => (
                        <li key={idx} className="leading-tight">{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-semibold text-rose-800 block mb-1">Limitaciones / Riesgos:</span>
                    <ul className="space-y-1 text-neutral-600 list-disc list-inside">
                      {repo.cons.map((c, idx) => (
                        <li key={idx} className="leading-tight">{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: TECHNICAL ARCHITECTURE & STACK */}
      {activeSection === 'stack' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-neutral-950">
              3. Recomendación Técnica: Empezar Rápido y Escalar sin Reescribir
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Stack pragmático en TypeScript puro de punta a punta, optimizado para un equipo de 1-2 personas y presupuesto bootstrap.
            </p>
          </div>

          {/* Architecture Visual Flow */}
          <div className="bg-neutral-900 text-white p-6 rounded-xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Topología del Sistema (Cero Deuda Técnica)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center text-xs">
              <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                <span className="font-bold text-neutral-200 block">1. Canal Cliente</span>
                <span className="text-neutral-400 mt-1 block">WhatsApp Bot + Web Móvil (Next.js)</span>
              </div>
              <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                <span className="font-bold text-neutral-200 block">2. API Gateway</span>
                <span className="text-neutral-400 mt-1 block">Next.js Server Actions / Fastify</span>
              </div>
              <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                <span className="font-bold text-neutral-200 block">3. Motor de Citas & POS</span>
                <span className="text-neutral-400 mt-1 block">Drizzle ORM + Transacciones ACID</span>
              </div>
              <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                <span className="font-bold text-neutral-200 block">4. Almacenamiento</span>
                <span className="text-neutral-400 mt-1 block">PostgreSQL (RLS Multi-Tenant)</span>
              </div>
              <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                <span className="font-bold text-neutral-200 block">5. Notificaciones</span>
                <span className="text-neutral-400 mt-1 block">Novu + WhatsApp Cloud API</span>
              </div>
            </div>
          </div>

          {/* Stack Breakdown Table */}
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 text-neutral-700 font-semibold border-b border-neutral-200 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Capa del Sistema</th>
                    <th className="py-3 px-4">Tecnología Recomendada</th>
                    <th className="py-3 px-4">Justificación de Decisión & Escalabilidad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {TECHNICAL_ARCHITECTURE.recommendedStack.map((item, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-neutral-900 whitespace-nowrap">
                        {item.layer}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-neutral-800 text-[11px] whitespace-nowrap">
                        {item.tech}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-600 leading-relaxed">
                        {item.rationale}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: RISKS & PRE-CODING DECISIONS */}
      {activeSection === 'risks' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-neutral-950">
              4. Matriz de Riesgos Principales & Decisiones Clave Antes de Codificar
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Decisiones arquitectónicas no reversibles que deben definirse antes de escribir la primera línea de código.
            </p>
          </div>

          {/* Pre-coding Decisions Accordion/Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TECHNICAL_ARCHITECTURE.decisionsBeforeCoding.map((dec, idx) => (
              <div key={idx} className="p-4 bg-white border border-neutral-200 rounded-xl space-y-2 shadow-xs">
                <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
                  Decisión Crítica #{idx + 1}
                </span>
                <h3 className="font-semibold text-neutral-900 text-sm">
                  {dec.question}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed bg-neutral-50 p-2.5 rounded-lg border border-neutral-200/60">
                  <strong>Recomendación:</strong> {dec.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Risks Table */}
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs mt-6">
            <div className="p-4 bg-neutral-50 border-b border-neutral-200">
              <h3 className="font-bold text-neutral-900 text-xs uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Riesgos de Negocio & Protocolos de Mitigación Técnica</span>
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white text-neutral-600 font-semibold border-b border-neutral-200 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Riesgo Detectado</th>
                    <th className="py-3 px-4">Impacto</th>
                    <th className="py-3 px-4">Probabilidad</th>
                    <th className="py-3 px-4">Estrategia de Mitigación en el Código</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {TECHNICAL_ARCHITECTURE.risksAndMitigations.map((item, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-neutral-900">
                        {item.risk}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-rose-700 font-medium">{item.impact}</span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-neutral-600">
                        {item.probability}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-600 leading-relaxed">
                        {item.mitigation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
