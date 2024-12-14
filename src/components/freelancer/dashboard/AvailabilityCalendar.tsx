import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Text,
  Button,
  Box,
  SimpleGrid,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';

interface TimeSlot {
  date: string;
  slots: {
    time: string;
    isAvailable: boolean;
    isBooked: boolean;
  }[];
}

const AvailabilityCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Mock data for the next 7 days
  const timeSlots: TimeSlot[] = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: date.toISOString().split('T')[0],
      slots: [
        { time: '09:00', isAvailable: Math.random() > 0.3, isBooked: Math.random() > 0.7 },
        { time: '11:00', isAvailable: Math.random() > 0.3, isBooked: Math.random() > 0.7 },
        { time: '14:00', isAvailable: Math.random() > 0.3, isBooked: Math.random() > 0.7 },
        { time: '16:00', isAvailable: Math.random() > 0.3, isBooked: Math.random() > 0.7 },
      ],
    };
  });

  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const selectedBg = useColorModeValue('blue.50', 'blue.900');
  const dayBg = useColorModeValue('white', 'gray.700');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <VStack spacing={4} align="stretch">
      {/* Weekly Calendar */}
      <SimpleGrid columns={7} spacing={2}>
        {timeSlots.map((day) => (
          <Button
            key={day.date}
            onClick={() => setSelectedDate(day.date)}
            variant="outline"
            size="sm"
            height="auto"
            p={2}
            bg={day.date === selectedDate ? selectedBg : dayBg}
            borderColor={borderColor}
            _hover={{ bg: selectedBg }}
          >
            <VStack spacing={1}>
              <Text fontSize="xs">{formatDate(day.date)}</Text>
              <Badge
                colorScheme={
                  day.slots.some((slot) => slot.isAvailable)
                    ? 'green'
                    : 'red'
                }
                variant="subtle"
                fontSize="xx-small"
              >
                {day.slots.filter((slot) => slot.isAvailable).length} slots
              </Badge>
            </VStack>
          </Button>
        ))}
      </SimpleGrid>

      {/* Time Slots for Selected Date */}
      <Box
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        p={4}
      >
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          Available Time Slots - {formatDate(selectedDate)}
        </Text>
        <SimpleGrid columns={2} spacing={4}>
          {timeSlots
            .find((day) => day.date === selectedDate)
            ?.slots.map((slot, index) => (
              <Box
                key={index}
                p={3}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="md"
                bg={slot.isAvailable ? (slot.isBooked ? 'yellow.50' : 'green.50') : 'red.50'}
                _dark={{
                  bg: slot.isAvailable
                    ? slot.isBooked
                      ? 'yellow.900'
                      : 'green.900'
                    : 'red.900',
                }}
              >
                <HStack justify="space-between">
                  <Text>{slot.time}</Text>
                  <Badge
                    colorScheme={
                      !slot.isAvailable
                        ? 'red'
                        : slot.isBooked
                        ? 'yellow'
                        : 'green'
                    }
                  >
                    {!slot.isAvailable
                      ? 'Unavailable'
                      : slot.isBooked
                      ? 'Booked'
                      : 'Available'}
                  </Badge>
                </HStack>
              </Box>
            ))}
        </SimpleGrid>
      </Box>

      {/* Quick Actions */}
      <HStack spacing={4} justify="flex-end">
        <Button size="sm" variant="outline">
          Block Time
        </Button>
        <Button size="sm" colorScheme="blue">
          Set Availability
        </Button>
      </HStack>
    </VStack>
  );
};

export default AvailabilityCalendar;
