import { useState } from "react"

import { Routes } from "@/config/routes"
import ActionButtons from "../common/action-buttons"
import { MODAL_VIEW } from "@/utils/enums"
import useModal from "@/hooks/useModal"
import { Table } from "../ui/table/table"
import { TagResult } from "@/utils/types"

export type IProps = {
  tags: TagResult[] | undefined
}
const TagsList = ({ tags }: IProps) => {
  const { handleOpenModal } = useModal()

  let columns = [
    {
      title: "Name",

      dataIndex: "name",
      key: "name",
      align: "left",
      render: (name: any) => <span className="whitespace-nowrap">{name}</span>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "left",
      render: (category: any) => (
        <span className="whitespace-nowrap">{category.name}</span>
      ),
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
          href={Routes.tag.edit(id)}
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
        data={tags}
        rowKey="id"
        scroll={{ x: 380 }}
      />
    </div>
  )
}

export default TagsList
