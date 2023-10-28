import { Routes } from "@/config/routes"
import { LuLayoutDashboard } from "react-icons/lu"
import { IoMdToday, IoIosList } from "react-icons/io"
import { BiCategory, BiCategoryAlt } from "react-icons/bi"
import { AiFillTags } from "react-icons/ai"
import { BsBasket3 } from "react-icons/bs"
import { FaUsersCog, FaShippingFast } from "react-icons/fa"
import { RiExchangeDollarLine } from "react-icons/ri"

export const siteSettings = {
  authorizedLinks: [
    // {
    //   href: Routes.profileUpdate,
    //   label: "Profile",
    // },
    // {
    //   href: Routes.logout,
    //   label: "Logout",
    // },
  ],
  sideLinks: [
    {
      href: Routes.dashboard,
      label: "Dashboard",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.products.list,
      label: "Products",
      icon: IoMdToday,
    },
    {
      href: Routes.attribute.list,
      label: "Attributes",
      icon: IoIosList,
    },
    {
      href: Routes.category.list,
      label: "Categories",
      icon: BiCategory,
    },
    {
      href: Routes.sub_category.list,
      label: "Sub Categories",
      icon: BiCategoryAlt,
    },
    {
      href: Routes.tag.list,
      label: "Tags",
      icon: AiFillTags,
    },
    {
      href: Routes.order.list,
      label: "Orders",
      icon: BsBasket3,
    },
    {
      href: Routes.user.list,
      label: "Users",
      icon: FaUsersCog,
    },

    {
      href: Routes.shipping.list,
      label: "Shippings",
      icon: FaShippingFast,
    },
    {
      // href: Routes.coupon.list,
      href: Routes.exchangeRate,
      label: "Exchange Rate",
      icon: RiExchangeDollarLine,
    },
    {
      href: Routes.dashboard,
      label: "Taxes",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.dashboard,
      label: "Withdraws",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.dashboard,
      label: "Messages",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.dashboard,
      label: "Refunds",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.dashboard,
      label: "Questions",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.dashboard,
      label: "Store Notice",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.dashboard,
      label: "Reviews",
      icon: LuLayoutDashboard,
    },
  ],
  product: {
    placeholder: "/product-placeholder.svg",
  },
  avatar: {
    placeholder: "/avatar-placeholder.svg",
  },
}
