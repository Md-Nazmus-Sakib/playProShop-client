import { useGetSingleProductQuery } from "@/redux/api/api";
import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";

import { useDispatch } from "react-redux";

import { setProductId } from "@/redux/features/productIdSlice";

const SingleProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetSingleProductQuery(id);

  if (isLoading) {
    return <Loader></Loader>;
  }
  if (isError) {
    return isError;
  }
  const {
    _id,
    productName,
    description,
    category,
    stockQuantity,
    brand,
    rating,
    price,
    image,
    details,
  } = product.data;

  const handleClick = (id: string) => {
    dispatch(setProductId(id));
    navigate("/checkout");
  };

  return (
    <div className="md:flex gap-4 my-12">
      <div className="flex-1">
        <img className="w-full max-h-[500px]" src={image} alt="" />
        {details && (
          <div className="grid grid-cols-3 gap-4 border-b-2 shadow-md my-12 p-2">
            <h1
              style={{ shapeOutside: "circle()" }}
              className="flex justify-between text-3xl font-semibold"
            >
              <span> Details </span> <span>:</span>
            </h1>
            <p className="text-2xl font-semibold text-slate-700 col-span-2 break-words ">
              {details}
            </p>
          </div>
        )}
      </div>
      <div className="flex-1 ">
        {description && (
          <div className="grid grid-cols-3 gap-4 border-b-2 shadow-md p-2">
            <h1
              style={{ shapeOutside: "circle()" }}
              className="flex justify-between text-3xl font-semibold  "
            >
              <span> Description </span> <span>:</span>
            </h1>
            <p className="text-2xl font-semibold text-slate-700 col-span-2  break-words">
              {description}
            </p>
          </div>
        )}
        {productName && (
          <div className="grid grid-cols-3 gap-4 my-4 border-b-2 shadow-md p-2">
            <h2 className="text-xl font-semibold flex justify-between">
              <span> Product Name</span> <span>:</span>{" "}
            </h2>
            <p className="text-lg font-bold text-slate-500 col-span-2">
              {productName}
            </p>
          </div>
        )}
        {brand && (
          <div className="grid grid-cols-3 gap-4 my-4 border-b-2 shadow-md p-2">
            <h2 className="text-xl font-semibold flex justify-between">
              <span> Brand Name</span> <span>:</span>{" "}
            </h2>
            <p className="text-lg font-bold text-slate-500 col-span-2">
              {brand}
            </p>
          </div>
        )}
        {category && (
          <div className="grid grid-cols-3 gap-4 my-4 border-b-2 shadow-md p-2">
            <h2 className="text-xl font-semibold flex justify-between">
              <span> Category Name</span> <span>:</span>{" "}
            </h2>
            <p className="text-lg font-bold text-slate-500 col-span-2">
              {category}
            </p>
          </div>
        )}
        {stockQuantity && (
          <div className="grid grid-cols-3 gap-4 my-4 border-b-2 shadow-md p-2">
            <h2 className="text-xl font-semibold flex justify-between">
              <span> Stock Quantity</span> <span>:</span>{" "}
            </h2>
            <p className="text-lg font-bold text-slate-500 col-span-2">
              {stockQuantity}
            </p>
          </div>
        )}
        {price && (
          <div className="grid grid-cols-3 gap-4 my-4 border-b-2 shadow-md p-2">
            <h2 className="text-xl font-semibold flex justify-between">
              <span> Price</span> <span>:</span>{" "}
            </h2>
            <p className="text-lg font-bold text-slate-500 col-span-2">
              {price}
            </p>
          </div>
        )}
        {rating && (
          <div className="grid grid-cols-3 gap-4 my-4 border-b-2 shadow-md p-2">
            <h2 className="text-xl font-semibold flex justify-between">
              <span> Rating</span> <span>:</span>{" "}
            </h2>
            <div className="text-lg font-bold text-slate-500 col-span-2">
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
        )}
        <div className="flex justify-between w-full">
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-3 px-8 rounded-lg border"
            type="button"
          >
            Reset
          </Button>
          <Button
            type="button"
            onClick={() => handleClick(_id)}
            name="submit"
            className="bg-[#F14902] hover:bg-orange-700 text-white text-xl font-bold py-3 px-8 rounded-lg animate-pulse border"
          >
            <Link to={"/checkout"}> Buy Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetails;
