"use client"
import CategoryForm from "@/components/categories/categories-form"
import ErrorMessage from "@/components/ui/error-message"
import Loader from "@/components/ui/loader/loader"
import { Routes } from "@/config/routes"
import {
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/services/categories"
import { CategoryType } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { useCallback } from "react"
import { toast } from "react-toastify"

type Props = {
  params: { id: string }
}

const UpdateCategoryPage = ({ params }: Props) => {
  const router = useRouter()
  const {
    data: category,
    isLoading: isLoadingCategory,
    isError: isCategoryError,
    error: categoryError,
  } = useGetSingleCategoryQuery(params.id)

  const [updateCategory, { isLoading: isLoadingUpdateCategory }] =
    useUpdateCategoryMutation()
  const initialCategoriesValues = {
    name: category?.data?.name as string,
  }

  const handleUpdateCategory = useCallback(
    async (value: CategoryType | FormData) => {
      console.log("value oooo", value)

      try {
        await updateCategory({ ...value, id: params.id }).unwrap()
        router.push(Routes.category.list)
      } catch (error: any) {
        toast.error(error?.data.error)
      }
    },
    []
  )
  if (isLoadingCategory) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (isCategoryError) {
    const errorMessage: any = isCategoryError ? categoryError : null

    return <ErrorMessage message={errorMessage?.data.error} />
  }
  return (
    <>
      <div className="flex border-b border-dashed border-gray-300 py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Edit Category</h1>
      </div>
      <CategoryForm
        type="update"
        initialValues={initialCategoriesValues}
        onHandleSubmit={handleUpdateCategory}
        loading={isLoadingUpdateCategory}
      />
    </>
  )
}

export default UpdateCategoryPage
