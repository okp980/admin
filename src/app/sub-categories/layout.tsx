import MainLayout from "@/components/layouts/main-layout"
import React, { PropsWithChildren } from "react"

type Props = {}

const SubCategoriesLayout = ({ children }: PropsWithChildren) => {
  return <MainLayout>{children}</MainLayout>
}

export default SubCategoriesLayout
