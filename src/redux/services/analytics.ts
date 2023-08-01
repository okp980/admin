import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import { AnalyticsResponse } from "@/utils/types"

const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAnalytics: build.query<AnalyticsResponse, void>({
      query: () => ({
        url: API_ENPOINTS.analytics,
      }),
    }),
  }),
})

export const { useGetAnalyticsQuery } = analyticsApi
