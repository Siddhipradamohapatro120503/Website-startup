import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
  useColorModeValue,
  Grid,
  Icon,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  FiArrowRight,
  FiCode,
  FiLayout,
  FiLayers,
  FiCheck,
  FiCamera,
  FiPenTool,
  FiTrendingUp,
  FiShare2,
  FiBarChart2,
  FiSettings,
  FiFilm,
  FiGrid,
  FiGlobe,
  FiCpu,
  FiCloud,
  FiServer,
  FiMessageSquare,
  FiActivity,
  FiZap,
} from 'react-icons/fi';
import { useSmoothScroll, ScrollSection } from '../contexts/SmoothScrollContext';
import Navbar from './navigation/Navbar';
import '../styles/animations.css';

// Pricing tiers data
const pricingTiers = [
  {
    name: 'Starter',
    price: 29,
    features: ['Basic Analytics', '5 Team Members', '10GB Storage', 'Email Support'],
    recommended: false,
  },
  {
    name: 'Professional',
    price: 99,
    features: ['Advanced Analytics', '15 Team Members', '50GB Storage', 'Priority Support', 'Custom Domain'],
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: 299,
    features: ['Custom Analytics', 'Unlimited Team Members', '500GB Storage', '24/7 Support', 'Custom Integration'],
    recommended: false,
  },
];

// Service comparison data
const serviceFeatures = [
  { name: 'Analytics Dashboard', starter: true, pro: true, enterprise: true },
  { name: 'Team Management', starter: true, pro: true, enterprise: true },
  { name: 'Custom Reports', starter: false, pro: true, enterprise: true },
  { name: 'API Access', starter: false, pro: true, enterprise: true },
  { name: 'White Labeling', starter: false, pro: false, enterprise: true },
  { name: 'Custom Integration', starter: false, pro: false, enterprise: true },
];

// Service data
const serviceCategories = [
  {
    title: 'Content Creation',
    icon: FiCamera,
    services: [
      {
        name: 'Video Editing',
        features: [
          'Short-form Content',
          'Long-form Content',
          'Social Media Clips',
          'Promotional Videos',
          'Motion Graphics'
        ],
        icon: FiFilm
      },
      {
        name: 'Graphic Design',
        features: [
          'Branding',
          'Marketing Materials',
          'Social Media Graphics',
          'Illustration',
          'Packaging'
        ],
        icon: FiPenTool
      }
    ]
  },
  {
    title: 'Digital Marketing',
    icon: FiTrendingUp,
    services: [
      {
        name: 'Social Media Management',
        features: [
          'Content Planning',
          'Community Management',
          'Multi-platform Support',
          'Analytics & Reporting',
          'Growth Metrics'
        ],
        icon: FiShare2
      },
      {
        name: 'Social Media Marketing',
        features: [
          'Platform Setup',
          'Campaign Management',
          'Budget Optimization',
          'Performance Tracking',
          'Competitor Analysis'
        ],
        icon: FiBarChart2
      }
    ]
  },
  {
    title: 'Development',
    icon: FiCode,
    services: [
      {
        name: 'Website Development',
        features: [
          'Static & Dynamic Websites',
          'E-commerce Solutions',
          'CMS Integration',
          'SEO Optimization',
          'Maintenance & Support'
        ],
        icon: FiGlobe
      },
      {
        name: 'Web App Design',
        features: [
          'User Interface Design',
          'Interaction Design',
          'Wireframing',
          'Prototyping',
          'Documentation'
        ],
        icon: FiLayout
      },
      {
        name: 'UI/UX Design',
        features: [
          'User Research',
          'Information Architecture',
          'Visual Design',
          'Usability Testing',
          'Design Systems'
        ],
        icon: FiGrid
      }
    ]
  },
  {
    title: 'Technical Solutions',
    icon: FiSettings,
    services: [
      {
        name: 'IoT Solutions',
        features: [
          'System Design',
          'Hardware Integration',
          'Software Development',
          'Monitoring Systems',
          'Maintenance'
        ],
        icon: FiCpu
      },
      {
        name: 'Cloud Solutions',
        features: [
          'AWS/Azure/GCP',
          'Cloud Migration',
          'Optimization',
          'Security',
          'Maintenance'
        ],
        icon: FiCloud
      },
      {
        name: 'DevOps Solutions',
        features: [
          'CI/CD Pipeline',
          'Infrastructure as Code',
          'Monitoring Setup',
          'Kubernetes Deployment',
          'Automation'
        ],
        icon: FiServer
      }
    ]
  },
  {
    title: 'AI/ML Services',
    icon: FiZap, // Changed from FiBrain to FiZap as it's a good representation of AI/ML processing power
    services: [
      {
        name: 'AI Chatbots',
        features: [
          'Customer Service',
          'Lead Generation',
          'Internal Support',
          'E-commerce Integration',
          'NLP Processing'
        ],
        icon: FiMessageSquare
      },
      {
        name: 'ML Solutions',
        features: [
          'Data Analysis',
          'Predictive Modeling',
          'Pattern Recognition',
          'Custom Algorithms',
          'Model Training'
        ],
        icon: FiActivity
      }
    ]
  }
];

