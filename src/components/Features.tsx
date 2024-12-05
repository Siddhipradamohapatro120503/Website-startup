import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FiLayout,
  FiCode,
  FiLayers,
  FiShare2,
  FiBarChart2,
  FiShield,
  FiCpu,
  FiGlobe,
  FiServer,
} from 'react-icons/fi';
import Navbar from './navigation/Navbar';

const features = [
  {
    icon: FiLayout,
    title: 'Responsive Design',
    description: 'Our platform adapts seamlessly to any device or screen size, ensuring a consistent user experience.',
  },
  {
    icon: FiCode,
    title: 'Clean Code',
    description: 'Built with modern best practices and maintained with high code quality standards.',
  },
  {
    icon: FiLayers,
    title: 'Modular Architecture',
    description: 'Scalable and maintainable architecture that grows with your business needs.',
  },
  {
    icon: FiShare2,
    title: 'Easy Integration',
    description: 'Seamlessly integrate with your existing systems and third-party services.',
  },
  {
    icon: FiBarChart2,
    title: 'Advanced Analytics',
    description: 'Gain valuable insights with comprehensive analytics and reporting tools.',
  },
  {
    icon: FiShield,
    title: 'Enterprise Security',
    description: 'Bank-grade security measures to protect your data and privacy.',
  },
  {
    icon: FiCpu,
    title: 'AI-Powered',
    description: 'Leverage artificial intelligence to automate and optimize your workflows.',
  },
  {
    icon: FiGlobe,
    title: 'Global Scale',
    description: 'Built to handle worldwide operations with multi-region support.',
  },
  {
    icon: FiServer,
    title: 'High Performance',
    description: 'Optimized for speed and efficiency, ensuring fast response times.',
  },
];

const Features: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.900');
  const boxBgColor = useColorModeValue('white', 'gray.800');
  const boxBorderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box bg={bgColor} minH="100vh">
      <Navbar />
      <Container maxW="container.xl" py={20}>
        <VStack spacing={8} as="section" textAlign="center" mb={16}>
          <Heading
            as="h1"
            fontSize={{ base: '4xl', md: '5xl' }}
            fontWeight="bold"
            mb={4}
          >
            Our Features
          </Heading>
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            color={textColor}
            maxW="2xl"
          >
            Discover the powerful features that make our platform stand out
          </Text>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={10}
          px={{ base: 4, md: 8 }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              p={8}
              bg={boxBgColor}
              borderWidth="1px"
              borderColor={boxBorderColor}
              borderRadius="xl"
              shadow="md"
              transition="all 0.3s"
              _hover={{
                transform: 'translateY(-4px)',
                shadow: 'lg',
                borderColor: 'blue.400',
              }}
            >
              <Icon
                as={feature.icon}
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
                {feature.title}
              </Heading>
              <Text color={textColor}>
                {feature.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Features;
