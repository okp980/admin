import { useState } from "react"

import { Routes } from "@/config/routes"
import ActionButtons from "../common/action-buttons"
import { MODAL_VIEW } from "@/utils/enums"
import useModal from "@/hooks/useModal"
import { Table } from "../ui/table/table"
import { PaginatedInfo, TagResult } from "@/utils/types"
import Pagination from "../ui/pagination/pagination"

export type IProps = {
  tags: TagResult[] | undefined
  paginatorInfo: PaginatedInfo | null
  onPagination: (current: number) => void
}
const TagsList = ({ tags, paginatorInfo, onPagination }: IProps) => {
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
              view: MODAL_VIEW.DELETE_TAG,
              modalPayload: { id },
            })
          }
          href={Routes.tag.edit(id)}
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
          data={tags}
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

export default TagsList
