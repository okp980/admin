import useModal from "@/hooks/useModal"
import DeleteView from "../ui/modal/delete-view"
import { useDeleteShippingMutation } from "@/redux/services/shipping"

const ShippingDeleteView = () => {
  const { modalData } = useModal()
  const [deleteShipping, deleteShippingHelpers] = useDeleteShippingMutation()

  return (
    <DeleteView
      id={modalData?.id as string}
      onDelete={deleteShipping}
      deleteHelpers={deleteShippingHelpers}
    />
  )
}

export default ShippingDeleteView
