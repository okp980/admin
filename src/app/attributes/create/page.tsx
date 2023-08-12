"use client"
import AttributesForm from "@/components/attributes/attributes-form"
import { Routes } from "@/config/routes"
import { useCreateAttributeMutation } from "@/redux/services/attribute"
import { Attribute } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { useCallback } from "react"
import { toast } from "react-toastify"

type Props = {}

const CreateAttributesPage = (props: Props) => {
  const router = useRouter()
  const [createAttribute, { isLoading: isLoadingCreateAttribute }] =
    useCreateAttributeMutation()
  const initialAttributeValues: Attribute = {
    name: "",
    values: [],
  }

  const handleCreateAttribute = useCallback(async (value: Attribute) => {
    try {
      await createAttribute(value).unwrap()
      router.push(Routes.attribute.list)
    } catch (error: any) {
      toast.error(error?.data.error)
    }
  }, [])
  return (
    <>
      <div className="flex border-b border-dashed border-gray-300 py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Create Attribute</h1>
      </div>
      <AttributesForm
        type="create"
        initialValues={initialAttributeValues}
        onHandleSubmit={handleCreateAttribute}
        loading={isLoadingCreateAttribute}
      />
    </>
  )
}

export default CreateAttributesPage
