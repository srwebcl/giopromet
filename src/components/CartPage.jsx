import React from 'react';
import { Minus, Plus, Trash2, ArrowLeft, ArrowRight, ShoppingCart, Zap, Shield, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

export default function CartPage() {
  const { cartItems, cartTotal, removeItem, updateQuantity } = useCart();

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-300 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-4">
              <ShoppingCart className="w-3.5 h-3.5" />
              Tu Selección
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none">
              Tu <span className="text-shimmer">Carrito</span>
            </h1>
          </div>
          <p className="text-slate-500 font-bold">
            {cartItems.length} {cartItems.length === 1 ? 'producto seleccionado' : 'productos seleccionados'}
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* ── Empty State ── */
          <div className="text-center py-24 bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/10 shadow-2xl">
            <div className="w-24 h-24 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/5">
              <ShoppingCart className="w-10 h-10 text-slate-700" />
            </div>
            <h2 className="text-3xl font-black text-white mb-3">Tu carrito está vacío</h2>
            <p className="text-slate-500 mb-10 max-w-sm mx-auto">¡No dejes que estos gadgets se escapen! Explora nuestro catálogo y encuentra tecnología increíble.</p>
            <a
              href="/catalogo"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-black py-4 px-8 rounded-2xl transition-all shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
              Ver Productos
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* ── Lista de items ── */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="group relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-5 sm:p-6 flex flex-col sm:flex-row gap-6 hover:bg-white/8 transition-all hover:border-white/20">
                  {/* Imagen */}
                  <div className="w-full sm:w-32 h-32 bg-slate-900 rounded-2xl overflow-hidden border border-white/5 flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600 italic text-xs p-2 text-center">{item.title}</div>
                    )}
                  </div>

                  {/* Contenido info */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-1 line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-amber-400">
                          {formatPrice(item.price)}
                        </span>
                        {item.oldPrice && (
                          <span className="text-sm text-slate-600 line-through font-medium">
                            {formatPrice(item.oldPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Controles cantidad */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center bg-slate-900 border border-white/10 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-all"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-black text-white text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-600 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal lateral */}
                  <div className="sm:border-l border-white/5 sm:pl-8 flex flex-col justify-center text-right">
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-600 mb-1">Subtotal</span>
                    <span className="text-2xl font-black text-white">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}

              {/* Botón seguir comprando */}
              <div className="pt-4">
                <a href="/catalogo" className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-400 font-bold transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Seguir comprando
                </a>
              </div>
            </div>

            {/* ── Resumen ── */}
            <div className="bg-white/5 backdrop-blur-md border border-amber-400/20 rounded-[2rem] p-8 lg:p-10 shadow-2xl sticky top-28">
              <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-slate-900" />
                </div>
                Resumen
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-sm font-bold uppercase tracking-wider">Subtotal</span>
                  <span className="text-lg font-bold text-white">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-sm font-bold uppercase tracking-wider">Envío</span>
                  <div className="flex items-center gap-2 text-green-400">
                    <Truck className="w-4 h-4" />
                    <span className="font-black">GRATIS</span>
                  </div>
                </div>

                <div className="h-px bg-white/10 my-6" />

                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs font-black text-amber-400 uppercase tracking-[0.2em]">Total Final</span>
                    <div className="text-4xl font-black text-white mt-1 leading-none">{formatPrice(cartTotal)}</div>
                  </div>
                  <div className="text-right text-slate-600 text-[10px] uppercase font-bold max-w-[100px] leading-tight mb-1">
                    Tasas e IVA incluidos
                  </div>
                </div>
              </div>

              {/* Checkout Action */}
              <a
                href="/checkout"
                className="group w-full h-16 flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-black rounded-2xl transition-all shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] mb-6"
              >
                IR AL PAGO SEGURO
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Trust Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-500">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-xs font-bold leading-tight uppercase tracking-widest">Protección de compra con cifrado SSL</span>
                </div>
                <div className="grid grid-cols-4 gap-2 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  {/* Mock iconos de pago */}
                  <div className="h-8 bg-white/10 rounded-lg" />
                  <div className="h-8 bg-white/10 rounded-lg" />
                  <div className="h-8 bg-white/10 rounded-lg" />
                  <div className="h-8 bg-white/10 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
