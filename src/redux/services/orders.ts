import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import { PaginatedOrderResult, PaginationParams } from "@/utils/types"

const ordersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<PaginatedOrderResult, PaginationParams | void>({
      query: (params: PaginationParams) => ({
        url: API_ENPOINTS.orders,
        params,
      }),
    }),
  }),
})

export const { useGetOrdersQuery } = ordersApi
