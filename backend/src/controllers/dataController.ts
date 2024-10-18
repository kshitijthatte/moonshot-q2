import { Request, Response } from "express";
import { data } from "../utils/loadData";

export const getRawData = (req: Request, res: Response) => {
  res.json(data.slice(0, 100)); 
};

export const getData = (req: Request, res: Response) => {
  const { startDate, endDate, age, gender } = req.query;
  let filteredData = data;
  if (startDate && endDate && typeof startDate === 'string' && typeof endDate === 'string') {
    filteredData = filteredData.filter(
      d => new Date(d.date) >= new Date(startDate) && new Date(d.date) <= new Date(endDate)
    );
  }

  if (age) {
    filteredData = filteredData.filter(d => d.age === age);
  }

  if (gender) {
    filteredData = filteredData.filter(d => d.gender === gender);
  }

  const aggregatedData = filteredData.reduce((acc, curr) => {
    if (!acc[curr.feature]) {
      acc[curr.feature] = 0;
    }
    acc[curr.feature] += curr.timeSpent;
    return acc;
  }, {} as Record<string, number>);

  res.json(
    Object.entries(aggregatedData).map(([feature, timeSpent]) => ({
      feature,
      timeSpent,
    }))
  );
};
