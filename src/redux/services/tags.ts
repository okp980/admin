import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import { PaginatedTagResponse, PaginationParams } from "@/utils/types"

const tagApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTags: build.query<PaginatedTagResponse, PaginationParams | void>({
      query: (params) => ({
        url: API_ENPOINTS.tags,
        params,
      }),
    }),
  }),
})

export const { useGetTagsQuery } = tagApi
