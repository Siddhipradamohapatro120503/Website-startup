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
    <Container 
      maxW="container.xl" 
      py={{ base: 4, md: 8 }}
      px={{ base: 2, sm: 4, md: 6 }}
    >
      {/* Header with Theme Toggle and Logout */}
      <Flex 
        mb={{ base: 4, md: 6 }} 
        direction="row"
        align="center"
        justify="space-between"
        w="full"
        flexWrap={{ base: "wrap", sm: "nowrap" }}
        gap={2}
        pr={{ base: 0, sm: 2, md: 4 }}
      >
        <Heading 
          size={{ base: "md", lg: "lg" }}
          textAlign="left"
          mb={{ base: 0, sm: 0 }}
          flex="1"
        >
          Dashboard
        </Heading>
        
        <Flex 
          gap={2}
          justify="flex-end"
          ml="auto"
          minW={{ base: "auto", sm: "180px" }}
        >
          <Button
            onClick={toggleColorMode}
            size="sm"
            variant="ghost"
            leftIcon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
            fontSize="sm"
            minW={{ base: "70px", sm: "80px" }}
          >
            {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button>
          <Button
            onClick={handleLogout}
            colorScheme="red"
            variant="outline"
            size="sm"
            leftIcon={<FiLogOut />}
            fontSize="sm"
            minW={{ base: "70px", sm: "80px" }}
          >
            Logout
          </Button>
        </Flex>
      </Flex>

      <Grid
        templateColumns={{ base: '1fr', lg: '1fr 2fr' }}
        gap={{ base: 4, md: 8 }}
      >
        {/* Left Column - User Profile */}
        <VStack spacing={{ base: 3, md: 8 }}>
          <UserProfile />
          
          {/* Quick Stats */}
          <Box
            w="100%"
            bg={bgColor}
            borderRadius="lg"
            p={{ base: 3, md: 6 }}
            borderWidth={1}
            borderColor={borderColor}
          >
            <VStack spacing={{ base: 2, md: 4 }} align="stretch">
              <Heading size={{ base: "sm", md: "md" }}>Overview</Heading>
              {loading ? (
                <Box textAlign="center" py={{ base: 2, md: 4 }}>
                  <Spinner size={{ base: "md", md: "lg" }} />
                </Box>
              ) : (
                <Grid 
                  templateColumns={{ base: "1fr", sm: "1fr 1fr" }} 
                  gap={{ base: 3, md: 4 }}
                >
                  <Stat size={{ base: "sm", md: "md" }}>
                    <StatLabel fontSize={{ base: "xs", md: "sm" }}>Active Services</StatLabel>
                    <StatNumber fontSize={{ base: "lg", md: "2xl" }}>{activeServices}</StatNumber>
                    <StatHelpText fontSize={{ base: "xs", md: "sm" }}>
                      <HStack spacing={{ base: 1, md: 2 }}>
                        <Icon as={FiActivity} color="green.500" boxSize={{ base: 3, md: 4 }} />
                        <Text>Currently Active</Text>
                      </HStack>
                    </StatHelpText>
                  </Stat>
                  <Stat size={{ base: "sm", md: "md" }}>
                    <StatLabel fontSize={{ base: "xs", md: "sm" }}>Pending</StatLabel>
                    <StatNumber fontSize={{ base: "lg", md: "2xl" }}>{pendingServices}</StatNumber>
                    <StatHelpText fontSize={{ base: "xs", md: "sm" }}>
                      <HStack spacing={{ base: 1, md: 2 }}>
                        <Icon as={FiClock} color="yellow.500" boxSize={{ base: 3, md: 4 }} />
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
          <Tabs 
            variant="enclosed"
            isFitted
            size={{ base: "sm", md: "md" }}
          >
            <TabList>
              <Tab 
                fontSize={{ base: "xs", md: "md" }}
                py={{ base: 2, md: 3 }}
                px={{ base: 2, md: 4 }}
              >
                <HStack spacing={{ base: 1, md: 2 }}>
                  <Icon as={FiList} boxSize={{ base: 3, md: 4 }} />
                  <Text>Services</Text>
                </HStack>
              </Tab>
              <Tab 
                fontSize={{ base: "xs", md: "md" }}
                py={{ base: 2, md: 3 }}
                px={{ base: 2, md: 4 }}
              >
                <HStack spacing={{ base: 1, md: 2 }}>
                  <Icon as={FiDollarSign} boxSize={{ base: 3, md: 4 }} />
                  <Text>Payments</Text>
                </HStack>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel px={{ base: 0, md: 4 }} py={{ base: 2, md: 4 }}>
                <VStack spacing={{ base: 3, md: 8 }} align="stretch">
                  <Box>
                    <RegisteredServices />
                  </Box>
                  <Box>
                    <ServicesList />
                  </Box>
                </VStack>
              </TabPanel>
              <TabPanel px={{ base: 0, md: 4 }} py={{ base: 2, md: 4 }}>
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
