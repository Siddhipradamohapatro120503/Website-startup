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
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { serviceCategories } from '../data/services';
import { Service, ServiceCategory } from '../types/service';

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
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>{category.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Heading as="h1" size="2xl" mb={8}>
            {category.title}
          </Heading>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={8}>
            {category.services.map((service: Service, index: number) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box
                  bg={cardBgColor}
                  p={8}
                  borderRadius="xl"
                  borderWidth={1}
                  borderColor={cardBorderColor}
                  height="100%"
                >
                  <Icon as={service.icon} boxSize={8} color="blue.500" mb={4} />
                  <Heading size="lg" mb={6}>
                    {service.name}
                  </Heading>
                  <Stack spacing={4}>
                    {service.features.map((feature: string) => (
                      <Stack key={feature} direction="row" align="center">
                        <Icon as={FiCheck} color="green.500" />
                        <Text color={textColor}>{feature}</Text>
                      </Stack>
                    ))}
                  </Stack>
                  <Button
                    colorScheme="blue"
                    size="lg"
                    mt={8}
                    width="full"
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
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ServiceDetails;
