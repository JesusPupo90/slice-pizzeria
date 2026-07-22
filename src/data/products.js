export const products = [
  // PIZZAS
  {
    id: "pizza-pepperoni",
    category: "pizzas",
    name: { es: "Pepperoni Supreme", en: "Pepperoni Supreme" },
    description: {
      es: "Salsa de la casa, abundante queso mozzarella y rodajas de pepperoni madurado.",
      en: "House sauce, generous mozzarella cheese, and aged pepperoni slices."
    },
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
    prices: { personal: 22000, mediana: 32000, familiar: 42000 }
  },
  {
    id: "pizza-veggie",
    category: "pizzas",
    name: { es: "Veggie Delight", en: "Veggie Delight" },
    description: {
      es: "Pimientos, champiñones frescos, cebolla morada, aceitunas negras y albahaca.",
      en: "Bell peppers, fresh mushrooms, red onion, black olives, and basil."
    },
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    prices: { personal: 20000, mediana: 30000, familiar: 39000 }
  },
  {
    id: "pizza-meat",
    category: "pizzas",
    name: { es: "Meat Lovers", en: "Meat Lovers" },
    description: {
      es: "Carne molida sazonada, tocineta crocante, jamón y pepperoni.",
      en: "Seasoned ground beef, crispy bacon, ham, and pepperoni."
    },
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80",
    prices: { personal: 25000, mediana: 36000, familiar: 48000 }
  },
  {
    id: "pizza-bbq",
    category: "pizzas",
    name: { es: "BBQ Chicken", en: "BBQ Chicken" },
    description: {
      es: "Pollo desmechado a la parrilla, salsa BBQ artesanal, cebolla y cilantro.",
      en: "Grilled shredded chicken, artisanal BBQ sauce, onion, and cilantro."
    },
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    prices: { personal: 23000, mediana: 33000, familiar: 44000 }
  },

  // SIDES / ENTRADAS
  {
    id: "side-fries",
    category: "sides",
    name: { es: "Papas Rústicas con Queso", en: "Cheese Fries" },
    description: {
      es: "Papas en cascos sazonadas con finas hierbas y bañadas en queso cheddar derretido.",
      en: "Seasoned potato wedges topped with melted cheddar cheese."
    },
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80",
    price: 16000
  },
  {
    id: "side-garlic-bread",
    category: "sides",
    name: { es: "Pan de Ajo con Mozzarella", en: "Mozzarella Garlic Bread" },
    description: {
      es: "Pan artesanal horneado con mantequilla de ajo, perejil fresco y queso mozzarella fundido.",
      en: "Artisanal bread baked with garlic butter, fresh parsley, and melted mozzarella cheese."
    },
    image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=800&q=80",
    price: 18000
  },
  {
    id: "side-wings",
    category: "sides",
    name: { es: "Alitas BBQ Crocantes", en: "Crispy BBQ Wings" },
    description: {
      es: "8 piezas de alitas bañadas en salsa BBQ ahumada artesanal, acompañadas de dip ranch.",
      en: "8 crispy wings tossed in house smoked BBQ sauce, served with ranch dip."
    },
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    price: 26000
  },
  {
    id: "side-mozzarella-sticks",
    category: "sides",
    name: { es: "Dedos de Mozzarella", en: "Mozzarella Sticks" },
    description: {
      es: "Bastones de queso mozzarella apanados con finas hierbas, acompañados de salsa marinara.",
      en: "Crispy herb-crusted mozzarella sticks served with warm marinara sauce."
    },
    image: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=800&q=80",
    price: 20000
  },

  // BEBIDAS
  {
    id: "bev-gaseosa",
    category: "drinks",
    name: { es: "Gaseosa Personal", en: "Soda Can" },
    description: { es: "Coca-Cola, Sprite o Cuatro 400ml.", en: "Coca-Cola, Sprite or Sprite 400ml." },
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    price: 6000
  },
  {
    id: "bev-limonada-coco",
    category: "drinks",
    name: { es: "Limonada de Coco", en: "Coconut Lemonade" },
    description: { es: "Refrescante combinación de crema de coco y limón natural.", en: "Refreshing blend of coconut cream and fresh lime." },
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    price: 12000
  },
  {
    id: "bev-limonada-cereza",
    category: "drinks",
    name: { es: "Limonada de Cereza", en: "Cherry Lemonade" },
    description: { es: "Limonada natural infusionada con cerezas dulces.", en: "Natural lemonade infused with sweet cherries." },
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    price: 12000
  },

  // DESSERTS / POSTRES
  {
    id: "des-tres-leches",
    category: "desserts",
    name: { es: "Postre Tres Leches", en: "Tres Leches Cake" },
    description: { es: "Bizcocho húmedo tradicional bañado en crema de tres leches.", en: "Traditional moist sponge cake soaked in three milks." },
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80",
    price: 14000
  },
  {
    id: "des-volcan",
    category: "desserts",
    name: { es: "Volcán de Chocolate", en: "Chocolate Lava Cake" },
    description: { es: "Pastel de chocolate tibio con centro fluido, acompañado de helado de vainilla.", en: "Warm chocolate cake with a molten center, served with vanilla ice cream." },
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    price: 18000
  },
  {
    id: "des-cannoli",
    category: "desserts",
    name: { es: "Cannoli Siciliano", en: "Sicilian Cannoli" },
    description: { es: "Masa crujiente rellena de ricota dulce artesanal y chispas de chocolate.", en: "Crispy pastry shell filled with sweet ricotta and chocolate chips." },
    image: "https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?auto=format&fit=crop&w=800&q=80",
    price: 15000
  }
];