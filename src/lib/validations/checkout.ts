// src/lib/validations/checkout.ts
import { z } from "zod";

export const cartItemSchema = z.object({
  productId: z.number().positive(),
  quantity:  z.number().int().min(1).max(99),
});

export const checkoutFormSchema = z.object({
  firstName:  z.string().min(1, "First name is required"),
  lastName:   z.string().min(1, "Last name is required"),
  email:      z.string().email("Enter a valid email"),
  address:    z.string().min(5, "Enter your street address"),
  city:       z.string().min(2, "Enter your city"),
  postalCode: z.string().min(2, "Enter your postal code"),
  country:    z.string().min(2, "Enter your country"),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

export type CartItemInput = z.infer<typeof cartItemSchema>;