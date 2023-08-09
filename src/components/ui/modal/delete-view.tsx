import ConfirmationCard from "@/components/common/confirmation-card"
import useModal from "@/hooks/useModal"
import { toast } from "react-toastify"

type Props = {
  id: string
  onDelete: any
  deleteHelpers: any
  successMessage?: string
  errorMessage?: string
}

const DeleteView = ({
  id,
  onDelete,
  deleteHelpers,
  successMessage = "Tag deleted successfully",
  errorMessage = "Error deleting product",
}: Props) => {
  const { handleCloseModal } = useModal()

  const handleDelete = async () => {
    try {
      await onDelete({ id }).unwrap()
      toast.success(successMessage)
      handleCloseModal()
    } catch (error) {
      toast.error(errorMessage)
    }
  }

  return (
    <ConfirmationCard
      onCancel={handleCloseModal}
      onDelete={handleDelete}
      deleteBtnLoading={deleteHelpers.isLoading}
    />
  )
}

export default DeleteView
