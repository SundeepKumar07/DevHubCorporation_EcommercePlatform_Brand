// src/models/Product.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name:        string;
  description: string;
  price:       number;
  oldPrice?:   number;
  discount?:   number;
  image:       string;
  category:    string;
  brand:       string;
  stock:       number;
  rating:      number;
  reviews:     number;
  shipping?:   string;
  featured?:   boolean;
  createdAt:   Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name:        { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price:       { type: Number, required: true, min: 0 },
    oldPrice:    { type: Number },
    discount:    { type: Number, min: 0, max: 100 },
    image:       { type: String, required: true },
    category:    { type: String, required: true },
    brand:       { type: String, required: true },
    stock:       { type: Number, required: true, min: 0, default: 0 },
    rating:      { type: Number, min: 0, max: 5, default: 0 },
    reviews:     { type: Number, default: 0 },
    shipping:    { type: String, default: "Standard" },
    featured:    { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ── Search index ──
ProductSchema.index({ name: "text", description: "text", category: "text" });
ProductSchema.index({ category: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ featured: 1 });

const Product: Model<IProduct> =
  mongoose.models.Product ??
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;