import React, { useState } from 'react';
import { Package, AlertCircle, Plus, CheckCircle2, TrendingUp } from 'lucide-react';
import { INITIAL_INVENTORY } from '../data/salonMockData';

export const InventoryTracker: React.FC = () => {
  const [items, setItems] = useState(INITIAL_INVENTORY);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const handleRestock = (id: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, stock: item.stock + 5 };
      }
      return item;
    }));
  };

  const filteredItems = items.filter(i => {
    if (filterCategory === 'all') return true;
    return i.category === filterCategory;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            <span>Insumos Críticos & Reventa</span>
            <span aria-hidden="true">·</span>
            <span>Control de Mermas</span>
          </div>
          <h2 className="text-xl font-bold text-neutral-950 mt-1">
            Inventario Básico de Esmaltes, Geles y Retail
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Monitoreo de stock de seguridad para evitar faltantes de insumos de cabina y control de productos de reventa.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            filterCategory === 'all'
              ? 'bg-neutral-900 text-white'
              : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
          }`}
        >
          Todos los Artículos ({items.length})
        </button>
        <button
          onClick={() => setFilterCategory('Insumo de Cabina')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            filterCategory === 'Insumo de Cabina'
              ? 'bg-neutral-900 text-white'
              : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
          }`}
        >
          Insumos de Cabina (Bases / Geles)
        </button>
        <button
          onClick={() => setFilterCategory('Reventa Retail')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            filterCategory === 'Reventa Retail'
              ? 'bg-neutral-900 text-white'
              : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
          }`}
        >
          Productos Reventa (Aceites / Cremas)
        </button>
        <button
          onClick={() => setFilterCategory('Herramientas')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            filterCategory === 'Herramientas'
              ? 'bg-neutral-900 text-white'
              : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
          }`}
        >
          Herramientas / Fresas
        </button>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-700 font-semibold border-b border-neutral-200 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-5">Producto / Insumo</th>
                <th className="py-3 px-5">Categoría</th>
                <th className="py-3 px-5">Stock Actual</th>
                <th className="py-3 px-5">Stock Mínimo</th>
                <th className="py-3 px-5">Costo Unitario</th>
                <th className="py-3 px-5">Precio Venta (Retail)</th>
                <th className="py-3 px-5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredItems.map((item) => {
                const isLowStock = item.stock <= item.minStock;

                return (
                  <tr key={item.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-neutral-900">
                      <span>{item.name}</span>
                      <span className="text-[11px] text-neutral-500 block font-normal">{item.unit}</span>
                    </td>
                    <td className="py-3.5 px-5 text-neutral-600">
                      {item.category}
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className={`font-bold ${isLowStock ? 'text-rose-600' : 'text-neutral-900'}`}>
                          {item.stock}
                        </span>
                        {isLowStock && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            Reordenar
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 font-mono text-neutral-500">
                      {item.minStock} unidades
                    </td>
                    <td className="py-3.5 px-5 font-mono text-neutral-700">
                      ${item.unitCost.toFixed(2)} USD
                    </td>
                    <td className="py-3.5 px-5 font-mono font-medium text-neutral-900">
                      {item.salePrice ? `$${item.salePrice.toFixed(2)} USD` : '— (Uso Interno)'}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => handleRestock(item.id)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded transition-colors"
                      >
                        +5 Restock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
