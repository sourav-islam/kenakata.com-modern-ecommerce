// src/lib/api/products.ts

import { apiClient } from "./client";
import { Product, ProductFilters } from "@/types";

export async function getProducts(
  filters: ProductFilters = {}
): Promise<Product[]> {
  const { sortBy, sortOrder, ...rest } = filters;

  return apiClient.get<Product[]>("/products", {
    params: rest as Record<string, string | number | boolean | undefined>,
    next: { revalidate: 3600 }, // 1 hour ISR
  } as RequestInit & { params?: Record<string, string | number | boolean | undefined>; next?: { revalidate: number } });
}

export async function getProductById(id: number): Promise<Product> {
  return apiClient.get<Product>(`/products/${id}`, {
    next: { revalidate: 3600 },
  } as RequestInit & { next?: { revalidate: number } });
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  return apiClient.get<Product[]>("/products", {
    params: { limit, offset: 0 },
    next: { revalidate: 3600 },
  } as RequestInit & { params?: Record<string, string | number | boolean | undefined>; next?: { revalidate: number } });
}

export async function getProductsByCategory(
  categoryId: number,
  limit = 10
): Promise<Product[]> {
  return apiClient.get<Product[]>(`/categories/${categoryId}/products`, {
    params: { limit },
    next: { revalidate: 3600 },
  } as RequestInit & { params?: Record<string, string | number | boolean | undefined>; next?: { revalidate: number } });
}