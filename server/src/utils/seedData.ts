import User from '../models/User';
import Service from '../models/Service';
import mongoose from 'mongoose';

const initialServices = [
  {
    name: 'Business Consulting',
    description: 'Expert guidance for your business growth and strategy',
    price: 299,
    duration: '3 months',
    category: 'Consulting',
    features: [
      'Weekly strategy sessions',
      'Market analysis',
      'Growth planning',
      'Performance tracking'
    ]
  },
  {
    name: 'Digital Marketing',
    description: 'Comprehensive digital marketing solutions',
    price: 199,
    duration: '1 month',
    category: 'Marketing',
    features: [
      'Social media management',
      'Content creation',
      'SEO optimization',
      'Analytics reporting'
    ]
  },
  {
    name: 'Web Development',
    description: 'Professional web development services',
    price: 599,
    duration: '2 months',
    category: 'Development',
    features: [
      'Custom design',
      'Responsive development',
      'CMS integration',
      'Performance optimization'
    ]
  }
];

export const seedAdminUser = async () => {
  try {
    // Check if admin user already exists
    const adminExists = await User.findOne({ email: 'admin@example.com' });

    if (!adminExists) {
      // Create admin user
      const adminUser = new User({
        email: 'admin@example.com',
        password: 'admin123', // This will be hashed by the User model pre-save hook
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        isActive: true,
      });

      await adminUser.save();
      console.log('Admin user created successfully');
      console.log('Admin credentials:');
      console.log('Email: admin@example.com');
      console.log('Password: admin123');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};

export const seedServices = async () => {
  try {
    // Check if services exist
    const servicesCount = await Service.countDocuments();

    if (servicesCount === 0) {
      // Create initial services
      await Service.insertMany(initialServices);
      console.log('Initial services created successfully');
    } else {
      console.log('Services already exist');
    }
  } catch (error) {
    console.error('Error seeding services:', error);
  }
};

export const initializeDatabase = async () => {
  try {
    await seedAdminUser();
    await seedServices();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};