const LandingPage: React.FC = () => {
  const { scrollToSection } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState('hero');
  const [teamSize, setTeamSize] = useState(5);
  const [storageNeeded, setStorageNeeded] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('white', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const cardBorderColor = useColorModeValue('gray.200', 'gray.700');
  const highlightColor = useColorModeValue('blue.500', 'blue.300');

  const sections = useMemo(() => [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'comparison', label: 'Compare' },
    { id: 'contact', label: 'Contact' },
  ], []);

  // Calculate estimated price based on team size and storage
  const calculateEstimatedPrice = () => {
    const basePrice = 29;
    const pricePerTeamMember = 10;
    const pricePerGB = 0.5;
    
    return basePrice + (teamSize * pricePerTeamMember) + (storageNeeded * pricePerGB);
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      let currentSection = activeSection;

      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeSection]);

  return (
    <Box bg={bgColor} minH="100vh">
      <Navbar />

      {/* Navigation Dots */}
      <div className="scroll-indicator">
        {sections.map(({ id, label }) => (
          <div
            key={id}
            className={`scroll-indicator-dot ${activeSection === id ? 'active' : ''}`}
            onClick={() => scrollToSection(id)}
            title={label}
          />
        ))}
      </div>

      {/* Hero Section */}
      <ScrollSection id="hero">
        <Container maxW="container.xl">
          <Flex
            align="center"
            justify="space-between"
            wrap="wrap"
            minH="100vh"
            pt={{ base: 20, md: 28 }}
            pb={20}
          >
            <Box flex={1} pr={{ base: 0, md: 20 }} mb={{ base: 10, md: 0 }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="float-animation"
              >
                <Heading
                  as="h1"
                  fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                  mb={6}
                  fontWeight="bold"
                  lineHeight="shorter"
                >
                  Transform Your{' '}
                  <Text
                    as="span"
                    bgGradient="linear(to-r, blue.400, purple.500)"
                    bgClip="text"
                  >
                    Digital Presence
                  </Text>
                </Heading>
                <Text
                  fontSize={{ base: 'lg', md: 'xl' }}
                  mb={8}
                  color={textColor}
                >
                  Elevate your business with our comprehensive digital solutions
                </Text>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  spacing={4}
                >
                  <Button
                    size="lg"
                    colorScheme="blue"
                    px={8}
                    onClick={() => scrollToSection('services')}
                    rightIcon={<Icon as={FiArrowRight} />}
                  >
                    Explore Services
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    px={8}
                    borderWidth={2}
                  >
                    Learn More
                  </Button>
                </Stack>
              </motion.div>
            </Box>
          </Flex>
        </Container>
      </ScrollSection>

      {/* Services Section */}
      <ScrollSection id="services">
        <Container maxW="container.xl" py={20}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '4xl' }}
              mb={4}
              textAlign="center"
            >
              Our Services
            </Heading>
            <Text
              color={textColor}
              textAlign="center"
              mb={12}
              maxW="2xl"
              mx="auto"
            >
              Comprehensive digital solutions tailored to your business needs
            </Text>
          </motion.div>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={8}
          >
            {serviceCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <Box
                  bg={cardBgColor}
                  p={8}
                  borderRadius="xl"
                  borderWidth={1}
                  borderColor={cardBorderColor}
                  height="100%"
                >
                  <Icon
                    as={category.icon}
                    boxSize={12}
                    color={highlightColor}
                    mb={4}
                  />
                  <Heading size="lg" mb={6}>
                    {category.title}
                  </Heading>
                  <Stack spacing={6}>
                    {category.services.map((service) => (
                      <Box key={service.name}>
                        <Flex align="center" mb={3}>
                          <Icon as={service.icon} mr={2} />
                          <Text fontSize="lg" fontWeight="bold">
                            {service.name}
                          </Text>
                        </Flex>
                        <Stack spacing={2}>
                          {service.features.map((feature) => (
                            <Flex key={feature} align="center">
                              <Icon as={FiCheck} color="green.500" mr={2} />
                              <Text>{feature}</Text>
                            </Flex>
                          ))}
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                  <Button
                    mt={6}
                    colorScheme="blue"
                    rightIcon={<FiArrowRight />}
                    onClick={onOpen}
                    width="full"
                  >
                    Learn More
                  </Button>
                </Box>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </ScrollSection>

      {/* Features Section */}
      <ScrollSection id="features">
        <Container maxW="container.xl" py={20}>
          <Heading
            as="h2"
            fontSize={{ base: '3xl', md: '4xl' }}
            mb={12}
            textAlign="center"
          >
            Key Features
          </Heading>
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={8}
          >
            {[
              {
                title: 'Responsive Design',
                description: 'Optimized for all devices',
                icon: FiLayout,
              },
              {
                title: 'Performance',
                description: 'Lightning-fast load times',
                icon: FiCode,
              },
              {
                title: 'Security',
                description: 'Enterprise-grade protection',
                icon: FiLayers,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box
                  p={8}
                  borderRadius="xl"
                  bg={cardBgColor}
                  borderWidth={1}
                  borderColor={cardBorderColor}
                  _hover={{
                    transform: 'translateY(-8px)',
                    boxShadow: 'xl',
                    borderColor: 'blue.400',
                  }}
                  transition="all 0.3s ease"
                >
                  <Icon
                    as={feature.icon}
                    w={8}
                    h={8}
                    mb={4}
                    color="blue.400"
                  />
                  <Heading size="md" mb={4}>
                    {feature.title}
                  </Heading>
                  <Text color={textColor}>{feature.description}</Text>
                </Box>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </ScrollSection>

      {/* Pricing Section */}
      <ScrollSection id="pricing">
        <Container maxW="container.xl" py={20}>
          <Heading
            as="h2"
            fontSize={{ base: '3xl', md: '4xl' }}
            mb={12}
            textAlign="center"
          >
            Flexible Pricing Plans
          </Heading>
          
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={8}
            mb={16}
          >
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box
                  p={8}
                  borderRadius="xl"
                  bg={cardBgColor}
                  borderWidth={2}
                  borderColor={tier.recommended ? highlightColor : cardBorderColor}
                  position="relative"
                  _hover={{
                    transform: 'translateY(-8px)',
                    boxShadow: 'xl',
                  }}
                  transition="all 0.3s ease"
                >
                  {tier.recommended && (
                    <Badge
                      colorScheme="blue"
                      position="absolute"
                      top={-3}
                      right={-3}
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      Recommended
                    </Badge>
                  )}
                  <Heading size="lg" mb={4}>
                    {tier.name}
                  </Heading>
                  <Text fontSize="3xl" fontWeight="bold" mb={6}>
                    ${tier.price}
                    <Text as="span" fontSize="sm" fontWeight="normal" color={textColor}>
                      /month
                    </Text>
                  </Text>
                  <Stack spacing={3}>
                    {tier.features.map((feature) => (
                      <Flex key={feature} align="center">
                        <Icon as={FiCheck} color={highlightColor} mr={2} />
                        <Text>{feature}</Text>
                      </Flex>
                    ))}
                  </Stack>
                  <Button
                    mt={8}
                    w="full"
                    colorScheme={tier.recommended ? 'blue' : 'gray'}
                    onClick={onOpen}
                  >
                    Get Started
                  </Button>
                </Box>
              </motion.div>
            ))}
          </Grid>

          {/* Price Calculator */}
          <Box
            p={8}
            borderRadius="xl"
            bg={cardBgColor}
            borderWidth={1}
            borderColor={cardBorderColor}
            maxW="3xl"
            mx="auto"
          >
            <Heading size="lg" mb={6}>
              Calculate Your Custom Price
            </Heading>
            <Stack spacing={6}>
              <Box>
                <Text mb={2}>Team Size: {teamSize} members</Text>
                <Slider
                  value={teamSize}
                  onChange={(v) => setTeamSize(v)}
                  min={1}
                  max={50}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
              <Box>
                <Text mb={2}>Storage Needed: {storageNeeded}GB</Text>
                <Slider
                  value={storageNeeded}
                  onChange={(v) => setStorageNeeded(v)}
                  min={5}
                  max={500}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
              <Flex align="center" justify="space-between">
                <Text fontSize="xl">Estimated Price:</Text>
                <Text fontSize="2xl" fontWeight="bold" color={highlightColor}>
                  ${calculateEstimatedPrice().toFixed(2)}/month
                </Text>
              </Flex>
              <Button colorScheme="blue" size="lg" onClick={onOpen}>
                Get Custom Quote
              </Button>
            </Stack>
          </Box>
        </Container>
      </ScrollSection>

      {/* Service Comparison Section */}
      <ScrollSection id="comparison">
        <Container maxW="container.xl" py={20}>
          <Heading
            as="h2"
            fontSize={{ base: '3xl', md: '4xl' }}
            mb={12}
            textAlign="center"
          >
            Compare Plans
          </Heading>
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Feature</Th>
                  <Th>Starter</Th>
                  <Th>Professional</Th>
                  <Th>Enterprise</Th>
                </Tr>
              </Thead>
              <Tbody>
                {serviceFeatures.map((feature) => (
                  <Tr key={feature.name}>
                    <Td>{feature.name}</Td>
                    <Td>
                      {feature.starter ? (
                        <Icon as={FiCheck} color="green.500" />
                      ) : (
                        <Text color="red.500">-</Text>
                      )}
                    </Td>
                    <Td>
                      {feature.pro ? (
                        <Icon as={FiCheck} color="green.500" />
                      ) : (
                        <Text color="red.500">-</Text>
                      )}
                    </Td>
                    <Td>
                      {feature.enterprise ? (
                        <Icon as={FiCheck} color="green.500" />
                      ) : (
                        <Text color="red.500">-</Text>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Container>
      </ScrollSection>

      {/* Contact Section */}
      <ScrollSection id="contact">
        <Container maxW="container.xl" py={20}>
          <Heading
            as="h2"
            fontSize={{ base: '3xl', md: '4xl' }}
            mb={12}
            textAlign="center"
          >
            Get in Touch
          </Heading>
          <Box
            p={8}
            borderRadius="xl"
            bg={cardBgColor}
            borderWidth={1}
            borderColor={cardBorderColor}
            maxW="xl"
            mx="auto"
          >
            <Stack spacing={4}>
              <Text color={textColor} textAlign="center" fontSize="lg">
                Ready to transform your digital presence? Contact us today to get started on your journey to success.
              </Text>
              <Button
                size="lg"
                colorScheme="blue"
                rightIcon={<Icon as={FiArrowRight} />}
              >
                Contact Us
              </Button>
            </Stack>
          </Box>
        </Container>
      </ScrollSection>

      {/* Quote Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Get Started</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text mb={4}>
              Thank you for your interest! Our team will contact you shortly with a custom quote
              tailored to your needs.
            </Text>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default LandingPage;
