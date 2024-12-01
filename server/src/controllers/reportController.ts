import { Request, Response } from 'express';
import Report, { IReport } from '../models/Report';

export const getReports = async (req: Request, res: Response) => {
  try {
    const { search, category, dateRange } = req.query;
    let query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) {
      query.category = category;
    }

    if (dateRange) {
      const date = new Date();
      switch (dateRange) {
        case 'last7':
          date.setDate(date.getDate() - 7);
          break;
        case 'last30':
          date.setDate(date.getDate() - 30);
          break;
        case 'last90':
          date.setDate(date.getDate() - 90);
          break;
      }
      query.lastGenerated = { $gte: date };
    }

    const reports = await Report.find(query).sort({ lastGenerated: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error });
  }
};

export const getReport = async (req: Request, res: Response) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching report', error });
  }
};

export const createReport = async (req: Request, res: Response) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error creating report', error });
  }
};

export const updateReport = async (req: Request, res: Response) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error updating report', error });
  }
};

export const deleteReport = async (req: Request, res: Response) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting report', error });
  }
};

export const generateReport = async (req: Request, res: Response) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Update status to Processing
    report.status = 'Processing';
    await report.save();

    // Simulate report generation
    setTimeout(async () => {
      try {
        report.status = 'Completed';
        report.lastGenerated = new Date();
        report.data = {
          // Sample generated data
          metrics: {
            totalRevenue: Math.random() * 100000,
            userCount: Math.floor(Math.random() * 1000),
            averageRating: (Math.random() * 5).toFixed(1)
          },
          trends: {
            daily: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
            weekly: Array.from({ length: 4 }, () => Math.floor(Math.random() * 1000))
          }
        };
        await report.save();
      } catch (error) {
        report.status = 'Failed';
        await report.save();
      }
    }, 5000);

    res.json({ message: 'Report generation started', report });
  } catch (error) {
    res.status(500).json({ message: 'Error generating report', error });
  }
};
