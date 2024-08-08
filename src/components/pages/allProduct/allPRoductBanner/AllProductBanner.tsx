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
      text: " Explore the Best Sporting Goods",
    },
    {
      id: 2,
      image: sliderImage2,
      text: " High-Performance Equipment for All Sports",
    },
    {
      id: 3,
      image: sliderImage3,
      text: "Your Ultimate Sporting Goods Destination",
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
                  <div className="absolute bg-black opacity-50 top-0 w-full h-[300px] rounded-lg "></div>
                  <div className="absolute top-10 md:top-0 w-full h-full z-10 text-white flex justify-center sm:items-center">
                    <div>
                      <h1 className="text-3xl md:text-5xl text-white shadow-2xl font-extrabold shadow-black text-center">
                        {slider?.text}
                      </h1>
                      <div className="w-full h-full text-white flex justify-center items-center mt-8"></div>
                    </div>
                  </div>
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
    </div>
  );
};

export default AllProductBanner;
