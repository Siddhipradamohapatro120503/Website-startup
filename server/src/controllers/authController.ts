import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import Freelancer from '../models/Freelancer';

const generateToken = (user: any) => {
  return jwt.sign(
    { 
      id: user._id,
      email: user.email,
      role: user.role 
    },
    process.env.JWT_SECRET || 'your-secret-key-here',
    { expiresIn: '24h' }
  );
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      email,
      password,
      firstName,
      lastName,
    });

    await user.save();

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

export const freelancerRegister = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      title,
      bio,
      skills,
      hourlyRate,
    } = req.body;

    // Check if user already exists
    const existingUser = await Freelancer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Validate skills array
    if (!Array.isArray(skills)) {
      return res.status(400).json({ message: 'Skills must be an array' });
    }

    // Validate each skill
    for (const skill of skills) {
      if (!skill.name || typeof skill.name !== 'string') {
        return res.status(400).json({ message: 'Each skill must have a name' });
      }
      if (!Number.isInteger(skill.level) || skill.level < 0 || skill.level > 100) {
        return res.status(400).json({ 
          message: 'Skill level must be a whole number between 0 and 100',
          skill: skill.name
        });
      }
    }

    // Create new freelancer
    const freelancer = new Freelancer({
      email,
      password,
      firstName,
      lastName,
      title,
      bio,
      skills,
      hourlyRate,
      role: 'freelancer',
      availability: {
        status: 'available'
      },
      metrics: {
        completedProjects: 0,
        totalEarnings: 0
      },
      rating: 0,
      isActive: true
    });

    await freelancer.save();

    // Generate token
    const token = generateToken(freelancer);

    // Return user data without password
    const freelancerData = {
      _id: freelancer._id,
      email: freelancer.email,
      firstName: freelancer.firstName,
      lastName: freelancer.lastName,
      title: freelancer.title,
      bio: freelancer.bio,
      skills: freelancer.skills,
      hourlyRate: freelancer.hourlyRate,
      role: freelancer.role,
      availability: freelancer.availability,
      metrics: freelancer.metrics,
      rating: freelancer.rating,
      isActive: freelancer.isActive
    };

    res.status(201).json({
      token,
      user: freelancerData,
    });
  } catch (error) {
    console.error('Freelancer registration error:', error);
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Registration failed',
      error,
    });
  }
};

export const freelancerLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find freelancer
    const freelancer = await Freelancer.findOne({ email });
    if (!freelancer) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await freelancer.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(freelancer);

    res.json({
      token,
      user: {
        id: freelancer._id,
        email: freelancer.email,
        firstName: freelancer.firstName,
        lastName: freelancer.lastName,
        title: freelancer.title,
        bio: freelancer.bio,
        skills: freelancer.skills,
        hourlyRate: freelancer.hourlyRate,
        availability: freelancer.availability,
        metrics: freelancer.metrics,
        rating: freelancer.rating,
        role: freelancer.role,
      },
    });
  } catch (error) {
    console.error('Freelancer login error:', error);
    res.status(500).json({ 
      message: 'Error logging in', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};
