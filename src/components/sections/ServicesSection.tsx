import React from 'react';
import { Box, Container, Heading, Text, Grid, Icon, Stack, Flex, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { ServiceCategory } from '../../types/service';

interface ServicesSectionProps {
  serviceCategories: ServiceCategory[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ serviceCategories }) => {
  const navigate = useNavigate();
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const cardBorderColor = useColorModeValue('gray.200', 'gray.700');
  const highlightColor = useColorModeValue('blue.500', 'blue.300');
  const hoverBgColor = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box id="services">
      <Container maxW="container.xl" py={20}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Heading
            as="h2"
            fontSize={{ base: '3xl', md: '4xl' }}
            mb={4}
            textAlign="center"
          >
            Our Services
          </Heading>
          <Text color={textColor} textAlign="center" mb={12} maxW="2xl" mx="auto">
            Comprehensive digital solutions tailored to your business needs
          </Text>
        </motion.div>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
          {serviceCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              onClick={() =>
                navigate(`/services/${category.title.toLowerCase().replace(/\s+/g, '-')}`)
              }
              style={{ cursor: 'pointer' }}
            >
              <Box
                bg={cardBgColor}
                p={8}
                borderRadius="xl"
                borderWidth={1}
                borderColor={cardBorderColor}
                height="100%"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: 'lg',
                  transition: 'all 0.3s ease',
                }}
              >
                <Icon as={category.icon} boxSize={12} color={highlightColor} mb={4} />
                <Heading size="lg" mb={6}>
                  {category.title}
                </Heading>
                <Stack spacing={4}>
                  {category.services.map((service) => (
                    <Box
                      key={service.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/services/${category.title.toLowerCase().replace(/\s+/g, '-')}/${
                            service.name.toLowerCase().replace(/\s+/g, '-')
                          }`
                        );
                      }}
                      cursor="pointer"
                      p={4}
                      borderRadius="md"
                      borderWidth={1}
                      borderColor={cardBorderColor}
                      _hover={{
                        bg: hoverBgColor,
                        transform: 'translateX(4px)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Flex align="center" justify="space-between">
                        <Box>
                          <Text fontWeight="semibold" mb={2}>
                            {service.name}
                          </Text>
                          <Text color={textColor} fontSize="sm">
                            {service.features[0]}
                            {service.features.length > 1 && '...'}
                          </Text>
                        </Box>
                        <Icon as={FiArrowRight} />
                      </Flex>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </motion.div>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesSection;
