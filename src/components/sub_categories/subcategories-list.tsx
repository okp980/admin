import { useState } from "react"

import { Routes } from "@/config/routes"
import ActionButtons from "../common/action-buttons"
import { MODAL_VIEW } from "@/utils/enums"
import useModal from "@/hooks/useModal"
import { Table } from "../ui/table/table"
import { PaginatedInfo, SubCategoryResult } from "@/utils/types"
import Image from "next/image"
import Pagination from "../ui/pagination/pagination"
import { siteSettings } from "@/settings/site.settings"

export type IProps = {
  subcategories: SubCategoryResult[] | undefined
  paginatorInfo: PaginatedInfo | null
  onPagination: (current: number) => void
}
const SubCategoriesList = ({
  subcategories,
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
      render: (name: any) => (
        <span className="whitespace-nowrap capitalize">{name}</span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "left",
      render: (category: any) => (
        <span className="whitespace-nowrap capitalize">{category.name}</span>
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
              view: MODAL_VIEW.DELETE_PRODUCT,
              modalPayload: { id },
            })
          }
          href={Routes.sub_category.edit(id)}
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
          data={subcategories}
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

export default SubCategoriesList
