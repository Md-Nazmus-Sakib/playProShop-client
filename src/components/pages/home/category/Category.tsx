type TCategory = {
  id: number;
  name: string;
  image: string;
};

const Category = () => {
  const category: TCategory = [
    {
      id: 1,
      name: "Football Equipment",
      image: "football_equipment.png",
    },
    {
      id: 2,
      name: "Basketball Gear",
      image: "basketball_gear.png",
    },
    {
      id: 3,
      name: "Baseball Accessories",
      image: "baseball_accessories.png",
    },
    {
      id: 4,
      name: "Tennis Equipment",
      image: "tennis_equipment.png",
    },
    {
      id: 5,
      name: "Golf Gear",
      image: "golf_gear.png",
    },
    {
      id: 6,
      name: "Swimming Gear",
      image: "swimming_gear.png",
    },
  ];
  return (
    <div className="mt-8">
      <div className="flex justify-center items-center">
        <hr className="border border-orange-500 w-full" />
        <h1 className="text-center text-5xl font-extrabold mx-4">Category</h1>
        <hr className="border border-orange-500 w-full" />
      </div>
    </div>
  );
};

export default Category;
