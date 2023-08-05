import Select from "@/components/ui/select/select"
import React from "react"
import cn from "classnames"
import { ActionMeta } from "react-select"
import { useGetCategoriesQuery } from "@/redux/services/categories"
import { useGetSubCategoriesQuery } from "@/redux/services/sub-categories"

type Props = {
  onCategoryFilter: (newValue: any, actionMeta: ActionMeta<unknown>) => void
  onSubCategoryFilter: (newValue: any, actionMeta: ActionMeta<unknown>) => void
  className?: string
}

export default function CategoryTypeFilter({
  onSubCategoryFilter,
  onCategoryFilter,
  className,
}: Props) {
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategoriesQuery()
  const { data: sub_categories, isLoading: isLoadingSubcategories } =
    useGetSubCategoriesQuery()

  return (
    <div
      className={cn(
        "flex w-full flex-col space-y-5 rtl:space-x-reverse md:flex-row md:items-end md:space-x-5 md:space-y-0",
        className
      )}
    >
      <div className="w-full">
        <label className="block text-body-dark font-semibold text-sm leading-none mb-3">
          Filter by Category
        </label>
        <Select
          options={categories?.data}
          isLoading={isLoadingCategories}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
          placeholder="Filter by Category"
          onChange={onCategoryFilter}
        />
      </div>
      <div className="w-full">
        <label className="block text-body-dark font-semibold text-sm leading-none mb-3">
          Filter by Sub-Category
        </label>
        <Select
          options={sub_categories?.data}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
          placeholder="Filter by Sub-Categories"
          isLoading={isLoadingSubcategories}
          onChange={onSubCategoryFilter}
        />
      </div>
    </div>
  )
}
