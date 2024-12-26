import React, { useState, useEffect, useMemo } from 'react';
import { Box, Image, SimpleGrid, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button, Text, useDisclosure, Flex, Spinner, ScaleFade } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Navbar from './navigation/Navbar';
import Footer from './common/Footer';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import FeaturesSection from './sections/FeaturesSection';
// import PriceCalculator from './sections/PriceCalculator';
import TestimonialsSection from './sections/TestimonialsSection';
import ContactSection from './sections/ContactSection';
import ScrollIndicator from './sections/ScrollIndicator';
import { serviceCategories } from '../data/services';
import { testimonials } from '../data/testimonials';
import '../styles/animations.css';

// Image imports
const techImages = {
  hero: [
    '/image/hero-banner.jpg',
    '/image/hero-banner-2.jpg',
    '/image/hero-banner-3.jpg'
  ],
  services: [
    '/image/service1.jpg',
    '/image/service2.jpg',
    '/image/service3.jpg',
    '/image/service4.jpg',
    '/image/service5.jpg',
    '/image/service6.jpg'
  ],
  features: [
    '/image/feature1.jpg',
    '/image/feature2.jpg',
    '/image/feature3.jpg',
    '/image/feature4.jpg',
    '/image/feature5.jpg'
  ],
  team: [
    '/image/team1.jpg',
    '/image/team2.jpg',
    '/image/team3.jpg',
    '/image/team4.jpg'
  ],
  tech: [
    '/image/tech1.png',
    '/image/tech2.png',
    '/image/tech3.png',
    '/image/tech4.png'
  ],
  partners: [
    '/image/partner1.png',
    '/image/partner2.png',
    '/image/partner3.png',
    '/image/partner4.png',
    '/image/partner5.png',
    '/image/partner6.png'
  ],
  about: [
    '/image/about1.jpg',
    '/image/about2.jpg',
    '/image/about3.jpg'
  ],
  cases: [
    '/image/case1.jpg',
    '/image/case2.jpg',
    '/image/case3.jpg'
  ],
  blog: [
    '/image/blog1.jpg',
    '/image/blog2.jpg',
    '/image/blog3.jpg'
  ],
  contact: [
    '/image/contact1.jpg',
    '/image/contact2.jpg'
  ],
  patterns: [
    '/image/pattern1.jpg',
    '/image/pattern2.jpg'
  ]
};

const MotionBox = motion(Box);

const LoadingScreen = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const spinnerColor = useColorModeValue('blue.500', 'blue.200');
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === 'Loading...') return 'Loading';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg={bgColor}
      zIndex={9999}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <MotionBox
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        mb={4}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color={spinnerColor}
          size="xl"
        />
      </MotionBox>
      <Text
        color={textColor}
        fontSize="lg"
        fontWeight="medium"
        letterSpacing="wide"
      >
        {loadingText}
      </Text>
    </Flex>
  );
};

const LandingPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.900');

  const sections = useMemo(
    () => [
      { id: 'hero', label: 'Home' },
      { id: 'services', label: 'Services' },
      { id: 'features', label: 'Features' },
      { id: 'price-calculator', label: 'Price Calculator' },
      { id: 'testimonials', label: 'Testimonials' },
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

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeSection]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ScaleFade in={!isLoading} initialScale={0.9}>
      <Box bg={bgColor} minH="100vh">
        <Navbar />
        <ScrollIndicator
          sections={sections}
          activeSection={activeSection}
          onSectionClick={scrollToSection}
        />

        <HeroSection 
          onExploreClick={() => scrollToSection('services')}
          images={techImages.hero}
        />
        
        <ServicesSection 
          serviceCategories={serviceCategories}
          images={techImages.services}
        />
        
        <FeaturesSection 
          images={techImages.features}
        />
        
        {/* <PriceCalculator /> */}
        
        <TestimonialsSection testimonials={testimonials} />
        <ContactSection onDemoClick={onOpen} />
        <Footer />

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Schedule a Demo</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Text>Contact form will be implemented here.</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </ScaleFade>
  );
};

export default LandingPage;