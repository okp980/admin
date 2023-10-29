import React from "react"
import { useField } from "formik"
import TextArea, { TextAreaProps } from "../ui/text-area"

interface Props extends TextAreaProps {}

const TextAreaField = ({ label, ...props }: Props) => {
  const [field, meta, helpers] = useField(props)
  return (
    <TextArea
      label={label}
      {...field}
      {...props}
      error={meta.touched && meta.error ? meta.error : undefined}
    />
  )
}

export default TextAreaField
