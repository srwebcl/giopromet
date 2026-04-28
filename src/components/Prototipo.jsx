import React, { useState, useEffect } from 'react';
import {
  Zap, CheckCircle2, Truck, Globe, ArrowRight, Plane,
  ShoppingCart, Star, Shield, Clock, Users,
  Sparkles, TrendingUp, Rocket, Package,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { CartProvider, useCart } from '../context/CartContext.jsx';
import Button from './ui/Button.jsx';
import ProductCard from './ui/ProductCard.jsx';

const formatPrice = (price) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);

/* --- Badge de descuento en la imagen --- */
function DiscountBadge({ discount }) {
  if (!discount) return null;
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
function SectionHeader({ pill, pillIcon, title, subtitle, description, light = false }) {
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
      <h2 className={`text-4xl sm:text-5xl font-extrabold mb-3 leading-tight ${
        light ? 'text-slate-900' : 'text-white'
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`text-base font-semibold mb-2 uppercase tracking-wider ${light ? 'text-slate-600' : 'text-amber-300/80'}`}>
          {description}
        </p>
      )}
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

/* ─── Flexible Product List / Carousel ─── */
function FlexibleProductList({ products, onAddToCart }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = React.useRef(null);
  const count = products.length;

  if (count === 0) return null;

  // Sincronizar el dot activo con el scroll
  const handleScroll = (e) => {
    const scrollPos = e.target.scrollLeft;
    const containerWidth = e.target.offsetWidth;
    const itemsVisible = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
    const itemWidth = containerWidth / itemsVisible;
    const index = Math.round(scrollPos / itemWidth);
    if (index !== activeIndex && index >= 0 && index < count) setActiveIndex(index);
  };

  const scrollTo = (index) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.querySelector('.product-item')?.offsetWidth || 340;
      const gap = 24; // gap-6
      scrollRef.current.scrollTo({
        left: index * (itemWidth + gap),
        behavior: 'smooth'
      });
    }
  };

  // 1 Producto: Centrado
  if (count === 1) {
    return (
      <div className="flex justify-center py-4 px-4">
        <div className="w-full max-w-sm sm:max-w-md">
          <ProductCard product={products[0]} onAddToCart={onAddToCart} />
        </div>
      </div>
    );
  }

  // 2 Productos: Balanceado
  if (count === 2) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
        {products.map((p) => (
          <div key={p.id} className="flex h-full">
            <ProductCard product={p} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    );
  }

  // 3 Productos: Fijos en Desktop (Grid)
  if (count === 3) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {products.map((p) => (
          <div key={p.id} className="flex h-full">
            <ProductCard product={p} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    );
  }

  // Carrusel para 4 o más (Muestra 3 en Desktop)
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 lg:px-0">
      {/* Flechas Fuera del carrusel (Solo Desktop) */}
      <button 
        onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
        className="hidden xl:flex absolute left-[-80px] top-1/2 -translate-y-1/2 w-14 h-14 bg-slate-900/80 hover:bg-amber-400 hover:text-slate-900 border border-white/10 items-center justify-center rounded-full text-white shadow-2xl z-20 transition-all active:scale-95"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button 
        onClick={() => scrollTo(Math.min(count - 1, activeIndex + 1))}
        className="hidden xl:flex absolute right-[-80px] top-1/2 -translate-y-1/2 w-14 h-14 bg-slate-900/80 hover:bg-amber-400 hover:text-slate-900 border border-white/10 items-center justify-center rounded-full text-white shadow-2xl z-20 transition-all active:scale-95"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Contenedor con Clipping Estricto */}
      <div className="relative overflow-hidden group">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-12 pt-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {products.map((p) => (
            <div 
              key={p.id} 
              className="product-item min-w-[280px] sm:min-w-[340px] lg:min-w-[calc((100%/3)-(16px))] snap-center lg:snap-start transition-opacity duration-300 flex h-full"
            >
              <ProductCard product={p} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Tradicionales */}
      <div className="flex justify-center gap-3 mt-2">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-10 bg-amber-400' : 'w-2.5 bg-white/10 hover:bg-white/30'}`}
            aria-label={`Ir al producto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ==============================================================
   CONTENIDO PRINCIPAL
============================================================== */

function AppContent({ heroProducts = [], trendingProducts, viralProducts, complementaryProducts }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDir, setSlideDir] = useState('right'); // 'right' | 'left'
  const isCarousel = heroProducts.length > 1;
  const SLIDE_INTERVAL = 5000;

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (!isCarousel || isPaused) return;
    const interval = setInterval(() => {
      setSlideDir('right');
      setCurrentHeroIndex((prev) => (prev + 1) % heroProducts.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [isCarousel, isPaused, heroProducts.length]);

  const goTo = (index) => {
    setSlideDir(index > currentHeroIndex ? 'right' : 'left');
    setCurrentHeroIndex(index);
  };
  const goPrev = () => goTo((currentHeroIndex - 1 + heroProducts.length) % heroProducts.length);
  const goNext = () => goTo((currentHeroIndex + 1) % heroProducts.length);

  if (!heroProducts || heroProducts.length === 0) return null;

  const currentHero = heroProducts[currentHeroIndex];
  const discount = currentHero.oldPrice
    ? Math.round(((currentHero.oldPrice - currentHero.price) / currentHero.oldPrice) * 100)
    : 0;

  const handleBuyHero = () => {
    addToCart(currentHero);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="font-sans text-slate-300 bg-[#080c14] min-h-screen">

      {/* ══════════════════════════════════════════
          HERO SECTION (WITH CAROUSEL LOGIC)
      ══════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden bg-slate-900"
        onMouseEnter={() => isCarousel && setIsPaused(true)}
        onMouseLeave={() => isCarousel && setIsPaused(false)}
      >
        {/* Fondo dinámico */}
        <div 
          key={`bg-${currentHero.id}`}
          className="absolute inset-0 opacity-60 blur-[2px] scale-105 transition-all duration-1000 animate-fade-in"
          style={{
            backgroundImage: `url(${currentHero.images?.[1] || currentHero.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500 rounded-full blur-[180px] opacity-15 pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-cyan-400 rounded-full blur-[150px] opacity-10 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-amber-400 rounded-full blur-[140px] opacity-10 pointer-events-none animate-float-slow" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

        {/* Flechas de navegación — solo si hay 2+ productos */}
        {isCarousel && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-900 border border-white/20 text-white backdrop-blur-sm transition-all duration-200 shadow-xl"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-900 border border-white/20 text-white backdrop-blur-sm transition-all duration-200 shadow-xl"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-36 pb-16 lg:pt-48 lg:pb-14">
          <div 
            key={currentHero.id} 
            className="flex flex-col lg:grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center animate-fade-in transition-all duration-700"
          >

            {/* ── Título Mobile ── */}
            <div 
              className={`lg:hidden order-1 text-center transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="flex justify-center mb-4">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-amber-500/10 border border-amber-400/40 text-amber-300 font-bold text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full backdrop-blur-sm">
                  <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {currentHero.subtitle}
                </div>
              </div>
              <h1 className="tracking-tight overflow-visible">
                <span className="block text-2xl font-light text-white/90 mb-1 leading-relaxed py-1">{currentHero.title.split(' ').slice(0, 1).join(' ')}</span>
                <span className="block text-shimmer text-3xl font-black leading-relaxed py-1">{currentHero.title.split(' ').slice(1).join(' ')}</span>
              </h1>
            </div>

            {/* ── Columna imagen ── */}
            <div 
              className={`order-2 lg:order-2 relative flex items-center justify-center transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
              <div className="absolute w-[280px] h-[280px] sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-br from-amber-400/20 to-blue-500/10 blur-2xl animate-float-slow" />
              <div className="absolute w-[250px] h-[250px] sm:w-[440px] sm:h-[440px] rounded-full border border-white/10" />
              <div className="relative animate-float-product">
                <DiscountBadge discount={discount} />
                <div className="relative w-56 h-56 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl animate-glow-border">
                  <img src={currentHero.image} alt={currentHero.title} className="w-full h-full object-cover" width="400" height="400" loading="eager" />
                  <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>
                <div className="absolute -bottom-4 -left-2 sm:-left-6 bg-amber-400 text-slate-900 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-xl flex items-center gap-2 font-black text-[10px] sm:text-xs whitespace-nowrap animate-bounce-in">
                  <Truck className="w-3.5 h-3.5 sm:w-4 h-4" />ENVÍO GRATIS - CHILE
                </div>
                <div className="absolute -top-2 -left-4 sm:-left-8 bg-white text-slate-900 rounded-xl sm:rounded-2xl px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 shadow-xl flex items-center gap-1.5 sm:gap-2 font-bold text-[10px] sm:text-sm">
                  <Star className="w-3.5 h-3.5 sm:w-4 h-4 text-amber-400 fill-amber-400" /><span>{currentHero.stats?.rating || '4.9'}</span><span className="text-slate-400 font-normal text-[8px] sm:text-xs">({currentHero.stats?.purchases || '+1.5k'})</span>
                </div>
              </div>
            </div>

            {/* --- Columna texto --- */}
            <div 
              className={`order-3 lg:order-1 flex flex-col gap-6 text-center lg:text-left transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
            >
              {/* Título Desktop */}
              <div className="hidden lg:block">
                <div className="flex justify-center lg:justify-start mb-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-amber-500/10 border border-amber-400/40 text-amber-300 font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded-full backdrop-blur-sm">
                    <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {currentHero.subtitle}
                  </div>
                </div>
                <h1 id="hero" className="tracking-tighter max-w-2xl overflow-visible">
                  <span className="block text-3xl sm:text-4xl font-light text-white/90 mb-2 leading-relaxed py-1">{currentHero.title.split(' ').slice(0, 1).join(' ')}</span>
                  <span className="block text-shimmer text-4xl sm:text-5xl lg:text-6xl font-black leading-relaxed py-1">{currentHero.title.split(' ').slice(1).join(' ')}</span>
                </h1>
              </div>

              <div 
                className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium [&_p]:mb-0 [&_span]:block"
                dangerouslySetInnerHTML={{ __html: currentHero.description }}
              />

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl mx-auto lg:mx-0 text-left">
                {currentHero.features.slice(0, 4).map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[13px] sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
                <StatsBadge icon={<Star className="w-4 h-4 fill-current" />} value={`${currentHero.stats?.rating || '4.9'}★`} label="Calificación" />
                <StatsBadge icon={<Users className="w-4 h-4" />} value={currentHero.stats?.purchases || '+1.500'} label="Compraron" />
                <StatsBadge icon={<Clock className="w-4 h-4" />} value={currentHero.stats?.location || 'Nacional'} label={currentHero.shipping?.text || "Envío Rápido"} />
              </div>

              <div className="flex items-end gap-4 justify-center lg:justify-start">
                <div>
                  <p className="text-slate-400 text-xs sm:text-sm mb-0.5 uppercase tracking-wider font-semibold">Precio especial</p>
                  <span className="text-4xl sm:text-6xl font-black text-white leading-none">{formatPrice(currentHero.price)}</span>
                </div>
                <div className="pb-1.5 flex flex-col items-start gap-1">
                  <span className="text-slate-400 text-sm sm:text-lg line-through font-bold">{formatPrice(currentHero.oldPrice)}</span>
                  <span className="bg-red-500 text-white text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-md">
                    AHORRAS {formatPrice(currentHero.oldPrice - currentHero.price)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  onClick={handleBuyHero}
                  className={`relative group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-black tracking-wide transition-all duration-300 shadow-2xl overflow-hidden ${added ? 'bg-green-500 text-white shadow-green-500/40' : 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 shadow-amber-500/40 hover:shadow-amber-500/60 hover:scale-105 active:scale-95'}`}
                >
                  <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                  {added ? <><CheckCircle2 className="w-5 h-5" />¡Agregado!</> : <><ShoppingCart className="w-5 h-5" />AGREGAR AL CARRITO</>}
                </button>
                <a href={`/producto/${currentHero.id}`} className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-all backdrop-blur-sm">
                  Ver detalles <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Dots del carrusel con barra de progreso */}
              {isCarousel && (
                <div className="flex gap-3 justify-center lg:justify-start mt-2">
                  {heroProducts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      title={p.title}
                      className={`relative h-2 rounded-full overflow-hidden transition-all duration-500 ${i === currentHeroIndex ? 'w-12 bg-white/20' : 'w-2.5 bg-white/20 hover:bg-white/40'}`}
                      aria-label={`Ir al slide ${i + 1}`}
                    >
                      {i === currentHeroIndex && (
                        <span
                          className="absolute inset-y-0 left-0 bg-amber-400 rounded-full"
                          style={{
                            animation: isPaused ? 'none' : `slideProgress ${SLIDE_INTERVAL}ms linear forwards`,
                            width: isPaused ? '100%' : undefined,
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-1">
                <TrustPill icon={<Shield className="w-3.5 h-3.5" />} text="Seguro" />
                <TrustPill icon={<Truck className="w-3.5 h-3.5" />} text="En Todo Chile" />
                <TrustPill icon={<CheckCircle2 className="w-3.5 h-3.5" />} text="Garantía" />
              </div>
            </div>
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
            title="🧘‍♂️ Alivio del Dolor y Bienestar Físico"
            subtitle="Soluciones Prácticas para aliviar el dolor y mejorar tu calidad de vida."
          />
          <FlexibleProductList products={trendingProducts} onAddToCart={addToCart} />
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
          <FlexibleProductList products={viralProducts} onAddToCart={addToCart} />
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
          <FlexibleProductList products={complementaryProducts} onAddToCart={addToCart} />
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
              time="Bodega Chile"
              timeColor="text-green-400"
              borderColor="border-green-500/20 hover:border-green-400/40"
              description="Todos los productos que se encuentran en bodega nacional y están etiquetados con 'Envío Rápido'. Procesamiento inmediato para entregas veloces."
            />
            <ShippingCard
              icon={<Plane className="w-10 h-10 text-blue-400" />}
              iconBg="bg-blue-500/15 border border-blue-500/20"
              title="Envío Internacional"
              time="Bodega Global"
              timeColor="text-blue-400"
              borderColor="border-blue-500/20 hover:border-blue-400/40"
              description="Productos seleccionados de importación directa sujetos a disponibilidad en bodegas internacionales. Ideales para ampliar la variedad con lo mejor del mundo."
            />
          </div>

          {/* Banner de garantías */}
          <div className="mt-10 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: <Shield className="w-6 h-6 text-amber-400" />, label: 'Compra Segura', sub: 'SSL 256-bit' },
              { icon: <CheckCircle2 className="w-6 h-6 text-green-400" />, label: 'Garantía', sub: '30 días' },
              { icon: <Truck className="w-6 h-6 text-blue-400" />, label: 'Envíos a Todo Chile', sub: 'Sin mínimo' },
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

export default function App(props) {
  return (
    <CartProvider>
      <AppContent {...props} />
    </CartProvider>
  );
}