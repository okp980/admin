import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import { PaginatedUserResult } from "@/utils/types"

const usersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<PaginatedUserResult, void>({
      query: () => ({
        url: API_ENPOINTS.users,
      }),
    }),
  }),
})

export const { useGetUsersQuery } = usersApi
