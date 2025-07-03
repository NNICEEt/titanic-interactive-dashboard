import { useEffect, useState } from "react";
import DashboardLayout from "./components/layout/DashboardLayout";
import ResponsiveContainer from "./components/layout/ResponsiveContainer";
import Card from "./components/design-system/Card";
import CommentSection from "./components/comments/CommentSection";
import SurvivalRateChart from "./components/charts/SurvivalRateChart";
import SurvivalBySexChart from "./components/charts/SurvivalBySexChart";
import SurvivalByClassChart from "./components/charts/SurvivalByClassChart";
import AgeDistributionChart from "./components/charts/AgeDistributionChart";
import EmbarkedSurvivalChart from "./components/charts/EmbarkedSurvivalChart";
import FamilySurvivalChart from "./components/charts/FamilySurvivalChart";
import { parseTitanicCSV, type Passenger } from "./utils/csv";
import {
  getSurvivalRateBySex,
  getSurvivalRateByClass,
  getAgeDistribution,
  getEmbarkedSurvival,
  getFamilySurvival,
} from "./utils/dataTransform";

function App() {
  const [data, setData] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          Loading data...
        </div>
      </DashboardLayout>
    );
  }
  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh] text-xl text-red-500">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  // Data for each chart
  const survived = data.filter((p) => p.survived === 1).length;
  const total = data.length;
  const bySex = getSurvivalRateBySex(data);
  const byClass = getSurvivalRateByClass(data);
  const ageDist = getAgeDistribution(data);
  const embarked = getEmbarkedSurvival(data);
  const family = getFamilySurvival(data);

  return (
    <DashboardLayout>
      <ResponsiveContainer>
        {/* Survival Rate */}
        <Card title="Survival Rate">
          <SurvivalRateChart survived={survived} total={total} />
          <CommentSection storageKey="comments-survival-rate" />
        </Card>
        {/* Survival by Sex */}
        <Card title="Survival by Sex">
          <SurvivalBySexChart data={bySex} />
          <CommentSection storageKey="comments-survival-sex" />
        </Card>
        {/* Survival by Class */}
        <Card title="Survival by Class">
          <SurvivalByClassChart data={byClass} />
          <CommentSection storageKey="comments-survival-class" />
        </Card>
        {/* Age Distribution */}
        <Card title="Age Distribution">
          <AgeDistributionChart data={ageDist} />
          <CommentSection storageKey="comments-age-dist" />
        </Card>
        {/* Embarked vs Survival */}
        <Card title="Embarked vs Survival">
          <EmbarkedSurvivalChart data={embarked} />
          <CommentSection storageKey="comments-embarked" />
        </Card>
        {/* Family (SibSp, Parch) */}
        <Card title="Family (SibSp, Parch)">
          <FamilySurvivalChart data={family} />
          <CommentSection storageKey="comments-family" />
        </Card>
      </ResponsiveContainer>
    </DashboardLayout>
  );
}

export default App;
