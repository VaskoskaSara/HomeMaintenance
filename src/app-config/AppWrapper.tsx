import { Provider } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import store from "./store";

const AppWrapper: () => JSX.Element = () => {
    return (
    <Provider store={store}>
        <AppRoutes />
    </Provider>
    );
};

export default AppWrapper;

