/**
 * Gain/Loss Bar Chart
 *
 * Shows performance of each holding with green/red bars
 * Positive gains in green, losses in red
 */

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Holding } from "@/types";

interface GainLossBarChartProps {
  holdings: Holding[];
}

export function GainLossBarChart({ holdings }: GainLossBarChartProps) {
  // Transform holdings into chart data
  const chartData = holdings
    .map((h) => {
      const holdingData = h as any;
      const gainLoss = holdingData.unrealizedGainLoss || 0;
      return {
        name:
          holdingData.security?.symbol ||
          holdingData.securitySymbol ||
          holdingData.symbol ||
          "Unknown",
        value: gainLoss,
        fullName:
          holdingData.security?.name ||
          holdingData.securityName ||
          holdingData.name ||
          "Unknown Security",
      };
    })
    .sort((a, b) => b.value - a.value); // Sort by value (best to worst)

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const isProfit = data.value >= 0;

      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{data.payload.name}</p>
          <p className="text-sm text-gray-600">{data.payload.fullName}</p>
          <p
            className={`text-sm font-medium mt-1 ${isProfit ? "text-green-600" : "text-red-600"}`}
          >
            {isProfit ? "+" : ""}$
            {data.value.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>No holdings to display</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.value >= 0 ? "#10b981" : "#ef4444"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
