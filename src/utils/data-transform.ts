import type { Passenger } from "./csv";

// Survival Rate (0-1)
export function getSurvivalRate(data: Passenger[]): number {
  if (!data.length) return 0;
  const survived = data.filter((p) => p.survived === 1).length;
  return survived / data.length;
}

// Survival Rate by Sex
export function getSurvivalRateBySex(data: Passenger[]) {
  const grouped: Record<string, { survived: number; total: number }> = {};
  data.forEach((p) => {
    if (!grouped[p.sex]) grouped[p.sex] = { survived: 0, total: 0 };
    grouped[p.sex].total++;
    if (p.survived === 1) grouped[p.sex].survived++;
  });
  return Object.entries(grouped).map(([sex, { survived, total }]) => ({
    sex,
    rate: total ? survived / total : 0,
    total,
    survived,
  }));
}

// Survival Rate by Class
export function getSurvivalRateByClass(data: Passenger[]) {
  const grouped: Record<number, { survived: number; total: number }> = {};
  data.forEach((p) => {
    if (!grouped[p.pclass]) grouped[p.pclass] = { survived: 0, total: 0 };
    grouped[p.pclass].total++;
    if (p.survived === 1) grouped[p.pclass].survived++;
  });
  return Object.entries(grouped).map(([cls, { survived, total }]) => ({
    pclass: Number(cls),
    rate: total ? survived / total : 0,
    total,
    survived,
  }));
}

// Age Distribution (histogram)
export function getAgeDistribution(data: Passenger[], binSize = 10) {
  const ages = data
    .map((p) => p.age)
    .filter((a) => typeof a === "number") as number[];
  if (!ages.length) return [];
  const max = Math.ceil(Math.max(...ages));
  const bins: { range: string; count: number }[] = [];
  for (let start = 0; start < max; start += binSize) {
    const end = start + binSize;
    bins.push({
      range: `${start}-${end - 1}`,
      count: ages.filter((a) => a >= start && a < end).length,
    });
  }
  return bins;
}

// Embarked vs Survival
export function getEmbarkedSurvival(data: Passenger[]) {
  const grouped: Record<string, { survived: number; total: number }> = {};
  data.forEach((p) => {
    const port = p.embarked || "ระบุไม่ได้";
    if (!grouped[port]) grouped[port] = { survived: 0, total: 0 };
    grouped[port].total++;
    if (p.survived === 1) grouped[port].survived++;
  });

  return Object.entries(grouped)
    .sort((a, b) => b[1].total - a[1].total)
    .map(([embarked, { survived, total }]) => ({
      embarked,
      rate: total ? survived / total : 0,
      total,
      survived,
    }));
}

// Family (SibSp, Parch) vs Survival
export function getFamilySurvival(data: Passenger[]) {
  // Group by (sibsp + parch + 1) size to include the passenger
  const grouped: Record<number, { survived: number; total: number }> = {};
  data.forEach((p) => {
    const familySize = (p.sibsp ?? 0) + (p.parch ?? 0);
    if (!grouped[familySize]) grouped[familySize] = { survived: 0, total: 0 };
    grouped[familySize].total++;
    if (p.survived === 1) grouped[familySize].survived++;
  });
  return Object.entries(grouped)
    .map(([size, { survived, total }]) => ({
      familySize: Number(size),
      rate: total ? survived / total : 0,
      total,
      survived,
    }))
    .filter((item) => item.rate > 0) // Filter out families with 0% survival rate
    .sort((a, b) => a.familySize - b.familySize); // Sort by family size
}
