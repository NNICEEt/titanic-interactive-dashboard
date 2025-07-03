import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface SurvivalBySexChartProps {
  data: { sex: string; rate: number; total: number }[];
}

const COLORS = ["#38bdf8", "#f472b6"];

const SurvivalBySexChart: React.FC<SurvivalBySexChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={120}>
    <BarChart data={data} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
      <XAxis dataKey="sex" tick={{ fontSize: 12 }} />
      <YAxis domain={[0, 1]} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
      <Tooltip formatter={(v: number) => `${(v * 100).toFixed(1)}%`} />
      <Bar dataKey="rate">
        {data.map((entry, idx) => (
          <Cell key={entry.sex} fill={COLORS[idx % COLORS.length]} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export default SurvivalBySexChart;
