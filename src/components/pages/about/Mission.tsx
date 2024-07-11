import overview from "@/assets/images/overview.jpg";
const Mission = () => {
  return (
    <div className="grid md:grid-cols-2 my-12 gap-8">
      <img className="rounded-lg" src={overview} alt="" />
      <div className="">
        <h1 className="text-5xl border-b-2 border-[#F14902] inline my-4">
          <span className="text-[#F14902]">M</span>ission
        </h1>

        <p className="text-2xl text-gray-500 my-4 text-justify">
          Our mission is to provide athletes and sports enthusiasts with the
          best gear and equipment to help them achieve their full potential. We
          strive to offer top-quality products at competitive prices, backed by
          exceptional customer service and a seamless online shopping
          experience.
        </p>
      </div>
    </div>
  );
};

export default Mission;
