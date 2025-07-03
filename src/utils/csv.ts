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
  return (data as any[]).map((row) => ({
    pclass: Number(row.pclass),
    survived: Number(row.survived),
    name: row.name,
    sex: row.sex,
    age: row.age === "" ? null : Number(row.age),
    sibsp: Number(row.sibsp),
    parch: Number(row.parch),
    ticket: row.ticket,
    fare: Number(row.fare),
    cabin: row.cabin,
    embarked: row.embarked,
    boat: row.boat,
    body: row.body,
    homeDest: row["home.dest"] || row.homeDest,
  }));
}
