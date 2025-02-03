import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import { combineReducers } from "redux";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
    key: 'root',
    storage: storageSession,
};

const rootReducer = combineReducers({
    auth: persistReducer(persistConfig, authReducer),
});

export const store = configureStore({
    reducer: rootReducer,
});

export const persistor: Persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
