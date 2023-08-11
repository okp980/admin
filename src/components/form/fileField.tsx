import React from "react"
import { ErrorMessage, useField } from "formik"
import Input, { InputProps } from "../ui/input"

interface Props extends InputProps {}

const FileField = ({ label, ...props }: Props) => {
  return (
    <>
      <label className="mb-3 block text-sm font-semibold leading-none text-body-dark">
        {label}
      </label>
      <input
        className="px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent"
        {...props}
      />
      <ErrorMessage
        name="image"
        render={(error) => (
          <p className="my-2 text-xs text-red-500 text-start">{error}</p>
        )}
      />
    </>
  )
}

export default FileField
