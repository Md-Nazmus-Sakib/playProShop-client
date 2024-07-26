import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
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

type CheckoutFormData = z.infer<typeof TCheckoutFormSchema>;

const ContactInfo = () => {
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(TCheckoutFormSchema),
    defaultValues: {
      userName: "",
      userEmail: "",
      userMobile: "",
      deliveryAddress: "",
      permanentAddress: "",
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      // Implement your form submission logic here
      console.log(data);
      toast.success("Checkout successful!");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="bg-gray-100 p-8 text-black rounded-lg">
      <div className="flex justify-center items-center mb-6">
        <hr className="border border-blue-500 w-full" />
        <h1 className="text-center text-4xl font-bold mx-4">Checkout</h1>
        <hr className="border border-blue-500 w-full" />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permanentAddress"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="permanentAddress">
                  Permanent Address
                </FormLabel>
                <FormControl>
                  <Textarea
                    id="permanentAddress"
                    placeholder="Enter permanent address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-3 px-8 rounded-lg"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default ContactInfo;
