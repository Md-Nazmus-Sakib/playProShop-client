import React, { useState } from "react";
import { useAppSelector } from "@/redux/hook";
import { useGetSingleProductQuery } from "@/redux/api/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Loader from "../shared/loader/Loader";
import { TProduct } from "../home/featuredProduct/FeatureProductType";

const OrderSummary: React.FC = () => {
  const productId = useAppSelector((state) => state.productId.productId) as
    | string
    | null;

  const [quantity, setQuantity] = useState(1);
  const { data, isLoading, isError } = useGetSingleProductQuery(productId, {
    skip: !productId,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h1 color="red">Error loading product details.</h1>;
  }

  const { productName, stockQuantity, brand, rating, price, image } =
    data?.data as TProduct;

  const handleIncrement = () => {
    if (quantity < stockQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const grossPrice = price * quantity;
  const discount = grossPrice * 0.2;
  const deliveryCharge = 100;
  const totalPrice = grossPrice - discount + deliveryCharge;

  return (
    <Card>
      <div className="flex justify-center items-center mb-6">
        <hr className="border border-blue-500 w-full" />
        <h1 className="text-center text-4xl font-bold mx-4">Order Summary</h1>
        <hr className="border border-blue-500 w-full" />
      </div>

      <CardContent>
        <div className="lg:flex justify-between border-b-2 shadow-md p-2">
          <div className="flex flex-col md:flex-row items-center">
            <img
              src={image}
              alt={productName}
              className="w-32 h-32 object-cover mr-4"
            />
            <div>
              <CardTitle>{productName}</CardTitle>
              <CardDescription>Brand: {brand}</CardDescription>
              <CardDescription>Rating: {rating}</CardDescription>
              <CardDescription>Price: ${price}</CardDescription>
              <CardDescription>In Stock: {stockQuantity}</CardDescription>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <Button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="mr-2"
            >
              -
            </Button>
            <h1>{quantity}</h1>
            <Button
              onClick={handleIncrement}
              disabled={quantity >= stockQuantity}
              className="ml-2"
            >
              +
            </Button>
          </div>
        </div>
        <div className="mt-4 ">
          <CardDescription className="grid grid-cols-3 gap-4  border shadow-md ">
            <h2 className=" font-semibold flex justify-between col-span-2">
              <span> Gross Price </span> <span>:</span>{" "}
            </h2>
            <p className="text-lg font-bold text-slate-500 text-end ">
              ${grossPrice.toFixed(2)}
            </p>
          </CardDescription>
          <CardDescription className="grid grid-cols-3 gap-4  border shadow-md ">
            <h2 className=" font-semibold flex justify-between col-span-2">
              <span> Discount (20%)</span> <span>:</span>{" "}
            </h2>
            <p className="text-lg font-bold text-slate-500 text-end">
              ${discount.toFixed(2)}
            </p>
          </CardDescription>
          <CardDescription className="grid grid-cols-3 gap-4  border shadow-md ">
            <h2 className=" font-semibold flex justify-between col-span-2">
              <span> Delivery Charge </span> <span>:</span>{" "}
            </h2>
            <p className="text-lg font-bold text-slate-500 text-end">
              ${deliveryCharge.toFixed(2)}
            </p>
          </CardDescription>
          <CardDescription className="grid grid-cols-3 gap-4  border shadow-md ">
            <h2 className="text-xl font-bold flex justify-between col-span-2 text-black">
              <span> Total Price </span> <span>:</span>{" "}
            </h2>
            <p className="text-xl font-bold text-end text-black ">
              ${totalPrice.toFixed(2)}
            </p>
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
