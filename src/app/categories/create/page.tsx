"use client"
import CategoryForm from "@/components/categories/categories-form"
import { Routes } from "@/config/routes"
import { useCreateCategoryMutation } from "@/redux/services/categories"
import { CategoryType } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { useCallback } from "react"
import { toast } from "react-toastify"

type Props = {}

const CreateCategoryPage = (props: Props) => {
  const router = useRouter()
  const [createCategory, { isLoading: isLoadingCreateCategory }] =
    useCreateCategoryMutation()
  const initialCategoryValues: CategoryType = {
    name: "",
    image: "",
  }

  const handleCreateCategory = useCallback(async (value: CategoryType) => {
    try {
      const formData = new FormData()
      formData.append("name", value.name)
      formData.append("image", value?.image as Blob)
      await createCategory(formData).unwrap()
      router.push(Routes.category.list)
    } catch (error: any) {
      toast.error(error?.data.error)
    }
  }, [])
  return (
    <>
      <div className="flex border-b border-dashed border-gray-300 py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Create Category</h1>
      </div>
      <CategoryForm
        type="create"
        initialValues={initialCategoryValues}
        onHandleSubmit={handleCreateCategory}
        loading={isLoadingCreateCategory}
      />
    </>
  )
}

export default CreateCategoryPage
