/**
 * Asset Allocation Pie Chart
 *
 * Displays portfolio distribution across securities
 * Shows percentage and value for each holding
 */

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Holding } from "@/types";

interface AssetAllocationChartProps {
  holdings: Holding[];
}

// Color palette for different securities
const COLORS = [
  "#10b981", // emerald
  "#3b82f6", // blue
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#14b8a6", // teal
  "#f97316", // orange
  "#6366f1", // indigo
  "#84cc16", // lime
  "#06b6d4", // cyan
];

export function AssetAllocationChart({ holdings }: AssetAllocationChartProps) {
  // DEBUG: Log the first holding to see structure
  if (holdings.length > 0) {
    console.log("Holdings data:", holdings[0]);
  }

  // Transform holdings into chart data
  const chartData = holdings
    .filter((h) => (h as any).currentValue > 0) // Only show holdings with value
    .map((h) => {
      const holdingData = h as any;
      console.log("Processing holding:", h);
      return {
        name:
          holdingData.security?.symbol ||
          holdingData.securitySymbol ||
          holdingData.symbol ||
          "Unknown",
        value: holdingData.currentValue || 0,
        fullName:
          holdingData.security?.name ||
          holdingData.securityName ||
          holdingData.name ||
          "Unknown Security",
      };
    })
    .sort((a, b) => b.value - a.value); // Sort by value descending

  // Calculate total for percentage display
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  // Custom tooltip to show more details
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / total) * 100).toFixed(1);

      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">{data.payload.fullName}</p>
          <p className="text-sm font-medium text-teal-600 mt-1">
            $
            {data.value.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="text-xs text-gray-500">{percentage}% of portfolio</p>
        </div>
      );
    }
    return null;
  };

  // Custom label to show percentage on pie slices
  const renderLabel = (entry: any) => {
    const percentage = ((entry.value / total) * 100).toFixed(0);
    // Only show label if percentage is > 5% to avoid clutter
    return parseFloat(percentage) > 5 ? `${entry.name} ${percentage}%` : "";
  };

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 text-gray-500">
        <p>No holdings to display</p>
      </div>
    );
  }

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry: any) => {
              const percentage = ((entry.payload.value / total) * 100).toFixed(
                1,
              );
              return `${value} (${percentage}%)`;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
