import React from 'react';
import { Box, Container, Heading, Text, Grid, Icon, Button, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiActivity, FiZap, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface ContactSectionProps {
  onDemoClick?: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ onDemoClick }) => {
  const navigate = useNavigate();
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const cardBorderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const handleDemoClick = () => {
    navigate('/demo');
  };

  return (
    <Box id="contactus">
      <Container maxW="container.xl" py={20}>
        <Heading as="h2" fontSize={{ base: '3xl', md: '4xl' }} mb={12} textAlign="center">
          Let's Work Together
        </Heading>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8} mb={16}>
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
                variant="outline"
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
                onClick={handleDemoClick}
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
                Quick Support
              </Heading>
              <Text color={textColor} mb={6}>
                Need immediate assistance? Our support team is ready to help you right away.
              </Text>
              <Button
                w="full"
                colorScheme="blue"
                variant="outline"
                onClick={() => window.location.href = 'mailto:support@shreetech.org'}
                rightIcon={<Icon as={FiArrowRight} />}
              >
                Get Support
              </Button>
            </Box>
          </motion.div>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactSection;
