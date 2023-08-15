"use client"
import ProductForm, {
  productInitialValues,
} from "@/components/products/product-form"
import ErrorMessage from "@/components/ui/error-message"
import Loader from "@/components/ui/loader/loader"
import { useGetCategoriesQuery } from "@/redux/services/categories"
import {
  useCreateProductMutation,
  useGetSingleProductQuery,
} from "@/redux/services/products"
import {
  useGetSubCategoriesQuery,
  useLazyGetSubCategoriesQuery,
} from "@/redux/services/sub-categories"
import { useGetTagsQuery } from "@/redux/services/tags"
import React from "react"
import { toast } from "react-toastify"

type Props = {
  params: { action?: "create" | "update" }
}

const ProductFormPage = ({ params }: Props) => {
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

  const [createProduct, { isLoading: isLoadingCreateProduct }] =
    useCreateProductMutation()

  const handeleCreateProduct = async (values: typeof productInitialValues) => {
    console.log(values)
    const tags = values.tags.map((tag: any) => tag.id)

    try {
      const formData = new FormData()

      formData.append("name", values.name)
      formData.append("description", values.description)
      formData.append("price", values.price)
      formData.append("image", values.image as any)
      formData.append("gallery", JSON.stringify(values.gallery))
      formData.append("category", values.category)
      formData.append("sub_category", values.sub_category)
      formData.append("quantity", values.quantity)
      formData.append("tags", JSON.stringify(tags))
      formData.append("product_type", values.product_type)
      formData.append("variants", JSON.stringify(values.variation))
      formData.append("brand", values.brand)
      formData.append("weight", values.weight)

      await createProduct(formData).unwrap()
      toast.success("Product created successfully")
    } catch (error) {
      toast.error("Error Ocurred")
    }
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
        sub_categories={sub_categories?.data as any[]}
        isSubCategoriesLoading={isLoadingSubCategories}
        categories={categories?.data as any[]}
        isCategoriesLoading={isLoadingCategories}
        tags={tags?.data as any[]}
        isLoadingTags={isLoadingTags}
        onHandleSubmit={handeleCreateProduct}
        loading={isLoadingCreateProduct}
      />
    </>
  )
}

export default ProductFormPage
