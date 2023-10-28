"use client"
import React from "react"
import Description from "../ui/description"
import Card from "../common/card"
import { Form, Formik } from "formik"
import Button from "../ui/button/button"
import { useRouter } from "next/navigation"
import TextField from "../form/textField"
import * as yup from "yup"
import { ExchangeRateType } from "@/utils/types"

type Props = {
  initialValues: ExchangeRateType
  loading?: boolean
  onHandleSubmit: (value: ExchangeRateType) => Promise<void>
}

const ExchangeRateFormSchema = yup.object().shape({
  rate: yup.string().required("Rate is required"),
})

const ExchangeRateForm = ({
  initialValues,
  loading,
  onHandleSubmit,
}: Props) => {
  const router = useRouter()

  function onSubmit(values: ExchangeRateType) {
    onHandleSubmit(values)
  }
  return (
    <div className="my-5 flex flex-wrap  border-gray-300 pb-8 sm:my-8">
      <Description
        title={"What is the new rate?"}
        details={"Change current exchange rate here"}
        className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
      />
      <Card className="w-full sm:w-8/12 md:w-2/3">
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          enableReinitialize
          validationSchema={ExchangeRateFormSchema}
        >
          {({ setFieldValue }) => (
            <Form>
              <TextField
                name="rate"
                placeholder="Enter rate"
                label="Rate"
                className="mb-5"
              />

              <div className="mb-4 text-end">
                <Button loading={loading} type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  )
}

export default ExchangeRateForm
