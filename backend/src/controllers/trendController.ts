import { Request, Response } from "express";
import { data } from "../utils/loadData";

export const getTrend = (req: Request, res: Response) => {
  const { feature, startDate, endDate, age, gender } = req.query;

  let filteredData = data.filter(d => d.feature === feature);

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

  const trendData = filteredData.reduce((acc, curr) => {
    if (!acc[curr.date]) {
      acc[curr.date] = 0;
    }
    acc[curr.date] += curr.timeSpent;
    return acc;
  }, {} as Record<string, number>);

  res.json(
    Object.entries(trendData).map(([date, timeSpent]) => ({ date, timeSpent }))
  );
};
