import React from 'react';
import { Minus, Plus, Trash2, ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const ImagePlaceholder = ({ text }) => (
  <div className="bg-slate-100 flex items-center justify-center text-center p-2 text-slate-500 font-medium border border-slate-200">
    <span className="text-[10px]">{text}</span>
  </div>
);

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

export default function CartPage() {
  const { cartItems, cartTotal, removeItem, updateQuantity } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-12">Tu Carrito</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200">
          <ShoppingCart className="w-20 h-20 mx-auto text-slate-300 mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Tu carrito está vacío</h2>
          <p className="text-slate-600 mb-8">¡Agrega algunos gadgets para comenzar!</p>
          <a href="/" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Volver al Home
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-6 flex gap-6">
                {/* Imagen */}
                <div className="w-24 h-24 bg-slate-50 rounded-lg overflow-hidden border border-slate-100 flex-shrink-0 flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <ImagePlaceholder text="Img" />
                  )}
                </div>

                {/* Contenido */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 mb-4">
                    {formatPrice(item.price)}
                  </p>

                  {/* Controles */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-slate-100 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-white rounded text-slate-600 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white rounded text-slate-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-red-500 hover:text-red-700 font-bold p-2 rounded transition-colors hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="text-right flex flex-col justify-center">
                  <span className="text-sm text-slate-500 mb-1">Subtotal</span>
                  <span className="text-2xl font-black text-slate-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen lateral */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 h-fit sticky top-24">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Resumen</h2>

            <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-slate-600">{item.title} x{item.quantity}</span>
                  <span className="font-bold text-slate-900">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-300 pt-4 space-y-3">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-bold">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Envío</span>
                <span className="font-bold text-green-600">Gratis</span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-black text-blue-600">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>
            </div>

            <a href="/checkout" className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg active:scale-95 transform hover:scale-105 duration-200 flex items-center justify-center gap-2 block">
              Ir a Checkout
              <ArrowRight className="w-5 h-5" />
            </a>

            <a href="/" className="w-full mt-3 text-center text-blue-600 hover:text-blue-700 font-bold py-2 text-sm transition-colors">
              Continuar Comprando
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
