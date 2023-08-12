import useModal from "@/hooks/useModal"
import DeleteView from "../ui/modal/delete-view"
import { useDeleteAttributeMutation } from "@/redux/services/attribute"

const AttributeDeleteView = () => {
  const { modalData } = useModal()
  const [deleteAttribute, deleteAttributeHelpers] = useDeleteAttributeMutation()

  return (
    <DeleteView
      id={modalData?.id as string}
      onDelete={deleteAttribute}
      deleteHelpers={deleteAttributeHelpers}
    />
  )
}

export default AttributeDeleteView
