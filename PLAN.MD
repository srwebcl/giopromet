# 🚀 PLAN MAESTRO: GIOPROMET E-COMMERCE (Astro + React)

## 🎯 Objetivo del Proyecto
Desarrollar un e-commerce prototipo funcional, ultrarrápido y orientado a la alta conversión (CRO) para productos de Tecnología, Salud, Fitness y Virales. 

## 🛠️ Stack Tecnológico
* **Framework:** Astro (SSG/SSR)
* **UI Library:** React.js
* **Estilos:** Tailwind CSS
* **Iconos:** Lucide React
* **Estado:** React Context + LocalStorage
* **Despliegue:** Vercel / Netlify (Por definir)

## 📋 Estado Actual
✅ Setup básico de Astro + React + Tailwind.
✅ Datos hardcodeados (`src/data/products.js`).
✅ Páginas base creadas (`index`, `carrito`, `checkout`, `producto/[id]`, `confirmacion/[orderId]`).
✅ Lógica básica del carrito (Agregar, Eliminar, Modificar cantidad).
✅ Diseño base responsivo.

## 🗺️ Fases de Desarrollo (Roadmap)

* [ ] **Fase 1:** Correcciones Estructurales y Refactorización (Ver `FASE_1_CORRECCIONES.md`)
* [ ] **Fase 2:** Optimización de la Página de Producto y Catálogo (Ver `FASE_2_PRODUCTOS.md`)
* [ ] **Fase 3:** Flujo de Checkout y Estrategias de Conversión (Ver `FASE_3_CHECKOUT_CRO.md`)
* [ ] **Fase 4:** SEO, Rendimiento y Pulido Final (Ver `FASE_4_PULIDO.md`)

## 📜 Reglas de Desarrollo (Para el Agente AI)
1. **Componentes React:** Usar `client:load` o `client:visible` en Astro solo donde haya interactividad.
2. **Imágenes:** Usar siempre formatos modernos (`.webp`, `.avif`) con tamaños explícitos o clases `aspect-ratio` para evitar CLS (Cumulative Layout Shift).
3. **Conversión (CRO):** Mantener botones de CTA (Call to Action) grandes, visibles y con contraste. Incluir siempre prueba social (estrellas, reviews) y garantías.
4. **Hidratación:** Asegurar que el acceso a `localStorage` (como el Carrito) ocurra en un `useEffect` para evitar errores de hidratación entre el servidor (Astro) y el cliente (React).