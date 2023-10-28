import MainLayout from "@/components/layouts/main-layout"
import React, { PropsWithChildren } from "react"

type Props = {}

const ExchangeRateLayout = ({ children }: PropsWithChildren) => {
  return <MainLayout>{children}</MainLayout>
}

export default ExchangeRateLayout
