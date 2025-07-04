import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/components/layout/dashboard-layout";
import ResponsiveContainer from "@/components/layout/responsive-container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SurvivalRateChart from "@/components/charts/survival-rate-chart";
import SurvivalBarChart from "@/components/charts/survival-bar-chart";
import ChartCard from "@/components/ui/chart-card";
import AgeDistributionChart from "@/components/charts/age-distribution-chart";

import { parseTitanicCSV, type Passenger } from "@/utils/csv";
import {
  getSurvivalRateBySex,
  getSurvivalRateByClass,
  getAgeDistribution,
  getEmbarkedSurvival,
  getFamilySurvival,
} from "@/utils/data-transform";

function App() {
  const [data, setData] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gender, setGender] = useState<"all" | "male" | "female">("all");
  const [displayType, setDisplayType] = useState<"percentage" | "count">(
    "percentage"
  );

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.BASE_URL}titanic-dataset.csv`)
      .then((res) => res.text())
      .then((csv) => {
        setData(parseTitanicCSV(csv));
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load Titanic data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh] text-xl text-gray-400">
          กำลังโหลดข้อมูล...
        </div>
      </DashboardLayout>
    );
  }
  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh] text-xl text-red-500">
          ไม่สามารถโหลดข้อมูล Titanic ได้
        </div>
      </DashboardLayout>
    );
  }

  const survivedCount = data.filter((p) => p.survived === 1).length;
  const totalPassengers = data.length;
  const survivalBySexData = getSurvivalRateBySex(data);

  const filteredData =
    gender === "all" ? data : data.filter((p) => p.sex === gender);
  const survivalByClassData = getSurvivalRateByClass(filteredData);
  const ageDistributionData = getAgeDistribution(filteredData);
  const embarkedSurvivalData = getEmbarkedSurvival(filteredData);
  const familySurvivalData = getFamilySurvival(data);

  return (
    <DashboardLayout>
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="gender-filter" className="text-sm font-medium">
          กรองตามเพศ:
        </label>
        <Select
          value={gender}
          onValueChange={(value) =>
            setGender(value as "all" | "male" | "female")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="เลือกเพศ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทั้งหมด</SelectItem>
            <SelectItem value="male">ชาย</SelectItem>
            <SelectItem value="female">หญิง</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Switch
            id="display-type-switch"
            checked={displayType === "count"}
            onCheckedChange={(checked) =>
              setDisplayType(checked ? "count" : "percentage")
            }
          />
          <Label htmlFor="display-type-switch">แสดงเป็นจำนวน</Label>
        </div>
      </div>
      <ResponsiveContainer>
        <ChartCard
          title="อัตราการรอดชีวิตโดยรวม"
          description="เปอร์เซ็นต์ของผู้โดยสารที่รอดชีวิต"
          storageKey="comments-survival-rate"
        >
          <SurvivalRateChart survived={survivedCount} total={totalPassengers} />
        </ChartCard>
        <ChartCard
          title="อัตราการรอดชีวิตตามชั้นโดยสาร"
          description="แยกตามชั้นที่นั่งของผู้โดยสาร (Pclass)"
          storageKey="comments-survival-class"
        >
          <SurvivalBarChart
            data={survivalByClassData}
            displayType={displayType}
            xDataKey="pclass"
            xTickFormatter={(v: number) => `ชั้น ${v}`}
            colors={["#38bdf8", "#a3e635", "#fbbf24"]}
          />
        </ChartCard>
        <ChartCard
          title="อัตราการรอดชีวิตตามเพศ"
          description="ตามเพศของผู้โดยสาร"
          storageKey="comments-survival-sex"
        >
          <SurvivalBarChart
            data={survivalBySexData}
            displayType={displayType}
            xDataKey="sex"
            xTickFormatter={(v: string | number) => {
              if (typeof v !== "string") return String(v);
              return v === "male" ? "ชาย" : "หญิง";
            }}
            barColor="#f472b6"
          />
        </ChartCard>
        <ChartCard
          title="อัตราการรอดชีวิตตามท่าเรือที่ขึ้น"
          description="แยกตามท่าเรือที่ผู้โดยสารขึ้นเรือ"
          storageKey="comments-embarked"
        >
          <SurvivalBarChart
            data={embarkedSurvivalData}
            displayType={displayType}
            xDataKey="embarked"
            xTickFormatter={(v: string | number) => {
              if (typeof v !== "string") return String(v);

              const label = {
                S: "Southampton",
                C: "Cherbourg",
                Q: "Queenstown",
              };
              return label[v as keyof typeof label] || "ระบุไม่ได้";
            }}
            colors={["#34d399", "#fb923c", "#818cf8"]}
          />
        </ChartCard>
        <ChartCard
          title="อัตราการรอดชีวิตตามจำนวนสมาชิกในครอบครัว"
          description="แยกตามจำนวนสมาชิกในครอบครัวที่มาด้วย"
          storageKey="comments-family"
        >
          <SurvivalBarChart
            data={familySurvivalData}
            displayType={displayType}
            xDataKey="familySize"
            xTickFormatter={(v: number) => `${v} คน`}
            colors={["#22d3ee", "#8b5cf6", "#ec4899", "#f97316", "#10b981"]}
          />
        </ChartCard>
        <ChartCard
          title="การกระจายอายุของผู้โดยสาร"
          description="แยกตามช่วงอายุ"
          storageKey="comments-age-dist"
        >
          <AgeDistributionChart data={ageDistributionData} />
        </ChartCard>
      </ResponsiveContainer>
    </DashboardLayout>
  );
}

export default App;
