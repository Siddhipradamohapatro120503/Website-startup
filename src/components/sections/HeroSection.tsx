import React from 'react';
import { Box, Container, Flex, Heading, Text, Stack, Button, Icon, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import HeroCarousel from '../carousel/HeroCarousel';
import { carouselItems } from '../../data/heroCarousel';
import BrandsMarquee from './BrandsMarquee';
import PathwaySection from './PathwaySection';
import StatsSection from './StatsSection';
import CaseStudiesSection from './CaseStudiesSection';
import TrustIndicatorsSection from './TrustIndicatorsSection';

const HeroSection: React.FC<{ onExploreClick: () => void }> = ({ onExploreClick }) => {
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <>
      <Box id="hero" bgGradient={useColorModeValue(
        'linear(to-br, blue.50, purple.50)',
        'linear(to-br, gray.900, purple.900)'
      )}>
        <Container maxW="container.xl">
          <Flex
            align="center"
            justify="space-between"
            wrap="wrap"
            minH="100vh"
            pt={{ base: 20, md: 28 }}
            pb={20}
            gap={8}
          >
            <Box flex={1} pr={{ base: 0, md: 20 }} mb={{ base: 10, md: 0 }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="float-animation"
              >
                <Heading
                  as="h1"
                  fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                  mb={6}
                  fontWeight="bold"
                  lineHeight="shorter"
                >
                  Transform Your{' '}
                  <Text
                    as="span"
                    bgGradient="linear(to-r, blue.400, purple.500)"
                    bgClip="text"
                  >
                    Digital Presence
                  </Text>
                </Heading>
                <Text fontSize={{ base: 'lg', md: 'xl' }} mb={8} color={textColor}>
                  Elevate your business with our comprehensive digital solutions
                </Text>
                <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
                  <Button
                    size="lg"
                    colorScheme="blue"
                    px={8}
                    onClick={onExploreClick}
                    rightIcon={<Icon as={FiArrowRight} />}
                  >
                    Explore Services
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    px={8}
                    rightIcon={<Icon as={FiDownload} />}
                  >
                    Download Brochure
                  </Button>
                </Stack>
              </motion.div>
            </Box>

            <Box flex={1} w={{ base: "100%", md: "50%" }}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <HeroCarousel items={carouselItems} />
              </motion.div>
            </Box>
          </Flex>
        </Container>
      </Box>
      <BrandsMarquee />
      <StatsSection />
      <TrustIndicatorsSection />
      <CaseStudiesSection />
      <PathwaySection />
    </>
  );
};

export default HeroSection;
