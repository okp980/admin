import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import { AuthBody, AuthInterface } from "@/utils/types"

const attributeApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthInterface, AuthBody>({
      query: (body) => ({
        url: API_ENPOINTS.login,
        method: "POST",
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = attributeApi
