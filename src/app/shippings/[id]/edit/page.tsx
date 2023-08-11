"use client"
import ShippingForm from "@/components/shipping/shipping-form"
import ErrorMessage from "@/components/ui/error-message"
import Loader from "@/components/ui/loader/loader"
import { Routes } from "@/config/routes"
import {
  useGetSingleShippingQuery,
  useUpdateShippingMutation,
} from "@/redux/services/shipping"

import { ShippingType } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { useCallback } from "react"
import { toast } from "react-toastify"

type Props = {
  params: { id: string }
}

const UpdateShippingPage = ({ params }: Props) => {
  const router = useRouter()
  const {
    data: shipping,
    isLoading: isLoadingShipping,
    isError,
    error,
  } = useGetSingleShippingQuery(params.id)

  const [updateShipping, { isLoading: isLoadingUpdateShipping }] =
    useUpdateShippingMutation()
  const initialShippingValues: ShippingType = {
    title: shipping?.data?.title as string,
    description: shipping?.data?.description as string,
    charge: shipping?.data?.charge as string,
    duration: shipping?.data?.duration as string,
  }

  const handleUpdatedShipping = useCallback(async (value: ShippingType) => {
    try {
      await updateShipping({ ...value, id: params.id }).unwrap()
      router.push(Routes.shipping.list)
    } catch (error: any) {
      toast.error(error?.data.error)
    }
  }, [])
  if (isLoadingShipping) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (isError) {
    const errorMessage: any = isError ? error : null

    return <ErrorMessage message={errorMessage?.data.error} />
  }
  return (
    <>
      <div className="flex border-b border-dashed border-gray-300 py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          Update Shipping Method
        </h1>
      </div>
      <ShippingForm
        type="update"
        initialValues={initialShippingValues}
        onHandleSubmit={handleUpdatedShipping}
        loading={isLoadingUpdateShipping}
      />
    </>
  )
}

export default UpdateShippingPage
