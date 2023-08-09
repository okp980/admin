import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import {
  PaginatedOrderResult,
  PaginatedProductResult,
  PaginationParams,
  ProductResult,
} from "@/utils/types"
import { PRODUCT_TAG } from "@/utils/tagsTypes"

const ordersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<PaginatedProductResult, PaginationParams | void>({
      query: (params: PaginationParams) => ({
        url: API_ENPOINTS.products,
        params,
      }),
      //   @ts-ignore
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: PRODUCT_TAG,
                id,
              })),
              PRODUCT_TAG,
            ]
          : [PRODUCT_TAG],
    }),
    deleteProduct: build.mutation<Partial<ProductResult>, string>({
      query: (id: string) => ({
        url: `${API_ENPOINTS.products}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [PRODUCT_TAG],
    }),
  }),
})

export const { useGetProductsQuery, useDeleteProductMutation } = ordersApi
