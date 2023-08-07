import { siteSettings } from "@/settings/site.settings"
import React from "react"
import SideNavItem from "./sidenav-item"

type Props = {}

const SideNavMap = () => {
  return (
    <>
      {siteSettings.sideLinks.map((link, index: number) => (
        <SideNavItem
          Icon={link.icon}
          label={link.label}
          href={link.href}
          key={index}
        />
      ))}
    </>
  )
}

const SideNav = (props: Props) => {
  return (
    <div className="flex flex-col space-y-6 py-3 bg-white  p-5">
      <SideNavMap />
    </div>
  )
}

export default SideNav
