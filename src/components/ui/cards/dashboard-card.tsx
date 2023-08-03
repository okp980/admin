import React, { ReactElement } from "react"

type Props = {
  title: string
  subtitle?: string
  icon?: ReactElement
  result: number | undefined
}

const DashboardCard = ({ title, subtitle, icon, result }: Props) => {
  return (
    <div className="flex h-full w-full flex-col rounded bg-white p-7 shadow">
      <div className="mb-auto flex w-full justify-between pb-8">
        <div className="flex w-full flex-col">
          <h3 className="mb-1 text-base font-semibold text-heading">{title}</h3>
          {subtitle && (
            <p className="text-xs font-semibold text-body text-gray-800">
              {subtitle}
            </p>
          )}
        </div>
        {icon && <div>{icon}</div>}
      </div>
      <div>
        <p className="mb-2 text-xl font-semibold text-heading">{result}</p>
      </div>
    </div>
  )
}

export default DashboardCard
