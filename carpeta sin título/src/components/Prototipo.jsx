import React, { useState, useEffect } from 'react';
import {
  Zap,
  CheckCircle2,
  Truck,
  Globe,
  ArrowRight,
  Plane
} from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { heroProduct, trendingProducts, viralProducts, complementaryProducts } from '../data/products.js';

// --- DATOS DE PRODUCTOS ---
const heroProduct = {
  id: 'p1',
  title: '🧠 Masajeador Cervical Inteligente',
  subtitle: '⭐ PRODUCTO DESTACADO',
  description: 'Dile adiós al dolor de cuello en minutos. Tecnología TENS de pulso de baja frecuencia que alivia la fatiga.',
  features: [
    'Alivio instantáneo para oficina y hogar',
    'Diseño ergonómico 3D adaptable',
    'Batería recargable de larga duración'
  ],
  price: 34990,
  oldPrice: 44990,
  shipping: { type: 'fast', text: 'Envío Rápido 2 a 3 días' },
  image: '/images-products/masajeador-cuello.jpg',
  imageText: ''
};

const trendingProducts = [
  {
    id: 'p2',
    title: '🖨️ Mini Impresora Térmica Portátil',
    price: 29990,
    oldPrice: 34990,
    shipping: { type: 'fast', text: 'Envío Rápido (2-3 días)' },
    image: '/images-products/impresora portatil.webp',
    imageText: '',
    discount: '-14%'
  },
  {
    id: 'p3',
    title: '💡 Luz LED con Sensor de Movimiento',
    price: 19990,
    oldPrice: 24990,
    shipping: { type: 'fast', text: 'Envío Rápido (2-3 días)' },
    image: '/images-products/lampara-led-inteligente.jpeg',
    imageText: '',
    discount: '-20%'
  }
];

const viralProducts = [
  {
    id: 'p4',
    title: '🌪️ Aspiradora Portátil Inalámbrica',
    price: 29990,
    oldPrice: 39990,
    shipping: { type: 'fast', text: 'Envío Rápido (2-3 días)' },
    image: '/images-products/aspiradora-portatil.webp',
    imageText: '',
    discount: '-25%'
  },
  {
    id: 'p5',
    title: '🔌 Cargador Inalámbrico 3 en 1 Magnet',
    price: 29990,
    oldPrice: 39990,
    shipping: { type: 'fast', text: 'Envío Rápido (2-3 días)' },
    image: '/images-products/cargador-hypergear.webp',
    imageText: '',
    discount: '-25%'
  }
];

const complementaryProducts = [
  {
    id: 'p6',
    title: '☀️ Cargador Solar Portátil Resistente',
    price: 29990,
    oldPrice: 44990,
    shipping: { type: 'standard', text: 'Envío Internacional (10-15 días)' },
    image: '/images-products/cargador-solar.webp',
    imageText: '',
    discount: '-33%'
  },
  {
    id: 'p7',
    title: '📻 Radio de Emergencia Solar Verde',
    price: 34990,
    oldPrice: 49990,
    shipping: { type: 'standard', text: 'Envío Internacional (10-15 días)' },
    image: '/images-products/cargador-solar.webp',
    imageText: '',
    discount: '-30%'
  }
];

// --- UTILIDADES ---
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

// --- COMPONENTES UI ---
const ImagePlaceholder = ({ text, className }) => (
  <div className={`bg-slate-100 flex items-center justify-center text-center p-6 text-slate-500 font-medium border-2 border-dashed border-slate-200 ${className}`}>
    <div className="flex flex-col items-center gap-2">
      <Zap className="w-8 h-8 text-slate-300 mb-2" />
      <span>{text}</span>
    </div>
  </div>
);

