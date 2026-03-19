import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import CheckoutForm from './CheckoutForm.jsx';
import CartSummary from './CartSummary.jsx';
import { ShoppingCart, ArrowLeft, Zap, Shield, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirigir si el carrito está vacío
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#080c14] text-slate-300 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-24 bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/10 shadow-2xl">
            <div className="w-24 h-24 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/5">
              <ShoppingCart className="w-10 h-10 text-slate-700" />
            </div>
            <h2 className="text-3xl font-black text-white mb-3">Tu carrito está vacío</h2>
            <p className="text-slate-500 mb-10 max-w-sm mx-auto">No puedes realizar un pago sin productos en tu carrito.</p>
            <a
              href="/catalogo"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-black py-4 px-8 rounded-2xl transition-all shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
              Ver Productos
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handleCheckoutSubmit = (formData) => {
    setIsProcessing(true);

    // Generar ID de orden único
    const orderId = `ORD-${new Date().toISOString().slice(0, 10)}-${Date.now().toString().slice(-4)}`;

    // Guardar orden en localStorage
    const order = {
      id: orderId,
      timestamp: new Date().toISOString(),
      customer: formData,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    // Obtener órdenes existentes
    const existingOrders = JSON.parse(localStorage.getItem('giopromet_orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('giopromet_orders', JSON.stringify(existingOrders));

    // Limpiar carrito
    clearCart();

    // Redirigir a confirmación (estático con query param)
    setTimeout(() => {
      window.location.href = `/confirmacion?id=${orderId}`;
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-300 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-4">
              <Lock className="w-3.5 h-3.5" />
              Pago Seguro SSL
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none">
              Finalizar <span className="text-shimmer">Compra</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
             <Shield className="w-6 h-6 text-green-500" />
             <div className="text-left">
               <div className="text-white font-bold text-sm">Transacción Protegida</div>
               <div className="text-slate-500 text-[10px] uppercase font-black">Cifrado de 256 bits</div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Formulario (Izquierda 60%) */}
          <div className="lg:col-span-2">
            <CheckoutForm onSubmit={handleCheckoutSubmit} isProcessing={isProcessing} />
          </div>

          {/* Resumen (Derecha 40%) */}
          <div className="lg:col-span-1">
            <CartSummary editable={false} />

            {/* Trust badges footer checkout */}
            <div className="mt-8 space-y-4 px-4">
               <div className="flex items-center gap-3 text-slate-500">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">Aprobación instantánea</span>
               </div>
               <div className="flex items-center gap-3 text-slate-500">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">Garantía de reembolso 30 días</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
