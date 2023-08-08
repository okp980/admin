import { useRouter } from "next/router"
import React from "react"
import Logo from "../ui/Logo/logo"

export default function AuthPageLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className="flex h-screen items-center justify-center bg-light sm:bg-gray-100">
      <div className="m-auto w-full max-w-[420px] rounded bg-light p-5 sm:p-8 sm:shadow">
        <div className="mb-2 flex justify-center">
          <Logo />
        </div>
        {children}
      </div>
    </div>
  )
}
