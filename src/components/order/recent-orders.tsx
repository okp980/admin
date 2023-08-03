import { OrderResult, OrderStatus } from "@/utils/types"
import React from "react"
import Badge from "../ui/badge/badge"
import StatusColor from "./status-color"
import { Table } from "../ui/table/table"

type Props = {
  orders: OrderResult[]
  title: string
}

const RecentOrders = ({ title, orders }: Props) => {
  const columns = [
    {
      title: "Tracking Number",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 150,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      align: "center",
      width: 150,
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      width: 150,
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 150,
      render: (status: OrderStatus) => (
        <Badge text={status} color={StatusColor(status)} />
      ),
    },
  ]
  return (
    <div className="bg-white overflow-hidden rounded shadow">
      <h3 className="border-b border-border-200 bg-light px-4 py-3 text-center font-semibold text-heading">
        {title}
      </h3>
      <Table //@ts-ignore
        columns={columns}
        emptyText={""}
        data={orders}
        rowKey="id"
        scroll={{ x: 200 }}
      />
    </div>
  )
}

export default RecentOrders
