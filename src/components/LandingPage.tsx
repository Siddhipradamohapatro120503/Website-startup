import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IconType } from 'react-icons';
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
  FiDownload,
} from 'react-icons/fi';
import Navbar from './navigation/Navbar';
import Footer from './common/Footer';
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
    features: [
      'Advanced Analytics',
      '15 Team Members',
      '50GB Storage',
      'Priority Support',
      'Custom Domain',
    ],
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: 299,
    features: [
      'Custom Analytics',
      'Unlimited Team Members',
      '500GB Storage',
      '24/7 Support',
      'Custom Integration',
    ],
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

// Types
interface Service {
  name: string;
  icon: IconType;
  features: string[];
  description?: string;
  technologies?: string[];
  useCases?: string[];
  brochureUrl?: string;
}

interface ServiceCategory {
  title: string;
  icon: IconType;
  services: Service[];
}

// Service data
export const serviceCategories: ServiceCategory[] = [
  {
    title: 'AI & Machine Learning',
    icon: FiCpu,
    services: [
      {
        name: 'Custom AI Solutions',
        icon: FiSettings,
        features: [
          'Custom AI Model Development',
          'Deep Learning Solutions',
          'Neural Network Architecture',
          'Model Training & Optimization',
          'AI Integration Services',
          'Performance Monitoring',
        ],
        description: 'Tailored AI solutions designed to meet your specific business needs',
        technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'CUDA'],
        useCases: [
          'Predictive Analytics',
          'Pattern Recognition',
          'Decision Support Systems',
          'Automated Decision Making',
        ],
        brochureUrl: '/brochures/ai-ml/custom-ai-solutions.pdf',
      },
      {
        name: 'Computer Vision',
        icon: FiCamera,
        features: [
          'Image Recognition & Classification',
          'Object Detection & Tracking',
          'Facial Recognition Systems',
          'Video Analysis',
          'OCR Implementation',
          'Visual Quality Control',
        ],
        description: 'Advanced computer vision solutions for image and video analysis',
        technologies: ['OpenCV', 'TensorFlow Vision', 'YOLO', 'ResNet'],
        useCases: [
          'Quality Control Automation',
          'Security & Surveillance',
          'Medical Image Analysis',
          'Retail Analytics',
        ],
        brochureUrl: '/brochures/ai-ml/computer-vision.pdf',
      },
      {
        name: 'Natural Language Processing',
        icon: FiMessageSquare,
        features: [
          'Text Classification & Analysis',
          'Sentiment Analysis',
          'Named Entity Recognition',
          'Language Translation',
          'Chatbot Development',
          'Text Summarization',
        ],
        description: 'Powerful NLP solutions for text and language processing',
        technologies: ['BERT', 'GPT', 'spaCy', 'NLTK'],
        useCases: [
          'Customer Service Automation',
          'Content Analysis',
          'Document Processing',
          'Market Intelligence',
        ],
        brochureUrl: '/brochures/ai-ml/nlp.pdf',
      },
      {
        name: 'Predictive Analytics',
        icon: FiTrendingUp,
        features: [
          'Time Series Analysis',
          'Forecasting Models',
          'Risk Assessment',
          'Anomaly Detection',
          'Pattern Recognition',
          'Prescriptive Analytics',
        ],
        description: 'Data-driven predictive analytics for business intelligence',
        technologies: ['Prophet', 'StatsModels', 'R', 'ARIMA'],
        useCases: [
          'Sales Forecasting',
          'Risk Management',
          'Demand Prediction',
          'Resource Optimization',
        ],
        brochureUrl: '/brochures/ai-ml/predictive-analytics.pdf',
      },
    ],
  },
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
          'Motion Graphics',
        ],
        icon: FiFilm,
        description: 'Professional video editing services for all your content needs',
        technologies: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro'],
        useCases: [
          'Social Media Content',
          'Marketing Videos',
          'Corporate Presentations',
          'Event Coverage',
        ],
        brochureUrl: '/brochures/content/video-editing.pdf',
      },
      {
        name: 'Graphic Design',
        features: [
          'Branding',
          'Marketing Materials',
          'Social Media Graphics',
          'Illustration',
          'Packaging',
        ],
        icon: FiPenTool,
        description: 'Creative graphic design solutions for your brand',
        technologies: ['Adobe Photoshop', 'Illustrator', 'InDesign', 'Figma'],
        useCases: [
          'Brand Identity',
          'Marketing Collateral',
          'Social Media Assets',
          'Print Materials',
        ],
        brochureUrl: '/brochures/content/graphic-design.pdf',
      },
    ],
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
          'Growth Metrics',
        ],
        icon: FiShare2,
        description: 'Comprehensive social media management services',
        technologies: ['Hootsuite', 'Buffer', 'Sprout Social', 'Later'],
        useCases: [
          'Brand Building',
          'Community Engagement',
          'Lead Generation',
          'Brand Awareness',
        ],
        brochureUrl: '/brochures/marketing/social-media-management.pdf',
      },
      {
        name: 'Social Media Marketing',
        features: [
          'Platform Setup',
          'Campaign Management',
          'Budget Optimization',
          'Performance Tracking',
          'Competitor Analysis',
        ],
        icon: FiBarChart2,
        description: 'Strategic social media marketing solutions',
        technologies: ['Facebook Ads', 'Google Ads', 'LinkedIn Ads', 'Twitter Ads'],
        useCases: [
          'Lead Generation',
          'Brand Awareness',
          'Product Launch',
          'Event Promotion',
        ],
        brochureUrl: '/brochures/marketing/social-media-marketing.pdf',
      },
    ],
  },
  {
    title: 'Development',
    icon: FiCode,
    services: [
      {
        name: 'Web Development',
        features: [
          'Responsive Design',
          'E-commerce Solutions',
          'CMS Integration',
          'SEO Optimization',
          'Maintenance & Support',
        ],
        icon: FiGlobe,
        description: 'Custom web development solutions for your business',
        technologies: ['React', 'Node.js', 'PHP', 'WordPress'],
        useCases: [
          'Business Websites',
          'E-commerce Platforms',
          'Web Applications',
          'Corporate Portals',
        ],
        brochureUrl: '/brochures/development/web-development.pdf',
      },
      {
        name: 'Web App Design',
        features: [
          'UI Design',
          'Interaction Design',
          'Wireframing',
          'Prototyping',
          'Documentation',
        ],
        icon: FiLayout,
        description: 'Modern web application design services',
        technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision'],
        useCases: [
          'SaaS Applications',
          'Admin Dashboards',
          'Customer Portals',
          'Mobile Web Apps',
        ],
        brochureUrl: '/brochures/development/web-app-design.pdf',
      },
      {
        name: 'UI/UX Design',
        features: [
          'User Research',
          'Information Architecture',
          'Visual Design',
          'Usability Testing',
          'Design Systems',
        ],
        icon: FiGrid,
        description: 'User-centered UI/UX design services',
        technologies: ['Figma', 'Sketch', 'Adobe XD', 'Zeplin'],
        useCases: [
          'Mobile Apps',
          'Web Applications',
          'E-commerce',
          'Enterprise Systems',
        ],
        brochureUrl: '/brochures/development/ui-ux-design.pdf',
      },
    ],
  },
  {
    title: 'Technical Solutions',
    icon: FiSettings,
    services: [
      {
        name: 'Infrastructure Setup',
        features: [
          'Network Design',
          'Server Configuration',
          'Security Implementation',
          'Software Development',
          'Monitoring Systems',
          'Maintenance',
        ],
        icon: FiCpu,
        description: 'Enterprise-grade infrastructure solutions',
        technologies: ['VMware', 'Cisco', 'Microsoft Server', 'Linux'],
        useCases: [
          'Data Centers',
          'Cloud Infrastructure',
          'Network Security',
          'System Integration',
        ],
        brochureUrl: '/brochures/technical/infrastructure-setup.pdf',
      },
      {
        name: 'Cloud Solutions',
        features: [
          'AWS/Azure/GCP',
          'Cloud Migration',
          'Optimization',
          'Security',
          'Maintenance',
        ],
        icon: FiCloud,
        description: 'Comprehensive cloud computing solutions',
        technologies: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes'],
        useCases: [
          'Cloud Migration',
          'Hybrid Cloud',
          'Cloud Security',
          'Cost Optimization',
        ],
        brochureUrl: '/brochures/technical/cloud-solutions.pdf',
      },
      {
        name: 'DevOps Solutions',
        features: [
          'CI/CD Pipeline',
          'Infrastructure as Code',
          'Monitoring Setup',
          'Kubernetes Deployment',
          'Automation',
        ],
        icon: FiServer,
        description: 'End-to-end DevOps implementation services',
        technologies: ['Jenkins', 'Docker', 'Kubernetes', 'Terraform'],
        useCases: [
          'Continuous Integration',
          'Automated Deployment',
          'Container Orchestration',
          'Infrastructure Automation',
        ],
        brochureUrl: '/brochures/technical/devops-solutions.pdf',
      },
    ],
  },
];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('hero');
  const [teamSize, setTeamSize] = useState(5);
  const [storageNeeded, setStorageNeeded] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('white', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const cardBorderColor = useColorModeValue('gray.200', 'gray.700');
  const highlightColor = useColorModeValue('blue.500', 'blue.300');
  const hoverBgColor = useColorModeValue('gray.50', 'gray.700');

  const sections = useMemo(
    () => [
      { id: 'hero', label: 'Home' },
      { id: 'services', label: 'Services' },
      { id: 'features', label: 'Features' },
      { id: 'contactus', label: 'Contact Us' },
    ],
    []
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate estimated price based on team size and storage
  const calculateEstimatedPrice = () => {
    const basePrice = 29;
    const pricePerTeamMember = 10;
    const pricePerGB = 0.5;

    return (
      basePrice + teamSize * pricePerTeamMember + storageNeeded * pricePerGB
    );
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
      <Box id="hero">
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
                    onClick={() => window.open('/company-brochure.pdf', '_blank')}
                    rightIcon={<Icon as={FiDownload} />}
                  >
                    Download Company Brochure
                  </Button>
                </Stack>
              </motion.div>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Services Section */}
      <Box id="services">
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
                onClick={() =>
                  navigate(`/services/${category.title.toLowerCase().replace(/\s+/g, '-')}`)
                }
                style={{ cursor: 'pointer' }}
              >
                <Box
                  bg={cardBgColor}
                  p={8}
                  borderRadius="xl"
                  borderWidth={1}
                  borderColor={cardBorderColor}
                  height="100%"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: 'lg',
                    transition: 'all 0.3s ease',
                  }}
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
                  <Stack spacing={4}>
                    {category.services.map((service, index) => (
                      <Box
                        key={service.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(
                            `/services/${category.title.toLowerCase().replace(/\s+/g, '-')}/${
                              service.name.toLowerCase().replace(/\s+/g, '-')
                            }`
                          );
                        }}
                        cursor="pointer"
                        p={4}
                        borderRadius="md"
                        borderWidth={1}
                        borderColor={cardBorderColor}
                        _hover={{
                          bg: hoverBgColor,
                          transform: 'translateX(4px)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <Flex align="center" justify="space-between">
                          <Box>
                            <Text fontWeight="semibold" mb={2}>
                              {service.name}
                            </Text>
                            <Text color={textColor} fontSize="sm">
                              {service.features[0]}
                              {service.features.length > 1 && '...'}
                            </Text>
                          </Box>
                          <Icon as={FiArrowRight} />
                        </Flex>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features">
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
          <Box textAlign="center" mt={8}>
            <Button
              size="lg"
              colorScheme="blue"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate('/features');
              }}
              rightIcon={<Icon as={FiArrowRight} />}
            >
              View All Features
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Contact Us Section */}
      <Box id="contactus">
        <Container maxW="container.xl" py={20}>
          <Heading
            as="h2"
            fontSize={{ base: '3xl', md: '4xl' }}
            mb={12}
            textAlign="center"
          >
            Let's Work Together
          </Heading>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={8}
            mb={16}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Box
                p={8}
                borderRadius="xl"
                bg={cardBgColor}
                borderWidth={2}
                borderColor={cardBorderColor}
                position="relative"
                _hover={{
                  transform: 'translateY(-8px)',
                  boxShadow: 'xl',
                  borderColor: 'blue.400',
                }}
                transition="all 0.3s ease"
              >
                <Icon as={FiMessageSquare} w={10} h={10} color="blue.400" mb={4} />
                <Heading size="lg" mb={4}>
                  Get in Touch
                </Heading>
                <Text color={textColor} mb={6}>
                  Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
                </Text>
                <Button
                  w="full"
                  colorScheme="blue"
                  onClick={() => navigate('/contact')}
                  rightIcon={<Icon as={FiArrowRight} />}
                >
                  Contact Us
                </Button>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Box
                p={8}
                borderRadius="xl"
                bg={cardBgColor}
                borderWidth={2}
                borderColor={cardBorderColor}
                position="relative"
                _hover={{
                  transform: 'translateY(-8px)',
                  boxShadow: 'xl',
                  borderColor: 'blue.400',
                }}
                transition="all 0.3s ease"
              >
                <Icon as={FiActivity} w={10} h={10} color="blue.400" mb={4} />
                <Heading size="lg" mb={4}>
                  Schedule Demo
                </Heading>
                <Text color={textColor} mb={6}>
                  See our solutions in action. Book a personalized demo with our product experts.
                </Text>
                <Button
                  w="full"
                  colorScheme="blue"
                  variant="outline"
                  onClick={onOpen}
                  rightIcon={<Icon as={FiArrowRight} />}
                >
                  Book Demo
                </Button>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Box
                p={8}
                borderRadius="xl"
                bg={cardBgColor}
                borderWidth={2}
                borderColor={cardBorderColor}
                position="relative"
                _hover={{
                  transform: 'translateY(-8px)',
                  boxShadow: 'xl',
                  borderColor: 'blue.400',
                }}
                transition="all 0.3s ease"
              >
                <Icon as={FiZap} w={10} h={10} color="blue.400" mb={4} />
                <Heading size="lg" mb={4}>
                  Quick Start
                </Heading>
                <Text color={textColor} mb={6}>
                  Ready to begin? Start your journey with our quick onboarding process.
                </Text>
                <Button
                  w="full"
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => navigate('/signup')}
                  rightIcon={<Icon as={FiArrowRight} />}
                >
                  Get Started
                </Button>
              </Box>
            </motion.div>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />

      {/* Quote Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Get Started</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text mb={4}>
              Thank you for your interest! Our team will contact you shortly with a
              custom quote tailored to your needs.
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
