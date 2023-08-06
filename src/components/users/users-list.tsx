import { useState } from "react"

import { Routes } from "@/config/routes"
import ActionButtons from "../common/action-buttons"
import { MODAL_VIEW } from "@/utils/enums"
import useModal from "@/hooks/useModal"
import { Table } from "../ui/table/table"
import { UserResult } from "@/utils/types"

export type IProps = {
  users: UserResult[] | undefined
}
const UsersList = ({ users }: IProps) => {
  const { handleOpenModal } = useModal()

  let columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "left",
      render: (name: any) => <span className="whitespace-nowrap">{name}</span>,
    },
    {
      title: "Permission",
      dataIndex: "role",
      key: "role",
      align: "center",
    },
    {
      title: "Verified Email",
      dataIndex: "verified_email",
      key: "verified_email",
      align: "center",
      render: (verified: any) => (
        <span className="whitespace-nowrap">{`${verified}`}</span>
      ),
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      align: "center",
      render: (active: any) => (
        <span className="whitespace-nowrap">{`${active}`}</span>
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
          href={Routes.user.edit(id)}
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
        data={users}
        rowKey="id"
        scroll={{ x: 380 }}
      />
    </div>
  )
}

export default UsersList
