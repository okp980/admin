export enum OrderStatus {
  ORDER_PROCESSING = "order-processing",
  ORDER_PENDING = "order-pending",
  ORDER_COMPLETED = "order-completed",
  ORDER_CANCELLED = "order-cancelled",
  ORDER_REFUNDED = "order-refunded",
  ORDER_FAILED = "order-failed",
  ORDER_AT_LOCAL_FACILITY = "order-at-local-facility",
  ORDER_OUT_FOR_DELIVERY = "order-out-for-delivery",
}

// Tag Type
export type TagType = { id?: string; name: string; category: string }
export type OrderType = { id?: string; status: OrderStatus }
export type CategoryType = { id?: string; name: string; image?: Blob | string }
export type SubCategoryType = {
  id?: string
  name: string
  category: string
  image?: Blob | string
}
export type ShippingType = {
  id?: string
  title: string
  description: string
  charge: string
  duration: string
}
export type ExchangeRateType = {
  id?: string
  rate: string
}

export interface PaginationParams {
  select?: string
  sort?: string
  page?: number
  limit?: number
  category?: string
  sub_category?: string
}

export interface AuthBody {
  email: string
  password: string
}

export interface AuthInterface {
  success?: boolean
  message?: string
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

export interface AttributeValue {
  id?: string
  value: string
  meta: string
}

export interface Attribute {
  id?: string
  name: string
  values: AttributeValue[]
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
  category: CategoryResult | string
  image: string
  createdAt: string
  updatedAt: string

  id: string
}

export interface TagResult {
  id: string
  name: string
  category: CategoryResult
}
export interface ExchangeRateResult {
  id: string
  rate: number
  currency: string
}
export interface OrderResult {
  _id: string
  user: UserResult
  items: ProductResult[]
  totalAmount: number
  shippingAddress: ShippingAddress
  shippingMethod: ShippingMethod
  status: string
  refund: boolean
  createdAt: Date
  updatedAt: Date
  __v: number
  payment: string
  id: string
}

export interface ShippingAddress {
  _id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  city: string
  state: string
  country: string
  default: boolean
  user: string
  createdAt: Date
  updatedAt: Date
  __v: number
  fullName: string
  full_address: string
  id: string
}

export interface ShippingMethod {
  _id: string
  title: string
  description: string
  duration: string
  charge: string
  createdAt: Date
  updatedAt: Date
  __v: number
  id: string
}

export interface UserResult {
  profile: null
  verified_email: boolean
  isActive: boolean
  _id: string
  email: string
  role: string
  createdAt: Date
  updatedAt: Date
  __v: number
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
  product_type: string
  max_price: number
  min_price: number
  total_quantity: number
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
  message?: string
  count?: number
  success: string
  data: T
}

export interface ErrorResponse {
  message: string
  status: number
}

export interface AttributeResponse extends ResponseInterface<Attribute> {}
export interface ProductResponse extends ResponseInterface<ProductResult> {}

export interface OrderResultResponse extends ResponseInterface<OrderResult> {}
export interface CategoryResultResponse
  extends ResponseInterface<CategoryResult> {}
export interface SubCategoryResultResponse
  extends ResponseInterface<SubCategoryResult> {}

export interface TagResponse extends ResponseInterface<TagResult> {}
export interface ExchangeRateResponse
  extends ResponseInterface<ExchangeRateResult> {}

export interface PaginatedResponse<T> {
  message: string
  success: string
  pagination: PaginatedInfo
  data: T[]
}

export interface AnalyticsResponse extends ResponseInterface<Analytics> {}

export interface ShippingMethodResponse
  extends ResponseInterface<ShippingMethod> {}
export interface PaginatedOrderResult extends PaginatedResponse<OrderResult> {}
export interface PaginatedUserResult extends PaginatedResponse<UserResult> {}
export interface PaginatedProductResult
  extends PaginatedResponse<ProductResult> {}
export interface PaginatedAttribute extends PaginatedResponse<Attribute> {}
export interface PaginatedTagResponse extends PaginatedResponse<TagResult> {}
export interface PaginatedSubCategoryResponse
  extends PaginatedResponse<SubCategoryResult> {}
export interface PaginatedCategoryResponse
  extends PaginatedResponse<CategoryResult> {}
export interface PaginatedShippingMethod
  extends PaginatedResponse<ShippingMethod> {}

export interface CategoryAllResultResponse
  extends ResponseInterface<CategoryResult[]> {}
export interface SubCategoryAllResultResponse
  extends ResponseInterface<SubCategoryResult[]> {}
