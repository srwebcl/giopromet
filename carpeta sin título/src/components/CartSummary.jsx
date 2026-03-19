import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const ImagePlaceholder = ({ text, className }) => (
  <div className={`bg-slate-100 flex items-center justify-center text-center p-2 text-slate-500 font-medium border border-slate-200 ${className}`}>
    <span className="text-[10px]">{text}</span>
  </div>
);

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

export default function CartSummary({ editable = true, minimal = false }) {
  const { cartItems, cartTotal, removeItem, updateQuantity } = useCart();

  if (minimal) {
    return (
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Resumen del Pedido</h3>
        {cartItems.length === 0 ? (
          <p className="text-slate-500 text-center py-4">Tu carrito está vacío</p>
        ) : (
          <>
            <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-slate-600">{item.title} x{item.quantity}</span>
                  <span className="font-bold text-slate-900">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-200 pt-3">
              <div className="flex justify-between font-bold text-slate-900">
                <span>Total:</span>
                <span className="text-blue-600 text-lg">{formatPrice(cartTotal)}</span>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 h-fit sticky top-24">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Resumen de tu Carrito</h3>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">Tu carrito está vacío</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-4 pb-4 border-b border-slate-100 last:border-b-0">
                <div className="w-16 h-16 bg-slate-50 rounded-lg overflow-hidden border border-slate-100 flex-shrink-0 flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <ImagePlaceholder text="Img" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1 line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="font-bold text-blue-600 text-sm mb-2">{formatPrice(item.price)}</p>
                  {editable && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-slate-100 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-white rounded text-slate-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-white rounded text-slate-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-600 p-1 ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 border-t border-slate-200 pt-4">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-bold">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Envío</span>
              <span className="font-bold text-green-600">Gratis*</span>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-bold text-slate-900">Total</span>
                <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <p className="text-xs text-slate-500">*Envío gratis en compras mayores a $50.000</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