const ShippingTag = ({ type, text }) => {
  if (type === 'fast') {
    return (
      <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-bold px-3 py-1.5 rounded-lg">
        <Truck className="w-4 h-4" />
        {text}
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1.5 rounded-lg">
      <Globe className="w-4 h-4" />
      {text}
    </div>
  );
};

const ProductCard = ({ product, onAddToCart }) => (
  <div className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col hover:shadow-2xl hover:border-slate-200 transition-all duration-300 group transform hover:scale-105">
    <a href={`/producto/${product.id}`} className="relative h-56 lg:h-64 rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center block hover:no-underline">
      <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-black px-3 py-1.5 rounded-full z-10 shadow-lg">
        {product.discount}
      </div>
      {product.image ? (
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      ) : (
        <ImagePlaceholder text={product.imageText} className="w-full h-full group-hover:scale-110 transition-transform duration-500" />
      )}
    </a>

    <a href={`/producto/${product.id}`} className="hover:no-underline">
      <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4 leading-tight flex-grow hover:text-blue-600 transition-colors">
        {product.title}
      </h3>
    </a>

    <div className="flex items-baseline gap-3 mb-4">
      <span className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">{formatPrice(product.price)}</span>
      <span className="text-lg text-slate-400 line-through font-medium">{formatPrice(product.oldPrice)}</span>
    </div>

    <div className="mb-6">
      <ShippingTag type={product.shipping.type} text={product.shipping.text} />
    </div>

    <button
      onClick={() => onAddToCart(product)}
      className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-black py-3.5 px-4 rounded-full transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 active:scale-95 transform hover:scale-105 border border-amber-300/50"
    >
      🛒 Agregar al Carrito
    </button>
  </div>
);

// --- APP PRINCIPAL ---
export default function App() {
  const { addToCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-slate-600 bg-slate-50 min-h-screen">

      {/* 1. HERO SECTION (PRODUCTO DESTACADO) */}
      <section
        className="pt-24 pb-12 lg:pt-24 lg:pb-12 min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: 'url(/images-products/BACKGROUND-HERO.png)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay oscuro gradiente para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/50 to-slate-900/10 -z-10"></div>

        {/* Animaciones decorativas (sutiles ahora) */}
        <div className="absolute top-10 right-10 w-80 h-80 bg-blue-200 rounded-full filter blur-3xl opacity-5 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-100 rounded-full filter blur-3xl opacity-5 animate-float-slow"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 relative z-0">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center justify-center">

            {/* Contenido (Izquierda) */}
            <div className="flex flex-col justify-center text-center lg:text-left py-4 lg:py-0">
              <div className="inline-block bg-blue-900 text-white font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full w-max mb-3 mx-auto lg:mx-0 shadow-lg drop-shadow-lg">
                🔥 {heroProduct.subtitle}
              </div>

              <h1 className="text-white leading-tight tracking-tight mb-8 drop-shadow-2xl">
                <div className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-2">Masajeador</div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">Cervical Inteligente</div>
              </h1>

              <p className="text-lg sm:text-xl text-gray-100 mb-5 leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-lg">
                {heroProduct.description}
              </p>

              <ul className="space-y-3 mb-6 text-left max-w-md mx-auto lg:mx-0 text-sm sm:text-base">
                {heroProduct.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 font-semibold text-white drop-shadow-lg">
                    <CheckCircle2 className="w-5 h-5 text-cyan-300 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex items-baseline justify-center lg:justify-start gap-3 mb-6">
                <span className="text-5xl sm:text-6xl font-black text-white drop-shadow-2xl">{formatPrice(heroProduct.price)}</span>
                <span className="text-xl sm:text-2xl text-gray-300 line-through font-bold drop-shadow-lg">{formatPrice(heroProduct.oldPrice)}</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => addToCart(heroProduct)}
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 text-base sm:text-lg font-black py-4 px-11 rounded-full transition-all shadow-2xl shadow-amber-500/50 active:scale-95 transform hover:scale-105 duration-200 flex items-center justify-center gap-2 border-2 border-amber-300/70 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-300/0 via-white/30 to-amber-300/0 group-hover:via-white/40 transition-all"></span>
                  <span className="relative">🛒 COMPRAR</span>
                  <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="mt-4 flex justify-center lg:justify-start">
                <ShippingTag type={heroProduct.shipping.type} text={heroProduct.shipping.text} />
              </div>
            </div>

            {/* Espacio vacío a la derecha (donde se ve la imagen de background) */}
            <div className="w-full hidden lg:block"></div>

          </div>
        </div>
      </section>

      {/* 2. PRODUCTOS WOW (En Tendencia) */}
      <section id="tendencias" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 hover:text-blue-600 transition-colors duration-300">🔥 PRODUCTOS EN TENDENCIA</h2>
            <p className="text-xl text-slate-500">Gadgets llamativos que generan curiosidad y mejoran tu día a día.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRODUCTOS VIRALES */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 hover:text-purple-600 transition-colors duration-300">🚀 PRODUCTOS VIRALES</h2>
            <p className="text-xl text-slate-500">Los favoritos indiscutibles que todos están comprando esta semana.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {viralProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRODUCTOS COMPLEMENTARIOS */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 hover:text-pink-600 transition-colors duration-300">✨ ACCESORIOS COMPLEMENTARIOS</h2>
            <p className="text-xl text-slate-500">Tecnología útil para tu día a día. Catálogo extendido con importación directa.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {complementaryProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECCIÓN DE ENVÍOS TRANSPARENTE */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 hover:text-green-600 transition-colors duration-300">🚚 POLÍTICA DE ENVÍOS TRANSPARENTE</h2>
            <p className="text-xl text-slate-500">Sabemos que tu tiempo es valioso. Conoce nuestros tiempos de entrega exactos.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">Envío Rápido Nacional</h3>
              <p className="text-2xl font-black text-green-500 mb-6 tracking-wide">2 a 3 Días Hábiles</p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Aplicable a nuestro <strong className="text-slate-900">Producto Destacado</strong>, <strong className="text-slate-900">Productos Wow</strong> y <strong className="text-slate-900">Virales</strong>. Operado estratégicamente a través de inventario local para garantizar la máxima velocidad en tus compras impulsivas.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Plane className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">Envío Internacional</h3>
              <p className="text-2xl font-black text-blue-500 mb-6 tracking-wide">10 a 15 Días Hábiles</p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Aplicable exclusivamente a nuestra categoría de <strong className="text-slate-900">Accesorios Complementarios</strong>. Gestionado mediante importación directa para ampliar nuestro catálogo sumando valor al ticket final.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE RESEÑAS */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">⭐ LO QUE DICEN NUESTROS CLIENTES</h2>
            <p className="text-xl text-slate-500">Miles de personas satisfechas confían en nosotros.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: '👤 María G.', text: '¡Excelente calidad! El masajeador llegó en 2 días y es increíble. Ya no tengo dolor de cuello.', rating: 5 },
              { name: '👤 Carlos M.', text: 'Los precios son los mejores que he encontrado. Recomendado al 100%. Envío super rápido.', rating: 5 },
              { name: '👤 Ana López', text: 'Compré 3 productos diferentes y todos llegaron en perfecto estado. Muy satisfecha con el servicio.', rating: 5 }
            ].map((review, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex gap-1 mb-4 text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic font-medium">"{review.text}"</p>
                <p className="font-bold text-slate-900">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}