import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Flex,
  Text,
  Icon,
  VStack,
  HStack,
  useColorModeValue,
  Heading,
  Image,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FiShield,
  FiAward,
  FiUserCheck,
  FiClock,
  FiLock,
  FiTrendingUp,
} from 'react-icons/fi';

const MotionBox = motion(Box);

const trustIndicators = [
  {
    icon: FiShield,
    title: 'Enterprise-Grade Security',
    description: 'ISO 27001 certified with bank-level encryption and security protocols',
  },
  {
    icon: FiAward,
    title: 'Industry Recognition',
    description: 'Multiple awards for innovation and excellence in digital solutions',
  },
  {
    icon: FiUserCheck,
    title: 'Certified Experts',
    description: '100+ certified professionals with deep industry expertise',
  },
  {
    icon: FiClock,
    title: '99.9% Uptime',
    description: 'Reliable service with guaranteed SLAs and 24/7 monitoring',
  },
  {
    icon: FiLock,
    title: 'Data Protection',
    description: 'GDPR compliant with strict data privacy and protection measures',
  },
  {
    icon: FiTrendingUp,
    title: 'Proven Track Record',
    description: '15+ years of successful digital transformation projects',
  },
];

const certifications = [
  { name: 'ISO 27001', image: '/images/certifications/iso-27001.png' },
  { name: 'GDPR Compliant', image: '/images/certifications/gdpr.png' },
  { name: 'AWS Partner', image: '/images/certifications/aws-partner.png' },
  { name: 'Microsoft Gold', image: '/images/certifications/microsoft-gold.png' },
];

const TrustIndicatorsSection: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const iconColor = useColorModeValue('blue.500', 'blue.300');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const certificationFilter = useColorModeValue('none', 'brightness(0) invert(1)');

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
              Why Trust Us
            </Heading>
            <Text fontSize="xl" maxW="2xl" color={textColor}>
              We're committed to delivering excellence with industry-leading standards and certifications
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {trustIndicators.map((item, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Flex
                  p={6}
                  bg={cardBg}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={borderColor}
                  align="start"
                  _hover={{
                    transform: 'translateY(-4px)',
                    shadow: 'lg',
                    borderColor: 'blue.400',
                  }}
                  transition="all 0.3s"
                >
                  <Icon
                    as={item.icon}
                    w={8}
                    h={8}
                    color={iconColor}
                    mr={4}
                  />
                  <Box>
                    <Text fontWeight="bold" fontSize="lg" mb={2}>
                      {item.title}
                    </Text>
                    <Text color={textColor}>
                      {item.description}
                    </Text>
                  </Box>
                </Flex>
              </MotionBox>
            ))}
          </SimpleGrid>

          {/* <Box w="full">
            <Text
              textAlign="center"
              fontSize="xl"
              fontWeight="bold"
              mb={8}
              color={textColor}
            >
              Our Certifications & Partnerships
            </Text>
            <Flex
              justify="center"
              align="center"
              wrap="wrap"
              gap={8}
            >
              {certifications.map((cert, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    h="60px"
                    objectFit="contain"
                    filter={certificationFilter}
                    opacity={0.8}
                    _hover={{ opacity: 1 }}
                    transition="opacity 0.3s"
                  />
                </MotionBox>
              ))}
            </Flex>
          </Box> */}
        </VStack>
      </Container>
    </Box>
  );
};

export default TrustIndicatorsSection;
