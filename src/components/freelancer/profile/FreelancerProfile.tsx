import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Avatar,
  Heading,
  Text,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  IconButton,
  Badge,
} from '@chakra-ui/react';
import { FiEdit2, FiPlus, FiX } from 'react-icons/fi';
import { useAuth } from '../../../hooks/useAuth';
import api from '../../../services/api';

interface Skill {
  name: string;
  level: number;
}

interface FreelancerData {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  bio: string;
  phone?: string;
  location?: string;
  avatar?: string;
  skills: Skill[];
  hourlyRate: number;
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    nextAvailable?: string;
  };
}

const FreelancerProfile: React.FC = () => {
  const { user, getCurrentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<FreelancerData>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    title: user?.title || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
    location: user?.location || '',
    avatar: user?.avatar || '',
    skills: user?.skills || [],
    hourlyRate: user?.hourlyRate || 0,
    availability: {
      status: user?.availability?.status || 'available',
      nextAvailable: user?.availability?.nextAvailable
    },
  });
  const [newSkill, setNewSkill] = useState({ name: '', level: 1 });
  const toast = useToast();

  const handleInputChange = (field: keyof FreelancerData, value: any) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSkillAdd = () => {
    if (newSkill.name.trim()) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, { ...newSkill }],
      }));
      setNewSkill({ name: '', level: 1 });
    }
  };

  const handleSkillRemove = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await api.put('/api/freelancers/profile', profileData);
      await getCurrentUser(); // Refresh user data in auth context
      setIsEditing(false);
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Update failed',
        description: error instanceof Error ? error.message : 'Failed to update profile',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={8}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <Heading size="lg">Profile</Heading>
          <Button
            leftIcon={<FiEdit2 />}
            onClick={() => setIsEditing(!isEditing)}
            colorScheme={isEditing ? 'red' : 'blue'}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <VStack align="start" spacing={6}>
            <HStack spacing={4}>
              <Avatar
                size="2xl"
                name={`${profileData.firstName} ${profileData.lastName}`}
                src={profileData.avatar}
              />
              {isEditing && (
                <Button size="sm">Change Photo</Button>
              )}
            </HStack>

            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                value={profileData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                isReadOnly={!isEditing}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                value={profileData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                isReadOnly={!isEditing}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                value={profileData.email}
                isReadOnly
                type="email"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                isReadOnly={!isEditing}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input
                value={profileData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                isReadOnly={!isEditing}
              />
            </FormControl>
          </VStack>

          <VStack align="start" spacing={6}>
            <FormControl>
              <FormLabel>Professional Title</FormLabel>
              <Input
                value={profileData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                isReadOnly={!isEditing}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                isReadOnly={!isEditing}
                rows={4}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Hourly Rate (USD)</FormLabel>
              <NumberInput
                value={profileData.hourlyRate}
                onChange={(_, value) => handleInputChange('hourlyRate', value)}
                min={0}
                isReadOnly={!isEditing}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Availability Status</FormLabel>
              <Select
                value={profileData.availability.status}
                onChange={(e) =>
                  handleInputChange('availability', {
                    ...profileData.availability,
                    status: e.target.value,
                  })
                }
                isDisabled={!isEditing}
              >
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="unavailable">Unavailable</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Skills</FormLabel>
              <VStack align="start" spacing={2}>
                {profileData.skills.map((skill, index) => (
                  <HStack key={index}>
                    <Badge colorScheme="blue">
                      {skill.name} (Level {skill.level})
                    </Badge>
                    {isEditing && (
                      <IconButton
                        aria-label="Remove skill"
                        icon={<FiX />}
                        size="xs"
                        onClick={() => handleSkillRemove(index)}
                      />
                    )}
                  </HStack>
                ))}
                {isEditing && (
                  <HStack>
                    <Input
                      placeholder="Skill name"
                      size="sm"
                      value={newSkill.name}
                      onChange={(e) =>
                        setNewSkill((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                    <NumberInput
                      size="sm"
                      maxW={20}
                      min={1}
                      max={5}
                      value={newSkill.level}
                      onChange={(_, value) =>
                        setNewSkill((prev) => ({ ...prev, level: value }))
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <IconButton
                      aria-label="Add skill"
                      icon={<FiPlus />}
                      size="sm"
                      onClick={handleSkillAdd}
                    />
                  </HStack>
                )}
              </VStack>
            </FormControl>
          </VStack>
        </SimpleGrid>

        {isEditing && (
          <Button
            colorScheme="blue"
            size="lg"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Save Changes
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default FreelancerProfile;
