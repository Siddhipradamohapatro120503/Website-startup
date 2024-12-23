import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Image,
  Flex,
  Badge,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheck, FiDownload, FiCalendar, FiMessageSquare, FiCode, FiArrowLeft } from 'react-icons/fi';
import { serviceCategories } from '../data/services';
import { Service, ServiceCategory } from '../types/service';

const ServiceDetailPage: React.FC = () => {
  const { categoryId, serviceId } = useParams<{ categoryId: string; serviceId: string }>();
  const navigate = useNavigate();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const headingColor = useColorModeValue('gray.800', 'white');
  const pageBgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const techBg = useColorModeValue('gray.50', 'gray.700');
  
  const category = serviceCategories.find(
    (cat: ServiceCategory) => cat.title.toLowerCase().replace(/\s+/g, '-') === categoryId
  );
  
  const service = category?.services.find(
    (srv: Service) => srv.name.toLowerCase().replace(/\s+/g, '-') === serviceId
  );

  if (!category || !service) {
    return (
      <Container maxW="container.xl" py={20}>
        <VStack spacing={4} align="start">
          <Heading>Service Not Found</Heading>
          <Text>Sorry, we couldn't find the service you're looking for.</Text>
          <Button
            leftIcon={<FiArrowLeft />}
            colorScheme="blue"
            onClick={() => navigate('/services')}
          >
            Back to Services
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Box bg={pageBgColor} minH="100vh">
      {/* Hero Section */}
      <Box bg={bgColor} py={8} mb={8} borderBottom="1px" borderColor={borderColor}>
        <Container maxW="container.xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Breadcrumb mb={4}>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to={`/services/${categoryId}`}>{category.title}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <Text color="blue.500">{service.name}</Text>
              </BreadcrumbItem>
            </Breadcrumb>

            <Heading
              as="h1"
              size="2xl"
              mb={4}
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              {service.name}
            </Heading>
            <Text fontSize="xl" color={textColor} maxW="container.md">
              {service.description}
            </Text>
          </motion.div>
        </Container>
      </Box>

      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} mb={12}>
          {/* Main Content */}
          <Box>
            {/* Image Gallery */}
            {service.name === 'Content Creation' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Box bg={cardBg} p={8} borderRadius="xl" shadow="md" mb={8}>
                  <Heading size="lg" mb={6}>Our Content Creation Process</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <Box
                      borderRadius="lg"
                      overflow="hidden"
                      height="200px"
                      position="relative"
                      _hover={{ transform: 'scale(1.02)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/blog1.jpg"
                        alt="Content Strategy"
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="blackAlpha.600"
                        p={2}
                        color="white"
                      >
                        <Text fontSize="sm" fontWeight="bold">Content Strategy</Text>
                      </Box>
                    </Box>
                    <Box
                      borderRadius="lg"
                      overflow="hidden"
                      height="200px"
                      position="relative"
                      _hover={{ transform: 'scale(1.02)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/blog2.jpg"
                        alt="Content Creation"
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="blackAlpha.600"
                        p={2}
                        color="white"
                      >
                        <Text fontSize="sm" fontWeight="bold">Content Creation</Text>
                      </Box>
                    </Box>
                    <Box
                      borderRadius="lg"
                      overflow="hidden"
                      height="200px"
                      position="relative"
                      _hover={{ transform: 'scale(1.02)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/blog3.jpg"
                        alt="Content Distribution"
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="blackAlpha.600"
                        p={2}
                        color="white"
                      >
                        <Text fontSize="sm" fontWeight="bold">Content Distribution</Text>
                      </Box>
                    </Box>
                    <Box
                      borderRadius="lg"
                      overflow="hidden"
                      height="200px"
                      position="relative"
                      _hover={{ transform: 'scale(1.02)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/service5.jpg"
                        alt="Content Analytics"
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="blackAlpha.600"
                        p={2}
                        color="white"
                      >
                        <Text fontSize="sm" fontWeight="bold">Content Analytics</Text>
                      </Box>
                    </Box>
                  </SimpleGrid>
                </Box>
              </motion.div>
            )}
            {/* Development Gallery */}
            {service.name === 'Development' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Web & Mobile Development */}
                <Box bg={cardBg} p={8} borderRadius="xl" shadow="md" mb={8}>
                  <Heading size="lg" mb={6}>Web & Mobile Development</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <Box
                      borderRadius="lg"
                      overflow="hidden"
                      height="240px"
                      position="relative"
                      _hover={{ transform: 'scale(1.02)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/dev-web.jpg"
                        alt="Web Development"
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="blackAlpha.600"
                        p={2}
                        color="white"
                      >
                        <Text fontSize="sm" fontWeight="bold">Web Development</Text>
                      </Box>
                    </Box>
                    <Box
                      borderRadius="lg"
                      overflow="hidden"
                      height="240px"
                      position="relative"
                      _hover={{ transform: 'scale(1.02)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/dev-mobile.jpg"
                        alt="Mobile Development"
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="blackAlpha.600"
                        p={2}
                        color="white"
                      >
                        <Text fontSize="sm" fontWeight="bold">Mobile Development</Text>
                      </Box>
                    </Box>
                  </SimpleGrid>
                </Box>

                {/* Backend & Architecture */}
                <Box bg={cardBg} p={8} borderRadius="xl" shadow="md" mb={8}>
                  <Heading size="lg" mb={6}>Backend & Architecture</Heading>
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                    <Box
                      borderRadius="lg"
                      overflow="hidden"
                      height="200px"
                      position="relative"
                      _hover={{ transform: 'scale(1.02)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/dev-backend.jpg"
                        alt="Backend Development"
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="blackAlpha.600"
                        p={2}
                        color="white"
                      >
                        <Text fontSize="sm" fontWeight="bold">Backend Development</Text>
                      </Box>
                    </Box>
                    <Box
                      borderRadius="lg"
                      overflow="hidden"
                      height="200px"
                      position="relative"
                      _hover={{ transform: 'scale(1.02)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/dev-architecture.jpg"
                        alt="System Architecture"
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="blackAlpha.600"
                        p={2}
                        color="white"
                      >
                        <Text fontSize="sm" fontWeight="bold">System Architecture</Text>
                      </Box>
                    </Box>
                    <Box
                      borderRadius="lg"
                      overflow="hidden"
                      height="200px"
                      position="relative"
                      _hover={{ transform: 'scale(1.02)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/dev-database.jpg"
                        alt="Database Development"
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="blackAlpha.600"
                        p={2}
                        color="white"
                      >
                        <Text fontSize="sm" fontWeight="bold">Database Development</Text>
                      </Box>
                    </Box>
                  </SimpleGrid>
                </Box>

                {/* Technology Stack */}
                <Box bg={cardBg} p={8} borderRadius="xl" shadow="md" mb={8}>
                  <Heading size="lg" mb={6}>Technology Stack</Heading>
                  <SimpleGrid columns={{ base: 2, md: 6 }} spacing={4}>
                    <VStack
                      p={4}
                      bg={techBg}
                      borderRadius="lg"
                      _hover={{ transform: 'translateY(-4px)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/tech-react.png"
                        alt="React"
                        height="60px"
                        objectFit="contain"
                      />
                      <Text fontWeight="bold">React</Text>
                    </VStack>
                    <VStack
                      p={4}
                      bg={techBg}
                      borderRadius="lg"
                      _hover={{ transform: 'translateY(-4px)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/tech-node.png"
                        alt="Node.js"
                        height="60px"
                        objectFit="contain"
                      />
                      <Text fontWeight="bold">Node.js</Text>
                    </VStack>
                    <VStack
                      p={4}
                      bg={techBg}
                      borderRadius="lg"
                      _hover={{ transform: 'translateY(-4px)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/tech-python.png"
                        alt="Python"
                        height="60px"
                        objectFit="contain"
                      />
                      <Text fontWeight="bold">Python</Text>
                    </VStack>
                    <VStack
                      p={4}
                      bg={techBg}
                      borderRadius="lg"
                      _hover={{ transform: 'translateY(-4px)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/tech-aws.png"
                        alt="AWS"
                        height="60px"
                        objectFit="contain"
                      />
                      <Text fontWeight="bold">AWS</Text>
                    </VStack>
                    <VStack
                      p={4}
                      bg={techBg}
                      borderRadius="lg"
                      _hover={{ transform: 'translateY(-4px)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/tech-docker.png"
                        alt="Docker"
                        height="60px"
                        objectFit="contain"
                      />
                      <Text fontWeight="bold">Docker</Text>
                    </VStack>
                    <VStack
                      p={4}
                      bg={techBg}
                      borderRadius="lg"
                      _hover={{ transform: 'translateY(-4px)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/tech-kubernetes.png"
                        alt="Kubernetes"
                        height="60px"
                        objectFit="contain"
                      />
                      <Text fontWeight="bold">Kubernetes</Text>
                    </VStack>
                  </SimpleGrid>
                </Box>
              </motion.div>
            )}
            {/* AI & Machine Learning Gallery */}
            {service.name === 'AI & Machine Learning' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Core AI Technologies */}
                <Box bg={cardBg} p={8} borderRadius="xl" shadow="md" mb={8}>
                  <Heading size="lg" mb={6}>Core AI Technologies</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <Box
                      borderRadius="lg"
                      overflow="hidden"
                      height="240px"
                      position="relative"
                      _hover={{ transform: 'scale(1.02)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/ai-ml1.jpg"
                        alt="Machine Learning"
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="blackAlpha.600"
                        p={2}
                        color="white"
                      >
                        <Text fontSize="sm" fontWeight="bold">Machine Learning</Text>
                      </Box>
                    </Box>
                    <Box
                      borderRadius="lg"
                      overflow="hidden"
                      height="240px"
                      position="relative"
                      _hover={{ transform: 'scale(1.02)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/ai-ml2.jpg"
                        alt="Deep Learning"
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="blackAlpha.600"
                        p={2}
                        color="white"
                      >
                        <Text fontSize="sm" fontWeight="bold">Deep Learning</Text>
                      </Box>
                    </Box>
                  </SimpleGrid>
                </Box>

                {/* AI Applications */}
                <Box bg={cardBg} p={8} borderRadius="xl" shadow="md" mb={8}>
                  <Heading size="lg" mb={6}>AI Applications</Heading>
                  <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
                    <Box
                      borderRadius="lg"
                      overflow="hidden"
                      height="200px"
                      position="relative"
                      _hover={{ transform: 'scale(1.02)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/ai-robotics.jpg"
                        alt="AI Robotics"
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="blackAlpha.600"
                        p={2}
                        color="white"
                      >
                        <Text fontSize="sm" fontWeight="bold">AI Robotics</Text>
                      </Box>
                    </Box>
                    <Box
                      borderRadius="lg"
                      overflow="hidden"
                      height="200px"
                      position="relative"
                      _hover={{ transform: 'scale(1.02)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/ai-vision.jpg"
                        alt="Computer Vision"
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="blackAlpha.600"
                        p={2}
                        color="white"
                      >
                        <Text fontSize="sm" fontWeight="bold">Computer Vision</Text>
                      </Box>
                    </Box>
                    <Box
                      borderRadius="lg"
                      overflow="hidden"
                      height="200px"
                      position="relative"
                      _hover={{ transform: 'scale(1.02)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/ai-nlp.jpg"
                        alt="Natural Language Processing"
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="blackAlpha.600"
                        p={2}
                        color="white"
                      >
                        <Text fontSize="sm" fontWeight="bold">Natural Language Processing</Text>
                      </Box>
                    </Box>
                  </SimpleGrid>
                </Box>

                {/* AI Tools & Technologies */}
                <Box bg={cardBg} p={8} borderRadius="xl" shadow="md" mb={8}>
                  <Heading size="lg" mb={6}>AI Tools & Technologies</Heading>
                  <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                    <VStack
                      p={4}
                      bg={techBg}
                      borderRadius="lg"
                      _hover={{ transform: 'translateY(-4px)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/tech-ai1.png"
                        alt="TensorFlow"
                        height="60px"
                        objectFit="contain"
                      />
                      <Text fontWeight="bold">TensorFlow</Text>
                    </VStack>
                    <VStack
                      p={4}
                      bg={techBg}
                      borderRadius="lg"
                      _hover={{ transform: 'translateY(-4px)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/tech-ai2.png"
                        alt="PyTorch"
                        height="60px"
                        objectFit="contain"
                      />
                      <Text fontWeight="bold">PyTorch</Text>
                    </VStack>
                    <VStack
                      p={4}
                      bg={techBg}
                      borderRadius="lg"
                      _hover={{ transform: 'translateY(-4px)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/tech-ai3.png"
                        alt="Scikit-learn"
                        height="60px"
                        objectFit="contain"
                      />
                      <Text fontWeight="bold">Scikit-learn</Text>
                    </VStack>
                    <VStack
                      p={4}
                      bg={techBg}
                      borderRadius="lg"
                      _hover={{ transform: 'translateY(-4px)' }}
                      transition="all 0.3s"
                    >
                      <Image
                        src="/image/tech-ai4.png"
                        alt="CUDA"
                        height="60px"
                        objectFit="contain"
                      />
                      <Text fontWeight="bold">CUDA</Text>
                    </VStack>
                  </SimpleGrid>
                </Box>
              </motion.div>
            )}
            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box bg={cardBg} p={8} borderRadius="xl" shadow="md" mb={8}>
                <Heading size="lg" mb={6}>Key Features</Heading>
                <List spacing={4}>
                  {service.features.map((feature, index) => (
                    <ListItem
                      key={index}
                      display="flex"
                      alignItems="center"
                      _hover={{ transform: 'translateX(4px)' }}
                      transition="all 0.2s"
                    >
                      <ListIcon as={FiCheck} color="green.500" boxSize={5} />
                      <Text color={textColor}>{feature}</Text>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </motion.div>

            {/* Technologies Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Box bg={cardBg} p={8} borderRadius="xl" shadow="md">
                <Heading size="lg" mb={6}>Technologies Used</Heading>
                <SimpleGrid columns={2} spacing={4}>
                  {service.technologies.map((tech, index) => (
                    <HStack
                      key={index}
                      bg={techBg}
                      p={3}
                      borderRadius="md"
                      _hover={{ transform: 'translateY(-2px)' }}
                      transition="all 0.2s"
                    >
                      <Icon as={FiCode} color="blue.500" />
                      <Text color={textColor}>{tech}</Text>
                    </HStack>
                  ))}
                </SimpleGrid>
              </Box>
            </motion.div>
          </Box>

          {/* Sidebar Content */}
          <VStack spacing={8}>
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ width: '100%' }}
            >
              <Box bg={cardBg} p={8} borderRadius="xl" shadow="md" width="100%">
                <Heading size="lg" mb={6}>Get Started</Heading>
                <VStack spacing={4} align="stretch">
                  <Button
                    leftIcon={<FiCalendar />}
                    colorScheme="blue"
                    size="lg"
                    onClick={() => {/* Add scheduling logic */}}
                  >
                    Schedule a Consultation
                  </Button>
                  {service.brochureUrl && (
                    <Button
                      leftIcon={<FiDownload />}
                      variant="outline"
                      colorScheme="blue"
                      size="lg"
                      onClick={() => window.open(service.brochureUrl, '_blank')}
                    >
                      Download Brochure
                    </Button>
                  )}
                  <Box mt={4}>
                    <Text fontWeight="bold" mb={2}>Contact Information:</Text>
                    {service.contactInfo ? (
                      <>
                        <Text color={textColor}>Email: {service.contactInfo.email}</Text>
                        <Text color={textColor}>Phone: {service.contactInfo.phone}</Text>
                      </>
                    ) : (
                      <Text color={textColor}>Contact information not available</Text>
                    )}
                  </Box>
                </VStack>
              </Box>
            </motion.div>

            {/* Use Cases */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ width: '100%' }}
            >
              <Box bg={cardBg} p={8} borderRadius="xl" shadow="md" width="100%">
                <Heading size="lg" mb={6}>Use Cases</Heading>
                <List spacing={4}>
                  {service.useCases.map((useCase, index) => (
                    <ListItem
                      key={index}
                      display="flex"
                      alignItems="center"
                      _hover={{ transform: 'translateX(4px)' }}
                      transition="all 0.2s"
                    >
                      <ListIcon as={FiMessageSquare} color="blue.500" boxSize={5} />
                      <Text color={textColor}>{useCase}</Text>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </motion.div>
          </VStack>
        </SimpleGrid>

        <Box textAlign="center" py={8}>
          <Button
            leftIcon={<FiArrowLeft />}
            colorScheme="blue"
            size="lg"
            onClick={() => navigate(`/services/${categoryId}`)}
          >
            Back to {category.title}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ServiceDetailPage;
