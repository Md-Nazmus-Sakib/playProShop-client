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
import { useAddProductMutation } from "@/redux/api/api";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, CreateProductSchema } from "./CreateProductValidation";

type FormData = z.infer<typeof CreateProductSchema>;

const CreateProduct = () => {
  const [addProduct] = useAddProductMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      productName: "",
      description: "",
      category: undefined,
      brand: "",
      stockQuantity: 0,
      rating: 0,
      details: "",
      price: 0,
      image: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await addProduct({ data }).unwrap();
      form.reset();

      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

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
                      <FormLabel htmlFor="productName">Product Name</FormLabel>
                      <FormControl>
                        <Input
                          id="productName"
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
                      <FormLabel htmlFor="category-select">
                        Select a Category
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ?? ""}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger
                            id="category-select"
                            className="w-full border-none focus:ring-0 rounded-none text-black"
                          >
                            <SelectValue placeholder="Select a Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Category</SelectLabel>
                              {categories.map((category, index) => (
                                <SelectItem key={index} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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
                      <FormLabel htmlFor="brand">Brand</FormLabel>
                      <FormControl>
                        <Input
                          id="brand"
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
                      <FormLabel htmlFor="stockQuantity">
                        Stock Quantity
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="stockQuantity"
                          className="text-black"
                          placeholder="Enter the stock quantity"
                          type="number"
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
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
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
                      <FormLabel htmlFor="details">Details</FormLabel>
                      <FormControl>
                        <Textarea
                          id="details"
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
                      <FormLabel htmlFor="price">Price</FormLabel>
                      <FormControl>
                        <Input
                          id="price"
                          className="text-black"
                          placeholder="0"
                          type="number"
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
                      <FormLabel htmlFor="image">Image URL</FormLabel>
                      <FormControl>
                        <Input
                          id="image"
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
                    <FormLabel htmlFor="rating">Rating</FormLabel>
                    <FormControl>
                      <StarRatings
                        rating={field.value}
                        starRatedColor="orange"
                        starHoverColor="orange"
                        changeRating={(newRating) => field.onChange(newRating)}
                        numberOfStars={5}
                        name="rating"
                        starDimension="40px"
                        starSpacing="5px"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white w-full"
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
