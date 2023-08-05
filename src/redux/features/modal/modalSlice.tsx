import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../../store"
import { MODAL_VIEW } from "@/utils/enums"

const initialState: {
  isOpen: boolean
  view: MODAL_VIEW | null
  data: Partial<{ id: string }> | null
} = {
  isOpen: false,
  view: null,
  data: null,
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ view: MODAL_VIEW; modalPayload: Partial<{}> }>
    ) => {
      state.isOpen = true
      state.view = action.payload.view
    },
    closeModal: (state) => {
      state.isOpen = false
      state.view = null
      state.data = null
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export const selectModal = (state: RootState) => state.modal.isOpen
export const selectView = (state: RootState) => state.modal.view
export const selectModalData = (state: RootState) => state.modal.data

export default modalSlice.reducer
