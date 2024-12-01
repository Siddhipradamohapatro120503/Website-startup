import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Switch,
  Select,
  FormControl,
  FormLabel,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorMode,
  useColorModeValue,
  Divider,
  Icon,
  Grid,
  Badge,
} from '@chakra-ui/react';
import {
  FiMoon,
  FiSun,
  FiGlobe,
  FiEye,
  FiLock,
  FiSliders,
  FiBell,
  FiMonitor,
} from 'react-icons/fi';

const Settings: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Settings
      </Text>

      <Tabs>
        <TabList>
          <Tab>Display</Tab>
          <Tab>Accessibility</Tab>
          <Tab>Notifications</Tab>
          <Tab>Security</Tab>
        </TabList>

        <TabPanels>
          {/* Display Settings */}
          <TabPanel>
            <VStack spacing={6} align="stretch">
              <Box p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                <Text fontSize="lg" fontWeight="semibold" mb={4}>
                  Theme Settings
                </Text>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">
                      <HStack>
                        <Icon as={colorMode === 'light' ? FiSun : FiMoon} />
                        <Text>Dark Mode</Text>
                      </HStack>
                    </FormLabel>
                    <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>
                      <HStack>
                        <Icon as={FiMonitor} />
                        <Text>Layout Density</Text>
                      </HStack>
                    </FormLabel>
                    <Select defaultValue="comfortable">
                      <option value="compact">Compact</option>
                      <option value="comfortable">Comfortable</option>
                      <option value="spacious">Spacious</option>
                    </Select>
                  </FormControl>
                </Grid>
              </Box>

              <Box p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                <Text fontSize="lg" fontWeight="semibold" mb={4}>
                  Language & Region
                </Text>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <FormControl>
                    <FormLabel>
                      <HStack>
                        <Icon as={FiGlobe} />
                        <Text>Language</Text>
                      </HStack>
                    </FormLabel>
                    <Select defaultValue="en">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Time Zone</FormLabel>
                    <Select defaultValue="utc">
                      <option value="utc">UTC</option>
                      <option value="est">Eastern Time</option>
                      <option value="pst">Pacific Time</option>
                      <option value="gmt">GMT</option>
                    </Select>
                  </FormControl>
                </Grid>
              </Box>
            </VStack>
          </TabPanel>

          {/* Accessibility Settings */}
          <TabPanel>
            <Box p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Accessibility Options
              </Text>
              <VStack spacing={4} align="stretch">
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <FormLabel mb="0">
                    <HStack>
                      <Icon as={FiEye} />
                      <Text>High Contrast Mode</Text>
                    </HStack>
                  </FormLabel>
                  <Switch />
                </FormControl>
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <FormLabel mb="0">Reduced Motion</FormLabel>
                  <Switch />
                </FormControl>
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <FormLabel mb="0">Screen Reader Optimization</FormLabel>
                  <Switch defaultChecked />
                </FormControl>
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <FormLabel mb="0">Keyboard Navigation</FormLabel>
                  <Switch defaultChecked />
                </FormControl>
              </VStack>
            </Box>
          </TabPanel>

          {/* Notification Settings */}
          <TabPanel>
            <Box p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Notification Preferences
              </Text>
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>
                    <HStack>
                      <Icon as={FiBell} />
                      <Text>Email Notifications</Text>
                    </HStack>
                  </FormLabel>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <Box p={4} borderWidth="1px" borderRadius="md">
                      <HStack justify="space-between" mb={2}>
                        <Text>Security Alerts</Text>
                        <Switch defaultChecked />
                      </HStack>
                      <Text fontSize="sm" color="gray.500">
                        Get notified about security-related events
                      </Text>
                    </Box>
                    <Box p={4} borderWidth="1px" borderRadius="md">
                      <HStack justify="space-between" mb={2}>
                        <Text>System Updates</Text>
                        <Switch defaultChecked />
                      </HStack>
                      <Text fontSize="sm" color="gray.500">
                        Receive system update notifications
                      </Text>
                    </Box>
                    <Box p={4} borderWidth="1px" borderRadius="md">
                      <HStack justify="space-between" mb={2}>
                        <Text>User Activity</Text>
                        <Switch />
                      </HStack>
                      <Text fontSize="sm" color="gray.500">
                        Get updates about user activities
                      </Text>
                    </Box>
                    <Box p={4} borderWidth="1px" borderRadius="md">
                      <HStack justify="space-between" mb={2}>
                        <Text>Marketing</Text>
                        <Switch />
                      </HStack>
                      <Text fontSize="sm" color="gray.500">
                        Receive marketing and promotional emails
                      </Text>
                    </Box>
                  </Grid>
                </FormControl>
              </VStack>
            </Box>
          </TabPanel>

          {/* Security Settings */}
          <TabPanel>
            <Box p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Security Settings
              </Text>
              <VStack spacing={6} align="stretch">
                <Box>
                  <HStack justify="space-between" mb={4}>
                    <VStack align="start" spacing={1}>
                      <HStack>
                        <Icon as={FiLock} />
                        <Text fontWeight="medium">Two-Factor Authentication</Text>
                      </HStack>
                      <Text fontSize="sm" color="gray.500">
                        Add an extra layer of security to your account
                      </Text>
                    </VStack>
                    <Badge colorScheme="green">Enabled</Badge>
                  </HStack>
                  <Button size="sm" colorScheme="blue">
                    Configure 2FA
                  </Button>
                </Box>

                <Divider />

                <Box>
                  <HStack justify="space-between" mb={4}>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="medium">Session Management</Text>
                      <Text fontSize="sm" color="gray.500">
                        Manage your active sessions and devices
                      </Text>
                    </VStack>
                    <Badge>3 Active Sessions</Badge>
                  </HStack>
                  <Button size="sm" colorScheme="blue">
                    View Active Sessions
                  </Button>
                </Box>

                <Divider />

                <Box>
                  <VStack align="start" spacing={1} mb={4}>
                    <Text fontWeight="medium">Security Log</Text>
                    <Text fontSize="sm" color="gray.500">
                      Review your account's security events
                    </Text>
                  </VStack>
                  <Button size="sm" colorScheme="blue">
                    View Security Log
                  </Button>
                </Box>
              </VStack>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Settings;
