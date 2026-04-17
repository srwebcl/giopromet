import * as wc from '../lib/woocommerce.js';

// Todos los productos de la tienda (Fallback estático por seguridad)
const staticProducts = [
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
      'Conectividad Bluetooth y USB'
    ]
  }
  // Se pueden añadir más fallbacks si es necesario, pero la idea es usar la API.
];

// --- Funciones de obtención de datos (AHORA ASÍNCRONAS) ------------------

export async function getAllProducts() {
  try {
    const products = await wc.getAllProducts();
    if (products && products.length > 0) return products;
  } catch (e) {
    console.warn('⚠️ Fallo de conexión con WooCommerce (getAllProducts), usando estático.');
  }
  return staticProducts;
}

export async function getProductById(id) {
  try {
    const product = await wc.getProductById(id);
    if (product) return product;
  } catch (e) {
    console.warn(`⚠️ Error al obtener producto ${id} de WC, buscando en estático.`);
  }
  const all = await getAllProducts();
  return all.find(p => p.id === id.toString());
}

export async function getProductsByCategory(category) {
  const all = await getAllProducts();
  if (category === 'all') return all;
  return all.filter(product => product.category === category);
}

// --- Categorías disponibles --------------------------------
const staticCategories = [
  { id: 'all',        label: 'Todos',       emoji: '🛍️' },
  { id: 'tendencias', label: 'Tendencias',  emoji: '🔥' },
  { id: 'virales',    label: 'Virales',     emoji: '🚀' },
  { id: 'gadgets',    label: 'Gadgets',     emoji: '✨' },
];

export async function getCategories() {
  try {
    const categories = await wc.getCategories();
    if (categories && categories.length > 0) {
      const dynamic = categories.map(cat => ({
        id: cat.slug,
        label: cat.name,
        emoji: '✨' // Por defecto para categorías nuevas
      }));
      return [{ id: 'all', label: 'Todos', emoji: '🛍️' }, ...dynamic];
    }
  } catch (e) {
    console.warn('⚠️ Error al obtener categorías de WC.');
  }
  return staticCategories;
}
