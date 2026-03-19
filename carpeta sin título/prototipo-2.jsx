import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Zap, 
  CheckCircle2, 
  Truck, 
  Globe, 
  ArrowRight,
  X,
  Plus,
  Minus,
  Trash2,
  ShieldCheck,
  CreditCard,
  Plane
} from 'lucide-react';

// --- DATOS DE PRODUCTOS ---
const heroProduct = {
  id: 'p1',
  title: 'Masajeador Cervical Inteligente',
  subtitle: 'PRODUCTO DESTACADO',
  description: 'Dile adiós al dolor de cuello en minutos. Tecnología TENS de pulso de baja frecuencia que alivia la fatiga.',
  features: [
    'Alivio instantáneo para oficina y hogar',
    'Diseño ergonómico 3D adaptable',
    'Batería recargable de larga duración'
  ],
  price: 34990,
  oldPrice: 44990,
  shipping: { type: 'fast', text: 'Envío Rápido 2 a 3 días' },
  imageText: ''
};

const trendingProducts = [
  {
    id: 'p2',
    title: 'Mini Impresora Térmica Portátil',
    price: 29990,
    oldPrice: 34990,
    shipping: { type: 'fast', text: 'Envío Rápido (2-3 días)' },
    imageText: '',
    discount: '-14%'
  },
  {
    id: 'p3',
    title: 'Luz LED con Sensor de Movimiento',
    price: 19990,
    oldPrice: 24990,
    shipping: { type: 'fast', text: 'Envío Rápido (2-3 días)' },
    imageText: '',
    discount: '-20%'
  }
];

const viralProducts = [
  {
    id: 'p4',
    title: 'Aspiradora Portátil Inalámbrica',
    price: 29990,
    oldPrice: 39990,
    shipping: { type: 'fast', text: 'Envío Rápido (2-3 días)' },
    imageText: '',
    discount: '-25%'
  },
  {
    id: 'p5',
    title: 'Cargador Inalámbrico 3 en 1 Magnet',
    price: 29990,
    oldPrice: 39990,
    shipping: { type: 'fast', text: 'Envío Rápido (2-3 días)' },
    imageText: '',
    discount: '-25%'
  }
];

