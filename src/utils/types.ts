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

export interface CategoryResult {
  name: string
  image: string
  createdAt: string
  updatedAt: string
  id: string
}

export interface SubCategoryResult {
  name: string
  category: CategoryResult
  image: string
  createdAt: string
  updatedAt: string

  id: string
}

export interface ProductResult {
  name: string
  description: string
  price: number
  image: string
  gallery: []
  sub_category: SubCategoryResult
  quantity: number
  tags: []
  meta: {
    weight: {
      unit: string
      value: number
    }
    sizes: string[]
  }
  inStock: boolean
  createdAt: string
  updatedAt: string
  category: CategoryResult
  slug: string

  id: string
}

export interface PaginatedInfo {
  total: number
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

export interface ResponseInterface<T> {
  message: string
  success: string
  data: T
}

export interface PaginatedResponse<T> {
  message: string
  success: string
  pagination: PaginatedInfo
  data: T[]
}

export interface AnalyticsResponse extends ResponseInterface<Analytics> {}
export interface PaginatedOrderResult extends PaginatedResponse<OrderResult> {}
export interface PaginatedProductResult
  extends PaginatedResponse<ProductResult> {}
export interface CategoryAllResultResponse
  extends ResponseInterface<CategoryResult[]> {}
export interface SubCategoryAllResultResponse
  extends ResponseInterface<SubCategoryResult[]> {}
