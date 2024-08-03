import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import PaymentForm from "./PaymentForm";
import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import Loader from "../shared/loader/Loader";
const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_pk);

const PaymentPage = () => {
  const paymentData = useAppSelector((state: RootState) => state.checkout.data);

  return (
    <div>
      {paymentData ? (
        <Elements stripe={stripePromise}>
          <PaymentForm paymentData={paymentData}></PaymentForm>
        </Elements>
      ) : (
        <Loader></Loader>
      )}
    </div>
  );
};

export default PaymentPage;
