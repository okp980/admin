import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import { ExchangeRateType, ExchangeRateResponse } from "@/utils/types"
import { EXCHANGE_RATE_TAG } from "@/utils/tagsTypes"

const exchangeRateApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSingleRate: build.query<ExchangeRateResponse, string>({
      query: (id: string) => ({
        url: `${API_ENPOINTS.exchangeRate}/${id}`,
      }),
      //   @ts-ignore
      providesTags: (result, error, arg) => [
        { type: EXCHANGE_RATE_TAG, id: arg },
      ],
    }),

    editRate: build.mutation<ExchangeRateResponse, Partial<ExchangeRateType>>({
      query: ({ id, ...body }) => ({
        url: `${API_ENPOINTS.exchangeRate}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: EXCHANGE_RATE_TAG, id: arg.id },
      ],
    }),
  }),
})

export const { useEditRateMutation, useGetSingleRateQuery } = exchangeRateApi
