import React from 'react';
import { Box, Container, Heading, Text, Grid, Icon, Button, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiLayout, FiCode, FiLayers, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'Responsive Design',
    description: 'Optimized for all devices',
    icon: FiLayout,
  },
  {
    title: 'Performance',
    description: 'Lightning-fast load times',
    icon: FiCode,
  },
  {
    title: 'Security',
    description: 'Enterprise-grade protection',
    icon: FiLayers,
  },
];

const FeaturesSection: React.FC = () => {
  const navigate = useNavigate();
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const cardBorderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box id="features">
      <Container maxW="container.xl" py={20}>
        <Heading
          as="h2"
          fontSize={{ base: '3xl', md: '4xl' }}
          mb={12}
          textAlign="center"
        >
          Key Features
        </Heading>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Box
                p={8}
                borderRadius="xl"
                bg={cardBgColor}
                borderWidth={1}
                borderColor={cardBorderColor}
                _hover={{
                  transform: 'translateY(-8px)',
                  boxShadow: 'xl',
                  borderColor: 'blue.400',
                }}
                transition="all 0.3s ease"
              >
                <Icon as={feature.icon} w={8} h={8} mb={4} color="blue.400" />
                <Heading size="md" mb={4}>
                  {feature.title}
                </Heading>
                <Text color={textColor}>{feature.description}</Text>
              </Box>
            </motion.div>
          ))}
        </Grid>
        <Box textAlign="center" mt={8}>
          <Button
            size="lg"
            colorScheme="blue"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate('/features');
            }}
            rightIcon={<Icon as={FiArrowRight} />}
          >
            View All Features
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
