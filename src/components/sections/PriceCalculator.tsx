import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Stack,
  Text,
  useToast,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface SubService {
  name: string;
  priceMultiplier: {
    low: number;
    medium: number;
    high: number;
  };
  features: string[];
}

interface Service {
  name: string;
  basePrice: {
    usd: number;
    inr: number;
  };
  subServices: {
    [key: string]: SubService;
  };
}

interface Services {
  [key: string]: Service;
}

const services: Services = {
  'ai-ml': {
    name: 'AI & Machine Learning',
    basePrice: {
      usd: 670,
      inr: 50000
    },
    subServices: {
      'custom-ai': {
        name: 'Custom AI Solutions',
        priceMultiplier: {
          low: 1.0,
          medium: 2.0,
          high: 4.0
        },
        features: ['Model Development', 'Integration', 'Training', 'Deployment']
      },
      'computer-vision': {
        name: 'Computer Vision',
        priceMultiplier: {
          low: 1.5,
          medium: 2.0,
          high: 3.0
        },
        features: ['Object Detection', 'Image Recognition', 'Video Analysis', 'Pattern Recognition']
      },
      'nlp': {
        name: 'Natural Language Processing',
        priceMultiplier: {
          low: 1.0,
          medium: 1.5,
          high: 2.0
        },
        features: ['Text Analysis', 'Sentiment Analysis', 'Language Translation', 'Named Entity Recognition']
      },
      'predictive-analytics': {
        name: 'Predictive Analytics',
        priceMultiplier: {
          low: 1.4,
          medium: 2.0,
          high: 3.0
        },
        features: ['Time Series Analysis', 'Forecasting', 'Pattern Detection', 'Anomaly Detection']
      }
    }
  },
  'content': {
    name: 'Content Creation',
    basePrice: {
      usd: 135,
      inr: 10000
    },
    subServices: {
      'video-editing': {
        name: 'Video Editing',
        priceMultiplier: {
          low: 1.5,
          medium: 3.0,
          high: 5.0
        },
        features: ['Video Editing', 'Motion Graphics', 'Color Grading', 'Sound Design']
      },
      'graphic-design': {
        name: 'Graphic Design',
        priceMultiplier: {
          low: 1.0,
          medium: 2.5,
          high: 4.0
        },
        features: ['Logo Design', 'Brand Guidelines', 'Marketing Materials', 'Social Media Graphics']
      }
    }
  },
  'digital-marketing': {
    name: 'Digital Marketing',
    basePrice: {
      usd: 270,
      inr: 20000
    },
    subServices: {
      'social-media-management': {
        name: 'Social Media Management',
        priceMultiplier: {
          low: 1.0,
          medium: 1.75,
          high: 2.5
        },
        features: ['Content Strategy', 'Community Management', 'Analytics', 'Campaign Planning']
      },
      'social-media-marketing': {
        name: 'Social Media Marketing',
        priceMultiplier: {
          low: 1.25,
          medium: 2.5,
          high: 3.75
        },
        features: ['Platform Setup', 'Campaign Management', 'Budget Optimization', 'Performance Tracking']
      }
    }
  },
  'development': {
    name: 'Development',
    basePrice: {
      usd: 335,
      inr: 25000
    },
    subServices: {
      'web-development': {
        name: 'Web Development',
        priceMultiplier: {
          low: 2.0,
          medium: 4.0,
          high: 6.0
        },
        features: ['Frontend Development', 'Backend Development', 'API Integration', 'Database Design']
      },
      'web-app-design': {
        name: 'Web App Design',
        priceMultiplier: {
          low: 1.2,
          medium: 2.4,
          high: 4.0
        },
        features: ['UI Design', 'Prototyping', 'Responsive Design', 'User Testing']
      },
      'ui-ux': {
        name: 'UI/UX Design',
        priceMultiplier: {
          low: 1.0,
          medium: 2.0,
          high: 3.0
        },
        features: ['User Research', 'Information Architecture', 'Wireframing', 'Visual Design']
      }
    }
  },
  'technical': {
    name: 'Technical Solutions',
    basePrice: {
      usd: 1350,
      inr: 100000
    },
    subServices: {
      'infrastructure': {
        name: 'Infrastructure Setup',
        priceMultiplier: {
          low: 1.0,
          medium: 1.75,
          high: 2.5
        },
        features: ['Network Architecture', 'Security Setup', 'Performance Optimization', 'Monitoring']
      },
      'cloud': {
        name: 'Cloud Solutions',
        priceMultiplier: {
          low: 0.15,
          medium: 0.5,
          high: 1.0
        },
        features: ['Cloud Migration', 'Architecture Design', 'Cost Optimization', 'Security']
      },
      'devops': {
        name: 'DevOps Solutions',
        priceMultiplier: {
          low: 0.5,
          medium: 1.0,
          high: 1.5
        },
        features: ['Pipeline Setup', 'Automation', 'Monitoring', 'Security Integration']
      }
    }
  }
};

