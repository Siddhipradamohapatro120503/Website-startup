import React, { useState } from 'react';
import {
  Box,
  Grid,
  Text,
  Badge,
  VStack,
  HStack,
  Button,
  Avatar,
  Progress,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';
import {
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiMessageSquare,
  FiStar,
  FiPlus,
  FiBriefcase,
  FiClock,
  FiDollarSign,
} from 'react-icons/fi';

interface Skill {
  name: string;
  level: number;
}

interface Project {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'cancelled';
  clientRating: number;
}

interface Freelancer {
  id: string;
  name: string;
  avatar: string;
  title: string;
  skills: Skill[];
  rating: number;
  projects: Project[];
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    nextAvailable?: string;
  };
  metrics: {
    completedProjects: number;
    totalEarnings: number;
    avgResponseTime: string;
  };
}

const FreelancerManagement: React.FC = () => {
  const [selectedFreelancer, setSelectedFreelancer] = useState<Freelancer | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Mock data - replace with actual API call
  const freelancers: Freelancer[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      avatar: 'https://bit.ly/dan-abramov',
      title: 'Senior Full Stack Developer',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Node.js', level: 85 },
        { name: 'TypeScript', level: 80 },
      ],
      rating: 4.8,
      projects: [
        {
          id: '1',
          name: 'E-commerce Platform',
          status: 'completed',
          clientRating: 5,
        },
      ],
      availability: {
        status: 'available',
      },
      metrics: {
        completedProjects: 45,
        totalEarnings: 75000,
        avgResponseTime: '2 hours',
      },
    },
    // Add more mock freelancers
  ];

  const handleEditFreelancer = (freelancer: Freelancer) => {
    setSelectedFreelancer(freelancer);
    onOpen();
  };

  const FreelancerCard: React.FC<{ freelancer: Freelancer }> = ({ freelancer }) => (
    <Box
      p="6"
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      position="relative"
    >
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<FiMoreVertical />}
          variant="ghost"
          size="sm"
          position="absolute"
          top="4"
          right="4"
        />
        <MenuList>
          <MenuItem icon={<FiEdit2 />} onClick={() => handleEditFreelancer(freelancer)}>
            Edit Profile
          </MenuItem>
          <MenuItem icon={<FiMail />}>Send Message</MenuItem>
          <MenuItem icon={<FiTrash2 />} color="red.500">
            Deactivate Account
          </MenuItem>
        </MenuList>
      </Menu>

      <VStack spacing="4">
        <Avatar size="xl" name={freelancer.name} src={freelancer.avatar} />
        <Box textAlign="center">
          <Text fontSize="xl" fontWeight="bold">
            {freelancer.name}
          </Text>
          <Text color="gray.500">{freelancer.title}</Text>
        </Box>

        <HStack>
          <Badge
            colorScheme={
              freelancer.availability.status === 'available'
                ? 'green'
                : freelancer.availability.status === 'busy'
                ? 'orange'
                : 'red'
            }
          >
            {freelancer.availability.status}
          </Badge>
          <Badge colorScheme="blue">
            {freelancer.rating} <FiStar style={{ display: 'inline' }} />
          </Badge>
        </HStack>

        <Grid templateColumns="repeat(3, 1fr)" gap="4" w="full">
          <Box textAlign="center">
            <HStack justify="center" color="gray.500" mb="1">
              <FiBriefcase />
              <Text fontSize="sm">Projects</Text>
            </HStack>
            <Text fontWeight="bold">{freelancer.metrics.completedProjects}</Text>
          </Box>
          <Box textAlign="center">
            <HStack justify="center" color="gray.500" mb="1">
              <FiDollarSign />
              <Text fontSize="sm">Earnings</Text>
            </HStack>
            <Text fontWeight="bold">${(freelancer.metrics.totalEarnings / 1000).toFixed(1)}k</Text>
          </Box>
          <Box textAlign="center">
            <HStack justify="center" color="gray.500" mb="1">
              <FiClock />
              <Text fontSize="sm">Response</Text>
            </HStack>
            <Text fontWeight="bold">{freelancer.metrics.avgResponseTime}</Text>
          </Box>
        </Grid>

        <VStack align="stretch" w="full">
          {freelancer.skills.slice(0, 3).map((skill) => (
            <Box key={skill.name}>
              <HStack justify="space-between" mb="1">
                <Text fontSize="sm">{skill.name}</Text>
                <Text fontSize="sm" color="gray.500">
                  {skill.level}%
                </Text>
              </HStack>
              <Progress value={skill.level} size="sm" colorScheme="blue" borderRadius="full" />
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );

  return (
    <Box>
      {/* Header Actions */}
      <HStack mb="6" justify="space-between">
        <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={() => {
          setSelectedFreelancer(null);
          onOpen();
        }}>
          Add New Freelancer
        </Button>
      </HStack>

      {/* Freelancers Grid */}
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="6">
        {freelancers.map((freelancer) => (
          <FreelancerCard key={freelancer.id} freelancer={freelancer} />
        ))}
      </Grid>

      {/* Freelancer Edit Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {selectedFreelancer ? 'Edit Freelancer Profile' : 'Add New Freelancer'}
          </DrawerHeader>

          <DrawerBody>
            <Tabs>
              <TabList>
                <Tab>Basic Info</Tab>
                <Tab>Skills</Tab>
                <Tab>Projects</Tab>
                <Tab>Settings</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <VStack spacing="6">
                    <FormControl>
                      <FormLabel>Full Name</FormLabel>
                      <Input defaultValue={selectedFreelancer?.name} />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Professional Title</FormLabel>
                      <Input defaultValue={selectedFreelancer?.title} />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Availability Status</FormLabel>
                      <Select defaultValue={selectedFreelancer?.availability.status}>
                        <option value="available">Available</option>
                        <option value="busy">Busy</option>
                        <option value="unavailable">Unavailable</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Bio</FormLabel>
                      <Textarea />
                    </FormControl>
                  </VStack>
                </TabPanel>

                {/* Add content for other tabs */}
              </TabPanels>
            </Tabs>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default FreelancerManagement;
