import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import { PaginatedTagResponse } from "@/utils/types"

const tagApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTags: build.query<PaginatedTagResponse, void>({
      query: () => ({
        url: API_ENPOINTS.tags,
      }),
    }),
  }),
})

export const { useGetTagsQuery } = tagApi
