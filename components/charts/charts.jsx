"use client"

import { useEffect, useRef } from "react"

// Bar Chart Component
export function BarChart({ data }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const padding = 40
    const barWidth = (width - padding * 2) / data.length - 10

    // Find max value for scaling
    const maxValue = Math.max(...data.map((item) => item.value))

    // Draw bars
    data.forEach((item, index) => {
      const x = padding + index * (barWidth + 10)
      const barHeight = ((height - padding * 2) * item.value) / maxValue
      const y = height - padding - barHeight

      // Bar
      ctx.fillStyle = item.color || "#3b82f6"
      ctx.fillRect(x, y, barWidth, barHeight)

      // Label
      ctx.fillStyle = "#64748b"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(item.name, x + barWidth / 2, height - padding / 2)

      // Value
      ctx.fillStyle = "#334155"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(item.value.toString(), x + barWidth / 2, y - 5)
    })
  }, [data])

  return <canvas ref={canvasRef} width="300" height="150" />
}

// Line Chart Component
export function LineChart({ data }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const padding = 40

    // Find max value for scaling
    const maxValue = Math.max(...data.map((item) => item.value))

    // Draw line
    ctx.beginPath()
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2

    data.forEach((item, index) => {
      const x = padding + index * ((width - padding * 2) / (data.length - 1))
      const y = height - padding - ((height - padding * 2) * item.value) / maxValue

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      // Draw point
      ctx.fillStyle = "#3b82f6"
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()

      // Label
      ctx.fillStyle = "#64748b"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(item.name, x, height - padding / 2)

      // Value
      ctx.fillStyle = "#334155"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(item.value.toString(), x, y - 10)
    })

    ctx.stroke()
  }, [data])

  return <canvas ref={canvasRef} width="300" height="150" />
}

// Pie Chart Component
export function PieChart({ data = pieData, height = 400 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={150}
          dataKey="value"
          labelLine={false}
          label={({ name, percent, x, y }) => (
            <text
              x={x}
              y={y}
              fill={
                name === "Present"
                  ? "#059669" // Tailwind green-600
                  : name === "Absent"
                  ? "#ca8a04" // amber-600
                  : "#dc2626" // red-600
              }
              fontSize={14}
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="central"
            >
              {`${name}: ${(percent * 100).toFixed(0)}%`}
            </text>
          )}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
