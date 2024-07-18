/* eslint-disable @typescript-eslint/no-explicit-any */
import { Slider } from "@/components/ui/slider";
import { Command, CommandGroup, CommandList } from "@/components/ui/command";
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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilters } from "@/redux/features/querySlice";
import { Input } from "@/components/ui/input";

// Define schema for form validation using Zod
const formSchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const FilterDialog = () => {
  const dispatch = useDispatch();
  const { data: queries, isLoading, isError } = useGetQueryQuery(undefined);
  const maxValue = queries?.data?.maxPrice?.[0]?.maxPrice;

  // Initialize the form with react-hook-form and Zod resolver
  const { control, handleSubmit, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  // State variable to keep track of the input value
  const [searchText, setSearchText] = useState("");

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // Handle search action
  const handleSearch = () => {
    if (searchText.trim() !== "") {
      const searchField = { searchTerm: searchText };
      dispatch(setFilters(searchField));
      // Clear the search input
      setSearchText("");
    }
  };

  // Handle "Enter" key press
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      handleSearch();
    }
  };
  // State for price sorting
  const [checked, setChecked] = useState(false);

  // Handle change in price sorting checkbox
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    const newPriceSort = { sort: isChecked ? "-price" : "price" };
    dispatch(setFilters(newPriceSort));
  };

  // State for price range sliders
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  // Update maxPrice state when the queries data changes
  useEffect(() => {
    if (queries?.data?.maxPrice?.[0]?.maxPrice !== undefined) {
      setMaxPrice(queries.data.maxPrice[0].maxPrice);
    }
  }, [queries]);

  // Handle form submission
  const onSubmit = (data: FormSchema) => {
    const filterField: any = {
      category: data?.category,
      brand: data?.brand,
      minPrice: minPrice,
      maxPrice: maxPrice,
      rating: data?.rating,
    };
    dispatch(setFilters(filterField));
  };

  // Handle form reset
  const handleReset = () => {
    reset();
    setMinPrice(0);
    setMaxPrice(maxValue);
    dispatch(
      setFilters({
        searchTerm: "",
        category: "",
        brand: "",
        minPrice: 0,
        maxPrice: maxValue ?? 100,
        rating: 0,
        sort: "",
      })
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading Queries.</div>;
  }

  return (
    <div>
      <Command className="rounded-lg h-full">
        <div className="bg-slate-200 p-4 mb-4 rounded-lg">
          {/* Search Input */}
          <Input
            className="bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-lg px-4 py-2 shadow-md focus:shadow-lg focus:shadow-rose-400 dark:shadow-md dark:shadow-purple-500"
            placeholder="Search here..."
            name="text"
            type="text"
            value={searchText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress} // Add this line to handle "Enter" key press
          />
          <div className="flex justify-end mt-2">
            <Button
              className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-green-500 group px-4 bg-blue-400"
              onClick={handleSearch}
            >
              <span className="relative z-10 text-[#F14902] group-hover:text-white text-xl duration-500">
                Search
              </span>
              <span className="absolute w-full h-full bg-[#F14902] -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
              <span className="absolute w-full h-full bg-[#F14902] -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
            </Button>
          </div>
          <hr className="my-2" />
        </div>
        <CommandList className="max-h-full border bg-slate-100 p-4 rounded-lg ">
          {/* Sort by Price */}
          <div>
            <div className="my-2">Sort By Price</div>
            <Label className="relative inline-flex items-center cursor-pointer">
              <Input
                className="sr-only peer"
                value=""
                type="checkbox"
                checked={checked}
                onChange={handleChange}
              />
              <div
                className={`peer rounded-br-2xl rounded-tl-2xl outline-none border-2 border-[#F14902]  duration-100 after:duration-500 px-4 ${
                  checked ? "bg-green-300" : "bg-blue-300"
                } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F14902] flex justify-center items-center delay-300 duration-300 text-xl font-semibold `}
              >
                {checked ? "Price HL" : "Price LH"}
              </div>
            </Label>
          </div>
          <hr className="my-2 mt-4" />
          {/* Filtering Form */}
          <CommandGroup heading="Filtering" className="h-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Category Dropdown */}
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
                          {queries?.data?.categories?.map(
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
              {/* Brand Dropdown */}
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
                            if (newMin <= (maxPrice ?? 100)) {
                              setMinPrice(newMin);
                            } else {
                              setMinPrice((maxPrice ?? 100) - 1);
                            }
                          }}
                          id="price-min"
                          name="price-min"
                        />
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <div className="p-2 bg-black text-white rounded">
                        {maxPrice ?? "Loading..."}
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
                          value={[maxPrice ?? 100]}
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
              {/* Rating Input */}
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
              {/* Form Actions */}
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
