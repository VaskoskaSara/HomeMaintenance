import { Provider } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import store from "./store";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51Q6cIcGArExm7bjZduNIVDi8TKgBOtAtKJr97f07B9UlcpA9gr5y0uu0AOpjfWAteQXqZcrv8vGWRZTUFCGgbnJC00WvPYbltN');

const AppWrapper: () => JSX.Element = () => {
    return (
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <AppRoutes />
        </Elements>
      </Provider>
    );
  };

export default AppWrapper;

