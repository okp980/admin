import React, { useState } from "react"
import TextField from "../form/textField"
import FileField from "../form/fileField"
import SelectField from "../form/selectField"
import { AttributeValue } from "@/utils/types"
import Button from "../ui/button/button"
import { v4 as uuid } from "uuid"
import { productInitialValues } from "./product-form"
import { FieldArray, useFormikContext } from "formik"

type Props = {
  getSelectedAttributevalues: (
    selected: string | undefined
  ) => AttributeValue[] | undefined
  setSelectedAttribute: (id: string) => void
  isLoading: boolean
  attributes: any[]
  selectedAttribute: string
}

const ProductVariant = ({
  isLoading,
  attributes,
  getSelectedAttributevalues,
  selectedAttribute,
  setSelectedAttribute,
}: Props) => {
  const { values, setFieldValue } =
    useFormikContext<typeof productInitialValues>()

  return (
    <div className="mt-5 mb-5  p-5 last:mb-8 last:border-0 md:p-8 md:last:pb-0">
      <FieldArray name="variation">
        {({ insert, push, remove }) => (
          <div>
            {values.variation.length > 0 &&
              values.variation.map((v: any, i: number) => (
                <div
                  key={i}
                  className="mb-10 border-b border-dashed border-border-200"
                >
                  <div className="flex  items-center mb-8 gap-5">
                    <span className="block text-body-dark font-semibold text-xl leading-none ">
                      Variation {i + 1}
                    </span>

                    {values.variation.length > 1 && (
                      <button
                        onClick={() => {
                          remove(i)
                        }}
                        type="button"
                        className="text-sm text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none"
                      >
                        Remove Variation
                      </button>
                    )}
                  </div>

                  <FieldArray name={`variation.${i}.attributeValues`}>
                    {({ push: pushAttribute, remove: removeAttribute }) => (
                      <div>
                        {v.attributeValues.length > 0 &&
                          v.attributeValues.map(
                            (_: any, attriIndex: number) => (
                              <div key={attriIndex}>
                                <div className="flex items-center gap-5 border-b border-dashed border-border-base py-3">
                                  <span className="block text-body-dark font-semibold text-lg leading-none ">
                                    Attribute {attriIndex + 1}
                                  </span>
                                  {v.attributeValues.length > 1 && (
                                    <button
                                      onClick={() => {
                                        removeAttribute(attriIndex)
                                      }}
                                      type="button"
                                      className="text-sm text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none"
                                    >
                                      Remove Option
                                    </button>
                                  )}
                                </div>

                                <div className="grid grid-cols-fit gap-5">
                                  <div className="mt-5">
                                    <SelectField
                                      label="Name"
                                      name={`variation.${i}.attributeValues.${attriIndex}.attribute`}
                                      isLoading={isLoading}
                                      options={attributes}
                                      className="mb-5"
                                      getOptionLabel={(option: any) =>
                                        option.name
                                      }
                                      getOptionValue={(option: any) =>
                                        option.id
                                      }
                                      // defaultValue={getDefaultValue()}
                                      onChange={(option: any) => {
                                        console.log("attr", option)
                                        if (option) {
                                          setSelectedAttribute(option?.id)
                                          setFieldValue(
                                            `variation.${i}.attributeValues.${attriIndex}.attribute`,
                                            option?.id
                                          )
                                        }
                                      }}
                                    />
                                  </div>

                                  <div className="col-span-2 mt-5">
                                    <SelectField
                                      label="Value"
                                      name={`variation.${i}.attributeValues.${attriIndex}.value`}
                                      options={getSelectedAttributevalues(
                                        selectedAttribute
                                      )}
                                      isLoading={isLoading}
                                      className="mb-5"
                                      getOptionLabel={(option: any) =>
                                        option.meta
                                      }
                                      getOptionValue={(option: any) =>
                                        option.meta
                                      }
                                      // defaultValue={getDefaultValue()}
                                      onChange={(option: any) => {
                                        if (option) {
                                          console.log("attr value", option)

                                          setFieldValue(
                                            `variation.${i}.attributeValues.${attriIndex}.value`,
                                            option?.id
                                          )
                                        }
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        <div className="mb-14 flex items-end">
                          <Button
                            variant="outline"
                            onClick={() =>
                              pushAttribute({ attribute: "", value: "" })
                            }
                            type="button"
                          >
                            Add Option
                          </Button>
                        </div>
                      </div>
                    )}
                  </FieldArray>

                  <div className=" border-b border-dashed border-border-base  mb-8">
                    <h3 className="block text-body-dark font-semibold text-lg py-3 leading-none">
                      Details
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <TextField
                      label={`Price*`}
                      type="number"
                      name={`variation.${i}.price`}
                      className="mb-5"
                    />

                    <TextField
                      label={`SKU*`}
                      name={`variation.${i}.sku`}
                      className="mb-5"
                    />
                    <TextField
                      label={`Quantity*`}
                      type="number"
                      name={`variation.${i}.quantity`}
                      className="mb-5"
                    />
                    <div className="mb-5">
                      <FileField
                        label={`Image`}
                        type="file"
                        name={`variation.${i}.image`}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          if (
                            event &&
                            event.currentTarget &&
                            event.currentTarget.files
                          ) {
                            setFieldValue(
                              `variation.${i}.image`,
                              event.currentTarget.files[0]
                            )
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}

            <div className="flex flex-row items-center">
              <Button
                variant="outline"
                onClick={() =>
                  push({
                    attributeValues: [{ attribute: "", value: "" }],
                    price: "",
                    sku: "",
                    quantity: "",
                    image: "",
                  })
                }
                type="button"
                //   className=" text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none"
              >
                Add Product Variant
              </Button>
            </div>
          </div>
        )}
      </FieldArray>

      {/* {fields?.map((variant: any, index: number) => (
        <div key={index}>
          <div className="flex items-center justify-between  border-b border-dashed border-border-base py-3">
            <span className="block text-body-dark font-semibold text-lg leading-none ">
              Option {index + 1}
            </span>
            <button
              onClick={() => remove(index)}
              type="button"
              className="text-sm text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none"
            >
              remove
            </button>
          </div>

          <div className="grid grid-cols-fit gap-5">
            <div className="mt-5">
              <SelectField
                label="Attribute Name"
                name="attribute_name"
                isLoading={isLoading}
                options={attributes}
                className="mb-5"
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.id}
                // defaultValue={getDefaultValue()}
                onChange={(option: any) => {
                  if (option) {
                    setSelectedAttribute(option?.id)
                  }
                }}
              />
            </div>

            <div className="col-span-2 mt-5">
              <SelectField
                label="Attribute Value"
                name="attribute_value"
                options={getSelectedAttributevalues(selectedAttribute)}
                isLoading={isLoading}
                className="mb-5"
                getOptionLabel={(option: any) => option.meta}
                getOptionValue={(option: any) => option.meta}
                // defaultValue={getDefaultValue()}
                onChange={(type: any) => {
                  if (type) {
                    // setFieldValue("product_type", type.value)
                  }
                }}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="mb-14 flex items-end">
        <Button
          //   disabled={fields.length === attributes?.length}
          onClick={() =>
            setFields((prev: any) => [
              ...prev,
              { id: uuid(), value: "", meta: "" },
            ])
          }
          type="button"
        >
          Add Option
        </Button>
      </div>

      {fields.length > 0 && (
        <>
          <div className=" border-b border-dashed border-border-base  mb-8">
            <h3 className="block text-body-dark font-semibold text-lg py-3 leading-none">
              Information
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <TextField
              label={`Price*`}
              type="number"
              name="variation.price"
              className="mb-5"
            />

            <TextField label={`SKU*`} name="variation.sku" className="mb-5" />
            <TextField
              label={`Quantity*`}
              type="number"
              name="variation.quantity"
              className="mb-5"
            />
            <FileField
              label={`Image`}
              type="file"
              name="variation.image"
              className="mb-5"
            />
          </div>
        </>
      )} */}
    </div>
  )
}

export default ProductVariant
