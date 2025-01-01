import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  VStack,
  useToast,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

const DemoBooking: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    category: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        to_name: 'Shreetech Support',
        preferred_date: formData.date,
        preferred_time: formData.time,
        service_category: formData.category,
        description: formData.description,
        demo_id: `DEMO${Date.now().toString(36).toUpperCase()}`,
        submission_time: new Date().toLocaleString()
      };

      const result = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID!,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      if (result.text === 'OK') {
        toast({
          title: 'Demo Request Submitted!',
          description: "We'll contact you soon to confirm the demo timing.",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        setFormData({
          name: '',
          email: '',
          date: '',
          time: '',
          category: '',
          description: ''
        });
      }
    } catch (error) {
      console.error('Demo booking error:', error);
      toast({
        title: 'Error',
        description: "Failed to submit demo request. Please try again.",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get available time slots
  const getTimeSlots = () => {
    const slots = [];
    for (let i = 9; i <= 17; i++) {
      slots.push(`${i}:00`);
      if (i !== 17) slots.push(`${i}:30`);
    }
    return slots;
  };

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <Container maxW="container.md" py={20}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          bg={bgColor}
          p={8}
          borderRadius="xl"
          boxShadow="xl"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Heading as="h1" size="xl" mb={2}>Schedule a Demo</Heading>
          <Text color={textColor} mb={8}>Fill out the form below and we'll get back to you shortly.</Text>

          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Preferred Date</FormLabel>
                <Input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={getMinDate()}
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Preferred Time</FormLabel>
                <Select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  placeholder="Select time"
                  size="lg"
                >
                  {getTimeSlots().map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Service Category</FormLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Select category"
                  size="lg"
                >
                  <option value="AI ML Solutions">AI & ML Solutions</option>
                  <option value="Content Creation">Content Creation</option>
                  <option value="Social Media Marketing">Social Media Marketing</option>
                  <option value="Technical Solutions">Technical Solutions</option>
                  <option value="Web Development">Web Development</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us about your requirements..."
                  size="lg"
                  rows={4}
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                width="full"
                isLoading={isSubmitting}
                loadingText="Submitting..."
              >
                Schedule Demo
              </Button>
            </VStack>
          </form>
        </Box>
      </motion.div>
    </Container>
  );
};

export default DemoBooking;
