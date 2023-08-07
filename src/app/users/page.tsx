"use client"
import Card from "@/components/common/card"
import Search from "@/components/common/search"
import ErrorMessage from "@/components/ui/error-message"
import LinkButton from "@/components/ui/link-button"
import Loader from "@/components/ui/loader/loader"
import UsersList from "@/components/users/users-list"
import { Routes } from "@/config/routes"
import { useGetUsersQuery } from "@/redux/services/users"
import React from "react"

type Props = {}

const UsersPage = (props: Props) => {
  const { data, isLoading, isError, error } = useGetUsersQuery()
  if (isLoading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader />
      </div>
    )

  if (isError) {
    const errorMessage: any = isError ? error : null

    return <ErrorMessage message={errorMessage?.data.error} />
  }
  return (
    <>
      <Card className="mb-8 flex flex-col items-center xl:flex-row">
        <div className="mb-4 md:w-1/4 xl:mb-0">
          <h1 className="text-xl font-semibold text-heading">Users</h1>
        </div>

        <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-1/2">
          <Search onSearch={() => {}} />

          <LinkButton
            href={Routes.user.create}
            className="h-12 w-full md:w-auto md:ms-6"
          >
            <span className="block md:hidden xl:block">+ Add Users</span>
            <span className="hidden md:block xl:hidden">+ Add Users</span>
          </LinkButton>
        </div>
      </Card>
      <UsersList users={data?.data} />
    </>
  )
}

export default UsersPage
