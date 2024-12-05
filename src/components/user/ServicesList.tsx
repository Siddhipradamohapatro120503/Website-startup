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
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tag,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { FiCheck, FiClock, FiStar, FiCalendar, FiInfo, FiCpu, FiCamera, FiMessageSquare, FiTrendingUp, FiFilm, FiPenTool, FiShare2, FiBarChart2, FiGlobe, FiLayout, FiGrid, FiCloud, FiServer } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { useServices } from '../../context/ServicesContext';
import { serviceCategories } from '../LandingPage';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  category: string;
  features: string[];
  technologies?: string[];
  useCases?: string[];
  icon: IconType;
}

// Convert serviceCategories to our Service interface format
const allServices: Service[] = serviceCategories.flatMap((category) =>
  category.services.map((service, index) => ({
    id: `${category.title.toLowerCase()}-${index + 1}`,
    name: service.name,
    description: service.description || '',
    duration: ['1 month', '2 months', '3 months', '6 months'][Math.floor(Math.random() * 4)], // Random duration
    category: category.title,
    features: service.features,
    technologies: service.technologies,
    useCases: service.useCases,
    icon: service.icon,
  }))
);

const ServicesList: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [formData, setFormData] = useState({
    preferredDate: '',
    preferredTime: '',
    specialRequirements: '',
    paymentMethod: '',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const { registeredServices, registerService } = useServices();

  const uniqueCategories = Array.from(new Set(allServices.map(service => service.category)));
  const categories = ['all', ...uniqueCategories];
  const filteredServices = activeCategory === 'all' 
    ? allServices 
    : allServices.filter(service => service.category === activeCategory);

  const handleRegister = (service: Service) => {
    if (registeredServices.some(rs => rs.id === service.id)) {
      toast({
        title: 'Already Registered',
        description: `You are already registered for ${service.name}`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setSelectedService(service);
    setFormData({
      preferredDate: '',
      preferredTime: '',
      specialRequirements: '',
      paymentMethod: '',
    });
    onOpen();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.preferredDate || !formData.preferredTime || !formData.paymentMethod) {
      toast({
        title: 'Required Fields Missing',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const confirmRegistration = () => {
    if (!validateForm() || !selectedService) return;
    
    registerService(selectedService, formData);
    onClose();
    toast({
      title: 'Registration Successful',
      description: `You have successfully registered for ${selectedService.name}. We'll contact you to confirm your preferred date and time.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Tabs variant="soft-rounded" colorScheme="blue" mb={6}>
        <TabList overflowX="auto" py={2}>
          {categories.map((category) => (
            <Tab
              key={category}
              onClick={() => setActiveCategory(category)}
              textTransform="capitalize"
            >
              {category}
            </Tab>
          ))}
        </TabList>
      </Tabs>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredServices.map((service) => (
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
              <HStack justify="space-between">
                <Badge colorScheme="blue" fontSize="sm">
                  {service.category}
                </Badge>
                <Icon as={service.icon} boxSize={6} color="blue.500" />
              </HStack>
              
              <VStack align="start" spacing={2}>
                <Text fontWeight="bold" fontSize="xl">
                  {service.name}
                </Text>
                <Text color="gray.600" fontSize="sm">
                  {service.description}
                </Text>
              </VStack>

              {service.technologies && (
                <Wrap spacing={2}>
                  {service.technologies.map((tech) => (
                    <WrapItem key={tech}>
                      <Tag size="sm" colorScheme="purple">{tech}</Tag>
                    </WrapItem>
                  ))}
                </Wrap>
              )}

              <HStack>
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
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register for {selectedService?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" spacing={6}>
              {/* Service Information */}
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <HStack>
                          <Icon as={FiInfo} />
                          <Text fontWeight="bold">Service Details</Text>
                        </HStack>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <VStack align="stretch" spacing={4}>
                      <List spacing={2}>
                        {selectedService?.features.map((feature, index) => (
                          <ListItem key={index}>
                            <ListIcon as={FiCheck} color="green.500" />
                            {feature}
                          </ListItem>
                        ))}
                      </List>

                      {selectedService?.useCases && (
                        <Box>
                          <Text fontWeight="bold" mb={2}>Use Cases:</Text>
                          <List spacing={2}>
                            {selectedService.useCases.map((useCase, index) => (
                              <ListItem key={index}>
                                <ListIcon as={FiCheck} color="blue.500" />
                                {useCase}
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}

                      <Box p={4} bg="gray.50" borderRadius="md">
                        <HStack justify="space-between">
                          <Text>Duration:</Text>
                          <Text fontWeight="bold">{selectedService?.duration}</Text>
                        </HStack>
                      </Box>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Divider />

              {/* Registration Form */}
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Preferred Start Date</FormLabel>
                  <Input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Preferred Time</FormLabel>
                  <Select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    placeholder="Select preferred time"
                  >
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
                    <option value="evening">Evening (5 PM - 8 PM)</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Payment Method</FormLabel>
                  <Select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    placeholder="Select payment method"
                  >
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                    <option value="bank">Bank Transfer</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Special Requirements</FormLabel>
                  <Textarea
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    placeholder="Any special requirements or notes"
                    rows={3}
                  />
                </FormControl>
              </VStack>
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
