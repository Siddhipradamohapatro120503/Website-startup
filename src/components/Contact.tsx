import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useColorModeValue,
  Icon,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import Navbar from './navigation/Navbar';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const cardBorderColor = useColorModeValue('gray.200', 'gray.700');

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      content: 'support@shreetech.org',
    },
    // {
    //   icon: FiPhone,
    //   title: 'Phone',
    //   content: '+91 8471045745 +91 6370066997',
    // },
    {
      icon: FiMapPin,
      title: 'Address',
      content: '123 Innovation Street, Tech City, TC 12345',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: 'Message sent!',
      description: "We'll get back to you as soon as possible.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    setIsSubmitting(false);
  };

  return (
    <Box bg={bgColor} minH="100vh">
      <Navbar />
      <Container maxW="container.xl" pt={20}>
        <VStack spacing={8} as="section" textAlign="center" py={16}>
          <Heading
            as="h1"
            fontSize={{ base: '4xl', md: '5xl' }}
            fontWeight="bold"
          >
            Contact Us
          </Heading>
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            color={textColor}
            maxW="2xl"
          >
            Have questions? We'd love to hear from you. Send us a message
            and we'll respond as soon as possible.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16} py={8}>
          {/* Contact Form */}
          <Box
            as="form"
            onSubmit={handleSubmit}
            p={8}
            bg={cardBgColor}
            borderWidth="1px"
            borderColor={cardBorderColor}
            borderRadius="xl"
            shadow="md"
          >
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" placeholder="Your name" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="your@email.com" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Subject</FormLabel>
                <Input type="text" placeholder="How can we help?" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea
                  placeholder="Your message..."
                  rows={6}
                  resize="none"
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                width="full"
                isLoading={isSubmitting}
              >
                Send Message
              </Button>
            </VStack>
          </Box>

          {/* Contact Information */}
          <VStack spacing={8} align="stretch">
            {contactInfo.map((info, index) => (
              <Box
                key={index}
                p={6}
                bg={cardBgColor}
                borderWidth="1px"
                borderColor={cardBorderColor}
                borderRadius="xl"
                shadow="md"
              >
                <HStack spacing={4}>
                  <Icon
                    as={info.icon}
                    w={6}
                    h={6}
                    color="blue.400"
                  />
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="bold">{info.title}</Text>
                    <Text color={textColor}>{info.content}</Text>
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Contact;
