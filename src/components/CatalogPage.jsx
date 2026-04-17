import React, { useState, useMemo, useEffect } from 'react';
import {
  Search, X, ArrowUpDown, ChevronDown,
  TrendingUp, Rocket, Sparkles, LayoutGrid, ShoppingBag,
  Filter, Star, ArrowRight, Zap, CheckCircle2, Shield
} from 'lucide-react';
import { CartProvider, useCart } from '../context/CartContext.jsx';
import ProductCard from './ui/ProductCard.jsx';

const SORT_OPTIONS = [
  { id: 'default',    label: 'Destacados' },
  { id: 'price-asc',  label: 'Menor precio' },
  { id: 'price-desc', label: 'Mayor precio' },
  { id: 'discount',   label: 'Mayor descuento' },
];

const CATEGORY_ICONS = {
  all:        <LayoutGrid className="w-4 h-4" />,
  tendencias: <TrendingUp className="w-4 h-4" />,
  virales:    <Rocket className="w-4 h-4" />,
  gadgets:    <Sparkles className="w-4 h-4" />,
};

function CatalogContent({ allProducts, categories }) {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery]       = useState('');
  const [sortBy, setSortBy]                 = useState('default');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen]             = useState(false);
  const [scrolled, setScrolled]             = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Filtra y ordena ──────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let list = [...allProducts];
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (sortBy === 'price-asc')  list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sortBy === 'discount') {
      list.sort((a, b) => {
        const da = a.oldPrice ? (a.oldPrice - a.price) / a.oldPrice : 0;
        const db = b.oldPrice ? (b.oldPrice - b.price) / b.oldPrice : 0;
        return db - da;
      });
    }
    return list;
  }, [activeCategory, searchQuery, sortBy]);

  const activeSortLabel = SORT_OPTIONS.find(o => o.id === sortBy)?.label ?? 'Ordenar';

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-300 pb-20 overflow-x-hidden relative">
      {/* --- Background decoration blobs (Like Home) --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[180px] opacity-60 pointer-events-none" />
        <div className="absolute top-[30%] left-[-15%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] opacity-40 pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[180px] opacity-40 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff11 1px, transparent 1px), linear-gradient(to bottom, #ffffff11 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      </div>

      <div className="relative z-10 pt-28">
        
        {/* ==========================================
            PREMIUM FILTER BAR
        ========================================== */}
        <div className={`sticky top-[60px] z-40 transition-all duration-500 ${scrolled ? 'py-2' : 'py-6'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`
               bg-[#0d1220]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-3 flex flex-wrap items-center gap-4 shadow-2xl transition-all duration-300
               ${scrolled ? 'mx-0 sm:mx-10 scale-[0.98]' : ''}
            `}>

              {/* Categorías Desktop */}
              <div className="hidden lg:flex items-center gap-1.5 p-1 bg-black/20 rounded-2xl border border-white/5">
                {categories?.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                      flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all
                      ${activeCategory === cat.id
                        ? 'bg-amber-400 text-slate-900 shadow-xl shadow-amber-500/20'
                        : 'text-slate-500 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    {CATEGORY_ICONS[cat.id] || <Sparkles className="w-4 h-4" />}
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Mobile Filter Trigger */}
              <button
                 onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                 className="lg:hidden flex items-center justify-center w-12 h-12 bg-white/5 border border-white/10 rounded-2xl text-amber-400"
              >
                 <Filter className="w-5 h-5" />
              </button>

              {/* Search Input */}
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-amber-400 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-11 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
                >
                  <ArrowUpDown className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">{activeSortLabel}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${sortOpen ? 'rotate-180' : ''}`} />
                </button>

                {sortOpen && (
                  <div className="absolute right-0 top-full mt-4 bg-[#0d1220] border border-white/10 rounded-[1.5rem] overflow-hidden shadow-2xl min-w-[200px] z-50 p-2 animate-fade-in">
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => { setSortBy(opt.id); setSortOpen(false); }}
                        className={`w-full text-left px-5 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${
                          sortBy === opt.id
                            ? 'bg-amber-400 text-slate-900'
                            : 'text-slate-500 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Filters Expanded */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileFiltersOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
               <div className="bg-[#0d1220] border border-white/10 rounded-3xl p-4 mt-4 grid grid-cols-2 gap-2">
                  {categories?.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setMobileFiltersOpen(false); }}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeCategory === cat.id ? 'bg-amber-400 text-slate-900' : 'bg-white/5 text-slate-500 border border-white/5'
                      }`}
                    >
                      {CATEGORY_ICONS[cat.id] || <Sparkles className="w-4 h-4" />}
                      {cat.label}
                    </button>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            RESULTADOS GRID
        ========================================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-10">

          {/* Info de búsqueda */}
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5">
                   <LayoutGrid className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <span className="block text-2xl font-black text-white">
                    {filteredProducts.length} <span className="text-slate-600 font-bold text-lg">Resultados</span>
                  </span>
                  {activeCategory !== 'all' && (
                    <span className="text-xs font-black text-amber-500 uppercase tracking-widest">
                      Categoría: {categories?.find(c => c.id === activeCategory)?.label}
                    </span>
                  )}
                </div>
             </div>

             {(activeCategory !== 'all' || searchQuery) && (
                <button
                  onClick={() => { setActiveCategory('all'); setSearchQuery(''); setSortBy('default'); }}
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-red-400 transition-colors bg-white/5 px-4 py-2 rounded-xl"
                >
                  <X className="w-4 h-4" /> Limpiar
                </button>
             )}
          </div>

          {/* Grid de productos */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 pb-20">
              {filteredProducts.map(product => (
                <div key={product.id} className="animate-fade-in relative z-10">
                  <ProductCard product={product} onAddToCart={addToCart} />
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-40 bg-white/5 rounded-[3rem] border border-white/5 border-dashed relative z-10">
              <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-white/5">
                <Search className="w-10 h-10 text-slate-700" />
              </div>
              <h3 className="text-4xl font-black text-white mb-4">Sin coincidencias</h3>
              <p className="text-slate-500 text-lg mb-10 max-w-sm mx-auto">Prueba con otros filtros o limpia la búsqueda.</p>
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="bg-white/10 hover:bg-white/20 text-white font-black px-10 py-5 rounded-[1.5rem] transition-all border border-white/10"
              >
                MOSTRAR TODO
              </button>
            </div>
          )}
        </div>

        {/* --- CTA Final de Confianza --- */}
        <div className="max-w-4xl mx-auto px-4 mt-20 mb-32 relative z-10">
          <div className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 left-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
             <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
             <Shield className="w-12 h-12 text-amber-400 mx-auto mb-6" />
             <h2 className="text-3xl font-black text-white mb-4">Compra con Confianza</h2>
             <p className="text-slate-400 max-w-xl mx-auto mb-8 font-medium">Garantía de satisfacción y soporte técnico especializado en todos nuestros gadgets.</p>
             <div className="flex flex-wrap justify-center gap-8">
                <div className="flex items-center gap-3 text-white text-xs font-black uppercase tracking-[0.2em]">
                   <Zap className="w-5 h-5 text-amber-400" /> Envío Exprés
                </div>
                <div className="flex items-center gap-3 text-white text-xs font-black uppercase tracking-[0.2em]">
                   <Shield className="w-5 h-5 text-blue-400" /> Pago Seguro
                </div>
                <div className="flex items-center gap-3 text-white text-xs font-black uppercase tracking-[0.2em]">
                   <CheckCircle2 className="w-5 h-5 text-green-400" /> Soporte Real
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage({ allProducts, categories }) {
  return (
    <CartProvider>
      <CatalogContent allProducts={allProducts} categories={categories} />
    </CartProvider>
  );
}
