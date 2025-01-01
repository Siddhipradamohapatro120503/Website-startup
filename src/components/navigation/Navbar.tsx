import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Container,
  Text,
  Image,
  VStack,
  HStack,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useSmoothScroll } from '../../contexts/SmoothScrollContext';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Features',
    href: '/features',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export default function Navbar() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { scrollToSection } = useSmoothScroll();
  const navigate = useNavigate();

  const bgGradient = useColorModeValue(
    'linear(to-r, blue.900, purple.500)',
    'none'
  );
  const bgSolid = useColorModeValue('purple.500', 'gray.800');
  const textColor = useColorModeValue('white', 'gray.200');
  const borderColor = useColorModeValue('purple.500', 'gray.700');
  const isMobile = useBreakpointValue({ base: true, md: false });
  const hoverBgColor = useColorModeValue('whiteAlpha.200', 'transparent');
  const hoverTextColor = useColorModeValue('white', 'blue.500');
  const buttonBg = useColorModeValue('white', 'blue.500');
  const buttonColor = useColorModeValue('purple.600', 'white');
  const buttonHoverBg = useColorModeValue('gray.100', 'blue.600');
  const iconButtonHoverBg = useColorModeValue('whiteAlpha.200', 'gray.700');

  const handleNavigation = (href: string) => {
    if (href === '/') {
      navigate(href);
      window.scrollTo(0, 0);
    } else {
      navigate(href);
    }
    onClose();
  };

  const handleGetStarted = () => {
    navigate('/login');
  };

  const DesktopNav = () => {
    return (
      <HStack spacing={8} align="center" display={{ base: 'none', md: 'flex' }}>
        {NAV_ITEMS.map((navItem) => (
          <Button
            key={navItem.label}
            variant="ghost"
            color={textColor}
            _hover={{
              textDecoration: 'none',
              color: hoverTextColor,
              bg: hoverBgColor,
            }}
            onClick={() => handleNavigation(navItem.href)}
          >
            {navItem.label}
          </Button>
        ))}
      </HStack>
    );
  };

  const MobileNav = () => {
    return (
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch" pt={4}>
              {NAV_ITEMS.map((navItem) => (
                <Button
                  key={navItem.label}
                  variant="ghost"
                  w="full"
                  justifyContent="flex-start"
                  onClick={() => handleNavigation(navItem.href)}
                >
                  {navItem.label}
                </Button>
              ))}
              <Button
                w="full"
                colorScheme="blue"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <Box
      position="sticky"
      top={0}
      zIndex="sticky"
      bgGradient={bgGradient}
      bg={bgSolid}
      borderBottom={1}
      borderStyle="solid"
      borderColor={borderColor}
      transition="all 0.3s ease"
      backdropFilter="blur(10px)"
      boxShadow="lg"
      color={textColor}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgGradient: useColorModeValue(
          'linear(to-r, blue.900, transparent)',
          'none'
        ),
        opacity: 0.4,
        pointerEvents: 'none',
      }}
    >
      <Container maxW="container.xl" position="relative">
        <Flex
          minH="60px"
          py={{ base: 2 }}
          px={{ base: 4 }}
          align="center"
          justify="space-between"
        >
          <Flex flex={{ base: 1 }} justify={{ base: 'start', md: 'start' }}>
            <Box
              as="button"
              onClick={() => handleNavigation('/')}
              display="flex"
              alignItems="center"
              position="relative"
              py={2}
              ml={{ base: "-65px", md: "0" }}
            >
              <Image
                src="/image/logo.png"
                alt="Logo"
                h={{ base: "200px", md: "160px", lg: "250px" }}
                objectFit="contain"
                mr={2}
                mt={{ base: "-75px", md: "-45px", lg: "-100px" }}
                mb={{ base: "-75px", md: "-45px", lg: "-100px" }}
                transition="all 0.3s ease"
                _hover={{ transform: 'scale(1.05)' }}
                filter={useColorModeValue('none', 'brightness(1.2)')}
                loading="eager"
              />
            </Box>
          </Flex>

          <DesktopNav />

          <Stack
            flex={{ base: 1, md: 0 }}
            justify="flex-end"
            direction="row"
            spacing={6}
            align="center"
            mr={{ base: 0, md: 4 }}
          >
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
              color={textColor}
              _hover={{
                bg: iconButtonHoverBg,
              }}
            />
            
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize="sm"
              fontWeight={600}
              color={buttonColor}
              bg={buttonBg}
              _hover={{
                bg: buttonHoverBg,
              }}
              onClick={handleGetStarted}
              size="md"
              px={6}
              mr={2}
            >
              Get Started
            </Button>
            
            {isMobile && (
              <IconButton
                aria-label="Open menu"
                icon={<FiMenu />}
                onClick={onToggle}
                variant="ghost"
                size="sm"
                display={{ base: 'flex', md: 'none' }}
              />
            )}
          </Stack>
        </Flex>
      </Container>
      
      <MobileNav />
    </Box>
  );
}
