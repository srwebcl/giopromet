import React, { useState, useEffect } from 'react';
import { CheckCircle, Copy, Home, Package, Zap, ShoppingBag, Truck, Mail, ShieldCheck } from 'lucide-react';

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

export default function ConfirmationPage({ orderId }) {
  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('giopromet_orders') || '[]');
    const foundOrder = orders.find(o => o.id === orderId);
    setOrder(foundOrder);
  }, [orderId]);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-[#080c14] text-slate-300 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-24 bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/10 shadow-2xl">
            <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <p className="text-slate-500 font-black uppercase tracking-widest">Cargando Pedido...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-300 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Cabecera de éxito ── */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative inline-flex items-center justify-center w-24 h-24 bg-green-500/20 rounded-[2rem] border border-green-500/30 mb-8 shadow-2xl shadow-green-500/20 animate-bounce">
             <CheckCircle className="w-12 h-12 text-green-400" />
          </div>

          <h1 className="text-5xl sm:text-6xl font-black text-white leading-none mb-4">
            ¡Pedido <span className="text-shimmer">Confirmado</span>!
          </h1>
          <p className="text-xl text-slate-400 max-w-lg mx-auto leading-relaxed">
            Gracias por confiar en Giopromet. Tu solicitud ha sido procesada con éxito y estamos preparando tu envío.
          </p>
        </div>

        {/* ── Card de Información General ── */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 sm:p-10 mb-8 shadow-2xl overflow-hidden relative">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />

          {/* ID de Orden */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 p-6 bg-slate-900/50 border border-white/5 rounded-3xl">
            <div>
              <p className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest mb-1 text-center sm:text-left">Número de seguimiento interno</p>
              <p className="text-2xl sm:text-3xl font-black text-amber-400 text-center sm:text-left">{orderId}</p>
            </div>
            <button
              onClick={handleCopyOrderId}
              className={`
                group h-14 flex items-center gap-3 px-6 rounded-2xl font-black text-sm transition-all
                ${copied ? 'bg-green-500 text-slate-900' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}
              `}
            >
              {copied ? (
                 <> <CheckCircle className="w-5 h-5" /> COPIADO </>
              ) : (
                 <> <Copy className="w-5 h-5 group-hover:scale-110 transition-transform" /> COPIAR ID </>
              )}
            </button>
          </div>

          {/* Estado y Tiempos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
               { label: 'Fecha', val: new Date(order.timestamp).toLocaleDateString('es-CL'), icon: <Zap className="w-4 h-4 text-amber-400" /> },
               { label: 'Hora', val: new Date(order.timestamp).toLocaleTimeString('es-CL'), icon: <Zap className="w-4 h-4 text-amber-400" /> },
               { label: 'Estado', val: 'Confirmado', icon: <Package className="w-4 h-4 text-green-400" />, highlight: true },
            ].map((st, i) => (
               <div key={i} className="p-5 bg-white/5 border border-white/5 rounded-2xl flex flex-col items-center text-center">
                  <div className="mb-2 opacity-50">{st.icon}</div>
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">{st.label}</span>
                  <span className={`text-sm font-black ${st.highlight ? 'text-green-400' : 'text-white'}`}>{st.val}</span>
               </div>
            ))}
          </div>

          {/* Info de Email */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-green-500/5 border border-green-500/10 rounded-3xl group">
             <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-green-400" />
             </div>
             <div className="text-center sm:text-left flex-1 min-w-0">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Confirmación enviada a</p>
                <p className="text-lg font-black text-white truncate">{order.customer.email}</p>
                <p className="text-xs text-green-500/70 mt-1 font-bold italic">✓ Hemos enviado los detalles y link de rastreo.</p>
             </div>
          </div>
        </div>

        {/* ── Datos de Envío y Pago ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 shadow-xl">
            <h3 className="text-lg font-black text-white mb-6 flex items-center gap-3">
               <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20">
                  <Truck className="w-4 h-4 text-blue-400" />
               </div>
               Envío
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/40 rounded-2xl border border-white/5">
                 <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-2">Destinatario</p>
                 <p className="text-base font-bold text-white">{order.customer.fullName}</p>
              </div>
              <div className="p-4 bg-slate-900/40 rounded-2xl border border-white/5">
                 <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-2">Dirección Completa</p>
                 <p className="text-base font-bold text-white leading-snug">{order.customer.address}, {order.customer.city}</p>
              </div>
              <p className="text-[10px] font-bold text-slate-500 py-2 border-t border-white/5 mt-4">TIEMPO ESTIMADO: 2-3 DÍAS HÁBILES</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 shadow-xl">
             <h3 className="text-lg font-black text-white mb-6 flex items-center gap-3">
               <div className="w-8 h-8 bg-amber-400/10 rounded-lg flex items-center justify-center border border-amber-400/20">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
               </div>
               Pago
            </h3>
            <div className="flex items-center gap-5 p-6 bg-slate-900/40 border border-white/5 rounded-3xl h-[calc(100%-80px)]">
              <div className="text-3xl grayscale brightness-125">
                {order.customer.paymentMethod === 'tarjeta' && '💳'}
                {order.customer.paymentMethod === 'transferencia' && '🏥'}
                {order.customer.paymentMethod === 'paypal' && '🏦'}
              </div>
              <div>
                <p className="text-lg font-black text-white leading-tight">
                  {order.customer.paymentMethod === 'tarjeta' && 'Tarjeta Crédito/Débito'}
                  {order.customer.paymentMethod === 'transferencia' && 'Transf. Bancaria'}
                  {order.customer.paymentMethod === 'paypal' && 'PayPal'}
                </p>
                <p className="text-[10px] font-black text-green-400 uppercase tracking-widest mt-1">Transacción Certificada</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Resumen de Items ── */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 sm:p-10 mb-12 shadow-2xl relative overflow-hidden">
           <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3 tracking-tight">
             <ShoppingBag className="w-6 h-6 text-amber-400" />
             Resumen del Pedido
           </h3>

           <div className="space-y-4 mb-10 pr-2">
             {order.items.map(item => (
               <div key={item.id} className="group flex items-center justify-between py-4 border-b border-white/5 last:border-b-0">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-white/5 flex-shrink-0 group-hover:border-amber-400/30 transition-colors">
                       <span className="text-[10px] font-black text-white italic">P</span>
                    </div>
                    <div className="truncate">
                      <p className="text-sm sm:text-base font-black text-white truncate">{item.title}</p>
                      <p className="text-[10px] sm:text-xs font-bold text-slate-500">CANTIDAD: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                     <p className="text-sm sm:text-base font-black text-white">{formatPrice(item.price * item.quantity)}</p>
                  </div>
               </div>
             ))}
           </div>

           {/* Total final */}
           <div className="bg-amber-400/5 border border-amber-400/20 rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl translate-x-12 -translate-y-12" />
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end relative z-10 gap-4">
                <div className="text-center sm:text-left">
                   <p className="text-[10px] font-black text-amber-400 uppercase tracking-[0.3em] mb-2">Monto Total Pagado</p>
                   <div className="text-5xl font-black text-white leading-none tracking-tighter">
                     {formatPrice(order.total)}
                   </div>
                </div>
                <div className="flex flex-col items-center sm:items-end gap-1 opacity-50">
                  <ShieldCheck className="w-5 h-5 text-white" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest text-center sm:text-right">Iva e Impuestos Incluidos</span>
                </div>
              </div>
           </div>
        </div>

        {/* ── Acciones Finales ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="/"
            className="group flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black py-5 px-8 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            VOLVER AL HOME
          </a>
          <a
            href="/catalogo"
            className="group flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-black py-5 px-8 rounded-2xl transition-all shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            SEGUIR COMPRANDO
          </a>
        </div>
      </div>
    </div>
  );
}
