import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Badge,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Divider,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { FiCreditCard, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import api from '../../../services/api';

const formatIndianCurrency = (amount: number): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
};

interface Payment {
  _id: string;
  serviceId: string;
  serviceName: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentDate: string;
  transactionId: string;
  description: string;
}

interface PaymentStats {
  totalPayments: number;
  pendingAmount: number;
  completedAmount: number;
}

const PaymentSection: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<PaymentStats>({
    totalPayments: 0,
    pendingAmount: 0,
    completedAmount: 0,
  });
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
      toast({
        title: 'Error',
        description: 'Failed to fetch payments',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handlePayment = async (payment: Payment) => {
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

      toast({
        title: 'Success',
        description: 'Payment processed successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      await fetchPayments();
      onClose();
    } catch (error) {
      console.error('Error processing payment:', error);
      toast({
        title: 'Error',
        description: 'Failed to process payment',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'pending':
        return 'yellow';
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

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Your Payments
      </Text>

      {/* Payment Statistics */}
      <Box mb={6} p={4} borderWidth="1px" borderRadius="lg" bg="white">
        <StatGroup>
          <Stat>
            <StatLabel>Total Payments</StatLabel>
            <StatNumber>{formatIndianCurrency(stats.totalPayments)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Pending Amount</StatLabel>
            <StatNumber color="orange.500">
              {formatIndianCurrency(stats.pendingAmount)}
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Completed Amount</StatLabel>
            <StatNumber color="green.500">
              {formatIndianCurrency(stats.completedAmount)}
            </StatNumber>
          </Stat>
        </StatGroup>
      </Box>

      {/* Payments Table */}
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Service</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Transaction ID</Th>
              <Th>Date</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {payments.map((payment) => (
              <Tr key={payment._id}>
                <Td>{payment.serviceName}</Td>
                <Td>{formatIndianCurrency(payment.amount)}</Td>
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
                  <Text fontSize="sm" color="gray.600">
                    {payment.transactionId}
                  </Text>
                </Td>
                <Td>
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

      {/* Payment Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Process Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="bold">Service:</Text>
                <Text>{selectedPayment?.serviceName}</Text>
              </Box>
              <Divider />
              <Box>
                <Text fontWeight="bold">Amount:</Text>
                <Text fontSize="xl" color="blue.600">
                  {selectedPayment && formatIndianCurrency(selectedPayment.amount)}
                </Text>
              </Box>
              <Divider />
              <Box>
                <Text fontWeight="bold">Transaction ID:</Text>
                <Text color="gray.600">{selectedPayment?.transactionId}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Description:</Text>
                <Text>{selectedPayment?.description}</Text>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              leftIcon={<FiCreditCard />}
              onClick={processPayment}
              isLoading={loading}
            >
              Pay Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PaymentSection;
