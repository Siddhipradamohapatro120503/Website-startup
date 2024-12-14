import React from 'react';
import {
  VStack,
  HStack,
  Text,
  Progress,
  Tag,
  Wrap,
  WrapItem,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

interface Skill {
  name: string;
  level: number;
  endorsements: number;
  category: string;
}

const SkillsSection: React.FC = () => {
  const skills: Skill[] = [
    {
      name: 'React',
      level: 90,
      endorsements: 24,
      category: 'Frontend',
    },
    {
      name: 'Node.js',
      level: 85,
      endorsements: 18,
      category: 'Backend',
    },
    {
      name: 'TypeScript',
      level: 80,
      endorsements: 15,
      category: 'Programming',
    },
    {
      name: 'UI/UX Design',
      level: 75,
      endorsements: 12,
      category: 'Design',
    },
    {
      name: 'MongoDB',
      level: 70,
      endorsements: 10,
      category: 'Database',
    },
  ];

  const getSkillColor = (level: number) => {
    if (level >= 90) return 'green';
    if (level >= 70) return 'blue';
    if (level >= 50) return 'yellow';
    return 'red';
  };

  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <VStack spacing={6} align="stretch">
      {/* Skills Progress */}
      <Box>
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          Skill Proficiency
        </Text>
        <VStack spacing={4} align="stretch">
          {skills.map((skill) => (
            <Box key={skill.name}>
              <HStack justify="space-between" mb={2}>
                <Text>{skill.name}</Text>
                <HStack spacing={2}>
                  <Tag size="sm" variant="subtle" colorScheme={getSkillColor(skill.level)}>
                    {skill.level}%
                  </Tag>
                  <Tag size="sm" variant="outline">
                    {skill.endorsements} endorsements
                  </Tag>
                </HStack>
              </HStack>
              <Progress
                value={skill.level}
                size="sm"
                colorScheme={getSkillColor(skill.level)}
                borderRadius="full"
              />
            </Box>
          ))}
        </VStack>
      </Box>

      {/* Skill Categories */}
      <Box>
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          Expertise Areas
        </Text>
        <Wrap spacing={2}>
          {Array.from(new Set(skills.map((skill) => skill.category))).map((category) => (
            <WrapItem key={category}>
              <Tag
                size="md"
                variant="subtle"
                colorScheme="blue"
                borderRadius="full"
              >
                {category}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      </Box>

      {/* Certifications */}
      <Box
        p={4}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
      >
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          Certifications
        </Text>
        <VStack align="start" spacing={3}>
          <HStack>
            <Tag colorScheme="green">AWS</Tag>
            <Text>AWS Certified Solutions Architect</Text>
          </HStack>
          <HStack>
            <Tag colorScheme="purple">Google</Tag>
            <Text>Google Cloud Professional Developer</Text>
          </HStack>
          <HStack>
            <Tag colorScheme="blue">Microsoft</Tag>
            <Text>Microsoft Certified: Azure Developer Associate</Text>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
};

export default SkillsSection;
