import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Spinner,
  useToast,
  Select,
  useColorModeValue,
  IconButton,
  Collapse,
  VStack,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { FiMessageSquare } from 'react-icons/fi';
import api from '../../../api/axios';
import ServiceChat from '../../chat/ServiceChat';

interface RegisteredService {
  _id: string;
  serviceId: string;
  name: string;
  description: string;
  duration: string;
  category: string;
  features: string[];
  technologies?: string[];
  useCases?: string[];
  status: 'pending' | 'active' | 'completed';
  registrationDate: string;
  userEmail: string;
  formData: {
    preferredDate: string;
    preferredTime: string;
    specialRequirements: string;
    paymentMethod: string;
  };
}

const RegisteredServices: React.FC = () => {
  const [services, setServices] = useState<RegisteredService[]>([]);
  const [loading, setLoading] = useState(true);
  const [openChat, setOpenChat] = useState<string | null>(null);
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    fetchRegisteredServices();
  }, []);

  const fetchRegisteredServices = async () => {
    try {
      const response = await api.get('/registered-services');
      console.log('Fetched services:', response.data);
      setServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching registered services:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch registered services. Please make sure the server is running.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleStatusChange = async (serviceId: string, newStatus: string) => {
    try {
      const response = await api.patch(`/registered-services/${serviceId}`, { 
        status: newStatus 
      });
      
      if (response.data) {
        setServices(prevServices => 
          prevServices.map(service => 
            service._id === serviceId 
              ? { ...service, status: newStatus as 'pending' | 'active' | 'completed' }
              : service
          )
        );

        toast({
          title: 'Status Updated',
          description: 'Service status has been updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error updating service status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update service status. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const getBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'completed':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const toggleChat = (serviceId: string) => {
    setOpenChat(openChat === serviceId ? null : serviceId);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <Spinner size="xl" />
        </Box>
      );
    }

    if (services.length === 0) {
      return (
        <Box
          bg={bgColor}
          shadow="sm"
          rounded="lg"
          p={6}
          textAlign="center"
        >
          <Text fontSize="lg" color="gray.500">
            No registered services found
          </Text>
        </Box>
      );
    }

    return (
      <VStack spacing={4} align="stretch">
        {services.map((service) => (
          <Box key={service._id}>
            <Box
              bg={bgColor}
              shadow="sm"
              rounded="lg"
              overflow="hidden"
            >
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td>
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="medium">{service.name}</Text>
                        <Text fontSize="sm" color="gray.500">{service.description}</Text>
                      </VStack>
                    </Td>
                    <Td>{service.category}</Td>
                    <Td>{service.userEmail}</Td>
                    <Td>
                      <Select
                        size="sm"
                        value={service.status}
                        onChange={(e) => handleStatusChange(service._id, e.target.value)}
                        bg={getBadgeColor(service.status)}
                        color="white"
                        borderColor={getBadgeColor(service.status)}
                        _hover={{ borderColor: getBadgeColor(service.status) }}
                      >
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                      </Select>
                    </Td>
                    <Td>{new Date(service.registrationDate).toLocaleDateString()}</Td>
                    <Td>{service.formData.preferredDate}</Td>
                    <Td>{service.formData.preferredTime}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <Text>{service.formData.specialRequirements || '-'}</Text>
                        <IconButton
                          aria-label="Chat with user"
                          icon={<FiMessageSquare />}
                          variant="ghost"
                          colorScheme="blue"
                          onClick={() => toggleChat(service._id)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
            
            <Collapse in={openChat === service._id} animateOpacity>
              <Box mt={2} mb={4}>
                <ServiceChat serviceId={service._id} />
              </Box>
            </Collapse>
          </Box>
        ))}
      </VStack>
    );
  };

  return (
    <Box p={4}>
      <Heading size="lg" mb={6}>Registered Services</Heading>
      {renderContent()}
    </Box>
  );
};

export default RegisteredServices;
