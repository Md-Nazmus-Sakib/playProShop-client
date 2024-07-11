import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import StarRatings from "react-star-ratings";

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
import { FormSchema } from "./CreateProductValidation";

const CreateProduct = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      productName: "",
      description: "",
      category: "",
      brand: "",
      stockQuantity: 0,
      rating: 0,
      details: "",
      price: 0,
      image: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div className="bg-black p-8 text-white rounded-lg">
      <div className="flex justify-center items-center">
        <hr className="border border-orange-500 w-full" />
        <h1 className="text-center text-5xl font-extrabold mx-4">
          Create Product
        </h1>
        <hr className="border border-orange-500 w-full" />
      </div>
      <div className="">
        <div className="md:p-8 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="md:flex w-full justify-between gap-4">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black"
                          placeholder="Enter your product name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black"
                          placeholder="Enter the category"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:flex w-full justify-between gap-4">
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black"
                          placeholder="Enter the brand name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stockQuantity"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Stock Quantity</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black"
                          placeholder="Enter the stock quantity"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:flex w-full justify-between gap-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="text-black"
                          placeholder="Enter the product short description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Details</FormLabel>
                      <FormControl>
                        <Textarea
                          className="text-black"
                          placeholder="Enter product details"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:flex w-full justify-between gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black"
                          placeholder="Enter the price"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black"
                          placeholder="Enter the image URL"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <StarRatings
                        rating={Number(field.value) || 0} // Ensure rating is always a number
                        starRatedColor="gold"
                        starHoverColor="gold"
                        changeRating={
                          (newRating) => field.onChange(newRating.toString()) // Convert newRating to string explicitly
                        }
                        numberOfStars={5}
                        name="rating"
                        starDimension="24px"
                        starSpacing="2px"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-[#F14902] hover:bg-orange-700 text-white text-xl font-bold py-3 px-8 rounded-lg animate-pulse border"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
