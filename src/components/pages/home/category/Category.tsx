import CategoryCard from "./CategoryCard";
import { TCategory } from "./CategoryType";
import footballEquipment from "@/assets/images/football_equipment.jpg";

const Category = () => {
  const categories: TCategory[] = [
    {
      id: 1,
      name: "Football Equipment",
      image: footballEquipment,
    },
    {
      id: 2,
      name: "Basketball Gear",
      image: footballEquipment,
    },
    {
      id: 3,
      name: "Baseball Accessories",
      image: footballEquipment,
    },
    {
      id: 4,
      name: "Tennis Equipment",
      image: footballEquipment,
    },
    {
      id: 5,
      name: "Golf Gear",
      image: footballEquipment,
    },
    {
      id: 6,
      name: "Swimming Gear",
      image: footballEquipment,
    },
  ];
  return (
    <div className="mt-8">
      <div className="flex justify-center items-center">
        <hr className="border border-orange-500 w-full" />
        <h1 className="text-center text-5xl font-extrabold mx-4">Category</h1>
        <hr className="border border-orange-500 w-full" />
      </div>
      <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category: TCategory) => (
          <CategoryCard key={category.id} category={category}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default Category;
