export const ORDER_STATUS = [
  { name: "Order Pending", status: "pending", serial: 1 },
  { name: "Order Processing", status: "`processing`", serial: 2 },
  {
    name: "Order At Local Facility",
    status: "at-local-facility",
    serial: 3,
  },
  {
    name: "Order Out For Delivery",
    status: "out-for-delivery",
    serial: 4,
  },
  { name: "Order Completed", status: "completed", serial: 5 },
  { name: "Order Cancelled", status: "cancelled", serial: 6 },
  { name: "Order Refunded", status: "refunded", serial: 7 },
  // { name: "Order Failed", status: "failed", serial: 5 },
]
