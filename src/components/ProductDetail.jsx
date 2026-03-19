import React, { useState } from 'react';
import {
  ShoppingCart, Truck, Globe, ArrowRight, Plus, Minus,
  Check, Star, Shield, RotateCcw, Zap, ChevronLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import ProductCard from './ui/ProductCard.jsx';
import { allProducts } from '../data/products.js';

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

const ShippingTag = ({ type, text }) => {
  if (type === 'fast') {
    return (
      <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold px-4 py-2 rounded-xl">
        <Truck className="w-4 h-4" />
        {text}
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold px-4 py-2 rounded-xl">
      <Globe className="w-4 h-4" />
      {text}
    </div>
  );
};

export default function ProductDetail({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Obtener productos relacionados (misma categoría, excluyendo el actual)
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const discountAmount = product.oldPrice ? product.oldPrice - product.price : 0;
  const discountPercent = product.oldPrice ? Math.round((discountAmount / product.oldPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-300 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Breadcrumb ── */}
        <nav className="mb-10 flex items-center gap-2 text-sm">
          <a href="/" className="text-slate-500 hover:text-white transition-colors">Inicio</a>
          <span className="text-slate-700">/</span>
          <a href="/catalogo" className="text-slate-500 hover:text-white transition-colors">Catálogo</a>
          <span className="text-slate-700">/</span>
          <span className="text-amber-400 font-bold">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">

          {/* ════ COLUMNA IZQUIERDA: IMAGEN ════ */}
          <div className="relative">
            {/* Decoración de fondo */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="sticky top-32">
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl group">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-auto object-cover aspect-square transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full aspect-square flex items-center justify-center bg-slate-800 text-slate-500 italic">
                    {product.imageText || 'Sin imagen'}
                  </div>
                )}

                {/* Badge descuento flotante */}
                {discountPercent > 0 && (
                  <div className="absolute top-6 right-6 bg-red-600 text-white font-black px-4 py-2 rounded-2xl shadow-xl animate-pulse-ring">
                    -{discountPercent}%
                  </div>
                )}
              </div>

              {/* Trust markers bajo imagen */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { icon: <Shield className="w-5 h-5" />, text: 'Garantía oficial' },
                  { icon: <RotateCcw className="w-5 h-5" />, text: 'Devolución fácil' },
                  { icon: <Check className="w-5 h-5" />, text: 'Stock verificado' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 text-center p-4 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-amber-400">{item.icon}</span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ════ COLUMNA DERECHA: INFO ════ */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-300 text-xs font-black px-4 py-1.5 rounded-full border border-amber-400/20 mb-4 uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5 fill-current" />
                {product.subtitle || 'Gadget Premium'}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none mb-6">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-slate-500 text-sm font-bold underline decoration-slate-700 underline-offset-4">
                  4.9 (128 reseñas verificadas)
                </span>
              </div>

              {/* Precios */}
              <div className="flex items-end gap-5 mb-8">
                <div className="flex flex-col">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Precio actual</span>
                  <span className="text-5xl sm:text-6xl font-black text-white leading-none">
                    {formatPrice(product.price)}
                  </span>
                </div>
                {product.oldPrice && (
                  <div className="pb-1">
                    <span className="text-slate-500 text-xl line-through font-bold">
                      {formatPrice(product.oldPrice)}
                    </span>
                    <div className="bg-green-500/15 text-green-400 text-[10px] font-black px-2 py-0.5 rounded-md mt-1 border border-green-500/20">
                      AHORRAS {formatPrice(discountAmount)}
                    </div>
                  </div>
                )}
              </div>

              {/* Envío rápido */}
              <div className="mb-10">
                <ShippingTag type={product.shipping.type} text={product.shipping.text} />
              </div>

              {/* Descripción */}
              <div className="relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-400 to-transparent opacity-30 rounded-full" />
                <p className="pl-6 text-slate-400 text-lg leading-relaxed italic">
                  {product.fullDescription || product.description}
                </p>
              </div>
            </div>

            {/* Selector de cantidad y compra */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 lg:p-10 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-end gap-8">
                {/* Cantidad */}
                <div className="flex-shrink-0">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
                    Cantidad a comprar
                  </label>
                  <div className="flex items-center bg-slate-900 border border-white/10 rounded-2xl p-1 w-fit group focus-within:border-amber-400/50 transition-all">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-14 text-center font-black text-xl text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Botón */}
                <div className="flex-1">
                  <button
                    onClick={handleAddToCart}
                    className={`
                      relative group w-full h-16 flex items-center justify-center gap-3 rounded-2xl
                      text-lg font-black tracking-wide transition-all duration-300 overflow-hidden
                      ${isAdded
                        ? 'bg-green-600 text-white shadow-green-500/30 shadow-2xl'
                        : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 shadow-amber-500/30 shadow-2xl hover:scale-[1.02] active:scale-[0.98]'
                      }
                    `}
                  >
                    {/* Shimmer sweep */}
                    {!isAdded && <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />}

                    {isAdded ? (
                      <>
                        <Check className="w-6 h-6 animate-bounce" />
                        ¡Agregado al Carrito!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-6 h-6" />
                        AGREGAR AL CARRITO
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Trust Badge compra segura */}
              <div className="mt-8 flex items-center justify-center gap-6 py-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase">
                  <Shield className="w-4 h-4 text-green-500" /> Compra Segura
                </div>
                <div className="w-px h-4 bg-white/5" />
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase">
                  <Zap className="w-4 h-4 text-amber-400" /> Procesamiento 24h
                </div>
              </div>
            </div>

            {/* Características en grid */}
            {product.features && product.features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white/5 border border-white/5 p-4 rounded-2xl">
                    <div className="w-6 h-6 rounded-full bg-amber-400/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <span className="text-slate-400 text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ════ PRODUCTOS RELACIONADOS ════ */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-white/10 pt-20">
            <div className="flex flex-col sm:flex-row justify-between items-end gap-6 mb-12 text-center sm:text-left">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
                  Productos Relacionados
                </h2>
                <p className="text-slate-500">También te podría interesar esta selección.</p>
              </div>
              <a href="/catalogo" className="text-amber-400 font-bold hover:underline flex items-center gap-2">
                Ver todo el catálogo <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(rp => (
                <ProductCard key={rp.id} product={rp} onAddToCart={addToCart} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
