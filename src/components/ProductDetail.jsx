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

const ShippingTag = ({ type, text }) => {
  const isFast = type === 'fast';
  return (
    <div className={`inline-flex items-center gap-2 ${isFast ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'} border text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-wider`}>
      {isFast ? <TruckIcon className="w-3 h-3" /> : <GlobeIcon className="w-3 h-3" />}
      {text}
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-16">
          
          {/* ════ GALERÍA ════ */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-[2rem] overflow-hidden bg-slate-900/40 border border-white/5 shadow-xl aspect-square flex items-center justify-center p-4">
              {activeImage ? (
                <img src={activeImage} alt={product.title} className="max-w-full max-h-full object-contain" />
              ) : (
                <div className="italic text-slate-600">Sin imagen</div>
              )}
              
              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-lg">
                  -{discountPercent}%
                </div>
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="w-9 h-9 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white"><HeartIcon className="w-4 h-4" /></button>
                <button className="w-9 h-9 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white"><Share2Icon className="w-4 h-4" /></button>
              </div>
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex justify-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`flex-shrink-0 w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all p-0.5 ${activeImage === img ? 'border-amber-400 opacity-100' : 'border-transparent opacity-40'}`}
                  >
                    <img src={img} className="w-full h-full object-cover rounded-xl" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ════ INFO & COMPRA ════ */}
          <div className="lg:col-span-5">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 lg:p-10 shadow-2xl flex flex-col text-center lg:text-left h-full">
              
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
                  <StarIcon className="w-3.5 h-3.5 fill-current" />
                  <StarIcon className="w-3.5 h-3.5 fill-current" />
                  <StarIcon className="w-3.5 h-3.5 fill-current" />
                  <StarIcon className="w-3.5 h-3.5 fill-current" />
                  <StarIcon className="w-3.5 h-3.5 fill-current" />
                  <span className="ml-1 text-xs font-black">4.9</span>
                </div>
                <ShippingTag type={product.shipping.type} text={product.shipping.text} />
              </div>

              <div className="flex flex-col items-center lg:items-start gap-1 mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-white">{formatPrice(product.price)}</span>
                  {product.oldPrice && (
                    <span className="text-slate-500 text-lg line-through font-bold opacity-50">{formatPrice(product.oldPrice)}</span>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between bg-slate-900/50 border border-white/5 p-2 rounded-2xl">
                  <span className="pl-2 text-[10px] font-black text-slate-500 uppercase">Cantidad</span>
                  <div className="flex items-center">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-slate-400"><MinusIcon className="w-4 h-4" /></button>
                    <span className="w-8 text-center font-black text-white">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-slate-400"><PlusIcon className="w-4 h-4" /></button>
                  </div>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className={`w-full h-14 flex items-center justify-center gap-2 rounded-2xl text-sm font-black tracking-wide transition-all shadow-xl ${isAdded ? 'bg-green-600 text-white' : 'bg-amber-400 text-slate-900 active:scale-95'}`}
                >
                  {isAdded ? <CheckIcon className="w-5 h-5" /> : <ShoppingCartIcon className="w-5 h-5" />}
                  {isAdded ? 'AÑADIDO' : 'AÑADIR AL CARRITO'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-auto">
                {[
                  { icon: <ShieldIcon className="w-3.5 h-3.5 text-green-500" />, label: 'Pago Seguro' },
                  { icon: <TruckIcon className="w-3.5 h-3.5 text-amber-400" />, label: 'Envío Rápido' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-center gap-2 bg-white/5 border border-white/5 py-2.5 rounded-xl text-[9px] font-black uppercase text-slate-400">
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
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Descripción del producto</h2>
            <div className="w-10 h-1 bg-amber-400 mx-auto mt-2 rounded-full" />
          </div>
          
          <div className="bg-[#0d121c] border border-white/5 rounded-[2rem] p-6 lg:p-12 shadow-inner mb-12">
            <div 
              className="prose prose-invert prose-sm max-w-none text-slate-400 leading-relaxed [&_p]:mb-4 [&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: product.fullDescription || product.description }}
            />

            {/* SEGUNDO CTA: EL "BOOST" DE CONVERSIÓN FINAL */}
            <div className="mt-16 pt-12 border-t border-white/5">
              <div className="flex flex-col items-center text-center gap-6">
                <div className="w-16 h-16 bg-amber-400/10 rounded-3xl flex items-center justify-center animate-bounce">
                  <ThumbsUpIcon className="w-8 h-8 text-amber-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase">¿Convencido?</h3>
                  <p className="text-slate-500 text-sm font-medium max-w-xs mx-auto">Únete a los más de 1,500 clientes que ya disfrutan de esta tecnología.</p>
                </div>
                
                <div className="flex flex-col gap-3 w-full max-w-sm">
                  <div className="text-center">
                    <span className="text-3xl font-black text-white">{formatPrice(product.price)}</span>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className={`w-full h-16 flex items-center justify-center gap-3 rounded-2xl text-lg font-black tracking-wide transition-all shadow-2xl ${isAdded ? 'bg-green-600 text-white' : 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 hover:scale-[1.02] active:scale-[0.98]'}`}
                  >
                    {isAdded ? <CheckIcon className="w-6 h-6" /> : <ShoppingCartIcon className="w-6 h-6" />}
                    {isAdded ? '¡LO QUIERO!' : '¡LO QUIERO AHORA!'}
                  </button>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-2 flex items-center justify-center gap-2">
                    <ShieldIcon className="w-3 h-3" /> Transacción 100% Protegida
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════ RELACIONADOS ════ */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-white/5">
            <h2 className="text-xl font-black text-white text-center mb-8 uppercase tracking-tight">También te puede gustar</h2>
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
