import Image from "next/image"

import { Routes } from "@/config/routes"
import Pagination from "../ui/pagination/pagination"
import {
  CategoryResult,
  PaginatedInfo,
  ProductResult,
  SubCategoryResult,
} from "@/utils/types"
import { Table } from "../ui/table/table"
import useModal from "@/hooks/useModal"
import { MODAL_VIEW } from "@/utils/enums"
import ActionButtons from "../common/action-buttons"

export type IProps = {
  products: ProductResult[] | undefined
  paginatorInfo: PaginatedInfo | null
  onPagination: (current: number) => void
  onSort?: (current: any) => void
  onOrder?: (current: string) => void
}

// type SortingObjType = {
//   sort: SortOrder
//   column: string | null
// }

const ProductList = ({
  products,
  paginatorInfo,
  onPagination,
  onSort,
  onOrder,
}: IProps) => {
  // const [sortingObj, setSortingObj] = useState<SortingObjType>({
  //   sort: SortOrder.Desc,
  //   column: null,
  // })

  // const onHeaderClick = (column: string | null) => ({
  //   onClick: () => {
  //     onSort((currentSortDirection: SortOrder) =>
  //       currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
  //     )
  //     onOrder(column!)

  //     setSortingObj({
  //       sort:
  //         sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
  //       column: column,
  //     })
  //   },
  // })

  const { handleOpenModal } = useModal()

  let columns = [
    {
      title: "image",
      dataIndex: "image",
      key: "image",

      width: 74,
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
      title: "Name",
      // className: "cursor-pointer",
      dataIndex: "name",
      key: "name",
      width: 300,
      ellipsis: true,
      // onHeaderCell: () => onHeaderClick("name"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 200,
      align: "center",
      ellipsis: true,
      render: (category: CategoryResult) => (
        <span className="truncate whitespace-nowrap">{category?.name}</span>
      ),
    },
    // {
    //   title: t("table:table-item-shop"),
    //   dataIndex: "shop",
    //   key: "shop",
    //   width: 120,
    //   align: "center",
    //   ellipsis: true,
    //   render: (shop: Shop) => (
    //     <span className="truncate whitespace-nowrap">{shop?.name}</span>
    //   ),
    // },
    {
      title: "Sub Category",
      dataIndex: "sub_category",
      key: "sub_category",
      width: 200,
      align: "center",
      render: (sub_category: SubCategoryResult) => (
        <span className="truncate whitespace-nowrap">{sub_category.name}</span>
      ),
    },
    {
      // title: (
      //   <TitleWithSort
      //     title={t("table:table-item-unit")}
      //     ascending={
      //       sortingObj.sort === SortOrder.Asc && sortingObj.column === "price"
      //     }
      //     isActive={sortingObj.column === "price"}
      //   />
      // ),
      title: "Price/Unit",
      // className: "cursor-pointer",
      dataIndex: "price",
      key: "price",
      align: "center",
      width: 120,
      // onHeaderCell: () => onHeaderClick("price"),
      // render: function Render(value: number, record: Product) {
      //   const { price: max_price } = usePrice({
      //     amount: record?.max_price as number,
      //   })
      //   const { price: min_price } = usePrice({
      //     amount: record?.min_price as number,
      //   })

      //   const { price } = usePrice({
      //     amount: value,
      //   })

      //   const renderPrice =
      //     record?.product_type === ProductType.Variable
      //       ? `${min_price} - ${max_price}`
      //       : price

      //   return (
      //     <span className="whitespace-nowrap" title={renderPrice}>
      //       {renderPrice}
      //     </span>
      //   )
      // },
    },
    {
      // title: (
      //   <TitleWithSort
      //     title={t("table:table-item-quantity")}
      //     ascending={
      //       sortingObj.sort === SortOrder.Asc &&
      //       sortingObj.column === "quantity"
      //     }
      //     isActive={sortingObj.column === "quantity"}
      //   />
      // ),
      title: "Quantity",
      className: "cursor-pointer",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      width: 150,
      // onHeaderCell: () => onHeaderClick("quantity"),
      // render: (quantity: number) => {
      //   if (quantity < 2) {
      //     return (
      //       <Badge
      //         text={t("common:text-out-of-stock")}
      //         color="bg-red-500 text-white"
      //       />
      //     )
      //   }
      //   return <span>{quantity}</span>
      // },
    },
    // {
    //   title: t("table:table-item-status"),
    //   dataIndex: "status",
    //   key: "status",
    //   align: "left",
    //   width: 180,
    //   render: (status: string, record: any) => (
    //     <div
    //       className={`flex justify-start ${
    //         record?.quantity > 0 && record?.quantity < 10
    //           ? "flex-col items-baseline space-y-3 3xl:flex-row 3xl:space-x-3 3xl:space-y-0 rtl:3xl:space-x-reverse"
    //           : "items-center space-x-3 rtl:space-x-reverse"
    //       }`}
    //     >
    //       <Badge
    //         text={status}
    //         color={
    //           status.toLocaleLowerCase() === "draft"
    //             ? "bg-yellow-400"
    //             : "bg-accent"
    //         }
    //       />
    //       {record?.quantity > 0 && record?.quantity < 10 && (
    //         <Badge
    //           text={t("common:text-low-quantity")}
    //           color="bg-red-600"
    //           animate={true}
    //         />
    //       )}
    //     </div>
    //   ),
    // },
    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      align: "center",
      width: 120,
      render: (id: string, record: ProductResult) => (
        <ActionButtons
          onDelete={() =>
            handleOpenModal({
              view: MODAL_VIEW.DELETE_PRODUCT,
              modalPayload: id,
            })
          }
          href={Routes.products.edit(id)}
        />
      ),
    },
  ]

  // if (router?.query?.shop) {
  //   columns = columns?.filter((column) => column?.key !== "shop")
  // }

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          /* @ts-ignore */
          columns={columns}
          emptyText={""}
          data={products}
          rowKey="id"
          scroll={{ x: 900 }}
        />
      </div>

      {!!paginatorInfo && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.current}
            pageSize={paginatorInfo.limit}
            onChange={onPagination}
            showLessItems
          />
        </div>
      )}
    </>
  )
}

export default ProductList
