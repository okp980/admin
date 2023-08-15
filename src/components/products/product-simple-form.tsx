import React from "react"
import Card from "../common/card"
import TextField from "../form/textField"

type Props = {}

const ProductSimpleForm = (props: Props) => {
  return (
    <>
      <TextField name="price" label="Price" className="mb-5" />
      <TextField name="quantity" label="Quantity" className="mb-5" />
      <TextField name="sku" label="SKU" className="mb-5" />
      <TextField name="width" label="Width" className="mb-5" />
      <TextField name="height" label="Height" className="mb-5" />
      <TextField name="length" label="Length" className="mb-5" />
    </>
  )
}

export default ProductSimpleForm
