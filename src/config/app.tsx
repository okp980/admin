"use client"

import { store } from "@/redux/store"
import React, { PropsWithChildren } from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ModalManager from "@/components/ui/modal/modal-manager"

const persistor = persistStore(store)

const App = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer autoClose={2000} theme="colored" />
        <ModalManager />
        {children}
      </PersistGate>
    </Provider>
  )
}

export default App
