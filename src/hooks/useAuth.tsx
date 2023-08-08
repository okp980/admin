import {
  clearToken,
  selectUser,
  setToken,
} from "@/redux/features/auth/authSlice"
import React from "react"
import { useDispatch, useSelector } from "react-redux"

type Props = {}

const useAuth = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  function handleSetToken(token: string) {
    dispatch(setToken(token))
  }
  function handleClearToken() {
    dispatch(clearToken())
  }
  return {
    user,
    handleSetToken,
    handleClearToken,
  }
}

export default useAuth
