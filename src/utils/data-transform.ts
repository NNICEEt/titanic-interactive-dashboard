import type { Passenger } from "./csv";

// Survival Rate (0-1)
export function getSurvivalRate(data: Passenger[]): number {
  if (!data.length) return 0;

  const survived = data.filter((passenger) => passenger.survived === 1).length;

  return survived / data.length;
}

// Survival Rate by Sex
export function getSurvivalRateBySex(data: Passenger[]) {
  const grouped: Record<string, { survived: number; total: number }> = {};

  data.forEach((passenger) => {
    if (!grouped[passenger.sex]) grouped[passenger.sex] = { survived: 0, total: 0 };
    grouped[passenger.sex].total++;
    if (passenger.survived === 1) grouped[passenger.sex].survived++;
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
  data.forEach((passenger) => {
    if (!grouped[passenger.pclass])
      grouped[passenger.pclass] = { survived: 0, total: 0 };
    grouped[passenger.pclass].total++;
    if (passenger.survived === 1) grouped[passenger.pclass].survived++;
  });
  return Object.entries(grouped).map(
    ([passengerClass, { survived, total }]) => ({
      pclass: Number(passengerClass),
      rate: total ? survived / total : 0,
      total,
      survived,
    })
  );
}

// Age Distribution (histogram)
export function getAgeDistribution(data: Passenger[], binSize = 10) {
  const ages = data
    .map((passenger) => passenger.age)
    .filter((age) => typeof age === "number") as number[];

  if (!ages.length) return [];
  const max = Math.ceil(Math.max(...ages));
  const bins: { range: string; count: number }[] = [];

  for (let start = 0; start < max; start += binSize) {
    const end = start + binSize;
    bins.push({
      range: `${start}-${end - 1}`,
      count: ages.filter((age) => age >= start && age < end).length,
    });
  }

  return bins;
}

// Embarked vs Survival
export function getEmbarkedSurvival(data: Passenger[]) {
  const grouped: Record<string, { survived: number; total: number }> = {};

  data.forEach((passenger) => {
    const port = passenger.embarked || "ระบุไม่ได้";
    if (!grouped[port]) grouped[port] = { survived: 0, total: 0 };
    grouped[port].total++;
    if (passenger.survived === 1) grouped[port].survived++;
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

  data.forEach((passenger) => {
    const familySize = (passenger.sibsp ?? 0) + (passenger.parch ?? 0);
    if (!grouped[familySize]) grouped[familySize] = { survived: 0, total: 0 };
    grouped[familySize].total++;
    if (passenger.survived === 1) grouped[familySize].survived++;
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
