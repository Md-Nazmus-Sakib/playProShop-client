import { z } from "zod";

export const TCheckoutFormSchema = z.object({
  userName: z.string().min(1, "User Name is required"),
  userEmail: z.string().email("Invalid email address"),
  userMobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number is too long"),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  permanentAddress: z.string().min(1, "Permanent address is required"),
});
