/**
 * Servicio para conectar con la API REST de WooCommerce
 */

const WC_URL = import.meta.env.WC_URL || 'https://admin.giopromet.cl';
const WC_KEY = import.meta.env.WC_KEY;
const WC_SECRET = import.meta.env.WC_SECRET;

/**
 * Helper para realizar peticiones autenticadas a WooCommerce
 */
async function fetchWC(endpoint, params = {}) {
  if (!WC_KEY || !WC_SECRET) {
    console.error('⚠️ WooCommerce API Keys no configuradas en .env');
    return null;
  }

  const url = new URL(`${WC_URL}/wp-json/wc/v3/${endpoint}`);
  
  // Agregar parámetros si existen
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  // Autenticación Basic Auth (Base64)
  const auth = btoa(`${WC_KEY}:${WC_SECRET}`);

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Giopromet-Headless/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`WooCommerce API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Error en petición WooCommerce:', error);
    return null;
  }
}

/**
 * Mapea un producto de WooCommerce al formato interno del proyecto
 */
function mapProduct(wcProduct) {
  // Helper para buscar metadatos por clave
  const getMeta = (key) => {
    const meta = wcProduct.meta_data?.find(m => m.key === key);
    return meta ? meta.value : null;
  };

  return {
    id: wcProduct.id.toString(),
    category: wcProduct.categories?.[0]?.slug || 'general',
    categoryLabel: wcProduct.categories?.[0]?.name || 'General',
    categorySlugs: wcProduct.categories?.map(cat => cat.slug) || [],
    title: wcProduct.name,
    subtitle: getMeta('_gp_subtitle') || 'Gadget Premium',
    description: wcProduct.short_description.replace(/<[^>]*>?/gm, ''), // Limpiar HTML
    fullDescription: wcProduct.description.replace(/<[^>]*>?/gm, ''),
    features: wcProduct.attributes?.map(attr => `${attr.name}: ${attr.options.join(', ')}`) || [],
    price: parseInt(wcProduct.price) || 0,
    oldPrice: parseInt(wcProduct.regular_price) || 0,
    stats: {
      rating: getMeta('_gp_rating') || '4.9',
      purchases: getMeta('_gp_sales') || '+1.500',
      location: getMeta('_gp_location') || 'Nacional'
    },
    shipping: { 
      type: 'standard', 
      text: getMeta('_gp_shipping_text') || 'Envío Rápido' 
    },
    image: wcProduct.images?.[0]?.src || '/images-products/placeholder.jpg',
    images: wcProduct.images?.map(img => img.src) || [],
    imageText: wcProduct.name,
    discount: wcProduct.regular_price && wcProduct.price < wcProduct.regular_price 
      ? `-${Math.round((1 - (wcProduct.price / wcProduct.regular_price)) * 100)}%`
      : null,
    slug: wcProduct.slug,
    link: wcProduct.permalink, // Para redirección al checkout
    featured: wcProduct.featured // Booleano de WooCommerce
  };
}

// --- Exportaciones del Servicio ------------------------------------------

export async function getAllProducts() {
  const products = await fetchWC('products', { per_page: 100, status: 'publish' });
  return products ? products.map(mapProduct) : [];
}

export async function getProductById(id) {
  const product = await fetchWC(`products/${id}`);
  return product ? mapProduct(product) : null;
}

export async function getCategories() {
  const categories = await fetchWC('products/categories', { hide_empty: true });
  return categories || [];
}
