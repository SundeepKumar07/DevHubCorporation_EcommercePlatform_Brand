// src/hooks/useProducts.ts
"use client";

import { useState, useEffect, useCallback } from "react";

interface Product {
  _id:         string;
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
}

interface Pagination {
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
}

interface Filters {
  search?:   string;
  category?: string;
  brand?:    string;
  featured?: boolean;
  sort?:     string;
  order?:    "asc" | "desc";
  page?:     number;
  limit?:    number;
  minPrice?: number;
  maxPrice?: number;
}

export function useProducts(filters: Filters = {}) {
  const [products,   setProducts]   = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Build query string
      const params = new URLSearchParams();
      if (filters.search)   params.set("search",   filters.search);
      if (filters.category) params.set("category", filters.category);
      if (filters.brand)    params.set("brand",    filters.brand);
      if (filters.featured) params.set("featured", "true");
      if (filters.sort)     params.set("sort",     filters.sort);
      if (filters.order)    params.set("order",    filters.order);
      if (filters.page)     params.set("page",     String(filters.page));
      if (filters.limit)    params.set("limit",    String(filters.limit));
      if (filters.minPrice) params.set("minPrice", String(filters.minPrice));
      if (filters.maxPrice) params.set("maxPrice", String(filters.maxPrice));

      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch products");

      const json = await res.json();
      setProducts(json.data);
      setPagination(json.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, pagination, loading, error, refetch: fetchProducts };
}