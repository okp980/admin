import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import { PaginatedOrderResult, PaginatedProductResult } from "@/utils/types"

const ordersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<PaginatedProductResult, void>({
      query: () => ({
        url: API_ENPOINTS.products,
      }),
    }),
  }),
})

export const { useGetProductsQuery } = ordersApi
