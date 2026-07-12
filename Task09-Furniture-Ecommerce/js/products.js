/**
 * products.js
 * Contains all product data as an Array of Objects.
 * No products are hardcoded in HTML — all rendering is done via JavaScript.
 */

const PRODUCTS = [
  {
    id: 1,
    name: "Syltherine Sofa",
    category: "Sofa",
    price: 2500,
    oldPrice: 3500,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
    description: "Stylish cafeterrace chair with solid wood structure.",
    badge: "Sale",
    rating: 4.8,
    reviews: 120,
  },
  {
    id: 2,
    name: "Leviosa Wing Chair",
    category: "Chair",
    price: 2500,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&q=80",
    description: "Luxury winged armchair with premium fabric upholstery.",
    badge: "New",
    rating: 4.7,
    reviews: 85,
  },
  {
    id: 3,
    name: "Lolito Coffee Table",
    category: "Table",
    price: 7000,
    oldPrice: 14000,
    image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=500&q=80",
    description: "Minimalist coffee table with tempered glass top.",
    badge: "Sale",
    rating: 4.5,
    reviews: 64,
  },
  {
    id: 4,
    name: "Respira Bed Frame",
    category: "Bed",
    price: 5000,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&q=80",
    description: "King-size bed frame with upholstered headboard.",
    badge: "New",
    rating: 4.9,
    reviews: 210,
  },
  {
    id: 5,
    name: "Grifo Night Stand",
    category: "Table",
    price: 1500,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
    description: "Compact bedside table with two drawer storage.",
    badge: null,
    rating: 4.3,
    reviews: 47,
  },
  {
    id: 6,
    name: "Muggo Accent Chair",
    category: "Chair",
    price: 1500,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80",
    description: "Small cute egg-shaped accent chair for any corner.",
    badge: null,
    rating: 4.4,
    reviews: 93,
  },
  {
    id: 7,
    name: "Pingky Sofa",
    category: "Sofa",
    price: 7000,
    oldPrice: 14000,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80",
    description: "Plush three-seat sofa with cushioned armrests.",
    badge: "Sale",
    rating: 4.6,
    reviews: 152,
  },
  {
    id: 8,
    name: "Potty Minimalist Lamp",
    category: "Lighting",
    price: 500,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
    description: "Sleek floor lamp with adjustable warm lighting.",
    badge: null,
    rating: 4.2,
    reviews: 38,
  },
  {
    id: 9,
    name: "Shelby Bookshelf",
    category: "Storage",
    price: 3200,
    oldPrice: 4000,
    image: "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=500&q=80",
    description: "Modern open bookcase with five adjustable shelves.",
    badge: "Sale",
    rating: 4.7,
    reviews: 76,
  },
  {
    id: 10,
    name: "Asgaard Dining Table",
    category: "Table",
    price: 9000,
    oldPrice: 12000,
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&q=80",
    description: "Solid teak dining table, seats up to six people.",
    badge: "Sale",
    rating: 4.9,
    reviews: 189,
  },
  {
    id: 11,
    name: "Zenit Recliner",
    category: "Chair",
    price: 4500,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=500&q=80",
    description: "Ultra-comfortable recliner with footrest mechanism.",
    badge: "New",
    rating: 4.8,
    reviews: 105,
  },
  {
    id: 12,
    name: "Nordic Wardrobe",
    category: "Storage",
    price: 6800,
    oldPrice: 8500,
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edc8?w=500&q=80",
    description: "Spacious sliding-door wardrobe in white oak finish.",
    badge: "Sale",
    rating: 4.6,
    reviews: 134,
  },
];

/**
 * Category list for filter buttons (derived from product data + "All").
 */
const CATEGORIES = ["All", ...new Set(PRODUCTS.map((p) => p.category))];

/**
 * Category images for the category section cards.
 */
const CATEGORY_INFO = {
  Sofa: {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    count: 18,
  },
  Chair: {
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80",
    count: 24,
  },
  Table: {
    image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600&q=80",
    count: 32,
  },
  Bed: {
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    count: 15,
  },
  Lighting: {
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    count: 12,
  },
  Storage: {
    image: "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=600&q=80",
    count: 20,
  },
};