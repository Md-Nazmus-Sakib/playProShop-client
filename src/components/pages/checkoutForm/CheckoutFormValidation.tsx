import { z } from "zod";

export const TCheckoutFormSchema = z.object({
  userName: z.string().min(1, "Name is required"),
  userEmail: z.string().email("Invalid email address"),
  userMobile: z
    .string()
    .min(11, "Mobile number must be at least 11 digits long"),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  paymentMethod: z.enum(["Cash on Delivery", "Card Pay"]),
});
