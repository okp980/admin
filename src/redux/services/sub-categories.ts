import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import {
  PaginatedSubCategoryResponse,
  PaginationParams,
  SubCategoryResultResponse,
  SubCategoryType,
} from "@/utils/types"
import { SUB_CATEGORY_TAG } from "@/utils/tagsTypes"

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
      //   @ts-ignore
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result?.data?.map((cat) => ({
                type: SUB_CATEGORY_TAG,
                id: cat?.id,
              })),
              SUB_CATEGORY_TAG,
            ]
          : [SUB_CATEGORY_TAG],
    }),
    getSingleSubCategory: build.query<SubCategoryResultResponse, string>({
      query: (id) => ({
        url: `${API_ENPOINTS.sub_categories}/${id}`,
      }),
      providesTags: (result, error, arg) => [
        { type: SUB_CATEGORY_TAG, id: arg },
      ],
    }),
    createSubCategory: build.mutation<SubCategoryResultResponse, FormData>({
      query: (body) => ({
        url: API_ENPOINTS.sub_categories,
        method: "POST",
        body,
      }),
      invalidatesTags: [SUB_CATEGORY_TAG],
    }),
    updateSubCategory: build.mutation<
      SubCategoryResultResponse,
      Partial<SubCategoryType>
    >({
      query: ({ id, ...body }) => ({
        url: `${API_ENPOINTS.sub_categories}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: SUB_CATEGORY_TAG, id: arg.id },
      ],
    }),

    deleteSubCategory: build.mutation<
      SubCategoryResultResponse,
      Partial<SubCategoryType>
    >({
      query: ({ id }) => ({
        url: `${API_ENPOINTS.sub_categories}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: SUB_CATEGORY_TAG, id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetSubCategoriesQuery,
  useGetSingleSubCategoryQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApi
