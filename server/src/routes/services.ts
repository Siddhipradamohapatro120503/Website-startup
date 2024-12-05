import express, { Request, Response } from 'express';
import RegisteredService from '../models/RegisteredService';

const router = express.Router();

// Get all registered services
router.get('/services', async (req: Request, res: Response) => {
  try {
    const services = await RegisteredService.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

// Register a new service
router.post('/services', async (req: Request, res: Response) => {
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
    formData: req.body.formData
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

// Update service status
router.patch('/services/:id', async (req: Request, res: Response) => {
  try {
    const service = await RegisteredService.findOne({ serviceId: req.params.id });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    service.status = req.body.status;
    const updatedService = await service.save();
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

export default router;
