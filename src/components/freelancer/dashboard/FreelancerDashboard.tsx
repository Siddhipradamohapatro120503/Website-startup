import React from 'react';
import {
  Box,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  VStack,
  HStack,
  Text,
  Progress,
  Badge,
  useColorModeValue,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { FaMoneyBillWave, FaStar, FaClock, FaProjectDiagram } from 'react-icons/fa';
import ProjectsList from './ProjectsList';
import AvailabilityCalendar from './AvailabilityCalendar';
import SkillsSection from './SkillsSection';
import FreelancerProfile from '../profile/FreelancerProfile';

interface DashboardStats {
  earnings: {
    total: number;
    thisMonth: number;
    growth: number;
  };
  projects: {
    total: number;
    active: number;
    completed: number;
  };
  rating: number;
  responseRate: number;
}

const FreelancerDashboard: React.FC = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const statCardBg = useColorModeValue('blue.50', 'blue.900');

  const stats: DashboardStats = {
    earnings: {
      total: 25000,
      thisMonth: 3200,
      growth: 12.5,
    },
    projects: {
      total: 48,
      active: 3,
      completed: 45,
    },
    rating: 4.8,
    responseRate: 95,
  };

  return (
    <Box p={4}>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Profile</Tab>
          <Tab>Projects</Tab>
          <Tab>Availability</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={8}>
              {/* Stats Cards */}
              <Card bg={statCardBg}>
                <CardBody>
                  <Stat>
                    <StatLabel>Total Earnings</StatLabel>
                    <HStack align="baseline">
                      <StatNumber>${stats.earnings.total.toLocaleString()}</StatNumber>
                      <Icon as={FaMoneyBillWave} />
                    </HStack>
                    <StatHelpText>
                      ${stats.earnings.thisMonth.toLocaleString()} this month
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>

              <Card bg={statCardBg}>
                <CardBody>
                  <Stat>
                    <StatLabel>Projects</StatLabel>
                    <HStack align="baseline">
                      <StatNumber>{stats.projects.total}</StatNumber>
                      <Icon as={FaProjectDiagram} />
                    </HStack>
                    <StatHelpText>
                      {stats.projects.active} active projects
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>

              <Card bg={statCardBg}>
                <CardBody>
                  <Stat>
                    <StatLabel>Rating</StatLabel>
                    <HStack align="baseline">
                      <StatNumber>{stats.rating.toFixed(1)}</StatNumber>
                      <Icon as={FaStar} color="yellow.400" />
                    </HStack>
                    <StatHelpText>
                      Based on {stats.projects.completed} reviews
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>

              <Card bg={statCardBg}>
                <CardBody>
                  <Stat>
                    <StatLabel>Response Rate</StatLabel>
                    <HStack align="baseline">
                      <StatNumber>{stats.responseRate}%</StatNumber>
                      <Icon as={FaClock} />
                    </HStack>
                    <StatHelpText>
                      Average response time: 2 hours
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              <Card bg={cardBg}>
                <CardBody>
                  <VStack align="stretch" spacing={4}>
                    <Text fontSize="lg" fontWeight="bold">
                      Recent Projects
                    </Text>
                    <ProjectsList />
                  </VStack>
                </CardBody>
              </Card>

              <Card bg={cardBg}>
                <CardBody>
                  <VStack align="stretch" spacing={4}>
                    <Text fontSize="lg" fontWeight="bold">
                      Skills & Expertise
                    </Text>
                    <SkillsSection />
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            <FreelancerProfile />
          </TabPanel>

          <TabPanel>
            <ProjectsList />
          </TabPanel>

          <TabPanel>
            <AvailabilityCalendar />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default FreelancerDashboard;
