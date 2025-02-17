import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  HStack,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  useToast,
  Icon,
  Divider,
  Heading,
} from '@chakra-ui/react';
import { FiCreditCard, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';

// Get base API URL from environment
// const API_BASE = process.env.REACT_APP_API_URL?.replace(/\/api$/, '') || 'http://localhost:5000';

const API_BASE = "http://localhost:3000"

declare global {
  interface Window {
    bolt: any;
  }
}

interface Payment {
  _id: string;
  serviceId: string;
  serviceName: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentDate: string;
  transactionId: string;
  orderId?: string;
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
  const toast = useToast();

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.300');
  const tableHeaderBg = useColorModeValue('gray.50', 'gray.700');
  const tableBorderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  const fetchPayments = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE}/api/payments/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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
  }, [toast]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

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

  const handlePayment = async (payment: Payment) => {
    setSelectedPayment(payment);
    onOpen();
  };

  const processPayment = async () => {
    if (!selectedPayment) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE}/api/payments/create-order`,
        {
          amount: selectedPayment.amount,
          currency: 'INR',
          description: 'Service Payment'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const {
        key,
        txnId,
        amount: payuAmount,
        productinfo,
        firstname,
        email,
        phone,
        surl,
        furl,
        hash,
        payuUrl
      } = response.data;

      // Create form and submit to PayU
      const form = document.createElement('form');
      form.setAttribute('action', payuUrl);
      form.setAttribute('method', 'post');
      form.setAttribute('style', 'display: none');

      const params = {
        key,
        txnid: txnId,
        amount: payuAmount,
        productinfo,
        firstname,
        email,
        phone,
        surl,
        furl,
        hash,
      };

      // Add parameters to form
      Object.entries(params).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', key);
        input.setAttribute('value', String(value));
        form.appendChild(input);
      });

      // Add form to body and submit
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Error',
        description: 'Payment failed. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
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
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th bg={tableHeaderBg} color={secondaryTextColor}>Total Payments</Th>
              <Th bg={tableHeaderBg} color={secondaryTextColor}>Pending Amount</Th>
              <Th bg={tableHeaderBg} color={secondaryTextColor}>Completed Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td color={textColor}>{formatIndianCurrency(stats.totalPayments)}</Td>
              <Td color="orange.500">{formatIndianCurrency(stats.pendingAmount)}</Td>
              <Td color="green.500">{formatIndianCurrency(stats.completedAmount)}</Td>
            </Tr>
          </Tbody>
        </Table>
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
                        isLoading={loading}
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
                onClick={processPayment}
                isLoading={loading}
              >
                Pay with PayU
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default PaymentSection;
