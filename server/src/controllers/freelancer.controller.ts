import { Request, Response } from 'express';
import Freelancer from '../models/freelancer.model';

export const getAllFreelancers = async (req: Request, res: Response) => {
  try {
    const freelancers = await Freelancer.find();
    res.json(freelancers);
  } catch (error) {
    console.error('Error in getAllFreelancers:', error);
    res.status(500).json({ 
      message: error instanceof Error ? error.message : 'An error occurred',
      details: error
    });
  }
};

export const getFreelancerById = async (req: Request, res: Response) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id);
    if (!freelancer) {
      return res.status(404).json({ message: 'Freelancer not found' });
    }
    res.json(freelancer);
  } catch (error) {
    console.error('Error in getFreelancerById:', error);
    res.status(500).json({ 
      message: error instanceof Error ? error.message : 'An error occurred',
      details: error
    });
  }
};

export const createFreelancer = async (req: Request, res: Response) => {
  try {
    console.log('Creating freelancer with data:', req.body);
    const freelancer = new Freelancer(req.body);
    await freelancer.save();
    res.status(201).json(freelancer);
  } catch (error) {
    console.error('Error in createFreelancer:', error);
    if (error instanceof Error && error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation Error',
        details: error.message,
        error: error
      });
    }
    res.status(400).json({ 
      message: error instanceof Error ? error.message : 'An error occurred',
      details: error
    });
  }
};

export const updateFreelancer = async (req: Request, res: Response) => {
  try {
    console.log('Updating freelancer with ID:', req.params.id);
    console.log('Update data:', req.body);
    
    // First validate the update data
    const updateData = req.body;
    if (updateData.skills) {
      updateData.skills = updateData.skills.map((skill: any) => ({
        name: skill.name,
        level: Number(skill.level)
      }));
    }
    if (updateData.projects) {
      updateData.projects = updateData.projects.map((project: any) => ({
        name: project.name,
        status: project.status,
        clientRating: Number(project.clientRating)
      }));
    }

    const freelancer = await Freelancer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true, 
        runValidators: true,
        context: 'query'
      }
    );

    if (!freelancer) {
      return res.status(404).json({ message: 'Freelancer not found' });
    }
    res.json(freelancer);
  } catch (error) {
    console.error('Error in updateFreelancer:', error);
    if (error instanceof Error && error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation Error',
        details: error.message,
        error: error
      });
    }
    res.status(400).json({ 
      message: error instanceof Error ? error.message : 'An error occurred',
      details: error
    });
  }
};

export const deleteFreelancer = async (req: Request, res: Response) => {
  try {
    const freelancer = await Freelancer.findByIdAndDelete(req.params.id);
    if (!freelancer) {
      return res.status(404).json({ message: 'Freelancer not found' });
    }
    res.json({ message: 'Freelancer deleted successfully' });
  } catch (error) {
    console.error('Error in deleteFreelancer:', error);
    res.status(500).json({ 
      message: error instanceof Error ? error.message : 'An error occurred',
      details: error
    });
  }
};
