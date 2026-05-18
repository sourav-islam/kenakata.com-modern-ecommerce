// src/lib/api/categories.ts

import { apiClient } from "./client";
import { Category } from "@/types";

export async function getCategories(): Promise<Category[]> {
  return apiClient.get<Category[]>("/categories", {
    next: { revalidate: 86400 }, // 24 hour — categories kam change hoy
  } as RequestInit & { next?: { revalidate: number } });
}

export async function getCategoryById(id: number): Promise<Category> {
  return apiClient.get<Category>(`/categories/${id}`, {
    next: { revalidate: 86400 },
  } as RequestInit & { next?: { revalidate: number } });
}