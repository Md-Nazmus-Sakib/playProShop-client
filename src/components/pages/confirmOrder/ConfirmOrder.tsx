import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { Link } from "react-router-dom";

const ConfirmOrder = () => {
  const checkoutData = useAppSelector(
    (state: RootState) => state.checkout.data
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Your order is Confirmed Successfully !
      </h2>
      <p className="text-center">Thank you to purchase product with us.</p>
      <hr className="my-4" />
      <div className="my-12">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Delivery Address
        </h3>
        <p className="text-gray-600">Name: {checkoutData.userName}</p>
        <p className="text-gray-600">Mobile:{checkoutData.userMobile}</p>
        <p className="text-gray-600">{checkoutData.deliveryAddress}</p>
      </div>
      <hr className="my-4" />
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Billing Address
        </h3>
        <p className="text-gray-600">Name: {checkoutData.userName}</p>
        <p className="text-gray-600">Mobile:{checkoutData.userMobile}</p>
        <p className="text-gray-600">{checkoutData.deliveryAddress}</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-end">
        <div className="mt-6 ">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Total Price
          </h3>
          <p className="text-gray-600">${checkoutData.totalPrice.toFixed(2)}</p>
        </div>
      </div>
      <div>
        <Link to={"/"}>
          <Button>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Back To Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ConfirmOrder;

// deliveryAddress
// :
// "dkaka"
// orderDate
// :
// "2024-08-02T17:18:00.836Z"
// orderedProduct
// :
// {6691677d72078633dff40156: 1}
// paymentMethod
// :
// "Cash on Delivery"
// totalPrice
// :
// 575
// userEmail
// :
// "asd@asd.com"
// userMobile
// :
// "60195213251"
// userName
// :
// "asd"
