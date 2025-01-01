import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
} from '@chakra-ui/react';
import {
  FaShippingFast,
  FaGlobeAmericas,
  FaBox,
  FaTruck,
  FaMapMarkedAlt,
  FaClock,
} from 'react-icons/fa';

interface ShippingCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  highlight?: string;
}

const ShippingCard: React.FC<ShippingCardProps> = ({ icon, title, description, highlight }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      p={6}
      bg={cardBg}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      }}
    >
      <Icon as={icon} w={8} h={8} color="blue.500" mb={4} />
      <Heading as="h3" size="md" mb={2}>
        {title}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')} mb={highlight ? 4 : 0}>
        {description}
      </Text>
      {highlight && (
        <Badge colorScheme="green" mt={2}>
          {highlight}
        </Badge>
      )}
    </Box>
  );
};

const ShippingAndDelivery = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const statsBg = useColorModeValue('blue.50', 'blue.900');

  const shippingMethods = [
    {
      icon: FaTruck,
      title: 'Standard Shipping',
      description: 'Reliable delivery within 3-5 business days',
      highlight: 'Free over $50',
    },
    {
      icon: FaShippingFast,
      title: 'Express Delivery',
      description: 'Fast delivery within 1-2 business days',
      highlight: 'From $14.99',
    },
    {
      icon: FaGlobeAmericas,
      title: 'International',
      description: 'Worldwide shipping to over 100 countries',
      highlight: 'From $19.99',
    },
  ];

  const shippingFeatures = [
    {
      icon: FaBox,
      title: 'Package Protection',
      description: 'All items carefully packaged to ensure safe delivery',
    },
    {
      icon: FaMapMarkedAlt,
      title: 'Real-time Tracking',
      description: 'Track your package at every step of its journey',
    },
    {
      icon: FaClock,
      title: 'Delivery Windows',
      description: 'Choose your preferred delivery time slot',
    },
  ];

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" mb={8}>
          <Heading as="h1" size="xl" mb={4}>
            Shipping and Delivery
          </Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
            Fast, reliable shipping to your doorstep
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {shippingMethods.map((method, index) => (
            <ShippingCard key={index} {...method} />
          ))}
        </SimpleGrid>

        <Box bg={statsBg} p={8} borderRadius="lg" my={8}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Stat>
              <StatLabel>Average Delivery Time</StatLabel>
              <StatNumber>3-5 Days</StatNumber>
              <StatHelpText>Standard Shipping</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Countries Served</StatLabel>
              <StatNumber>100+</StatNumber>
              <StatHelpText>Worldwide Coverage</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Satisfaction Rate</StatLabel>
              <StatNumber>99%</StatNumber>
              <StatHelpText>Happy Customers</StatHelpText>
            </Stat>
          </SimpleGrid>
        </Box>

        <Box bg={bgColor} p={8} borderRadius="lg">
          <Heading as="h2" size="lg" mb={6} textAlign="center">
            Additional Features
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {shippingFeatures.map((feature, index) => (
              <ShippingCard key={index} {...feature} />
            ))}
          </SimpleGrid>
        </Box>

        <Box textAlign="center" pt={4}>
          <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">
            Last updated: January 1, 2025
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default ShippingAndDelivery;
