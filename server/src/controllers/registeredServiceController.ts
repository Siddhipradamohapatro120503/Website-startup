import { Response } from 'express';
import { CustomRequest } from '../types';
import RegisteredService from '../models/RegisteredService';

export const getRegisteredServices = async (req: CustomRequest, res: Response) => {
  try {
    // Get the user's email from the authenticated request
    const userEmail = req.user?.email;
    
    if (!userEmail) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Find services only for the current user
    const services = await RegisteredService.find({ userEmail });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
};

export const registerService = async (req: CustomRequest, res: Response) => {
  try {
    // Get the user's email from the authenticated request
    const userEmail = req.user?.email;
    
    if (!userEmail) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const service = new RegisteredService({
      serviceId: req.body.service.id,
      name: req.body.service.name,
      description: req.body.service.description,
      duration: req.body.service.duration,
      category: req.body.service.category,
      features: req.body.service.features,
      technologies: req.body.service.technologies,
      useCases: req.body.service.useCases,
      iconName: req.body.service.icon.name,
      userEmail: userEmail,  // Add user email when registering service
      formData: req.body.formData
    });

    const newService = await service.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
};

export const updateServiceStatus = async (req: CustomRequest, res: Response) => {
  try {
    // Get the user's email from the authenticated request
    const userEmail = req.user?.email;
    
    if (!userEmail) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Find the service for the current user
    const service = await RegisteredService.findOne({ 
      serviceId: req.params.id, 
      userEmail 
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    service.status = req.body.status;
    const updatedService = await service.save();
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
};
