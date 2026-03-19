import React from 'react';
import { CartProvider } from '../context/CartContext.jsx';
import Navbar from './Navbar.jsx';

/**
 * NavbarWithCart envuelve Navbar dentro de su propio CartProvider.
 * Necesario porque en Astro, cada isla client:load es un árbol React independiente.
 * El estado del carrito se sincroniza entre islas mediante localStorage.
 */
export default function NavbarWithCart() {
  return (
    <CartProvider>
      <Navbar />
    </CartProvider>
  );
}
