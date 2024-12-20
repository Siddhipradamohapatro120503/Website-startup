import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiSmile, FiCheckCircle, FiClock, FiAward } from 'react-icons/fi';
import { statsData } from '../../data/stats';

const iconMap: { [key: string]: any } = {
  FiSmile,
  FiCheckCircle,
  FiClock,
  FiAward,
};

const StatsSection: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box py={20} bg={bgColor} borderTop="1px" borderColor={borderColor}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 8, lg: 12 }}>
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Flex
                direction="column"
                align="center"
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
                _hover={{
                  transform: 'translateY(-5px)',
                  shadow: 'lg',
                  borderColor: `${stat.color}.400`,
                }}
                transition="all 0.3s"
              >
                <Icon
                  as={iconMap[stat.icon]}
                  w={10}
                  h={10}
                  mb={4}
                  color={`${stat.color}.400`}
                />
                <Stat textAlign="center">
                  <StatNumber
                    fontSize="4xl"
                    fontWeight="bold"
                    bgGradient={`linear(to-r, ${stat.color}.400, ${stat.color}.600)`}
                    bgClip="text"
                    mb={2}
                  >
                    {stat.value}
                  </StatNumber>
                  <StatLabel fontSize="lg">{stat.label}</StatLabel>
                </Stat>
              </Flex>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default StatsSection;
