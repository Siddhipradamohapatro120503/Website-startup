import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useColorModeValue,
  Icon,
  Flex,
  Badge,
  useToast,
  Select,
  InputGroup,
  InputLeftElement,
  SlideFade,
  Card,
  CardBody,
  Divider,
  FormErrorMessage,
} from '@chakra-ui/react';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaComments,
  FaMapMarkerAlt,
  FaClock,
  FaGlobe,
  FaHeadset,
} from 'react-icons/fa';
import Navbar from '../navigation/Navbar';

interface ContactInfo {
  icon: React.ElementType;
  title: string;
  content: string;
}

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const form = useRef<HTMLFormElement>(null);
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const iconColor = useColorModeValue('blue.500', 'blue.300');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const contactInfo: ContactInfo[] = [
    {
      icon: FaMapMarkerAlt,
      title: 'Our Location',
      content: 'Near ISBT Dehradun , Uttarakhand, 248001',
    },
    {
      icon: FaClock,
      title: 'Business Hours',
      content: 'Mon - Fri: 9:00 AM - 6:00 PM (PST)',
    },
    {
      icon: FaGlobe,
      title: 'Global Support',
      content: 'Available in multiple languages',
    },
  ];

  const validateEmail = async (email: string) => {
    try {
      const response = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_ABSTRACT_API_KEY}&email=${email}`
      );
      
      if (response.data.deliverability === "UNDELIVERABLE") {
        return false;
      }
      
      if (response.data.is_disposable_email.value) {
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Email validation error:', error);
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate email first
      const isValid = await validateEmail(formData.email);
      
      if (!isValid) {
        toast({
          title: 'Invalid Email',
          description: "Please enter a valid email address that is not disposable.",
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        setIsSubmitting(false);
        return;
      }

      // If email is valid, send the message
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        to_name: 'Shreetech Support',
        message: formData.message,
        subject: formData.subject,
        phone: formData.phone || 'Not provided',
        random_id: `INQ${Date.now().toString(36).toUpperCase()}`,
        submission_time: new Date().toLocaleString(),
        ip_address: 'Contact Form Submission',
        current_year: new Date().getFullYear()
      };

      const result = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID!,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      if (result.text === 'OK') {
        toast({
          title: 'Message Sent Successfully!',
          description: "We'll get back to you as soon as possible.",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Error',
        description: "Failed to send message. Please try again later.",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <Box bg={bgColor} minH="100vh" py={{ base: 6, md: 12 }}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <VStack spacing={{ base: 8, md: 12 }} align="stretch">
            <SlideFade in={true} offsetY={20}>
              <Box textAlign="center" mb={{ base: 6, md: 8 }}>
                <Heading as="h1" size={{ base: "xl", md: "2xl" }} mb={{ base: 3, md: 4 }}>
                  Contact Us
                </Heading>
                <Text color={textColor} fontSize={{ base: "lg", md: "xl" }} maxW="2xl" mx="auto" px={{ base: 4, md: 0 }}>
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </Text>
              </Box>
            </SlideFade>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 8 }} mb={{ base: 6, md: 8 }}>
              {contactInfo.map((info, index) => (
                <SlideFade
                  key={index}
                  in={true}
                  offsetY={40}
                  transition={{ enter: { duration: 0.3, delay: index * 0.1 } }}
                >
                  <Card
                    bg={cardBg}
                    borderWidth="1px"
                    borderColor={borderColor}
                    borderRadius="xl"
                    _hover={{
                      transform: 'translateY(-4px)',
                      shadow: 'lg',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <CardBody p={{ base: 4, md: 6 }}>
                      <Flex direction="column" align="center" textAlign="center">
                        <Icon as={info.icon} w={{ base: 6, md: 8 }} h={{ base: 6, md: 8 }} color={iconColor} mb={{ base: 3, md: 4 }} />
                        <Heading size={{ base: "sm", md: "md" }} mb={{ base: 1, md: 2 }}>
                          {info.title}
                        </Heading>
                        <Text color={textColor} fontSize={{ base: "sm", md: "md" }}>{info.content}</Text>
                      </Flex>
                    </CardBody>
                  </Card>
                </SlideFade>
              ))}
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, md: 8 }}>
              <SlideFade in={true} offsetY={40}>
                <Box
                  bg={cardBg}
                  p={{ base: 6, md: 8 }}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor={borderColor}
                  shadow="sm"
                >
                  <VStack as="form" ref={form} spacing={{ base: 4, md: 6 }} onSubmit={handleSubmit}>
                    <Heading size={{ base: "md", md: "lg" }} mb={{ base: 1, md: 2 }}>
                      Send us a Message
                    </Heading>
                    <Divider />
                    
                    <FormControl isRequired>
                      <FormLabel fontSize={{ base: "sm", md: "md" }}>Name</FormLabel>
                      <InputGroup size={{ base: "sm", md: "md" }}>
                        <InputLeftElement>
                          <Icon as={FaUser} color={iconColor} />
                        </InputLeftElement>
                        <Input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name" 
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel fontSize={{ base: "sm", md: "md" }}>Email</FormLabel>
                      <InputGroup size={{ base: "sm", md: "md" }}>
                        <InputLeftElement>
                          <Icon as={FaEnvelope} color={iconColor} />
                        </InputLeftElement>
                        <Input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize={{ base: "sm", md: "md" }}>Phone</FormLabel>
                      <InputGroup size={{ base: "sm", md: "md" }}>
                        <InputLeftElement>
                          <Icon as={FaPhone} color={iconColor} />
                        </InputLeftElement>
                        <Input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000" 
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel fontSize={{ base: "sm", md: "md" }}>Subject</FormLabel>
                      <Select 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Select a subject" 
                        size={{ base: "sm", md: "md" }}
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing Question</option>
                        <option value="partnership">Partnership Opportunity</option>
                      </Select>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel fontSize={{ base: "sm", md: "md" }}>Message</FormLabel>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your message here..."
                        size={{ base: "sm", md: "md" }}
                        rows={4}
                      />
                    </FormControl>

                    <Button
                      type="submit"
                      colorScheme="blue"
                      size={{ base: "md", md: "lg" }}
                      width="full"
                      isLoading={isSubmitting}
                      loadingText="Sending..."
                    >
                      Send Message
                    </Button>
                  </VStack>
                </Box>
              </SlideFade>

              <SlideFade in={true} offsetY={40} delay={0.2}>
                <Box
                  bg={cardBg}
                  p={{ base: 6, md: 8 }}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor={borderColor}
                  shadow="sm"
                  height="100%"
                >
                  <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                    <Heading size={{ base: "md", md: "lg" }} mb={{ base: 1, md: 2 }}>
                      Frequently Asked Questions
                    </Heading>
                    <Divider />
                    
                    {[
                      {
                        q: "What are your business hours?",
                        a: "We're open Monday through Friday, 9:00 AM to 6:00 PM (PST)."
                      },
                      {
                        q: "How quickly do you respond?",
                        a: "We typically respond within 24 hours on business days."
                      },
                      {
                        q: "Do you offer phone support?",
                        a: "Yes, phone support is available for premium customers."
                      }
                    ].map((faq, index) => (
                      <Box key={index}>
                        <Text fontWeight="bold" mb={2} fontSize={{ base: "sm", md: "md" }}>
                          {faq.q}
                        </Text>
                        <Text color={textColor} fontSize={{ base: "sm", md: "md" }}>
                          {faq.a}
                        </Text>
                        {index < 2 && <Divider my={{ base: 3, md: 4 }} />}
                      </Box>
                    ))}
                    
                    <Badge
                      colorScheme="blue"
                      p={{ base: 1.5, md: 2 }}
                      borderRadius="md"
                      textAlign="center"
                      fontSize={{ base: "xs", md: "sm" }}
                    >
                      24/7 Emergency Support Available for Enterprise Customers
                    </Badge>
                  </VStack>
                </Box>
              </SlideFade>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default ContactUs;
