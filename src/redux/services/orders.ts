import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import { PaginatedOrderResult } from "@/utils/types"

const ordersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<PaginatedOrderResult, void>({
      query: () => ({
        url: API_ENPOINTS.orders,
      }),
    }),
  }),
})

export const { useGetOrdersQuery } = ordersApi
