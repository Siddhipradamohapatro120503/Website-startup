import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Circle,
  useColorModeValue,
  Icon,
  List,
  ListItem,
  ListIcon,
  useColorMode,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTarget, FiLayers, FiCode, FiCheck, FiChevronRight } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionCircle = motion(Circle);

interface WorkflowStep {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
  gradient: {
    light: string;
    dark: string;
  };
}

const workflowSteps: WorkflowStep[] = [
  {
    icon: FiTarget,
    title: 'Discovery & Planning',
    description: 'We analyze your needs and create a comprehensive project roadmap.',
    details: [
      'In-depth requirement analysis',
      'Market research and competitor analysis',
      'Project scope definition',
      'Timeline and milestone planning',
      'Resource allocation strategy'
    ],
    gradient: {
      light: 'linear-gradient(135deg, #E3F2FD 0%, #90CAF9 100%)',
      dark: 'linear-gradient(135deg, #1A365D 0%, #2B6CB0 100%)'
    }
  },
  {
    icon: FiLayers,
    title: 'Design & Architecture',
    description: 'Our team designs scalable solutions tailored to your requirements.',
    details: [
      'UI/UX design prototyping',
      'System architecture planning',
      'Database schema design',
      'API interface definition',
      'Security architecture planning'
    ],
    gradient: {
      light: 'linear-gradient(135deg, #F3E5F5 0%, #CE93D8 100%)',
      dark: 'linear-gradient(135deg, #44337A 0%, #6B46C1 100%)'
    }
  },
  {
    icon: FiCode,
    title: 'Development & Testing',
    description: 'We build and rigorously test your solution to ensure quality.',
    details: [
      'Agile development process',
      'Continuous integration/deployment',
      'Automated testing implementation',
      'Performance optimization',
      'Security testing and validation'
    ],
    gradient: {
      light: 'linear-gradient(135deg, #E8F5E9 0%, #81C784 100%)',
      dark: 'linear-gradient(135deg, #1C4532 0%, #38A169 100%)'
    }
  },
  {
    icon: FiCheck,
    title: 'Deployment & Support',
    description: 'We deploy your solution and provide ongoing maintenance and support.',
    details: [
      'Production environment setup',
      'Monitoring and alerting setup',
      'User training and documentation',
      'Ongoing maintenance support',
      '24/7 technical assistance'
    ],
    gradient: {
      light: 'linear-gradient(135deg, #FFF3E0 0%, #FFB74D 100%)',
      dark: 'linear-gradient(135deg, #744210 0%, #D69E2E 100%)'
    }
  },
];

const WorkflowSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { colorMode } = useColorMode();
  
  // Base colors
  const bgColor = useColorModeValue('#FFFFFF', '#1A202C');
  const textColor = useColorModeValue('#2D3748', '#E2E8F0');
  const headingColor = useColorModeValue('#1A202C', '#FFFFFF');
  const iconColor = useColorModeValue('#3182CE', '#90CDF4');
  const lineColor = useColorModeValue('#E2E8F0', '#2D3748');
  
  // Card colors
  const cardBgBase = useColorModeValue('#F7FAFC', '#2D3748');
  const cardShadowColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.4)');
  const cardShadowHover = useColorModeValue(
    '0 8px 30px rgba(0, 0, 0, 0.12)',
    '0 8px 30px rgba(0, 0, 0, 0.6)'
  );

  // Background gradients
  const bgGradient = useColorModeValue(
    'linear-gradient(180deg, rgba(247, 250, 252, 0.8) 0%, rgba(255, 255, 255, 0) 100%)',
    'linear-gradient(180deg, rgba(26, 32, 44, 0.8) 0%, rgba(26, 32, 44, 0) 100%)'
  );

  // Heading gradient
  const headingGradient = useColorModeValue(
    'linear-gradient(to right, #2B6CB0, #805AD5)',
    'linear-gradient(to right, #63B3ED, #B794F4)'
  );

  // Circle colors
  const circleBg = useColorModeValue('whiteAlpha.900', 'whiteAlpha.200');

  // Line gradient
  const lineGradient = useColorModeValue(
    'linear-gradient(to right, #E2E8F0 50%, transparent 50%)',
    'linear-gradient(to right, #2D3748 50%, transparent 50%)'
  );

  return (
    <Box bg={bgColor} py={20} position="relative">
      {/* Background decoration */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="100%"
        bgGradient={bgGradient}
        pointerEvents="none"
      />

      <Container maxW="container.xl" position="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Heading
            textAlign="center"
            mb={4}
            color={headingColor}
            fontSize={{ base: '3xl', md: '4xl' }}
            bgGradient={headingGradient}
            bgClip="text"
          >
            Our Development Workflow
          </Heading>
          <Text
            textAlign="center"
            mb={16}
            color={textColor}
            fontSize={{ base: 'lg', md: 'xl' }}
            maxW="3xl"
            mx="auto"
          >
            A streamlined process to transform your ideas into reality
          </Text>
        </motion.div>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} position="relative">
          {/* Connecting Lines */}
          <Box
            display={{ base: 'none', lg: 'block' }}
            position="absolute"
            top="50%"
            left="10%"
            right="10%"
            height="2px"
            bgGradient={lineGradient}
            backgroundSize="20px 2px"
            zIndex={0}
          />

          {workflowSteps.map((step, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: cardBgBase,
                boxShadow: hoveredIndex === index ? cardShadowHover : `0 4px 6px ${cardShadowColor}`,
                padding: '24px',
                borderRadius: '16px',
                cursor: 'pointer',
                height: '100%',
                willChange: 'transform, opacity, box-shadow',
                transition: 'all 0.3s ease',
                background: hoveredIndex === index 
                  ? step.gradient[colorMode === 'light' ? 'light' : 'dark']
                  : cardBgBase,
                transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <VStack spacing={4} align="center">
                <MotionCircle
                  size="100px"
                  bg={circleBg}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ 
                    willChange: 'transform',
                    boxShadow: `0 4px 20px ${cardShadowColor}`
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon 
                    as={step.icon} 
                    w={10} 
                    h={10} 
                    color={hoveredIndex === index ? 'white' : iconColor}
                  />
                </MotionCircle>
                <Heading 
                  size="md" 
                  color={hoveredIndex === index ? 'white' : headingColor} 
                  textAlign="center"
                >
                  {step.title}
                </Heading>
                <Text 
                  color={hoveredIndex === index ? 'white' : textColor} 
                  textAlign="center"
                >
                  {step.description}
                </Text>

                <AnimatePresence>
                  {hoveredIndex === index && (
                    <MotionBox
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      overflow="hidden"
                      w="100%"
                      style={{ willChange: 'opacity, height' }}
                    >
                      <List spacing={2} mt={4}>
                        {step.details.map((detail, detailIndex) => (
                          <ListItem
                            key={detailIndex}
                            display="flex"
                            alignItems="center"
                            color="white"
                          >
                            <ListIcon as={FiChevronRight} color="white" />
                            <Text fontSize="sm">{detail}</Text>
                          </ListItem>
                        ))}
                      </List>
                    </MotionBox>
                  )}
                </AnimatePresence>
              </VStack>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default WorkflowSection;
