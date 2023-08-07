import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import {
  PaginatedShippingMethod,
  PaginationParams,
  ShippingMethodResponse,
} from "@/utils/types"

const shippingApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getShippings: build.query<PaginatedShippingMethod, PaginationParams | void>(
      {
        query: (params) => ({
          url: API_ENPOINTS.shipping_methods,
          params,
        }),
      }
    ),
  }),
})

export const { useGetShippingsQuery } = shippingApi
