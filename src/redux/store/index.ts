import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../slices";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = [thunk];

    if (__DEV__) {
      middlewares.push(logger);
    }

    return getDefaultMiddleware({
      serializableCheck: false
    }).concat(middlewares);
  }
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
