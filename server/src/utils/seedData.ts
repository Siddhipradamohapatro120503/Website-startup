import User from '../models/User';
import Service from '../models/Service';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

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
    // List of admin users with their details
    const adminUsers = [
      {
        email: 'admin@example.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'Admin'
      },
      {
        email: 'abhay@admin.com',
        password: 'admin123',
        firstName: 'Abhay',
        lastName: 'Admin'
      },
      {
        email: 'siddhi@admin.com',
        password: 'Siddhi@2003',
        firstName: 'siddhi',
        lastName: 'Admin'
      }
    ];
    
    for (const adminData of adminUsers) {
      const adminExists = await User.findOne({ email: adminData.email });

      if (!adminExists) {
        // Create admin user using the User model
        const adminUser = new User({
          ...adminData,
          role: 'admin',
          isActive: true,
        });

        // Save using the model to trigger the pre-save hook
        await adminUser.save();
        
        console.log(`Admin user ${adminData.email} created successfully`);
        console.log('Admin credentials:');
        console.log(`Email: ${adminData.email}`);
        console.log(`Password: ${adminData.password}`);
      } else {
        // If user exists but password might be wrong, update it
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(adminData.password, salt);
        
        await User.findOneAndUpdate(
          { email: adminData.email },
          { 
            $set: { 
              password: hashedPassword,
              role: 'admin',
              isActive: true,
              firstName: adminData.firstName,
              lastName: adminData.lastName
            }
          }
        );
        
        console.log(`Admin user ${adminData.email} updated`);
      }
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
