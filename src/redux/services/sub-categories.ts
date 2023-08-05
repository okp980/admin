import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import { SubCategoryAllResultResponse } from "@/utils/types"

const subCategoryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSubCategories: build.query<SubCategoryAllResultResponse, void>({
      query: () => ({
        url: API_ENPOINTS.sub_categories,
      }),
    }),
  }),
})

export const { useGetSubCategoriesQuery } = subCategoryApi
