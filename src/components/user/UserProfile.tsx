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
    <Container maxW="container.md" p={0}>
      <VStack spacing={{ base: 4, md: 8 }} align="stretch">
        <Box textAlign="center">
          <Avatar
            size={{ base: "xl", md: "2xl" }}
            name={`${user?.firstName} ${user?.lastName}`}
            src={user?.avatar || undefined}
            bg={iconColor}
          />
          <Text 
            mt={{ base: 2, md: 4 }} 
            fontSize={{ base: "xl", md: "2xl" }} 
            fontWeight="bold" 
            color={textColor}
          >
            {user?.firstName} {user?.lastName}
          </Text>
          <Text 
            color={textColor}
            fontSize={{ base: "sm", md: "md" }}
            mt={1}
          >
            {user?.email}
          </Text>
        </Box>

        <Box 
          p={{ base: 4, md: 6 }} 
          borderWidth={1} 
          borderRadius="lg" 
          bg={bgColor} 
          borderColor={borderColor} 
          shadow="sm"
        >
          <VStack spacing={{ base: 4, md: 6 }} align="stretch">
            <Heading size={{ base: "sm", md: "md" }}>Profile Information</Heading>
            {isEditing ? (
              <>
                <FormControl>
                  <FormLabel fontSize={{ base: "sm", md: "md" }}>First Name</FormLabel>
                  <Input
                    size={{ base: "sm", md: "md" }}
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={{ base: "sm", md: "md" }}>Last Name</FormLabel>
                  <Input
                    size={{ base: "sm", md: "md" }}
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={{ base: "sm", md: "md" }}>Email</FormLabel>
                  <Input
                    size={{ base: "sm", md: "md" }}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </FormControl>

                <HStack spacing={4} justify="flex-end">
                  <Button 
                    size={{ base: "sm", md: "md" }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size={{ base: "sm", md: "md" }}
                    colorScheme="blue" 
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                </HStack>
              </>
            ) : (
              <VStack align="stretch" spacing={{ base: 3, md: 4 }}>
                <Box>
                  <Text 
                    fontWeight="bold" 
                    fontSize={{ base: "xs", md: "sm" }} 
                    color={labelColor}
                    mb={1}
                  >
                    First Name
                  </Text>
                  <Text 
                    color={textColor}
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    {user?.firstName}
                  </Text>
                </Box>
                <Box>
                  <Text 
                    fontWeight="bold" 
                    fontSize={{ base: "xs", md: "sm" }} 
                    color={labelColor}
                    mb={1}
                  >
                    Last Name
                  </Text>
                  <Text 
                    color={textColor}
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    {user?.lastName}
                  </Text>
                </Box>
                <Box>
                  <Text 
                    fontWeight="bold" 
                    fontSize={{ base: "xs", md: "sm" }} 
                    color={labelColor}
                    mb={1}
                  >
                    Email
                  </Text>
                  <Text 
                    color={textColor}
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    {user?.email}
                  </Text>
                </Box>
                <Button 
                  alignSelf="flex-end"
                  size={{ base: "sm", md: "md" }}
                  onClick={handleEdit}
                >
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
