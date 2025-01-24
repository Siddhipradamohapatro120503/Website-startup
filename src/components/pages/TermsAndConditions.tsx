import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

const TermsAndConditions = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" mb={8}>
          <Heading as="h1" size="xl" mb={4}>
            Terms and Conditions
          </Heading>
          <Text color={textColor} fontSize="lg">
            Please read these terms carefully before using our services
          </Text>
        </Box>

        <VStack spacing={6} align="stretch">
          <Box>
            <Heading as="h2" size="md" mb={4}>
              1. Service Agreement
            </Heading>
            <Text color={textColor} mb={2}>• By using our services, you agree to these terms and conditions</Text>
            <Text color={textColor} mb={2}>• You must be at least 18 years old to use our services</Text>
            <Text color={textColor} mb={2}>• You are responsible for maintaining your account security</Text>
            <Text color={textColor} mb={2}>• We reserve the right to modify or terminate services</Text>
          </Box>

          <Box>
            <Heading as="h2" size="md" mb={4}>
              2. Service Usage
            </Heading>
            <Text color={textColor} mb={2}>• Our services are provided on an "as is" basis</Text>
            <Text color={textColor} mb={2}>• You agree to use our services for lawful purposes only</Text>
            <Text color={textColor} mb={2}>• We may update service features and pricing</Text>
            <Text color={textColor} mb={2}>• Service availability may vary by region</Text>
          </Box>

          <Box>
            <Heading as="h2" size="md" mb={4}>
              3. Payment Terms
            </Heading>
            <Text color={textColor} mb={2}>• Payment is required before service delivery</Text>
            <Text color={textColor} mb={2}>• All fees are non-negotiable and clearly displayed</Text>
            <Text color={textColor} mb={2}>• We accept payments through our secure payment gateway</Text>
            <Text color={textColor} mb={2}>• Prices are subject to change with notice</Text>
          </Box>

          <Box>
            <Heading as="h2" size="md" mb={4}>
              4. Intellectual Property
            </Heading>
            <Text color={textColor} mb={2}>• All service-related content belongs to us</Text>
            <Text color={textColor} mb={2}>• You may not copy or redistribute our service materials</Text>
            <Text color={textColor} mb={2}>• Your feedback may be used to improve services</Text>
            <Text color={textColor} mb={2}>• We respect intellectual property rights</Text>
          </Box>

          <Box>
            <Heading as="h2" size="md" mb={4}>
              5. Privacy & Data
            </Heading>
            <Text color={textColor} mb={2}>• We protect your personal information</Text>
            <Text color={textColor} mb={2}>• Data collection is limited to service requirements</Text>
            <Text color={textColor} mb={2}>• You can request your data at any time</Text>
            <Text color={textColor} mb={2}>• We follow data protection regulations</Text>
          </Box>

          <Box>
            <Heading as="h2" size="md" mb={4}>
              6. Service Scope
            </Heading>
            <Text color={textColor} mb={2}>• We act as a technical intermediary, enabling payment processing via third-party gateways</Text>
            <Text color={textColor} mb={2}>• We do not directly handle financial transactions or store sensitive payment data</Text>
            <Text color={textColor} mb={2}>• Our role is limited to facilitating connections between users and payment services</Text>
          </Box>

          <Box>
            <Heading as="h2" size="md" mb={4}>
              7. Compliance Requirements
            </Heading>
            <Text color={textColor} mb={2}>• Users must comply with the payment gateway's terms of service</Text>
            <Text color={textColor} mb={2}>• Adherence to PCI-DSS standards for data security is mandatory</Text>
            <Text color={textColor} mb={2}>• Compliance with anti-fraud, AML, and applicable laws (e.g., GDPR, CCPA) is required</Text>
          </Box>

          <Box>
            <Heading as="h2" size="md" mb={4}>
              8. Fees and Billing
            </Heading>
            <Text color={textColor} mb={2}>• Service fees for using our platform are separate from payment gateway fees</Text>
            <Text color={textColor} mb={2}>• Gateway fees (transaction charges) are governed by the gateway provider</Text>
            <Text color={textColor} mb={2}>• All fees are clearly displayed before service initiation</Text>
          </Box>

          <Box>
            <Heading as="h2" size="md" mb={4}>
              9. Liability Limitations
            </Heading>
            <Text color={textColor} mb={2}>• We are not liable for payment gateway outages, errors, or fraud</Text>
            <Text color={textColor} mb={2}>• Disputes between users, merchants, or gateways are not our responsibility</Text>
            <Text color={textColor} mb={2}>• We are not liable for financial losses due to gateway processing delays/failures</Text>
          </Box>

          <Box>
            <Heading as="h2" size="md" mb={4}>
              10. Data Handling
            </Heading>
            <Text color={textColor} mb={2}>• We encrypt all payment data transmitted through our systems</Text>
            <Text color={textColor} mb={2}>• We do not store sensitive payment information</Text>
            <Text color={textColor} mb={2}>• The gateway provider handles data storage/security per their policies</Text>
          </Box>

          <Box>
            <Heading as="h2" size="md" mb={4}>
              11. Service Termination
            </Heading>
            <Text color={textColor} mb={2}>• We reserve the right to suspend/terminate service for policy violations</Text>
            <Text color={textColor} mb={2}>• Violation of gateway rules may result in immediate termination</Text>
            <Text color={textColor} mb={2}>• Users will be notified of any service termination when possible</Text>
          </Box>

          <Box>
            <Heading as="h2" size="md" mb={4}>
              12. Dispute Resolution
            </Heading>
            <Text color={textColor} mb={2}>• Chargebacks must be resolved directly with the gateway or merchant</Text>
            <Text color={textColor} mb={2}>• Refund requests should be submitted through appropriate channels</Text>
            <Text color={textColor} mb={2}>• Payment disputes are handled by the payment gateway provider</Text>
          </Box>

          <Box>
            <Heading as="h2" size="md" mb={4}>
              13. Terms Updates
            </Heading>
            <Text color={textColor} mb={2}>• Terms may change to reflect updates in gateway policies or regulations</Text>
            <Text color={textColor} mb={2}>• Users will be notified of material changes to these terms</Text>
            <Text color={textColor} mb={2}>• Continued use after updates constitutes acceptance of new terms</Text>
          </Box>
        </VStack>

        <Box mt={8} p={4} bg={bgColor} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
          <Text color={textColor} fontSize="sm" textAlign="center">
            Last updated: January 24, 2025. For any questions about these terms, please contact us at support@shreetech.org
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default TermsAndConditions;
