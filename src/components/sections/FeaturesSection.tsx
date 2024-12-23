import React from 'react';
import { Box, Container, Heading, Text, Grid, Icon, Button, useColorModeValue, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface FeaturesSectionProps {
  images?: string[];
}

const features = [
  {
    title: 'Responsive Design',
    description: 'Optimized for all devices',
  },
  {
    title: 'Performance',
    description: 'Lightning-fast load times',
  },
  {
    title: 'Security',
    description: 'Enterprise-grade protection',
  },
];

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ images }) => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
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
                bg={cardBg}
                borderWidth={1}
                borderColor={borderColor}
                _hover={{
                  transform: 'translateY(-8px)',
                  boxShadow: 'xl',
                  borderColor: 'blue.400',
                }}
                transition="all 0.3s ease"
              >
                {images && (
                  <Image
                    src={images[index]}
                    w={8}
                    h={8}
                    mb={4}
                    borderRadius="full"
                    objectFit="cover"
                  />
                )}
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
