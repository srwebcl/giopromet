# 🚀 PLAN MAESTRO: GIOPROMET E-COMMERCE (Astro + React)

## 🎯 Objetivo del Proyecto
Desarrollar el prototipo completo, funcional, ultrarrápido y orientado a la alta conversión (CRO) de un e-commerce para productos de Tecnología, Salud, Fitness y Virales.

## 🛠️ Stack Tecnológico
* **Framework:** Astro (SSG/SSR)
* **UI Library:** React.js
* **Estilos:** Tailwind CSS
* **Iconos:** Lucide React
* **Estado Global:** React Context + LocalStorage
* **Despliegue:** Vercel / Netlify

## 📋 Estado Actual
✅ Setup básico de Astro + React + Tailwind.
✅ Datos mockeados (`src/data/products.js`).
✅ Páginas base creadas (`index`, `carrito`, `checkout`, `producto/[id]`, `confirmacion/[orderId]`).
✅ Lógica básica del carrito (Agregar, Eliminar, Modificar cantidad).
✅ Diseño base responsivo y componentes principales creados.

---

## 📜 Reglas de Desarrollo (Prompt para el Agente AI)
1. **Componentes React:** Usar `client:load` o `client:visible` en Astro solo donde haya interactividad real. Lo estático debe renderizarse en el servidor.
2. **Imágenes:** Usar siempre formatos modernos (`.webp`, `.avif`) con atributos de `width` y `height` o clases `aspect-ratio` en Tailwind para evitar CLS (Cumulative Layout Shift).
3. **Conversión (CRO):** Mantener botones de CTA (Call to Action) grandes, visibles, con alto contraste. Incluir siempre prueba social (estrellas, reseñas) y sellos de garantía/pago seguro.
4. **Hidratación Segura:** Asegurar que el acceso a `localStorage` (como el Carrito de compras) ocurra dentro de un `useEffect` o verificando que el componente esté montado (`isHydrated`), para evitar errores de hidratación (mismatch entre SSR de Astro y CSR de React).
5. **Código Limpio (DRY):** Modularizar componentes repetitivos en la carpeta `src/components/ui/`.

---

## 🗺️ ROADMAP DE DESARROLLO

### 🛠️ FASE 1: Correcciones y Refactorización Estructural
- [ ] **Hidratación del Carrito:** Revisar `CartContext.jsx` y los componentes que lo consumen (`Navbar.jsx`, `CartSummary.jsx`, `CartPage.jsx`). Asegurar que el HTML renderizado por el servidor coincida con el del cliente evitando renders prematuros de datos del `localStorage`.
- [ ] **Sistema de Componentes UI:** Crear `src/components/ui/` y extraer elementos reutilizables:
  - `<Button />` (variantes: primary, secondary, outline, ghost).
  - `<ProductCard />` (estandarizada para usar en Home, Catálogo y Relacionados).
  - `<Badge />` (para etiquetas de "Nuevo", "Oferta", etc.).
- [ ] **Enrutamiento y Navegación:** Revisar que todos los enlaces internos utilicen la navegación de Astro correctamente para evitar recargas completas de página que destruyan el estado temporal si no es necesario.

### 🛍️ FASE 2: Optimización del Catálogo y Página de Producto
- [ ] **Página de Catálogo (`/productos`):**
  - Implementar una barra lateral (o modal en móvil) con filtros por categoría (Tecnología, Salud, Complementos).
  - Búsqueda en tiempo real conectada a la data de productos.
  - Ordenamiento (Mayor/Menor precio).
- [ ] **Página de Producto de Alta Conversión (`ProductDetail.jsx`):**
  - **Galería de Imágenes:** Cambiar la imagen única por un carrusel que soporte múltiples imágenes por producto.
  - **Gatillos Mentales (Urgencia/Escasez):** Agregar componente de stock bajo ("Solo quedan 3 unidades") o contador de oferta.
  - **Sticky Add to Cart:** En la versión móvil, cuando el usuario hace scroll y pasa el botón principal de compra, debe aparecer una barra fija en la parte inferior con un botón de "Agregar al carrito" siempre visible.
- [ ] **Productos Relacionados:** Lógica dinámica para mostrar 3 o 4 productos de la misma categoría al final de la vista de detalle.

### 💳 FASE 3: Flujo de Checkout y Estrategias CRO
- [ ] **Optimización del Drawer (Carrito lateral):**
  - Incluir una barra de progreso de envío gratis (Ej: "Agrega $15.000 más para obtener envío GRATIS").
- [ ] **Mejoras en el Formulario (`CheckoutForm.jsx`):**
  - Validación en tiempo real (formato de email, auto-formato de teléfono).
  - Feedback visual claro al enviar (deshabilitar botón, mostrar spinner de carga).
- [ ] **Order Bumps (Ventas Cruzadas):**
  - En el paso final del checkout, agregar un checkbox destacado ofreciendo un producto complementario de bajo valor (Ej: "Añade garantía extendida por $4.990").
  - Al marcarlo, el total debe actualizarse dinámicamente.
- [ ] **Mock de API de Pago:** Asegurar que la transición del Checkout a la página de confirmación guarde los datos en el `localStorage` simulando una transacción real, para que la vista de Confirmación lea datos verídicos.

### 🥇 FASE 4: Pulido Final, SEO y Rendimiento
- [ ] **SEO Dinámico (`BaseLayout.astro`):**
  - Configurar las props del layout para que reciba `title`, `description` y `image`.
  - Asegurar que la página dinámica `producto/[id].astro` inyecte los metadatos correctos (Open Graph) específicos de cada producto.
- [ ] **View Transitions de Astro:**
  - Importar e implementar `<ViewTransitions />` en el `<head>` del layout base para conseguir una navegación estilo SPA fluida y moderna.
- [ ] **Lazy Loading e Interactividad:**
  - Cambiar directivas de Astro: usar `client:visible` para componentes React pesados que estén debajo del *fold* (como las reseñas o productos relacionados).
- [ ] **Testeo Responsivo Completo:**
  - Auditar la interfaz en pantallas pequeñas (320px) asegurando que el contenido no se desborde, los padding sean adecuados y la experiencia táctil sea perfecta.