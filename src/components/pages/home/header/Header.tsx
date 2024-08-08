import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import banner_1 from "@/assets/images/productBanner/img-1.png";
import banner_2 from "@/assets/images/productBanner/img-2.png";
import banner_3 from "@/assets/images/productBanner/img-3.png";
import banner_4 from "@/assets/images/productBanner/img-4.png";
import banner_5 from "@/assets/images/productBanner/img-5.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const settings = {
    arrows: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,

    autoplay: true,
    autoplaySpeed: 2500,
  };

  const keyframes = `
    @keyframes animateBg {
        100% {
            filter: hue-rotate(360deg);
        }
    }
`;

  return (
    <div className="my-12 ">
      <style>{keyframes}</style>
      <div className="py-4 rounded-xl relative min-h-[600px] flex justify-center items-center flex-col md:flex-row bg-[#D8E7CF] text-black  overflow-hidden">
        <div className="w-full md:w-1/2 flex justify-center items-center relative pb-20">
          <div className="w-full p-4 text-center mx-auto mb-4">
            <h2 className="text-5xl md:text-3xl lg:text-5xl font-extrabold my-8 uppercase tracking-wide flex justify-start">
              Explore the Best
            </h2>
            <h1 className="text-7xl md:text-5xl lg:text-7xl font-extrabold my-8 uppercase text-[#F14902] tracking-wide">
              20% OFF
            </h1>
            <h2 className="text-5xl md:text-3xl lg:text-5xl font-extrabold my-8 uppercase tracking-wide flex justify-end">
              Sporting Goods
            </h2>
            <Button className="bg-[#F14902] hover:bg-orange-700 text-white text-xl font-bold py-3 px-8 rounded-lg animate-pulse">
              <Link to={"/product"}> Buy Now</Link>
            </Button>
          </div>
          <div className="absolute bottom-8 animate-bounce w-12 h-12"></div>
        </div>

        <div
          className="w-full h-full md:w-1/2"
          style={{ animation: "animateBg 10s linear infinite" }}
        >
          <Slider {...settings}>
            <img className="w-full" src={banner_1} alt="" />

            <img className="w-full" src={banner_2} alt="" />

            <img className="w-full" src={banner_3} alt="" />

            <img className="w-full" src={banner_4} alt="" />

            <img className="w-full" src={banner_5} alt="" />
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Header;
