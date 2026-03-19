import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

export default function CartSummary({ editable = true, minimal = false }) {
  const { cartItems, cartTotal, removeItem, updateQuantity } = useCart();

  const containerClass = minimal
    ? "bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl"
    : "bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 h-fit sticky top-28 shadow-2xl overflow-hidden";

  if (cartItems.length === 0) {
    return (
      <div className={containerClass}>
        <div className="text-center py-10 text-slate-500">
           <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-20" />
           <p className="text-sm font-bold uppercase tracking-widest">Carrito Vacío</p>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      {/* Decorative reflection */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

      <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-amber-400/10 rounded-lg flex items-center justify-center border border-amber-400/20">
           <ShoppingBag className="w-4 h-4 text-amber-400" />
        </div>
        Resumen
      </h3>

      <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
        {cartItems.map(item => (
          <div key={item.id} className="flex gap-4 group">
            <div className="w-16 h-16 bg-slate-900 rounded-xl overflow-hidden border border-white/5 flex-shrink-0 flex items-center justify-center group-hover:border-amber-400/30 transition-colors">
              {item.image ? (
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="text-[10px] text-slate-600 italic px-2 text-center">{item.title}</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-white text-sm leading-tight mb-1 line-clamp-2 group-hover:text-amber-400 transition-colors">
                {item.title}
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-amber-400 text-sm font-black">{formatPrice(item.price)} <span className="text-slate-500 text-[10px] font-bold">x{item.quantity}</span></span>
              </div>

              {editable && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center bg-slate-900 border border-white/5 rounded-lg p-0.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-white/5 rounded text-slate-500 hover:text-white transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-black text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-white/5 rounded text-slate-500 hover:text-white transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-slate-600 hover:text-red-500 p-1 ml-auto transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-6 border-t border-white/10">
        <div className="flex justify-between items-center text-slate-400">
          <span className="text-xs font-black uppercase tracking-widest">Subtotal</span>
          <span className="text-base font-bold text-white">{formatPrice(cartTotal)}</span>
        </div>
        <div className="flex justify-between items-center text-slate-400">
          <span className="text-xs font-black uppercase tracking-widest">Envío</span>
          <div className="flex items-center gap-2 text-green-400">
             <Truck className="w-4 h-4" />
             <span className="text-xs font-black">GRATIS</span>
          </div>
        </div>

        <div className="bg-amber-400/5 border border-amber-400/20 rounded-2xl p-5 mt-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-400/10 rounded-full blur-xl translate-x-8 -translate-y-8" />
          <div className="flex justify-between items-end mb-2 relative z-10">
            <span className="text-xs font-black text-amber-400 uppercase tracking-[0.2em]">Total</span>
            <span className="text-3xl font-black text-white leading-none">
              {formatPrice(cartTotal)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-tight relative z-10">
             <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Transacción certificada SSL
          </div>
        </div>
      </div>
    </div>
  );
}
