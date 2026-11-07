import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullMarkdownDoc = `# Especificación de Arquitectura & Blueprint de Producto: NailSpa OS (SaaS)

## 0. Resumen Ejecutivo & Supuestos de Partida
- **Tipo de Negocio:** Salón boutique o spa de uñas de 3 a 8 manicuristas con 4 a 6 mesas/sillones.
- **Volumen Estimado:** 40 a 120 citas semanales con un ticket promedio de $28 a $55 USD.
- **Objetivos Clave:** 
  1. Mejorar la experiencia del cliente (reserva web/WhatsApp en 3 clics, cero retrasos, ficha con historial de alergias y colores).
  2. Aumentar la productividad interna (cálculo de tiempos con buffer de autoclave, liquidación de comisiones sin disputas, alertas de inventario).
- **Equipo Técnico:** Lean (1 a 2 desarrolladores full-stack). Presupuesto de infraestructura: < $60 USD/mes.

---

## 1. Alcance del Producto: MVP vs Versión SaaS Completa

### A. Módulos Esenciales del MVP (Lanzamiento Inmediato)
1. **Agenda Multi-Técnica con Tiempos de Desinfección:**
   - La cita calcula automáticamente: Duración de servicio base + Duración de add-ons (nail art, retiro) + 15 min de buffer para autoclave.
   - *Valor Cliente:* Cero retrasos; la técnica atiende puntual.
   - *Valor Negocio:* Desinfección regulada y eliminación de colisiones entre clientas.

2. **Recordatorios Automatizados vía WhatsApp:**
   - Envío automático 24h y 2h previas con botones de "Confirmar Asistencia" o "Reagendar".
   - *Valor Cliente:* Confirmación en 1-click sin llamadas invasivas.
   - *Valor Negocio:* Reduce la tasa de no-show del 20% a menos del 4%, protegiendo los ingresos de las manicuristas.

3. **Catálogo de Servicios y Add-ons Acumulativos:**
   - Precios claros para base (Manicura Rusa, Acrílico, Soft Gel) y extras (Nail Art Nivel 2, Retiro previo, Cristalería).
   - *Valor Cliente:* Transparencia total de tarifas antes de sentarse en la silla.
   - *Valor Negocio:* Impide subestimar el tiempo de diseño a mano alzada.

4. **Ficha Clínica y Registro Estético:**
   - Alerta visible de alergias (especialmente HEMA / Metacrilatos), tipo de cutícula (vascularizada/delgada) y archivo fotográfico del último set.
   - *Valor Cliente:* Atención segura sin dermatitis ni cortes.
   - *Valor Negocio:* Cualquier manicurista puede suplir a otra conociendo la técnica exacta de la clienta.

5. **Módulo POS y Liquidación Automática de Comisiones:**
   - Cobro en caja con cálculo automático de comisión (50% en servicios, 10% en productos de reventa, 100% de la propina a la técnica).
   - *Valor Cliente:* Cobro ágil y desglose transparente.
   - *Valor Negocio:* Elimina horas de cálculo manual a fin de semana y previene la rotación del personal.

6. **Inventario Básico de Insumos y Reventa:**
   - Control de stock para bases rubber, geles, monómeros y stock de aceites hidratantes.
   - *Valor Negocio:* Evita perder ventas de retail (margen 50%) y faltantes de material crítico.

---

### B. Módulos para SaaS Completo (v2 / v3)
- **SaaS v2:** Depósito/Anticipo obligatorio vía Stripe/Mercado Pago con penalización por cancelación tardía.
- **SaaS v2:** Portal de autoservicio para manicuristas en smartphone (consulta de comisiones acumuladas en tiempo real).
- **SaaS v2:** Campañas automáticas de reactivación a los 21 días ("Es hora de tu retoque de acrílico").
- **SaaS v3:** Despacho algorítmico y asignación inteligente de mesas según destreza y velocidad de cada técnica.
- **SaaS v3:** Escandallo ungueal milimétrico (descuento de gramos de acrílico/poligel por set).
- **SaaS v3:** Multi-sucursal con reportes consolidados y roles de franquicia.

---

## 2. Evaluación de Repositorios Open Source en GitHub

| Repositorio | Categoría | Licencia | Stack | Veredicto & Uso Recomendado |
| :--- | :--- | :--- | :--- | :--- |
| **Cal.com** (\`calcom/cal.com\`) | Reservas & Agenda | AGPLv3 | Next.js, Prisma, PostgreSQL | **Referencia de Modelo de Datos:** Estudiar sus algoritmos de disponibilidad y buffers de tiempo. NO copiar código directo a un SaaS cerrado por copyleft AGPLv3. |
| **Medusa.js** (\`medusajs/medusa\`) | E-Commerce / POS | MIT | Node.js, Express, PostgreSQL | **Base de Arquitectura:** El mejor motor transaccional headless para carritos, clientes, órdenes y productos de reventa. Licencia MIT 100% permisiva. |
| **Refine** (\`refinedev/refine\`) | Admin Panel & CRM | MIT | React, TypeScript, Next.js | **Base de Arquitectura:** Construir el back-office del dueño y recepción en 1/4 del tiempo. Maneja tablas, filtros, RBAC y formularios sin esfuerzo. |
| **Novu** (\`novuhq/novu\`) | Notificaciones Multicanal | MIT / Apache 2.0 | NestJS, Redis, PostgreSQL | **Librería / Microservicio:** Motor desacoplado para flujos de notificación por WhatsApp, SMS y Email. Evita cron jobs vulnerables. |
| **Twenty CRM** (\`twentycrm/twenty\`) | CRM Clientes | AGPLv3 | NestJS, React, GraphQL | **Referencia:** Estudiar su diseño visual de fichas y esquema de campos dinámicos (custom fields) para las notas de cutícula y alergias. |
| **Evolution API** (\`evolution-api/evolution-api\`) | WhatsApp Gateway | Apache 2.0 | Node.js, Baileys, Fastify | **Microservicio Desacoplado:** Conectar el WhatsApp oficial del salón sin los elevados costos por mensaje de la API oficial de Meta en etapa temprana. |

---

## 3. Recomendación Técnica & Arquitectura

### Stack Sugerido
- **Frontend Web & Cliente:** Next.js 15 (App Router) + React 19 + Tailwind CSS.
- **Backend API:** Node.js (TypeScript) con Fastify o Next.js Route Handlers.
- **Base de Datos & ORM:** PostgreSQL + Drizzle ORM (tipado estricto, cero overhead de memoria, soporte ACID).
- **Autenticación & Permisos:** Supabase Auth o Clerk con 4 roles (Admin, Recepción, Técnica, Clienta).
- **Cobros:** Stripe Elements / Mercado Pago SDK + Terminales físicas.
- **Mensajería:** Novu + WhatsApp Cloud API (con fallback de Evolution API / Twilio).

### Riesgos Críticos y Mitigación
1. **Doble Reserva por Concurrencia:** Mitigado con transacciones \`SELECT ... FOR UPDATE\` en PostgreSQL con bloqueo pesimista temporal de 5 min.
2. **Alta Tasa de No-Shows:** Mitigado con recordatorios WhatsApp interactivos (24h/2h) y depósito de garantía anticipado del 25%.
3. **Bloqueo del Número de WhatsApp:** Mitigado mediante plantillas transaccionales verificadas con consentimiento explícito del cliente.
4. **Fuga de Clientes con la Técnica:** Mitigado ofreciendo un historial clínico ungueal superior, tarjeta de sellos acumulable y comisiones justas y transparentes.

---
*Generado por NailSpa OS Architecture Engine.*
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullMarkdownDoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([fullMarkdownDoc], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'NailSpa_OS_Arquitectura_SaaS_PRD.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-neutral-800" />
            <div>
              <h3 className="font-bold text-sm text-neutral-950">Especificación de Arquitectura & PRD (Markdown)</h3>
              <p className="text-xs text-neutral-500">Documento listo para pasar a tu equipo de desarrollo o repositorio GitHub.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Preview */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs bg-neutral-900 text-neutral-200 selection:bg-neutral-700 whitespace-pre-wrap leading-relaxed">
          {fullMarkdownDoc}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-white flex items-center justify-between">
          <span className="text-xs text-neutral-500">Formato: CommonMark Markdown UTF-8</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '¡Copiado al Portapapeles!' : 'Copiar Markdown'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Descargar .md</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
