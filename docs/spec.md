# 🍕 SDD: Slice Pizzeria MVP (Demo Commercial App)

## 1. Visión General del Proyecto
Desarrollo de una Web App interactiva de alto impacto visual para una pizzería artesanal. El objetivo es servir como demo comercial para cierre rápido de clientes y como pieza de portafolio para oportunidades laborales internacionales y locales.

- **Reset de CSS:** Limpiar completamente los archivos de estilos por defecto generados por Vite (`App.css` e `index.css`). Configurar `index.css` únicamente con las directivas base de Tailwind CSS y la importación de fuentes globales únicamente cuando se configura el proyecto por primera vez.
- **Enfoque:** Landing Page + Menú Interactivo con Tamaños + Carrito Persistente + Checkout vía WhatsApp + Soporte Bilingüe (i18n).
- **Stack Técnico:** React (Vite), Tailwind CSS, Lucide React (Íconos), i18next (Soporte Bilingüe ES/EN).
- **Despliegue Target:** Vercel.

---

## 2. Sistema de Diseño (Design Tokens)

### Paleta de Colores (Design Tokens)

#### Superficies y Fondos (`surface`)
* **`bg-surface-burgundy` (`#2A080C`):** Borgoña Profundo. Uso exclusivo en la sección *Hero* y acentos de marca.
* **`bg-surface-charcoal` (`#121212`):** Carbón / Pizarra. Uso en sección *Menú*, tarjetas de productos y *Footer*.
* **`bg-surface-cream` (`#EDE1C7`):** Crema Cálido. Uso en la sección *Experience*, modales y fondos de alto contraste.

#### Tipografía y Textos (`text`)
* **`text-text-light` (`#FDFBF7`):** Texto claro / blanco cálido. Uso sobre fondos oscuros (`burgundy` o `charcoal`).
* **`text-text-dark` (`#121212`):** Texto oscuro / carbón. Uso sobre fondos claros (`cream`).
* **`text-text-muted` (`#78716C`):** Texto secundario / gris neutro (Stone-500). Uso para descripciones, subtítulos e información complementaria.

#### Marca y Acciones (`brand`)
* **`bg-brand-primary` / `text-brand-primary` (`#E85A1D`):** Naranja Fuego Vibrante. Uso en botones de acción principal (CTA), precios y badges.
* **`hover:bg-brand-hover` (`#D1490F`):** Naranja Oscuro. Uso para estados hover de botones e interacciones.

> ⚠️ **Regla de Implementación:** Queda estrictamente prohibido usar clases con nombres en español (`fondo-sec-*`, `texto-oscuro`, etc.) en cualquier componente React. Todas las utilidades de color deben referenciar únicamente los tokens en inglés listados arriba.

### Tipografía
- **Headings (Títulos):** `Bebas Neue` o `Oswald` (Google Fonts / Sans-serif condensada rústica).
- **Body / Interface:** `Plus Jakarta Sans` o `Inter` (Sans-serif limpia de alta legibilidad).

### Animaciones & Micro-interacciones
- **Hover en Tarjetas:** `transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl`
- **Badge de Carrito:** Parpadeo/Bouncing al agregar producto (`animate-bounce` breve).
- **Modales (Checkout/Cart):** Entrada suave con `scale-95` a `scale-100` y `opacity-0` a `opacity-100`.
- **Navegación:** `scroll-smooth` activado en el documento HTML.

---

## 3. Requerimientos Funcionales (FR)

### FR-01: Navegación & Header (Navbar)
- Navbar Sticky con backdrop-blur.
- Logo ("Slice Pizzeria"), enlaces de scroll suave (`#menu`, `#experience`, `#locations`), Selector de Idioma (ES/EN) y Botón de Carrito con badge dinámico de cantidad.

### FR-02: Hero Section (Fondo Borgoña `#2A080C`)
- Layout de 2 columnas en Desktop (Flex/Grid), 1 columna en Mobile.
- **Manejo de Imagen:** Contenedor con `overflow-hidden` y posición relativa. La foto principal de la pizza utilizará las clases de Tailwind `object-cover` y `object-center` para adaptarse fluidamente a cualquier resolución sin distorsión.
- Copy de alto impacto bilingüe.
- CTA Principal ("Ver Menú / View Menu") que redirige con scroll suave a `#menu`.

### FR-03: Menú Interactivo & Selección de Tamaños (Fondo Carbón `#121212`)
- Categorías mediante pestañas: *Pizzas, Entradas / Sides, Bebidas / Drinks, Postres / Desserts*.
- **Pizzas con Selector de Tamaño:** Cada pizza permite elegir entre *Personal, Mediana, Familiar*. El precio en pantalla y en el carrito cambia dinámicamente según la selección.
- Precios con conversión dinámica de divisa basada en el idioma seleccionado (Tasa fija: `$1 USD = $4.000 COP`).

### FR-04: Carrito de Compras (Cart Drawer)
- Modal lateral que se despliega desde la derecha.
- Lista de productos agregados con opción de modificar cantidad, cambiar tamaño o eliminar.
- Cálculo automático de subtotal y total.
- Botón principal: "Confirmar Pedido / Place Order".

### FR-05: Modal de Checkout & Integración con WhatsApp (Fondo Crema `#FDFBF7`)
- Modal animado que solicita los datos del domicilio:
  - Nombre Completo (Input Text).
  - Dirección + Barrio / Apto (Input Text).
  - Método de Pago (Select: *Efectivo* o *Transferencia/Nequi*).
  - **Campo Condicional:** Si se selecciona *Efectivo*, se despliega el input *"¿Con cuánto vas a pagar? (Para llevar cambio)"*.
  - Notas adicionales (Textarea opcional).
