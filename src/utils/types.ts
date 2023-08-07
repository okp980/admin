export enum OrderStatus {
  ORDER_PROCESSING = "order-processing",
}

export interface PaginationParams {
  select?: string
  sort?: string
  page?: number
  limit?: number
  category?: string
  sub_category?: string
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

export interface AttributeValueResult {
  id: string
  value: string
  meta: string
}

export interface AttributeResult {
  id: string
  name: string
  values: AttributeValueResult[]
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

export interface TagResult {
  name: string
  category: CategoryResult
}
export interface OrderResult {
  _id: string
  user: string
  items: string[]
  totalAmount: number
  shippingAddress: ShippingAddress[]
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
  duration: number
  charge: number
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

export interface AttributeResultResponse
  extends ResponseInterface<AttributeResult[]> {}

export interface CategoryResultResponse
  extends ResponseInterface<CategoryResult[]> {}
export interface SubCategoryResultResponse
  extends ResponseInterface<SubCategoryResult[]> {}

export interface PaginatedResponse<T> {
  message: string
  success: string
  pagination: PaginatedInfo
  data: T[]
}

export interface AnalyticsResponse extends ResponseInterface<Analytics> {}
export interface ShippingMethodResponse
  extends ResponseInterface<ShippingMethod[]> {}
export interface PaginatedOrderResult extends PaginatedResponse<OrderResult> {}
export interface PaginatedUserResult extends PaginatedResponse<UserResult> {}
export interface PaginatedProductResult
  extends PaginatedResponse<ProductResult> {}
export interface PaginatedTagResponse extends PaginatedResponse<TagResult> {}
export interface PaginatedSubCategoryResponse
  extends PaginatedResponse<SubCategoryResult> {}
export interface PaginatedCategoryResponse
  extends PaginatedResponse<CategoryResult> {}

export interface CategoryAllResultResponse
  extends ResponseInterface<CategoryResult[]> {}
export interface SubCategoryAllResultResponse
  extends ResponseInterface<SubCategoryResult[]> {}
