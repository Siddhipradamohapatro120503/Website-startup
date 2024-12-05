import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Icon,
  Button,
  Stack,
  Grid,
  Flex,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Tag,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { 
  FiArrowLeft, 
  FiCheck, 
  FiClock, 
  FiDollarSign, 
  FiUsers,
  FiTarget,
  FiCode,
  FiBox,
  FiMessageSquare,
  FiDownload
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { serviceCategories } from './LandingPage';
import type { IconType } from 'react-icons';

// Types
interface Service {
  name: string;
  icon: IconType;
  features: string[];
  description?: string;
  technologies?: string[];
  useCases?: string[];
  brochureUrl?: string;
}

interface ServiceCategory {
  title: string;
  icon: IconType;
  services: Service[];
}

const ServiceDetailPage: React.FC = () => {
  const { categoryId, serviceId } = useParams<{ categoryId: string; serviceId: string }>();
  const navigate = useNavigate();
  
  const bgColor = useColorModeValue('white', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const cardBorderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const featuresBgColor = useColorModeValue('gray.50', 'gray.700');
  const tagBgColor = useColorModeValue('blue.50', 'blue.900');
  
  const category = serviceCategories.find(
    cat => cat.title.toLowerCase().replace(/\s+/g, '-') === categoryId
  );
  
  const service = category?.services.find(
    srv => srv.name.toLowerCase().replace(/\s+/g, '-') === serviceId
  );

  if (!category || !service) {
    return (
      <Container maxW="container.xl" py={20}>
        <Text>Service not found</Text>
        <Button onClick={() => navigate('/')} leftIcon={<FiArrowLeft />} mt={4}>
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh">
      <Container maxW="container.xl" py={20}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Breadcrumb mb={8}>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/')}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/#services')}>Services</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate(`/services/${categoryId}`)}>
                {category.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>{service.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
            <Box>
              <Heading as="h1" size="2xl" mb={4}>
                {service.name}
              </Heading>
              <Text color={textColor} fontSize="lg" mb={8}>
                {service.description}
              </Text>

              {/* Technologies Section */}
              {service.technologies && service.technologies.length > 0 && (
                <Box mb={8}>
                  <Heading as="h2" size="lg" mb={4}>
                    Technologies & Tools
                  </Heading>
                  <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                    {service.technologies.map((tech: string) => (
                      <Tag
                        key={tech}
                        size="lg"
                        bg={tagBgColor}
                        color="blue.500"
                        borderRadius="full"
                        px={4}
                        py={2}
                      >
                        <Icon as={FiCode} mr={2} />
                        {tech}
                      </Tag>
                    ))}
                  </SimpleGrid>
                </Box>
              )}

              {/* Features Section */}
              <Heading as="h2" size="lg" mb={4}>
                Key Features
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mb={8}>
                {service.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Stack
                      direction="row"
                      align="flex-start"
                      p={4}
                      borderWidth={1}
                      borderColor={cardBorderColor}
                      borderRadius="md"
                    >
                      <Icon as={FiCheck} color="green.500" mt={1} />
                      <Text>{feature}</Text>
                    </Stack>
                  </motion.div>
                ))}
              </Grid>

              {/* Use Cases Section */}
              {service.useCases && service.useCases.length > 0 && (
                <Box mb={8}>
                  <Heading as="h2" size="lg" mb={4}>
                    Use Cases
                  </Heading>
                  <List spacing={3}>
                    {service.useCases.map((useCase: string) => (
                      <ListItem
                        key={useCase}
                        display="flex"
                        alignItems="center"
                        p={3}
                        borderWidth={1}
                        borderColor={cardBorderColor}
                        borderRadius="md"
                      >
                        <ListIcon as={FiTarget} color="blue.500" />
                        <Text>{useCase}</Text>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {/* Implementation Process */}
              <Heading as="h2" size="lg" mb={4}>
                Implementation Process
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={6} mb={8}>
                {[
                  { icon: FiUsers, title: 'Consultation', text: 'Requirements gathering and analysis' },
                  { icon: FiBox, title: 'Design', text: 'Solution architecture and planning' },
                  { icon: FiCode, title: 'Development', text: 'Implementation and testing' },
                  { icon: FiCheck, title: 'Deployment', text: 'Integration and monitoring' }
                ].map((step, index) => (
                  <Box
                    key={step.title}
                    p={6}
                    borderWidth={1}
                    borderColor={cardBorderColor}
                    borderRadius="lg"
                    textAlign="center"
                  >
                    <Flex
                      w={12}
                      h={12}
                      bg="blue.500"
                      color="white"
                      borderRadius="full"
                      align="center"
                      justify="center"
                      mx="auto"
                      mb={4}
                    >
                      <Icon as={step.icon} boxSize={6} />
                    </Flex>
                    <Text fontWeight="bold" mb={2}>
                      {step.title}
                    </Text>
                    <Text color={textColor}>{step.text}</Text>
                  </Box>
                ))}
              </Grid>
            </Box>

            {/* Right Sidebar */}
            <Box>
              <Box
                position="sticky"
                top={8}
                p={6}
                borderWidth={1}
                borderColor={cardBorderColor}
                borderRadius="xl"
                bg={cardBgColor}
              >
                <Heading size="lg" mb={6}>
                  Contact Us
                </Heading>
                <Stack spacing={4}>
                  <Button
                    size="lg"
                    colorScheme="blue"
                    width="full"
                    height={14}
                    leftIcon={<Icon as={FiMessageSquare} />}
                    onClick={() => navigate('/contact')}
                  >
                    Request Information
                  </Button>
                  <Button
                    size="lg"
                    colorScheme="green"
                    width="full"
                    height={14}
                    leftIcon={<Icon as={FiUsers} />}
                    onClick={() => window.location.href = 'tel:+1234567890'}
                  >
                    Schedule Consultation
                  </Button>
                  {service.brochureUrl && (
                    <Button
                      size="lg"
                      colorScheme="purple"
                      width="full"
                      height={14}
                      leftIcon={<Icon as={FiDownload} />}
                      onClick={() => window.open(service.brochureUrl, '_blank')}
                    >
                      Download Brochure
                    </Button>
                  )}
                  <Box p={4} bg={featuresBgColor} borderRadius="md">
                    <Stack spacing={3}>
                      <Text fontSize="md" fontWeight="bold" color={textColor}>
                        Why Choose Us:
                      </Text>
                      <Text fontSize="sm" color={textColor}>
                        ✓ Expert Consultation
                      </Text>
                      <Text fontSize="sm" color={textColor}>
                        ✓ Customized Solutions
                      </Text>
                      <Text fontSize="sm" color={textColor}>
                        ✓ Dedicated Support
                      </Text>
                      <Text fontSize="sm" color={textColor}>
                        ✓ Industry Best Practices
                      </Text>
                    </Stack>
                  </Box>
                  <Flex direction="column" align="center" mt={4}>
                    <Text fontSize="sm" color={textColor} mb={2}>
                      Need immediate assistance?
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color="blue.500">
                      +1 (234) 567-8900
                    </Text>
                    <Text fontSize="sm" color={textColor} mt={1}>
                      support@yourcompany.com
                    </Text>
                  </Flex>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ServiceDetailPage;
