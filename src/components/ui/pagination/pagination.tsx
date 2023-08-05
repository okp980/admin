import RCPagination, { PaginationProps } from "rc-pagination"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import "rc-pagination/assets/index.css"

const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <RCPagination
      nextIcon={<FaChevronRight />}
      prevIcon={<FaChevronLeft />}
      {...props}
    />
  )
}

export default Pagination
