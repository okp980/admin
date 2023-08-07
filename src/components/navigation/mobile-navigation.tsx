import Drawer from "../ui/drawer/drawer"
import DrawerWrapper from "../ui/drawer/drawer-wrapper"

const MobileNavigation: React.FC<{
  children?: React.ReactNode
  open: boolean
  onClose: () => void
}> = ({ open, onClose, children }) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerWrapper onClose={onClose}>
        <div className="flex flex-col space-y-6 p-5">{children}</div>
      </DrawerWrapper>
    </Drawer>
  )
}
export default MobileNavigation
