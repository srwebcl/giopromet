import React from 'react';
import { CartProvider } from '../context/CartContext.jsx';
import CheckoutPage from './CheckoutPage.jsx';

/**
 * CheckoutPageWithCart envuelve CheckoutPage dentro de su propio CartProvider.
 * Necesario porque en Astro, cada isla client:load es un árbol React independiente.
 */
export default function CheckoutPageWithCart() {
  return (
    <CartProvider>
      <CheckoutPage />
    </CartProvider>
  );
}
