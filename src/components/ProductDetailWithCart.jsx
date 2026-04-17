import React from 'react';
import { CartProvider } from '../context/CartContext.jsx';
import ProductDetail from './ProductDetail.jsx';

/**
 * ProductDetailWithCart envuelve ProductDetail dentro de su propio CartProvider.
 * Necesario porque en Astro, cada isla client:load es un árbol React independiente.
 */
export default function ProductDetailWithCart({ product, relatedProducts }) {
  return (
    <CartProvider>
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </CartProvider>
  );
}
