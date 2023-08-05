import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { apiSlice } from "./apiSlice"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import AuthReducer from "./features/auth/authSlice"
import ModalReducer from "./features/modal/modalSlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "accounts"],
}

const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: AuthReducer,
  modal: ModalReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
