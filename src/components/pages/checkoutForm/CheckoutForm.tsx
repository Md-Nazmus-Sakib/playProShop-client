import ContactInfo from "./ContactInfo";
import OrderSummary from "./OrderSummary";

const CheckoutForm = () => {
  return (
    <div>
      <div className="flex justify-center items-center my-12">
        <hr className="border border-blue-500 w-full" />
        <h1 className="text-center text-4xl font-bold mx-4">Checkout</h1>
        <hr className="border border-blue-500 w-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="order-2 md:order-1">
          <ContactInfo />
        </div>
        <div className="order-1 md:order-2">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
