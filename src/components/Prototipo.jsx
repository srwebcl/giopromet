import React, { useState, useEffect } from 'react';
import {
  Zap, CheckCircle2, Truck, Globe, ArrowRight, Plane,
  ShoppingCart, Star, Shield, Clock, Users, ChevronDown,
  Sparkles, TrendingUp, Rocket, Package
} from 'lucide-react';
import { CartProvider, useCart } from '../context/CartContext.jsx';
import { heroProduct, trendingProducts, viralProducts, complementaryProducts } from '../data/products.js';
import Button from './ui/Button.jsx';
import ProductCard from './ui/ProductCard.jsx';

const formatPrice = (price) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);

const discount = Math.round(
  ((heroProduct.oldPrice - heroProduct.price) / heroProduct.oldPrice) * 100
);

/* ─── Badge de descuento en la imagen ─── */
function DiscountBadge() {
  return (
    <div className="absolute -top-4 -right-4 z-20 w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-rose-600 shadow-2xl flex flex-col items-center justify-center animate-pulse-ring border-4 border-white">
      <span className="text-white font-black text-xl leading-none">-{discount}%</span>
      <span className="text-red-100 text-[9px] font-bold uppercase tracking-wide">OFERTA</span>
    </div>
  );
}

/* ─── Stat badge del hero ─── */
function StatsBadge({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3.5 py-2.5">
      <span className="text-amber-300 flex-shrink-0">{icon}</span>
      <div>
        <div className="text-white font-black text-sm leading-none">{value}</div>
        <div className="text-slate-300 text-[10px] leading-none mt-0.5">{label}</div>
      </div>
    </div>
  );
}

