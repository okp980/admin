import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import { PaginatedUserResult, PaginationParams } from "@/utils/types"

const usersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<PaginatedUserResult, PaginationParams | void>({
      query: (params: PaginationParams) => ({
        url: API_ENPOINTS.users,
        params,
      }),
    }),
  }),
})

export const { useGetUsersQuery } = usersApi
