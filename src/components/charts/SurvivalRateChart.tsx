import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface SurvivalRateChartProps {
  survived: number;
  total: number;
}

const COLORS = ["#38bdf8", "#e5e7eb"];

const SurvivalRateChart: React.FC<SurvivalRateChartProps> = ({ survived, total }) => {
  const data = [
    { name: "Survived", value: survived },
    { name: "Did Not Survive", value: total - survived },
  ];
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="text-4xl font-bold mb-2">
        {total > 0 ? `${((survived / total) * 100).toFixed(1)}%` : "-"}
      </div>
      <ResponsiveContainer width="100%" height={120}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={34}
            outerRadius={48}
            dataKey="value"
            startAngle={90}
            endAngle={450}
          >
            {data.map((_, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex gap-2 text-xs mt-1">
        <span className="text-sky-500 font-medium">■ Survived</span>
        <span className="text-gray-400 font-medium">■ Did Not Survive</span>
      </div>
    </div>
  );
};

export default SurvivalRateChart;
