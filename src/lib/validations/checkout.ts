// src/lib/validations/checkout.ts
import { z } from "zod";

export const cartItemSchema = z.object({
  productId: z.number().positive(),
  quantity:  z.number().int().min(1).max(99),
});

export type CartItemInput = z.infer<typeof cartItemSchema>;