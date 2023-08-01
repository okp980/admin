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
        <main className="fixed left-[250px] top-[64px] right-0 bottom-0 p-5">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout
