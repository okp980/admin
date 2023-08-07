import React from "react"
import Logo from "../ui/Logo/logo"
import { motion } from "framer-motion"
import { RiMenu2Line } from "react-icons/ri"

type Props = {
  toggleSidebar: () => void
}

const Navbar = ({ toggleSidebar }: Props) => {
  return (
    <header className="h-[64px] fixed z-40 w-full bg-white shadow">
      <nav className="flex items-center justify-between px-5 py-4 md:px-8">
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={toggleSidebar}
          className="flex h-full items-center justify-center p-2 focus:text-accent focus:outline-none lg:hidden"
        >
          <RiMenu2Line size={20} />
        </motion.button>
        <div className="ms-5 me-auto hidden md:flex">
          <Logo />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
