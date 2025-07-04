import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface BaseDataPoint {
  rate: number;
  total: number;
  survived: number;
}

interface SurvivalBarChartProps<T extends BaseDataPoint> {
  data: T[];
  displayType: "percentage" | "count";
  xDataKey: Exclude<keyof T, symbol>;
  xTickFormatter?: (value: T[keyof T]) => string;
  colors?: string[]; // For multi-colored bars
  barColor?: string; // For single-colored bar
}

const SurvivalBarChart = <T extends BaseDataPoint>({
  data,
  displayType,
  xDataKey,
  xTickFormatter,
  colors,
  barColor,
}: SurvivalBarChartProps<T>) => {
  const yDataKey = displayType === "percentage" ? "rate" : "survived";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
      >
        <XAxis dataKey={xDataKey} tickFormatter={xTickFormatter} />
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
        <Bar dataKey={yDataKey} fill={barColor}>
          {colors &&
            data.map((_entry, idx) => (
              <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
            ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SurvivalBarChart;
