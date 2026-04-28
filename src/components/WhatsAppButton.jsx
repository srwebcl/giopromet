import React, { useState, useEffect } from 'react';

const PHONE = '56957891186';

function getContextualMessage() {
  if (typeof window === 'undefined') return '¡Hola! Tengo una consulta sobre sus productos.';

  const path = window.location.pathname;
  const title = document.title || '';

  // Página de producto individual
  if (path.startsWith('/producto/')) {
    const productName = document.querySelector('h1')?.innerText?.trim();
    if (productName) {
      return `¡Hola! Estoy viendo el producto *${productName}* en Giopromet y quiero más información. ¿Está disponible?`;
    }
    return '¡Hola! Estoy viendo un producto en Giopromet y quiero más información. ¿Pueden ayudarme?';
  }

  // Carrito
  if (path === '/carrito') {
    return '¡Hola! Tengo productos en mi carrito y quiero finalizar mi compra. ¿Pueden ayudarme con el proceso?';
  }

  // Catálogo
  if (path === '/catalogo') {
    return '¡Hola! Estoy explorando el catálogo de Giopromet. ¿Pueden recomendarme algo según mis necesidades?';
  }

  // Confirmación de compra
  if (path.includes('confirmacion') || path.includes('order')) {
    return '¡Hola! Acabo de realizar una compra en Giopromet. Quiero hacer seguimiento a mi pedido.';
  }

  // Home / default
  return '¡Hola! Estoy visitando Giopromet y me gustaría recibir asesoría personalizada sobre sus productos.';
}

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  // Aparece tras 2 segundos de carga
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // Muestra tooltip persuasivo después de 4 segundos (solo una vez)
  useEffect(() => {
    if (!visible || tooltipDismissed) return;
    const t = setTimeout(() => setShowTooltip(true), 4000);
    return () => clearTimeout(t);
  }, [visible, tooltipDismissed]);

  // Oculta el tooltip tras 6 segundos
  useEffect(() => {
    if (!showTooltip) return;
    const t = setTimeout(() => {
      setShowTooltip(false);
      setTooltipDismissed(true);
    }, 6000);
    return () => clearTimeout(t);
  }, [showTooltip]);

  const handleClick = () => {
    const msg = encodeURIComponent(getContextualMessage());
    window.open(`https://wa.me/${PHONE}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Tooltip persuasivo */}
      {showTooltip && (
        <div
          className="relative max-w-[220px] bg-white text-slate-800 text-sm font-medium px-4 py-3 rounded-2xl shadow-2xl border border-slate-100 animate-bounce-in"
          style={{
            animation: 'slideInTooltip 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
          }}
        >
          <button
            onClick={() => { setShowTooltip(false); setTooltipDismissed(true); }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-slate-200 hover:bg-slate-300 rounded-full text-slate-500 text-xs flex items-center justify-center transition-colors"
            aria-label="Cerrar"
          >
            ×
          </button>
          💬 ¿Tienes dudas? <span className="text-green-600 font-bold">Escríbenos</span>, te respondemos al instante.
          {/* Flecha del tooltip */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-slate-100 rotate-45" />
        </div>
      )}

      {/* Botón principal */}
      <button
        onClick={handleClick}
        aria-label="Contactar por WhatsApp"
        className="group relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          boxShadow: '0 8px 32px rgba(37, 211, 102, 0.45), 0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        {/* Anillo de pulso */}
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-25"
          style={{ background: '#25D366' }}
        />
        {/* Ícono WhatsApp SVG oficial */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-8 h-8 fill-white drop-shadow"
        >
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.47.67 4.82 1.84 6.83L2 30l7.38-1.82A13.94 13.94 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.84-1.6l-.42-.25-4.38 1.08 1.1-4.27-.27-.44A11.46 11.46 0 0 1 4.5 16C4.5 9.65 9.65 4.5 16 4.5S27.5 9.65 27.5 16 22.35 27.5 16 27.5zm6.3-8.57c-.35-.17-2.05-1.01-2.37-1.13-.32-.11-.55-.17-.78.17-.23.35-.88 1.13-1.08 1.36-.2.23-.39.26-.74.09-.35-.17-1.47-.54-2.8-1.73-1.03-.92-1.73-2.06-1.93-2.4-.2-.35-.02-.53.15-.7.15-.15.35-.39.52-.59.17-.2.23-.35.35-.58.12-.23.06-.44-.03-.62-.09-.17-.78-1.88-1.07-2.57-.28-.68-.57-.58-.78-.59h-.66c-.23 0-.6.09-.91.44-.32.35-1.21 1.18-1.21 2.88s1.24 3.34 1.41 3.57c.17.23 2.44 3.73 5.91 5.23.83.36 1.47.57 1.98.73.83.26 1.58.23 2.18.14.66-.1 2.05-.84 2.34-1.65.29-.81.29-1.5.2-1.65-.08-.15-.31-.23-.66-.4z" />
        </svg>
      </button>

      <style>{`
        @keyframes slideInTooltip {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
