// src/lib/api/auth.ts

import { apiClient } from "./client";
import { User, AuthTokens, LoginCredentials, RegisterData } from "@/types";

export async function loginUser(
  credentials: LoginCredentials
): Promise<AuthTokens> {
  return apiClient.post<AuthTokens>("/auth/login", credentials);
}

export async function registerUser(data: RegisterData): Promise<User> {
  return apiClient.post<User>("/users", {
    name:     data.name,
    email:    data.email,
    password: data.password,
    avatar:   data.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + data.name,
    role:     "customer",
  });
}

export async function getUserProfile(token: string): Promise<User> {
  return apiClient.get<User>("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function refreshToken(
  refresh_token: string
): Promise<AuthTokens> {
  return apiClient.post<AuthTokens>("/auth/refresh-token", { refresh_token });
}