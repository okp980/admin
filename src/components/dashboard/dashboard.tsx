import { useGetAnalyticsQuery } from "@/redux/services/analytics"
import React from "react"
import Loader from "../ui/loader/loader"
import DashboardCard from "../ui/cards/dashboard-card"
import BarChart from "../ui/chart/bar-chart"
import { useGetOrdersQuery } from "@/redux/services/orders"
import RecentOrders from "../order/recent-orders"

type Props = {}

const Dashboard = (props: Props) => {
  const {
    data: analytics,
    isLoading,
    isSuccess,
    isError,
  } = useGetAnalyticsQuery()
  const { data: orders, isLoading: isLoadingOrders } = useGetOrdersQuery()

  if (isLoading || isLoadingOrders) return <Loader />

  let salesByYear: number[] = Array.from({ length: 12 }, (_) => 0)
  if (!!analytics?.data?.totalYearSaleByMonth?.length) {
    salesByYear = analytics?.data.totalYearSaleByMonth.map((item: any) =>
      item.total.toFixed(2)
    )
  }
  return (
    <>
      <div className="mb-6 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="w-full">
          <DashboardCard
            title="Total Revenue"
            subtitle="Last 30 days"
            result={analytics?.data.todaysRevenue}
          />
        </div>
        <div className="w-full">
          <DashboardCard
            title="Total Order"
            subtitle="Last 30 days"
            result={analytics?.data.totalOrders}
          />
        </div>
        <div className="w-full">
          <DashboardCard
            title="Today's Revenue"
            result={analytics?.data.todaysRevenue}
          />
        </div>
        <div className="w-full">
          <DashboardCard
            title="Total Shops"
            result={analytics?.data.totalShops}
          />
        </div>
      </div>

      <div className="mb-6 flex w-full flex-wrap md:flex-nowrap ">
        <BarChart
          title="Sale History"
          colors={["#03D3B5"]}
          series={salesByYear}
          categories={[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]}
        />
      </div>

      <RecentOrders title="Recent Orders" orders={orders?.data!} />
    </>
  )
}

export default Dashboard
