import { Form, Formik } from "formik"
import React from "react"
import Description from "../ui/description"
import Card from "../common/card"
import FileField from "../form/fileField"
import SelectField from "../form/selectField"
import TextField from "../form/textField"
import TextAreaField from "../form/textAreaField"
import ProductSimpleForm from "./product-simple-form"
import Button from "../ui/button/button"
import { useRouter } from "next/navigation"
import ProductVariantForm from "./product-varaint-form"
import { ProductResult } from "@/utils/types"
import CustomEditor from "../ui/customEditor/customEditor"

type Props = {
  categories: any[]
  sub_categories: any[]
  isCategoriesLoading: boolean
  isSubCategoriesLoading: boolean
  tags: any[]
  isLoadingTags: boolean
  formAction?: "create" | "update"
  product?: ProductResult
  handleGetSubCategories: (params: any) => Promise<void>
  handleGetTags: (params: any) => Promise<void>
  onHandleSubmit: (value: any) => Promise<void>
  loading: boolean
}

export const productInitialValues = {
  image: null,
  description: "",
  gallery: [],
  category: "",
  sub_category: "",
  name: "",
  brand: "",
  weight: "",
  tags: [],
  price: "",
  quantity: "",
  sku: "",
  width: "",
  height: "",
  length: "",
  product_type: "",
  variation: [
    {
      attributeValues: [{ attribute: "", value: "" }],
      price: "",
      sku: "",
      quantity: "",
      image: null,
    },
  ],
}

const ProductForm = ({
  formAction,
  product,
  loading,
  categories,
  isCategoriesLoading,
  sub_categories,
  isSubCategoriesLoading,
  handleGetSubCategories,
  handleGetTags,
  onHandleSubmit,
  tags,

  isLoadingTags,
}: Props) => {
  const product_types = [
    { label: "Simple Product", value: "simple" },
    { label: "Variable Product", value: "variable" },
  ]

  const router = useRouter()

  const handleSubmit = async (values: typeof productInitialValues) => {
    onHandleSubmit(values)
  }
  return (
    <Formik initialValues={productInitialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form>
          <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
            <Description
              title={"Product Image"}
              details={"Upload Product Image"}
              className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <FileField
                name="image"
                label="Image"
                type="file"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (
                    event &&
                    event.currentTarget &&
                    event.currentTarget.files
                  ) {
                    setFieldValue("image", event.currentTarget.files[0])
                  }
                }}
              />
            </Card>
          </div>

          <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
            <Description
              title={"Gallery"}
              details={
                "Upload product image gallery. Hold Command or Control key to select multiple images."
              }
              className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <FileField
                name="gallery"
                multiple
                label="Gallery"
                type="file"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (
                    event &&
                    event.currentTarget &&
                    event.currentTarget.files
                  ) {
                    setFieldValue("gallery", event.currentTarget.files)
                  }
                }}
              />
            </Card>
          </div>

          <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
            <Description
              title={"Categories & Sub Categories"}
              details={"Select product category and sub categories."}
              className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <SelectField
                label="Category"
                name="category"
                options={categories}
                isLoading={isCategoriesLoading}
                isClearable
                className="mb-5"
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.id}
                // defaultValue={getDefaultValue()}
                onChange={(category: any) => {
                  if (category) {
                    setFieldValue("category", category.id)
                    handleGetSubCategories({ category: category.id })
                    handleGetTags({ category: category.id })
                  }
                }}
              />
              <SelectField
                label="Sub Category"
                name="sub_category"
                options={sub_categories}
                isLoading={isSubCategoriesLoading}
                isClearable
                className="mb-5"
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.id}
                // defaultValue={getDefaultValue()}
                onChange={(category: any) => {
                  if (category) {
                    setFieldValue("sub_category", category.id)
                  }
                }}
              />
            </Card>
          </div>

          <div className="my-5 flex flex-wrap sm:my-8">
            <Description
              title={"Description"}
              details={`${
                formAction === "update" ? "Edit" : "Add"
              }  necessary product information.`}
              className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <TextField
                name="name"
                label="Name"
                className="mb-5"
                maxLength={80}
              />
              {/* <TextField
                name="description"
                label="Description"
                className="mb-5"
              /> */}
              <div className="mb-4">
                {/* <label className="mb-3 block text-sm font-semibold leading-none text-body-dark">
                  Description
                </label> */}
                {/* <CustomEditor
                  value={values.description}
                  onEditorChange={(content) => {
                    setFieldValue("description", content)
                  }}
                /> */}
                <TextAreaField
                  name="description"
                  label="Description"
                  className="mb-5"
                  maxLength={400}
                  height={500}
                />
              </div>
              <TextField name="brand" label="Brand" className="mb-5" />
              <TextField
                name="weight"
                label="Weight"
                type="number"
                className="mb-5"
              />

              <SelectField
                label="Tags"
                name="tags"
                options={tags}
                isLoading={isLoadingTags}
                isClearable
                isMulti
                className="mb-5"
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.id}
                // defaultValue={getDefaultValue()}
                // onChange={(tag: any) => {
                //   console.log(tag)

                //   if (tag) {
                //     setFieldValue("tags", tag)
                //   }
                // }}
              />
            </Card>
          </div>

          <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
            <Description
              title={"Product Type"}
              details={"Select product type."}
              className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pr-4 md:w-1/3 md:pr-5"
            />
            <Card className="w-full sm:w-8/12 md:w-2/3">
              <SelectField
                label="Product Type"
                name="product_type"
                options={product_types}
                className="mb-5"
                getOptionLabel={(option: any) => option.label}
                getOptionValue={(option: any) => option.value}
                // defaultValue={getDefaultValue()}
                onChange={(type: any) => {
                  if (type) {
                    setFieldValue("product_type", type.value)
                  }
                }}
              />
            </Card>
          </div>

          {values.product_type.trim().length > 0 && (
            <div className="my-5 flex flex-wrap sm:my-8">
              <Description
                title={`${
                  values.product_type === "simple" ? "Simple" : "Variable"
                } Product Information`}
                details={`${
                  formAction === "create" ? "Add" : "Edit"
                } more product information`}
                className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
              />

              <Card className="w-full sm:w-8/12 md:w-2/3">
                {values.product_type === "simple" && <ProductSimpleForm />}
                {values.product_type === "variable" && <ProductVariantForm />}
              </Card>
            </div>
          )}
          <div className="mb-4 text-end">
            {formAction === "update" && (
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
              {formAction === "update" ? "Update Product" : "Create Product"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default ProductForm
