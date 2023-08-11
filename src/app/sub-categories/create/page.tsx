"use client"
import SubCategoryForm from "@/components/sub_categories/subcategories-form"
import { Routes } from "@/config/routes"
import { useGetCategoriesQuery } from "@/redux/services/categories"
import { useCreateSubCategoryMutation } from "@/redux/services/sub-categories"
import { SubCategoryType } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { useCallback } from "react"
import { toast } from "react-toastify"

type Props = {}

const CreateSubCategoryPage = (props: Props) => {
  const router = useRouter()
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError,
  } = useGetCategoriesQuery()
  const [createSubCategory, { isLoading: isLoadingSubCreateCategory }] =
    useCreateSubCategoryMutation()
  const initialSubCategoryValues: SubCategoryType = {
    name: "",
    category: "",
    image: "",
  }

  const handleSubCreateCategory = useCallback(
    async (value: SubCategoryType) => {
      try {
        const formData = new FormData()
        formData.append("name", value.name)
        formData.append("category", value.category)
        formData.append("image", value?.image as Blob)
        await createSubCategory(formData).unwrap()
        router.push(Routes.sub_category.list)
      } catch (error: any) {
        toast.error(error?.data.error)
      }
    },
    []
  )
  return (
    <>
      <div className="flex border-b border-dashed border-gray-300 py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          Create Sub-Category
        </h1>
      </div>
      <SubCategoryForm
        type="create"
        initialValues={initialSubCategoryValues}
        onHandleSubmit={handleSubCreateCategory}
        loading={isLoadingSubCreateCategory}
        categories={categories?.data as any[]}
        isCategoriesLoading={isLoadingCategories}
      />
    </>
  )
}

export default CreateSubCategoryPage
