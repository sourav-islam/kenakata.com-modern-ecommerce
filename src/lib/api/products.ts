// src/lib/api/products.ts — update koro

import { apiClient } from "./client";
import { Product, ProductFilters } from "@/types";

type FetchOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
  next?:   { revalidate: number };
};

export async function getProducts(
  filters: ProductFilters = {}
): Promise<Product[]> {
  const { sortBy, sortOrder, categoryId, ...rest } = filters;

  // Category specific endpoint
  const endpoint = categoryId
    ? `/categories/${categoryId}/products`
    : "/products";

  return apiClient.get<Product[]>(endpoint, {
    params: rest as Record<string, string | number | boolean | undefined>,
    next:   { revalidate: 60 }, // 1 min — product list often changes
  } as FetchOptions);
}

export async function getProductById(id: number): Promise<Product> {
  return apiClient.get<Product>(`/products/${id}`, {
    next: { revalidate: 3600 },
  } as FetchOptions);
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  return apiClient.get<Product[]>("/products", {
    params: { limit, offset: 0 },
    next:   { revalidate: 3600 },
  } as FetchOptions);
}

export async function getProductsByCategory(
  categoryId: number,
  limit = 10
): Promise<Product[]> {
  return apiClient.get<Product[]>(`/categories/${categoryId}/products`, {
    params: { limit },
    next:   { revalidate: 3600 },
  } as FetchOptions);
}