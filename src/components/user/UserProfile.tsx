import React, { useState } from 'react';
import {
  Box,
  VStack,
  Avatar,
  Text,
  Button,
  useToast,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

const UserProfile = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const iconColor = useColorModeValue('blue.500', 'blue.300');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      
      // Update local storage with new user data
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setIsEditing(false);
      toast({
        title: 'Profile updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Refresh the page to show updated data
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error updating profile',
        description: error instanceof Error ? error.message : 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Avatar
            size="2xl"
            name={`${user?.firstName} ${user?.lastName}`}
            src={user?.avatar || undefined}
            bg={iconColor}
          />
          <Text mt={4} fontSize="2xl" fontWeight="bold" color={textColor}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text color={textColor}>{user?.email}</Text>
        </Box>

        <Box p={6} borderWidth={1} borderRadius="lg" bg={bgColor} borderColor={borderColor} shadow="sm">
          <VStack spacing={6} align="stretch">
            <Heading size="md">Profile Information</Heading>
            {isEditing ? (
              <>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </FormControl>

                <HStack spacing={4} justify="flex-end">
                  <Button onClick={handleCancel}>Cancel</Button>
                  <Button colorScheme="blue" onClick={handleSave}>
                    Save Changes
                  </Button>
                </HStack>
              </>
            ) : (
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text fontWeight="bold" fontSize="sm" color={labelColor}>
                    First Name
                  </Text>
                  <Text color={textColor}>{user?.firstName}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" fontSize="sm" color={labelColor}>
                    Last Name
                  </Text>
                  <Text color={textColor}>{user?.lastName}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" fontSize="sm" color={labelColor}>
                    Email
                  </Text>
                  <Text color={textColor}>{user?.email}</Text>
                </Box>
                <Button alignSelf="flex-end" onClick={handleEdit}>
                  Edit Profile
                </Button>
              </VStack>
            )}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default UserProfile;
