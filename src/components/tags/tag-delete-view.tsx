import useModal from "@/hooks/useModal"
import { useDeleteTagMutation } from "@/redux/services/tags"
import DeleteView from "../ui/modal/delete-view"

const TagDeleteView = () => {
  const { modalData } = useModal()
  const [deleteTag, deleteTagHelpers] = useDeleteTagMutation()

  return (
    <DeleteView
      id={modalData?.id as string}
      onDelete={deleteTag}
      deleteHelpers={deleteTagHelpers}
    />
  )
}

export default TagDeleteView
