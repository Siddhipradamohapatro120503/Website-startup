import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  SimpleGrid,
  Icon,
  SlideFade,
  Flex,
  Badge,
  Tooltip,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import {
  FaShieldAlt,
  FaUserLock,
  FaDatabase,
  FaExchangeAlt,
  FaCookie,
  FaInfoCircle,
  FaCheckCircle,
} from 'react-icons/fa';

interface PrivacyCardProps {
  title: string;
  icon: React.ElementType;
  description: string;
  details: string[];
}

const PrivacyCard: React.FC<PrivacyCardProps> = ({ title, icon, description, details }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <>
      <Box
        p={6}
        bg={cardBg}
        borderRadius="xl"
        borderWidth="1px"
        borderColor={borderColor}
        transition="all 0.3s"
        cursor="pointer"
        onClick={onOpen}
        _hover={{
          transform: 'translateY(-4px)',
          shadow: 'lg',
          bg: hoverBg,
        }}
        position="relative"
        overflow="hidden"
      >
        <Flex direction="column" align="center" textAlign="center">
          <Icon as={icon} w={8} h={8} color="blue.500" mb={4} />
          <Heading size="md" mb={2}>
            {title}
          </Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            {description}
          </Text>
          <Badge
            colorScheme="blue"
            variant="subtle"
            mt={4}
            px={2}
            borderRadius="full"
          >
            Click to learn more
          </Badge>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent>
          <ModalHeader>
            <Flex align="center" gap={2}>
              <Icon as={icon} color="blue.500" />
              {title}
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text mb={4}>{description}</Text>
            <List spacing={3}>
              {details.map((detail, index) => (
                <ListItem key={index} display="flex" alignItems="center">
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  <Text>{detail}</Text>
                </ListItem>
              ))}
            </List>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const PrivacyPolicy = () => {
  const bgGradient = useColorModeValue(
    'linear(to-b, blue.50, gray.50)',
    'linear(to-b, gray.900, gray.800)'
  );
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const sections = [
    {
      title: 'Data Collection',
      icon: FaDatabase,
      description: 'Information we collect to provide our services',
      details: [
        'Basic contact information (name, email, phone)',
        'Service preferences and requirements',
        'Payment information (processed securely via payment gateway)',
        'Communication history and service feedback',
        'Technical data for service improvement',
      ],
    },
    {
      title: 'Data Usage',
      icon: FaExchangeAlt,
      description: 'How we use your information',
      details: [
        'To deliver and improve our services',
        'For communication about your service status',
        'To process payments securely',
        'For customer support and feedback',
        'To maintain service quality',
      ],
    },
    {
      title: 'Data Security',
      icon: FaShieldAlt,
      description: 'How we protect your information',
      details: [
        'Industry-standard encryption for all data',
        'Secure payment processing through our payment gateway',
        'Regular security audits and updates',
        'Strict access controls for staff',
        'Compliance with data protection regulations',
      ],
    },
    {
      title: 'Your Rights',
      icon: FaUserLock,
      description: 'Control over your data',
      details: [
        'Access your personal information',
        'Request data correction or deletion',
        'Opt-out of marketing communications',
        'Data portability options',
        'Contact support@shreetech.org for data requests',
      ],
    }
  ];

  return (
    <Box bgGradient={bgGradient} minH="100vh" py={12}>
      <Container maxW="container.xl">
        <VStack spacing={12} align="stretch">
          <Box textAlign="center" mb={8}>
            <SlideFade in={true} offsetY={20}>
              <Heading as="h1" size="2xl" mb={4}>
                Privacy Policy
              </Heading>
              <Text color={textColor} fontSize="xl" maxW="2xl" mx="auto">
                We value your privacy and are committed to protecting your personal information.
                Learn how we collect, use, and safeguard your data.
              </Text>
            </SlideFade>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {sections.map((section, index) => (
              <SlideFade
                key={index}
                in={true}
                offsetY={40}
                transition={{ enter: { duration: 0.3, delay: index * 0.1 } }}
              >
                <PrivacyCard {...section} />
              </SlideFade>
            ))}
          </SimpleGrid>

          <Box
            mt={12}
            p={6}
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={useColorModeValue('gray.200', 'gray.600')}
            textAlign="center"
          >
            <Text color={textColor} fontSize="sm">
              Last updated: January 1, 2025
            </Text>
            <Tooltip label="Contact our privacy team" placement="top">
              <Button
                variant="ghost"
                colorScheme="blue"
                size="sm"
                mt={2}
                leftIcon={<Icon as={FaInfoCircle} />}
              >
                Privacy Questions?
              </Button>
            </Tooltip>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
