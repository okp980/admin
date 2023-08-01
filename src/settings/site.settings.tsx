import { Routes } from "@/config/routes"
import { LuLayoutDashboard } from "react-icons/lu"

export const siteSettings = {
  sideLinks: [
    {
      href: Routes.dashboard,
      label: "Dashboard",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.products.list,
      label: "Products",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.attribute.list,
      label: "Attributes",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.category.list,
      label: "Categories",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.sub_category.list,
      label: "Sub Categories",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.tag.list,
      label: "Tags",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.order.list,
      label: "Orders",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.user.list,
      label: "Users",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.coupon.list,
      label: "Coupons",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.tax.list,
      label: "Taxes",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.shipping.list,
      label: "Shippings",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.withdraw.list,
      label: "Withdraws",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.message.list,
      label: "Messages",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.refund.list,
      label: "Refunds",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.question.list,
      label: "Questions",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.storeNotice.list,
      label: "Store Notice",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.reviews.list,
      label: "Reviews",
      icon: LuLayoutDashboard,
    },
    {
      href: Routes.settings,
      label: "Reviews",
      icon: LuLayoutDashboard,
    },
  ],
}
