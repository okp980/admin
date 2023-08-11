import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import {
  PaginatedShippingMethod,
  PaginationParams,
  ShippingMethodResponse,
  ShippingType,
} from "@/utils/types"
import { SHIPPING_TAG } from "@/utils/tagsTypes"

const shippingApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getShippings: build.query<PaginatedShippingMethod, PaginationParams | void>(
      {
        query: (params) => ({
          url: API_ENPOINTS.shipping_methods,
          params,
        }),
        //   @ts-ignore
        providesTags: (result, error, arg) =>
          result
            ? [
                ...result?.data?.map((cat) => ({
                  type: SHIPPING_TAG,
                  id: cat?.id,
                })),
                SHIPPING_TAG,
              ]
            : [SHIPPING_TAG],
      }
    ),
    getSingleShipping: build.query<ShippingMethodResponse, string>({
      query: (id) => ({
        url: `${API_ENPOINTS.shipping_methods}/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: SHIPPING_TAG, id: arg }],
    }),
    createShipping: build.mutation<ShippingMethodResponse, ShippingType>({
      query: (body) => ({
        url: API_ENPOINTS.shipping_methods,
        method: "POST",
        body,
      }),
      invalidatesTags: [SHIPPING_TAG],
    }),
    updateShipping: build.mutation<
      ShippingMethodResponse,
      Partial<ShippingType>
    >({
      query: ({ id, ...body }) => ({
        url: `${API_ENPOINTS.shipping_methods}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: SHIPPING_TAG, id: arg.id },
      ],
    }),

    deleteShipping: build.mutation<
      ShippingMethodResponse,
      Partial<ShippingType>
    >({
      query: ({ id }) => ({
        url: `${API_ENPOINTS.shipping_methods}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: SHIPPING_TAG, id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetShippingsQuery,
  useGetSingleShippingQuery,
  useCreateShippingMutation,
  useUpdateShippingMutation,
  useDeleteShippingMutation,
} = shippingApi
