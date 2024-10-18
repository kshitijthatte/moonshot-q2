import { Request, Response } from 'express';
import Chart from '../models/Chart';

interface AuthenticatedRequest extends Request {
  user?: any;  
}

export const saveChart = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const chart = new Chart({
      userId: req.user.id,
      filters: req.body.filters,
    });
    await chart.save();
    res.json({ id: chart._id });
  } catch (error) {
    console.log(error)
    res.status(500).send('Error saving chart');
  }
};

export const getSharedChart = async (req: Request, res: Response) :Promise<void> => {
  try {
    const chart = await Chart.findById(req.params.id);
    if (!chart) {
       res.status(404).send('Chart not found');
       return;
    }
    res.json(chart.filters);
  } catch (error) {
    res.status(500).send('Error retrieving chart');
  }
};