- **Submit:** Formatea el mensaje completo con emojis y saltos de línea y ejecuta `window.open` con la URL codificada de WhatsApp (`https://wa.me/...`).

### FR-06: Internacionalización (i18n)
- Cambio instantáneo de idioma sin recargar la página usando `react-i18next`.
- Al cambiar a **EN**, los precios se dividen entre 4000 y se formatean como `$XX.XX USD`. Al cambiar a **ES**, se multiplican y formatean como `$XX.000 COP`.

### FR-07: Footer & Mapa Embebido (Fondo Carbón `#121212`)
- Layout de 4 columnas en Desktop (`grid-cols-1 md:grid-cols-4`):
  1. **Navegación:** Enlaces internos (`#menu`, `#experience`, etc.).
  2. **Contacto:** Dirección física, Teléfono ficticio/real y Email de atención.
  3. **Google Maps:** Iframe responsivo de Google Maps embebido (`w-full h-32 rounded-md`).
  4. **Newsletter & Redes:** Input de captura de correo + íconos sociales (`Instagram`, `Facebook`, `Twitter`).
- Barra inferior de Copyright.

---

## 4. Arquitectura de Componentes & Carpetas

```text
slice-pizzeria/
├── docs/
│   └── spec.md
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── MenuSection.jsx
│   │   │   ├── ExperienceSection.jsx
│   │   │   └── LocationsSection.jsx
│   │   ├── ui/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CartDrawer.jsx
│   │   │   └── CheckoutModal.jsx
│   │   └── LanguageSwitcher.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── data/
│   │   └── products.js
│   ├── i18n/
│   │   ├── config.js
│   │   ├── es.json
│   │   └── en.json
│   ├── utils/
│   │   ├── currencyFormatter.js
│   │   └── whatsappHelper.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── tailwind.config.js
└── package.json
```
---

## 5. Estructura de Datos (`src/data/products.js`)

El archivo `src/data/products.js` será la única fuente de verdad para el catálogo de productos. Exportará un array `products` donde cada objeto sigue el siguiente esquema:

```javascript
// Ejemplo de interfaz/contrato de datos
{
  id: string,               // ID único (ej: "pizza-pepperoni")
  category: string,         // "pizzas" | "sides" | "drinks" | "desserts"
  name: { es: string, en: string },
  description: { es: string, en: string },
  image: string,            // URL de la imagen en formato texto plano
  prices?: { personal: number, mediana: number, familiar: number }, // Precios en COP (Solo pizzas)
  price?: number            // Precio único en COP (Sides, bebidas, postres)
}
```

### 6. Formato del Mensaje de WhatsApp

🍕 *¡Nuevo Pedido - Slice Pizzeria!* 🍕

👤 *Cliente:* {{nombre}}
📍 *Dirección:* {{direccion}}
💳 *Método de Pago:* {{metodoPago}}
{{#if cambio}}💵 *Paga con:* {{cambio}} (Llevar cambio){{/if}}

📋 *DETALLE DEL PEDIDO:*
• {{cantidad}}x {{nombre_producto}} ({{tamaño}}) — ${{subtotal}}

💰 *TOTAL A PAGAR:* ${{total}} {{moneda}}
{{#if notas}}📝 *Notas:* {{notas}}{{/if}}

## 7. Criterios de Aceptación (Acceptance Criteria - AC)

### AC-01: Cambio de Idioma y Conversión de Moneda
- **Dado que** el usuario está en la página principal,
- **Cuando** cambia el selector de idioma de "ES" a "EN",
- **Entonces** todos los textos de la interfaz deben traducirse al inglés y los precios deben convertirse automáticamente a formato USD ($XX.XX) utilizando la tasa de 4000 COP/USD.

### AC-02: Selección de Tamaño y Carrito
- **Dado que** el usuario selecciona una pizza con tamaño "Familiar",
- **Cuando** hace clic en "Agregar al Carrito",
- **Entonces** el `CartDrawer` debe abrirse mostrando la pizza, el tamaño seleccionado ("Familiar"), el precio correcto y el contador del Navbar debe incrementarse en 1.

### AC-03: Campo Condicional de Cambio en Efectivo
- **Dado que** el usuario está en el modal de checkout,
- **Cuando** selecciona "Efectivo" como método de pago,
- **Entonces** debe desplegarse el campo "¿Con cuánto vas a pagar?". Si selecciona "Transferencia/Nequi", dicho campo debe ocultarse automáticamente.

### AC-04: Generación de Pedido a WhatsApp
- **Dado que** el usuario completa el formulario de domicilio y presiona "Confirmar Pedido",
- **Cuando** se ejecuta la acción,
- **Entonces** se debe abrir una pestaña/app de WhatsApp con el mensaje formateado que incluya: Nombre, Dirección, Método de Pago, Detalle de ítems (con sus tamaños) y el Total a pagar.

### AC-05: Layout Responsivo e Imágenes
- **Dado que** el sitio se visualiza en un dispositivo móvil (pantalla < 768px),
- **Cuando** el usuario navega por la página,
- **Entonces** la imagen del Hero no debe deformarse ni romper el ancho horizontal (`overflow-x` controlado), y el grid del menú debe adaptarse a 1 sola columna.