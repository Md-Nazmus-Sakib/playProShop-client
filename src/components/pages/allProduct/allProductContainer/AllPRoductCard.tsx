import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TProduct } from "../../home/featuredProduct/FeatureProductType";
import { Label } from "@radix-ui/react-label";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/redux/features/cartSlice";
import { toast } from "sonner";

const AllPRoductCard = ({ product }: { product: TProduct }) => {
  const dispatch = useDispatch();
  const {
    _id,
    productName,

    category,
    stockQuantity,
    brand,
    rating,
    price,
    image,
  } = product;

  const handleAddToCart = (id: string) => {
    dispatch(addItemToCart({ id, quantity: 1 }));
    toast.success("Product add to cart successfully");
  };

  return (
    <div className="relative my-8 flex flex-col border border-[#F14902] bg-amber-100 rounded-xl bg-clip-border text-gray-700 shadow-md hover:scale-105 transition-transform duration-300">
      <div className="relative mx-4 -mt-6 h-[200px]  rounded-xl bg-blue-gray-500 border border-[#F14902] bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
        <img className="w-full h-full rounded-xl " src={image} alt="" />
        <div className="absolute right-[-10px] bottom-[-1rem] bg-white text-[#F14902] font-extrabold text-[0.9rem] p-2 rounded-[1rem_1rem_2rem_2rem] shadow-[0_0_15px_rgba(100,100,111,0.2)]">
          ${price}
        </div>
        <Label
          htmlFor={_id}
          className=" absolute w-[19px] h-[19px] top-[30px] -right-[18px] cursor-pointer animate-bounce"
        >
          <Input
            id={_id}
            name={_id}
            className="absolute opacity-0 w-0 h-0 "
            type="checkbox"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#000000"
          >
            <path d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z"></path>
          </svg>
        </Label>
      </div>

      <div className="px-3.5 mb-20 break-words">
        {productName && (
          <div className="font-extrabold ">
            Name:{" "}
            <span className="font-extrabold text-slate-700 uppercase tracking-wide">
              {" "}
              {productName}
            </span>
          </div>
        )}

        {brand && (
          <div className="font-extrabold ">
            Brand: <span className="font-bold text-slate-700"> {brand}</span>
          </div>
        )}
        {category && (
          <div className="font-extrabold ">
            Category:{" "}
            <span className="font-bold text-slate-700"> {category}</span>
          </div>
        )}

        {stockQuantity && (
          <div className="font-extrabold ">
            Available:{" "}
            {stockQuantity > 0 ? (
              <span className="font-bold text-slate-700"> {stockQuantity}</span>
            ) : (
              <span>Not Available</span>
            )}
          </div>
        )}

        <div>
          <StarRatings
            rating={rating}
            starRatedColor="#F14902"
            starEmptyColor="black"
            starDimension="20px"
            numberOfStars={5}
            name="rating"
          />
        </div>
      </div>

      <div className="flex gap-4 absolute bottom-0 w-full ">
        <Link
          to={`/product/${_id}`}
          className="  flex-auto rounded-[1.4rem_1.4rem_0.7rem_0.7rem] border-[none] py-2 px-[0.5rem_0] bg-[#F14902] text-white font-extrabold cursor-pointer text-center"
        >
          details
        </Link>
        <Button
          type="button"
          onClick={() => handleAddToCart(_id)}
          className="grid place-content-center items-end w-12 rounded-[1.4rem_1.4rem_0.7rem_0.7rem] border-[none] py-2 px-[0.5rem_0] bg-[#F14902] text-white font-extrabold cursor-pointer"
        >
          <svg
            viewBox="0 0 27.97 25.074"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 fill-white"
          >
            <path
              d="M0,1.175A1.173,1.173,0,0,1,1.175,0H3.4A2.743,2.743,0,0,1,5.882,1.567H26.01A1.958,1.958,0,0,1,27.9,4.035l-2.008,7.459a3.532,3.532,0,0,1-3.4,2.61H8.36l.264,1.4a1.18,1.18,0,0,0,1.156.955H23.9a1.175,1.175,0,0,1,0,2.351H9.78a3.522,3.522,0,0,1-3.462-2.865L3.791,2.669A.39.39,0,0,0,3.4,2.351H1.175A1.173,1.173,0,0,1,0,1.175ZM6.269,22.724a2.351,2.351,0,1,1,2.351,2.351A2.351,2.351,0,0,1,6.269,22.724Zm16.455-2.351a2.351,2.351,0,1,1-2.351,2.351A2.351,2.351,0,0,1,22.724,20.373Z"
              id="cart-shopping-solid"
            ></path>
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default AllPRoductCard;
