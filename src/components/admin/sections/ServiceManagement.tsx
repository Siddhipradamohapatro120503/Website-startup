import React, { useState } from 'react';
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
} from 'react-icons/fi';

interface SubCategory {
  id: string;
  name: string;
}

interface Schedule {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface ServiceMetrics {
  views: number;
  bookings: number;
  revenue: number;
  rating: number;
}

interface Service {
  id: string;
  name: string;
  category: string;
  subCategories: SubCategory[];
  pricing: {
    base: number;
    premium: number;
    enterprise: number;
  };
  availability: {
    regions: string[];
    schedule: Schedule[];
  };
  metrics: ServiceMetrics;
  status: 'active' | 'inactive' | 'draft';
}

// Mock data
const mockServices: Service[] = Array.from({ length: 10 }, (_, i) => ({
  id: `service-${i + 1}`,
  name: `Service ${i + 1}`,
  category: ['Technology', 'Design', 'Marketing', 'Business'][i % 4],
  subCategories: [
    { id: '1', name: 'Web Development' },
    { id: '2', name: 'Mobile Development' },
  ],
  pricing: {
    base: 99 + i * 50,
    premium: 199 + i * 100,
    enterprise: 499 + i * 200,
  },
  availability: {
    regions: ['North America', 'Europe', 'Asia'],
    schedule: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 2, startTime: '09:00', endTime: '17:00' },
    ],
  },
  metrics: {
    views: 1000 + i * 100,
    bookings: 50 + i * 5,
    revenue: 5000 + i * 500,
    rating: 4 + (i % 2) * 0.5,
  },
  status: i % 3 === 0 ? 'active' : i % 2 === 0 ? 'inactive' : 'draft',
}));

const ServiceManagement: React.FC = () => {
  const [services] = useState<Service[]>(mockServices);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const getStatusColor = (status: Service['status']) => {
    const colors = {
      active: 'green',
      inactive: 'red',
      draft: 'yellow',
    };
    return colors[status];
  };

  return (
    <Box>
      {/* Stats Overview */}
      <Grid templateColumns="repeat(4, 1fr)" gap={6} mb={6}>
        <Stat bg={bgColor} p={4} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <StatLabel>Total Services</StatLabel>
          <StatNumber>{services.length}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
        <Stat bg={bgColor} p={4} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <StatLabel>Active Services</StatLabel>
          <StatNumber>
            {services.filter(s => s.status === 'active').length}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            12.5%
          </StatHelpText>
        </Stat>
        <Stat bg={bgColor} p={4} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <StatLabel>Total Revenue</StatLabel>
          <StatNumber>
            ${services.reduce((acc, s) => acc + s.metrics.revenue, 0).toLocaleString()}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            28.14%
          </StatHelpText>
        </Stat>
        <Stat bg={bgColor} p={4} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <StatLabel>Avg. Rating</StatLabel>
          <StatNumber>
            {(services.reduce((acc, s) => acc + s.metrics.rating, 0) / services.length).toFixed(1)}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            9.05%
          </StatHelpText>
        </Stat>
      </Grid>

      {/* Filters and Actions */}
      <HStack spacing={4} mb={6}>
        <InputGroup maxW="xs">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input placeholder="Search services..." />
        </InputGroup>
        <Select placeholder="Category" maxW="xs">
          <option value="technology">Technology</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
          <option value="business">Business</option>
        </Select>
        <Select placeholder="Status" maxW="xs">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="draft">Draft</option>
        </Select>
        <Button leftIcon={<FiFilter />} colorScheme="blue">
          Apply Filters
        </Button>
        <Button leftIcon={<FiPlus />} colorScheme="green" onClick={onOpen}>
          Add Service
        </Button>
      </HStack>

      {/* Services Grid */}
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {services.map(service => (
          <Box
            key={service.id}
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
                {service.status}
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
                  <MenuItem icon={<FiTrash2 />} color="red.500">
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

            <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
              <VStack align="start">
                <Text fontSize="sm" color="gray.500">
                  Base Price
                </Text>
                <Text fontWeight="bold">${service.pricing.base}</Text>
              </VStack>
              <VStack align="start">
                <Text fontSize="sm" color="gray.500">
                  Premium Price
                </Text>
                <Text fontWeight="bold">${service.pricing.premium}</Text>
              </VStack>
            </Grid>

            <Grid templateColumns="repeat(3, 1fr)" gap={2}>
              <VStack align="start">
                <Text fontSize="sm" color="gray.500">
                  Views
                </Text>
                <Text fontWeight="bold">{service.metrics.views}</Text>
              </VStack>
              <VStack align="start">
                <Text fontSize="sm" color="gray.500">
                  Bookings
                </Text>
                <Text fontWeight="bold">{service.metrics.bookings}</Text>
              </VStack>
              <VStack align="start">
                <Text fontSize="sm" color="gray.500">
                  Rating
                </Text>
                <Text fontWeight="bold">{service.metrics.rating}/5</Text>
              </VStack>
            </Grid>
          </Box>
        ))}
      </Grid>

      {/* Add Service Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Service</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>Basic Info</Tab>
                <Tab>Pricing</Tab>
                <Tab>Availability</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel>Service Name</FormLabel>
                      <Input placeholder="Enter service name" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Category</FormLabel>
                      <Select placeholder="Select category">
                        <option value="technology">Technology</option>
                        <option value="design">Design</option>
                        <option value="marketing">Marketing</option>
                        <option value="business">Business</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Status</FormLabel>
                      <Select placeholder="Select status">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="draft">Draft</option>
                      </Select>
                    </FormControl>
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel>Base Price ($)</FormLabel>
                      <NumberInput min={0}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Premium Price ($)</FormLabel>
                      <NumberInput min={0}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Enterprise Price ($)</FormLabel>
                      <NumberInput min={0}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel>Available Regions</FormLabel>
                      <Select placeholder="Select regions" multiple>
                        <option value="na">North America</option>
                        <option value="eu">Europe</option>
                        <option value="asia">Asia</option>
                        <option value="sa">South America</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Schedule</FormLabel>
                      {/* Add schedule configuration here */}
                      <Text color="gray.500">Schedule configuration coming soon</Text>
                    </FormControl>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save Service</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ServiceManagement;