const complementaryProducts = [
  {
    id: 'p6',
    title: 'Cargador Solar Portátil Resistente',
    price: 29990,
    oldPrice: 44990,
    shipping: { type: 'standard', text: 'Envío Internacional (10-15 días)' },
    imageText: '',
    discount: '-33%'
  },
  {
    id: 'p7',
    title: 'Radio de Emergencia Solar Verde',
    price: 34990,
    oldPrice: 49990,
    shipping: { type: 'standard', text: 'Envío Internacional (10-15 días)' },
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
  <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col hover:shadow-xl transition-all duration-300 group">
    <div className="relative h-56 lg:h-64 rounded-xl overflow-hidden mb-5 bg-slate-50 flex items-center justify-center">
      <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-lg z-10 shadow-sm">
        {product.discount}
      </div>
      <ImagePlaceholder text={product.imageText} className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
    </div>
    
    <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3 leading-tight flex-grow">
      {product.title}
    </h3>
    
    <div className="flex items-baseline gap-3 mb-3">
      <span className="text-2xl lg:text-3xl font-black text-slate-900">{formatPrice(product.price)}</span>
      <span className="text-lg text-slate-400 line-through font-medium">{formatPrice(product.oldPrice)}</span>
    </div>
    
    <div className="mb-5">
      <ShippingTag type={product.shipping.type} text={product.shipping.text} />
    </div>
    
    <button 
      onClick={() => onAddToCart(product)}
      className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md active:scale-95"
    >
      <ShoppingCart className="w-5 h-5" />
      Agregar al Carrito
    </button>
  </div>
);

// --- APP PRINCIPAL ---
export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lógica del Carrito
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-slate-600 bg-slate-50 min-h-screen">
      
      {/* NAVBAR */}
      <nav className={`fixed w-full z-40 transition-all duration-300 border-b border-transparent ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-slate-200 py-3' : 'bg-white py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer font-extrabold text-2xl text-slate-900 tracking-tight" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <Zap className="w-6 h-6 text-blue-600" />
            GIOPROMET
          </div>
          
          <div className="hidden md:flex gap-8 font-semibold text-slate-500">
            <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="text-blue-600 hover:text-blue-700 transition-colors">Inicio</button>
            <button onClick={() => scrollToSection('tendencias')} className="hover:text-slate-900 transition-colors">Catálogo</button>
            <button className="hover:text-slate-900 transition-colors">Rastrea tu pedido</button>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative bg-slate-100 hover:bg-slate-200 p-3 rounded-full transition-colors text-slate-900"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* CARRITO DRAWER (Componente Interactivo) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
            <div className="w-full h-full bg-white shadow-2xl flex flex-col">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Tu Carrito</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400">
                    <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
                    <p className="font-medium text-lg">Tu carrito está vacío</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-4 items-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-lg overflow-hidden border border-slate-100 flex-shrink-0 flex items-center justify-center">
                          <ImagePlaceholder text="Img" className="w-full h-full p-2 text-[10px]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1">{item.title}</h4>
                          <p className="font-bold text-blue-600">{formatPrice(item.price)}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center bg-slate-100 rounded-lg p-1">
                              <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white rounded shadow-sm text-slate-600"><Minus className="w-3 h-3"/></button>
                              <span className="w-6 text-center text-sm font-bold text-slate-900">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white rounded shadow-sm text-slate-600"><Plus className="w-3 h-3"/></button>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-500 p-1">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-slate-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium text-slate-500">Subtotal</span>
                    <span className="font-black text-2xl text-slate-900">{formatPrice(cartTotal)}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4 text-center">Los costos de envío se calculan en el checkout seguro.</p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95">
                    Finalizar Compra <ArrowRight className="w-5 h-5" />
                  </button>
                  <div className="mt-4 flex items-center justify-center gap-4 text-slate-400">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-xs font-medium uppercase tracking-wider">Pago 100% Seguro</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 1. HERO SECTION (PRODUCTO DESTACADO) */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-20 bg-white min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Contenido (Izquierda) */}
            <div className="flex flex-col justify-center text-center lg:text-left">
              <div className="inline-block bg-yellow-200 text-yellow-900 font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full w-max mb-6 mx-auto lg:mx-0 shadow-sm">
                🔥 {heroProduct.subtitle}
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
                Masajeador Cervical Inteligente
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {heroProduct.description}
              </p>

              <ul className="space-y-4 mb-8 text-left max-w-md mx-auto lg:mx-0">
                {heroProduct.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-lg font-medium text-slate-800">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex items-baseline justify-center lg:justify-start gap-4 mb-6">
                <span className="text-5xl font-black text-slate-900">{formatPrice(heroProduct.price)}</span>
                <span className="text-2xl text-slate-400 line-through font-medium">{formatPrice(heroProduct.oldPrice)}</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={() => addToCart(heroProduct)}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 px-10 rounded-xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-3"
                >
                  COMPRAR AHORA <ArrowRight className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-6 flex justify-center lg:justify-start">
                <ShippingTag type={heroProduct.shipping.type} text={heroProduct.shipping.text} />
              </div>
            </div>

            {/* Imagen (Derecha) */}
            <div className="w-full">
              <div className="relative aspect-square lg:aspect-auto lg:h-[600px] w-full max-w-lg mx-auto bg-slate-50 rounded-3xl border border-slate-100 shadow-2xl overflow-hidden p-8 group flex items-center justify-center">
                <ImagePlaceholder text={heroProduct.imageText} className="w-full h-full bg-transparent group-hover:scale-105 transition-transform duration-700 text-2xl border-none" />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 2. PRODUCTOS WOW (En Tendencia) */}
      <section id="tendencias" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">PRODUCTOS EN TENDENCIA</h2>
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
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">PRODUCTOS VIRALES</h2>
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
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">ACCESORIOS COMPLEMENTARIOS</h2>
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
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">POLÍTICA DE ENVÍOS TRANSPARENTE</h2>
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
                Aplicable a nuestro <strong className="text-slate-900">Producto Destacado</strong>, <strong className="text-slate-900">Productos Wow</strong> y <strong className="text-slate-900">Virales</strong>. Operado estratégicamente a través de inventario local (Dropi) para garantizar la máxima velocidad en tus compras impulsivas.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Plane className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">Envío Internacional</h3>
              <p className="text-2xl font-black text-blue-500 mb-6 tracking-wide">10 a 15 Días Hábiles</p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Aplicable exclusivamente a nuestra categoría de <strong className="text-slate-900">Accesorios Complementarios</strong>. Gestionado mediante importación directa (AliExpress) para ampliar nuestro catálogo sumando valor al ticket final.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 py-16 text-center text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="flex items-center gap-2 font-extrabold text-3xl text-white tracking-tight mb-4">
            <Zap className="w-8 h-8 text-blue-500" />
            GIOPROMET
          </div>
          <p className="mb-8">Todos los derechos reservados © 2026. Compra 100% Segura.</p>
          <div className="flex gap-4">
            <div className="bg-slate-800 p-3 rounded-lg"><CreditCard className="w-6 h-6 text-slate-300" /></div>
            <div className="bg-slate-800 p-3 rounded-lg"><ShieldCheck className="w-6 h-6 text-slate-300" /></div>
          </div>
        </div>
      </footer>

    </div>
  );
}