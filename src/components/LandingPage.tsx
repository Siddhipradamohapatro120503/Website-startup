import React, { useState, useEffect, useMemo } from 'react';
import { Box, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button, Text, useDisclosure } from '@chakra-ui/react';
import Navbar from './navigation/Navbar';
import Footer from './common/Footer';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import FeaturesSection from './sections/FeaturesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import ContactSection from './sections/ContactSection';
import ScrollIndicator from './sections/ScrollIndicator';
import { serviceCategories } from '../data/services';
import { testimonials } from '../data/testimonials';
import '../styles/animations.css';

const LandingPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.900');

  const sections = useMemo(
    () => [
      { id: 'hero', label: 'Home' },
      { id: 'services', label: 'Services' },
      { id: 'features', label: 'Features' },
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

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeSection]);

  return (
    <Box bg={bgColor} minH="100vh">
      <Navbar />
      
      <ScrollIndicator
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

      <HeroSection onExploreClick={() => scrollToSection('services')} />
      <ServicesSection serviceCategories={serviceCategories} />
      <FeaturesSection />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection onDemoClick={onOpen} />
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