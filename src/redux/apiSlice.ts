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
  PRODUCT_TAG,
  PRODUCT_TAG_NAME_TAG,
  SHIPPING_TAG,
  SUB_CATEGORY_TAG,
} from "@/utils/tagsTypes"

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
  let result

  result = await baseQuery(args, api, extraOptions)

  // check for 401 error
  if (result.error?.status === 401) {
    api.dispatch(clearToken())
    redirect("/")
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
  ],
  endpoints: (builder) => ({}),
})
