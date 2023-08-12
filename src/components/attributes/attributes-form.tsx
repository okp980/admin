"use client"
import React, { useEffect, useState } from "react"
import Description from "../ui/description"
import Card from "../common/card"
import Button from "../ui/button/button"
import { useRouter } from "next/navigation"

import { Attribute } from "@/utils/types"

import Input from "../ui/input"
import { v4 as uuidv4 } from "uuid"
import { toast } from "react-toastify"

type Props = {
  initialValues?: Attribute
  loading?: boolean
  type: "create" | "update"
  onHandleSubmit: (value: Attribute) => Promise<void>
}
interface FieldType {
  id?: string
  value?: string
  meta?: string
}

const AttributesForm = ({
  initialValues,
  loading,
  type,
  onHandleSubmit,
}: Props) => {
  const router = useRouter()

  const [fields, setFields] = useState<FieldType[]>([])
  const [attributeName, setAttributeName] = useState("")

  useEffect(() => {
    if (initialValues) {
      setAttributeName(initialValues.name)
      setFields(initialValues.values)
    }
  }, [])

  const createValuesFields = () => {
    const newField = {
      id: uuidv4(),
      value: "",
      meta: "",
    }
    setFields((prev) => [...prev, newField])
  }
  const removeValuesFields = (id: string) => {
    const selectedField = fields.find((f) => f.id === id) as FieldType
    let filteredFields = fields
    if (selectedField) {
      filteredFields = fields.filter((f) => f.id !== selectedField.id)
    }

    setFields(filteredFields)
  }
  const updateValuesFields = (id: string, field: FieldType) => {
    let filteredFields: FieldType[] = []
    let selectedField: FieldType = {}
    selectedField = fields.find((f) => f.id === id) as FieldType
    if (selectedField) {
      filteredFields = fields.filter((f) => f.id !== selectedField.id)
    }
    const updatedField = { ...selectedField, ...field }
    filteredFields = [...filteredFields, updatedField]
    setFields(filteredFields)
  }

  function onSubmit() {
    console.log(fields)

    // check for empty fields
    let isEmptyField = false
    // fields.forEach((f) => {
    //   for (const key in f) {
    //     // @ts-ignore
    //     if (f[key]?.trim() === "") {
    //       isEmptyField = true
    //     }
    //   }
    // })
    if (!attributeName.trim().length) {
      toast.error("Attribute name is required")
    } else if (attributeName.trim().length && isEmptyField) {
      toast.error(
        "Please ensure that the values for this attribute is not empty"
      )
    } else {
      const payload = {
        name: attributeName as string,
        values: fields,
      }
      console.log(payload)
      // @ts-ignore
      onHandleSubmit(payload)
    }
  }
  return (
    <>
      <div className="my-5 flex flex-wrap  border-gray-300 pb-8 sm:my-8 border-b border-dashed">
        <Description
          title={"Attribute"}
          details={
            type === "update"
              ? "Update attribute name and necessary information here"
              : "Add attribute name and necessary information here"
          }
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            name="attributeName"
            placeholder="Enter category name"
            label="Name"
            className="mb-5"
            value={attributeName}
            onChange={(e) => setAttributeName(e.target.value)}
          />
        </Card>
      </div>
      <div className="my-5 flex flex-wrap  border-gray-300 pb-8 sm:my-8">
        <Description
          title={"Values"}
          details={
            type === "update"
              ? "Update your attribute values and necessary information from here"
              : "Add your attribute values and necessary information from here"
          }
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div>
            {fields.map((item: FieldType, index) => (
              <div
                className="border-b border-dashed border-border-200 py-5 last:border-0 md:py-8"
                key={item.id}
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-5">
                  <Input
                    className="sm:col-span-2"
                    label={"Value"}
                    variant="outline"
                    value={item.value as string}
                    name={`${item.id}-value`}
                    onChange={(e) => {
                      updateValuesFields(item.id as string, {
                        value: e.target.value,
                      })
                    }}
                    // defaultValue={item.value!} // make sure to set up defaultValue
                  />
                  <Input
                    className="sm:col-span-2"
                    label={"Meta"}
                    variant="outline"
                    value={item.meta as string}
                    name={`${item.id}-meta`}
                    onChange={(e) => {
                      updateValuesFields(item.id as string, {
                        meta: e.target.value,
                      })
                    }}
                    // defaultValue={item.meta!} // make sure to set up defaultValue
                  />
                  <button
                    onClick={() => removeValuesFields(item.id as string)}
                    type="button"
                    className="text-sm text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none sm:col-span-1 sm:mt-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            onClick={createValuesFields}
            className="w-full sm:w-auto"
          >
            Add Value
          </Button>
        </Card>
      </div>
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

        <Button loading={loading} type="button" onClick={onSubmit}>
          {type === "create" ? "Create Attribute" : "Update Attribute"}
        </Button>
      </div>
    </>
  )
}

export default AttributesForm
