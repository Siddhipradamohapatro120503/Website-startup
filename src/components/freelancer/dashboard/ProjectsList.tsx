import React from 'react';
import {
  VStack,
  HStack,
  Text,
  Progress,
  Badge,
  Avatar,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

interface Project {
  id: string;
  name: string;
  client: {
    name: string;
    avatar: string;
  };
  deadline: string;
  progress: number;
  status: 'in-progress' | 'review' | 'completed';
  payment: number;
}

const ProjectsList: React.FC = () => {
  const projects: Project[] = [
    {
      id: '1',
      name: 'E-commerce Platform Development',
      client: {
        name: 'John Smith',
        avatar: 'https://bit.ly/dan-abramov',
      },
      deadline: '2024-01-15',
      progress: 75,
      status: 'in-progress',
      payment: 3000,
    },
    {
      id: '2',
      name: 'Mobile App UI Design',
      client: {
        name: 'Sarah Johnson',
        avatar: 'https://bit.ly/sage-adebayo',
      },
      deadline: '2024-01-20',
      progress: 90,
      status: 'review',
      payment: 2500,
    },
    {
      id: '3',
      name: 'API Integration',
      client: {
        name: 'Mike Wilson',
        avatar: 'https://bit.ly/prosper-baba',
      },
      deadline: '2024-01-10',
      progress: 40,
      status: 'in-progress',
      payment: 1800,
    },
  ];

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'in-progress':
        return 'yellow';
      case 'review':
        return 'purple';
      case 'completed':
        return 'green';
      default:
        return 'gray';
    }
  };

  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <VStack spacing={4} align="stretch">
      {projects.map((project) => (
        <Box
          key={project.id}
          p={4}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="lg"
          _hover={{ shadow: 'md' }}
        >
          <HStack justify="space-between" mb={3}>
            <VStack align="start" spacing={1}>
              <Text fontWeight="bold">{project.name}</Text>
              <HStack>
                <Avatar size="sm" src={project.client.avatar} />
                <Text fontSize="sm" color="gray.500">
                  {project.client.name}
                </Text>
              </HStack>
            </VStack>
            <Badge colorScheme={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          </HStack>

          <HStack justify="space-between" mb={2}>
            <Text fontSize="sm" color="gray.500">
              Deadline: {new Date(project.deadline).toLocaleDateString()}
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="green.500">
              ${project.payment}
            </Text>
          </HStack>

          <Progress
            value={project.progress}
            size="sm"
            colorScheme="blue"
            borderRadius="full"
          />
          <Text fontSize="xs" textAlign="right" mt={1} color="gray.500">
            {project.progress}% Complete
          </Text>
        </Box>
      ))}
    </VStack>
  );
};

export default ProjectsList;
