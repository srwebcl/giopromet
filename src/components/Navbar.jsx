import React, { useState, useEffect } from 'react';
import { ShoppingCart, Zap, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const NAV_LINKS = [
  { label: '⭐ Más Vendido', href: '/#hero' },
  { label: '🔥 Tendencias',  href: '/#tendencias' },
  { label: '🚀 Virales',     href: '/#virales' },
  { label: '✨ Gadgets',     href: '/#gadgets' },
  { label: '🛍️ Catálogo',   href: '/catalogo', highlight: true },
];

export default function Navbar() {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    setCurrentPath(window.location.pathname);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href) => {
    if (href.startsWith('/#')) return currentPath === '/';
    return currentPath === href || currentPath.startsWith(href);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || menuOpen
          ? 'bg-[#060910]/96 backdrop-blur-md border-b border-white/8 shadow-2xl shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

        {/* ── Logo ── */}
        <a href="/" className="flex items-center gap-2.5 font-extrabold text-xl text-white tracking-tight hover:opacity-85 transition-opacity flex-shrink-0">
          <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Zap className="w-5 h-5 text-slate-900" />
          </div>
          GIOPROMET
        </a>

        {/* ── Links desktop ── */}
        <div className="hidden md:flex items-center gap-1 ml-auto">
          {NAV_LINKS.map((link) => (
            link.highlight ? (
              <a
                key={link.label}
                href={link.href}
                className={`flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl transition-all border ${
                  isActive(link.href)
                    ? 'bg-amber-400 text-slate-900 border-amber-300 shadow-lg shadow-amber-500/20'
                    : 'bg-amber-400/15 text-amber-300 border-amber-400/30 hover:bg-amber-400/25 hover:border-amber-400/50'
                }`}
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
                  isActive(link.href)
                    ? 'text-white bg-white/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/8'
                }`}
              >
                {link.label}
              </a>
            )
          ))}
        </div>

        {/* ── Carrito + hamburger ── */}
        <div className="flex items-center gap-2 ml-6">
          <a
            href="/carrito"
            className="relative flex items-center justify-center w-11 h-11 bg-white/8 hover:bg-white/15 border border-white/15 hover:border-amber-400/40 backdrop-blur-sm rounded-xl transition-all group"
            aria-label="Carrito de compras"
          >
            <ShoppingCart className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-900 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#060910] shadow-lg animate-pulse-ring">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 bg-white/8 border border-white/15 rounded-xl text-slate-300 hover:text-white hover:bg-white/15 transition-all"
            aria-label="Menú"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Menú móvil ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-white/8 px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center text-sm font-semibold px-4 py-3 rounded-xl transition-all ${
                link.highlight
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30 hover:bg-amber-400/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/8'
              }`}
            >
              {link.label}
              {link.highlight && <ChevronDown className="ml-auto w-4 h-4 -rotate-90" />}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
