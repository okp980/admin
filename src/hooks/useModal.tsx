import {
  closeModal,
  openModal,
  selectModal,
  selectModalData,
  selectView,
} from "@/redux/features/modal/modalSlice"
import { MODAL_VIEW } from "@/utils/enums"
import { useDispatch, useSelector } from "react-redux"

const useModal = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(selectModal)
  const view = useSelector(selectView)
  const modalData = useSelector(selectModalData)
  const handleOpenModal = ({
    view,
    modalPayload,
  }: {
    view: MODAL_VIEW
    modalPayload: any
  }) => {
    dispatch(openModal({ view, modalPayload }))
  }
  const handleCloseModal = () => {
    dispatch(closeModal())
  }
  return { isOpen, view, modalData, handleOpenModal, handleCloseModal }
}

export default useModal
