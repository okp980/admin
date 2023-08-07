import Link from "next/link"
import React from "react"

type Props = {
  Icon: any
  label: string
  href: string
}

const SideNavItem = ({ Icon, label, href }: Props) => {
  return (
    <Link href={href} className="flex gap-5 items-center">
      <span>
        <Icon size={20} className="text-gray-500" />
      </span>
      <span className="text-base text-gray-500">{label}</span>
    </Link>
  )
}

export default SideNavItem
