import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/components/layout/dashboard-layout";
import ResponsiveContainer from "@/components/layout/responsive-container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CommentSection from "@/components/comments/comment-section";
import SurvivalRateChart from "@/components/charts/survival-rate-chart";
import SurvivalBySexChart from "@/components/charts/survival-by-sex-chart";
import SurvivalByClassChart from "@/components/charts/survival-by-class-chart";
import AgeDistributionChart from "@/components/charts/age-distribution-chart";
import EmbarkedSurvivalChart from "@/components/charts/embarked-survival-chart";
import FamilySurvivalChart from "@/components/charts/family-survival-chart";
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
    fetch("/src/assets/data/Titanic Dataset.csv")
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

  // Data for each chart
  const survivedCount = data.filter((p) => p.survived === 1).length;
  const totalPassengers = data.length;
  const survivalBySexData = getSurvivalRateBySex(data);
  // Filter for gender (affects Survival by Class and Age Distribution)
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
        <Card>
          <CardHeader>
            <CardTitle>อัตราการรอดชีวิตโดยรวม</CardTitle>
            <CardDescription>
              เปอร์เซ็นต์ของผู้โดยสารที่รอดชีวิต
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] flex flex-col">
            <div className="flex-grow">
              <SurvivalRateChart
                survived={survivedCount}
                total={totalPassengers}
              />
            </div>
            <div className="flex-shrink-0">
              <CommentSection storageKey="comments-survival-rate" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>อัตราการรอดชีวิตตามชั้นโดยสาร</CardTitle>
            <CardDescription>แยกตามชั้นโดยสารของผู้โดยสาร</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] flex flex-col">
            <div className="flex-grow">
              <SurvivalByClassChart
                data={survivalByClassData}
                displayType={displayType}
              />
            </div>
            <div className="flex-shrink-0">
              <CommentSection storageKey="comments-survival-class" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>อัตราการรอดชีวิตตามเพศ</CardTitle>
            <CardDescription>ตามเพศของผู้โดยสาร</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] flex flex-col">
            <div className="flex-grow">
              <SurvivalBySexChart
                data={survivalBySexData}
                displayType={displayType}
              />
            </div>
            <div className="flex-shrink-0">
              <CommentSection storageKey="comments-survival-sex" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>อัตราการรอดชีวิตตามท่าเรือที่ขึ้นเรือ</CardTitle>
            <CardDescription>แยกตามท่าเรือที่ผู้โดยสารขึ้นเรือ</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] flex flex-col">
            <div className="flex-grow">
              <EmbarkedSurvivalChart
                data={embarkedSurvivalData}
                displayType={displayType}
              />
            </div>
            <div className="flex-shrink-0">
              <CommentSection storageKey="comments-embarked" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>อัตราการรอดชีวิตตามจำนวนสมาชิกในครอบครัว</CardTitle>
            <CardDescription>
              แยกตามจำนวนสมาชิกในครอบครัวที่มาด้วย
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] flex flex-col">
            <div className="flex-grow">
              <FamilySurvivalChart
                data={familySurvivalData}
                displayType={displayType}
              />
            </div>
            <div className="flex-shrink-0">
              <CommentSection storageKey="comments-family" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>การกระจายอายุของผู้โดยสาร</CardTitle>
            <CardDescription>แยกตามช่วงอายุ</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] flex flex-col">
            <div className="flex-grow">
              <AgeDistributionChart data={ageDistributionData} />
            </div>
            <div className="flex-shrink-0">
              <CommentSection storageKey="comments-age-dist" />
            </div>
          </CardContent>
        </Card>
      </ResponsiveContainer>
    </DashboardLayout>
  );
}

export default App;
