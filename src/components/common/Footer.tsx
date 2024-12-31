import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  useColorModeValue,
  Input,
  IconButton,
  Button,
  VStack,
  HStack,
  Divider,
  Heading,
  Image,
  Link,
} from '@chakra-ui/react';
import { FiSend, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const logoFilter = useColorModeValue('none', 'brightness(0) invert(1)');

  const ListHeader = ({ children }: { children: React.ReactNode }) => {
    return (
      <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
        {children}
      </Text>
    );
  };

  return (
    <Box
      bg={bgColor}
      color={textColor}
      borderTop={1}
      borderStyle={'solid'}
      borderColor={borderColor}
    >
      <Container as={Stack} maxW={'7xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <VStack align="start" spacing={1}>
              <Heading
                color={useColorModeValue('gray.700', 'white')}
                fontSize={'2xl'}
                cursor="pointer"
                onClick={() => navigate('/')}
              >
                Shreetech
              </Heading>
              <Text
                fontSize="sm"
                color={textColor}
                fontStyle="italic"
                mt={1}
              >
                A unit of Shree PublicEase Services
              </Text>
            </VStack>
            <Text fontSize={'sm'}>
              {new Date().getFullYear()} Shreetech. All rights reserved
            </Text>
            <HStack spacing={6}>
              <IconButton
                as="a"
                href="https://www.facebook.com/shreetech"
                target="_blank"
                aria-label="Facebook"
                icon={<FiFacebook />}
                size="sm"
                color={textColor}
                variant="ghost"
                _hover={{
                  bg: 'blue.500',
                  color: 'white',
                }}
              />
              <IconButton
                as="a"
                href="https://x.com/technologi51361"
                target="_blank"
                aria-label="Twitter"
                icon={<FiTwitter />}
                size="sm"
                color={textColor}
                variant="ghost"
                _hover={{
                  bg: 'blue.400',
                  color: 'white',
                }}
              />
              <IconButton
                as="a"
                href="https://www.instagram.com/shreetech_org/"
                target="_blank"
                aria-label="Instagram"
                icon={<FiInstagram />}
                size="sm"
                color={textColor}
                variant="ghost"
                _hover={{
                  bg: 'pink.500',
                  color: 'white',
                }}
              />
              <IconButton
                as="a"
                href="https://www.linkedin.com/in/shree-technologies-b52b53343/"
                target="_blank"
                aria-label="LinkedIn"
                icon={<FiLinkedin />}
                size="sm"
                color={textColor}
                variant="ghost"
                _hover={{
                  bg: 'blue.600',
                  color: 'white',
                }}
              />
            </HStack>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <Link href="/about" _hover={{ color: 'blue.400' }}>
              About Us
            </Link>
            <Link href="/features" _hover={{ color: 'blue.400' }}>
              Features
            </Link>
            <Link href="/contact" _hover={{ color: 'blue.400' }}>
              Contact Us
            </Link>
            <Link href="#" _hover={{ color: 'blue.400' }}>
              Careers
            </Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link href="#" _hover={{ color: 'blue.400' }}>
              Help Center
            </Link>
            <Link href="#" _hover={{ color: 'blue.400' }}>
              Terms of Service
            </Link>
            <Link href="#" _hover={{ color: 'blue.400' }}>
              Privacy Policy
            </Link>
            <Link href="#" _hover={{ color: 'blue.400' }}>
              Status
            </Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction={'row'}>
              <Input
                placeholder={'Your email address'}
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                border={0}
                _focus={{
                  bg: 'whiteAlpha.300',
                }}
              />
              <IconButton
                bg={useColorModeValue('blue.400', 'blue.800')}
                color={useColorModeValue('white', 'gray.800')}
                _hover={{
                  bg: 'blue.600',
                }}
                aria-label="Subscribe"
                icon={<FiSend />}
              />
            </Stack>
            <Text fontSize={'sm'}>
              Subscribe to our newsletter for updates, news, and exclusive offers.
            </Text>
          </Stack>
        </SimpleGrid>
        <Divider pt={6} borderColor={borderColor} />
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          pt={6}
          fontSize="sm"
        >
          <Text>Made by the Shreetech Team</Text>
          <HStack spacing={4} mt={{ base: 4, md: 0 }}>
            <Text as="a" href="#" _hover={{ color: 'blue.400' }}>
              Terms
            </Text>
            <Text>·</Text>
            <Text as="a" href="#" _hover={{ color: 'blue.400' }}>
              Privacy
            </Text>
            <Text>·</Text>
            <Text as="a" href="#" _hover={{ color: 'blue.400' }}>
              Cookies
            </Text>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
