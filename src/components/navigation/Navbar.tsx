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
    href: '#home',
  },
  {
    label: 'Features',
    href: '#features',
  },
  {
    label: 'About',
    href: '#about',
  },
  {
    label: 'Contact',
    href: '#contact',
  },
];

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { scrollToSection } = useSmoothScroll();
  const navigate = useNavigate();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '');
    scrollToSection(sectionId);
  };

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <Box
      position="fixed"
      top="0"
      w="100%"
      zIndex="1000"
      bg={bgColor}
      borderBottom={1}
      borderStyle="solid"
      borderColor={borderColor}
    >
      <Container maxW="7xl">
        <Flex
          minH="60px"
          py={{ base: 2 }}
          px={{ base: 4 }}
          align="center"
        >
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
            <Text
              textAlign={{ base: 'center', md: 'left' }}
              fontFamily="heading"
              color={textColor}
              fontWeight="bold"
              fontSize="xl"
            >
              Startup
            </Text>

            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <Stack direction="row" spacing={4}>
                {NAV_ITEMS.map((navItem) => (
                  <Button
                    key={navItem.label}
                    variant="ghost"
                    onClick={() => handleNavClick(navItem.href)}
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
              bg="blue.400"
              onClick={handleGetStarted}
              _hover={{
                bg: 'blue.300',
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
