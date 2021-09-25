import StripeCheckout from "react-stripe-checkout";
import { addPaymnet } from "../../apis/productService";

export const Payment = () => {
  const checkout = async token => {
    try {
      console.log(token);

      const res = await addPaymnet(token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StripeCheckout
      stripeKey="pk_test_51JcWeNSIbA2UPd9FOXHf3hqrF8yHgFdHTy5pIDblF7NbtZJHJz6bLTPdQAWR0KJRInOq9MM46mHQIrJKhb9ITNey00D54eLNnn"
      token={checkout}
      name="Checkout"
      amount={200 * 100}
      currency="INR"
      email="doe@yopmail.com"
    >
      {/* <button onClick={checkout}>Checkout</button> */}
    </StripeCheckout>
  );
};
