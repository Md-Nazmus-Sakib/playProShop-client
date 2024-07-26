import { useDispatch } from "react-redux";

import { useGetProductQuery } from "@/redux/api/api";
import {
  decrementQuantity,
  incrementQuantity,
  removeItemFromCart,
  clearCart,
  selectCartItems,
  CartItem,
} from "@/redux/features/cartSlice";
import Loader from "../shared/loader/Loader";
import { TProduct } from "../home/featuredProduct/FeatureProductType";
import { Button } from "@/components/ui/button";
import StarRatings from "react-star-ratings";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/redux/hook";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems: CartItem[] = useAppSelector(selectCartItems);
  const productIds = cartItems.map((item) => item.id);
  const { data, isLoading, isError } = useGetProductQuery({});

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading products.</div>;
  }

  const products: TProduct[] = data?.data ?? [];

  // Filter products to match with cart items
  const filteredProducts = products.filter((product) =>
    productIds.includes(product._id)
  );

  const handleIncrement = (id: string) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: string) => {
    dispatch(decrementQuantity(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container mx-auto p-4 bg-slate-300">
      <Card>
        <div className="flex justify-center items-center mb-6">
          <hr className="border border-blue-500 w-full" />
          <h1 className="text-center text-4xl font-bold mx-4">Order Summary</h1>
          <hr className="border border-blue-500 w-full" />
        </div>

        <CardContent>
          {filteredProducts.map((product) => {
            const cartItem = cartItems.find((item) => item.id === product._id);
            if (!cartItem) return null;

            return (
              <div
                key={product._id}
                className="lg:flex justify-between border-b-2 shadow-md p-2"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-16 h-16 rounded"
                  />
                  <div className="ml-4">
                    <CardTitle>{product.productName}</CardTitle>
                    <CardDescription>Brand: {product.brand}</CardDescription>
                    <CardDescription>Price: ${product.price}</CardDescription>
                    <CardDescription>
                      In Stock: {product.stockQuantity}
                    </CardDescription>
                    <div>
                      Rating:
                      <StarRatings
                        rating={product.rating}
                        starRatedColor="yellow"
                        starEmptyColor="black"
                        starDimension="20px"
                        numberOfStars={5}
                        name="rating"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <Button
                    onClick={() => handleDecrement(product._id)}
                    disabled={cartItem.quantity <= 0}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </Button>
                  <span className="px-2">{cartItem.quantity}</span>
                  <Button
                    onClick={() => handleIncrement(product._id)}
                    disabled={cartItem.quantity >= product.stockQuantity}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => dispatch(removeItemFromCart(product._id))}
                    className="px-2 py-1 border rounded bg-transparent"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="red"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            );
          })}
          <div className="mt-4">
            <Button
              onClick={handleClearCart}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;
