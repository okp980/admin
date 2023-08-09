"use client"
import TagForm from "@/components/tags/tag-form"
import { Routes } from "@/config/routes"
import { useGetCategoriesQuery } from "@/redux/services/categories"
import { useCreateTagMutation } from "@/redux/services/tags"
import { TagType } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { useCallback } from "react"
import { toast } from "react-toastify"

type Props = {}

const CreateTagPage = (props: Props) => {
  const router = useRouter()
  const {
    data: categories,
    isLoading: isLoadingCatories,
    isError,
  } = useGetCategoriesQuery()
  const [createTags, { isLoading: isLoadingCreateTag }] = useCreateTagMutation()
  const initialTagValues = {
    name: "",
    category: "",
  }

  const handleCreateTag = useCallback(async (value: TagType) => {
    try {
      await createTags(value).unwrap()
      router.push(Routes.tag.list)
    } catch (error: any) {
      toast.error(error?.data.error)
    }
  }, [])
  return (
    <>
      <div className="flex border-b border-dashed border-gray-300 py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Create Tag</h1>
      </div>
      <TagForm
        type="create"
        initialValues={initialTagValues}
        isCategoriesLoading={isLoadingCatories}
        categories={categories?.data as any[]}
        onHandleSubmit={handleCreateTag}
        loading={isLoadingCreateTag}
      />
    </>
  )
}

export default CreateTagPage
