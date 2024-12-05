import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Badge,
  HStack,
  Icon,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
  Tag,
  Wrap,
  WrapItem,
  Spinner,
  IconButton,
  Collapse,
} from '@chakra-ui/react';
import * as Icons from 'react-icons/fa';
import { FiCheck, FiClock, FiCalendar, FiMessageSquare } from 'react-icons/fi';
import { useServices } from '../../context/ServicesContext';
import ServiceChat from '../chat/ServiceChat';

interface RegisteredService {
  _id: string;  // MongoDB's _id
  id: string;   // Original service ID
  name: string;
  category: string;
  status: 'pending' | 'active' | 'completed';
  formData?: {
    preferredDate?: string;
    preferredTime?: string;
    specialRequirements?: string;
    paymentMethod?: string;
  };
  duration: string;
  features: string[];
  technologies: string[];
  iconName: string;
}

const RegisteredServices: React.FC = () => {
  const { registeredServices, loading, error } = useServices();
  const [openChat, setOpenChat] = useState<string | null>(null);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'yellow';
      case 'active':
        return 'green';
      case 'completed':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const toggleChat = (serviceId: string) => {
    setOpenChat(openChat === serviceId ? null : serviceId);
  };

  if (loading) {
    return (
      <Box p={6} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={6} textAlign="center" color="red.500">
        <Text>{error}</Text>
      </Box>
    );
  }

  if (!registeredServices || registeredServices.length === 0) {
    return (
      <Box p={6} textAlign="center">
        <Text>No registered services yet.</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      {registeredServices.map((service) => (
        <Box
          key={service.id}
          p={6}
          borderRadius="lg"
          borderWidth={1}
          borderColor={borderColor}
          bg={bgColor}
        >
          <VStack align="stretch" spacing={4}>
            <HStack justify="space-between">
              <HStack spacing={4}>
                <Icon as={Icons[service.iconName as keyof typeof Icons]} boxSize={6} color="blue.500" />
                <Box>
                  <Text fontWeight="bold" fontSize="lg">
                    {service.name}
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    {service.category}
                  </Text>
                </Box>
              </HStack>
              <HStack>
                <Badge colorScheme={getStatusColor(service.status)}>
                  {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                </Badge>
                {service.status === 'active' && (
                  <IconButton
                    aria-label="Chat with admin"
                    icon={<FiMessageSquare />}
                    variant="ghost"
                    colorScheme="blue"
                    onClick={() => toggleChat(service._id)}
                  />
                )}
              </HStack>
            </HStack>

            {service.status === 'active' && (
              <Collapse in={openChat === service._id} animateOpacity>
                <Box mt={4}>
                  <ServiceChat key={service._id} serviceId={service._id} />
                </Box>
              </Collapse>
            )}

            <Accordion allowToggle>
              <AccordionItem border="none">
                <AccordionButton px={0}>
                  <Box flex="1" textAlign="left">
                    <Text fontWeight="medium">Service Details</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} px={0}>
                  <VStack align="stretch" spacing={4}>
                    <List spacing={2}>
                      {service.features.map((feature, index) => (
                        <ListItem key={index}>
                          <ListIcon as={FiCheck} color="green.500" />
                          {feature}
                        </ListItem>
                      ))}
                    </List>

                    {service.technologies && service.technologies.length > 0 && (
                      <Box>
                        <Text fontWeight="bold" mb={2}>Technologies:</Text>
                        <Wrap spacing={2}>
                          {service.technologies.map((tech) => (
                            <WrapItem key={tech}>
                              <Tag size="sm" colorScheme="purple">{tech}</Tag>
                            </WrapItem>
                          ))}
                        </Wrap>
                      </Box>
                    )}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <HStack spacing={6}>
              <HStack>
                <Icon as={FiCalendar} />
                <Text>Start Date: {formatDate(service.formData?.preferredDate)}</Text>
              </HStack>
              <HStack>
                <Icon as={FiClock} />
                <Text>Duration: {service.duration}</Text>
              </HStack>
            </HStack>
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};

export default RegisteredServices;
