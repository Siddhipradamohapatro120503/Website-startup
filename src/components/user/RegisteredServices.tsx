import React from 'react';
import {
  Box,
  VStack,
  Text,
  Badge,
  Progress,
  HStack,
  Icon,
  Button,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react';
import { FiClock, FiCalendar, FiBarChart2 } from 'react-icons/fi';

interface RegisteredService {
  id: string;
  name: string;
  progress: number;
  nextSession: string;
  hoursUsed: number;
  totalHours: number;
  status: 'active' | 'completed' | 'paused';
}

const registeredServices: RegisteredService[] = [
  {
    id: '1',
    name: 'Business Consulting',
    progress: 65,
    nextSession: '2024-02-15T10:00:00',
    hoursUsed: 12,
    totalHours: 20,
    status: 'active',
  },
  {
    id: '2',
    name: 'Digital Marketing',
    progress: 40,
    nextSession: '2024-02-16T14:00:00',
    hoursUsed: 8,
    totalHours: 30,
    status: 'active',
  },
  {
    id: '3',
    name: 'Web Development',
    progress: 90,
    nextSession: '2024-02-14T15:00:00',
    hoursUsed: 45,
    totalHours: 50,
    status: 'active',
  },
];

const RegisteredServices: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'completed':
        return 'blue';
      case 'paused':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={4}>
      {registeredServices.map((service) => (
        <Box
          key={service.id}
          p={6}
          bg={bgColor}
          borderRadius="lg"
          borderWidth={1}
          borderColor={borderColor}
        >
          <VStack align="stretch" spacing={4}>
            <HStack justify="space-between">
              <Text fontWeight="bold" fontSize="lg">
                {service.name}
              </Text>
              <Badge colorScheme={getStatusColor(service.status)}>
                {service.status}
              </Badge>
            </HStack>

            <Box>
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" color="gray.600">
                  Progress
                </Text>
                <Text fontSize="sm" fontWeight="medium">
                  {service.progress}%
                </Text>
              </HStack>
              <Progress
                value={service.progress}
                colorScheme="blue"
                size="sm"
                borderRadius="full"
              />
            </Box>

            <SimpleGrid columns={2} spacing={4}>
              <HStack>
                <Icon as={FiClock} color="blue.500" />
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" color="gray.600">
                    Hours Used
                  </Text>
                  <Text fontSize="sm" fontWeight="medium">
                    {service.hoursUsed}/{service.totalHours}
                  </Text>
                </VStack>
              </HStack>

              <HStack>
                <Icon as={FiCalendar} color="purple.500" />
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" color="gray.600">
                    Next Session
                  </Text>
                  <Text fontSize="sm" fontWeight="medium">
                    {formatDate(service.nextSession)}
                  </Text>
                </VStack>
              </HStack>
            </SimpleGrid>

            <HStack spacing={2}>
              <Button size="sm" colorScheme="blue" variant="outline" flex={1}>
                View Details
              </Button>
              <Button
                size="sm"
                leftIcon={<FiBarChart2 />}
                colorScheme="blue"
                flex={1}
              >
                Track Progress
              </Button>
            </HStack>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default RegisteredServices;
