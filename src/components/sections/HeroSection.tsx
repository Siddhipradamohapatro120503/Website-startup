import React from 'react';
import { Box, Container, Flex, Heading, Text, Stack, Button, Icon, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import HeroCarousel from './HeroCarousel';
import BrandsMarquee from './BrandsMarquee';
import StatsSection from './StatsSection';
import CaseStudiesSection from './CaseStudiesSection';
import TrustIndicatorsSection from './TrustIndicatorsSection';
import WorkflowSection from './WorkflowSection';

interface HeroSectionProps {
  onExploreClick: () => void;
  images: string[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, images }) => {
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const overlayBg = useColorModeValue(
    'linear-gradient(to right, white 0%, whiteAlpha.800 50%, whiteAlpha.500 75%, transparent 100%)',
    'linear-gradient(to right, gray.900 0%, blackAlpha.800 50%, blackAlpha.500 75%, transparent 100%)'
  );

  return (
    <>
      <Box id="hero" position="relative" height="90vh" overflow="hidden">
        {/* Carousel Background */}
        <HeroCarousel images={images} autoPlayInterval={6000} />

        {/* Content Overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient={overlayBg}
          zIndex={1}
        >
          <Container maxW="container.xl" height="100%">
            <Flex
              direction="column"
              justify="center"
              height="100%"
              maxW={{ base: "100%", md: "60%" }}
              position="relative"
              zIndex={2}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Stack spacing={6}>
                  <Heading
                    as="h1"
                    size="2xl"
                    fontWeight="bold"
                    lineHeight="shorter"
                  >
                    <Text
                      as="span"
                      bgGradient="linear(to-r, blue.400, purple.500, pink.400)"
                      bgClip="text"
                      fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                    >
                      Transform Your Business
                    </Text>{" "}
                    <Text
                      as="span"
                      bgGradient="linear(to-l, cyan.400, blue.500, purple.600)"
                      bgClip="text"
                      fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                    >
                      with Our Tech Solutions
                    </Text>
                  </Heading>
                  <Text fontSize="xl" color={textColor}>
                    Unlock the power of innovation with our cutting-edge technology services. 
                    We help businesses scale, innovate, and thrive in the digital age.
                  </Text>
                  <Stack direction="row" spacing={4}>
                    <Button
                      size="lg"
                      colorScheme="blue"
                      rightIcon={<Icon as={FiArrowRight} />}
                      onClick={onExploreClick}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                      }}
                    >
                      Explore Services
                    </Button>
                  </Stack>
                </Stack>
              </motion.div>
            </Flex>
          </Container>
        </Box>
      </Box>
      <BrandsMarquee />
      <WorkflowSection />
      <StatsSection />
      <TrustIndicatorsSection />
      {/* <CaseStudiesSection /> */}
    </>
  );
};

export default HeroSection;
