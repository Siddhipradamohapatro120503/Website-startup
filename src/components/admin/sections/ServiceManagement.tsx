import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  VStack,
  HStack,
  Text,
  Button,
  IconButton,
  useColorModeValue,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  useToast, // Replace 'toast' with 'useToast'
  Textarea
} from '@chakra-ui/react';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiGlobe,
  FiDollarSign,
  FiBarChart,
  FiCalendar,
  FiDatabase
} from 'react-icons/fi';

import { seedServicesFromLanding } from '../../../scripts/seedServices';

interface SubCategory {
  name: string;
}

interface Schedule {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface ServiceMetrics {
  views?: number;
  bookings?: number;
  rating?: number;
}

interface Service {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  status?: 'active' | 'inactive' | 'draft';
  pricing?: {
    base?: number;
    premium?: number;
    enterprise?: number;
  };
  metrics?: ServiceMetrics;
  subCategories?: SubCategory[];
  availability?: {
    regions: string[];
    schedule: Schedule[];
  };
  description?: string;
}

// Mock data
const mockServices: Service[] = [];

const ServiceManagement: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const toast = useToast(); // Initialize the useToast hook

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      if (filterCategory !== 'all') {
        params.append('category', filterCategory);
      }

      console.log('Fetching services with params:', params.toString());

