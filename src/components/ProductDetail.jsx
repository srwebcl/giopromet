import React, { useState } from 'react';
import {
  ShoppingCart as ShoppingCartIcon, Truck as TruckIcon, Globe as GlobeIcon, 
  ArrowRight as ArrowRightIcon, Plus as PlusIcon, Minus as MinusIcon,
  Check as CheckIcon, Star as StarIcon, Shield as ShieldIcon, 
  RotateCcw as RotateCcwIcon, Zap as ZapIcon, Heart as HeartIcon, 
  Share2 as Share2Icon, ThumbsUp as ThumbsUpIcon
} from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import ProductCard from './ui/ProductCard.jsx';

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

const ShippingTag = () => {
  return (
    <div className="inline-flex items-center gap-2 bg-amber-400/10 border-amber-400/20 text-amber-400 border text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest animate-pulse-glow">
      <TruckIcon className="w-3.5 h-3.5" />
      Envío Gratis a todo Chile
    </div>
  );
};

export default function ProductDetail({ product, relatedProducts = [] }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(product.image);

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
    <div className="min-h-screen bg-[#080c14] text-slate-300 pt-20 pb-16 relative overflow-hidden">
      {/* ── BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-center lg:justify-start gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500 opacity-60">
          <a href="/">Inicio</a>
          <span>/</span>
          <a href="/catalogo">Catálogo</a>
          <span>/</span>
          <span className="text-slate-400 truncate max-w-[100px]">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* ════ GALERÍA (Sin Miniaturas por petición) ════ */}
          <div className="lg:col-span-7">
            <div className="relative group rounded-[3rem] overflow-hidden bg-slate-900/60 border border-white/5 shadow-2xl aspect-square flex items-center justify-center p-6 lg:p-12 transition-all duration-500">
              {activeImage ? (
                <img src={activeImage} alt={product.title} className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="italic text-slate-600">Sin imagen</div>
              )}
              
              {discountPercent > 0 && (
                <div className="absolute top-6 left-6 bg-red-600 text-white text-[11px] font-black px-4 py-2 rounded-2xl shadow-xl">
                  -{discountPercent}% OFF
                </div>
              )}
              <div className="absolute top-6 right-6 flex flex-col gap-3">
                <button className="w-11 h-11 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-amber-400 hover:text-slate-900 transition-all"><HeartIcon className="w-5 h-5" /></button>
                <button className="w-11 h-11 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-amber-400 hover:text-slate-900 transition-all"><Share2Icon className="w-5 h-5" /></button>
              </div>
            </div>
          </div>

          {/* ════ INFO & COMPRA (Tarjeta Compacta) ════ */}
          <div className="lg:col-span-5 h-fit">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 lg:p-10 shadow-2xl flex flex-col text-center lg:text-left">
              
              <div className="flex justify-center lg:justify-start mb-4">
                <div className="inline-flex items-center gap-1.5 bg-amber-400/10 text-amber-300 text-[9px] font-black px-3 py-1 rounded-full border border-amber-400/10 uppercase tracking-widest">
                  <ZapIcon className="w-3 h-3 fill-current" />
                  {product.subtitle || 'Gadget Premium'}
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 tracking-tight">
                {product.title}
              </h1>

              <div className="flex flex-col lg:flex-row items-center gap-3 mb-6">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-3.5 h-3.5 fill-current" />)}
                  <span className="ml-1 text-xs font-black text-white">4.9 / 5.0</span>
                </div>
                <ShippingTag />
              </div>

              <div className="flex flex-col items-center lg:items-start gap-1 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-4xl lg:text-5xl font-black text-white">{formatPrice(product.price)}</span>
                  {product.oldPrice && (
                    <span className="text-slate-500 text-lg line-through font-bold opacity-50">{formatPrice(product.oldPrice)}</span>
                  )}
                </div>
                {product.oldPrice && (
                  <span className="text-green-400 text-[10px] font-black uppercase tracking-wider">Ahorras {formatPrice(discountAmount)}</span>
                )}
              </div>

              {product.description && (
                <div 
                  className="text-slate-400 text-sm leading-relaxed mb-8 prose prose-invert prose-sm max-w-none text-center lg:text-left [&_p]:mb-0 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}

              {/* Contenedor de Compra Sin márgenes innecesarios */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-4 flex items-center bg-slate-900 border border-white/10 rounded-2xl p-1">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-full h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-slate-400 transition-all"><MinusIcon className="w-4 h-4" /></button>
                    <span className="w-8 text-center font-black text-white">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-full h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-slate-400 transition-all"><PlusIcon className="w-4 h-4" /></button>
                  </div>
                  
                  <button
                    onClick={handleAddToCart}
                    className={`col-span-8 h-12 lg:h-14 flex items-center justify-center gap-2 rounded-2xl text-xs lg:text-sm font-black tracking-wide transition-all shadow-xl active:scale-95 ${isAdded ? 'bg-green-600' : 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 shadow-amber-500/20'}`}
                  >
                    {isAdded ? <CheckIcon className="w-5 h-5" /> : <ShoppingCartIcon className="w-5 h-5" />}
                    {isAdded ? 'AÑADIDO' : 'AÑADIR AL CARRITO'}
                  </button>
                </div>
              </div>

              {/* Grid de confianza ajustado (Sin espacio gigante) */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: <ShieldIcon className="w-3.5 h-3.5 text-green-500" />, label: 'Pago Seguro' },
                  { icon: <TruckIcon className="w-3.5 h-3.5 text-amber-400" />, label: 'Envío Rápido' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-center gap-2 bg-white/5 border border-white/5 py-3 rounded-2xl text-[9px] font-black uppercase text-slate-400">
                    {item.icon} {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ════ DESCRIPCIÓN ════ */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Descripción detallada</h2>
            <div className="w-10 h-1 bg-amber-400 mx-auto mt-2 rounded-full" />
          </div>
          
          <div className="bg-[#0b0f16] border border-white/5 rounded-[3rem] p-6 lg:p-16 shadow-inner mb-12 relative overflow-hidden">
             <div 
              className="relative z-10 prose prose-invert prose-sm lg:prose-base max-w-none text-slate-400 leading-relaxed font-medium 
                [&_p]:mb-6 [&_strong]:text-white [&_strong]:font-black [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2 [&_h2]:text-white [&_h2]:text-2xl [&_h2]:font-black [&_h2]:mb-6 [&_h2]:mt-10"
              dangerouslySetInnerHTML={{ __html: product.fullDescription }}
            />

            <div className="mt-16 pt-12 border-t border-white/10 text-center">
              <div className="flex flex-col items-center gap-6">
                <div className="w-16 h-16 bg-amber-400/10 rounded-3xl flex items-center justify-center "><ThumbsUpIcon className="w-8 h-8 text-amber-400" /></div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white uppercase">¿Ya te decidiste?</h3>
                  <p className="text-slate-500 text-sm max-w-xs mx-auto">Calidad premium con garantía oficial. ¡No esperes más!</p>
                </div>
                
                <div className="w-full max-w-sm flex flex-col gap-4">
                  <span className="text-3xl font-black text-white">{formatPrice(product.price)}</span>
                  <button
                    onClick={handleAddToCart}
                    className={`w-full h-16 flex items-center justify-center gap-3 rounded-2xl text-lg font-black tracking-wide transition-all shadow-2xl ${isAdded ? 'bg-green-600 text-white' : 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 shadow-amber-500/30'}`}
                  >
                    {isAdded ? <CheckIcon className="w-6 h-6" /> : <ShoppingCartIcon className="w-6 h-6" />}
                    {isAdded ? '¡LO QUIERO!' : '¡LO QUIERO AHORA!'}
                  </button>
                  <p className="text-[10px] text-slate-500 uppercase font-black flex items-center justify-center gap-2 mt-2"><ShieldIcon className="w-3 h-3 text-green-500" /> Compra 100% Protegida</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════ RELACIONADOS ════ */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-white/5 text-center">
            <h2 className="text-2xl font-black text-white mb-10 uppercase tracking-tight">Vistos recientemente</h2>
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
