import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Badge,
  Image,
  Switch,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiPlus,
  FiSlack,
  FiGithub,
  FiMail,
  FiMessageSquare,
  FiDatabase,
  FiCloud,
  FiLock,
  FiCheckCircle,
} from 'react-icons/fi';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
  status: 'connected' | 'disconnected';
  isPopular?: boolean;
}

const integrations: Integration[] = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Real-time messaging and notifications',
    icon: FiSlack,
    category: 'Communication',
    status: 'connected',
    isPopular: true,
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Code repository and version control',
    icon: FiGithub,
    category: 'Development',
    status: 'connected',
    isPopular: true,
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    description: 'Email service provider',
    icon: FiMail,
    category: 'Communication',
    status: 'disconnected',
  },
  {
    id: 'intercom',
    name: 'Intercom',
    description: 'Customer messaging platform',
    icon: FiMessageSquare,
    category: 'Support',
    status: 'disconnected',
    isPopular: true,
  },
  {
    id: 'mongodb',
    name: 'MongoDB Atlas',
    description: 'Database service',
    icon: FiDatabase,
    category: 'Infrastructure',
    status: 'connected',
  },
  {
    id: 'aws',
    name: 'AWS',
    description: 'Cloud infrastructure services',
    icon: FiCloud,
    category: 'Infrastructure',
    status: 'connected',
  },
];

const Integrations: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const [activeFilters, setActiveFilters] = React.useState<string[]>([
    'Communication',
    'Development',
  ]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [integrationsList, setIntegrationsList] = React.useState(integrations);
  const [isAddingNew, setIsAddingNew] = React.useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAddNewIntegration = () => {
    setIsAddingNew(true);
    // Simulate API call
    setTimeout(() => {
      setIsAddingNew(false);
      // Show success toast or modal
    }, 1000);
  };

  const handleToggleIntegration = async (integrationId: string) => {
    setIntegrationsList(prevList =>
      prevList.map(integration => {
        if (integration.id === integrationId) {
          return {
            ...integration,
            status: integration.status === 'connected' ? 'disconnected' : 'connected'
          };
        }
        return integration;
      })
    );
  };

  const handleRemoveFilter = (filterToRemove: string) => {
    setActiveFilters(prev => prev.filter(filter => filter !== filterToRemove));
  };

  const filteredIntegrations = integrationsList.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(integration.category);
    return matchesSearch && matchesFilter;
  });

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">
              Integrations
            </Text>
            <Text color="gray.500">
              Connect your favorite tools and services
            </Text>
          </VStack>
          <Button
            leftIcon={<Icon as={FiPlus} />}
            colorScheme="blue"
            onClick={handleAddNewIntegration}
            isLoading={isAddingNew}
            loadingText="Adding..."
          >
            Add New Integration
          </Button>
        </HStack>

        {/* Search and Filters */}
        <Box p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <VStack spacing={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </InputGroup>
            
            <HStack wrap="wrap" spacing={2}>
              {activeFilters.map((filter) => (
                <Tag
                  key={filter}
                  size="md"
                  borderRadius="full"
                  variant="solid"
                  colorScheme="blue"
                >
                  <TagLabel>{filter}</TagLabel>
                  <TagCloseButton
                    onClick={() => handleRemoveFilter(filter)}
                  />
                </Tag>
              ))}
            </HStack>
          </VStack>
        </Box>

        {/* Popular Integrations */}
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb={4}>
            Popular Integrations
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredIntegrations
              .filter((integration) => integration.isPopular)
              .map((integration) => (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                  onToggle={handleToggleIntegration}
                />
              ))}
          </SimpleGrid>
        </Box>

        <Divider />

        {/* All Integrations */}
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb={4}>
            All Integrations
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredIntegrations.map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onToggle={handleToggleIntegration}
              />
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

const IntegrationCard: React.FC<{
  integration: Integration;
  onToggle: (id: string) => void;
}> = ({ integration, onToggle }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const [isToggling, setIsToggling] = React.useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await onToggle(integration.id);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <HStack spacing={4}>
        <Box
          p={2}
          bg={useColorModeValue('gray.100', 'gray.700')}
          borderRadius="lg"
        >
          <Icon as={integration.icon} boxSize={6} />
        </Box>
        <VStack align="start" flex={1}>
          <HStack justify="space-between" width="100%">
            <Text fontWeight="semibold">{integration.name}</Text>
            <Switch
              isChecked={integration.status === 'connected'}
              onChange={handleToggle}
              isDisabled={isToggling}
              colorScheme="green"
            />
          </HStack>
          <Text fontSize="sm" color="gray.500">
            {integration.description}
          </Text>
          <HStack>
            <Badge colorScheme="purple">{integration.category}</Badge>
            {integration.status === 'connected' && (
              <Badge colorScheme="green">
                <HStack spacing={1}>
                  <Icon as={FiCheckCircle} />
                  <Text>Connected</Text>
                </HStack>
              </Badge>
            )}
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default Integrations;
