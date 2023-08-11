import useModal from "@/hooks/useModal"
import { useDeleteTagMutation } from "@/redux/services/tags"
import DeleteView from "../ui/modal/delete-view"
import { useDeleteCategoryMutation } from "@/redux/services/categories"

const CategoryDeleteView = () => {
  const { modalData } = useModal()
  const [deleteCategory, deleteCategoryHelpers] = useDeleteCategoryMutation()

  return (
    <DeleteView
      id={modalData?.id as string}
      onDelete={deleteCategory}
      deleteHelpers={deleteCategoryHelpers}
    />
  )
}

export default CategoryDeleteView
