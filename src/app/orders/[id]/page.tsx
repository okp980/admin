"use client"
import Card from "@/components/common/card"
import SelectField from "@/components/form/selectField"
import Button from "@/components/ui/button/button"
import {
  useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/services/orders"
import { ORDER_STATUS } from "@/utils/order-status"
import { OrderStatus } from "@/utils/types"
import { Form, Formik } from "formik"
import Image from "next/image"
import React from "react"
import { Table } from "../../../components/ui/table/table"
import Loader from "@/components/ui/loader/loader"
import ErrorMessage from "@/components/ui/error-message"
import { toast } from "react-toastify"

type Props = {
  params: { id: string }
}

const OrderDetailPage = ({ params }: Props) => {
  const {
    data: order,
    isLoading: isLoadingOrder,
    isError: isErrorOrder,
    error: errorOrder,
  } = useGetSingleOrderQuery(params.id)
  const [
    updateStatus,
    { isLoading: isLoadingStatus, isError: isErrorStatus, error: errorStatus },
  ] = useUpdateOrderStatusMutation()
  const columns = [
    {
      title: "image",
      dataIndex: "image",
      key: "image",

      width: 70,
      render: (image: any, { name }: { name: string }) => (
        <div className="relative flex h-[42px] w-[42px] items-center">
          <Image
            // src={image?.thumbnail ?? siteSettings.product.placeholder}
            src={`http://localhost:4000/uploads/${image}`}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw"
            className="overflow-hidden rounded object-fill"
          />
        </div>
      ),
    },

    {
      title: "Products",
      dataIndex: "items",
      key: "items",
      align: "left",
      render: (name: string, item: any) => (
        <div>
          <span>{name}</span>
          <span className="mx-2">x</span>
          <span className="font-semibold text-heading">{item?.quantity}</span>
        </div>
      ),
    },
    {
      title: "Total",
      dataIndex: "price",
      key: "price",
      align: "right",
      //  render: function Render(_: any, item: any) {
      //    const { price } = usePrice({
      //      amount: parseFloat(item.pivot.subtotal),
      //    })
      //    return <span>{price}</span>
      //  },
    },
  ]
  const handleUpdateStatus = async (values: any) => {
    try {
      await updateStatus({ ...values, id: params.id }).unwrap()
      toast.success("Order Updated Successfully")
    } catch (error: any) {
      toast.error(error?.data.error)
    }
  }

  if (isLoadingOrder) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (isErrorOrder) {
    const errorMessage: any = isErrorOrder ? errorOrder : null

    return <ErrorMessage message={errorMessage?.data?.error} />
  }
  return (
    <Card className="relative overflow-hidden">
      <div className="flex flex-col items-center lg:flex-row">
        <h3 className="mb-8 w-full whitespace-nowrap text-center text-2xl font-semibold text-heading lg:mb-0 lg:w-1/3 lg:text-start">
          Order ID - {order?.data?.id}
        </h3>

        {order?.data?.status !== OrderStatus.ORDER_FAILED &&
          order?.data?.status !== OrderStatus.ORDER_CANCELLED && (
            <Formik
              initialValues={{ status: "" }}
              onSubmit={handleUpdateStatus}
            >
              {({ setFieldValue }) => (
                <Form className="flex w-full items-start ms-auto lg:w-2/4">
                  <div className="z-20 w-full me-5">
                    <SelectField
                      name="order_status"
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.status}
                      options={ORDER_STATUS.slice(0, 6)}
                      onChange={(option: any) => {
                        setFieldValue("status", option.status)
                      }}
                    />
                  </div>
                  <Button loading={isLoadingStatus}>Change Status</Button>
                </Form>
              )}
            </Formik>
          )}
      </div>
      <div className="my-5 flex items-center justify-center lg:my-10">
        <p>form steeper for order status</p>
      </div>
      <div className="mb-10">
        {order ? (
          <Table
            //@ts-ignore
            columns={columns}
            emptyText={""}
            data={order?.data?.items}
            rowKey="id"
            scroll={{ x: 300 }}
          />
        ) : (
          <span>No Order Found</span>
        )}
        <div className="flex w-full flex-col space-y-2 border-t-4 border-double border-border-200 px-4 py-4 ms-auto sm:w-1/2 md:w-1/3">
          <div className="flex items-center justify-between text-sm text-body">
            <span>Sub total</span>
            <span>{order?.data?.totalAmount}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-body">
            <span>Tax</span>
            <span>2.00</span>
          </div>
          <div className="flex items-center justify-between text-sm text-body">
            <span>Delivery fee</span>
            <span>{order?.data?.shippingMethod?.charge}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-body">
            <span>Discount</span>
            <span>0.0</span>
          </div>
          <div className="flex items-center justify-between text-base font-semibold text-heading">
            <span>Total</span>
            <span>{order?.data?.totalAmount}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
        {/* <div className="mb-10 w-full sm:mb-0 sm:w-1/2 sm:pe-8">
          <h3 className="mb-3 border-b border-border-200 pb-2 font-semibold text-heading">
            {t("common:billing-address")}
          </h3>

          <div className="flex flex-col items-start space-y-1 text-sm text-body">
            <span>{order?.customer_name}</span>
            {order?.billing_address && (
              <span>{formatAddress(order.billing_address)}</span>
            )}
            {order?.customer_contact && <span>{order?.customer_contact}</span>}
          </div>
        </div> */}

        <div className="w-full sm:w-1/2 sm:ps-8">
          <h3 className="mb-3 border-b border-border-200 pb-2 font-semibold text-heading text-start sm:text-end">
            Shipping Address
          </h3>

          <div className="flex flex-col items-start space-y-1 text-sm text-body text-start sm:items-end sm:text-end">
            {/* <span>{order?.data?.user.profile}</span> */}
            {order?.data?.shippingAddress?.full_address && (
              <span>{order?.data?.shippingAddress?.full_address}</span>
            )}
            {/* {order?.customer_contact && <span>{order?.customer_contact}</span>} */}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default OrderDetailPage
