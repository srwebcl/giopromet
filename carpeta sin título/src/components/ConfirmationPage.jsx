import React, { useState, useEffect } from 'react';
import { CheckCircle, Copy, Home, Package } from 'lucide-react';

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

export default function ConfirmationPage({ orderId }) {
  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Buscar la orden en localStorage
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-slate-500 text-lg">Cargando información de tu orden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Cabecera de éxito */}
      <div className="text-center mb-12">
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4" />
        <h1 className="text-5xl font-extrabold text-slate-900 mb-2">¡Pedido Confirmado!</h1>
        <p className="text-xl text-slate-600">
          Gracias por tu compra. Tu pedido ha sido recibido correctamente.
        </p>
      </div>

      {/* Detalles de la orden */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        {/* Número de orden */}
        <div className="flex items-center justify-between mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div>
            <p className="text-sm text-slate-600 mb-1">Número de Orden</p>
            <p className="text-2xl font-black text-blue-600">{orderId}</p>
          </div>
          <button
            onClick={handleCopyOrderId}
            className="p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Copy className={`w-6 h-6 ${copied ? 'text-green-500' : 'text-blue-600'}`} />
          </button>
        </div>

        {/* Email de confirmación */}
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-slate-600 mb-1">Email de Confirmación</p>
          <p className="text-lg font-bold text-slate-900 mb-2">{order.customer.email}</p>
          <p className="text-sm text-green-700">
            ✓ Se ha enviado un email de confirmación con los detalles de tu pedido
          </p>
        </div>

        {/* Fecha y estado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600 mb-1">Fecha de Pedido</p>
            <p className="text-lg font-bold text-slate-900">
              {new Date(order.timestamp).toLocaleDateString('es-CL')}
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600 mb-1">Hora</p>
            <p className="text-lg font-bold text-slate-900">
              {new Date(order.timestamp).toLocaleTimeString('es-CL')}
            </p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-slate-600 mb-1">Estado</p>
            <p className="text-lg font-bold text-green-600">Confirmado</p>
          </div>
        </div>
      </div>

      {/* Datos de envío */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Dirección */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">📍 Dirección de Envío</h3>
          <div className="space-y-2 text-slate-700">
            <p className="font-bold text-slate-900">{order.customer.fullName}</p>
            <p>{order.customer.address}</p>
            <p>{order.customer.city}</p>
            <p className="text-sm">Teléfono: {order.customer.phone}</p>
          </div>
          <p className="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-200">
            Envío Rápido: 2-3 días hábiles
          </p>
        </div>

        {/* Método de pago */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">💳 Método de Pago</h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-xl">
              {order.customer.paymentMethod === 'tarjeta' && '💳'}
              {order.customer.paymentMethod === 'transferencia' && '🏦'}
              {order.customer.paymentMethod === 'paypal' && '🔷'}
            </div>
            <div>
              <p className="font-bold text-slate-900">
                {order.customer.paymentMethod === 'tarjeta' && 'Tarjeta de Crédito/Débito'}
                {order.customer.paymentMethod === 'transferencia' && 'Transferencia Bancaria'}
                {order.customer.paymentMethod === 'paypal' && 'PayPal'}
              </p>
              <p className="text-sm text-slate-600">Procesado correctamente</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen de productos */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        <h3 className="text-lg font-bold text-slate-900 mb-6">📦 Resumen de tu Pedido</h3>

        <div className="space-y-4 mb-6">
          {order.items.map(item => (
            <div key={item.id} className="flex justify-between items-center py-3 border-b border-slate-200 last:border-b-0">
              <div className="flex-1">
                <p className="font-bold text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-600">Cantidad: {item.quantity}</p>
              </div>
              <p className="font-bold text-slate-900 min-w-fit ml-4">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        {/* Total final */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <div className="flex justify-between items-baseline">
            <span className="text-lg font-bold text-slate-900">Total Pagado:</span>
            <span className="text-4xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="/"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg"
        >
          <Home className="w-5 h-5" />
          Volver al Home
        </a>
        <a
          href="#"
          className="flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold py-4 px-6 rounded-xl transition-colors"
        >
          <Package className="w-5 h-5" />
          Rastrear Pedido
        </a>
      </div>

      {/* Nota */}
      <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-xl text-center">
        <p className="text-slate-700">
          <span className="font-bold">📧 Revisa tu email:</span> Hemos enviado una confirmación detallada a <br />
          <span className="font-bold text-amber-700">{order.customer.email}</span>
        </p>
      </div>
    </div>
  );
}
