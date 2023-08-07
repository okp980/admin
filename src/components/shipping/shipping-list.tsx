import { useState } from "react"

import { Routes } from "@/config/routes"
import ActionButtons from "../common/action-buttons"
import { MODAL_VIEW } from "@/utils/enums"
import useModal from "@/hooks/useModal"
import { Table } from "../ui/table/table"
import { ShippingMethod } from "@/utils/types"

export type IProps = {
  shipping: ShippingMethod[] | undefined
}
const ShippingList = ({ shipping }: IProps) => {
  const { handleOpenModal } = useModal()

  let columns = [
    {
      title: "Name",

      dataIndex: "title",
      key: "title",
      align: "left",
      render: (name: any) => <span className="whitespace-nowrap">{name}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "left",
      //   render: (category: any) => (
      //     <span className="whitespace-nowrap">{category.name}</span>
      //   ),
    },
    {
      title: "Duration",

      dataIndex: "duration",
      key: "duration",
      align: "center",
      render: (name: any) => (
        <span className="whitespace-nowrap">{`${name} days`}</span>
      ),
    },
    {
      title: "Charge",

      dataIndex: "charge",
      key: "charge",
      align: "center",
      render: (name: any) => <span className="whitespace-nowrap">{name}</span>,
    },

    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      align: "right",
      render: (id: string) => (
        <ActionButtons
          onDelete={() =>
            handleOpenModal({
              view: MODAL_VIEW.DELETE_PRODUCT,
              modalPayload: id,
            })
          }
          href={Routes.shipping.edit(id)}
        />
      ),
    },
  ]

  return (
    <div className="mb-8 overflow-hidden rounded shadow">
      <Table
        // @ts-ignore
        columns={columns}
        emptyText={""}
        data={shipping}
        rowKey="id"
        scroll={{ x: 380 }}
      />
    </div>
  )
}

export default ShippingList
