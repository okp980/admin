import MainLayout from "@/components/layouts/main-layout"
import React, { PropsWithChildren } from "react"

const ProductsLayout = ({ children }: PropsWithChildren) => {
  return <MainLayout>{children}</MainLayout>
}

export default ProductsLayout
