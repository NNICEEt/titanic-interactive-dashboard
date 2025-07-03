import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface FamilySurvivalChartProps {
  data: { familySize: number; rate: number; total: number }[];
}

const FamilySurvivalChart: React.FC<FamilySurvivalChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={120}>
    <BarChart data={data} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
      <XAxis dataKey="familySize" />
      <YAxis domain={[0, 1]} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
      <Tooltip formatter={(v: number) => `${(v * 100).toFixed(1)}%`} />
      <Bar dataKey="rate" fill="#38bdf8" />
    </BarChart>
  </ResponsiveContainer>
);

export default FamilySurvivalChart;
