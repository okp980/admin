"use client"
import Card from "@/components/common/card"
import Search from "@/components/common/search"
import OrdersList from "@/components/orders/orders-list"
import ErrorMessage from "@/components/ui/error-message"
import Loader from "@/components/ui/loader/loader"
import { useGetOrdersQuery } from "@/redux/services/orders"
import React, { useState } from "react"

type Props = {}

const OrdersPage = (props: Props) => {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, error } = useGetOrdersQuery({
    page,
    limit: 10,
  })
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
          <h1 className="text-xl font-semibold text-heading">Orders</h1>
        </div>

        <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-1/2">
          <Search onSearch={() => {}} />
        </div>
      </Card>
      <OrdersList
        orders={data?.data}
        paginatorInfo={data?.pagination!}
        onPagination={(selectedPage) => {
          setPage(selectedPage)
        }}
      />
    </>
  )
}

export default OrdersPage
