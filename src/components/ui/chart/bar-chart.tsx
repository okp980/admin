"use client"
import React from "react"
import Chart from "react-apexcharts"

type Props = {
  title: string
  colors: any[]
  series: any[]
  categories: string[]
}

const BarChart = ({ colors, categories, series, title }: Props) => {
  const options = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "65%",
          endingShape: "flat",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
        width: 2,
      },
      grid: {
        borderColor: "#F7F7F7",
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      colors: colors,
      xaxis: {
        labels: {
          show: true,
          style: {
            colors: "#161F6A",
            fontSize: "14px",
            fontFamily: "'Lato', sans-serif",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: categories,
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          style: {
            color: "#161F6A",
            fontSize: "14px",
            fontFamily: "'Lato', sans-serif",
          },
        },
      },
    },
    series: [
      {
        name: "Sale",
        data: series,
      },
    ],
  }
  return (
    <div className="h-full w-full rounded bg-white shadow-sm">
      <div className="p-8">
        <h3 className="text-sm text-heading">{title}</h3>
      </div>
      <div className="flex w-full flex-wrap" style={{ display: "block" }}>
        <Chart
          options={options.options}
          series={options.series}
          height="350"
          width="100%"
          type="bar"
        />
      </div>
    </div>
  )
}

export default BarChart
