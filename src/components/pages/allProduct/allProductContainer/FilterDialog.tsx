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

import { useState } from "react";

import * as Tooltip from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Import Slider from a library like @mui/material if you are using it
// import Slider from '@mui/material/Slider';

const formSchema = z.object({
  priceRangeMin: z.number().optional(),
  priceRangeMax: z.number().optional(),
  rating: z.number().min(0).max(5).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const FilterDialog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [priceRangeMin, setPriceRangeMin] = useState<number>(0);
  const [priceRangeMax, setPriceRangeMax] = useState<number>(100);
  const [rating, setRating] = useState<number>(0);

  const { control, handleSubmit, setValue, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  };

  const handleReset = () => {
    reset();
    setPriceRangeMin(0);
    setPriceRangeMax(100);
    setSelectedCategory("");
    setSelectedBrand("");
    setRating(0);
  };

  return (
    <div>
      <Command className="rounded-lg shadow-md h-full bg-slate-100">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="max-h-full border ">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions" className="h-full ">
            {/* Category wise dropdown search */}
            <div className="flex flex-col space-y-1.5 my-2 h-full">
              <Label htmlFor="category-select">Select a Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value)}
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
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* Brand wise dropdown search */}
            <div className="flex flex-col space-y-1.5 my-2">
              <Label htmlFor="brand-select">Select a Brand</Label>
              <Select
                value={selectedBrand}
                onValueChange={(value) => setSelectedBrand(value)}
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
                    <SelectItem value="brand-1">Brand-1</SelectItem>
                    <SelectItem value="brand-2">Brand-2</SelectItem>
                    <SelectItem value="brand-3">Brand-3</SelectItem>
                    <SelectItem value="brand-4">Brand-4</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Price Range Slider Min */}
              <div className="my-4">
                <div>Price Range Min</div>
                <div className="my-4">Min: {priceRangeMin}</div>
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <div>
                        <Slider
                          value={[priceRangeMin]}
                          max={100}
                          step={1}
                          onValueChange={(value) => {
                            const newMin = value[0];
                            if (newMin <= priceRangeMax) {
                              setPriceRangeMin(newMin);
                              setValue("priceRangeMin", newMin);
                            } else {
                              setPriceRangeMin(priceRangeMax - 1);
                              setValue("priceRangeMin", priceRangeMax - 1);
                            }
                          }}
                          id="price-min"
                          name="price-min"
                        />
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <div className="p-2 bg-black text-white rounded">
                        {priceRangeMin}
                      </div>
                    </Tooltip.Content>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>

              {/* Price Range Slider Max */}
              <div className="my-4">
                <div>Price Range Max</div>
                <div className="my-4">Max: {priceRangeMax}</div>
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <div>
                        <Slider
                          value={[priceRangeMax]}
                          max={100}
                          step={1}
                          onValueChange={(value) => {
                            const newMax = value[0];
                            if (newMax >= priceRangeMin) {
                              setPriceRangeMax(newMax);
                              setValue("priceRangeMax", newMax);
                            } else {
                              setPriceRangeMax(priceRangeMin + 1);
                              setValue("priceRangeMax", priceRangeMin + 1);
                            }
                          }}
                          id="price-max"
                          name="price-max"
                        />
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <div className="p-2 bg-black text-white rounded">
                        {priceRangeMax}
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
                        rating={Number(field.value) || 0} // Ensure rating is always a number
                        starRatedColor="gold"
                        starHoverColor="gold"
                        changeRating={(newRating) => {
                          field.onChange(newRating);
                          setRating(newRating);
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
