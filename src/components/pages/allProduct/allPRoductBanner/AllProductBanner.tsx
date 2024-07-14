import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import sliderImage1 from "@/assets/images/image-1.jpg";
import sliderImage2 from "@/assets/images/image-2.jpg";
import sliderImage3 from "@/assets/images/image-3.jpg";

const AllProductBanner = () => {
  const sliderData = [
    {
      id: 1,
      image: sliderImage1,
    },
    {
      id: 2,
      image: sliderImage2,
    },
    {
      id: 3,
      image: sliderImage3,
    },
  ];

  return (
    <div className="relative w-full h-[300px] mt-6">
      <Carousel
        className=" overflow-hidden rounded-lg shadow-lg"
        plugins={[
          Autoplay({
            delay: 6000,
          }),
        ]}
      >
        <CarouselContent className="flex">
          {sliderData.map((slider) => (
            <CarouselItem key={slider.id} className="min-w-full">
              <Card className="bg-transparent">
                <CardContent className="flex items-center justify-center h-[300px] p-0">
                  <img
                    src={slider?.image}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    alt=""
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute z-50 left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
          &#9664;
        </CarouselPrevious>
        <CarouselNext className="absolute z-50 right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
          &#9654;
        </CarouselNext>
      </Carousel>
      <div className="absolute bg-black opacity-50 top-0 w-full h-[300px] rounded-lg "></div>
      <div className="absolute top-0 w-full h-full z-10 text-white flex justify-center items-center">
        <div>
          <h1 className="text-3xl md:text-5xl text-white shadow-2xl font-extrabold shadow-black text-center">
            Explore the Best Sporting Goods
          </h1>
          <div className="w-full h-full text-white flex justify-center items-center mt-8">
            <button className="bg-[#F14902] hover:bg-orange-700 text-white text-xl font-bold py-3 px-8 rounded-lg animate-pulse border ">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductBanner;
