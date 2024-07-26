import ContactInfo from "./ContactInfo";
import OrderSummary from "./OrderSummary";

const CheckoutForm = () => {
  return (
    <div>
      <h2 className="text-5xl font-bold">Check Out</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <ContactInfo></ContactInfo>
        </div>
        <div>
          <OrderSummary></OrderSummary>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
