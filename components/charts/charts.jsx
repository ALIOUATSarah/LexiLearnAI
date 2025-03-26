"use client";
import { useRef, useEffect } from "react";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

export function PieChart({ data = [], height = 250 }) {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            dataKey="value"
            labelLine={false}
            label={({ name, percent, x, y }) => (
              <text
                x={x}
                y={y}
                fill={
                  name === "Present"
                    ? "#059669"
                    : name === "Absent"
                    ? "#ca8a04"
                    : "#dc2626"
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
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{ paddingTop: 10 }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
