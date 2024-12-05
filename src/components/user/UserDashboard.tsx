import React, { useRef } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  useColorModeValue,
  Container,
  VStack,
  HStack,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
} from '@chakra-ui/react';
import { FiActivity, FiClock, FiCheckCircle, FiList } from 'react-icons/fi';
import ServicesList from './ServicesList';
import UserProfile from './UserProfile';
import RegisteredServices from './RegisteredServices';
import { ServicesProvider } from '../../context/ServicesContext';

const UserDashboard: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const registeredServicesRef = useRef<HTMLDivElement>(null);

  const scrollToRegisteredServices = () => {
    registeredServicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ServicesProvider>
      <Container maxW="container.xl" py={8}>
        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 2fr' }}
          gap={8}
        >
          {/* Left Column - User Profile */}
          <VStack spacing={8}>
            <UserProfile />
            
            {/* Quick Stats */}
            <Box
              w="100%"
              bg={bgColor}
              borderRadius="lg"
              p={6}
              borderWidth={1}
              borderColor={borderColor}
            >
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Heading size="md">Overview</Heading>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    leftIcon={<Icon as={FiList} />}
                    onClick={scrollToRegisteredServices}
                  >
                    View Registered Services
                  </Button>
                </HStack>
                <Grid templateColumns="repeat(1, 1fr)" gap={4}>
                  <Stat>
                    <StatLabel>Active Services</StatLabel>
                    <HStack>
                      <Icon as={FiCheckCircle} color="green.500" />
                      <StatNumber>3</StatNumber>
                    </HStack>
                    <StatHelpText>Currently enrolled</StatHelpText>
                  </Stat>
                  <Stat>
                    <StatLabel>Hours Used</StatLabel>
                    <HStack>
                      <Icon as={FiClock} color="blue.500" />
                      <StatNumber>24</StatNumber>
                    </HStack>
                    <StatHelpText>This month</StatHelpText>
                  </Stat>
                  <Stat>
                    <StatLabel>Activity Score</StatLabel>
                    <HStack>
                      <Icon as={FiActivity} color="purple.500" />
                      <StatNumber>85%</StatNumber>
                    </HStack>
                    <StatHelpText>Good standing</StatHelpText>
                  </Stat>
                </Grid>
              </VStack>
            </Box>
          </VStack>

          {/* Right Column - Services */}
          <VStack spacing={8} align="stretch">
            {/* Registered Services */}
            <Box ref={registeredServicesRef}>
              <Heading size="md" mb={4}>Your Registered Services</Heading>
              <RegisteredServices />
            </Box>

            {/* Available Services */}
            <Box>
              <Heading size="md" mb={4}>Available Services</Heading>
              <Text color="gray.600" mb={4}>
                Discover and register for new services that match your needs
              </Text>
              <ServicesList />
            </Box>
          </VStack>
        </Grid>
      </Container>
    </ServicesProvider>
  );
};

export default UserDashboard;
