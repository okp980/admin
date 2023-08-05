import cn from "classnames"
import Button from "../ui/button/button"
import { BsTrash3 } from "react-icons/bs"

type ConfirmationCardProps = {
  onCancel: () => void
  onDelete: () => Promise<void>
  title?: string
  icon?: any
  description?: string
  cancelBtnClassName?: string
  deleteBtnClassName?: string
  cancelBtnText?: string
  deleteBtnText?: string
  cancelBtnLoading?: boolean
  deleteBtnLoading?: boolean
}

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({
  onCancel,
  onDelete,
  icon,
  title = "Delete",
  description = "Are you sure, you want to delete?",
  cancelBtnText = "Cancel",
  deleteBtnText = "Delete",
  cancelBtnClassName,
  deleteBtnClassName,
  cancelBtnLoading,
  deleteBtnLoading,
}) => {
  return (
    <div className="m-auto w-full max-w-sm rounded-md bg-white p-4 pb-6 sm:w-[24rem] md:rounded-xl">
      <div className="h-full w-full text-center">
        <div className="flex h-full flex-col justify-between">
          {icon ? (
            icon
          ) : (
            <BsTrash3 className="m-auto mt-4 h-12 w-12 text-green-800" />
          )}
          <p className="mt-4 text-xl font-bold text-heading">{title}</p>
          <p className="py-2 px-6 leading-relaxed text-body-dark dark:text-muted">
            {description}
          </p>
          <div className="space-s-4 mt-8 flex w-full items-center justify-between gap-3">
            <div className="w-1/2">
              <Button
                onClick={onCancel}
                loading={cancelBtnLoading}
                disabled={cancelBtnLoading}
                variant="custom"
                className={cn(
                  "w-full rounded bg-green-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-gray-800-hover focus:bg-accent-hover focus:outline-none",
                  cancelBtnClassName
                )}
              >
                {cancelBtnText}
              </Button>
            </div>

            <div className="w-1/2">
              <Button
                onClick={onDelete}
                loading={deleteBtnLoading}
                disabled={deleteBtnLoading}
                variant="custom"
                className={cn(
                  "w-full rounded bg-red-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-red-700 focus:bg-red-700 focus:outline-none",
                  deleteBtnClassName
                )}
              >
                {deleteBtnText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationCard
