import React from 'react';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 py-20 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-2 font-extrabold text-2xl text-white tracking-tight mb-4">
              <Zap className="w-6 h-6 text-blue-500" />
              GIOPROMET
            </div>
            <p className="text-slate-400 text-sm">Los gadgets más innovadores al mejor precio 🌟</p>
          </div>

          {/* Productos */}
          <div>
            <h4 className="font-bold text-white mb-4">📦 CATEGORÍAS</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">🔥 Tendencias</li>
              <li className="hover:text-white cursor-pointer transition-colors">🚀 Virales</li>
              <li className="hover:text-white cursor-pointer transition-colors">✨ Complementarios</li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="font-bold text-white mb-4">🛟 SOPORTE</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">📧 Contacto</li>
              <li className="hover:text-white cursor-pointer transition-colors">❓ Preguntas FAQ</li>
              <li className="hover:text-white cursor-pointer transition-colors">🚚 Rastreo</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-4">⚖️ LEGAL</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">📋 Términos</li>
              <li className="hover:text-white cursor-pointer transition-colors">🔒 Privacidad</li>
              <li className="hover:text-white cursor-pointer transition-colors">🛡️ Garantía</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">© 2026 GIOPROMET. Todos los derechos reservados 📝</p>
            <div className="flex gap-4">
              <button className="text-2xl hover:scale-125 transition-transform">📱</button>
              <button className="text-2xl hover:scale-125 transition-transform">💻</button>
              <button className="text-2xl hover:scale-125 transition-transform">📸</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
