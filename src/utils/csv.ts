import Papa from "papaparse";

export interface Passenger {
  pclass: number;
  survived: number;
  name: string;
  sex: string;
  age: number | null;
  sibsp: number;
  parch: number;
  ticket: string;
  fare: number;
  cabin: string;
  embarked: string;
  boat: string;
  body: string;
  homeDest: string;
}

export function parseTitanicCSV(csvText: string): Passenger[] {
  const { data } = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });

  // Manually cast and clean the data to match the Passenger interface
  return (data as Record<string, unknown>[]).map(
    (row) =>
      ({
        pclass: Number(row.pclass ?? 0),
        survived: Number(row.survived ?? 0),
        name: String(row.name ?? ""),
        sex: String(row.sex ?? ""),
        age: row.age ? Number(row.age) : null,
        sibsp: Number(row.sibsp ?? 0),
        parch: Number(row.parch ?? 0),
        ticket: String(row.ticket ?? ""),
        fare: Number(row.fare ?? 0),
        cabin: String(row.cabin ?? ""),
        embarked: String(row.embarked ?? ""),
        boat: String(row.boat ?? ""),
        body: String(row.body ?? ""),
        homeDest: String(row.homeDest ?? ""),
      } as Passenger)
  );
}
