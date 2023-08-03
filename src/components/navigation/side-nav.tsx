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
    <aside className="w-[250px] hidden lg:block bg-white fixed bottom-0 left-0 top-[64px] z-10 p-5 shadow overflow-y-auto">
      <div className="flex flex-col space-y-6 py-3">
        <SideNavMap />
      </div>
    </aside>
  )
}

export default SideNav
