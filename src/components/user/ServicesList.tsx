import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Badge,
  Button,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Icon,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { FiCheck, FiClock, FiDollarSign, FiStar } from 'react-icons/fi';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  features: string[];
}

const sampleServices: Service[] = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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

const ServicesList: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleRegister = (service: Service) => {
    setSelectedService(service);
    onOpen();
  };

  const confirmRegistration = () => {
    onClose();
    toast({
      title: 'Registration Successful',
      description: `You have successfully registered for ${selectedService?.name}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {sampleServices.map((service) => (
          <Box
            key={service.id}
            bg={bgColor}
            p={6}
            borderRadius="lg"
            borderWidth={1}
            borderColor={borderColor}
            _hover={{ transform: 'translateY(-2px)', transition: 'all 0.2s' }}
          >
            <VStack align="stretch" spacing={4}>
              <Badge colorScheme="blue" alignSelf="flex-start">
                {service.category}
              </Badge>
              
              <Text fontWeight="bold" fontSize="xl">
                {service.name}
              </Text>
              
              <Text color="gray.600">
                {service.description}
              </Text>

              <HStack>
                <Icon as={FiDollarSign} color="green.500" />
                <Text fontWeight="bold">${service.price}</Text>
                <Text color="gray.600">|</Text>
                <Icon as={FiClock} color="blue.500" />
                <Text>{service.duration}</Text>
              </HStack>

              <Button
                colorScheme="blue"
                onClick={() => handleRegister(service)}
                leftIcon={<FiStar />}
              >
                Register Now
              </Button>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>

      {/* Registration Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register for {selectedService?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" spacing={4}>
              <Text>Service Features:</Text>
              <List spacing={2}>
                {selectedService?.features.map((feature, index) => (
                  <ListItem key={index}>
                    <ListIcon as={FiCheck} color="green.500" />
                    {feature}
                  </ListItem>
                ))}
              </List>
              <Box p={4} bg="gray.50" borderRadius="md">
                <HStack justify="space-between">
                  <Text>Price:</Text>
                  <Text fontWeight="bold">${selectedService?.price}</Text>
                </HStack>
                <HStack justify="space-between" mt={2}>
                  <Text>Duration:</Text>
                  <Text fontWeight="bold">{selectedService?.duration}</Text>
                </HStack>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={confirmRegistration}>
              Confirm Registration
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ServicesList;
