import { z } from "zod";

export const FormSchema = z.object({
  productName: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  brand: z.string().min(2, {
    message: "Brand must be at least 2 characters.",
  }),
  stockQuantity: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Stock quantity must be a number.",
    })
    .transform((val) => Number(val))
    .refine((val) => val >= 1, {
      message: "Stock quantity must be at least 1.",
    }),
  rating: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Rating must be a number between 0 and 5.",
    })
    .transform((val) => Number(val))
    .refine((val) => val >= 0 && val <= 5, {
      message: "Rating must be between 0 and 5.",
    }),
  details: z.string().min(5, {
    message: "Details must be at least 5 characters.",
  }),
  price: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Price must be a number.",
    })
    .transform((val) => Number(val))
    .refine((val) => val >= 0, {
      message: "Price must be at least 0.",
    }),
  image: z.string().url({
    message: "Please enter a valid URL.",
  }),
});
