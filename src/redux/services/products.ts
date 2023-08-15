import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import {
  PaginatedProductResult,
  PaginationParams,
  ProductResponse,
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
    getSingleProduct: build.query<ProductResponse, string>({
      query: (id) => ({
        url: `${API_ENPOINTS.products}/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: PRODUCT_TAG, id: arg }],
    }),
    createProduct: build.mutation<ProductResponse, FormData>({
      query: (body) => ({
        url: API_ENPOINTS.products,
        method: "POST",
        body,
      }),
      invalidatesTags: [PRODUCT_TAG],
    }),
    updateProduct: build.mutation<
      ProductResponse,
      { body: FormData; id: string }
    >({
      query: ({ id, body }) => ({
        url: `${API_ENPOINTS.products}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: PRODUCT_TAG, id: arg.id },
      ],
    }),
    deleteProduct: build.mutation<Partial<ProductResponse>, string>({
      query: (id: string) => ({
        url: `${API_ENPOINTS.products}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [PRODUCT_TAG],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = ordersApi
