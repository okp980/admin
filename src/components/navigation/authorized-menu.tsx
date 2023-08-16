import cn from "classnames"
import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { siteSettings } from "@/settings/site.settings"
import { HiUserCircle } from "react-icons/hi"
import Link from "next/link"
import useAuth from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

export default function AuthorizedMenu() {
  const { handleClearToken } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    handleClearToken()
    router.replace("/")
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center focus:outline-none">
        <HiUserCircle size={40} className="text-gray-300" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className="end-0 origin-top-end absolute mt-1 w-48 rounded bg-white shadow-md focus:outline-none"
        >
          <Menu.Item key={"customer@demo.com"}>
            <li
              className="flex w-full flex-col space-y-1 rounded-t
             bg-[#ce2044] px-4 py-3 text-sm text-white"
            >
              <span className="font-semibold capitalize">Customer</span>
              <span className="text-xs">customer@demo.com</span>
            </li>
          </Menu.Item>

          {siteSettings.authorizedLinks.map(({ href, label }) => (
            <Menu.Item key={`${href}${label}`}>
              {({ active }) => (
                <li className="cursor-pointer border-b border-gray-100 last:border-0">
                  <Link
                    href={href}
                    className={cn(
                      "block px-4 py-3 text-sm font-semibold capitalize transition duration-200 hover:text-accent",
                      active ? "text-accent" : "text-heading"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              )}
            </Menu.Item>
          ))}
          <Menu.Item key={"customer@demo.com"}>
            <li
              className="cursor-pointer border-b border-gray-100 last:border-0"
              onClick={handleLogout}
            >
              <span className="block px-4 py-3 text-sm font-semibold capitalize transition duration-200 hover:text-accent">
                Logout
              </span>
            </li>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
