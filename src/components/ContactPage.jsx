import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageCircle, Phone, MapPin, Globe } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 5000); // Reset mensaje de éxito
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-300 pt-32 pb-24">
      {/* Background decorations */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 text-amber-400 font-black text-[10px] tracking-widest uppercase px-5 py-2 rounded-full mb-6">
            <Globe className="w-3.5 h-3.5" />
            Atención Directa desde Chile
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Estamos para <span className="text-shimmer">Ayudarte</span></h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            ¿Tienes dudas sobre un producto, despacho o quieres consultar por ventas al por mayor? Escríbenos y te responderemos en minutos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Details Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:border-amber-400/30 transition-all group">
              <div className="w-14 h-14 bg-amber-400/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">Correo Electrónico</h3>
              <p className="text-slate-500 text-sm mb-4">Envíanos un mensaje formal para cualquier consulta oficial.</p>
              <a href="mailto:soporte@giopromet.cl" className="text-amber-400 font-bold hover:underline">
                soporte@giopromet.cl
              </a>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:border-green-500/30 transition-all group">
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">WhatsApp Directo</h3>
              <p className="text-slate-500 text-sm mb-4">Soporte rápido para dudas inmediatas sobre tus pedidos.</p>
              <a href="https://wa.me/56912345678" target="_blank" rel="noopener" className="text-green-500 font-bold hover:underline">
                +56 9 1234 5678
              </a>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] opacity-60">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">Oficinas</h3>
              <p className="text-slate-500 text-sm">Distribución a todo Chile desde Santiago.</p>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
               {/* Decorative glow */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-20" />

               {isSent ? (
                 <div className="text-center py-12 animate-slide-up">
                    <div className="w-20 h-20 bg-green-500/20 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                       <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-4">¡Mensaje Enviado!</h2>
                    <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                      Gracias por contactarnos. Un especialista de nuestro equipo se comunicará contigo lo antes posible.
                    </p>
                    <button 
                      onClick={() => setIsSent(false)}
                      className="text-amber-400 font-bold hover:underline"
                    >
                      Enviar otro mensaje
                    </button>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Tu Nombre</label>
                          <input
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-400/50 transition-all"
                            placeholder="Ej: Juan Pérez"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Tu Email</label>
                          <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-400/50 transition-all"
                            placeholder="juan@ejemplo.com"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Motivo de contacto</label>
                       <select
                         name="subject"
                         value={formData.subject}
                         onChange={handleChange}
                         className="w-full bg-slate-900 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-400/50 transition-all"
                       >
                         <option value="">Selecciona un motivo</option>
                         <option value="pedido">Consulta sobre mi pedido</option>
                         <option value="producto">Información de producto</option>
                         <option value="vmayor">Ventas al por mayor</option>
                         <option value="otro">Otro motivo</option>
                       </select>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Mensaje</label>
                       <textarea
                         required
                         rows="5"
                         name="message"
                         value={formData.message}
                         onChange={handleChange}
                         className="w-full bg-slate-900 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-400/50 transition-all resize-none"
                         placeholder="Escribe aquí tu mensaje..."
                       />
                    </div>

                    <button
                      disabled={isSubmitting}
                      className={`
                        w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all
                        ${isSubmitting ? 'bg-slate-800 text-slate-600 scale-98' : 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.02]'}
                      `}
                    >
                      {isSubmitting ? (
                        <>Procesando...</>
                      ) : (
                        <>
                          ENVIAR MENSAJE
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                 </form>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
