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
import Badge from "../ui/badge/badge"
import cn from "classnames"
import { getPrice } from "@/utils/helpers"
import { siteSettings } from "@/settings/site.settings"

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
      title: "Image",
      dataIndex: "image",
      key: "image",

      width: 74,
      render: (image: any, { name }: { name: string }) => (
        <div className="relative flex h-[42px] w-[42px] items-center">
          <Image
            // src={image?.thumbnail ?? siteSettings.product.placeholder}
            src={image || siteSettings.product.placeholder}
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
      align: "left",
      // onHeaderCell: () => onHeaderClick("name"),
      render: (name: string) => (
        <span className=" whitespace-nowrap capitalize">{name}</span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 200,
      align: "left",
      ellipsis: true,
      render: (category: CategoryResult) => (
        <span className="truncate whitespace-nowrap capitalize">
          {category?.name}
        </span>
      ),
    },

    {
      title: "Sub Category",
      dataIndex: "sub_category",
      key: "sub_category",
      width: 200,
      align: "left",
      render: (sub_category: SubCategoryResult) => (
        <span className="truncate whitespace-nowrap capitalize">
          {sub_category.name}
        </span>
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
      render: function Render(value: number, record: ProductResult) {
        const price = getPrice(record.price)
        const max_price = getPrice(record?.max_price)
        const min_price = getPrice(record?.min_price)

        const renderPrice =
          record?.product_type === "variable"
            ? `${min_price} - ${max_price}`
            : price

        return (
          <span className="whitespace-nowrap" title={renderPrice}>
            {renderPrice}
          </span>
        )
      },
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
      render: function Render(quantity: number, record: ProductResult) {
        const renderQuantity =
          record?.product_type === "variable"
            ? record?.total_quantity
            : quantity

        return (
          <span className="whitespace-nowrap" title={renderQuantity.toString()}>
            {renderQuantity.toString()}
          </span>
        )
      },
    },
    {
      title: "Status",
      dataIndex: "inStock",
      key: "inStock",
      align: "center",
      width: 180,
      render: (inStock: boolean, record: any) => (
        <div>
          <Badge
            text={`${inStock ? "in" : "out-of"}-stock `}
            color={cn({ "bg-red-600": !inStock, "bg-green-600": inStock })}
            animate={inStock ? false : true}
          />
        </div>
      ),
    },
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
              modalPayload: { id },
            })
          }
          href={`/products/update/${id}`}
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