      const response = await fetch(`http://localhost:5000/api/services?${params.toString()}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error(errorData || 'Failed to fetch services');
      }
      
      const data = await response.json();
      console.log('Received services:', data);
      
      setServices(data);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching services');
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchServices();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, filterCategory]);

  useEffect(() => {
    fetchServices();
  }, []);

  const renderServices = () => {
    if (isLoading) {
      return (
        <Box textAlign="center" py={8}>
          <Text>Loading services...</Text>
        </Box>
      );
    }

    if (error) {
      return (
        <Box textAlign="center" py={8} color="red.500">
          <Text>{error}</Text>
        </Box>
      );
    }

    if (!services || services.length === 0) {
      return (
        <Box textAlign="center" py={8}>
          <Text>No services found</Text>
        </Box>
      );
    }

    return (
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {services.map(service => (
          <Box
            key={service.id || service._id}
            bg={bgColor}
            p={6}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <HStack justify="space-between" mb={4}>
              <Badge
                colorScheme={getStatusColor(service.status)}
                px={2}
                py={1}
                borderRadius="full"
              >
                {service.status || 'draft'}
              </Badge>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<FiMoreVertical />}
                  variant="ghost"
                  size="sm"
                />
                <MenuList>
                  <MenuItem icon={<FiEdit2 />}>Edit Service</MenuItem>
                  <MenuItem icon={<FiGlobe />}>Manage Regions</MenuItem>
                  <MenuItem icon={<FiCalendar />}>Update Schedule</MenuItem>
                  <MenuItem icon={<FiBarChart />}>View Analytics</MenuItem>
                  <MenuItem 
                    icon={<FiTrash2 />} 
                    color="red.500" 
                    onClick={() => handleDeleteService(service.id || service._id)}
                  >
                    Delete Service
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>

            <Text fontSize="xl" fontWeight="bold" mb={2}>
              {service.name}
            </Text>
            <Text color="gray.500" mb={4}>
              {service.category}
            </Text>

            <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={4}>
              <VStack align="start">
                <Text fontSize="sm" color="gray.500">
                  Base Price
                </Text>
                <Text fontWeight="bold">
                  {service.pricing?.base ? `$${service.pricing.base}` : 'N/A'}
                </Text>
              </VStack>
              <VStack align="start">
                <Text fontSize="sm" color="gray.500">
                  Premium Price
                </Text>
                <Text fontWeight="bold">
                  {service.pricing?.premium ? `$${service.pricing.premium}` : 'N/A'}
                </Text>
              </VStack>
              <VStack align="start">
                <Text fontSize="sm" color="gray.500">
                  Enterprise Price
                </Text>
                <Text fontWeight="bold">
                  {service.pricing?.enterprise ? `$${service.pricing.enterprise}` : 'N/A'}
                </Text>
              </VStack>
            </Grid>

            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              <VStack align="start">
                <Text fontSize="sm" color="gray.500">
                  Views
                </Text>
                <Text fontWeight="bold">{service.metrics?.views || 0}</Text>
              </VStack>
              <VStack align="start">
                <Text fontSize="sm" color="gray.500">
                  Bookings
                </Text>
                <Text fontWeight="bold">{service.metrics?.bookings || 0}</Text>
              </VStack>
              <VStack align="start">
                <Text fontSize="sm" color="gray.500">
                  Rating
                </Text>
                <Text fontWeight="bold">{service.metrics?.rating || 0}/5</Text>
              </VStack>
            </Grid>
          </Box>
        ))}
      </Grid>
    );
  };

  const getStatusColor = (status?: string): string => {
    const colors: Record<string, string> = {
      active: 'green',
      inactive: 'red',
      draft: 'yellow',
    };
    return status ? colors[status] || 'gray' : 'gray';
  };

  const handleCreateService = async (serviceData: Partial<Service>) => {
    try {
      // Get the token from localStorage explicitly
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      console.log('Creating service with data:', serviceData);
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add the token to the headers
        },
        body: JSON.stringify({
          name: serviceData.name,
          category: serviceData.category,
          description: serviceData.description, // Added description field
          status: serviceData.status || 'draft',
          pricing: {
            base: serviceData.pricing?.base || 0,
            premium: serviceData.pricing?.premium || 0,
            enterprise: serviceData.pricing?.enterprise || 0,
          },
          metrics: {
            views: 0,
            bookings: 0,
            rating: 0,
          },
          subCategories: serviceData.subCategories || [],
          availability: serviceData.availability || {
            regions: [],
            schedule: [],
          },
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error(errorData || 'Failed to create service');
      }
      
      const createdService = await response.json();
      console.log('Created service:', createdService);
      
      // Update services list
      await fetchServices();
      
      // Close modal
      onClose();
    } catch (error) {
      console.error('Error creating service:', error);
      // Show error toast using the useToast hook
      toast({
        title: 'Error Creating Service',
        description: error instanceof Error ? error.message : 'Failed to create service',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    }
  };

  const handleDeleteService = async (serviceId?: string) => {
    if (!serviceId) {
      console.error('Cannot delete service: No ID provided');
      return;
    }

    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to delete service');
      }

      // Refresh services after deletion
      await fetchServices();
      
      // Show success toast
      toast({
        title: 'Service Deleted',
        description: 'The service has been successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      // Show error toast
      toast({
        title: 'Error Deleting Service',
        description: error instanceof Error ? error.message : 'Failed to delete service',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    }
  };

  const handleEditService = async (service: Service) => {
    // TODO: Implement edit service functionality
    console.log('Edit service:', service);
  };

  // Add Service Modal
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '', // Added description field
    pricing: {
      base: 0,
      premium: 0,
      enterprise: 0
    },
    status: 'draft' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateService(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePricingChange = (field: keyof typeof formData.pricing, value: number) => {
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [field]: value
      }
    }));
  };

  return (
    <Box p={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <Heading size="lg">Service Management</Heading>
          <HStack spacing={4}>
            <Button
              leftIcon={<FiDatabase />}
              colorScheme="purple"
              onClick={async () => {
                try {
                  const result = await seedServicesFromLanding();
                  if (result.success) {
                    await fetchServices(); // Refresh the services list
                  }
                  
                  // Show toast with detailed message
                  toast({
                    title: result.success ? 'Services Import Complete' : 'Import Error',
                    description: (
                      <VStack align="start" spacing={1}>
                        <Text>{result.message}</Text>
                        {result.details.failed.length > 0 && (
                          <Text color="red.500" fontSize="sm">
                            Failed services: {result.details.failed.join(', ')}
                          </Text>
                        )}
                      </VStack>
                    ),
                    status: result.success ? 'success' : 'error',
                    duration: 7000,
                    isClosable: true,
                    position: 'top-right'
                  });
                } catch (error) {
                  toast({
                    title: 'Error',
                    description: 'Failed to import services',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right'
                  });
                }
              }}
            >
              Import Landing Services
            </Button>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="blue"
              onClick={onOpen}
            >
              Add Service
            </Button>
          </HStack>
        </HStack>

        {/* Search and Filter */}
        <HStack spacing={4}>
          <InputGroup maxW="md">
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray.300" />
            </InputLeftElement>
            <Input 
              placeholder="Search services..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <Select
            placeholder="Category"
            maxW="xs"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="technology">Technology</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="business">Business</option>
          </Select>
        </HStack>

        {/* Services Grid */}
        {renderServices()}
      </VStack>

      {/* Add Service Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Add New Service</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Service Name</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter service name"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange(e as any)}
                    placeholder="Enter service description"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Select category"
                  >
                    <option value="technology">Technology</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="business">Business</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Base Price ($)</FormLabel>
                  <NumberInput
                    min={0}
                    value={formData.pricing.base}
                    onChange={(_, value) => handlePricingChange('base', value)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Premium Price ($)</FormLabel>
                  <NumberInput
                    min={0}
                    value={formData.pricing.premium}
                    onChange={(_, value) => handlePricingChange('premium', value)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Enterprise Price ($)</FormLabel>
                  <NumberInput
                    min={0}
                    value={formData.pricing.enterprise}
                    onChange={(_, value) => handlePricingChange('enterprise', value)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Status</FormLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="blue">
                Create Service
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ServiceManagement;
