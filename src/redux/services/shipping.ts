import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import { ShippingMethodResponse } from "@/utils/types"

const shippingApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getShippings: build.query<ShippingMethodResponse, void>({
      query: () => ({
        url: API_ENPOINTS.shipping_methods,
      }),
    }),
  }),
})

export const { useGetShippingsQuery } = shippingApi
