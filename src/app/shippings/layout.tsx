import MainLayout from "@/components/layouts/main-layout"
import React, { PropsWithChildren } from "react"

const ShippingsLayout = ({ children }: PropsWithChildren) => {
  return <MainLayout>{children}</MainLayout>
}

export default ShippingsLayout
