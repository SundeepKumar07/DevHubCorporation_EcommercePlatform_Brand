// ============================================
// IMPORT TECH PRODUCTS
// ============================================
import { StaticImageData } from "next/image";
import tech1 from "../assets/Image/tech/image 23.png";
import tech2 from "../assets/Image/tech/image 29.png";
import tech3 from "../assets/Image/tech/image 32.png";
import tech4 from "../assets/Image/tech/image 33.png";
import tech5 from "../assets/Image/tech/image 34.png";
import tech6 from "../assets/Image/tech/image 85.png";
import tech7 from "../assets/Image/tech/image 86.png";
import tech8 from "../assets/Image/tech/6.png";
import tech9 from "../assets/Image/tech/8.png";

// ============================================
// IMPORT INTERIOR PRODUCTS
// ============================================

import interior1 from "../assets/Image/interior/1.png";
import interior2 from "../assets/Image/interior/3.png";
import interior3 from "../assets/Image/interior/6.png";
import interior4 from "../assets/Image/interior/7.png";
import interior5 from "../assets/Image/interior/8.png";
import interior6 from "../assets/Image/interior/9.png";
import interior7 from "../assets/Image/interior/image 89.png";
import interior8 from "../assets/Image/interior/image 93.png";

// ============================================
// IMPORT HERO BANNERS
// ============================================

import banner1 from "../assets/Image/backgrounds/Banner-board-800x420 2.png";
import banner2 from "../assets/Image/backgrounds/Group 969.png";
import banner3 from "../assets/Image/backgrounds/Group 982.png";

// ============================================
// IMPORT FLAGS
// ============================================

import usa from "../assets/Image/flags/us.png";
import germany from "../assets/Image/flags/de.png";
import france from "../assets/Image/flags/fr.png";
import italy from "../assets/Image/flags/it.png";
import china from "../assets/Image/flags/cn.png";

// ============================================
// TYPES
// ============================================

export interface Product {
  id: number;
  title: string;
  category: string;
  brand: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: StaticImageData;
  stock: number;
  featured?: boolean;
  shipping?: string;
  description: string;
}

export interface Category {
  id: number;
  title: string;
  image: StaticImageData;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: StaticImageData;
}

export interface Country {
  id: number;
  name: string;
  flag: StaticImageData;
}

// ============================================
// HERO BANNERS
// ============================================

export const heroBanners: Banner[] = [
  {
    id: 1,
    title: "Latest Trending Electronics",
    subtitle: "Best tech products at affordable prices",
    image: banner1,
  },
  {
    id: 2,
    title: "Modern Interior Collection",
    subtitle: "Decorate your home beautifully",
    image: banner2,
  },
  {
    id: 3,
    title: "Mega Summer Discounts",
    subtitle: "Save up to 50% on selected items",
    image: banner3,
  },
];

// ============================================
// CATEGORIES
// ============================================

export const categories: Category[] = [
  {
    id: 1,
    title: "Electronics",
    image: tech6,
  },
  {
    id: 2,
    title: "Gaming",
    image: tech7,
  },
  {
    id: 3,
    title: "Furniture",
    image: interior6,
  },
  {
    id: 4,
    title: "Decor",
    image: interior7,
  },
];

// ============================================
// PRODUCTS
// ============================================

