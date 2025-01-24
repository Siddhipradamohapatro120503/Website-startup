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
  FaClock,
  FaCheckCircle,
  FaUserClock,
  FaCalendarCheck,
  FaHeadset,
} from 'react-icons/fa';

interface ServiceDeliveryCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  highlight?: string;
}

const ServiceDeliveryCard: React.FC<ServiceDeliveryCardProps> = ({ icon, title, description, highlight }) => {
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

const ServiceDelivery = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const statsBg = useColorModeValue('blue.50', 'blue.900');

  const serviceDeliveryInfo = [
    {
      icon: FaClock,
      title: 'Service Initiation',
      description: 'Services begin within 24 hours after payment confirmation',
      highlight: '24hr Start',
    },
    {
      icon: FaUserClock,
      title: 'Service Schedule',
      description: 'Choose your preferred service time slot for optimal convenience',
      highlight: 'Flexible Timing',
    },
    {
      icon: FaCalendarCheck,
      title: 'Delivery Timeline',
      description: 'Clear timeline provided for each service milestone',
      highlight: 'Transparent Process',
    },
    {
      icon: FaHeadset,
      title: 'Support Access',
      description: '24/7 support available throughout service delivery',
      highlight: 'Always Available',
    },
  ];

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={4}>
            Service Delivery
          </Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
            Our commitment to timely and professional service delivery
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {serviceDeliveryInfo.map((info, index) => (
            <ServiceDeliveryCard key={index} {...info} />
          ))}
        </SimpleGrid>

        <Box
          bg={statsBg}
          p={6}
          borderRadius="lg"
          mt={8}
        >
          <Heading size="md" mb={4}>Service Guarantee</Heading>
          <Text>
            We are committed to delivering high-quality services on time, every time. Our service delivery process is designed to be transparent, efficient, and customer-focused.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default ServiceDelivery;
