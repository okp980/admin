import MainLayout from "@/components/layouts/main-layout"
import React, { PropsWithChildren } from "react"

type Props = {}

const TagsLayout = ({ children }: PropsWithChildren) => {
  return <MainLayout>{children}</MainLayout>
}

export default TagsLayout
