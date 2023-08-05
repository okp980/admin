import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import { CategoryAllResultResponse, PaginatedOrderResult } from "@/utils/types"

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<CategoryAllResultResponse, void>({
      query: () => ({
        url: API_ENPOINTS.categories,
      }),
    }),
  }),
})

export const { useGetCategoriesQuery } = categoryApi
