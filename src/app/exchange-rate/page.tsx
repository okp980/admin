"use client"
// import Dashboard from "@/components/dashboard/dashboard"
import React, { useCallback } from "react"
import dynamic from "next/dynamic"
import Card from "@/components/common/card"
import ExchangeRateForm from "@/components/exchange-rate/exchange-rate-form"
import {
  useEditRateMutation,
  useGetSingleRateQuery,
} from "@/redux/services/exchange-rate"
import { ExchangeRateType } from "@/utils/types"
import { toast } from "react-toastify"
const ExchangeRate = dynamic(
  () => import("@/components/exchange-rate/exchange-rate"),
  {
    ssr: false,
  }
)

type Props = {}
const rate = "651aa79e8bd1761223209560"

const ExchangeRatePage = (props: Props) => {
  const [editRate, { isLoading: isLoadingEditRate }] = useEditRateMutation()
  const { data: rate_data, isLoading: isLoadingGetRate } =
    useGetSingleRateQuery(rate)
  const initialValues: ExchangeRateType = {
    rate: "",
  }

  console.log(rate_data)

  const handleEditRate = useCallback(async (value: ExchangeRateType) => {
    try {
      await editRate({ id: rate, rate: value.rate }).unwrap()
    } catch (error: any) {
      toast.error(error?.data.error)
    }
  }, [])
  return (
    <>
      <Card className="mb-8 flex flex-col items-center xl:flex-row">
        <div className="mb-4 md:w-1/4 xl:mb-0">
          <h1 className="text-xl font-semibold text-heading">Exchange Rate</h1>
        </div>
        <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-1/2">
          <h3 className="text-base text-heading font-normal">
            Current rate: {rate_data?.data?.rate} {rate_data?.data?.currency}
          </h3>
        </div>
      </Card>
      <ExchangeRateForm
        initialValues={initialValues}
        onHandleSubmit={handleEditRate}
        loading={isLoadingEditRate}
      />
    </>
  )
}

export default ExchangeRatePage
