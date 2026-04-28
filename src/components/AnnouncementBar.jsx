import React from 'react';
import { Truck } from 'lucide-react';

export default function AnnouncementBar() {
  const text = "🚚 ENVÍOS GRATIS A TODO CHILE • RECIBE EN LA PUERTA DE TU CASA • COMPRA SEGURA 🔒 • ";
  
  return (
    <div className="bg-black py-2 overflow-hidden border-b border-amber-400/20 relative z-[150]">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {/* Repetimos el texto varias veces para el efecto infinito */}
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-amber-400 font-black text-xs tracking-[0.2em] uppercase flex items-center gap-4 px-4">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
