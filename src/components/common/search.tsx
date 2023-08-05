import React from "react"
import { BsSearch } from "react-icons/bs"
import cn from "classnames"

const classes = {
  root: "ps-10 pe-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0",
  normal:
    "bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent",
  solid:
    "bg-gray-100 border border-border-100 focus:bg-light focus:border-accent",
  outline: "border border-border-base focus:border-accent",
  shadow: "focus:shadow",
}

type SearchProps = {
  className?: string
  shadow?: boolean
  variant?: "normal" | "solid" | "outline"
  inputClassName?: string
  onSearch: (data: SearchValue) => void
}

type SearchValue = {
  searchText: string
}

const Search = ({
  className,
  onSearch,
  variant = "outline",
  shadow = false,
  inputClassName,
  ...rest
}: SearchProps) => {
  const rootClassName = cn(
    classes.root,
    {
      [classes.normal]: variant === "normal",
      [classes.solid]: variant === "solid",
      [classes.outline]: variant === "outline",
    },
    {
      [classes.shadow]: shadow,
    },
    inputClassName
  )
  return (
    <form className={cn("relative flex w-full items-center ", className)}>
      {/* <label htmlFor="search">Products</label> */}
      <button className="start-1 absolute p-2 text-body outline-none focus:outline-none active:outline-none">
        <BsSearch className={cn("h-5 w-5")} />
      </button>
      <input
        type="text"
        id="search"
        className={rootClassName}
        placeholder="Type your query and press enter"
        aria-label="Search"
        autoComplete="off"
        {...rest}
      />
    </form>
  )
}

export default Search
