import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface SurvivalRateChartProps {
  survived: number;
  total: number;
}

const COLORS = ["#38bdf8", "#e5e7eb"];

const SurvivalRateChart: React.FC<SurvivalRateChartProps> = ({
  survived,
  total,
}) => {
  const data = [
    { name: "รอดชีวิต", value: survived },
    { name: "ไม่รอดชีวิต", value: total - survived },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-4xl font-bold">
        {total > 0 ? `${((survived / total) * 100).toFixed(1)}%` : "-"}
      </div>
      <div className="flex-grow w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="90%"
              dataKey="value"
              startAngle={90}
              endAngle={450}
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value} คน`,
                name,
              ]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SurvivalRateChart;
