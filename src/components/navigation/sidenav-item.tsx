import Link from "next/link"
import React from "react"

type Props = {
  Icon: any
  label: string
  href: string
}

const SideNavItem = ({ Icon, label, href }: Props) => {
  return (
    <Link href={href} className="flex gap-3 items-center">
      <span>
        <Icon size={30} classname="text-gray-700" />
      </span>
      <span className="text-base text-gray-700">{label}</span>
    </Link>
  )
}

export default SideNavItem
