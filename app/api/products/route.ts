// src/app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

// ── GET /api/products ──
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search   = searchParams.get("search")   ?? "";
    const category = searchParams.get("category") ?? "";
    const brand    = searchParams.get("brand")    ?? "";
    const featured = searchParams.get("featured") ?? "";
    const sort     = searchParams.get("sort")     ?? "createdAt";
    const order    = searchParams.get("order")    ?? "desc";
    const page     = parseInt(searchParams.get("page")  ?? "1");
    const limit    = parseInt(searchParams.get("limit") ?? "12");
    const minPrice = parseFloat(searchParams.get("minPrice") ?? "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") ?? "999999");

    // ── Build query ──
    const query: Record<string, unknown> = {};

    if (search) {
      query.$text = { $search: search };
    }
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }
    if (brand) {
      query.brand = { $regex: brand, $options: "i" };
    }
    if (featured === "true") {
      query.featured = true;
    }
    if (minPrice > 0 || maxPrice < 999999) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    }

    // ── Sort ──
    const sortObj: Record<string, 1 | -1> = {
      [sort]: order === "asc" ? 1 : -1,
    };

    // ── Paginate ──
    const skip  = (page - 1) * limit;
    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data:    products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// ── POST /api/products ──
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      name, description, price, oldPrice,
      discount, image, category, brand,
      stock, rating, reviews, shipping, featured,
    } = body;

    // ── Validation ──
    if (!name || !description || !price || !image || !category || !brand) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name, description, price, oldPrice,
      discount, image, category, brand,
      stock: stock ?? 0,
      rating: rating ?? 0,
      reviews: reviews ?? 0,
      shipping: shipping ?? "Standard",
      featured: featured ?? false,
    });

    return NextResponse.json(
      { success: true, data: product },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create product" },
      { status: 500 }
    );
  }
}