import { readFile } from "fs/promises";
import { parse } from "csv-parse/sync";

interface DataPoint {
  date: string;
  feature: string;
  age: string;
  gender: string;
  timeSpent: number;
}

export let data: DataPoint[] = [];

export async function loadData() {
  const fileContent = await readFile("data.csv", "utf-8");
  const parsedData = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  data = parsedData.flatMap((row: any) => {
    const { Day, Age, Gender, A, B, C, D, E, F } = row;
    const [day, month, year] = Day.split('/');
    const dateObj = new Date(+year, +month - 1, +day)

    return ["A", "B", "C", "D", "E", "F"].map(feature => ({
      date: dateObj,
      feature,
      age: Age,
      gender: Gender,
      timeSpent: parseInt(row[feature], 10),
    }));
  });
}
