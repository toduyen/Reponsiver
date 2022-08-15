import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "reducers";

const makeConfiguredStore = (reducer, initialState) =>
  createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware),
      typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
        : (f) => f
    )
  );

export const makeStore = (initialState) => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore(reducers);
  } else {
    const { persistStore, persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      key: "nextjs",
      whitelist: [],
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, reducers);
    const store = makeConfiguredStore(persistedReducer, initialState);

    store.__persistor = persistStore(store);

    return store;
  }
};
