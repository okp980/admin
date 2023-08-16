import { useState } from "react"

import { Routes } from "@/config/routes"
import ActionButtons from "../common/action-buttons"
import { MODAL_VIEW } from "@/utils/enums"
import useModal from "@/hooks/useModal"
import { Table } from "../ui/table/table"
import { CategoryResult, PaginatedInfo } from "@/utils/types"
import Image from "next/image"
import Pagination from "../ui/pagination/pagination"
import { siteSettings } from "@/settings/site.settings"

export type IProps = {
  categories: CategoryResult[] | undefined
  paginatorInfo: PaginatedInfo | null
  onPagination: (current: number) => void
}
const CategoriesList = ({
  categories,
  paginatorInfo,
  onPagination,
}: IProps) => {
  const { handleOpenModal } = useModal()

  let columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "values",
      align: "left",
      width: 74,
      render: (image: any, { name }: { name: string }) => (
        <div className="relative flex h-[42px] w-[42px] items-center">
          <Image
            src={siteSettings.product.placeholder} // change to =>image ?? siteSettings.product.placeholder
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw"
            className="overflow-hidden rounded object-fill"
          />
        </div>
      ),
    },
    {
      title: "Name",

      dataIndex: "name",
      key: "name",
      align: "left",
      width: 250,
      render: (name: any) => (
        <span className="whitespace-nowrap capitalize">{name}</span>
      ),
    },

    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      align: "center",
      width: 74,
      render: (id: string) => (
        <ActionButtons
          onDelete={() =>
            handleOpenModal({
              view: MODAL_VIEW.DELETE_CATEGORY,
              modalPayload: { id },
            })
          }
          href={Routes.category.edit(id)}
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
          data={categories}
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

export default CategoriesList
