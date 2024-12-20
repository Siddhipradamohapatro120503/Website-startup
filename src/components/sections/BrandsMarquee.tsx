import React from 'react';
import { Box, Flex, Text, Image, Container, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { trustedBrands } from '../../data/brands';

const BrandsMarquee: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const imageFilter = useColorModeValue('none', 'brightness(0) invert(1)');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box py={4} bg={bgColor} borderBottom="1px" borderColor={borderColor}>
      <Container maxW="container.xl" overflow="hidden">
        <Flex align="center" mb={4}>
          <Text
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight="bold"
            color={textColor}
          >
            Trusted by
          </Text>
          <Text
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight="bold"
            ml={2}
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            1100+ global brands
          </Text>
        </Flex>

        <Box position="relative" overflow="hidden">
          <Flex
            as={motion.div}
            animate={{
              x: [0, -1920],
              transition: {
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              },
            }}
            gap={12}
            align="center"
          >
            {/* First set of brands */}
            {trustedBrands.map((brand) => (
              <Box
                key={brand.id}
                minW={{ base: "120px", md: "150px" }}
                opacity={0.9}
                _hover={{ opacity: 1 }}
                transition="opacity 0.2s"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  maxH="40px"
                  objectFit="contain"
                  filter={imageFilter}
                />
              </Box>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {trustedBrands.map((brand) => (
              <Box
                key={`${brand.id}-duplicate`}
                minW={{ base: "120px", md: "150px" }}
                opacity={0.9}
                _hover={{ opacity: 1 }}
                transition="opacity 0.2s"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  maxH="40px"
                  objectFit="contain"
                  filter={imageFilter}
                />
              </Box>
            ))}
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default BrandsMarquee;
