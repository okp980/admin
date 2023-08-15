import React, { useState } from "react"
import ProductVariant from "./product-varaint"

import { useGetAttributesQuery } from "@/redux/services/attribute"

type Props = {}

const ProductVariantForm = (props: Props) => {
  const [selectedAttribute, setSelectedAttribute] = useState("")
  const {
    data: attributes,
    isLoading,
    isError,
    error,
  } = useGetAttributesQuery()

  function getSelectedAttributevalues(id?: string) {
    if (id) {
      return attributes?.data.find((a) => a.id === id)?.values
    }
  }

  return (
    <ProductVariant
      attributes={attributes?.data as any[]}
      isLoading={isLoading}
      getSelectedAttributevalues={getSelectedAttributevalues}
      selectedAttribute={selectedAttribute}
      setSelectedAttribute={setSelectedAttribute}
    />
  )
}

export default ProductVariantForm
