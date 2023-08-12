import { useState } from "react"

import { Routes } from "@/config/routes"
import ActionButtons from "../common/action-buttons"
import { MODAL_VIEW } from "@/utils/enums"
import useModal from "@/hooks/useModal"
import { Table } from "../ui/table/table"
import { Attribute } from "@/utils/types"

export type IProps = {
  attributes: Attribute[] | undefined
}
const AttributeList = ({ attributes }: IProps) => {
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
      title: "Values",
      dataIndex: "values",
      key: "values",
      align: "left",
      render: (values: any) => {
        return (
          <span className="whitespace-nowrap">
            {values?.map((singleValues: any, index: number) => {
              return index > 0
                ? `, ${singleValues.value}`
                : `${singleValues.value}`
            })}
          </span>
        )
      },
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
              view: MODAL_VIEW.DELETE_ATTRIBUTE,
              modalPayload: { id },
            })
          }
          href={Routes.attribute.edit(id)}
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
        data={attributes}
        rowKey="id"
        scroll={{ x: 380 }}
      />
    </div>
  )
}

export default AttributeList
