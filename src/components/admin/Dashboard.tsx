import React from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Icon,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerContent,
  BoxProps,
} from '@chakra-ui/react';
import {
  FiMenu,
  FiHome,
  FiUsers,
  FiSettings,
  FiBriefcase,
  FiBarChart2,
  FiUser,
  FiBox,
  FiPieChart,
  FiGrid,
} from 'react-icons/fi';
import { Link, Outlet, useLocation } from 'react-router-dom';

interface NavItemProps extends BoxProps {
  icon: any;
  children: string;
  path: string;
}

const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === path || 
    (path !== '/admin' && location.pathname.startsWith(path));
  const activeBg = useColorModeValue('gray.100', 'gray.700');
  const inactiveBg = useColorModeValue('transparent', 'transparent');

  return (
    <Link to={path}>
      <Box
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={isActive ? activeBg : inactiveBg}
          color={isActive ? 'blue.500' : undefined}
          _hover={{
            bg: activeBg,
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </Link>
  );
};

const SidebarContent = ({ ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          Admin
        </Text>
      </Flex>
      <VStack spacing={0} align="stretch">
        <NavItem icon={FiHome} path="/admin">
          Dashboard
        </NavItem>
        <NavItem icon={FiBarChart2} path="/admin/analytics">
          Analytics
        </NavItem>
        <NavItem icon={FiUsers} path="/admin/users">
          Users
        </NavItem>
        <NavItem icon={FiBox} path="/admin/services">
          Services
        </NavItem>
        <NavItem icon={FiGrid} path="/admin/registered-services">
          Registered Services
        </NavItem>
        <NavItem icon={FiBriefcase} path="/admin/freelancers">
          Freelancers
        </NavItem>
        <NavItem icon={FiPieChart} path="/admin/reports">
          Reports
        </NavItem>
        <NavItem icon={FiGrid} path="/admin/integrations">
          Integrations
        </NavItem>
        <NavItem icon={FiSettings} path="/admin/settings">
          Settings
        </NavItem>
      </VStack>
    </Box>
  );
};

const Dashboard: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      
      {/* Mobile nav */}
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Mobile header */}
        <Flex
          ml={{ base: 0, md: 60 }}
          px={{ base: 4, md: 4 }}
          height="20"
          alignItems="center"
          bg={useColorModeValue('white', 'gray.900')}
          borderBottomWidth="1px"
          borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
          justifyContent={{ base: 'space-between', md: 'flex-end' }}
          position="fixed"
          top="0"
          right="0"
          left="0"
          zIndex="1"
        >
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            variant="outline"
            aria-label="open menu"
            icon={<FiMenu />}
          />

          <Text
            display={{ base: 'flex', md: 'none' }}
            fontSize="2xl"
            fontWeight="bold"
          >
            Admin
          </Text>
        </Flex>

        {/* Main content */}
        <Box mt="20" p="4">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
