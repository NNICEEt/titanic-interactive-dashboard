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

interface SurvivalByClassChartProps {
  data: { pclass: number; rate: number; total: number }[];
}

const COLORS = ["#38bdf8", "#a3e635", "#fbbf24"];

const SurvivalByClassChart: React.FC<SurvivalByClassChartProps> = ({
  data,
}) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
      <XAxis dataKey="pclass" tickFormatter={(v) => `ชั้น ${v}`} />
      <YAxis domain={[0, 1]} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
      <Tooltip formatter={(v: number) => `${(v * 100).toFixed(1)}%`} />
      <Bar dataKey="rate">
        {data.map((entry, idx) => (
          <Cell key={entry.pclass} fill={COLORS[idx % COLORS.length]} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export default SurvivalByClassChart;
