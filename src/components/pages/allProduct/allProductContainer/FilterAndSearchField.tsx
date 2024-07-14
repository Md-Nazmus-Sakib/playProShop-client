import { Slider } from "@/components/ui/slider";
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
import { useState } from "react";
import { Label } from "@/components/ui/label";
import StarRatings from "react-star-ratings";
import * as Tooltip from "@radix-ui/react-tooltip";

const FilterAndSearchField = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [priceRangeMin, setPriceRangeMin] = useState<number>(0);
  const [priceRangeMax, setPriceRangeMax] = useState<number>(100);
  const [rating, setRating] = useState<number>(0);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
  };

  const handlePriceRangeChangeMin = (value: number[]) => {
    const newMin = value[0];
    if (newMin <= priceRangeMax) {
      setPriceRangeMin(newMin);
    } else {
      setPriceRangeMin(priceRangeMax - 1);
    }
  };

  const handlePriceRangeChangeMax = (value: number[]) => {
    const newMax = value[0];
    if (newMax >= priceRangeMin) {
      setPriceRangeMax(newMax);
    } else {
      setPriceRangeMax(priceRangeMin + 1);
    }
  };

  const handleReset = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setPriceRangeMin(0);
    setPriceRangeMax(100);
    setRating(0);
  };

  return (
    <div className=" col-span-1 p-4 h-full sticky top-0">
      <Command className="rounded-lg shadow-md h-full">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="max-h-full border ">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions" className="h-full ">
            {/* Category wise dropdown search */}
            <div className="flex flex-col space-y-1.5 my-2 h-full">
              <Label htmlFor="category-select">Select a Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
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
              <Select value={selectedBrand} onValueChange={handleBrandChange}>
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
            {/* Price Range Slider Min */}
            <div className="my-4">
              <Label htmlFor="price-min">Price Range Min</Label>
              <div className="my-4">Min: {priceRangeMin}</div>
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div>
                      <Slider
                        value={[priceRangeMin]}
                        max={100}
                        step={1}
                        onValueChange={handlePriceRangeChangeMin}
                        id="price-min"
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
              <Label htmlFor="price-max">Price Range Max</Label>
              <div className="my-4">Max: {priceRangeMax}</div>
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div>
                      <Slider
                        value={[priceRangeMax]}
                        max={100}
                        step={1}
                        onValueChange={handlePriceRangeChangeMax}
                        id="price-max"
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
              <Label htmlFor="rating">Rating</Label>
              <div id="rating">
                <StarRatings
                  rating={rating}
                  starRatedColor="gold"
                  starHoverColor="gold"
                  changeRating={setRating}
                  numberOfStars={5}
                  name="rating"
                  starDimension="24px"
                  starSpacing="2px"
                />
              </div>
            </div>
            <button
              onClick={handleReset}
              className="mt-2 p-2 bg-blue-500 text-white rounded"
            >
              Reset
            </button>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default FilterAndSearchField;
