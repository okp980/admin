"use client"
import React, { PropsWithChildren, useState } from "react"
import Navbar from "../navigation/navbar"
import SideNav from "../navigation/side-nav"
import MobileNavigation from "../navigation/mobile-navigation"

type Props = {}

const MainLayout = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150">
      <Navbar
        toggleSidebar={() => {
          setOpen((prev) => !prev)
        }}
      />
      <MobileNavigation open={open} onClose={() => setOpen(false)}>
        <SideNav />
      </MobileNavigation>
      <div className="flex flex-1 pt-20">
        <aside className="w-[250px] hidden lg:block  fixed bottom-0 left-0 top-[64px] z-10  shadow overflow-y-auto">
          <SideNav />
        </aside>
        <main className="fixed left-0 lg:left-[250px] top-[64px] right-0 bottom-0 p-5 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout
