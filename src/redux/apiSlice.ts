import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react"
import { RootState } from "./store"
import { clearToken } from "./features/auth/authSlice"

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
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
  }

  return result
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,

  tagTypes: [],
  endpoints: (builder) => ({}),
})
