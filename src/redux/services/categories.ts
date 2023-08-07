import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import {
  CategoryAllResultResponse,
  PaginatedCategoryResponse,
  PaginatedOrderResult,
  PaginationParams,
} from "@/utils/types"

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<
      PaginatedCategoryResponse,
      PaginationParams | void
    >({
      query: (params: PaginationParams) => ({
        url: API_ENPOINTS.categories,
        params,
      }),
    }),
  }),
})

export const { useGetCategoriesQuery } = categoryApi
