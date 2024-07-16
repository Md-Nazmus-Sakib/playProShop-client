import { Slider } from "@/components/ui/slider"; // Ensure this path is correct
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import StarRatings from "react-star-ratings";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "../../shared/loader/Loader";
import { useGetQueryQuery } from "@/redux/api/api";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const formSchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const FilterDialog = () => {
  const { data: queries, isLoading, isError } = useGetQueryQuery(undefined);
  const maxValue = queries?.data?.maxPrice?.[0]?.maxPrice;
  const { control, handleSubmit, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(maxValue);

  const onSubmit = (data: FormSchema) => {
    const filterField = {
      category: data.category,
      brand: data.brand,
      minPrice: minPrice,
      maxPrice: maxPrice,
      rating: data.rating,
    };
    console.log(filterField);
  };

  const handleReset = () => {
    reset();
    setMinPrice(0);
    setMaxPrice(maxValue);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading Queries.</div>;
  }

  return (
    <div>
      <Command className="rounded-lg shadow-md h-full bg-slate-100 p-4">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="max-h-full border">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions" className="h-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Category wise dropdown search */}
              <div className="flex flex-col space-y-1.5 my-2 h-full">
                <Label htmlFor="category-select">Select a Category</Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ?? ""}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger
                        id="category-select"
                        className="w-full border-none focus:ring-0 rounded-none"
                      >
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Category</SelectLabel>
                          {queries?.data?.categories.map(
                            (category: string, index: number) => (
                              <SelectItem key={index} value={category}>
                                {category}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {/* Brand wise dropdown search */}
              <div className="flex flex-col space-y-1.5 my-2">
                <Label htmlFor="brand-select">Select a Brand</Label>
                <Controller
                  name="brand"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ?? ""}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger
                        id="brand-select"
                        className="w-full border-none focus:ring-0 rounded-none"
                      >
                        <SelectValue placeholder="Select a Brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Brand</SelectLabel>
                          {queries?.data?.brands.map(
                            (brand: string, index: number) => (
                              <SelectItem key={index} value={brand}>
                                {brand}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <hr />
              {/* Price Range Slider Min */}
              <div className="my-4">
                <div>Price Range Min</div>
                <div className="my-4">Min: {minPrice}</div>
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <div>
                        <Slider
                          value={[minPrice]}
                          max={maxValue}
                          step={1}
                          onValueChange={(value) => {
                            const newMin = value[0];
                            if (newMin <= maxPrice) {
                              setMinPrice(newMin);
                            } else {
                              setMinPrice(maxPrice - 1);
                            }
                          }}
                          id="price-min"
                          name="price-min"
                        />
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <div className="p-2 bg-black text-white rounded">
                        {minPrice}
                      </div>
                    </Tooltip.Content>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>
              {/* Price Range Slider Max */}
              <div className="my-4">
                <div>Price Range Max</div>
                <div className="my-4">Max: {maxPrice}</div>
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <div>
                        <Slider
                          value={[maxPrice]}
                          max={maxValue}
                          step={1}
                          onValueChange={(value) => {
                            const newMax = value[0];
                            if (newMax >= minPrice) {
                              setMaxPrice(newMax);
                            } else {
                              setMaxPrice(minPrice + 1);
                            }
                          }}
                          id="price-max"
                          name="price-max"
                        />
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <div className="p-2 bg-black text-white rounded">
                        {maxPrice}
                      </div>
                    </Tooltip.Content>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>
              <hr />
              {/* Rating Wise Search */}
              <div className="my-4">
                <div>Rating</div>
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => (
                    <div id="rating">
                      <StarRatings
                        rating={Number(field.value ?? 0)} // Ensure rating is always a number
                        starRatedColor="gold"
                        starHoverColor="gold"
                        changeRating={(newRating) => {
                          field.onChange(newRating);
                        }}
                        numberOfStars={5}
                        starDimension="24px"
                        starSpacing="2px"
                      />
                    </div>
                  )}
                />
              </div>
              <div className="flex justify-between w-full">
                <Button
                  className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-3 px-8 rounded-lg border"
                  type="button"
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  name="submit"
                  className="bg-[#F14902] hover:bg-orange-700 text-white text-xl font-bold py-3 px-8 rounded-lg animate-pulse border"
                >
                  Submit
                </Button>
              </div>
            </form>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default FilterDialog;
