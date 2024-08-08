import { useGetSingleProductQuery } from "@/redux/api/api";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { useDispatch } from "react-redux";

import { setProductId } from "@/redux/features/productIdSlice";
import { addItemToCart } from "@/redux/features/cartSlice";

const SingleProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetSingleProductQuery(id);

  if (isLoading) {
    return <Loader></Loader>;
  }
  if (isError) {
    return <div>Error loading product.</div>;
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
  };
  const handleAddToCart = (id: string) => {
    dispatch(addItemToCart({ id, quantity: 1 }));
  };

  return (
    <div className="md:flex gap-4 my-12">
      <div className="flex-1">
        <img className="w-full max-h-[500px]" src={image} alt="" />
        {details && (
          <div className="grid grid-cols-3 gap-4 border-b-2 shadow-md my-12 p-2">
            <h1 className="flex justify-between text-3xl font-semibold">
              <span> Details </span> <span>:</span>
            </h1>
            <span className="text-2xl font-semibold text-slate-700 col-span-2 break-words">
              {details}
            </span>
          </div>
        )}
      </div>
      <div className="flex-1">
        {description && (
          <div className="grid grid-cols-3 gap-4 border-b-2 shadow-md p-2">
            <h1 className="flex justify-between text-3xl font-semibold">
              <span> Description </span> <span>:</span>
            </h1>
            <span className="text-2xl font-semibold text-slate-700 col-span-2 break-words">
              {description}
            </span>
          </div>
        )}
        {productName && (
          <div className="grid grid-cols-3 gap-4 my-4 border-b-2 shadow-md p-2">
            <h2 className="text-xl font-semibold flex justify-between">
              <span> Product Name</span> <span>:</span>
            </h2>
            <span className="text-lg font-bold text-slate-500 col-span-2">
              {productName}
            </span>
          </div>
        )}
        {brand && (
          <div className="grid grid-cols-3 gap-4 my-4 border-b-2 shadow-md p-2">
            <h2 className="text-xl font-semibold flex justify-between">
              <span> Brand Name</span> <span>:</span>
            </h2>
            <span className="text-lg font-bold text-slate-500 col-span-2">
              {brand}
            </span>
          </div>
        )}
        {category && (
          <div className="grid grid-cols-3 gap-4 my-4 border-b-2 shadow-md p-2">
            <h2 className="text-xl font-semibold flex justify-between">
              <span> Category Name</span> <span>:</span>
            </h2>
            <span className="text-lg font-bold text-slate-500 col-span-2">
              {category}
            </span>
          </div>
        )}
        {stockQuantity && (
          <div className="grid grid-cols-3 gap-4 my-4 border-b-2 shadow-md p-2">
            <h2 className="text-xl font-semibold flex justify-between">
              <span> Stock Quantity</span> <span>:</span>
            </h2>
            <span className="text-lg font-bold text-slate-500 col-span-2">
              {stockQuantity}
            </span>
          </div>
        )}
        {price && (
          <div className="grid grid-cols-3 gap-4 my-4 border-b-2 shadow-md p-2">
            <h2 className="text-xl font-semibold flex justify-between">
              <span> Price</span> <span>:</span>
            </h2>
            <span className="text-lg font-bold text-slate-500 col-span-2">
              {price}
            </span>
          </div>
        )}
        {rating && (
          <div className="grid grid-cols-3 gap-4 my-4 border-b-2 shadow-md p-2">
            <h2 className="text-xl font-semibold flex justify-between">
              <span> Rating</span> <span>:</span>
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
            onClick={() => handleAddToCart(_id)}
            className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-3 px-8 rounded-lg border"
            type="button"
          >
            Add to Cart
          </Button>

          <Button
            onClick={() => handleClick(_id)}
            className="bg-red-500 hover:bg-red-700 text-white text-xl font-bold py-3 px-8 rounded-lg border"
            type="button"
          >
            {" "}
            <Link to="/checkout">Buy Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetails;
