import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
  Container,
  Circle,
  HStack,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { CarouselItem } from '../../data/heroCarousel';

interface HeroCarouselProps {
  items: CarouselItem[];
  autoPlayInterval?: number;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ 
  items, 
  autoPlayInterval = 5000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const bgColor = useColorModeValue('white', 'gray.800');
  const buttonBg = useColorModeValue('whiteAlpha.800', 'blackAlpha.800');
  const dotColor = useColorModeValue('gray.300', 'gray.600');
  const activeDotColor = useColorModeValue('blue.500', 'blue.400');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, autoPlayInterval);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, items.length, autoPlayInterval]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <Box
      position="relative"
      width="100%"
      height="500px"
      overflow="hidden"
      borderRadius="xl"
      boxShadow="xl"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        >
          <Box
            width="100%"
            height="100%"
            position="relative"
            bgImage={`url(${items[currentIndex].src})`}
            bgSize="cover"
            bgPosition="center"
          >
            <Box
              position="absolute"
              bottom="0"
              width="100%"
              p={6}
              background="linear-gradient(to top, rgba(0,0,0,0.7), transparent)"
            >
              <Container maxW="container.xl">
                <Text
                  color="white"
                  fontSize="2xl"
                  fontWeight="bold"
                  mb={2}
                >
                  {items[currentIndex].title}
                </Text>
                <Text color="whiteAlpha.900">
                  {items[currentIndex].description}
                </Text>
              </Container>
            </Box>
          </Box>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <IconButton
        aria-label="Previous slide"
        icon={<FiChevronLeft />}
        position="absolute"
        left={4}
        top="50%"
        transform="translateY(-50%)"
        onClick={handlePrev}
        bg={buttonBg}
        _hover={{ bg: buttonBg }}
        size="lg"
        isRound
      />
      <IconButton
        aria-label="Next slide"
        icon={<FiChevronRight />}
        position="absolute"
        right={4}
        top="50%"
        transform="translateY(-50%)"
        onClick={handleNext}
        bg={buttonBg}
        _hover={{ bg: buttonBg }}
        size="lg"
        isRound
      />

      {/* Dots Navigation */}
      <HStack
        position="absolute"
        bottom={4}
        left="50%"
        transform="translateX(-50%)"
        spacing={2}
      >
        {items.map((_, index) => (
          <Circle
            key={index}
            size={3}
            bg={index === currentIndex ? activeDotColor : dotColor}
            cursor="pointer"
            onClick={() => handleDotClick(index)}
            transition="all 0.2s"
            _hover={{ transform: 'scale(1.2)' }}
          />
        ))}
      </HStack>
    </Box>
  );
};

export default HeroCarousel;
