import React from "react";
import { NotificationProvider } from "src/contexts/NotificationContext";
import AppRoutes from "src/routes/AppRoutes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "src/store/store";

const AppWrapper: () => JSX.Element = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor as any}>
          <NotificationProvider>
            <AppRoutes />
          </NotificationProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

export default AppWrapper;
