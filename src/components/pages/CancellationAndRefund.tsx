import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
  Icon,
  HStack,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { FaCheckCircle, FaExclamationTriangle, FaClock, FaBox, FaCreditCard } from 'react-icons/fa';

const CancellationAndRefund = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const iconColor = useColorModeValue('blue.500', 'blue.300');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const sections = [
    {
      icon: FaClock,
      title: "1. Order Cancellation",
      content: "Orders can be cancelled before they are shipped. Once an order has been shipped, it will need to go through our return process."
    },
    {
      icon: FaBox,
      title: "2. Return Policy",
      content: "We accept returns within 30 days of delivery. Items must be unused and in their original packaging with all tags attached."
    },
    {
      icon: FaCreditCard,
      title: "3. Refund Process",
      content: "Refunds will be processed within 5-7 business days after we receive and inspect the returned items. The refund will be issued to the original payment method."
    }
  ];

  const nonRefundableItems = [
    "Customized or personalized products",
    "Digital downloads and software licenses",
    "Gift cards and promotional items",
    "Items marked as 'Final Sale'"
  ];

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" mb={8}>
          <Heading as="h1" size="xl" mb={4}>
            Cancellation and Refund Policy
          </Heading>
          <Text color={textColor} fontSize="lg">
            We want to ensure your complete satisfaction with our services
          </Text>
        </Box>

        <Alert
          status="info"
          variant="left-accent"
          borderRadius="lg"
          mb={6}
        >
          <AlertIcon />
          <Box>
            <AlertTitle>Important Notice</AlertTitle>
            <AlertDescription>
              Refund requests must be initiated within 30 days of purchase
            </AlertDescription>
          </Box>
        </Alert>

        <Box
          bg={bgColor}
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <VStack spacing={6} align="stretch">
            {sections.map((section, index) => (
              <Box key={index}>
                <HStack spacing={4} mb={4}>
                  <Icon as={section.icon} w={6} h={6} color={iconColor} />
                  <Heading as="h2" size="md">
                    {section.title}
                  </Heading>
                </HStack>
                <Text ml={10} color={textColor}>
                  {section.content}
                </Text>
                {index < 2 && <Divider my={4} />}
              </Box>
            ))}
          </VStack>
        </Box>

        <Box
          bg={bgColor}
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Heading as="h2" size="md" mb={4}>
            Non-Refundable Items
          </Heading>
          <List spacing={3}>
            {nonRefundableItems.map((item, index) => (
              <ListItem key={index} display="flex" alignItems="center">
                <ListIcon as={FaExclamationTriangle} color="orange.500" />
                <Text>{item}</Text>
              </ListItem>
            ))}
          </List>
        </Box>

        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          borderRadius="lg"
          p={4}
        >
          <AlertIcon boxSize="6" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Need Help?
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Our customer service team is available 24/7 to assist you with returns and refunds.
          </AlertDescription>
        </Alert>

        <Box textAlign="center" pt={4}>
          <Text color={textColor} fontSize="sm">
            Last updated: January 1, 2025
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default CancellationAndRefund;
