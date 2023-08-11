"use client"
import React from "react"
import Description from "../ui/description"
import Card from "../common/card"
import { Form, Formik } from "formik"
import Button from "../ui/button/button"
import { useRouter } from "next/navigation"
import TextField from "../form/textField"
import * as yup from "yup"
import { ShippingType } from "@/utils/types"

type Props = {
  initialValues: ShippingType
  loading?: boolean
  type: "create" | "update"
  onHandleSubmit: (value: ShippingType) => Promise<void>
}

const ShippingFormSchema = yup.object().shape({
  title: yup.string().required("Tag name is required"),
  description: yup.string().required("Description is required"),
  duration: yup.string().required("Duration is required"),
  charge: yup.string().required("Charge is required"),
})

const ShippingForm = ({
  initialValues,
  loading,
  type,
  onHandleSubmit,
}: Props) => {
  const router = useRouter()

  function onSubmit(values: ShippingType) {
    onHandleSubmit(values)
  }
  return (
    <div className="my-5 flex flex-wrap  border-gray-300 pb-8 sm:my-8">
      <Description
        title={"Description"}
        details={
          type === "update"
            ? "Update shipping method details and necessary information from here"
            : "Add shipping method details and necessary information from here"
        }
        className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
      />
      <Card className="w-full sm:w-8/12 md:w-2/3">
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          enableReinitialize
          validationSchema={ShippingFormSchema}
        >
          {({ setFieldValue }) => (
            <Form>
              <TextField
                name="title"
                placeholder="Enter shipping title"
                label="Title"
                className="mb-5"
              />
              <TextField
                name="description"
                placeholder="Enter shipping description"
                label="Description"
                className="mb-5"
              />
              <TextField
                name="duration"
                placeholder="Enter shipping duration"
                label="Duration"
                className="mb-5"
                type="number"
              />
              <TextField
                name="charge"
                placeholder="Enter shipping charge"
                label="Charge"
                className="mb-5"
                type="number"
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
                  {type === "create" ? "Create Shipping" : "Update Shipping"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  )
}

export default ShippingForm
