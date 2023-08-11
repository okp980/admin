"use client"
import ShippingForm from "@/components/shipping/shipping-form"
import { Routes } from "@/config/routes"
import { useCreateShippingMutation } from "@/redux/services/shipping"
import { ShippingType } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { useCallback } from "react"
import { toast } from "react-toastify"

type Props = {}

const CreateShippingPage = (props: Props) => {
  const router = useRouter()

  const [createShipping, { isLoading: isLoadingShipping }] =
    useCreateShippingMutation()
  const initialShippingValues: ShippingType = {
    title: "",
    description: "",
    charge: "",
    duration: "",
  }

  const handleSubCreateCategory = useCallback(async (value: ShippingType) => {
    try {
      await createShipping(value).unwrap()
      router.push(Routes.shipping.list)
    } catch (error: any) {
      toast.error(error?.data.error)
    }
  }, [])
  return (
    <>
      <div className="flex border-b border-dashed border-gray-300 py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          Create Shipping Method
        </h1>
      </div>
      <ShippingForm
        type="create"
        initialValues={initialShippingValues}
        onHandleSubmit={handleSubCreateCategory}
        loading={isLoadingShipping}
      />
    </>
  )
}

export default CreateShippingPage
