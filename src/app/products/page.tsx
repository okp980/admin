"use client"
import Card from "@/components/common/card"
import Search from "@/components/common/search"
import ProductList from "@/components/products/product-list"
import React, { useState } from "react"
import { BsArrowUp, BsArrowDown } from "react-icons/bs"
import cn from "classnames"
import CategoryTypeFilter from "@/components/products/category-type-filter"
import { useGetProductsQuery } from "@/redux/services/products"
import Loader from "@/components/ui/loader/loader"
import ErrorMessage from "@/components/ui/error-message"

type Props = {}

const ProductsPage = (props: Props) => {
  const [visible, setVisible] = useState(false)
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState("")
  const [subCategory, setSubCategory] = useState("")
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery({
    page,
    category: category.length > 0 ? category : undefined,
    sub_category: subCategory.length > 0 ? subCategory : undefined,
  })

  const toggleVisible = () => {
    setVisible((v) => !v)
  }

  if (isLoading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader />
      </div>
    )

  if (isError) {
    const errorMessage: any = isError ? error : null

    return <ErrorMessage message={errorMessage?.data.error} />
  }
  return (
    <>
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <div className="mb-4 md:mb-0 md:w-1/4">
            <h1 className="text-lg font-semibold text-heading">Products</h1>
          </div>
          <div className="flex w-full flex-col items-center ms-auto md:w-3/4">
            <Search onSearch={() => {}} />
          </div>
          <button
            className="mt-5 flex items-center whitespace-nowrap text-base font-semibold text-accent md:mt-0 md:ms-5"
            onClick={toggleVisible}
          >
            Filter
            {visible ? (
              <BsArrowUp className="ms-2" />
            ) : (
              <BsArrowDown className="ms-2" />
            )}
          </button>
        </div>
        <div
          className={cn("flex w-full transition", {
            "visible h-auto": visible,
            "invisible h-0": !visible,
          })}
        >
          <div className="mt-5 flex w-full flex-col border-t border-gray-200 pt-5 md:mt-8 md:flex-row md:items-center md:pt-8">
            <CategoryTypeFilter
              className="w-full"
              onCategoryFilter={(value) => {
                console.log(value.id)
                setCategory(value.id)
              }}
              onSubCategoryFilter={(value) => {
                console.log(value.id)

                setSubCategory(value.id)
              }}
            />
          </div>
        </div>
      </Card>
      <ProductList
        products={products?.data}
        paginatorInfo={products?.pagination!}
        onPagination={(selectedPage) => {
          setPage(selectedPage)
        }}
      />
    </>
  )
}

export default ProductsPage
