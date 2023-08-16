import { useState } from "react"

import { Routes } from "@/config/routes"
import ActionButtons from "../common/action-buttons"
import { MODAL_VIEW } from "@/utils/enums"
import useModal from "@/hooks/useModal"
import { Table } from "../ui/table/table"
import { PaginatedInfo, ShippingMethod } from "@/utils/types"
import Pagination from "../ui/pagination/pagination"
import { getPrice } from "@/utils/helpers"

export type IProps = {
  shipping: ShippingMethod[] | undefined
  paginatorInfo: PaginatedInfo | null
  onPagination: (current: number) => void
}
const ShippingList = ({ shipping, paginatorInfo, onPagination }: IProps) => {
  const { handleOpenModal } = useModal()

  let columns = [
    {
      title: "Name",

      dataIndex: "title",
      key: "title",
      align: "left",
      render: (name: any) => (
        <span className="whitespace-nowrap capitalize">{name}</span>
      ),
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
        <span className="whitespace-nowrap capitalize">{`${name} days`}</span>
      ),
    },
    {
      title: "Charge",

      dataIndex: "charge",
      key: "charge",
      align: "center",
      render: (amount: any) => (
        <span className="whitespace-nowrap">{getPrice(amount)}</span>
      ),
    },

    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      align: "center",
      render: (id: string) => (
        <ActionButtons
          onDelete={() =>
            handleOpenModal({
              view: MODAL_VIEW.DELETE_SHIPPING,
              modalPayload: { id },
            })
          }
          href={Routes.shipping.edit(id)}
        />
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
          data={shipping}
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

export default ShippingList
