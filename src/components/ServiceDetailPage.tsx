import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheck, FiDownload, FiCalendar, FiMessageSquare, FiCode } from 'react-icons/fi';
import { serviceCategories } from '../data/services';
import { Service, ServiceCategory } from '../types/service';

const ServiceDetailPage: React.FC = () => {
  const { categoryId, serviceId } = useParams<{ categoryId: string; serviceId: string }>();
  const navigate = useNavigate();
  
  // Move all useColorModeValue hooks to the top
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const headingColor = useColorModeValue('gray.800', 'white');
  const pageBgColor = useColorModeValue('gray.50', 'gray.900');
  
  const category = serviceCategories.find(
    (cat: ServiceCategory) => cat.title.toLowerCase().replace(/\s+/g, '-') === categoryId
  );
  
  const service = category?.services.find(
    (srv: Service) => srv.name.toLowerCase().replace(/\s+/g, '-') === serviceId
  );

  if (!category || !service) {
    return <Box>Service not found</Box>;
  }

  return (
    <Box bg={pageBgColor} minH="100vh" py={8}>
      <Container maxW="container.xl">
        {/* Breadcrumb */}
        <Breadcrumb mb={8}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/#services">Services</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={`/services/${categoryId}`}>{category.title}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{service.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Main Content */}
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
          {/* Left Column - Service Details */}
          <Box gridColumn="span 2">
            <VStack align="stretch" spacing={8}>
              {/* Header */}
              <Box>
                <Heading as="h1" size="2xl" mb={4} color={headingColor}>
                  {service.name}
                </Heading>
                <Text fontSize="xl" color={textColor}>
                  {service.description}
                </Text>
              </Box>

              {/* Technologies & Tools */}
              <Box>
                <Heading as="h2" size="lg" mb={6}>
                  Technologies & Tools
                </Heading>
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                  {service.technologies.map((tech) => (
                    <Button
                      key={tech}
                      variant="outline"
                      size="lg"
                      leftIcon={<Icon as={FiCode} />}
                      justifyContent="flex-start"
                      px={6}
                      py={4}
                    >
                      {tech}
                    </Button>
                  ))}
                </SimpleGrid>
              </Box>

              {/* Key Features */}
              <Box>
                <Heading as="h2" size="lg" mb={6}>
                  Key Features
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {service.features.map((feature) => (
                    <HStack
                      key={feature}
                      bg={bgColor}
                      p={4}
                      borderRadius="md"
                      borderWidth="1px"
                      borderColor={borderColor}
                    >
                      <Icon as={FiCheck} color="green.500" />
                      <Text>{feature}</Text>
                    </HStack>
                  ))}
                </SimpleGrid>
              </Box>

              {/* Use Cases */}
              <Box>
                <Heading as="h2" size="lg" mb={6}>
                  Use Cases
                </Heading>
                <VStack align="stretch" spacing={4}>
                  {service.useCases.map((useCase) => (
                    <Box
                      key={useCase}
                      p={4}
                      borderRadius="md"
                      borderWidth="1px"
                      borderColor={borderColor}
                      bg={bgColor}
                    >
                      <Text>{useCase}</Text>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </Box>

          {/* Right Column - Contact Card */}
          <Box>
            <Box
              position="sticky"
              top="2rem"
              bg={bgColor}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={borderColor}
              p={6}
              shadow="xl"
            >
              <VStack spacing={6} align="stretch">
                <Heading as="h2" size="lg">
                  Contact Us
                </Heading>

                {/* Action Buttons */}
                <VStack spacing={4}>
                  <Button
                    colorScheme="blue"
                    size="lg"
                    width="100%"
                    leftIcon={<Icon as={FiMessageSquare} />}
                  >
                    Request Information
                  </Button>
                  <Button
                    colorScheme="green"
                    size="lg"
                    width="100%"
                    leftIcon={<Icon as={FiCalendar} />}
                  >
                    Schedule Consultation
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    width="100%"
                    leftIcon={<Icon as={FiDownload} />}
                  >
                    Download Brochure
                  </Button>
                </VStack>

                {/* Why Choose Us */}
                <Box>
                  <Heading as="h3" size="md" mb={4}>
                    Why Choose Us:
                  </Heading>
                  <List spacing={3}>
                    {service.whyChooseUs?.map((reason) => (
                      <ListItem key={reason}>
                        <ListIcon as={FiCheck} color="green.500" />
                        {reason}
                      </ListItem>
                    ))}
                  </List>
                </Box>

                {/* Contact Info */}
                {service.contactInfo && (
                  <Box>
                    <Text fontWeight="bold" mb={2}>
                      Need immediate assistance?
                    </Text>
                    <Text color="blue.500" fontSize="xl" mb={2}>
                      {service.contactInfo.phone}
                    </Text>
                    <Text color={textColor}>
                      {service.contactInfo.email}
                    </Text>
                  </Box>
                )}
              </VStack>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ServiceDetailPage;
