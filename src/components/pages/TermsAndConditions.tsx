import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
  Icon,
  List,
  ListItem,
  ListIcon,
  Alert,
  AlertIcon,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
} from '@chakra-ui/react';
import { FaCheck, FaExclamationTriangle, FaUserShield, FaFileContract, FaBalanceScale } from 'react-icons/fa';

const TermsAndConditions = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const iconColor = useColorModeValue('blue.500', 'blue.300');

  const highlights = [
    {
      icon: FaUserShield,
      title: 'User Protection',
      description: 'Your privacy and security are our top priorities',
    },
    {
      icon: FaFileContract,
      title: 'Clear Terms',
      description: 'Transparent and easy to understand policies',
    },
    {
      icon: FaBalanceScale,
      title: 'Fair Practices',
      description: 'Balanced rights and responsibilities',
    },
  ];

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: [
        'Agreement to follow all terms and conditions',
        'Must be at least 18 years old to use services',
        'Responsibility for account security',
        'Acceptance of privacy policy',
      ],
    },
    {
      title: '2. User Responsibilities',
      content: [
        'Provide accurate account information',
        'Maintain confidentiality of account',
        'Report unauthorized account use',
        'Comply with all applicable laws',
      ],
    },
    {
      title: '3. Service Usage',
      content: [
        'Services provided "as is"',
        'Right to modify or discontinue services',
        'Usage limitations and restrictions',
        'Account termination conditions',
      ],
    },
    {
      title: '4. Intellectual Property',
      content: [
        'Ownership of content and materials',
        'License for personal use only',
        'Trademark and copyright protection',
        'Content usage restrictions',
      ],
    },
    {
      title: '5. Privacy & Data',
      content: [
        'Collection of personal information',
        'Use of cookies and tracking',
        'Third-party data sharing',
        'Data protection measures',
      ],
    },
  ];

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" mb={8}>
          <Heading as="h1" size="xl" mb={4}>
            Terms and Conditions
          </Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
            Please read these terms carefully before using our services
          </Text>
        </Box>

        <Alert
          status="info"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          borderRadius="lg"
          p={6}
        >
          <AlertIcon boxSize="6" mr={0} />
          <Text mt={4} mb={1} fontSize="lg" fontWeight="bold">
            Last Updated: January 1, 2025
          </Text>
          <Text>
            These terms govern your use of our services and products
          </Text>
        </Alert>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
          {highlights.map((highlight, index) => (
            <Card key={index} bg={bgColor} borderWidth="1px" borderColor={borderColor}>
              <CardHeader>
                <Icon as={highlight.icon} w={8} h={8} color={iconColor} mb={2} />
                <Heading size="md">{highlight.title}</Heading>
              </CardHeader>
              <CardBody>
                <Text>{highlight.description}</Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        <Accordion allowMultiple>
          {sections.map((section, index) => (
            <AccordionItem
              key={index}
              border="1px"
              borderColor={borderColor}
              borderRadius="lg"
              mb={4}
            >
              <AccordionButton
                p={4}
                _hover={{ bg: bgColor }}
                borderRadius="lg"
              >
                <Box flex="1" textAlign="left">
                  <Heading as="h3" size="md">
                    {section.title}
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <List spacing={3}>
                  {section.content.map((item, idx) => (
                    <ListItem key={idx} display="flex" alignItems="center">
                      <ListIcon as={FaCheck} color="green.500" />
                      <Text>{item}</Text>
                    </ListItem>
                  ))}
                </List>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>

        <Alert
          status="warning"
          variant="left-accent"
          borderRadius="lg"
        >
          <AlertIcon as={FaExclamationTriangle} />
          <Box>
            <Text fontWeight="bold">Important Notice</Text>
            <Text>
              By continuing to use our services, you acknowledge that you have read and understood these terms.
            </Text>
          </Box>
        </Alert>
      </VStack>
    </Container>
  );
};

export default TermsAndConditions;
