import { TCategory } from "./CategoryType";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CategoryCard = ({ category }: { category: TCategory }) => {
  const { name, image } = category;
  return (
    <Card className=" relative group cursor-pointer overflow-hidden duration-500 h-64 bg-zinc-800 text-gray-50 p-5">
      <img
        className="group-hover:scale-110 w-full h-48  duration-500"
        src={image}
        alt=""
      />
      <CardContent className="absolute w-[100%] left-0 p-5 -bottom-16 duration-500 group-hover:-translate-y-12  text-center">
        <div className="absolute -z-10 left-0 w-full h-28 opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-blue-900"></div>
        <span className="text-xl font-bold block my-4">{name}</span>

        <Button className="group-hover:opacity-100 w-56 duration-500 opacity-0">
          Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
