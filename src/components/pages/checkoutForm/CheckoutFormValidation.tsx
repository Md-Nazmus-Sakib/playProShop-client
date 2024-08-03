import { z } from "zod";

// Define the schema for checkout form data
const productQuantitiesSchema = z.record(z.string(), z.number().min(1));

export const TCheckoutFormSchema = z.object({
  userName: z.string().min(1, "Name is required"),
  userEmail: z.string().email("Invalid email address"),
  userMobile: z
    .string()
    .min(11, "Mobile number must be at least 11 digits long"),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  paymentMethod: z.enum(["Cash on Delivery", "Card Pay"]),
  orderedProduct: productQuantitiesSchema,
  totalPrice: z
    .number()
    .nonnegative("Total price must be a non-negative number"),
});

// Define the type based on the schema
export type CheckoutFormData = z.infer<typeof TCheckoutFormSchema>;

// Extend the type to include additional fields for order submission
export type CheckoutOrderData = CheckoutFormData & {
  orderDate: string;
  transactionId?: string;
  paymentDate?: Date;
  status?: string;
};
