import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Container,
  Heading,
  Link,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SimpleGrid,
  IconButton,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useAuth } from '../../hooks/useAuth';

interface Skill {
  name: string;
  level: number;
}

const FreelancerRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    title: '',
    bio: '',
    hourlyRate: 0,
  });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState({ name: '', level: 1 });
  const [isLoading, setIsLoading] = useState(false);

  const { freelancerRegister } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      setSkills([...skills, { ...newSkill }]);
      setNewSkill({ name: '', level: 1 });
    }
  };

  const handleRemoveSkill = (skillName: string) => {
    setSkills(skills.filter((skill) => skill.name !== skillName));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (skills.length === 0) {
      toast({
        title: 'Please add at least one skill',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await freelancerRegister({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        title: formData.title,
        bio: formData.bio,
        hourlyRate: formData.hourlyRate,
        skills,
      });

      toast({
        title: 'Registration successful',
        description: 'Welcome to our freelancer platform!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/freelancer/dashboard');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading>Freelancer Registration</Heading>
        <Box w="100%" p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </FormControl>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired>
                <FormLabel>Professional Title</FormLabel>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Web Developer"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Bio</FormLabel>
                <Textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself and your expertise"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Hourly Rate ($)</FormLabel>
                <NumberInput
                  min={0}
                  value={formData.hourlyRate}
                  onChange={(_, value) =>
                    setFormData((prev) => ({ ...prev, hourlyRate: value }))
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Skills</FormLabel>
                <HStack mb={4}>
                  <Input
                    placeholder="Skill name"
                    value={newSkill.name}
                    onChange={(e) =>
                      setNewSkill((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                  <NumberInput
                    min={1}
                    max={100}
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
                    icon={<AddIcon />}
                    onClick={handleAddSkill}
                  />
                </HStack>
                <Box>
                  {skills.map((skill) => (
                    <Tag
                      key={skill.name}
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="blue"
                      m={1}
                    >
                      <TagLabel>
                        {skill.name} (Level {skill.level})
                      </TagLabel>
                      <TagCloseButton
                        onClick={() => handleRemoveSkill(skill.name)}
                      />
                    </Tag>
                  ))}
                </Box>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                width="100%"
                isLoading={isLoading}
              >
                Register as Freelancer
              </Button>
            </VStack>
          </form>
        </Box>

        <Text>
          Already have an account?{' '}
          <Link color="blue.500" onClick={() => navigate('/freelancer/login')}>
            Login here
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default FreelancerRegister;
