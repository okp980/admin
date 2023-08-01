export interface AuthInterface {
  token: string | null
}

export interface ResponseInterface<T> {
  message: string
  success: string
  data: T
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

export interface AnalyticsResponse extends ResponseInterface<Analytics> {}
