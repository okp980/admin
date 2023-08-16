import { CategoryResult, ProductResult } from "@/utils/types"
import React from "react"
import { Table } from "../ui/table/table"
import { getPrice } from "@/utils/helpers"

type Props = {
  title: string
  products: ProductResult[]
}

const PopularProducts = ({ title, products }: Props) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "left",
      width: 200,
      render: (name: string) => (
        <span className="whitespace-nowrap capitalize">{name}</span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "left",
      width: 150,
      render: (category: CategoryResult) => (
        <span className="whitespace-nowrap capitalize">{category?.name}</span>
      ),
    },
    {
      title: "Sub Category",
      dataIndex: "sub_category",
      key: "category",
      align: "left",
      width: 150,
      render: (category: CategoryResult) => (
        <span className="whitespace-nowrap capitalize">{category?.name}</span>
      ),
    },
    {
      title: "Price/Unit",
      dataIndex: "price",
      key: "price",
      align: "center",
      width: 150,
      render: function Render(value: number, record: ProductResult) {
        const price = getPrice(record.price)
        const max_price = getPrice(record?.max_price)
        const min_price = getPrice(record?.min_price)

        const renderPrice =
          record?.product_type === "variable"
            ? `${min_price} - ${max_price}`
            : price

        return (
          <span className="whitespace-nowrap" title={renderPrice}>
            {renderPrice}
          </span>
        )
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      width: 100,
      render: function Render(quantity: number, record: ProductResult) {
        const renderQuantity =
          record?.product_type === "variable"
            ? record?.total_quantity
            : quantity

        return (
          <span className="whitespace-nowrap" title={renderQuantity.toString()}>
            {renderQuantity.toString()}
          </span>
        )
      },
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
        data={products}
        rowKey="id"
        scroll={{ x: 200 }}
      />
    </div>
  )
}

export default PopularProducts
