import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Image,
  Badge,
  VStack,
  HStack,
  useColorModeValue,
  Button,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import { caseStudies } from '../../data/caseStudies';

const MotionBox = motion(Box);

const CaseStudiesSection: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const resultsBg = useColorModeValue('gray.100', 'gray.600');
  const resultsValueColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <Box py={20} bg={bgColor}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
          <VStack spacing={4} textAlign="center">
            <Heading
              size="2xl"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              Success Stories
            </Heading>
            <Text fontSize="xl" color={textColor} maxW="2xl">
              See how we've helped businesses transform their digital presence and achieve remarkable results
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8} w="full">
            {caseStudies.map((study, index) => (
              <MotionBox
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box
                  bg={cardBg}
                  borderRadius="xl"
                  overflow="hidden"
                  borderWidth="1px"
                  borderColor={borderColor}
                  _hover={{ transform: 'translateY(-8px)', shadow: 'xl' }}
                  transition="all 0.3s"
                >
                  <Box position="relative" h="200px" overflow="hidden">
                    <Image
                      src={study.image}
                      alt={study.title}
                      objectFit="cover"
                      w="full"
                      h="full"
                    />
                    <Box
                      position="absolute"
                      top={4}
                      left={4}
                      bg="white"
                      borderRadius="full"
                      p={2}
                      boxShadow="md"
                    >
                      <Image
                        src={study.logo}
                        alt={study.client}
                        w="32px"
                        h="32px"
                        objectFit="contain"
                      />
                    </Box>
                  </Box>

                  <VStack p={6} align="stretch" spacing={4}>
                    <Badge colorScheme="purple" alignSelf="flex-start">
                      {study.industry}
                    </Badge>
                    
                    <Heading size="md">{study.title}</Heading>
                    
                    <Text color={textColor} fontSize="sm">
                      {study.challenge}
                    </Text>

                    <Box bg={resultsBg} p={4} borderRadius="lg">
                      <Text fontWeight="bold" mb={2}>Key Results:</Text>
                      <SimpleGrid columns={3} gap={2}>
                        {study.results.map((result, idx) => (
                          <VStack key={idx} align="center" spacing={1}>
                            <Text
                              fontSize="xl"
                              fontWeight="bold"
                              color={resultsValueColor}
                            >
                              {result.value}
                            </Text>
                            <Text fontSize="xs" textAlign="center">
                              {result.metric}
                            </Text>
                          </VStack>
                        ))}
                      </SimpleGrid>
                    </Box>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>

          <Button
            size="lg"
            colorScheme="purple"
            rightIcon={<Icon as={FiArrowRight} />}
          >
            View All Case Studies
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default CaseStudiesSection;
