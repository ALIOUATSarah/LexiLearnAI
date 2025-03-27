import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

// Sample data for the charts
const barData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
];

const lineData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
];

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const ChartContainer = ({ children, height }) => (
  <div className="w-full flex items-center justify-center" style={{ height }}>
    <div className="w-full h-full">{children}</div>
  </div>
);

const getMobileConfig = (isMobile) => {
  return {
    fontSize: isMobile ? 10 : 12,
    barSize: isMobile ? 20 : 30,
    marginRight: isMobile ? 10 : 20,
    tooltipPadding: isMobile ? "4px 8px" : "8px 12px",
    outerRadius: isMobile ? 60 : 70,
    innerRadius: isMobile ? 25 : 35,
  };
};

export function BarChart({ data = barData, height = 300 }) {
  // Check for mobile viewport
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const config = getMobileConfig(isMobile);

  return (
    <ChartContainer height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{ top: 5, right: config.marginRight, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            fontSize={config.fontSize}
          />
          <YAxis axisLine={false} tickLine={false} fontSize={config.fontSize} />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: config.tooltipPadding,
              fontSize: config.fontSize,
            }}
          />
          <Bar
            dataKey="value"
            fill="#8884d8"
            radius={[4, 4, 0, 0]}
            barSize={config.barSize}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function LineChart({ data = lineData, height = 300 }) {
  // Check for mobile viewport
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const config = getMobileConfig(isMobile);

  return (
    <ChartContainer height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 5, right: config.marginRight, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            fontSize={config.fontSize}
          />
          <YAxis axisLine={false} tickLine={false} fontSize={config.fontSize} />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: config.tooltipPadding,
              fontSize: config.fontSize,
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: isMobile ? 3 : 4 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function PieChart({ data = pieData, height = 300 }) {
  // Check for mobile viewport
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const config = getMobileConfig(isMobile);

  return (
    <ChartContainer height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={config.outerRadius}
            innerRadius={config.innerRadius}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: config.tooltipPadding,
              fontSize: config.fontSize,
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: 10, fontSize: config.fontSize }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
