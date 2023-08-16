"use client"
// import Dashboard from "@/components/dashboard/dashboard"
import React from "react"
import dynamic from "next/dynamic"
const Dashboard = dynamic(() => import("@/components/dashboard/dashboard"), {
  ssr: false,
})

type Props = {}

const DashboardPage = (props: Props) => {
  return <Dashboard />
}

export default DashboardPage
