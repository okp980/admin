"use client"

import AttributeList from "@/components/attributes/attributes-list"
import Card from "@/components/common/card"
import Search from "@/components/common/search"
import ErrorMessage from "@/components/ui/error-message"
import LinkButton from "@/components/ui/link-button"
import Loader from "@/components/ui/loader/loader"
import { Routes } from "@/config/routes"
import { useGetAttributesQuery } from "@/redux/services/attribute"
import React from "react"

type Props = {}

const AttributesPage = (props: Props) => {
  const {
    data: attributes,
    isLoading,
    isError,
    error,
  } = useGetAttributesQuery()
  if (isLoading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader />
      </div>
    )

  if (isError) {
    const errorMessage: any = isError ? error : null

    return <ErrorMessage message={errorMessage?.data.error} />
  }
  return (
    <>
      <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <h1 className="text-xl font-semibold text-heading">Attributes</h1>
        </div>
        <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-1/2">
          <Search onSearch={() => {}} />

          <LinkButton
            href={Routes.attribute.create}
            className="h-12 w-full md:w-auto md:ms-6"
          >
            <span className="block md:hidden xl:block">+ Add Attribute</span>
            <span className="hidden md:block xl:hidden">+ Add Attribute</span>
          </LinkButton>
        </div>
      </Card>
      <AttributeList attributes={attributes?.data} />
    </>
  )
}

export default AttributesPage
