"use client"
import TagForm from "@/components/tags/tag-form"
import ErrorMessage from "@/components/ui/error-message"
import Loader from "@/components/ui/loader/loader"
import { Routes } from "@/config/routes"
import { useGetCategoriesQuery } from "@/redux/services/categories"
import {
  useCreateTagMutation,
  useEditTagMutation,
  useGetSingleTagQuery,
} from "@/redux/services/tags"
import { TagType } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { useCallback } from "react"
import { toast } from "react-toastify"

type Props = {
  params: { id: string }
}

const UpdateTagPage = ({ params }: Props) => {
  const router = useRouter()
  const {
    data: categories,
    isLoading: isLoadingCatories,
    isError,
  } = useGetCategoriesQuery()
  const {
    data: tag,
    isLoading: isLoadingTag,
    isError: isTagError,
    error: tagError,
  } = useGetSingleTagQuery(params.id)
  const [edit, { isLoading: isLoadingEdit }] = useEditTagMutation()
  const initialTagValues = {
    name: tag?.data?.name,
    category: tag?.data?.category,
  }

  const handleUpdateTag = useCallback(async (value: TagType) => {
    try {
      await edit({ ...value, id: params.id }).unwrap()
      router.push(Routes.tag.list)
    } catch (error: any) {
      toast.error(error?.data.error)
    }
  }, [])
  if (isLoadingTag || isLoadingCatories) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (isTagError) {
    const errorMessage: any = isTagError ? tagError : null

    return <ErrorMessage message={errorMessage?.data.error} />
  }
  return (
    <>
      <div className="flex border-b border-dashed border-gray-300 py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Edit Tag</h1>
      </div>
      <TagForm
        type="update"
        // @ts-ignore
        initialValues={initialTagValues}
        isCategoriesLoading={isLoadingCatories}
        categories={categories?.data as any[]}
        onHandleSubmit={handleUpdateTag}
        loading={isLoadingEdit}
      />
    </>
  )
}

export default UpdateTagPage
