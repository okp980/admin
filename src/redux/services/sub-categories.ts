import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import { PaginatedSubCategoryResponse, PaginationParams } from "@/utils/types"

const subCategoryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSubCategories: build.query<
      PaginatedSubCategoryResponse,
      PaginationParams | void
    >({
      query: (params: PaginationParams) => ({
        url: API_ENPOINTS.sub_categories,
        params,
      }),
    }),
  }),
})

export const { useGetSubCategoriesQuery } = subCategoryApi
