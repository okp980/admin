"use client"
import SubCategoryForm from "@/components/sub_categories/subcategories-form"
import ErrorMessage from "@/components/ui/error-message"
import Loader from "@/components/ui/loader/loader"
import { Routes } from "@/config/routes"
import { useGetCategoriesQuery } from "@/redux/services/categories"
import {
  useGetSingleSubCategoryQuery,
  useUpdateSubCategoryMutation,
} from "@/redux/services/sub-categories"
import { SubCategoryType } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { useCallback } from "react"
import { toast } from "react-toastify"

type Props = {
  params: { id: string }
}

const UpdateSubCategoryPage = ({ params }: Props) => {
  const router = useRouter()
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError,
  } = useGetCategoriesQuery()
  const {
    data: sub_category,
    isLoading: isLoadingSubCategory,
    isError: isErrorSubCategory,
    error: errorSubCategory,
  } = useGetSingleSubCategoryQuery(params.id)
  const [updateSubCategory, { isLoading: isLoadingSubUpdateCategory }] =
    useUpdateSubCategoryMutation()
  const initialSubCategoryValues: SubCategoryType = {
    name: sub_category?.data?.name as string,
    category: sub_category?.data?.category as string,
    image: sub_category?.data?.image,
  }

  const handleSubUpdateCategory = useCallback(
    async (value: SubCategoryType) => {
      try {
        await updateSubCategory({ ...value, id: params.id }).unwrap()
        router.push(Routes.sub_category.list)
      } catch (error: any) {
        toast.error(error?.data.error)
      }
    },
    []
  )
  if (isLoadingSubCategory) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (isErrorSubCategory) {
    const errorMessage: any = isErrorSubCategory ? errorSubCategory : null

    return <ErrorMessage message={errorMessage?.data.error} />
  }
  return (
    <>
      <div className="flex border-b border-dashed border-gray-300 py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          Update Sub-Category
        </h1>
      </div>
      <SubCategoryForm
        type="update"
        initialValues={initialSubCategoryValues}
        onHandleSubmit={handleSubUpdateCategory}
        loading={isLoadingSubUpdateCategory}
        categories={categories?.data as any[]}
        isCategoriesLoading={isLoadingCategories}
      />
    </>
  )
}

export default UpdateSubCategoryPage
