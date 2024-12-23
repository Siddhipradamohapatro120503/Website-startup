import React, { useState, useEffect } from 'react';
import { Box, IconButton, Flex, useColorModeValue } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface HeroCarouselProps {
  images: string[];
  autoPlayInterval?: number;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ 
  images, 
  autoPlayInterval = 5000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const buttonBg = useColorModeValue('whiteAlpha.700', 'blackAlpha.700');
  const buttonHoverBg = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [images.length, autoPlayInterval, isHovered]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box
      position="relative"
      height="100%"
      overflow="hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            bgImage={`url(${images[currentIndex]})`}
            bgSize="cover"
            bgPosition="center"
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <Flex
        position="absolute"
        width="100%"
        height="100%"
        justify="space-between"
        align="center"
        px={4}
        opacity={isHovered ? 1 : 0}
        transition="opacity 0.3s"
      >
        <IconButton
          aria-label="Previous slide"
          icon={<FiChevronLeft size={30} />}
          onClick={prevSlide}
          variant="ghost"
          bg={buttonBg}
          _hover={{ bg: buttonHoverBg }}
          size="lg"
          isRound
        />
        <IconButton
          aria-label="Next slide"
          icon={<FiChevronRight size={30} />}
          onClick={nextSlide}
          variant="ghost"
          bg={buttonBg}
          _hover={{ bg: buttonHoverBg }}
          size="lg"
          isRound
        />
      </Flex>

      {/* Dots Indicator */}
      <Flex
        position="absolute"
        bottom="4"
        width="100%"
        justify="center"
        gap={2}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            w={2}
            h={2}
            borderRadius="full"
            bg={index === currentIndex ? 'white' : 'whiteAlpha.600'}
            cursor="pointer"
            onClick={() => setCurrentIndex(index)}
            transition="all 0.3s"
            _hover={{ transform: 'scale(1.2)' }}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default HeroCarousel;
