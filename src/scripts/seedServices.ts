import { serviceCategories } from '../data/services';

interface ServiceData {
  name: string;
  description: string;
  category: string;
  features: string[];
  status: 'active' | 'inactive' | 'draft';
  pricing: {
    base: number;
    premium: number;
    enterprise: number;
  };
}

interface SeedResult {
  created: string[];
  skipped: string[];
  failed: string[];
}

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

async function seedServices(): Promise<SeedResult> {
  const result: SeedResult = {
    created: [],
    skipped: [],
    failed: []
  };

  try {
    // Get auth token (you'll need to be logged in as admin)
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please log in as admin.');
    }

    console.log('Starting service seeding...');
    
    for (const category of serviceCategories) {
      console.log(`Processing category: ${category.title}`);
      
      for (const service of category.services) {
        // Prepare service data
        const serviceData: ServiceData = {
          name: service.name,
          description: service.description || `Professional ${service.name} services`,
          category: category.title,
          features: service.features,
          status: 'active',
          pricing: {
            base: 299,      // Default pricing, adjust as needed
            premium: 599,
            enterprise: 999
          }
        };

        try {
          // Create service
          const response = await fetch(`${BASE_URL}/services`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(serviceData)
          });

          const data = await response.json();

          if (response.status === 409) {
            // Service already exists
            console.log(`Skipped duplicate service: ${service.name}`);
            result.skipped.push(service.name);
          } else if (!response.ok) {
            throw new Error(data.message || 'Failed to create service');
          } else {
            console.log(`Created service: ${service.name}`);
            result.created.push(service.name);
          }
        } catch (error) {
          console.error(`Error creating service ${service.name}:`, error);
          result.failed.push(service.name);
          continue;
        }
      }
    }

    console.log('Service seeding completed!');
    return result;
  } catch (error) {
    console.error('Error in seed script:', error);
    throw error;
  }
}

// Add a button to ServiceManagement component to trigger seeding
export const seedServicesFromLanding = async () => {
  try {
    const result = await seedServices();
    
    // Create a detailed message
    const messages: string[] = [];
    if (result.created.length > 0) {
      messages.push(`Created ${result.created.length} services`);
    }
    if (result.skipped.length > 0) {
      messages.push(`Skipped ${result.skipped.length} existing services`);
    }
    if (result.failed.length > 0) {
      messages.push(`Failed to create ${result.failed.length} services`);
    }

    return { 
      success: true, 
      message: messages.join(', '),
      details: result
    };
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to seed services',
      details: {
        created: [],
        skipped: [],
        failed: []
      }
    };
  }
};
