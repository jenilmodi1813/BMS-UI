import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "./root.reducer";
import rootSaga from "./root.saga";

// --- Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// --- Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist auth slice (user, tokens, etc.)
};

// --- Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// --- Configure Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false, // required for redux-persist
    }).concat(sagaMiddleware),
});

// --- Run Saga Middleware
sagaMiddleware.run(rootSaga);

// --- Create Persistor
export const persistor = persistStore(store);

export default store;
