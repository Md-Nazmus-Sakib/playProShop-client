import React from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { TCheckoutFormSchema } from "./CheckoutFormValidation";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hook";
import { selectOrderSummary } from "@/redux/features/orderSummarySlice";

type CheckoutFormData = z.infer<typeof TCheckoutFormSchema>;

const ContactInfo = () => {
  const { quantities, totalPrice } = useAppSelector(selectOrderSummary);
  const navigate = useNavigate();
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(TCheckoutFormSchema),
    defaultValues: {
      userName: "",
      userEmail: "",
      userMobile: "",
      deliveryAddress: "",
      paymentMethod: "Cash on Delivery",
    },
    mode: "onChange", // Validate on change to update form state
  });

  const { isValid } = form.formState;

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      console.log({ ...data, quantities, totalPrice });

      if (data.paymentMethod === "Card Pay") {
        navigate("/payment");
      } else {
        toast.success("Checkout successful!");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="bg-gray-100  text-black rounded-lg">
      <div className="flex justify-center items-center mb-6">
        <hr className="border border-blue-500 w-full" />
        <h1 className="text-center text-4xl font-bold mx-4">Contact Details</h1>
        <hr className="border border-blue-500 w-full" />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="userName">User Name</FormLabel>
                <FormControl>
                  <Input
                    id="userName"
                    placeholder="Enter your name"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.userName?.message?.toString()}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="userEmail">Email</FormLabel>
                <FormControl>
                  <Input
                    id="userEmail"
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.userEmail?.message?.toString()}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userMobile"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="userMobile">Mobile Number</FormLabel>
                <FormControl>
                  <Input
                    id="userMobile"
                    placeholder="Enter your mobile number"
                    type="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.userMobile?.message?.toString()}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deliveryAddress"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="deliveryAddress">
                  Delivery Address
                </FormLabel>
                <FormControl>
                  <Textarea
                    id="deliveryAddress"
                    placeholder="Enter delivery address"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.deliveryAddress?.message?.toString()}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <h1 className="text-lg font-semibold mb-4">Payment Method</h1>
                <div className="flex gap-4">
                  <label
                    className={`cursor-pointer bg-white/40 hover:bg-white/20 w-72 p-4 rounded-md flex justify-between items-center shadow ${
                      field.value === "Cash on Delivery"
                        ? "bg-white/30 text-indigo-900 ring-indigo-200 ring-2"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-5">
                      <h2 className="text-lg">Cash on Delivery</h2>
                    </div>
                    <input
                      type="radio"
                      value="Cash on Delivery"
                      checked={field.value === "Cash on Delivery"}
                      onChange={() => field.onChange("Cash on Delivery")}
                      className="checked:border-indigo-500 h-5 w-5"
                    />
                  </label>
                  <label
                    className={`cursor-pointer bg-white/40 hover:bg-white/20 w-72 p-4 rounded-md flex justify-between items-center shadow ${
                      field.value === "Card Pay"
                        ? "bg-white/30 text-indigo-900 ring-indigo-200 ring-2"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="blue"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                        />
                      </svg>
                      <h2 className="text-lg">Card Pay</h2>
                    </div>
                    <input
                      type="radio"
                      value="Card Pay"
                      checked={field.value === "Card Pay"}
                      onChange={() => field.onChange("Card Pay")}
                      className="checked:border-indigo-500 h-5 w-5"
                    />
                  </label>
                </div>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700  text-white text-xl font-bold py-3 px-8 rounded-lg ${
                !isValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isValid}
            >
              Place Order
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ContactInfo;
