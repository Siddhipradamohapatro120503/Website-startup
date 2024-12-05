import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Image,
  useColorModeValue,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { FiTarget, FiUsers, FiAward } from 'react-icons/fi';
import Navbar from './navigation/Navbar';

const About: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const cardBorderColor = useColorModeValue('gray.200', 'gray.700');

  // const teamMembers = [
  //   {
  //     name: 'John Doe',
  //     position: 'CEO & Founder',
  //     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  //   },
  //   {
  //     name: 'Jane Smith',
  //     position: 'CTO',
  //     image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  //   },
  //   {
  //     name: 'Mike Johnson',
  //     position: 'Lead Designer',
  //     image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  //   },
  // ];

  const values = [
    {
      icon: FiTarget,
      title: 'Mission',
      description: 'To empower businesses with cutting-edge digital solutions that drive growth and innovation.',
    },
    {
      icon: FiUsers,
      title: 'Vision',
      description: 'To be the leading force in digital transformation, helping businesses thrive in the digital age.',
    },
    {
      icon: FiAward,
      title: 'Values',
      description: 'Innovation, integrity, collaboration, and commitment to excellence in everything we do.',
    },
  ];

  return (
    <Box bg={bgColor} minH="100vh">
      <Navbar />
      <Container maxW="container.xl" pt={20}>
        {/* Hero Section */}
        <VStack spacing={8} as="section" textAlign="center" py={16}>
          <Heading
            as="h1"
            fontSize={{ base: '4xl', md: '5xl' }}
            fontWeight="bold"
          >
            About Us
          </Heading>
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            color={textColor}
            maxW="2xl"
          >
            We're a team of passionate individuals dedicated to transforming businesses
            through innovative digital solutions.
          </Text>
        </VStack>

        {/* Values Section */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={16}>
          {values.map((value, index) => (
            <Box
              key={index}
              p={8}
              bg={cardBgColor}
              borderWidth="1px"
              borderColor={cardBorderColor}
              borderRadius="xl"
              shadow="md"
              transition="all 0.3s"
              _hover={{
                transform: 'translateY(-4px)',
                shadow: 'lg',
              }}
            >
              <Icon
                as={value.icon}
                w={10}
                h={10}
                color="blue.400"
                mb={4}
              />
              <Heading
                as="h3"
                fontSize="xl"
                mb={4}
              >
                {value.title}
              </Heading>
              <Text color={textColor}>
                {value.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        {/* Team Section */}
        {/* <VStack spacing={8} as="section" py={16}>
          <Heading as="h2" fontSize="3xl" mb={8}>
            Our Team
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} width="full">
            {teamMembers.map((member, index) => (
              <Box
                key={index}
                bg={cardBgColor}
                p={6}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={cardBorderColor}
                shadow="md"
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-4px)',
                  shadow: 'lg',
                }}
              >
                <VStack spacing={4}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    borderRadius="full"
                    boxSize="150px"
                    objectFit="cover"
                  />
                  <Heading as="h3" fontSize="xl">
                    {member.name}
                  </Heading>
                  <Text color={textColor}>
                    {member.position}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack> */}
      </Container>
    </Box>
  );
};

export default About;
