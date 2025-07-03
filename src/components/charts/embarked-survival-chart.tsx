import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface EmbarkedSurvivalChartProps {
  data: { embarked: string; rate: number; total: number; survived: number }[];
  displayType: "percentage" | "count";
}

const COLORS = ["#38bdf8", "#a3e635", "#fbbf24", "#f472b6"];

const portNames: Record<string, string> = {
  S: "Southampton",
  C: "Cherbourg",
  Q: "Queenstown",
};

const EmbarkedSurvivalChart: React.FC<EmbarkedSurvivalChartProps> = ({
  data,
  displayType,
}) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
      <XAxis dataKey="embarked" tickFormatter={(v) => portNames[v] || v} />
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
      <Bar dataKey={displayType === "percentage" ? "rate" : "survived"}>
        {data.map((entry, idx) => (
          <Cell key={entry.embarked} fill={COLORS[idx % COLORS.length]} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export default EmbarkedSurvivalChart;
