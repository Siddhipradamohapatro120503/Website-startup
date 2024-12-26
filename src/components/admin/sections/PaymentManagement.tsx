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
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  Badge,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
} from '@chakra-ui/react';
import { FiDollarSign, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
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

interface RegisteredService {
  _id: string;
  name: string;
  userEmail: string;
  status: string;
}

interface Payment {
  _id: string;
  serviceId: string;
  serviceName: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentDate: string;
  userEmail: string;
  transactionId: string;
}

const PaymentManagement: React.FC = () => {
  const [services, setServices] = useState<RegisteredService[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedService, setSelectedService] = useState<RegisteredService | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Payment statistics
  const [stats, setStats] = useState({
    totalPayments: 0,
    pendingAmount: 0,
    completedAmount: 0,
    failedAmount: 0,
  });

  useEffect(() => {
    fetchServices();
    fetchPayments();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [payments]);

  const fetchServices = async () => {
    try {
      const response = await api.get('/registered-services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch services',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await api.get('/payments');
      setPayments(response.data);
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

  const calculateStats = () => {
    const stats = payments.reduce(
      (acc, payment) => {
        acc.totalPayments += payment.amount;
        if (payment.status === 'pending') {
          acc.pendingAmount += payment.amount;
        } else if (payment.status === 'completed') {
          acc.completedAmount += payment.amount;
        } else if (payment.status === 'failed') {
          acc.failedAmount += payment.amount;
        }
        return acc;
      },
      { totalPayments: 0, pendingAmount: 0, completedAmount: 0, failedAmount: 0 }
    );
    setStats(stats);
  };

  const handleInitiatePayment = (service: RegisteredService) => {
    setSelectedService(service);
    setAmount('');
    onOpen();
  };

  const initiatePayment = async () => {
    if (!selectedService || !amount) return;

    setLoading(true);
    try {
      await api.post('/payments/initiate', {
        serviceId: selectedService._id,
        amount: parseFloat(amount),
      });

      toast({
        title: 'Success',
        description: 'Payment initiated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      await fetchPayments();
      onClose();
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast({
        title: 'Error',
        description: 'Failed to initiate payment',
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
        return FiXCircle;
      default:
        return FiClock;
    }
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Payment Management
      </Text>

      {/* Payment Statistics */}
      <Box mb={6} p={4} borderWidth="1px" borderRadius="lg">
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
          <Stat>
            <StatLabel>Failed Amount</StatLabel>
            <StatNumber color="red.500">
              {formatIndianCurrency(stats.failedAmount)}
            </StatNumber>
          </Stat>
        </StatGroup>
      </Box>

      {/* Services Table */}
      <Box mb={8} borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Text fontSize="xl" fontWeight="bold" p={4}>
          Registered Services
        </Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Service Name</Th>
              <Th>User Email</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {services.map((service) => (
              <Tr key={service._id}>
                <Td>{service.name}</Td>
                <Td>{service.userEmail}</Td>
                <Td>{service.status}</Td>
                <Td>
                  <Button
                    leftIcon={<FiDollarSign />}
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleInitiatePayment(service)}
                  >
                    Initiate Payment
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Payments Table */}
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Text fontSize="xl" fontWeight="bold" p={4}>
          Payment History
        </Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Service</Th>
              <Th>User</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Transaction ID</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {payments.map((payment) => (
              <Tr key={payment._id}>
                <Td>{payment.serviceName}</Td>
                <Td>{payment.userEmail}</Td>
                <Td>{formatIndianCurrency(payment.amount)}</Td>
                <Td>
                  <HStack>
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
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Initiate Payment Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Initiate Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Service</FormLabel>
                <Text>{selectedService?.name}</Text>
              </FormControl>
              <FormControl>
                <FormLabel>User Email</FormLabel>
                <Text>{selectedService?.userEmail}</Text>
              </FormControl>
              <FormControl>
                <FormLabel>Amount (₹)</FormLabel>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount in INR"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={initiatePayment}
              isLoading={loading}
              leftIcon={<FiDollarSign />}
            >
              Initiate Payment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PaymentManagement;
