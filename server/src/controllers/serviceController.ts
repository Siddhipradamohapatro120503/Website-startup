import { Request, Response } from 'express';
import Service from '../models/Service';

export const getServices = async (req: Request, res: Response) => {
  try {
    console.log('Received query params:', req.query);
    
    const { category, search } = req.query;
    
    // Build filter object
    const filter: any = {};
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    console.log('Constructed filter:', filter);

    const services = await Service.find(filter).sort({ createdAt: -1 });
    console.log('Found services:', services.length);
    
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Error fetching services', error: error instanceof Error ? error.message : error });
  }
};

export const getService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    // Check if service with same name already exists
    const existingService = await Service.findOne({ name: req.body.name });
    if (existingService) {
      return res.status(409).json({ 
        message: 'Service already exists', 
        service: existingService 
      });
    }

    const service = new Service({
      ...req.body,
      metrics: {
        views: 0,
        bookings: 0,
        revenue: 0,
        rating: 0
      }
    });
    
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Error updating service', error });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Error deleting service', error });
  }
};
