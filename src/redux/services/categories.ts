import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import {
  CategoryAllResultResponse,
  CategoryResultResponse,
  CategoryType,
  PaginatedCategoryResponse,
  PaginatedOrderResult,
  PaginationParams,
} from "@/utils/types"
import { CATEGORY_TAG } from "@/utils/tagsTypes"

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
      //   @ts-ignore
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result?.data?.map((cat) => ({
                type: CATEGORY_TAG,
                id: cat?.id,
              })),
              CATEGORY_TAG,
            ]
          : [CATEGORY_TAG],
    }),
    getSingleCategory: build.query<CategoryResultResponse, string>({
      query: (id) => ({
        url: `${API_ENPOINTS.categories}/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: CATEGORY_TAG, id: arg }],
    }),
    createCategory: build.mutation<CategoryResultResponse, FormData>({
      query: (body) => ({
        url: API_ENPOINTS.categories,
        method: "POST",
        body,
      }),
      invalidatesTags: [CATEGORY_TAG],
    }),
    updateCategory: build.mutation<
      CategoryResultResponse,
      Partial<CategoryType>
    >({
      query: ({ id, ...body }) => ({
        url: `${API_ENPOINTS.categories}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: CATEGORY_TAG, id: arg.id },
      ],
    }),
    deleteCategory: build.mutation<
      CategoryResultResponse,
      Partial<CategoryType>
    >({
      query: ({ id }) => ({
        url: `${API_ENPOINTS.categories}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: CATEGORY_TAG, id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetSingleCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi
