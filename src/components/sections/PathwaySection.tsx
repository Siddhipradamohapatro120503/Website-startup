import React from 'react';
import {
  Box,
  Container,
  Text,
  Heading,
  Flex,
  Icon,
  useColorModeValue,
  Grid,
  GridItem,
  VStack,
  HStack,
  Circle,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FiZap,
  FiPieChart,
  FiSettings,
  FiHelpCircle,
  FiMessageCircle,
  FiMail,
  FiPhone,
  FiUsers,
  FiDatabase,
  FiCloud,
  FiPhoneCall,
  FiTrendingUp,
  FiBarChart2,
} from 'react-icons/fi';
import { pathwayData } from '../../data/pathway';

const iconMap: { [key: string]: any } = {
  FiZap,
  FiPieChart,
  FiSettings,
  FiHelpCircle,
  FiMessageCircle,
  FiMail,
  FiPhone,
  FiUsers,
  FiDatabase,
  FiCloud,
  FiPhoneCall,
  FiTrendingUp,
  FiBarChart2,
};

const MotionBox = motion(Box);

const PathwaySection: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const iconBg = useColorModeValue('purple.50', 'purple.900');
  const iconColor = useColorModeValue('purple.500', 'purple.200');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const pathwayVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const renderFeatures = (features: any[]) => (
    <HStack spacing={4} mt={4}>
      {features.map((feature, index) => (
        <VStack
          key={index}
          align="center"
          bg={iconBg}
          p={3}
          borderRadius="lg"
          spacing={2}
        >
          <Icon as={iconMap[feature.icon]} w={5} h={5} color={iconColor} />
          <Text fontSize="sm" fontWeight="medium">
            {feature.label}
          </Text>
        </VStack>
      ))}
    </HStack>
  );

  const PathwayCard = ({ item }: { item: any }) => (
    <MotionBox
      variants={pathwayVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      bg={cardBg}
      p={6}
      borderRadius="xl"
      boxShadow="lg"
      border="1px"
      borderColor={borderColor}
      _hover={{ transform: 'translateY(-5px)', transition: 'all 0.3s' }}
    >
      <VStack align="start" spacing={4}>
        <Circle size="40px" bg={iconBg}>
          <Icon as={iconMap[item.icon]} w={5} h={5} color={iconColor} />
        </Circle>
        <Heading size="md">{item.title}</Heading>
        <Text color={textColor}>{item.description}</Text>
        {item.features && renderFeatures(item.features)}
      </VStack>
    </MotionBox>
  );

  const CenterCard = () => (
    <MotionBox
      variants={pathwayVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      bg={cardBg}
      p={8}
      borderRadius="xl"
      boxShadow="xl"
      border="1px"
      borderColor={borderColor}
      position="relative"
      zIndex={2}
    >
      <VStack spacing={4} align="center">
        <Circle size="50px" bg={iconBg}>
          <Icon as={FiDatabase} w={6} h={6} color={iconColor} />
        </Circle>
        <Heading size="md" textAlign="center">
          {pathwayData.centerItem.title}
        </Heading>
        <Text color={textColor} textAlign="center">
          {pathwayData.centerItem.description}
        </Text>
        <Flex wrap="wrap" justify="center" gap={3}>
          {pathwayData.centerItem.integrations.map((integration, index) => (
            <Box
              key={index}
              bg={iconBg}
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              fontWeight="medium"
              color={iconColor}
            >
              {integration}
            </Box>
          ))}
        </Flex>
      </VStack>
    </MotionBox>
  );

  return (
    <Box bg={bgColor} py={20} position="relative">
      <Container maxW="container.xl">
        <VStack spacing={16}>
          <Heading
            textAlign="center"
            size="2xl"
            mb={4}
            bgGradient="linear(to-r, purple.400, blue.500)"
            bgClip="text"
          >
            {pathwayData.mainTitle}
          </Heading>

          <Grid
            templateColumns="repeat(3, 1fr)"
            templateRows="repeat(3, auto)"
            gap={8}
            position="relative"
          >
            {/* Connection lines */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              zIndex={1}
              pointerEvents="none"
              opacity={0.3}
              borderWidth="2px"
              borderStyle="dashed"
              borderColor={borderColor}
              borderRadius="xl"
            />

            {/* Top */}
            <GridItem colStart={2} colSpan={1}>
              <PathwayCard item={pathwayData.items[0]} />
            </GridItem>

            {/* Left */}
            <GridItem rowStart={2} colSpan={1}>
              <PathwayCard item={pathwayData.items[1]} />
            </GridItem>

            {/* Center */}
            <GridItem rowStart={2} colStart={2} colSpan={1}>
              <CenterCard />
            </GridItem>

            {/* Right */}
            <GridItem rowStart={2} colStart={3} colSpan={1}>
              <PathwayCard item={pathwayData.items[2]} />
            </GridItem>

            {/* Bottom */}
            <GridItem rowStart={3} colStart={2} colSpan={1}>
              <PathwayCard item={pathwayData.items[3]} />
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default PathwaySection;
