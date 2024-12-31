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
    <Container maxW="container.xl" py={{ base: 4, md: 8 }}>
      {/* Header with Theme Toggle and Logout */}
      <Flex 
        mb={{ base: 4, md: 6 }} 
        align="center" 
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 4, sm: 0 }}
      >
        <Heading size={{ base: "md", lg: "lg" }}>Dashboard</Heading>
        <Spacer />
        <HStack spacing={{ base: 2, md: 4 }}>
          <Button
            onClick={toggleColorMode}
            size={{ base: "xs", md: "sm" }}
            variant="ghost"
            leftIcon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
          >
            {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
          <Button
            onClick={handleLogout}
            colorScheme="red"
            variant="outline"
            size={{ base: "xs", md: "sm" }}
            leftIcon={<FiLogOut />}
          >
            Logout
          </Button>
        </HStack>
      </Flex>

      <Grid
        templateColumns={{ base: '1fr', lg: '1fr 2fr' }}
        gap={{ base: 4, md: 8 }}
      >
        {/* Left Column - User Profile */}
        <VStack spacing={{ base: 4, md: 8 }}>
          <UserProfile />
          
          {/* Quick Stats */}
          <Box
            w="100%"
            bg={bgColor}
            borderRadius="lg"
            p={{ base: 4, md: 6 }}
            borderWidth={1}
            borderColor={borderColor}
          >
            <VStack spacing={{ base: 3, md: 4 }} align="stretch">
              <Heading size={{ base: "sm", md: "md" }}>Overview</Heading>
              {loading ? (
                <Box textAlign="center" py={4}>
                  <Spinner size="lg" />
                </Box>
              ) : (
                <Grid 
                  templateColumns={{ base: "1fr", sm: "1fr 1fr" }} 
                  gap={{ base: 3, md: 4 }}
                >
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
        <Box w="100%">
          <Tabs variant="enclosed">
            <TabList>
              <Tab fontSize={{ base: "sm", md: "md" }}>
                <HStack spacing={{ base: 1, md: 2 }}>
                  <Icon as={FiList} />
                  <Text>Services</Text>
                </HStack>
              </Tab>
              <Tab fontSize={{ base: "sm", md: "md" }}>
                <HStack spacing={{ base: 1, md: 2 }}>
                  <Icon as={FiDollarSign} />
                  <Text>Payments</Text>
                </HStack>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel p={{ base: 2, md: 4 }}>
                <VStack spacing={{ base: 4, md: 8 }} align="stretch">
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
