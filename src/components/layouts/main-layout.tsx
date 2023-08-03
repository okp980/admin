import React, { PropsWithChildren } from "react"
import Navbar from "../navigation/navbar"
import SideNav from "../navigation/side-nav"

type Props = {}

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-slate-100 h-screen">
      <Navbar />
      <div className="flex">
        <SideNav />
        <main className="fixed left-0 lg:left-[250px] top-[64px] right-0 bottom-0 p-5 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout
