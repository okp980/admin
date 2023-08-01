import React from "react"

type Props = {}

const Navbar = (props: Props) => {
  return (
    <header className="h-[64px] shadow px-10 flex items-center bg-white z-20">
      <div className="font-extrabold text-3xl">Zuraaya</div>
    </header>
  )
}

export default Navbar
