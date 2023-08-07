import { useState } from "react"

import { Routes } from "@/config/routes"
import { Table } from "../ui/table/table"
import { OrderResult, PaginatedInfo, TagResult } from "@/utils/types"
import { differenceInDays, formatDistance, parseISO } from "date-fns"
import Link from "next/link"
import { AiFillEye } from "react-icons/ai"
import Pagination from "../ui/pagination/pagination"

export type IProps = {
  orders: OrderResult[] | undefined
  paginatorInfo: PaginatedInfo | null
  onPagination: (current: number) => void
}
const OrdersList = ({ orders, paginatorInfo, onPagination }: IProps) => {
  let columns = [
    {
      title: "Tracking Number",

      dataIndex: "id",
      key: "tarcking_number",
      align: "left",
      render: (name: any) => <span className="whitespace-nowrap">{name}</span>,
      width: 200,
    },
    {
      title: "Delivery Fee",
      dataIndex: "shippingMethod",
      key: "shippingMethod",
      align: "center",
      render: (shippingMethod: any) => (
        <span className="whitespace-nowrap">{shippingMethod?.charge}</span>
      ),
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      align: "center",
      //   render: (shippingMethod: any) => (
      //     <span className="whitespace-nowrap">{shippingMethod.charge}</span>
      //   ),
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt: any) => {
        const date = parseISO(createdAt)
        const daysAgo = differenceInDays(new Date(), date)
        return (
          <span className="whitespace-nowrap">{`${daysAgo} days ago`}</span>
        )
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: any) => (
        <span className="whitespace-nowrap">{status}</span>
      ),
    },
    {
      title: "Shipping Address",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      align: "center",
      render: (shippingAddress: any) => (
        <span className="whitespace-nowrap">
          {shippingAddress[0].full_address}
        </span>
      ),
    },

    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      align: "center",
      render: (id: string) => (
        <Link href={Routes.order.details(id)} className="flex justify-center">
          <AiFillEye size={20} className="text-slate-500" />
        </Link>
      ),
    },
  ]

  return (
    <>
      <div className="mb-8 overflow-hidden rounded shadow">
        <Table
          // @ts-ignore
          columns={columns}
          emptyText={""}
          data={orders}
          rowKey="id"
          scroll={{ x: 380 }}
        />
      </div>
      {!!paginatorInfo && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.current}
            pageSize={paginatorInfo.limit}
            onChange={onPagination}
            showLessItems
          />
        </div>
      )}
    </>
  )
}

export default OrdersList
