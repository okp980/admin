import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import { AttributeResultResponse } from "@/utils/types"

const attributeApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAttributes: build.query<AttributeResultResponse, void>({
      query: () => ({
        url: API_ENPOINTS.attributes,
      }),
    }),
  }),
})

export const { useGetAttributesQuery } = attributeApi
