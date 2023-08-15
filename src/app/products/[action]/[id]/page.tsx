"use client"
import ProductForm from "@/components/products/product-form"
import ErrorMessage from "@/components/ui/error-message"
import Loader from "@/components/ui/loader/loader"
import { useGetCategoriesQuery } from "@/redux/services/categories"
import { useGetSingleProductQuery } from "@/redux/services/products"
import {
  useGetSubCategoriesQuery,
  useLazyGetSubCategoriesQuery,
} from "@/redux/services/sub-categories"
import { useGetTagsQuery } from "@/redux/services/tags"
import React from "react"

type Props = {
  params: { id?: string; action?: "create" | "update" }
}

const ProductFormPage = ({ params }: Props) => {
  console.log(params)

  const {
    data: product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    error: errorProduct,
  } = useGetSingleProductQuery(params.id as string, {
    skip: params?.id && params?.action === "update" ? false : true,
  })
  const [
    getSubCategories,
    {
      data: sub_categories,
      isLoading: isLoadingSubCategories,
      isError: isErrorSubCategories,
      error: errorSubCategories,
    },
  ] = useLazyGetSubCategoriesQuery()
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
  } = useGetCategoriesQuery()
  const {
    data: tags,
    isLoading: isLoadingTags,
    isError: isErrorTag,
    error: errorTag,
  } = useGetTagsQuery()

  if (isLoadingProduct) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (isErrorProduct) {
    const errorMessage: any = isErrorProduct ? errorProduct : null

    return <ErrorMessage message={errorMessage?.data.error} />
  }

  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          {params.action === "update" ? "Edit" : "Create"} Product
        </h1>
      </div>
      <ProductForm
        formAction={params.action}
        // @ts-ignore
        handleGetSubCategories={getSubCategories}
        product={product?.data}
        sub_categories={sub_categories?.data as any[]}
        isSubCategoriesLoading={isLoadingSubCategories}
        categories={categories?.data as any[]}
        isCategoriesLoading={isLoadingCategories}
        tags={tags?.data as any[]}
        isLoadingTags={isLoadingTags}
      />
    </>
  )
}

export default ProductFormPage
