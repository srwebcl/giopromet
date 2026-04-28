import React, { useState, useEffect } from 'react';
import { ShoppingCart, Zap, Menu, X, ArrowRight, Instagram, Facebook } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import AnnouncementBar from './AnnouncementBar.jsx';

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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    
    checkMobile();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    setCurrentPath(window.location.pathname);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  const isActive = (href) => {
    if (href.startsWith('/#')) return currentPath === '/';
    return currentPath === href || currentPath.startsWith(href);
  };

  return (
    <header className="fixed w-full z-[100] top-0 left-0">
      <AnnouncementBar />
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled || menuOpen || isMobile
            ? 'bg-[#060910] border-b border-white/8 shadow-2xl py-3'
            : 'bg-transparent py-5'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative z-[110]">
        {/* Logo */}
        <a href="/" onClick={() => setMenuOpen(false)} className="hover:opacity-85 transition-opacity flex-shrink-0">
          <img src="/logo.webp" alt="Giopromet" className="h-12 md:h-20 w-auto object-contain" />
        </a>

        {/* Links desktop */}
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

        {/* Action icons */}
        <div className="flex items-center gap-2 ml-6">
          <a
            href="/carrito"
            onClick={() => setMenuOpen(false)}
            className="relative flex items-center justify-center w-11 h-11 bg-white/8 hover:bg-white/15 border border-white/15 hover:border-amber-400/40 rounded-xl transition-all"
            aria-label="Carrito"
          >
            <ShoppingCart className="w-5 h-5 text-slate-300" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-900 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#060910] shadow-lg">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 bg-white/8 border border-white/15 rounded-xl text-slate-300 hover:text-white hover:bg-white/15 transition-all"
            aria-label="Cerrar/Abrir Menú"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menú móvil Pro (Fondo Sólido) */}
      <div
        className={`fixed inset-0 bg-[#060910] z-[105] transition-all duration-300 ease-out md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col pt-32 pb-12 px-8 overflow-y-auto">
          {/* Navigation links */}
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`
                  flex items-center justify-between py-6 group border-b border-white/5
                  ${isActive(link.href) ? 'text-amber-400' : 'text-white'}
                `}
              >
                <div className="flex flex-col">
                  <span className="text-3xl font-black uppercase tracking-tight">{link.label}</span>
                  {link.highlight && <span className="text-[10px] text-amber-500 font-bold tracking-[0.3em] mt-1">NUESTRO CATÁLOGO COMPLETO</span>}
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${isActive(link.href) ? 'bg-amber-400 border-amber-400 text-slate-900' : 'bg-white/5 border-white/10 text-white'}`}>
                  <ArrowRight className="w-6 h-6" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-10">
            {/* Social icons */}
            <div>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Redes Oficiales</p>
              <div className="flex gap-4">
                <a href="#" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 border border-white/10 transition-all">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 border border-white/10 transition-all">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-white/5">
               <p className="text-slate-600 text-[10px] uppercase font-bold tracking-widest">© 2026 GIOPROMET STORE</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </header>
  );
}
