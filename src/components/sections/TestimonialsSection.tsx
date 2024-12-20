import React from 'react';
import { Box, Container, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import Marquee from 'react-fast-marquee';
import TestimonialCard from '../TestimonialCard';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <Box py={20} bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="container.xl">
        <VStack spacing={8} mb={12}>
          <Heading as="h2" size="xl" textAlign="center" mb={2}>
            What Our Clients Say
          </Heading>
          <Text
            fontSize="lg"
            color={useColorModeValue('gray.600', 'gray.400')}
            textAlign="center"
            maxW="2xl"
          >
            Discover how our services have transformed businesses and delighted our clients
          </Text>
        </VStack>

        <Box overflow="hidden" py={8}>
          <Marquee gradient={false} speed={40} pauseOnHover={true}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </Marquee>
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
