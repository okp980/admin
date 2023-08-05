import { Routes } from "@/config/routes"
import Link from "next/link"
import React from "react"
import { BsTrash3 } from "react-icons/bs"
import { FiEdit } from "react-icons/fi"

type Props = {
  onDelete: () => void
  href: string
}

const ActionButtons = ({ onDelete, href }: Props) => {
  return (
    <div className="flex gap-5 items-center justify-center">
      <div onClick={onDelete}>
        <BsTrash3 size={18} className="text-red-700 cursor-pointer" />
      </div>
      <Link href={href}>
        <FiEdit
          size={18}
          className="cursor-pointer stroke-gray-400 hover:stroke-gray-800"
        />
      </Link>
    </div>
  )
}

export default ActionButtons
