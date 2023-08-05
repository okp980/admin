import useModal from "@/hooks/useModal"
import ConfirmationCard from "../common/confirmation-card"
import { useDeleteProductMutation } from "@/redux/services/products"
import { toast } from "react-toastify"

const ProductDeleteView = () => {
  const { modalData, handleCloseModal } = useModal()
  const [deleteProduct, { isLoading, isError }] = useDeleteProductMutation()

  const handleDelete = async () => {
    try {
      await deleteProduct(modalData?.id as string).unwrap()
      toast.success("Product deleted successfully")
      handleCloseModal()
    } catch (error) {
      toast.error("Error deleting product")
    }
  }

  return (
    <ConfirmationCard
      onCancel={handleCloseModal}
      onDelete={handleDelete}
      deleteBtnLoading={isLoading}
    />
  )
}

export default ProductDeleteView
