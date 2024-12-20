import React from 'react';
import { Box, Text, Flex, Avatar, VStack, useColorModeValue } from '@chakra-ui/react';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  company,
  avatar,
  content,
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box
      mx={4}
      p={6}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      bg={cardBg}
      boxShadow="lg"
      minW="350px"
    >
      <VStack spacing={4} align="start">
        <Text fontSize="md" color={textColor} fontStyle="italic">
          "{content}"
        </Text>
        <Flex align="center" mt={4}>
          <Avatar size="md" src={avatar} name={name} />
          <Box ml={3}>
            <Text fontWeight="bold" fontSize="sm">
              {name}
            </Text>
            <Text fontSize="sm" color={textColor}>
              {role} at {company}
            </Text>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};

export default TestimonialCard;
