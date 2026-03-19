// Todos los productos de la tienda
export const allProducts = [
  {
    id: 'p1',
    category: 'tendencias',
    categoryLabel: 'Tendencias',
    title: '🧠 Masajeador Cervical Inteligente',
    subtitle: '⭐ PRODUCTO DESTACADO',
    description: 'Dile adiós al dolor de cuello en minutos. Tecnología TENS de pulso de baja frecuencia que alivia la fatiga.',
    fullDescription: 'El masajeador cervical inteligente utiliza tecnología TENS avanzada para proporcionar alivio inmediato del dolor de cuello. Con su diseño ergonómico 3D adaptable y batería recargable de larga duración, es perfecto para uso en la oficina o en casa.',
    features: [
      'Alivio instantáneo para oficina y hogar',
      'Diseño ergonómico 3D adaptable',
      'Batería recargable de larga duración',
      'Múltiples modos de vibración',
      'Tiempo de carga: 2 horas',
      'Duración batería: 8 horas'
    ],
    price: 34990,
    oldPrice: 44990,
    shipping: { type: 'fast', text: 'Envío Rápido' },
    image: '/images-products/masajeador-cuello.jpg',
    imageText: 'Masajeador Cervical',
    discount: '-22%'
  },
  {
    id: 'p2',
    category: 'tendencias',
    categoryLabel: 'Tendencias',
    title: '🖨️ Mini Impresora Térmica Portátil',
    description: 'Imprime donde quieras. Compacta y rápida.',
    fullDescription: 'Impresora térmica portátil perfecta para documentos, fotos y etiquetas. Conectividad Bluetooth y USB. Ideal para viajes y trabajo remoto.',
    price: 29990,
    oldPrice: 34990,
    shipping: { type: 'fast', text: 'Envío Rápido' },
    image: '/images-products/impresora portatil.webp',
    imageText: 'Impresora Térmica',
    discount: '-14%',
    features: [
      'Tamaño compacto y portátil',
      'Conectividad Bluetooth y USB',
      'Batería de larga duración',
      'Compatible con múltiples dispositivos',
      'Impresión a color',
      'Resolución: 300 DPI'
    ]
  },
  {
    id: 'p3',
    category: 'tendencias',
    categoryLabel: 'Tendencias',
    title: '💡 Luz LED con Sensor de Movimiento',
    description: 'Iluminación inteligente que se enciende automáticamente.',
    fullDescription: 'Lámpara LED inteligente con sensor de movimiento infrarrojo. Ahorra energía y proporciona iluminación dondequiera que la necesites.',
    price: 19990,
    oldPrice: 24990,
    shipping: { type: 'fast', text: 'Envío Rápido' },
    image: '/images-products/lampara-led-inteligente.jpeg',
    imageText: 'Lámpara LED',
    discount: '-20%',
    features: [
      'Sensor de movimiento infrarrojo',
      'Múltiples modos de brillo',
      'Bajo consumo de energía',
      'Diseño moderno y compacto',
      'Instalación fácil mediante adhesivo',
      'Alcance de detección: 3-5 metros'
    ]
  },
  {
    id: 'p4',
    category: 'virales',
    categoryLabel: 'Virales',
    title: '🌪️ Aspiradora Portátil Inalámbrica',
    description: 'Potencia de succión increíble en un tamaño compacto.',
    fullDescription: 'Aspiradora inalámbrica de mano rediseñada con motor potente y batería de larga duración. Perfecta para limpiezas rápidas en el hogar.',
    price: 29990,
    oldPrice: 39990,
    shipping: { type: 'fast', text: 'Envío Rápido' },
    image: '/images-products/aspiradora-portatil.webp',
    imageText: 'Aspiradora Portátil',
    discount: '-25%',
    features: [
      'Motor inalámbrico potente',
      'Batería de larga duración',
      'Múltiples accesorios incluidos',
      'Filtro HEPA desmontable',
      'Peso ligero: 1.2 kg',
      'Tiempo de carga: 3 horas'
    ]
  },
  {
    id: 'p5',
    category: 'virales',
    categoryLabel: 'Virales',
    title: '🔌 Cargador Inalámbrico 3 en 1 Magnet',
    description: 'Carga tu teléfono, reloj y auriculares simultáneamente.',
    fullDescription: 'Cargador inalámbrico magnético 3 en 1 diseñado para dispositivos Apple. Carga rápida y eficiente con tecnología Qi certificada.',
    price: 29990,
    oldPrice: 39990,
    shipping: { type: 'fast', text: 'Envío Rápido' },
    image: '/images-products/cargador-hypergear.webp',
    imageText: 'Cargador 3 en 1',
    discount: '-25%',
    features: [
      'Carga 3 dispositivos simultáneamente',
      'Tecnología Qi certificada',
      'Conexión magnética fuerte',
      'Compatible con iPhone, Apple Watch, AirPods',
      'Entrada USB-C',
      'Salida: 15W máximo'
    ]
  },
  {
    id: 'p6',
    category: 'gadgets',
    categoryLabel: 'Gadgets',
    title: '☀️ Cargador Solar Portátil Resistente',
    description: 'Energía solar para tus dispositivos en cualquier lugar.',
    fullDescription: 'Cargador solar portátil con panel convertible de alta eficiencia. Resistente al agua y perfecto para camping, senderismo y aventuras.',
    price: 29990,
    oldPrice: 44990,
    shipping: { type: 'standard', text: 'Envío Internacional' },
    image: '/images-products/cargador-solar.webp',
    imageText: 'Cargador Solar',
    discount: '-33%',
    features: [
      'Panel solar de alta eficiencia',
      'Resistente al agua (IP65)',
      'Capacidad: 25000 mAh',
      'Puertos USB múltiples',
      'Compatible con todos los dispositivos',
      'Tiempo de carga solar: 8-10 horas'
    ]
  },
  {
    id: 'p7',
    category: 'gadgets',
    categoryLabel: 'Gadgets',
    title: '📻 Radio de Emergencia Solar Verde',
    description: 'Radio multifunción preparado para cualquier emergencia.',
    fullDescription: 'Radio de emergencia solar con linterna, cargador de teléfono integrado y brújula. Ideal para preparación de emergencias y viajes al aire libre.',
    price: 34990,
    oldPrice: 49990,
    shipping: { type: 'standard', text: 'Envío Internacional' },
    image: '/images-products/cargador-solar.webp',
    imageText: 'Radio Solar',
    discount: '-30%',
    features: [
      'Carga solar y manual',
      'Linterna LED integrada',
      'Cargador de teléfono USB',
      'Brújula integrada',
      'Frecuencias AM/FM/NOAA',
      'Batería recargable 2000 mAh'
    ]
  }
];

// ── Funciones helper ──────────────────────────────────────
export function getProductById(id) {
  return allProducts.find(product => product.id === id);
}

export function getAllProducts() {
  return allProducts;
}

export function getProductsByIds(ids) {
  return allProducts.filter(product => ids.includes(product.id));
}

export function getProductsByCategory(category) {
  return allProducts.filter(product => product.category === category);
}

// ── Grupos por sección del home ───────────────────────────
export const heroProduct   = allProducts.find(p => p.id === 'p1');
export const trendingProducts     = allProducts.filter(p => ['p2', 'p3'].includes(p.id));
export const viralProducts        = allProducts.filter(p => ['p4', 'p5'].includes(p.id));
export const complementaryProducts = allProducts.filter(p => ['p6', 'p7'].includes(p.id));

// ── Categorías disponibles ────────────────────────────────
export const CATEGORIES = [
  { id: 'all',        label: 'Todos',       emoji: '🛍️' },
  { id: 'tendencias', label: 'Tendencias',  emoji: '🔥' },
  { id: 'virales',    label: 'Virales',     emoji: '🚀' },
  { id: 'gadgets',    label: 'Gadgets',     emoji: '✨' },
];
