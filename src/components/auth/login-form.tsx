"use client"

import * as yup from "yup"
import Button from "../ui/button/button"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Routes } from "@/config/routes"
import TextField from "../form/textField"
import PasswordField from "../form/passwordField"
import { Form, Formik, FormikValues } from "formik"
import { useLoginMutation } from "@/redux/services/auth"
import { AuthBody, ErrorResponse } from "@/utils/types"
import { toast } from "react-toastify"
import useAuth from "@/hooks/useAuth"
import { useRouter, redirect } from "next/navigation"

const loginFormSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
})

const initialValues = { email: "test@mail.com", password: "123456" }

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const { handleSetToken, user } = useAuth()

  const router = useRouter()
  const [login] = useLoginMutation()

  useEffect(() => {
    if (user) {
      redirect(Routes.dashboard)
    }
  }, [])

  async function onSubmit(values: AuthBody) {
    try {
      setLoading(true)
      const response = await login(values).unwrap()
      handleSetToken(response.token as string)
      setLoading(false)
      router.push(Routes.dashboard)
    } catch (error: any) {
      setLoading(false)
      toast.error(error.error.message)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={loginFormSchema}
    >
      <Form>
        <TextField
          label="Email"
          name="email"
          type="email"
          variant="outline"
          className="mb-4"
        />
        <PasswordField
          name="password"
          label="Password"
          forgotPassHelpText="Forgot Password?"
          variant="outline"
          className="mb-4"
          forgotPageLink={Routes.forgotPassword}
        />
        <Button className="w-full" loading={loading} disabled={loading}>
          Login
        </Button>

        <div className="relative mt-8 mb-6 flex flex-col items-center justify-center text-sm text-heading sm:mt-11 sm:mb-8">
          <hr className="w-full" />
          <span className="absolute -top-2.5 bg-light px-2 -ms-4 start-2/4">
            or
          </span>
        </div>

        <div className="text-center text-sm text-body sm:text-base">
          Don't have any account?{" "}
          <Link
            href={Routes.register}
            className="font-semibold text-accent underline transition-colors duration-200 ms-1 hover:text-accent-hover hover:no-underline focus:text-accent-700 focus:no-underline focus:outline-none"
          >
            Register
          </Link>
        </div>
      </Form>
    </Formik>
  )
}

export default LoginForm
