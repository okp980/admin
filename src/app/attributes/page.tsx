"use client"

import AttributeList from "@/components/attributes/attributes-list"
import Card from "@/components/common/card"
import { useGetAttributesQuery } from "@/redux/services/attribute"
import React from "react"

type Props = {}

const AttributesPage = (props: Props) => {
  const { data: attributes, isLoading, isError } = useGetAttributesQuery()
  return (
    <>
      <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <h1 className="text-xl font-semibold text-heading">Attributes</h1>
        </div>
      </Card>
      <AttributeList attributes={attributes?.data} />
    </>
  )
}

export default AttributesPage
