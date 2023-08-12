import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import { Attribute, AttributeResponse, PaginatedAttribute } from "@/utils/types"
import { ATTRIBUTES_TAG } from "@/utils/tagsTypes"

const attributeApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAttributes: build.query<PaginatedAttribute, void>({
      query: () => ({
        url: API_ENPOINTS.attributes,
      }),
    }),
    getSingleAttribute: build.query<AttributeResponse, string>({
      query: (id) => ({
        url: `${API_ENPOINTS.attributes}/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: ATTRIBUTES_TAG, id: arg }],
    }),
    createAttribute: build.mutation<AttributeResponse, Attribute>({
      query: (body) => ({
        url: API_ENPOINTS.attributes,
        method: "POST",
        body,
      }),
      invalidatesTags: [ATTRIBUTES_TAG],
    }),
    updateAttribute: build.mutation<AttributeResponse, Partial<Attribute>>({
      query: ({ id, ...body }) => ({
        url: `${API_ENPOINTS.attributes}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: ATTRIBUTES_TAG, id: result?.data.id },
      ],
    }),
    deleteAttribute: build.mutation<AttributeResponse, Partial<Attribute>>({
      query: ({ id }) => ({
        url: `${API_ENPOINTS.attributes}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: ATTRIBUTES_TAG, id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetAttributesQuery,
  useGetSingleAttributeQuery,
  useCreateAttributeMutation,
  useUpdateAttributeMutation,
  useDeleteAttributeMutation,
} = attributeApi
