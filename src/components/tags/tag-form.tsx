import React from "react"
import Description from "../ui/description"
import Card from "../common/card"
import { Form, Formik } from "formik"
import Button from "../ui/button/button"
import { useRouter } from "next/navigation"
import TextField from "../form/textField"
import SelectField from "../form/selectField"
import * as yup from "yup"
import { TagType } from "@/utils/types"

type Props = {
  initialValues: TagType
  loading?: boolean
  type: "create" | "update"
  categories: any[]
  isCategoriesLoading: boolean
  onHandleSubmit: (value: TagType) => Promise<void>
}

const TagFormSchema = yup.object().shape({
  name: yup.string().required("Tag name is required"),
  category: yup.string().required("Category is required"),
})

const TagForm = ({
  initialValues,
  loading,
  type,
  categories,
  isCategoriesLoading,
  onHandleSubmit,
}: Props) => {
  const router = useRouter()
  console.log(initialValues)

  const getDefaultValue = () => {
    const cat = categories.find((c) => c.id === initialValues.category)

    return cat ? { value: cat.id, label: cat.name } : null
  }

  function onSubmit(values: TagType) {
    console.log(values)

    onHandleSubmit(values)
  }
  return (
    <div className="my-5 flex flex-wrap  border-gray-300 pb-8 sm:my-8">
      <Description
        title={"Description"}
        details={
          type === "update"
            ? "Update your tag details and necessary information from here"
            : "Add your tag details and necessary information from here"
        }
        className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
      />
      <Card className="w-full sm:w-8/12 md:w-2/3">
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          enableReinitialize
          validationSchema={TagFormSchema}
        >
          {({ setFieldValue }) => (
            <Form>
              <TextField
                name="name"
                placeholder="Enter Tag name"
                label="Name"
                className="mb-5"
              />
              <SelectField
                label="Category"
                name="category"
                options={categories}
                isLoading={isCategoriesLoading}
                isClearable
                className="mb-5"
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.id}
                defaultValue={getDefaultValue()}
                onChange={(category: any) => {
                  if (category) {
                    setFieldValue("category", category.id)
                  }
                }}
              />

              <div className="mb-4 text-end">
                {type === "update" && (
                  <Button
                    variant="outline"
                    onClick={router.back}
                    className="me-4"
                    type="button"
                  >
                    Back
                  </Button>
                )}

                <Button loading={loading} type="submit">
                  {type === "create" ? "Create Tag" : "Update Tag"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  )
}

export default TagForm
