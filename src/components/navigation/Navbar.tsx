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
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { scrollToSection } = useSmoothScroll();
  const navigate = useNavigate();

  const bgColor = useColorModeValue('blue.400', 'gray.800');
  const textColor = useColorModeValue('white', 'gray.600');
  const borderColor = useColorModeValue('blue.500', 'gray.700');
  const buttonHoverBg = useColorModeValue('blue.500', 'gray.700');
  const buttonTextColor = useColorModeValue('white', textColor);

  const handleNavClick = (href: string) => {
    if (href === '/') {
      navigate(href);
    } else if (href.startsWith('#')) {
      const sectionId = href.replace('#', '');
      scrollToSection(sectionId);
    } else {
      navigate(href);
    }
  };

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg={bgColor}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={borderColor}
    >
      <Container maxW="container.xl">
        <Flex
          minH={'60px'}
          py={{ base: 1 }}
          px={{ base: 4 }}
          align={'center'}
          justify={'space-between'}
        >
          <Flex flex={{ base: 1 }} justify={{ base: 'start', md: 'start' }}>
            <VStack spacing={1} align="center" cursor="pointer" onClick={() => navigate('/')}>
              <Image
                src={useColorModeValue('/image/logo.png', '/image/logo.png')}
                alt="Startup Logo"
                height="250px"
                width="250px"
                objectFit="cover"
                borderRadius="full"
                mt="-80px"
                mb="-80px"
                filter={useColorModeValue('brightness(1)', 'brightness(1.2)')}
                transition="all 0.2s"
              />
            </VStack>
          </Flex>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <FiX /> : <FiMenu />}
              variant="ghost"
              aria-label="Toggle Navigation"
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <Stack direction="row" spacing={4}>
                {NAV_ITEMS.map((navItem) => (
                  <Button
                    key={navItem.label}
                    variant="ghost"
                    onClick={() => handleNavClick(navItem.href)}
                    color={buttonTextColor}
                    _hover={{
                      bg: buttonHoverBg
                    }}
                  >
                    {navItem.label}
                  </Button>
                ))}
              </Stack>
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify="flex-end"
            direction="row"
            spacing={6}
          >
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
              onClick={toggleColorMode}
              variant="ghost"
            />
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize="sm"
              fontWeight={600}
              color="white"
              bg="blue.600"
              onClick={handleGetStarted}
              _hover={{
                bg: 'blue.400',
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <Stack
            p={4}
            display={{ md: 'none' }}
            spacing={4}
            bg={bgColor}
          >
            {NAV_ITEMS.map((navItem) => (
              <Button
                key={navItem.label}
                w="full"
                variant="ghost"
                onClick={() => handleNavClick(navItem.href)}
                color={buttonTextColor}
                _hover={{
                  bg: buttonHoverBg
                }}
              >
                {navItem.label}
              </Button>
            ))}
            <Button
              w="full"
              color="white"
              bg="blue.400"
              onClick={handleGetStarted}
              _hover={{
                bg: 'blue.300',
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Collapse>
      </Container>
    </Box>
  );
}
