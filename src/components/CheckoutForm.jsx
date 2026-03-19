import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Shield, Lock, CreditCard, Landmark, Wallet, User, Mail, MapPin, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function CheckoutForm({ onSubmit, isProcessing }) {
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
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (cartItems.length === 0) {
      setErrors({ general: 'El carrito está vacío' });
      return;
    }
    onSubmit(formData);
    setSuccess(true);
  };

  if (success && isProcessing) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-12 text-center shadow-2xl">
        <div className="w-20 h-20 bg-green-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-green-500/30">
          <CheckCircle2 className="w-10 h-10 text-green-400 animate-pulse" />
        </div>
        <h2 className="text-3xl font-black text-white mb-3">¡Pedido Procesado!</h2>
        <p className="text-slate-400">
          Validando transacción segura. Serás redirigido en un momento...
        </p>
        <div className="mt-8 flex justify-center gap-2">
           {[0, 1, 2].map(i => (
             <div key={i} className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
           ))}
        </div>
      </div>
    );
  }

  const InputWrapper = ({ label, name, icon: Icon, type = 'text', placeholder, error }) => (
    <div className="mb-6">
      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-400 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`
            w-full bg-slate-900/50 border rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all
            ${error ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 focus:border-amber-400/50'}
          `}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-red-400 text-xs mt-2 px-1 font-bold">{error}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 sm:p-10 shadow-2xl overflow-hidden relative">
      {/* Decorative background circle */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-amber-400/10 rounded-xl flex items-center justify-center border border-amber-400/20">
          <User className="w-5 h-5 text-amber-400" />
        </div>
        <h2 className="text-2xl font-black text-white">Datos de Envío</h2>
      </div>

      {errors.general && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm font-bold">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {errors.general}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <InputWrapper label="Nombre Completo" name="fullName" icon={User} placeholder="Ej: Juan Pérez" error={errors.fullName} />
        <InputWrapper label="Correo Electrónico" name="email" type="email" icon={Mail} placeholder="juan@ejemplo.com" error={errors.email} />
        <div className="md:col-span-2">
          <InputWrapper label="Dirección de Envío" name="address" icon={MapPin} placeholder="Calle, número, depto..." error={errors.address} />
        </div>
        <InputWrapper label="Ciudad / Comuna" name="city" icon={MapPin} placeholder="Santiago, Providencia..." error={errors.city} />
        <InputWrapper label="Teléfono de Contacto" name="phone" icon={Phone} placeholder="+56 9 1234 5678" error={errors.phone} />
      </div>

      {/* Método de Pago */}
      <div className="mt-6 mb-10">
        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-5 px-1">
          Método de Pago Preferido
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { value: 'tarjeta', label: 'Tarjeta', icon: <CreditCard className="w-5 h-5" /> },
            { value: 'transferencia', label: 'Banco', icon: <Landmark className="w-5 h-5" /> },
            { value: 'paypal', label: 'PayPal', icon: <Wallet className="w-5 h-5" /> }
          ].map(method => (
            <label
              key={method.value}
              className={`
                relative flex items-center justify-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]
                ${formData.paymentMethod === method.value
                  ? 'bg-amber-400 border-amber-400 text-slate-900 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900/50 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                }
              `}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.value}
                checked={formData.paymentMethod === method.value}
                onChange={handleChange}
                className="hidden"
              />
              {method.icon}
              <span className="font-black text-sm uppercase tracking-tight">{method.label}</span>
              {formData.paymentMethod === method.value && (
                 <div className="absolute -top-2 -right-2 bg-slate-900 text-amber-400 rounded-full p-1 border border-amber-400">
                    <CheckCircle2 className="w-3 h-3" />
                 </div>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Términos */}
      <div className="mb-10">
        <label className="group flex items-start gap-4 cursor-pointer">
          <div className="relative flex items-center pt-0.5">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="peer h-6 w-6 opacity-0 absolute cursor-pointer"
            />
            <div className={`
              h-6 w-6 border-2 rounded-lg flex items-center justify-center transition-all
              ${formData.termsAccepted ? 'bg-amber-400 border-amber-400' : 'border-white/20 group-hover:border-white/40'}
            `}>
              {formData.termsAccepted && <CheckCircle2 className="w-4 h-4 text-slate-900" />}
            </div>
          </div>
          <span className="text-sm text-slate-500 leading-snug">
            He leído y acepto los <span className="text-white font-bold underline underline-offset-4 decoration-amber-400/50">términos de servicio</span> y la política de privacidad de Giopromet.
          </span>
        </label>
        {errors.termsAccepted && (
          <p className="text-red-400 text-xs mt-3 font-bold">{errors.termsAccepted}</p>
        )}
      </div>

      {/* Botón Submit */}
      <button
        type="submit"
        disabled={isProcessing}
        className={`
          relative group w-full h-18 flex items-center justify-center gap-3 rounded-2xl py-5
          text-lg font-black tracking-wide transition-all duration-300 overflow-hidden
          ${isProcessing
            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 shadow-amber-500/30 shadow-2xl'
          }
        `}
      >
        {!isProcessing && <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />}

        {isProcessing ? (
          <>
            <div className="w-6 h-6 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
            FINALIZANDO...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            CONFIRMAR PEDIDO SEGURO
          </>
        )}
      </button>

      <div className="mt-6 flex items-center justify-center gap-2 text-slate-600">
        <Shield className="w-4 h-4" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Pago Encriptado AES-256</span>
      </div>
    </form>
  );
}
