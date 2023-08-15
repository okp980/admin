import {
  ErrorMessage,
  Field,
  FieldHookConfig,
  FieldProps,
  FormikValues,
  useField,
} from "formik"
import React from "react"
import Select, { SelectProps } from "../ui/select/select"

type Props = SelectProps & { label?: string }
export type Ref = any

function SelectFormik(props: SelectProps & FieldProps) {
  const [field, state, { setValue, setTouched }] = useField(props.field.name)

  // value is an array now
  const onChange = (value: any) => {
    setValue(value)
  }

  // use value to make this a  controlled component
  // now when the form receives a value for 'campfeatures' it will populate as expected
  return (
    <Select
      // value={state?.value}
      onChange={onChange}
      // @ts-ignore
      onBlur={setTouched}
      {...props}
    />
  )
}

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
            component={SelectFormik}
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
