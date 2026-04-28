import React from 'react';
import { Zap, ShoppingBag, Headphones, FileText, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#060910] border-t border-white/8 text-slate-400">


      {/* Grid principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Marca */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <img src="/logo.png" alt="Giopromet" className="h-10 w-auto" />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              Los gadgets más innovadores al mejor precio. Tecnología que transforma tu vida.
            </p>
            <div className="flex gap-3">
              {['📱', '💻', '📸'].map((em, i) => (
                <button
                  key={i}
                  className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-lg hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110"
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="flex items-center gap-2 font-bold text-white mb-5 text-sm uppercase tracking-wider">
              <ShoppingBag className="w-4 h-4 text-amber-400" /> Catálogo
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: '🔥 Tendencias', href: '/#tendencias' },
                { label: '🚀 Virales', href: '/' },
                { label: '✨ Complementarios', href: '/' },
                { label: '🛒 Carrito', href: '/carrito' },
              ].map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="hover:text-amber-300 transition-colors duration-200">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="flex items-center gap-2 font-bold text-white mb-5 text-sm uppercase tracking-wider">
              <Headphones className="w-4 h-4 text-blue-400" /> Soporte
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: '📧 Contacto', href: '/contacto' },
                { label: '❓ Preguntas FAQ', href: '/#faq' },
                { label: '🚚 Rastreo de pedido', href: '/#rastreo' },
                { label: '🔄 Cambios y devoluciones', href: '/garantia-y-devoluciones' },
              ].map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="hover:text-white transition-colors duration-200">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="flex items-center gap-2 font-bold text-white mb-5 text-sm uppercase tracking-wider">
              <FileText className="w-4 h-4 text-purple-400" /> Legal
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: '📋 Términos y condiciones', href: '/terminos-y-condiciones' },
                { label: '🔒 Política de privacidad', href: '/politica-de-privacidad' },
                { label: '🛡️ Garantía y devoluciones', href: '/garantia-y-devoluciones' },
              ].map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="hover:text-white transition-colors duration-200">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">© 2026 GIOPROMET. Todos los derechos reservados.</p>
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-1.5">🔒 SSL Seguro</span>
            <span className="w-px h-4 bg-white/10" />
            <span className="flex items-center gap-1.5">Desarrollado por ⚡ <span className="text-amber-400 font-bold uppercase tracking-widest">SRweb</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
