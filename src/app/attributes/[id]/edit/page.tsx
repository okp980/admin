"use client"
import AttributesForm from "@/components/attributes/attributes-form"
import ErrorMessage from "@/components/ui/error-message"
import Loader from "@/components/ui/loader/loader"
import { Routes } from "@/config/routes"
import {
  useGetSingleAttributeQuery,
  useUpdateAttributeMutation,
} from "@/redux/services/attribute"
import { Attribute } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { useCallback } from "react"
import { toast } from "react-toastify"

type Props = {
  params: { id: string }
}

const UpdateAttributesPage = ({ params }: Props) => {
  const router = useRouter()
  const [updateAttribute, { isLoading: isLoadingUpdateAttribute }] =
    useUpdateAttributeMutation()
  const {
    data: attribute,
    isLoading: isLoadingAttribute,
    isError: isErrorAttribute,
    error: errorAttribute,
  } = useGetSingleAttributeQuery(params.id)
  const initialAttributeValues: Attribute = {
    name: attribute?.data.name as string,
    values: attribute?.data?.values as any,
  }

  const handleUpdateAttribute = useCallback(async (value: Attribute) => {
    try {
      await updateAttribute({ ...value, id: params.id }).unwrap()
      router.push(Routes.attribute.list)
    } catch (error: any) {
      toast.error(error?.data.error)
    }
  }, [])
  if (isLoadingAttribute) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (isErrorAttribute) {
    const errorMessage: any = isErrorAttribute ? errorAttribute : null

    return <ErrorMessage message={errorMessage?.data.error} />
  }
  return (
    <>
      <div className="flex border-b border-dashed border-gray-300 py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Update Attribute</h1>
      </div>
      <AttributesForm
        type="create"
        initialValues={initialAttributeValues}
        onHandleSubmit={handleUpdateAttribute}
        loading={isLoadingUpdateAttribute}
      />
    </>
  )
}

export default UpdateAttributesPage
