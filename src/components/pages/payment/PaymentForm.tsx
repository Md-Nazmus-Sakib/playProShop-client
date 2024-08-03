/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, FormEvent } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  useSubmitOrderMutation,
  useCreatePaymentIntentMutation,
} from "@/redux/api/api";
import { CheckoutFormData } from "@/redux/features/checkoutSlice";
import { toast } from "sonner";
import { areIdsSame } from "../checkoutForm/IdMatchCheck";
import {
  CartItem,
  clearCart,
  selectCartItems,
} from "@/redux/features/cartSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Button } from "@/components/ui/button";

interface PaymentFormProps {
  paymentData: CheckoutFormData;
}

const PaymentForm = ({ paymentData }: PaymentFormProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems: CartItem[] = useAppSelector(selectCartItems);
  const productIds = cartItems.map((item) => item.id);
  const stripe = useStripe();
  const elements = useElements();
  const [submitOrder] = useSubmitOrderMutation();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [transactionId, setTransactionID] = useState<string>("");

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (paymentData.totalPrice > 0) {
        try {
          const { data } = await createPaymentIntent({
            price: paymentData.totalPrice,
          }).unwrap();

          setClientSecret(data.clientSecret);
        } catch (err: any) {
          console.error("Error creating payment intent:", err);
        }
      }
    };

    fetchClientSecret();
  }, [paymentData.totalPrice, createPaymentIntent]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    setProcessing(true);

    try {
      const { error: paymentMethodError } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (paymentMethodError) {
        console.log("[error]", paymentMethodError);
        setProcessing(false);
        return;
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: paymentData.userName || "Anonymous",
              email: paymentData.userEmail || "unknown",
            },
          },
        });

      if (confirmError) {
        console.log("[confirmError]", confirmError);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setTransactionID(paymentIntent.id);

        const orderData = {
          ...paymentData,
          transactionId: paymentIntent.id,
          paymentDate: new Date().toISOString(),
          status: "pending",
        };

        try {
          const response = await submitOrder({ orderData }).unwrap();

          if (response?.success) {
            toast.success("Order Confirmed successfully!");
            const idsMatch = areIdsSame(
              productIds,
              paymentData?.orderedProduct
            );
            if (idsMatch) {
              dispatch(clearCart());
            }
            navigate("/order-confirmation");
          }
        } catch (err) {
          console.error("Error submitting order:", err);
        }
      }
    } catch (err) {
      console.error("Error during payment confirmation:", err);
    } finally {
      setProcessing(false);
    }
  };
  return (
    <>
      <form className="w-2/3 mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-around bg-gray-800 p-4 border border-white border-opacity-30 rounded-lg shadow-md min-h-[300px] mx-auto">
          <div className="flex flex-row items-center justify-between mb-3">
            <input
              className="w-full h-10 border-none outline-none text-sm bg-gray-800 text-white font-semibold caret-orange-500 pl-2 mb-3 flex-grow"
              type="text"
              name="cardName"
              id="cardName"
              placeholder="Full Name"
            />
            <div className="flex items-center justify-center relative w-14 h-9 bg-gray-800 border border-white border-opacity-20 rounded-md">
              <svg
                className="text-white fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#ff9800"
                  d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                ></path>
                <path
                  fill="#d50000"
                  d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                ></path>
                <path
                  fill="#ff3d00"
                  d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <div className="w-full h-10 border-none outline-none text-sm bg-gray-800 text-white font-semibold caret-orange-500 pl-2">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#ffffff",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            className="btn btn-outline bg-orange-500 mt-8 px-12 text-2xl"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </Button>
        </div>
      </form>
      {transactionId && (
        <p className="text-green-600 text-center my-8">
          Transaction completed with transaction Id: {transactionId}
        </p>
      )}
    </>
  );
};

export default PaymentForm;
