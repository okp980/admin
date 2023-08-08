import LoginForm from "@/components/auth/login-form"
import AuthPageLayout from "@/components/layouts/auth-layout"
import Image from "next/image"

export default function Home() {
  return (
    <AuthPageLayout>
      <h3 className="mb-6 mt-4 text-center text-base italic text-body">
        Admin Login
      </h3>
      <LoginForm />
    </AuthPageLayout>
  )
}
