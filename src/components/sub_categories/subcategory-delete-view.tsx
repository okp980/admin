import useModal from "@/hooks/useModal"
import DeleteView from "../ui/modal/delete-view"
import { useDeleteSubCategoryMutation } from "@/redux/services/sub-categories"

const SubCategoryDeleteView = () => {
  const { modalData } = useModal()
  const [deleteSubCategory, deleteSubCategoryHelpers] =
    useDeleteSubCategoryMutation()

  return (
    <DeleteView
      id={modalData?.id as string}
      onDelete={deleteSubCategory}
      deleteHelpers={deleteSubCategoryHelpers}
    />
  )
}

export default SubCategoryDeleteView
