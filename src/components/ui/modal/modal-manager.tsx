import dynamic from "next/dynamic"
import React from "react"
import Modal from "./modal"
import useModal from "@/hooks/useModal"
import { MODAL_VIEW } from "@/utils/enums"
import ProductDeleteView from "@/components/products/product-delete-view"
import TagDeleteView from "@/components/tags/tag-delete-view"
import CategoryDeleteView from "@/components/categories/category-delete-view"
// const ProductDeleteView = dynamic(
//   () => import("@/components/ui/modal/modal-manager")
// )

type Props = {}

const renderModal = (view: MODAL_VIEW | null) => {
  switch (view) {
    case MODAL_VIEW.DELETE_PRODUCT:
      return <ProductDeleteView />
    case MODAL_VIEW.DELETE_TAG:
      return <TagDeleteView />
    case MODAL_VIEW.DELETE_CATEGORY:
      return <CategoryDeleteView />
    default:
      return null
  }
}

const ModalManager = (props: Props) => {
  const { isOpen, view, handleCloseModal } = useModal()
  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      {renderModal(view)}
    </Modal>
  )
}

export default ModalManager
