import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Grid,
  Stack,
  Icon,
  Image,
  SimpleGrid,
  Flex,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { FiArrowLeft, FiCheck, FiCpu, FiCloud, FiLayers } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { serviceCategories } from '../data/services';
import { Service, ServiceCategory } from '../types/service';

type ServiceImagesType = {
  [key in 'Development' | 'Content Creation' | 'AI & Machine Learning' | 'Cloud Solutions' | 'Cybersecurity' | 'Data Analytics' | 'Digital Marketing' | 'Technical Solutions']: string[];
};

// Service-specific images mapping
const serviceImages: ServiceImagesType = {
  'Development': [
    '/image/dev-hero.jpg',          // Main hero image
    '/image/dev-web.jpg',           // Web Development
    '/image/dev-mobile.jpg',        // Mobile Development
    '/image/dev-backend.jpg'        // Backend Development
  ],
  'AI & Machine Learning': [
    '/image/Copilot.jpeg',       // Main AI hero image
    '/image/computer-vision.jpeg',        // Machine Learning Process
    '/image/AI-NLP.jpeg',        // Deep Learning
    '/image/pe-ai.jpeg'    // AI Robotics
  ],
  'Content Creation': [
    '/image/service5.jpg',  // Main hero image
    '/image/blog1.jpg',     // Content creation process
    '/image/blog2.jpg',     // Content strategy
    '/image/blog3.jpg'      // Content types
  ],
  'Cloud Solutions': [
    '/image/service2.jpg',  // Main cloud image
    '/image/feature2.jpg'   // Cloud features
  ],
  'Cybersecurity': [
    '/image/service3.jpg',  // Main security image
    '/image/feature3.jpg'   // Security features
  ],
  'Data Analytics': [
    '/image/service4.jpg',  // Main analytics image
    '/image/feature4.jpg'   // Analytics features
  ],
  'Digital Marketing': [
    '/image/service5.jpg',  // Main marketing image
    '/image/blog1.jpg',     // Marketing strategy
    '/image/case1.jpg'      // Case studies
  ],
  'Technical Solutions': [
    '/image/service6.jpg',  // Main solutions image
    '/image/blog2.jpg',     // Technical overview
    '/image/case2.jpg'      // Implementation examples
  ]
};

const ServiceDetails: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  const category = serviceCategories.find(
    (cat: ServiceCategory) => cat.title.toLowerCase().replace(/\s+/g, '-') === categoryId
  );

  const bgColor = useColorModeValue('white', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const cardBorderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const gradientOverlay = useColorModeValue(
    'linear(to-r, whiteAlpha.800, whiteAlpha.500)',
    'linear(to-r, blackAlpha.800, blackAlpha.500)'
  );

  if (!category) {
    return (
      <Container maxW="container.xl" py={20}>
        <Text>Service category not found</Text>
        <Button onClick={() => navigate('/')} leftIcon={<FiArrowLeft />} mt={4}>
          Back to Home
        </Button>
      </Container>
    );
  }

  // Get category-specific images
  const images = category
    ? serviceImages[category.title as keyof ServiceImagesType] || []
    : [];

  // Update getServiceImage function to handle service-specific images
  const getServiceImage = (service: Service, index: number) => {
    // Get images specific to this service
    const serviceSpecificImages = serviceImages[service.name as keyof ServiceImagesType];
    if (serviceSpecificImages && serviceSpecificImages.length > 0) {
      return serviceSpecificImages[0]; // Use the first (main) image for the service
    }
    // Fallback to category images or default
    if (images.length > 0) {
      return images[index % images.length];
    }
    return '/image/default-service.jpg';
  };

  return (
    <Box bg={bgColor} minH="100vh">
      {/* Hero Section with Background Image */}
      <Box
        bg={`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${images[0]})`}
        bgSize="cover"
        bgPosition="center"
        py={20}
        px={4}
      >
        <Container maxW="container.xl" h="100%" position="relative">
          <Flex direction="column" justify="center" h="100%" maxW="container.md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Breadcrumb mb={4} color="gray.300">
                <BreadcrumbItem>
                  <BreadcrumbLink onClick={() => navigate('/')}>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink onClick={() => navigate('/services')}>Services</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>{category.title}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <Heading 
                size="2xl" 
                mb={4}
                bgGradient="linear(to-r, blue.400, purple.500)"
                bgClip="text"
              >
                {category.title}
              </Heading>
            </motion.div>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={12}>
          {category.services.map((service: Service, index: number) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Box
                p={6}
                bg={cardBgColor}
                borderRadius="xl"
                borderWidth={1}
                borderColor={cardBorderColor}
                h="100%"
                position="relative"
                overflow="hidden"
                _hover={{ transform: 'translateY(-4px)', shadow: 'xl', cursor: 'pointer' }}
                transition="all 0.3s"
                onClick={() => navigate(`/services/${categoryId}/${service.name.toLowerCase().replace(/\s+/g, '-')}`)}
              >
                {/* Service Image */}
                <Box
                  mb={4}
                  borderRadius="lg"
                  overflow="hidden"
                  height="240px"
                >
                  <Image
                    src={getServiceImage(service, index)}
                    alt={service.name}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transition="transform 0.3s"
                    _hover={{ transform: 'scale(1.05)' }}
                  />
                  {/* Image caption */}
                  <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    bg="blackAlpha.600"
                    p={2}
                    color="white"
                  >
                    <Text fontSize="sm" fontWeight="bold">
                      {service.name}
                    </Text>
                  </Box>
                </Box>
                
                <Flex align="center" mb={4}>
                  <Icon as={service.icon} w={8} h={8} color="blue.400" mr={3} />
                  <Heading size="md">{service.name}</Heading>
                </Flex>
                <Text color={textColor} mb={4}>{service.description}</Text>
                <Stack spacing={3}>
                  {service.features.map((feature: string, idx: number) => (
                    <Flex key={idx} align="center">
                      <Icon as={FiCheck} color="green.400" mr={2} />
                      <Text color={textColor}>{feature}</Text>
                    </Flex>
                  ))}
                </Stack>
                <Button
                  position="absolute"
                  bottom={6}
                  right={6}
                  colorScheme="blue"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/services/${categoryId}/${service.name.toLowerCase().replace(/\s+/g, '-')}`);
                  }}
                >
                  View Details
                </Button>
              </Box>
            </motion.div>
          ))}
        </SimpleGrid>

        <Button 
          onClick={() => navigate('/')} 
          leftIcon={<FiArrowLeft />}
          size="lg"
          colorScheme="blue"
          mt={8}
        >
          Back to Home
        </Button>
      </Container>
    </Box>
  );
};

export default ServiceDetails;
