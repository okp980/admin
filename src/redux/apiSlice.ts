"use client"
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react"
import { RootState } from "./store"
import { clearToken } from "./features/auth/authSlice"
import { redirect } from "next/navigation"
import {
  ATTRIBUTES_TAG,
  CATEGORY_TAG,
  ORDERS_TAG,
  PRODUCT_TAG,
  PRODUCT_TAG_NAME_TAG,
  SHIPPING_TAG,
  SUB_CATEGORY_TAG,
  EXCHANGE_RATE_TAG,
} from "@/utils/tagsTypes"
import Router from "next/router"

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (
    headers: Headers,

    api: Pick<
      BaseQueryApi,
      "getState" | "extra" | "endpoint" | "type" | "forced"
    >
  ) => {
    const token = (api.getState() as RootState).auth.token

    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  // check for 401 error
  if (result.error?.status === 401) {
    console.log("inside")
    api.dispatch(clearToken())

    history.replaceState("", "", "/")
  }

  return result
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,

  tagTypes: [
    PRODUCT_TAG,
    PRODUCT_TAG_NAME_TAG,
    CATEGORY_TAG,
    SUB_CATEGORY_TAG,
    SHIPPING_TAG,
    ATTRIBUTES_TAG,
    ORDERS_TAG,
    EXCHANGE_RATE_TAG,
  ],
  endpoints: (builder) => ({}),
})
