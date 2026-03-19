import React, { useState } from 'react';
import { ShoppingCart, Truck, Globe, ArrowRight, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const ImagePlaceholder = ({ text }) => (
  <div className="bg-slate-100 flex items-center justify-center h-64 text-slate-500 font-medium border-2 border-dashed border-slate-200">
    <div className="flex flex-col items-center gap-2">
      <ShoppingCart className="w-8 h-8 text-slate-300 mb-2" />
      <span>{text}</span>
    </div>
  </div>
);

const ShippingTag = ({ type, text }) => {
  if (type === 'fast') {
    return (
      <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-bold px-3 py-1.5 rounded-lg">
        <Truck className="w-4 h-4" />
        {text}
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1.5 rounded-lg">
      <Globe className="w-4 h-4" />
      {text}
    </div>
  );
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

export default function ProductDetail({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const discount = product.discount ? product.discount : '-' + Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) + '%';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="mb-8 text-slate-500 text-sm">
        <a href="/" className="hover:text-slate-900">Home</a> /
        <span className="ml-2 text-slate-900 font-bold">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Imagen */}
        <div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 mb-4 sticky top-24">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-cover aspect-square"
              />
            ) : (
              <ImagePlaceholder text={product.imageText} />
            )}
          </div>
          {product.discount && (
            <div className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white font-black px-4 py-2 rounded-full text-lg">
              {product.discount}
            </div>
          )}
        </div>

        {/* Contenido */}
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
            {product.title}
          </h1>

          {/* Precios */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-5xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </span>
            <span className="text-2xl text-slate-400 line-through font-bold">
              {formatPrice(product.oldPrice)}
            </span>
          </div>

          {/* Descripción */}
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            {product.fullDescription || product.description}
          </p>

          {/* Características */}
          {product.features && product.features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Características:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Envío */}
          <div className="mb-8">
            <ShippingTag type={product.shipping.type} text={product.shipping.text} />
          </div>

          {/* Contenedor de compra */}
          <div className="bg-slate-50 rounded-xl p-6 mb-6 border border-slate-200">
            {/* Cantidad */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-900 mb-3">
                Cantidad
              </label>
              <div className="flex items-center bg-white border border-slate-300 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-slate-100 text-slate-600 transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-12 text-center font-bold text-l text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-slate-100 text-slate-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Botón agregar */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 ${
                isAdded
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 shadow-lg shadow-amber-500/30'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-6 h-6" />
                  ¡Agregado!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-6 h-6" />
                  Agregar al Carrito
                </>
              )}
            </button>
          </div>

          {/* Cuadro de seguridad */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-sm font-bold text-slate-900">🔒 Compra 100% Segura</p>
            <p className="text-xs text-slate-600 mt-1">Tus datos de pago están protegidos</p>
          </div>
        </div>
      </div>

      {/* Sección de productos relacionados */}
      <div className="border-t border-slate-200 pt-16">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Productos Relacionados</h2>
        {/* Este componente necesitaría pasar productos relacionados como prop */}
      </div>
    </div>
  );
}
