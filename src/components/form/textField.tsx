import React from "react"
import { useField } from "formik"
import Input, { InputProps } from "../ui/input"

interface Props extends InputProps {}

const TextField = ({ label, ...props }: Props) => {
  const [field, meta, helpers] = useField(props)
  return (
    <Input
      label={label}
      {...field}
      {...props}
      error={meta.touched && meta.error ? meta.error : undefined}
    />
  )
}

export default TextField
