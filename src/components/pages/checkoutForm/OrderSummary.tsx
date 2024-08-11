import { useEffect, useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { useGetProductQuery } from "@/redux/api/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loader from "../shared/loader/Loader";
import {
  CartItem,
  selectCartItems,
  incrementQuantity,
  decrementQuantity,
} from "@/redux/features/cartSlice";
import { TProduct } from "../home/featuredProduct/FeatureProductType";
import { RootState } from "@/redux/store";
import { setOrderSummary } from "@/redux/features/orderSummarySlice";
import StarRatings from "react-star-ratings";

const OrderSummary = () => {
  const dispatch = useAppDispatch();
  const cartItems: CartItem[] = useAppSelector(selectCartItems);
  const { productId } = useAppSelector((state: RootState) => state.productId);
  const [quantity, setQuantity] = useState(1);

  // Memoize productIds to avoid unnecessary re-renders
  const productIds = useMemo(
    () => (productId ? [productId] : cartItems.map((item) => item.id)),
    [productId, cartItems]
  );

  const { data, isLoading, isError } = useGetProductQuery(productIds);

  useEffect(() => {
    if (data) {
      const products: TProduct[] = data?.data?.products ?? [];

      const filteredProducts = products.filter((product) =>
        productIds.includes(product._id)
      );

      const quantities: Record<string, number> = productId
        ? { [productId]: quantity }
        : cartItems.reduce<Record<string, number>>((acc, item) => {
            acc[item.id] = item.quantity;
            return acc;
          }, {});

      const calculateTotalGrossPrice = (): number => {
        if (productId) {
          const product = filteredProducts.find((p) => p._id === productId);
          return product ? product.price * quantity : 0;
        }
        return cartItems.reduce((total, item) => {
          const product = filteredProducts.find((p) => p._id === item.id);
          return product ? total + product.price * item.quantity : total;
        }, 0);
      };

      const totalGrossPrice = calculateTotalGrossPrice();
      const discount = totalGrossPrice * 0.2;
      const deliveryCharge = 100;
      const vat = totalGrossPrice * 0.15; // VAT at 15%
      const totalPrice = totalGrossPrice - discount + deliveryCharge + vat;

      // Dispatch to Redux store
      dispatch(setOrderSummary({ quantities, totalPrice }));
    }
  }, [data, cartItems, productIds, productId, quantity, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading products.</div>;
  }

  const products: TProduct[] = data?.data?.products ?? [];
  const filteredProducts = products?.filter((product) =>
    productIds.includes(product._id)
  );

  const calculateTotalGrossPrice = (): number => {
    if (productId) {
      const product = filteredProducts?.find((p) => p._id === productId);
      return product ? product.price * quantity : 0;
    }
    return cartItems.reduce((total, item) => {
      const product = filteredProducts.find((p) => p._id === item.id);
      return product ? total + product.price * item.quantity : total;
    }, 0);
  };

  const handleIncrement = (id: string) => {
    if (productId === id) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      dispatch(incrementQuantity(id));
    }
  };

  const handleDecrement = (id: string) => {
    if (productId === id) {
      setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
    } else {
      dispatch(decrementQuantity(id));
    }
  };

  const totalGrossPrice = calculateTotalGrossPrice();
  const discount = totalGrossPrice * 0.2;
  const deliveryCharge = 100;
  const vat = totalGrossPrice * 0.15; // VAT at 15%
  const totalPrice = totalGrossPrice - discount + deliveryCharge + vat;

  return (
    <Card>
      <div className="flex justify-center items-center mb-6">
        <hr className="border border-blue-500 w-full" />
        <h1 className="text-center text-4xl font-bold mx-4">Order Summary</h1>
        <hr className="border border-blue-500 w-full" />
      </div>

      <CardContent>
        {filteredProducts?.map((product: TProduct) => {
          const cartItem = cartItems.find((item) => item.id === product._id);
          const itemQuantity = cartItem ? cartItem.quantity : 1;

          return (
            <div
              key={product._id}
              className="md:flex justify-between border-b-2 shadow-md p-2"
            >
              <div className="flex flex-col md:flex-row items-center">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="w-32 h-32 object-cover mr-4"
                />
                <div>
                  <CardTitle>Name: {product.productName}</CardTitle>
                  <CardDescription>Brand: {product.brand}</CardDescription>
                  <div>
                    Rating:
                    <StarRatings
                      rating={product.rating}
                      starRatedColor="#F14902"
                      starEmptyColor="black"
                      starDimension="20px"
                      numberOfStars={5}
                      name="rating"
                    />
                  </div>

                  <CardDescription>
                    Available: {product.stockQuantity}
                  </CardDescription>
                  <CardDescription>Price: ${product.price}</CardDescription>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="flex items-center mt-4">
                  <Button
                    onClick={() => handleDecrement(product._id)}
                    disabled={productId ? quantity <= 1 : itemQuantity <= 1}
                    className="mr-2"
                  >
                    -
                  </Button>
                  <h1>{productId ? quantity : itemQuantity}</h1>
                  <Button
                    onClick={() => handleIncrement(product._id)}
                    disabled={
                      productId
                        ? quantity >= product.stockQuantity
                        : itemQuantity >= product.stockQuantity
                    }
                    className="ml-2"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
        <div className="mt-4">
          <CardDescription className="grid grid-cols-3 gap-4 border shadow-md px-2">
            <span className="font-semibold flex justify-between col-span-2">
              <span>Sub Total</span> <span>:</span>
            </span>
            <span className="text-lg font-bold text-slate-500 text-end">
              ${totalGrossPrice.toFixed(2)}
            </span>
          </CardDescription>
          <CardDescription className="grid grid-cols-3 gap-4 border shadow-md px-2">
            <span className="font-semibold flex justify-between col-span-2">
              <span>Discount (20%)</span> <span>:</span>
            </span>
            <span className="text-lg font-bold text-slate-500 text-end">
              ${discount.toFixed(2)}
            </span>
          </CardDescription>

          <CardDescription className="grid grid-cols-3 gap-4 border shadow-md px-2">
            <span className="font-semibold flex justify-between col-span-2">
              <span>VAT (15%)</span> <span>:</span>
            </span>
            <span className="text-lg font-bold text-slate-500 text-end">
              ${vat.toFixed(2)}
            </span>
          </CardDescription>
          <CardDescription className="grid grid-cols-3 gap-4 border shadow-md px-2">
            <span className="font-semibold flex justify-between col-span-2">
              <span>Delivery Charge</span> <span>:</span>
            </span>
            <span className="text-lg font-bold text-slate-500 text-end">
              ${deliveryCharge.toFixed(2)}
            </span>
          </CardDescription>
          <CardDescription className="grid grid-cols-3 gap-4 border shadow-md px-2">
            <span className="text-xl font-bold flex justify-between col-span-2 text-black">
              <span>Total Price</span> <span>:</span>
            </span>
            <span className="text-xl font-bold text-end text-black">
              ${totalPrice.toFixed(2)}
            </span>
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
