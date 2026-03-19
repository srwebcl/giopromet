import React from 'react';
import { CartProvider } from '../context/CartContext.jsx';
import CartPage from './CartPage.jsx';

/**
 * CartPageWithCart envuelve CartPage dentro de su propio CartProvider.
 * Necesario porque en Astro, cada isla client:load es un árbol React independiente.
 */
export default function CartPageWithCart() {
  return (
    <CartProvider>
      <CartPage />
    </CartProvider>
  );
}
