import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FamilySurvivalChartProps {
  data: { familySize: number; rate: number; total: number; survived: number }[];
  displayType: "percentage" | "count";
}

const FamilySurvivalChart: React.FC<FamilySurvivalChartProps> = ({ data, displayType }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
      <XAxis dataKey="familySize" />
      <YAxis
        domain={displayType === "percentage" ? [0, 1] : [0, "dataMax"]}
        tickFormatter={(v) =>
          displayType === "percentage" ? `${Math.round(v * 100)}%` : v
        }
      />
      <Tooltip
        formatter={(value: number, _: string, props) => {
          if (displayType === "percentage") {
            return [`${(value * 100).toFixed(1)}%`, "อัตราการรอดชีวิต"];
          }
          return [
            `${value} / ${props.payload.total} คน`,
            "รอดชีวิต / ทั้งหมด",
          ];
        }}
      />
      <Bar dataKey={displayType === "percentage" ? "rate" : "survived"} fill="#38bdf8" />
    </BarChart>
  </ResponsiveContainer>
);

export default FamilySurvivalChart;
