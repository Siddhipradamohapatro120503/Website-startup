import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
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
  _id?: string;
  name: string;
  level: number;
}

interface Project {
  _id?: string;
  name: string;
  status: 'completed' | 'in-progress' | 'cancelled';
  clientRating: number;
}

interface Freelancer {
  _id: string;
  name: string;
  avatar?: string;
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
  email: string;
  phone: string;
  location: string;
  bio: string;
}

const FreelancerManagement: React.FC = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [selectedFreelancer, setSelectedFreelancer] = useState<Freelancer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const [localData, setLocalData] = useState<Partial<Freelancer>>({});
  const [localSkills, setLocalSkills] = useState<Skill[]>([]);
  const [localProjects, setLocalProjects] = useState<Project[]>([]);
  const [editedData, setEditedData] = useState<Partial<Freelancer>>({});
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchFreelancers();
  }, []);

  useEffect(() => {
    if (selectedFreelancer) {
      setLocalData({
        name: selectedFreelancer.name,
        email: selectedFreelancer.email,
        phone: selectedFreelancer.phone,
        location: selectedFreelancer.location,
        title: selectedFreelancer.title,
        bio: selectedFreelancer.bio,
      });
      setLocalSkills([...selectedFreelancer.skills]);
      setLocalProjects([...selectedFreelancer.projects]);
      setEditedData({});
    }
  }, [selectedFreelancer]);

  const handleLocalInputChange = (field: keyof Freelancer, value: any) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocalSkillUpdate = (newSkills: Skill[]) => {
    setLocalSkills(newSkills);
    setEditedData(prev => ({ ...prev, skills: newSkills }));
  };

  const handleLocalProjectUpdate = (newProjects: Project[]) => {
    setLocalProjects(newProjects);
    setEditedData(prev => ({ ...prev, projects: newProjects }));
  };

  const fetchFreelancers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/api/freelancers');
      setFreelancers(response.data);
    } catch (error) {
      console.error('Error fetching freelancers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateFreelancer = async (id: string, updatedData: Partial<Freelancer>) => {
    try {
      console.log('Updating freelancer:', id);
      console.log('Update data:', updatedData);

      // Ensure skills array is properly formatted
      if (updatedData.skills) {
        updatedData.skills = updatedData.skills.map(skill => ({
          name: skill.name.trim(),
          level: typeof skill.level === 'string' ? parseInt(skill.level) : skill.level
        })).filter(skill => skill.name && !isNaN(skill.level) && skill.level >= 0 && skill.level <= 100);
      }

      // Ensure projects array is properly formatted
      if (updatedData.projects) {
        updatedData.projects = updatedData.projects.map(project => ({
          name: project.name.trim(),
          status: project.status,
          clientRating: typeof project.clientRating === 'string' ? 
            parseFloat(project.clientRating) : project.clientRating
        })).filter(project => 
          project.name && 
          ['completed', 'in-progress', 'cancelled'].includes(project.status) &&
          !isNaN(project.clientRating) &&
          project.clientRating >= 0 && 
          project.clientRating <= 5
        );
      }

      console.log('Sanitized update data:', updatedData);

      const response = await axios.put(`http://localhost:5000/api/freelancers/${id}`, updatedData);
      console.log('Server response:', response.data);

      setFreelancers(freelancers.map(f => f._id === id ? response.data : f));
      if (selectedFreelancer?._id === id) {
        setSelectedFreelancer(response.data);
      }
    } catch (error) {
      console.error('Error updating freelancer:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Server error response:', error.response.data);
          // You might want to show this error to the user via a toast or alert
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
      }
    }
  };

  const handleDeleteFreelancer = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/freelancers/${id}`);
      setFreelancers(freelancers.filter(f => f._id !== id));
      if (selectedFreelancer?._id === id) {
        setSelectedFreelancer(null);
        onClose();
      }
    } catch (error) {
      console.error('Error deleting freelancer:', error);
    }
  };

  const handleEditFreelancer = (freelancer: Freelancer) => {
    setSelectedFreelancer(freelancer);
    onOpen();
  };

  const handleAddNewFreelancer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const newFreelancer = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string || '',
        location: formData.get('location') as string || '',
        title: formData.get('title') as string,
        bio: formData.get('bio') as string || '',
        skills: [] as Skill[],
        projects: [] as Project[],
        rating: 0,
        availability: {
          status: 'available' as const
        },
        metrics: {
          completedProjects: 0,
          totalEarnings: 0,
          avgResponseTime: '24 hours'
        }
      };

      const response = await axios.post('http://localhost:5000/api/freelancers', newFreelancer);
      setFreelancers([...freelancers, response.data]);
      onClose();
      setIsAddMode(false);
    } catch (error) {
      console.error('Error adding freelancer:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server error:', error.response.data);
      }
    }
  };

  const handleSaveChanges = async () => {
    if (!selectedFreelancer || !Object.keys(editedData).length) return;

    try {
      setIsSaving(true);

      // Initialize validated data
      const validatedData: Record<string, any> = {};

      // Handle basic string fields
      if (editedData.name) validatedData.name = String(editedData.name).trim();
      if (editedData.email) validatedData.email = String(editedData.email).trim();
      if (editedData.phone) validatedData.phone = String(editedData.phone).trim();
      if (editedData.location) validatedData.location = String(editedData.location).trim();
      if (editedData.title) validatedData.title = String(editedData.title).trim();
      if (editedData.bio) validatedData.bio = String(editedData.bio).trim();

      // Handle skills
      if (editedData.skills && Array.isArray(editedData.skills)) {
        validatedData.skills = editedData.skills
          .filter(skill => skill && skill.name)
          .map(skill => ({
            name: String(skill.name).trim(),
            level: Math.min(100, Math.max(0, Number(skill.level) || 0))
          }));
      }

      // Handle projects
      if (editedData.projects && Array.isArray(editedData.projects)) {
        validatedData.projects = editedData.projects
          .filter(project => project && project.name)
          .map(project => ({
            name: String(project.name).trim(),
            status: project.status || 'in-progress',
            clientRating: Math.min(5, Math.max(0, Number(project.clientRating) || 0))
          }));
      }

      console.log('Sending validated data:', validatedData);

      const response = await axios.put<Freelancer>(
        `http://localhost:5000/api/freelancers/${selectedFreelancer._id}`,
        validatedData
      );

      const updatedFreelancer = response.data;
      setFreelancers(prev => 
        prev.map(f => f._id === selectedFreelancer._id ? updatedFreelancer : f)
      );
      setSelectedFreelancer(updatedFreelancer);
      setEditedData({});
      toast({
        title: "Changes saved successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error('Failed to save changes:', err);
      toast({
        title: "Failed to save changes",
        description: "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
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
          <MenuItem icon={<FiTrash2 />} color="red.500" onClick={() => handleDeleteFreelancer(freelancer._id)}>
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
            <Box key={skill._id || skill.name}>
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
    <Box p={4}>
      <HStack justify="space-between" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Freelancer Management
        </Text>
        <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={() => {
          setIsAddMode(true);
          onOpen();
        }}>
          Add New Freelancer
        </Button>
      </HStack>

      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {freelancers.map((freelancer) => (
          <FreelancerCard key={freelancer._id} freelancer={freelancer} />
        ))}
      </Grid>

      {isAddMode ? (
        <Drawer isOpen={isOpen} placement="right" onClose={() => {
          onClose();
          setIsAddMode(false);
        }} size="lg">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Add New Freelancer</DrawerHeader>
            <DrawerBody>
              <form id="add-freelancer-form" onSubmit={handleAddNewFreelancer}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input name="name" placeholder="Enter full name" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" type="email" placeholder="Enter email" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input name="phone" placeholder="Enter phone number" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Location</FormLabel>
                    <Input name="location" placeholder="Enter location" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Professional Title</FormLabel>
                    <Input name="title" placeholder="Enter professional title" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Bio</FormLabel>
                    <Textarea name="bio" placeholder="Enter bio" />
                  </FormControl>
                </VStack>
              </form>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={() => {
                onClose();
                setIsAddMode(false);
              }}>
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit" form="add-freelancer-form">
                Add Freelancer
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : selectedFreelancer && (
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          size="lg"
          closeOnOverlayClick={false}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Edit Freelancer</DrawerHeader>
            <DrawerBody>
              <Tabs>
                <TabList>
                  <Tab>Profile</Tab>
                  <Tab>Skills</Tab>
                  <Tab>Projects</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                          value={localData.name ?? selectedFreelancer.name}
                          onChange={(e) => handleLocalInputChange('name', e.target.value)}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                          value={localData.email ?? selectedFreelancer.email}
                          onChange={(e) => handleLocalInputChange('email', e.target.value)}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Phone</FormLabel>
                        <Input
                          value={localData.phone ?? selectedFreelancer.phone}
                          onChange={(e) => handleLocalInputChange('phone', e.target.value)}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Location</FormLabel>
                        <Input
                          value={localData.location ?? selectedFreelancer.location}
                          onChange={(e) => handleLocalInputChange('location', e.target.value)}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                          value={localData.title ?? selectedFreelancer.title}
                          onChange={(e) => handleLocalInputChange('title', e.target.value)}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Bio</FormLabel>
                        <Textarea
                          value={localData.bio ?? selectedFreelancer.bio}
                          onChange={(e) => handleLocalInputChange('bio', e.target.value)}
                        />
                      </FormControl>
                    </VStack>
                  </TabPanel>

                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      {localSkills.map((skill, index) => (
                        <Box key={skill._id || index} p={4} borderWidth={1} borderRadius="md">
                          <FormControl>
                            <FormLabel>Skill Name</FormLabel>
                            <Input
                              value={skill.name}
                              onChange={(e) => {
                                const newSkills = [...localSkills];
                                newSkills[index].name = e.target.value;
                                handleLocalSkillUpdate(newSkills);
                              }}
                            />
                          </FormControl>
                          <FormControl mt={2}>
                            <FormLabel>Skill Level (0-100)</FormLabel>
                            <NumberInput
                              min={0}
                              max={100}
                              value={skill.level}
                              onChange={(value) => {
                                const newSkills = [...localSkills];
                                newSkills[index].level = parseInt(value);
                                handleLocalSkillUpdate(newSkills);
                              }}
                            >
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>
                          <Button
                            colorScheme="red"
                            mt={2}
                            onClick={() => {
                              const newSkills = localSkills.filter((_, i) => i !== index);
                              handleLocalSkillUpdate(newSkills);
                            }}
                          >
                            Remove Skill
                          </Button>
                        </Box>
                      ))}
                      <Button
                        leftIcon={<FiPlus />}
                        onClick={() => {
                          handleLocalSkillUpdate([
                            ...localSkills,
                            {
                              _id: `temp-${Date.now()}`,
                              name: '',
                              level: 0
                            }
                          ]);
                        }}
                      >
                        Add Skill
                      </Button>
                    </VStack>
                  </TabPanel>

                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      {localProjects.map((project, index) => (
                        <Box key={project._id || index} p={4} borderWidth={1} borderRadius="md">
                          <FormControl>
                            <FormLabel>Project Name</FormLabel>
                            <Input
                              value={project.name}
                              onChange={(e) => {
                                const newProjects = [...localProjects];
                                newProjects[index].name = e.target.value;
                                handleLocalProjectUpdate(newProjects);
                              }}
                            />
                          </FormControl>
                          <FormControl mt={2}>
                            <FormLabel>Status</FormLabel>
                            <Select
                              value={project.status}
                              onChange={(e) => {
                                const newProjects = [...localProjects];
                                newProjects[index].status = e.target.value as any;
                                handleLocalProjectUpdate(newProjects);
                              }}
                            >
                              <option value="completed">Completed</option>
                              <option value="in-progress">In Progress</option>
                              <option value="cancelled">Cancelled</option>
                            </Select>
                          </FormControl>
                          <FormControl mt={2}>
                            <FormLabel>Client Rating (0-5)</FormLabel>
                            <NumberInput
                              min={0}
                              max={5}
                              step={0.1}
                              value={project.clientRating}
                              onChange={(value) => {
                                const newProjects = [...localProjects];
                                newProjects[index].clientRating = parseFloat(value);
                                handleLocalProjectUpdate(newProjects);
                              }}
                            >
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>
                          <Button
                            colorScheme="red"
                            mt={2}
                            onClick={() => {
                              const newProjects = localProjects.filter((_, i) => i !== index);
                              handleLocalProjectUpdate(newProjects);
                            }}
                          >
                            Remove Project
                          </Button>
                        </Box>
                      ))}
                      <Button
                        leftIcon={<FiPlus />}
                        onClick={() => {
                          handleLocalProjectUpdate([
                            ...localProjects,
                            {
                              _id: `temp-${Date.now()}`,
                              name: '',
                              status: 'in-progress',
                              clientRating: 0
                            }
                          ]);
                        }}
                      >
                        Add Project
                      </Button>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleSaveChanges}
                isLoading={isSaving}
                isDisabled={!Object.keys(editedData).length}
              >
                Save Changes
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </Box>
  );
};

export default FreelancerManagement;
