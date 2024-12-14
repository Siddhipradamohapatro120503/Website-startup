import { Request, Response } from 'express';
import Freelancer from '../models/Freelancer';

export const getAllFreelancers = async (req: Request, res: Response) => {
  try {
    const freelancers = await Freelancer.find().select('-password');
    
    // Transform the data to match the frontend interface
    const transformedFreelancers = freelancers.map(freelancer => ({
      _id: freelancer._id,
      email: freelancer.email,
      firstName: freelancer.firstName,
      lastName: freelancer.lastName,
      name: `${freelancer.firstName} ${freelancer.lastName}`,
      title: freelancer.title,
      bio: freelancer.bio,
      phone: freelancer.phone,
      location: freelancer.location,
      avatar: freelancer.avatar,
      skills: freelancer.skills,
      projects: freelancer.projects,
      hourlyRate: freelancer.hourlyRate,
      availability: {
        status: freelancer.availability.status,
        nextAvailable: freelancer.availability.nextAvailable
      },
      metrics: {
        completedProjects: freelancer.metrics.completedProjects,
        totalEarnings: freelancer.metrics.totalEarnings,
        avgResponseTime: freelancer.metrics.avgResponseTime
      },
      rating: freelancer.rating,
      isActive: freelancer.isActive
    }));

    res.json(transformedFreelancers);
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

export const updateFreelancerProfile = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - user is added by auth middleware
    const freelancerId = req.user.id;
    const updateData = req.body;

    // Remove sensitive fields that shouldn't be updated directly
    delete updateData.password;
    delete updateData.email;
    delete updateData.role;

    const updatedFreelancer = await Freelancer.findByIdAndUpdate(
      freelancerId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedFreelancer) {
      return res.status(404).json({ message: 'Freelancer not found' });
    }

    res.json(updatedFreelancer);
  } catch (error) {
    console.error('Error updating freelancer profile:', error);
    res.status(500).json({ 
      message: error instanceof Error ? error.message : 'Failed to update profile',
      error 
    });
  }
};

export const getFreelancerProfile = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - user is added by auth middleware
    const freelancerId = req.user.id;

    const freelancer = await Freelancer.findById(freelancerId)
      .select('-password')
      .populate('skills')
      .populate('projects');

    if (!freelancer) {
      return res.status(404).json({ message: 'Freelancer not found' });
    }

    res.json(freelancer);
  } catch (error) {
    console.error('Error fetching freelancer profile:', error);
    res.status(500).json({ 
      message: error instanceof Error ? error.message : 'Failed to fetch profile',
      error 
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
