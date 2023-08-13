import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import {
  OrderResult,
  OrderResultResponse,
  OrderType,
  PaginatedOrderResult,
  PaginationParams,
} from "@/utils/types"
import { ORDERS_TAG } from "@/utils/tagsTypes"

const ordersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<PaginatedOrderResult, PaginationParams | void>({
      query: (params: PaginationParams) => ({
        url: API_ENPOINTS.orders,
        params,
      }),
      //   @ts-ignore
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result?.data?.map((ord) => ({
                type: ORDERS_TAG,
                id: ord?.id,
              })),
              ORDERS_TAG,
            ]
          : [ORDERS_TAG],
    }),
    getSingleOrder: build.query<OrderResultResponse, string>({
      query: (id) => ({
        url: `${API_ENPOINTS.orders}/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: ORDERS_TAG, id: arg }],
    }),
    updateOrderStatus: build.mutation<OrderResultResponse, Partial<OrderType>>({
      query: ({ id, ...body }) => ({
        url: `${API_ENPOINTS.orders}/${id}/status`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: ORDERS_TAG, id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
} = ordersApi
