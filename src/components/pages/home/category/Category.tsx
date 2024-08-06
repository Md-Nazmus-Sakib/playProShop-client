import CategoryCard from "./CategoryCard";
import { TCategory } from "./CategoryType";
import fitnessEquipment from "@/assets/images/category/fitness.png";
import teamEquipment from "@/assets/images/category/team.png";
import outdoorEquipment from "@/assets/images/category/outdoor.png";
import waterEquipment from "@/assets/images/category/water.png";
import cyclingEquipment from "@/assets/images/category/cycling.png";
import golfEquipment from "@/assets/images/category/golf.png";

const Category = () => {
  const categories: TCategory[] = [
    {
      id: 1,
      name: "Fitness Equipment",
      image: fitnessEquipment,
    },
    {
      id: 2,
      name: "Team Sports Gear",
      image: teamEquipment,
    },
    {
      id: 3,
      name: "Outdoor Recreation",
      image: outdoorEquipment,
    },
    {
      id: 4,
      name: "Water Sports",
      image: waterEquipment,
    },
    {
      id: 5,
      name: "Cycling",
      image: cyclingEquipment,
    },
    {
      id: 6,
      name: "Golf",
      image: golfEquipment,
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
