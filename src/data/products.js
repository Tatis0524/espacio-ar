// Los modelos GLB están en /public/models. Cada ruta existe realmente (ver MODELOS.md).
// `model: null` = no hay modelo 3D real para ese producto; la app lo dice con honestidad.
const asset = (p) => `${import.meta.env.BASE_URL}${p}`;

export const DEMO_MODEL = {
  src: asset('models/demo-silla-damasco.glb'),
  label: 'Silla con tapiz damasco (modelo de otra pieza)',
};

export const products = [
  {
    id: 'sofa-glam',
    name: 'Sofá Glam de terciopelo',
    category: 'Sofás',
    price: 2890000,
    description:
      'Sofá curvo con tapizado de terciopelo y patas metálicas. Una pieza protagonista para la sala.',
    image: asset('posters/sofa-glam.jpg'),
    featured: true,
    model: {
      src: asset('models/sofa-glam.glb'),
      alt: 'Modelo 3D de un sofá Glam de terciopelo',
      // `variantName` = nombre exacto de la variante dentro del GLB (KHR_materials_variants).
      variants: [
        { name: 'Champagne', variantName: 'Champagne', hex: '#9b8a76' },
        { name: 'Azul marino', variantName: 'Navy', hex: '#1d3f6d' },
        { name: 'Gris', variantName: 'Gray', hex: '#a9a8a5' },
        { name: 'Negro', variantName: 'Black', hex: '#212123' },
        { name: 'Rosa pálido', variantName: 'Pale Pink', hex: '#d3b8bb' },
      ],
    },
  },
  {
    id: 'silla-velvet',
    name: 'Silla Velvet Mystère',
    category: 'Sillas',
    price: 690000,
    description:
      'Silla de estilo lounge tapizada en terciopelo, con patas de madera oscura. Disponible en dos tapices.',
    image: asset('posters/silla-sheen.jpg'),
    featured: true,
    model: {
      src: asset('models/silla-sheen.glb'),
      alt: 'Modelo 3D de una silla tapizada en terciopelo',
      variants: [
        { name: 'Mango', variantName: 'Mango Velvet', hex: '#f25a37' },
        { name: 'Pavo real', variantName: 'Peacock Velvet', hex: '#016062' },
      ],
    },
  },
  {
    id: 'mesa-auxiliar',
    name: 'Mesa auxiliar redonda',
    category: 'Mesas',
    price: 420000,
    description: 'Mesa auxiliar de madera clara con tapa redonda, pensada para acompañar un sofá o una cama.',
    image: asset('posters/sin-modelo-mesa.svg'),
    featured: false,
    colors: [{ name: 'Madera clara', hex: '#c9a77c' }],
    model: null,
  },
  {
    id: 'lampara-granero',
    name: 'Aplique de pared Granero',
    category: 'Iluminación',
    price: 180000,
    description: 'Lámpara de pared de metal color cobre con bombilla visible, de estilo industrial cálido.',
    image: asset('posters/lampara-granero.jpg'),
    featured: true,
    colors: [{ name: 'Cobre', hex: '#b8734a' }],
    model: {
      src: asset('models/lampara-granero.glb'),
      alt: 'Modelo 3D de un aplique de pared de estilo granero',
      arPlacement: 'wall',
      variants: [],
    },
  },
  {
    id: 'estanteria-modular',
    name: 'Estantería modular',
    category: 'Almacenamiento',
    price: 760000,
    description: 'Estantería abierta de cinco niveles en madera, para libros, plantas y objetos decorativos.',
    image: asset('posters/sin-modelo-estanteria.svg'),
    featured: false,
    colors: [{ name: 'Roble natural', hex: '#b88a55' }],
    model: null,
  },
  {
    id: 'planta-decorativa',
    name: 'Planta decorativa en maceta',
    category: 'Decoración',
    price: 150000,
    description: 'Planta de hojas anchas en maceta cerámica. Suma color y frescura a cualquier rincón.',
    image: asset('posters/planta-hojas.jpg'),
    featured: false,
    colors: [{ name: 'Verde natural', hex: '#5f7f4a' }],
    model: {
      src: asset('models/planta-hojas.glb'),
      alt: 'Modelo 3D de una planta decorativa en maceta',
      variants: [],
    },
  },
];

export const categories = ['Todas', ...Array.from(new Set(products.map((p) => p.category)))];

export const formatPrice = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

export const getProduct = (id) => products.find((p) => p.id === id);
