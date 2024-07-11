import overview from "@/assets/images/overview.jpg";
const Overview = () => {
  return (
    <div className="grid md:grid-cols-2 my-12 gap-8">
      <div className="">
        <h1 className="text-5xl border-b-2 border-[#F14902] inline my-4">
          <span className="text-[#F14902]">O</span>verview
        </h1>

        <p className="text-2xl text-gray-500 my-4 text-justify">
          PlayProShop is a premier online destination for all your sporting
          goods needs. Established in 2020, PlayProShop has rapidly grown to
          become a trusted name in the industry, offering a wide range of
          high-quality sports equipment, apparel, and accessories for athletes
          and enthusiasts of all levels.
        </p>
      </div>
      <img className="rounded-lg" src={overview} alt="" />
    </div>
  );
};

export default Overview;
