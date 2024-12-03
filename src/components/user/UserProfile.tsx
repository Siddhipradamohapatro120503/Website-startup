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
} from '@chakra-ui/react';
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
      // Add API call to update user profile
      setIsEditing(false);
      toast({
        title: 'Profile updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating profile',
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
          />
          <Text mt={4} fontSize="2xl" fontWeight="bold">
            {user?.firstName} {user?.lastName}
          </Text>
          <Text color="gray.600">{user?.email}</Text>
        </Box>

        <Box p={6} borderWidth={1} borderRadius="lg" bg="white">
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
                  <Text fontWeight="bold">First Name</Text>
                  <Text>{user?.firstName}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Last Name</Text>
                  <Text>{user?.lastName}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Email</Text>
                  <Text>{user?.email}</Text>
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
