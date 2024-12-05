const express = require('express');
const router = express.Router();
const RegisteredService = require('../models/registeredService');

// Get all registered services
router.get('/services', async (req, res) => {
  try {
    const services = await RegisteredService.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register a new service
router.post('/services', async (req, res) => {
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
    res.status(400).json({ message: error.message });
  }
});

// Update service status
router.patch('/services/:id', async (req, res) => {
  try {
    const service = await RegisteredService.findOne({ serviceId: req.params.id });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    service.status = req.body.status;
    const updatedService = await service.save();
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
