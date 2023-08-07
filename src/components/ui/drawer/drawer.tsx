import { Portal } from "@headlessui/react"
import { AnimatePresence, motion } from "framer-motion"
import cn from "classnames"
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock"
import React, { useEffect, useRef } from "react"
import { fadeInRight } from "@/utils/motions/fade-in-right"
import { fadeInOut } from "@/utils/motions/fade-in-out"

type Props = {
  children: any
  open: boolean

  useBlurBackdrop?: boolean
  onClose: () => void
}
type DivElementRef = React.MutableRefObject<HTMLDivElement>

const Drawer = ({
  children,
  open = false,

  useBlurBackdrop,
  onClose,
}: Props) => {
  const ref = useRef() as DivElementRef
  useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current)
      } else {
        enableBodyScroll(ref.current)
      }
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [open])
  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.aside
            ref={ref}
            key="drawer"
            initial="from"
            animate="to"
            exit="from"
            variants={fadeInRight()}
            className="fixed inset-0 z-50 h-full overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                initial="from"
                animate="to"
                exit="from"
                variants={fadeInOut(0.35)}
                onClick={onClose}
                className={cn(
                  "absolute inset-0 bg-dark bg-opacity-40",
                  useBlurBackdrop && "use-blur-backdrop"
                )}
              >
                <div className="absolute inset-y-0 flex max-w-full outline-none left-0 right-auto">
                  <div className="h-full w-screen max-w-md">
                    <div className="flex h-full flex-col bg-light text-body shadow-xl">
                      {children}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </Portal>
  )
}

export default Drawer
