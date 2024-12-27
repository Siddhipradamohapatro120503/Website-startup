import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  HStack,
  Icon,
  Badge,
  Divider,
  useColorModeValue,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { FiCreditCard, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import api from '../../../services/api';

interface Payment {
  _id: string;
  serviceId: string;
  serviceName: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentDate: string;
  transactionId: string;
}

const formatIndianCurrency = (amount: number): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
};

const PaymentSection: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [stats, setStats] = useState({
    totalPayments: 0,
    pendingAmount: 0,
    completedAmount: 0,
  });
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.300');
  const tableHeaderBg = useColorModeValue('gray.50', 'gray.700');
  const tableBorderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await api.get('/payments/user');
      setPayments(response.data.payments);
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'pending':
        return 'orange';
      case 'failed':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return FiCheckCircle;
      case 'pending':
        return FiClock;
      case 'failed':
        return FiAlertCircle;
      default:
        return FiClock;
    }
  };

  const handlePayment = (payment: Payment) => {
    setSelectedPayment(payment);
    onOpen();
  };

  const processPayment = async () => {
    if (!selectedPayment) return;

    setLoading(true);
    try {
      await api.patch(`/payments/${selectedPayment._id}/status`, {
        status: 'completed'
      });

      await fetchPayments();
      onClose();
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      <Box
        bg={bgColor}
        p={6}
        borderRadius="lg"
        borderWidth={1}
        borderColor={borderColor}
        shadow="sm"
      >
        <StatGroup>
          <Stat>
            <StatLabel color={secondaryTextColor}>Total Payments</StatLabel>
            <StatNumber color={textColor}>
              {formatIndianCurrency(stats.totalPayments)}
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel color={secondaryTextColor}>Pending Amount</StatLabel>
            <StatNumber color="orange.500">
              {formatIndianCurrency(stats.pendingAmount)}
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel color={secondaryTextColor}>Completed Amount</StatLabel>
            <StatNumber color="green.500">
              {formatIndianCurrency(stats.completedAmount)}
            </StatNumber>
          </Stat>
        </StatGroup>
      </Box>

      <Box
        bg={bgColor}
        p={6}
        borderRadius="lg"
        borderWidth={1}
        borderColor={borderColor}
        shadow="sm"
      >
        <Heading size="md" mb={6} color={textColor}>Payment History</Heading>
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th bg={tableHeaderBg} color={secondaryTextColor}>Service</Th>
                <Th bg={tableHeaderBg} color={secondaryTextColor}>Amount</Th>
                <Th bg={tableHeaderBg} color={secondaryTextColor}>Status</Th>
                <Th bg={tableHeaderBg} color={secondaryTextColor}>Transaction ID</Th>
                <Th bg={tableHeaderBg} color={secondaryTextColor}>Date</Th>
                <Th bg={tableHeaderBg} color={secondaryTextColor}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {payments.map((payment) => (
                <Tr 
                  key={payment._id}
                  _hover={{ bg: hoverBg }}
                  borderColor={tableBorderColor}
                >
                  <Td color={textColor}>{payment.serviceName}</Td>
                  <Td color={textColor}>{formatIndianCurrency(payment.amount)}</Td>
                  <Td>
                    <HStack>
                      <Icon 
                        as={getStatusIcon(payment.status)} 
                        color={`${getStatusColor(payment.status)}.500`}
                      />
                      <Badge colorScheme={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </HStack>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color={secondaryTextColor}>
                      {payment.transactionId}
                    </Text>
                  </Td>
                  <Td color={textColor}>
                    {new Date(payment.paymentDate).toLocaleDateString('en-IN')}
                  </Td>
                  <Td>
                    {payment.status === 'pending' && (
                      <Button
                        leftIcon={<FiCreditCard />}
                        colorScheme="blue"
                        size="sm"
                        onClick={() => handlePayment(payment)}
                      >
                        Pay Now
                      </Button>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={bgColor}>
          <ModalHeader color={textColor}>Complete Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch" pb={6}>
              <Box>
                <Text fontWeight="bold" color={secondaryTextColor}>Service</Text>
                <Text color={textColor}>{selectedPayment?.serviceName}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" color={secondaryTextColor}>Amount</Text>
                <Text fontSize="xl" color="blue.500">
                  {selectedPayment && formatIndianCurrency(selectedPayment.amount)}
                </Text>
              </Box>
              <Divider />
              <Button 
                colorScheme="blue" 
                leftIcon={<FiCreditCard />} 
                isLoading={loading}
                onClick={processPayment}
              >
                Proceed to Payment
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default PaymentSection;
