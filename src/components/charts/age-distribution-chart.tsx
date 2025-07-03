import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AgeDistributionChartProps {
  data: { range: string; count: number }[];
}

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({
  data,
}) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
      <XAxis dataKey="range" interval={0} angle={-45} textAnchor="end" height={50} />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Bar dataKey="count" fill="#38bdf8" />
    </BarChart>
  </ResponsiveContainer>
);

export default AgeDistributionChart;
