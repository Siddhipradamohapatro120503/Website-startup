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
    <VStack spacing={{ base: 3, md: 4 }} align="stretch">
      {registeredServices.map((service) => (
        <Box
          key={service.id}
          p={{ base: 3, md: 6 }}
          borderRadius="lg"
          borderWidth={1}
          borderColor={borderColor}
          bg={bgColor}
        >
          <VStack align="stretch" spacing={{ base: 3, md: 4 }}>
            <HStack 
              justify="space-between" 
              direction={{ base: 'column', sm: 'row' }}
              align={{ base: 'stretch', sm: 'center' }}
              spacing={{ base: 2, sm: 4 }}
            >
              <HStack spacing={{ base: 2, md: 4 }}>
                <Icon 
                  as={Icons[service.iconName as keyof typeof Icons]} 
                  boxSize={{ base: 5, md: 6 }} 
                  color="blue.500" 
                />
                <Box>
                  <Text 
                    fontWeight="bold" 
                    fontSize={{ base: "md", md: "lg" }}
                  >
                    {service.name}
                  </Text>
                  <Text 
                    color="gray.600" 
                    fontSize={{ base: "xs", md: "sm" }}
                  >
                    {service.category}
                  </Text>
                </Box>
              </HStack>
              <HStack spacing={{ base: 2, md: 3 }}>
                <Badge colorScheme={getStatusColor(service.status)}>
                  {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                </Badge>
                {service.status === 'active' && (
                  <IconButton
                    aria-label="Chat with admin"
                    icon={<FiMessageSquare />}
                    variant="ghost"
                    colorScheme="blue"
                    size={{ base: 'sm', md: 'md' }}
                    onClick={() => toggleChat(service._id)}
                  />
                )}
              </HStack>
            </HStack>

            {service.status === 'active' && (
              <Collapse in={openChat === service._id} animateOpacity>
                <Box mt={{ base: 2, md: 4 }}>
                  <ServiceChat key={service._id} serviceId={service._id} />
                </Box>
              </Collapse>
            )}

            <Accordion allowToggle>
              <AccordionItem border="none">
                <AccordionButton px={0}>
                  <Box flex="1" textAlign="left">
                    <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>Service Details</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={{ base: 2, md: 4 }} px={0}>
                  <VStack align="stretch" spacing={{ base: 2, md: 4 }}>
                    <List spacing={{ base: 1, md: 2 }}>
                      {service.features.map((feature, index) => (
                        <ListItem key={index} fontSize={{ base: "sm", md: "md" }}>
                          <ListIcon as={FiCheck} color="green.500" />
                          {feature}
                        </ListItem>
                      ))}
                    </List>

                    {service.technologies && service.technologies.length > 0 && (
                      <Box>
                        <Text fontWeight="bold" mb={{ base: 1, md: 2 }} fontSize={{ base: "sm", md: "md" }}>
                          Technologies:
                        </Text>
                        <Wrap spacing={{ base: 1, md: 2 }}>
                          {service.technologies.map((tech) => (
                            <WrapItem key={tech}>
                              <Tag size={{ base: "sm", md: "md" }} colorScheme="purple">
                                {tech}
                              </Tag>
                            </WrapItem>
                          ))}
                        </Wrap>
                      </Box>
                    )}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <HStack 
              spacing={{ base: 3, md: 6 }}
              flexDirection={{ base: 'column', sm: 'row' }}
              align={{ base: 'flex-start', sm: 'center' }}
            >
              <HStack spacing={{ base: 2, md: 3 }}>
                <Icon as={FiCalendar} boxSize={{ base: 4, md: 5 }} />
                <Text fontSize={{ base: "sm", md: "md" }}>
                  Start Date: {formatDate(service.formData?.preferredDate)}
                </Text>
              </HStack>
              <HStack spacing={{ base: 2, md: 3 }}>
                <Icon as={FiClock} boxSize={{ base: 4, md: 5 }} />
                <Text fontSize={{ base: "sm", md: "md" }}>
                  Duration: {service.duration}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};

export default RegisteredServices;
