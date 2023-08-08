import React from "react"
import { useField } from "formik"
import PasswordInput, { PasswordProps } from "../ui/password-input"

interface Props extends PasswordProps {}

const PasswordField = ({ label, ...props }: Props) => {
  const [field, meta, helpers] = useField(props)
  return (
    <PasswordInput
      label={label}
      {...field}
      {...props}
      error={meta.touched && meta.error ? meta.error : undefined}
    />
  )
}

export default PasswordField
