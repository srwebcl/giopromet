import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function CheckoutForm({ onSubmit }) {
  const { cartItems } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    phone: '',
    paymentMethod: 'tarjeta',
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'El nombre es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.address.trim()) newErrors.address = 'La dirección es requerida';
    if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'Debes aceptar los términos';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Limpiar error cuando empiezan a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (cartItems.length === 0) {
      setErrors({ general: 'El carrito está vacío' });
      return;
    }

    setIsSubmitting(true);

    // Simular delay de envío
    setTimeout(() => {
      onSubmit(formData);
      setSuccess(true);
      setIsSubmitting(false);
    }, 800);
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">¡Pedido procesado!</h2>
        <p className="text-slate-600">
          Serás redirigido a la página de confirmación en un momento...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Datos de Envío</h2>

      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
          <AlertCircle className="w-5 h-5" />
          {errors.general}
        </div>
      )}

      {/* Nombre Completo */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-slate-900 mb-2">
          Nombre Completo
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            errors.fullName
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-300 focus:ring-blue-500'
          }`}
          placeholder="Tu nombre"
        />
        {errors.fullName && (
          <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-slate-900 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            errors.email
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-300 focus:ring-blue-500'
          }`}
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Dirección */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-slate-900 mb-2">
          Dirección
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            errors.address
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-300 focus:ring-blue-500'
          }`}
          placeholder="Calle, número, apartamento"
        />
        {errors.address && (
          <p className="text-red-600 text-sm mt-1">{errors.address}</p>
        )}
      </div>

      {/* Ciudad */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-slate-900 mb-2">
          Ciudad
        </label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            errors.city
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-300 focus:ring-blue-500'
          }`}
          placeholder="Santiago, Valparaíso..."
        />
        {errors.city && (
          <p className="text-red-600 text-sm mt-1">{errors.city}</p>
        )}
      </div>

      {/* Teléfono */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-slate-900 mb-2">
          Teléfono
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            errors.phone
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-300 focus:ring-blue-500'
          }`}
          placeholder="+56 912345678"
        />
        {errors.phone && (
          <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Método de Pago */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-slate-900 mb-3">
          Método de Pago
        </label>
        <div className="space-y-3">
          {[
            { value: 'tarjeta', label: '💳 Tarjeta de Crédito/Débito' },
            { value: 'transferencia', label: '🏦 Transferencia Bancaria' },
            { value: 'paypal', label: '🔷 PayPal' }
          ].map(method => (
            <label key={method.value} className="flex items-center p-3 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value={method.value}
                checked={formData.paymentMethod === method.value}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-3 text-slate-900 font-medium">{method.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Términos */}
      <div className="mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="mt-1 h-4 w-4 text-blue-600 rounded"
          />
          <span className="text-sm text-slate-600">
            Acepto los <span className="font-bold text-slate-900">términos y condiciones</span> y la <span className="font-bold text-slate-900">política de privacidad</span>
          </span>
        </label>
        {errors.termsAccepted && (
          <p className="text-red-600 text-sm mt-2">{errors.termsAccepted}</p>
        )}
      </div>

      {/* Botón Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-400 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg active:scale-95 transform hover:scale-105 duration-200 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Procesando...
          </>
        ) : (
          <>✓ Confirmar Pedido</>
        )}
      </button>

      <p className="text-xs text-slate-500 text-center mt-4">
        🔒 Pago 100% seguro. Tus datos están protegidos.
      </p>
    </form>
  );
}
