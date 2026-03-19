import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import CheckoutForm from './CheckoutForm.jsx';
import CartSummary from './CartSummary.jsx';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirigir si el carrito está vacío
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Tu carrito está vacío</h2>
          <p className="text-slate-600 mb-8">Necesitas agregar productos para realizar una compra</p>
          <a href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
            Volver al Home
          </a>
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

    // Redirigir a confirmación
    setTimeout(() => {
      window.location.href = `/confirmacion/${orderId}`;
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-12">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario (Izquierda 60%) */}
        <div className="lg:col-span-2">
          <CheckoutForm onSubmit={handleCheckoutSubmit} />
        </div>

        {/* Resumen (Derecha 40%) */}
        <div className="lg:col-span-1">
          <CartSummary editable={false} />
        </div>
      </div>
    </div>
  );
}