export const products: Product[] = [
  {
    id: 1,
    title: "Apple Smart Watch Series X",
    category: "Electronics",
    brand: "Apple",
    price: 299,
    oldPrice: 349,
    discount: 15,
    rating: 4.8,
    reviews: 125,
    image: tech1,
    stock: 20,
    featured: true,
    shipping: "Free Shipping",
    description:
      "Premium Apple smartwatch with fitness tracking and smart notifications.",
  },

  {
    id: 2,
    title: "Wireless Gaming Headphones",
    category: "Gaming",
    brand: "Sony",
    price: 149,
    oldPrice: 199,
    discount: 25,
    rating: 4.7,
    reviews: 88,
    image: tech2,
    stock: 14,
    featured: true,
    shipping: "Free Shipping",
    description:
      "Noise cancellation gaming headphones with premium sound quality.",
  },

  {
    id: 3,
    title: "Ultra HD Professional Camera",
    category: "Electronics",
    brand: "Canon",
    price: 899,
    oldPrice: 999,
    discount: 10,
    rating: 4.9,
    reviews: 66,
    image: tech3,
    stock: 8,
    featured: true,
    shipping: "Fast Delivery",
    description:
      "Professional DSLR camera for photography and cinematic videos.",
  },

  {
    id: 4,
    title: "RGB Mechanical Keyboard",
    category: "Gaming",
    brand: "Logitech",
    price: 119,
    oldPrice: 149,
    discount: 20,
    rating: 4.6,
    reviews: 72,
    image: tech4,
    stock: 25,
    shipping: "Free Shipping",
    description:
      "Mechanical gaming keyboard with customizable RGB lighting.",
  },

  {
    id: 5,
    title: "Premium Bluetooth Speaker",
    category: "Electronics",
    brand: "JBL",
    price: 89,
    oldPrice: 120,
    discount: 30,
    rating: 4.5,
    reviews: 53,
    image: tech5,
    stock: 18,
    shipping: "Free Shipping",
    description:
      "Portable bluetooth speaker with deep bass and long battery backup.",
  },

  {
    id: 6,
    title: "Gaming Monitor 144Hz",
    category: "Gaming",
    brand: "ASUS",
    price: 349,
    oldPrice: 399,
    discount: 12,
    rating: 4.8,
    reviews: 47,
    image: tech6,
    stock: 10,
    shipping: "Fast Delivery",
    description:
      "High refresh rate gaming monitor with ultra smooth visuals.",
  },

  {
    id: 7,
    title: "Smartphone Pro Max",
    category: "Electronics",
    brand: "Samsung",
    price: 1099,
    oldPrice: 1199,
    discount: 10,
    rating: 4.9,
    reviews: 104,
    image: tech7,
    stock: 7,
    featured: true,
    shipping: "Free Shipping",
    description:
      "Latest flagship smartphone with premium camera and display.",
  },

  {
    id: 8,
    title: "Wireless Earbuds",
    category: "Electronics",
    brand: "Xiaomi",
    price: 79,
    oldPrice: 99,
    discount: 18,
    rating: 4.4,
    reviews: 39,
    image: tech8,
    stock: 30,
    shipping: "Free Shipping",
    description:
      "Compact wireless earbuds with excellent battery performance.",
  },

  {
    id: 9,
    title: "Gaming Mouse RGB",
    category: "Gaming",
    brand: "Razer",
    price: 59,
    oldPrice: 79,
    discount: 20,
    rating: 4.5,
    reviews: 45,
    image: tech9,
    stock: 40,
    shipping: "Fast Delivery",
    description:
      "Professional gaming mouse with customizable RGB effects.",
  },

  {
    id: 10,
    title: "Luxury Modern Sofa",
    category: "Furniture",
    brand: "IKEA",
    price: 799,
    oldPrice: 899,
    discount: 15,
    rating: 4.7,
    reviews: 22,
    image: interior1,
    stock: 6,
    featured: true,
    shipping: "Free Shipping",
    description:
      "Modern luxury sofa designed for comfort and elegance.",
  },

  {
    id: 11,
    title: "Wooden Dining Chair",
    category: "Furniture",
    brand: "Habitt",
    price: 129,
    oldPrice: 159,
    discount: 18,
    rating: 4.3,
    reviews: 19,
    image: interior2,
    stock: 20,
    shipping: "Fast Delivery",
    description:
      "Minimal wooden chair suitable for modern interiors.",
  },

  {
    id: 12,
    title: "Decorative Table Lamp",
    category: "Decor",
    brand: "Philips",
    price: 89,
    oldPrice: 110,
    discount: 15,
    rating: 4.6,
    reviews: 33,
    image: interior3,
    stock: 15,
    shipping: "Free Shipping",
    description:
      "Beautiful decorative lamp for home and office setup.",
  },

  {
    id: 13,
    title: "Office Work Desk",
    category: "Furniture",
    brand: "IKEA",
    price: 349,
    oldPrice: 420,
    discount: 20,
    rating: 4.5,
    reviews: 28,
    image: interior4,
    stock: 12,
    shipping: "Fast Delivery",
    description:
      "Modern office desk with premium wood finish.",
  },

  {
    id: 14,
    title: "Minimal Bed Design",
    category: "Furniture",
    brand: "Habitt",
    price: 899,
    oldPrice: 999,
    discount: 10,
    rating: 4.8,
    reviews: 17,
    image: interior5,
    stock: 4,
    featured: true,
    shipping: "Free Shipping",
    description:
      "Luxury minimal bed frame with premium build quality.",
  },

  {
    id: 15,
    title: "Classic Wall Decor",
    category: "Decor",
    brand: "DecorX",
    price: 79,
    oldPrice: 99,
    discount: 15,
    rating: 4.4,
    reviews: 21,
    image: interior6,
    stock: 26,
    shipping: "Free Shipping",
    description:
      "Elegant wall decor for modern living rooms.",
  },

  {
    id: 16,
    title: "Interior Flower Vase",
    category: "Decor",
    brand: "HomeStyle",
    price: 45,
    oldPrice: 65,
    discount: 25,
    rating: 4.2,
    reviews: 13,
    image: interior7,
    stock: 32,
    shipping: "Fast Delivery",
    description:
      "Modern flower vase for aesthetic room decoration.",
  },

  {
    id: 17,
    title: "Luxury Coffee Table",
    category: "Furniture",
    brand: "IKEA",
    price: 259,
    oldPrice: 320,
    discount: 18,
    rating: 4.7,
    reviews: 24,
    image: interior8,
    stock: 9,
    shipping: "Free Shipping",
    description:
      "Stylish coffee table for premium interiors.",
  },
];

// ============================================
// FEATURED PRODUCTS
// ============================================

export const featuredProducts = products.filter(
  (product) => product.featured
);

// ============================================
// DEAL PRODUCTS
// ============================================

export const dealProducts = products.filter(
  (product) => product.discount && product.discount >= 20
);

// ============================================
// TOP ELECTRONICS
// ============================================

export const electronicProducts = products.filter(
  (product) => product.category === "Electronics"
);

// ============================================
// INTERIOR PRODUCTS
// ============================================

export const interiorProducts = products.filter(
  (product) =>
    product.category === "Furniture" ||
    product.category === "Decor"
);

// ============================================
// COUNTRIES
// ============================================

export const countries: Country[] = [
  {
    id: 1,
    name: "United States",
    flag: usa,
  },

  {
    id: 2,
    name: "Germany",
    flag: germany,
  },

  {
    id: 3,
    name: "France",
    flag: france,
  },

  {
    id: 4,
    name: "Italy",
    flag: italy,
  },

  {
    id: 5,
    name: "China",
    flag: china,
  },
];