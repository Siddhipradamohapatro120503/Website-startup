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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorMode,
  Flex,
  Spacer,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { FiActivity, FiClock, FiList, FiDollarSign, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ServicesList from './ServicesList';
import UserProfile from './UserProfile';
import RegisteredServices from './RegisteredServices';
import PaymentSection from './sections/PaymentSection';
import { ServicesProvider, useServices } from '../../context/ServicesContext';

const UserDashboard: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const toast = useToast();
  const { registeredServices, loading } = useServices();

  // Calculate service counts
  const activeServices = registeredServices?.filter(service => service.status === 'active').length || 0;
  const pendingServices = registeredServices?.filter(service => service.status === 'pending').length || 0;

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Show success toast
    toast({
      title: 'Logged out successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    // Redirect to login page
    navigate('/login');
  };

  return (
    <Container maxW="container.xl" py={8}>
      {/* Header with Theme Toggle and Logout */}
      <Flex mb={6} align="center">
        <Heading size="lg">Dashboard</Heading>
        <Spacer />
        <HStack spacing={4}>
          <Button
            onClick={toggleColorMode}
            size="sm"
            variant="ghost"
            leftIcon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
          >
            {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
          <Button
            onClick={handleLogout}
            colorScheme="red"
            variant="outline"
            size="sm"
            leftIcon={<FiLogOut />}
          >
            Logout
          </Button>
        </HStack>
      </Flex>

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
              <Heading size="md">Overview</Heading>
              {loading ? (
                <Box textAlign="center" py={4}>
                  <Spinner size="lg" />
                </Box>
              ) : (
                <Grid templateColumns="1fr 1fr" gap={4}>
                  <Stat>
                    <StatLabel>Active Services</StatLabel>
                    <StatNumber>{activeServices}</StatNumber>
                    <StatHelpText>
                      <HStack>
                        <Icon as={FiActivity} color="green.500" />
                        <Text>Currently Active</Text>
                      </HStack>
                    </StatHelpText>
                  </Stat>
                  <Stat>
                    <StatLabel>Pending</StatLabel>
                    <StatNumber>{pendingServices}</StatNumber>
                    <StatHelpText>
                      <HStack>
                        <Icon as={FiClock} color="yellow.500" />
                        <Text>Awaiting Action</Text>
                      </HStack>
                    </StatHelpText>
                  </Stat>
                </Grid>
              )}
            </VStack>
          </Box>
        </VStack>

        {/* Right Column - Services and Payments */}
        <Box>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>
                <HStack>
                  <Icon as={FiList} />
                  <Text>Services</Text>
                </HStack>
              </Tab>
              <Tab>
                <HStack>
                  <Icon as={FiDollarSign} />
                  <Text>Payments</Text>
                </HStack>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <VStack spacing={8} align="stretch">
                  <Box>
                    <RegisteredServices />
                  </Box>
                  <Box>
                    <ServicesList />
                  </Box>
                </VStack>
              </TabPanel>
              <TabPanel>
                <PaymentSection />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Grid>
    </Container>
  );
};

const WrappedUserDashboard: React.FC = () => (
  <ServicesProvider>
    <UserDashboard />
  </ServicesProvider>
);

export default WrappedUserDashboard;
