import React, { useState } from 'react';
import { ShoppingCart, Truck, Globe, Star, ArrowRight, Eye } from 'lucide-react';
import Badge from './Badge.jsx';

const formatPrice = (price) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);

const ShippingTag = ({ type, text }) => {
  return (
    <div className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest animate-pulse-glow">
      <Truck className="w-3.5 h-3.5" />
      Envío Gratis - Chile
    </div>
  );
};

export default function ProductCard({ product, onAddToCart, dark = false }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <div className="group relative w-full h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden flex flex-col hover:border-amber-400/40 hover:bg-white/8 transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10">

      {/* ── Imagen ── */}
      <a href={`/producto/${product.id}`} className="relative block h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700 flex-shrink-0">
        {/* Badge descuento */}
        {discount && (
          <div className="absolute top-4 left-4 z-10 bg-gradient-to-br from-red-500 to-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-lg">
            -{discount}%
          </div>
        )}
        {product.shipping && (
          <div className="absolute bottom-3 left-3 z-20 bg-amber-400 text-slate-900 rounded-lg px-2.5 py-1.5 shadow-xl flex items-center gap-1.5 font-black text-[10px] uppercase tracking-tighter animate-bounce-in">
            <Truck className="w-3 h-3" />ENVÍO GRATIS
          </div>
        )}

        {/* Overlay hover con botón "Ver" */}
        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
          <span className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white text-sm font-bold px-5 py-2.5 rounded-full">
            <Eye className="w-4 h-4" />
            Ver producto
          </span>
        </div>

        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            width="400"
            height="400"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">{product.imageText}</div>
        )}
      </a>

      {/* ── Contenido ── */}
      <div className="p-6 flex flex-col flex-1 gap-4">

        {/* Envío */}
        {product.shipping && <ShippingTag type={product.shipping.type} text={product.shipping.text} />}

        {/* Título */}
        <a href={`/producto/${product.id}`}>
          <h3 className="text-lg font-bold text-white leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors duration-200">
            {product.title}
          </h3>
        </a>

        <div className="flex items-center gap-1.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          ))}
          <span className="text-slate-400 text-xs ml-1">({product.stats?.rating || '4.9'})</span>
        </div>

        {/* Precio */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-2xl font-black bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-slate-500 line-through font-medium">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={handleAdd}
          className={`
            relative group/btn w-full flex items-center justify-center gap-2 py-3.5 px-4
            rounded-2xl font-bold text-sm transition-all duration-300 overflow-hidden
            ${added
              ? 'bg-green-500 text-white shadow-green-500/30 shadow-lg'
              : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 shadow-amber-500/20 shadow-lg hover:shadow-amber-500/40 active:scale-95 hover:scale-[1.02]'
            }
          `}
        >
          {/* Shimmer sweep */}
          <span className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 skew-x-12 pointer-events-none" />
          {added ? (
            <>✓ ¡Agregado!</>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Agregar al carrito
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