/* ─── Trust pill ─── */
function TrustPill({ icon, text }) {
  return (
    <div className="flex items-center gap-1.5 text-slate-300 text-xs">
      <span className="text-green-400">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

/* ─── Section Header Premium ─── */
function SectionHeader({ pill, pillIcon, title, subtitle, light = false }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-16">
      <div className="flex justify-center mb-4">
        <div className={`inline-flex items-center gap-2 border text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full backdrop-blur-sm ${
          light
            ? 'bg-slate-900/10 border-slate-900/20 text-slate-700'
            : 'bg-white/10 border-white/20 text-amber-300'
        }`}>
          {pillIcon}
          {pill}
        </div>
      </div>
      <h2 className={`text-4xl sm:text-5xl font-extrabold mb-4 leading-tight ${
        light ? 'text-slate-900' : 'text-white'
      }`}>
        {title}
      </h2>
      <p className={`text-lg ${light ? 'text-slate-500' : 'text-slate-400'}`}>
        {subtitle}
      </p>
    </div>
  );
}

/* ─── Tarjeta de Envío ─── */
function ShippingCard({ icon, iconBg, title, time, timeColor, description, borderColor }) {
  return (
    <div className={`relative bg-white/5 backdrop-blur-sm border ${borderColor} rounded-3xl p-10 text-center hover:bg-white/8 transition-all duration-300 group hover:-translate-y-1`}>
      <div className={`w-20 h-20 mx-auto ${iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className={`text-2xl font-black mb-5 tracking-wide ${timeColor}`}>{time}</p>
      <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
    </div>
  );
}

/* ─── Tarjeta de Reseña ─── */
function ReviewCard({ name, location, text, avatar, delay }) {
  return (
    <div
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:border-amber-400/30 hover:bg-white/8 hover:-translate-y-1 transition-all duration-300"
      style={{ animationDelay: delay }}
    >
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-slate-300 mb-6 italic leading-relaxed text-sm">"{text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
          {avatar}
        </div>
        <div>
          <p className="font-bold text-white text-sm">{name}</p>
          <p className="text-slate-500 text-xs">{location}</p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTENIDO PRINCIPAL
══════════════════════════════════════════════════════════════ */
function AppContent() {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleBuyHero = () => {
    addToCart(heroProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="font-sans text-slate-300 bg-[#080c14] min-h-screen">

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images-products/BACKGROUND-HERO.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-800/40" />
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500 rounded-full blur-[180px] opacity-15 pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-cyan-400 rounded-full blur-[150px] opacity-10 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-amber-400 rounded-full blur-[140px] opacity-10 pointer-events-none animate-float-slow" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 lg:pt-24 lg:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Columna texto */}
            <div className={`flex flex-col gap-6 text-center lg:text-left transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-amber-500/10 border border-amber-400/40 text-amber-300 font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded-full backdrop-blur-sm">
                  <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ⭐ Producto Más Vendido
                </div>
              </div>

              <h1 id="hero" className="leading-none tracking-tight">
                <span className="block text-4xl sm:text-5xl lg:text-6xl font-light text-white/90 mb-1">Masajeador</span>
                <span className="block text-shimmer text-4xl sm:text-5xl lg:text-6xl font-black whitespace-nowrap">Cervical Eléctrico</span>
              </h1>

              <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">{heroProduct.description}</p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl mx-auto lg:mx-0 text-left">
                {heroProduct.features.slice(0, 4).map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
                <StatsBadge icon={<Star className="w-4 h-4 fill-current" />} value="4.9★" label="Calificación" />
                <StatsBadge icon={<Users className="w-4 h-4" />} value="+2.400" label="Compraron" />
                <StatsBadge icon={<Clock className="w-4 h-4" />} value="2-3 días" label="Envío rápido" />
              </div>

              <div className="flex items-end gap-4 justify-center lg:justify-start">
                <div>
                  <p className="text-slate-400 text-sm mb-0.5 uppercase tracking-wider font-semibold">Precio especial</p>
                  <span className="text-5xl sm:text-6xl font-black text-white leading-none">{formatPrice(heroProduct.price)}</span>
                </div>
                <div className="pb-1.5 flex flex-col items-start gap-1">
                  <span className="text-slate-400 text-lg line-through font-bold">{formatPrice(heroProduct.oldPrice)}</span>
                  <span className="bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded-md">
                    AHORRAS {formatPrice(heroProduct.oldPrice - heroProduct.price)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  onClick={handleBuyHero}
                  className={`relative group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-black tracking-wide transition-all duration-300 shadow-2xl overflow-hidden ${added ? 'bg-green-500 text-white shadow-green-500/40' : 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 shadow-amber-500/40 hover:shadow-amber-500/60 hover:scale-105 active:scale-95'}`}
                >
                  <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                  {added ? <><CheckCircle2 className="w-5 h-5" />¡Agregado al carrito!</> : <><ShoppingCart className="w-5 h-5" />AGREGAR AL CARRITO<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
                </button>
                <a href={`/producto/${heroProduct.id}`} className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-all backdrop-blur-sm">
                  Ver detalles <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-1">
                <TrustPill icon={<Shield className="w-3.5 h-3.5" />} text="Compra 100% segura" />
                <TrustPill icon={<Truck className="w-3.5 h-3.5" />} text="Envío gratis" />
                <TrustPill icon={<CheckCircle2 className="w-3.5 h-3.5" />} text="Garantía incluida" />
              </div>
            </div>

            {/* Columna imagen */}
            <div className={`relative flex items-center justify-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="absolute w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-br from-amber-400/20 to-blue-500/10 blur-2xl animate-float-slow" />
              <div className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full border border-white/10" />
              <div className="absolute w-[300px] h-[300px] sm:w-[390px] sm:h-[390px] rounded-full border border-white/5" />
              <div className="relative animate-float-product">
                <DiscountBadge />
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl animate-glow-border">
                  <img src={heroProduct.image} alt={heroProduct.title} className="w-full h-full object-cover" width="400" height="400" loading="eager" />
                  <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>
                <div className="absolute -bottom-4 -left-6 bg-green-500 text-white rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2 font-bold text-sm">
                  <Truck className="w-4 h-4" />Envío en 2-3 días
                </div>
                <div className="absolute -top-2 -left-8 bg-white text-slate-900 rounded-2xl px-3.5 py-2.5 shadow-xl flex items-center gap-2 font-bold text-sm">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" /><span>4.9</span><span className="text-slate-400 font-normal text-xs">(2.4k)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 opacity-60">
            <span className="text-xs tracking-widest uppercase">Explorar</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECCIÓN TENDENCIAS
      ══════════════════════════════════════════ */}
      <section id="tendencias" className="py-24 bg-[#0d1220] relative overflow-hidden">
        {/* Decoraciones de fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[200px] opacity-8 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500 rounded-full blur-[180px] opacity-6 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            pill="Tendencias"
            pillIcon={<TrendingUp className="w-3.5 h-3.5" />}
            title="🔥 Productos en Tendencia"
            subtitle="Gadgets llamativos que generan curiosidad y mejoran tu día a día."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECCIÓN VIRALES
      ══════════════════════════════════════════ */}
      <section id="virales" className="py-24 bg-[#080c14] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-700 rounded-full blur-[200px] opacity-8 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(255,255,255,0.03) 35px, rgba(255,255,255,0.03) 36px), repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(255,255,255,0.03) 35px, rgba(255,255,255,0.03) 36px)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            pill="Viral esta semana"
            pillIcon={<Rocket className="w-3.5 h-3.5" />}
            title="🚀 Productos Virales"
            subtitle="Los favoritos indiscutibles que todos están comprando esta semana."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {viralProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECCIÓN COMPLEMENTARIOS
      ══════════════════════════════════════════ */}
      <section id="gadgets" className="py-24 bg-[#0d1220] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600 rounded-full blur-[220px] opacity-7 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500 rounded-full blur-[180px] opacity-6 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            pill="Catálogo extendido"
            pillIcon={<Package className="w-3.5 h-3.5" />}
            title="✨ Gadgets Complementarios"
            subtitle="Tecnología útil para tu día a día. Importación directa, precios únicos."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {complementaryProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          POLÍTICA DE ENVÍOS
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-[#080c14] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-green-600 rounded-full blur-[200px] opacity-6 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            pill="Envíos transparentes"
            pillIcon={<Truck className="w-3.5 h-3.5" />}
            title="🚚 Política de Envíos Transparente"
            subtitle="Sabemos que tu tiempo es valioso. Conoce nuestros tiempos de entrega exactos."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <ShippingCard
              icon={<Zap className="w-10 h-10 text-green-400" />}
              iconBg="bg-green-500/15 border border-green-500/20"
              title="Envío Rápido Nacional"
              time="2 a 3 Días Hábiles"
              timeColor="text-green-400"
              borderColor="border-green-500/20 hover:border-green-400/40"
              description="Aplicable a nuestro Producto Destacado, Productos Wow y Virales. Operamos con inventario local para garantizar la máxima velocidad."
            />
            <ShippingCard
              icon={<Plane className="w-10 h-10 text-blue-400" />}
              iconBg="bg-blue-500/15 border border-blue-500/20"
              title="Envío Internacional"
              time="10 a 15 Días Hábiles"
              timeColor="text-blue-400"
              borderColor="border-blue-500/20 hover:border-blue-400/40"
              description="Aplicable a nuestra categoría de Accesorios Complementarios. Importación directa para ampliar nuestro catálogo con el mejor valor."
            />
          </div>

          {/* Banner de garantías */}
          <div className="mt-10 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: <Shield className="w-6 h-6 text-amber-400" />, label: 'Compra Segura', sub: 'SSL 256-bit' },
              { icon: <CheckCircle2 className="w-6 h-6 text-green-400" />, label: 'Garantía', sub: '30 días' },
              { icon: <Truck className="w-6 h-6 text-blue-400" />, label: 'Envío Gratis', sub: 'Sin mínimo' },
              { icon: <Star className="w-6 h-6 text-purple-400 fill-purple-400" />, label: 'Top Rated', sub: '4.9 / 5 ★' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 bg-white/5 border border-white/10 rounded-2xl py-5 px-3 hover:border-white/20 transition-all">
                {item.icon}
                <span className="text-white font-bold text-sm">{item.label}</span>
                <span className="text-slate-500 text-xs">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RESEÑAS
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0d1220] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500 rounded-full blur-[200px] opacity-6 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500 rounded-full blur-[180px] opacity-6 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            pill="Clientes verificados"
            pillIcon={<Sparkles className="w-3.5 h-3.5" />}
            title="⭐ Lo que dicen nuestros clientes"
            subtitle="Miles de personas satisfechas confían en nosotros cada semana."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReviewCard name="María G." location="Santiago, Chile" text="¡Excelente calidad! El masajeador llegó en 2 días y es increíble. Ya no tengo dolor de cuello." avatar="M" delay="0s" />
            <ReviewCard name="Carlos M." location="Valparaíso, Chile" text="Los precios son los mejores que he encontrado. Recomendado al 100%. Envío super rápido y producto impecable." avatar="C" delay="0.1s" />
            <ReviewCard name="Ana López" location="Concepción, Chile" text="Compré 3 productos diferentes y todos llegaron en perfecto estado. Muy satisfecha con el servicio y la atención." avatar="A" delay="0.2s" />
          </div>

          {/* Rating global */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="text-6xl font-black text-white">4.9</span>
              <div className="flex gap-1 my-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
              </div>
              <span className="text-slate-400 text-sm">Promedio general</span>
            </div>
            <div className="hidden sm:block w-px h-20 bg-white/10" />
            <div className="grid grid-cols-3 gap-8">
              {[
                { val: '+2.400', label: 'Clientes felices' },
                { val: '98%', label: 'Satisfacción' },
                { val: '+500', label: 'Reseñas verificadas' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-white">{s.val}</div>
                  <div className="text-slate-400 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}