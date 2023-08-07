import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import {
  PaginatedOrderResult,
  PaginatedProductResult,
  PaginationParams,
  ProductResult,
} from "@/utils/types"

const ordersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<PaginatedProductResult, PaginationParams | void>({
      query: (params: PaginationParams) => ({
        url: API_ENPOINTS.products,
        params,
      }),
    }),
    deleteProduct: build.mutation<Partial<ProductResult>, string>({
      query: (id: string) => ({
        url: `${API_ENPOINTS.products}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useGetProductsQuery, useDeleteProductMutation } = ordersApi
