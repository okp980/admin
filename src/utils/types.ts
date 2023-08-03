export enum OrderStatus {
  ORDER_PROCESSING = "order-processing",
}

export interface AuthInterface {
  token: string | null
}

export interface Analytics {
  totalRevenue: number
  totalRefunds: number
  totalShops: number
  todaysRevenue: number
  totalOrders: number
  newCustomers: number
  totalYearSaleByMonth: { total: number; month: string }[]
}

export interface OrderResult {
  user: string
  items: string[]
  totalAmount: number
  shippingAddress: string[]
  shippingMethod: string
  status: OrderStatus
  refund: boolean
  createdAt: string
  updatedAt: string

  payment: string
  id: string
}

export interface ResponseInterface<T> {
  message: string
  success: string
  data: T
}

export interface PaginatedResponse<T> {
  message: string
  success: string
  pagination: {
    current: number
    limit: number
    next: {
      page: number
      limit: number
    } | null
    previous: {
      page: number
      limit: number
    } | null
  }
  data: T[]
}

export interface AnalyticsResponse extends ResponseInterface<Analytics> {}
export interface PaginatedOrderResult extends PaginatedResponse<OrderResult> {}
