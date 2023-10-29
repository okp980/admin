const StatusColor = (status: string) => {
  console.log(status)

  let bg_class = ""
  if (
    status?.toLowerCase() === "pending" ||
    status?.toLowerCase() === "payment-pending"
  ) {
    bg_class = "bg-[#EAB308]"
  } else if (
    status?.toLowerCase() === "processing" ||
    status?.toLowerCase() === "payment-processing"
  ) {
    bg_class = "bg-[#F59E0B]"
  } else if (
    status?.toLowerCase() === "completed" ||
    status?.toLowerCase() === "payment-success"
  ) {
    bg_class = "bg-[#10B981]"
  } else if (
    status?.toLowerCase() === "cancelled" ||
    status?.toLowerCase() === "payment-reversal"
  ) {
    bg_class = "bg-[#9CA3AF]"
  } else if (
    status?.toLowerCase() === "failed" ||
    status?.toLowerCase() === "payment-failed"
  ) {
    bg_class = "bg-[#EF4444]"
  } else if (status?.toLowerCase() === "at-local-facility") {
    bg_class = "bg-[#10B981]"
  } else if (status?.toLowerCase() === "out-for-delivery") {
    bg_class = "bg-[#D9D9D9]"
  } else {
    bg_class = "bg-accent"
  }

  return bg_class
}

export default StatusColor
