import { ErrorMessage, Field, FieldHookConfig, useField } from "formik"
import React from "react"
import Select, { SelectProps } from "../ui/select/select"

type Props = SelectProps & { label?: string }
export type Ref = any
const SelectField = React.forwardRef<Ref, Props>(
  ({ label, ...props }: Props, ref) => {
    return (
      <>
        <div className="mb-5">
          {label && (
            <label className="mb-3 block text-sm font-semibold leading-none text-body-dark">
              {label}
            </label>
          )}
          <Field
            innerRef={ref}
            component={Select}
            {...props}
            className="mb-2"
          />
          <ErrorMessage
            name="category"
            render={(error) => (
              <div className=" text-xs text-red-500 text-start">{error}</div>
            )}
          />
        </div>
      </>
    )
  }
)

export default SelectField
