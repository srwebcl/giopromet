import React, { useState, useEffect } from 'react';
import { ShoppingCart, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-gradient-to-r from-blue-700 to-blue-600 shadow-lg py-3' : 'bg-gradient-to-r from-blue-700 to-blue-600 py-5 shadow-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 cursor-pointer font-extrabold text-2xl text-white tracking-tight hover:opacity-80 transition-opacity">
          <Zap className="w-6 h-6 text-yellow-300" />
          GIOPROMET
        </a>

        <div className="hidden md:flex gap-8 font-semibold items-center ml-auto mr-8">
          <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="text-white hover:text-yellow-300 transition-colors">
            Inicio
          </button>
          <button onClick={() => scrollToSection('tendencias')} className="text-white hover:text-yellow-300 transition-colors">
            Catálogo
          </button>
          <button className="text-white hover:text-yellow-300 transition-colors">
            Rastrea tu pedido
          </button>
        </div>

        <a
          href="/carrito"
          className="relative bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-colors text-white border border-white/30"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-blue-700 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {cartCount}
            </span>
          )}
        </a>
      </div>
    </nav>
  );
}