const PriceCalculator: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('development');
  const [selectedSubService, setSelectedSubService] = useState<string>('web-development');
  const [complexity, setComplexity] = useState<'low' | 'medium' | 'high'>('medium');
  const [duration, setDuration] = useState<number>(3);
  const [teamSize, setTeamSize] = useState<number>(3);
  const [currency, setCurrency] = useState<'usd' | 'inr'>('inr');
  const [showTooltip, setShowTooltip] = useState(false);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Update subservice when main service changes
  useEffect(() => {
    const service = services[selectedService as keyof typeof services];
    const subServices = Object.keys(service.subServices);
    setSelectedSubService(subServices[0]);
  }, [selectedService]);

  const calculatePrice = () => {
    const service = services[selectedService];
    const subService = service.subServices[selectedSubService];
    
    // Get complexity multiplier directly from the service
    const complexityMultiplier = subService.priceMultiplier[complexity];
    
    // Scale factors
    const scaleFactor = teamSize <= 5 ? 1 : 1.5;  // Larger teams/scale increases cost
    
    // Duration factors - longer projects get better rates
    const durationFactor = duration <= 3 ? 1 : 0.85;  // 15% discount for longer projects
    
    // Calculate base price with all multipliers
    const basePrice = service.basePrice[currency] * 
      complexityMultiplier * 
      scaleFactor * 
      durationFactor;

    // Monthly cost for the core service
    const monthlyRate = basePrice;

    // Total project cost
    const totalPrice = monthlyRate * duration;

    // Additional costs
    const maintenanceCost = totalPrice * 0.15;  // 15% for maintenance
    const infrastructureCost = totalPrice * 0.10;  // 10% for infrastructure
    
    // Final price including all costs
    const finalPrice = totalPrice + maintenanceCost + infrastructureCost;

    return {
      total: Math.round(finalPrice),
      monthly: Math.round(monthlyRate),
      features: subService.features as string[],
      complexity: complexity,
      duration: duration,
      teamSize: teamSize
    };
  };

  const formatCurrency = (amount: number) => {
    if (currency === 'usd') {
      return `$${amount.toLocaleString('en-US')}`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  };

  const handleGetQuote = () => {
    const estimate = calculatePrice();
    
    toast({
      title: 'Project Cost Estimate',
      description: `
        Total Project Cost: ${formatCurrency(estimate.total)}
        Monthly Cost: ${formatCurrency(estimate.monthly)}
        
        Project Details:
        • Complexity Level: ${estimate.complexity}
        • Duration: ${estimate.duration} months
        • Team Size: ${estimate.teamSize} members
        
        Included Features:
        ${estimate.features.map((feature: string) => `• ${feature}`).join('\n')}
        
        Additional Inclusions:
        • Development costs
        • Maintenance & support (15%)
        • Infrastructure & licensing (10%)
        
        Note: 
        • Prices are indicative and may vary based on specific requirements
        • Long-term projects (>3 months) receive a 15% discount
        • Larger teams/scale may increase costs by up to 50%
      `,
      status: 'success',
      duration: 15000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.lg" py={10}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Stack spacing={8}>
          <Heading textAlign="center" size="xl" mb={8}>
            Project Cost Calculator
          </Heading>

          <Box
            p={6}
            borderRadius="lg"
            boxShadow="xl"
            bg={bgColor}
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Stack spacing={6}>
              <FormControl>
                <Text mb={2} fontWeight="medium">Service Category</Text>
                <Select
                  value={selectedService}
                  onChange={(e) => {
                    setSelectedService(e.target.value);
                    setSelectedSubService(Object.keys(services[e.target.value].subServices)[0]);
                  }}
                  sx={{
                    transition: 'transform 0.2s',
                    _hover: { transform: 'scale(1.02)' }
                  }}
                >
                  {Object.entries(services).map(([key, service]) => (
                    <option key={key} value={key}>
                      {service.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <Text mb={2} fontWeight="medium">Specific Service</Text>
                <Select
                  value={selectedSubService}
                  onChange={(e) => setSelectedSubService(e.target.value)}
                  sx={{
                    transition: 'transform 0.2s',
                    _hover: { transform: 'scale(1.02)' }
                  }}
                >
                  {Object.entries(services[selectedService].subServices).map(([key, service]) => (
                    <option key={key} value={key}>
                      {service.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <Text mb={2} fontWeight="medium">Project Complexity</Text>
                <Select
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value as 'low' | 'medium' | 'high')}
                  sx={{
                    transition: 'transform 0.2s',
                    _hover: { transform: 'scale(1.02)' }
                  }}
                >
                  <option value="low">Low - Basic Implementation</option>
                  <option value="medium">Medium - Standard Features</option>
                  <option value="high">High - Advanced Features</option>
                </Select>
              </FormControl>

              <FormControl>
                <Text mb={2} fontWeight="medium">Project Duration (months)</Text>
                <Slider
                  min={1}
                  max={12}
                  step={1}
                  value={duration}
                  onChange={(value) => setDuration(value)}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <SliderMark value={1} mt={2} fontSize="sm">
                    1m
                  </SliderMark>
                  <SliderMark value={6} mt={2} fontSize="sm">
                    6m
                  </SliderMark>
                  <SliderMark value={12} mt={2} fontSize="sm">
                    12m
                  </SliderMark>
                  <SliderTrack bg="gray.200">
                    <SliderFilledTrack bg="blue.500" />
                  </SliderTrack>
                  <Tooltip
                    hasArrow
                    bg="blue.500"
                    color="white"
                    placement="top"
                    isOpen={showTooltip}
                    label={`${duration} months`}
                  >
                    <SliderThumb boxSize={6} />
                  </Tooltip>
                </Slider>
              </FormControl>

              <FormControl>
                <Text mb={2} fontWeight="medium">Team Size</Text>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={teamSize}
                  onChange={(value) => setTeamSize(value)}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <SliderMark value={1} mt={2} fontSize="sm">
                    1
                  </SliderMark>
                  <SliderMark value={5} mt={2} fontSize="sm">
                    5
                  </SliderMark>
                  <SliderMark value={10} mt={2} fontSize="sm">
                    10
                  </SliderMark>
                  <SliderTrack bg="gray.200">
                    <SliderFilledTrack bg="blue.500" />
                  </SliderTrack>
                  <Tooltip
                    hasArrow
                    bg="blue.500"
                    color="white"
                    placement="top"
                    isOpen={showTooltip}
                    label={`${teamSize} members`}
                  >
                    <SliderThumb boxSize={6} />
                  </Tooltip>
                </Slider>
              </FormControl>

              <FormControl>
                <Text mb={2} fontWeight="medium">Currency</Text>
                <Select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as 'usd' | 'inr')}
                  sx={{
                    transition: 'transform 0.2s',
                    _hover: { transform: 'scale(1.02)' }
                  }}
                >
                  <option value="inr">INR (₹)</option>
                  <option value="usd">USD ($)</option>
                </Select>
              </FormControl>

              <Button
                colorScheme="blue"
                size="lg"
                onClick={handleGetQuote}
                sx={{
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }
                }}
              >
                Calculate Estimate
              </Button>
            </Stack>
          </Box>
        </Stack>
      </MotionBox>
    </Container>
  );
};

export default PriceCalculator;
