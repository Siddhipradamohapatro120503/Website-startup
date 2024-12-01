import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Select,
  Grid,
  useColorModeValue,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  Input,
  InputRightElement,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';
import {
  FiDownload,
  FiCalendar,
  FiFilter,
  FiMoreVertical,
  FiSearch,
  FiRefreshCw,
} from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Report {
  name: string;
  category: string;
  lastGenerated: string;
  status: 'Completed' | 'Processing' | 'Failed';
}

const INITIAL_REPORTS: Report[] = [
  {
    name: 'Revenue Analysis',
    category: 'Financial',
    lastGenerated: '2024-01-15',
    status: 'Completed',
  },
  {
    name: 'User Engagement',
    category: 'Analytics',
    lastGenerated: '2024-01-14',
    status: 'Processing',
  },
  {
    name: 'Service Performance',
    category: 'Operations',
    lastGenerated: '2024-01-13',
    status: 'Completed',
  },
  {
    name: 'Customer Satisfaction',
    category: 'Feedback',
    lastGenerated: '2024-01-12',
    status: 'Failed',
  },
];

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('last30');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Simulated export delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = {
        dateRange,
        metrics: {
          revenue: '$45,678',
          users: '2,345',
          services: '789',
          rating: '4.8'
        },
        chartData
      };
      
      // Create and download CSV
      const csvContent = `Date Range,${dateRange}\nRevenue,${data.metrics.revenue}\nUsers,${data.metrics.users}\nServices,${data.metrics.services}\nRating,${data.metrics.rating}`;
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${dateRange}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simulated refresh delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Here you would typically fetch new data
      // For now, we'll just update the chart data
      setChartData({
        ...chartData,
        datasets: chartData.datasets.map(dataset => ({
          ...dataset,
          data: dataset.data.map(() => Math.floor(Math.random() * 30000))
        }))
      });
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const [chartData, setChartData] = useState({
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Users',
        data: [100, 150, 200, 250],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleDateRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(event.target.value);
    handleRefresh();
  };

  const filteredReports = reports.filter(report =>
    report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Text fontSize="2xl" fontWeight="bold">
            Reports & Analytics
          </Text>
          <HStack spacing={4}>
            <Select
              value={dateRange}
              onChange={handleDateRangeChange}
              w="200px"
            >
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="custom">Custom Range</option>
            </Select>
            <Button
              leftIcon={<Icon as={FiDownload} />}
              colorScheme="blue"
              onClick={handleExport}
              isLoading={isExporting}
              loadingText="Exporting..."
            >
              Export
            </Button>
          </HStack>
        </Flex>

        {/* Key Metrics */}
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          <MetricCard
            title="Total Revenue"
            value="$45,678"
            change={12.5}
            period="vs last period"
          />
          <MetricCard
            title="Active Users"
            value="2,345"
            change={8.2}
            period="vs last period"
          />
          <MetricCard
            title="Completed Services"
            value="789"
            change={-3.1}
            period="vs last period"
          />
          <MetricCard
            title="Average Rating"
            value="4.8"
            change={0.3}
            period="vs last period"
          />
        </Grid>

        {/* Chart */}
        <Box p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <Line options={chartOptions} data={chartData} />
        </Box>

        {/* Detailed Reports Table */}
        <Box p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <HStack justify="space-between" mb={4}>
            <Text fontSize="lg" fontWeight="semibold">
              Detailed Reports
            </Text>
            <HStack spacing={4}>
              <InputGroup w="300px">
                <Input
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <InputRightElement>
                  <Icon as={FiSearch} color="gray.400" />
                </InputRightElement>
              </InputGroup>
              <Button
                leftIcon={<Icon as={FiFilter} />}
                variant="ghost"
                onClick={() => {/* Add filter functionality */}}
              >
                Filter
              </Button>
              <Button
                leftIcon={<Icon as={FiRefreshCw} />}
                variant="ghost"
                onClick={handleRefresh}
                isLoading={isRefreshing}
                loadingText="Refreshing..."
              >
                Refresh
              </Button>
            </HStack>
          </HStack>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Report Name</Th>
                <Th>Category</Th>
                <Th>Last Generated</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {generateTableRows(filteredReports)}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
};

const MetricCard: React.FC<{
  title: string;
  value: string;
  change: number;
  period: string;
}> = ({ title, value, change, period }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
      <Stat>
        <StatLabel>{title}</StatLabel>
        <StatNumber fontSize="2xl">{value}</StatNumber>
        <StatHelpText>
          <StatArrow type={change >= 0 ? 'increase' : 'decrease'} />
          {Math.abs(change)}% {period}
        </StatHelpText>
      </Stat>
    </Box>
  );
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Platform Performance',
    },
  },
};

const generateTableRows = (filteredReports: Report[]) => {
  return filteredReports.map((report: Report, index: number) => (
    <Tr key={index}>
      <Td>{report.name}</Td>
      <Td>{report.category}</Td>
      <Td>{report.lastGenerated}</Td>
      <Td>
        <Badge
          colorScheme={
            report.status === 'Completed'
              ? 'green'
              : report.status === 'Processing'
              ? 'blue'
              : 'red'
          }
        >
          {report.status}
        </Badge>
      </Td>
      <Td>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<Icon as={FiMoreVertical} />}
            variant="ghost"
            size="sm"
          >
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem
              icon={<Icon as={FiDownload} />}
              onClick={() => {
                // Handle download
                console.log(`Downloading report: ${report.name}`);
              }}
            >
              Download
            </MenuItem>
            <MenuItem
              icon={<Icon as={FiRefreshCw} />}
              onClick={() => {
                // Handle regenerate
                console.log(`Regenerating report: ${report.name}`);
              }}
            >
              Regenerate
            </MenuItem>
            <MenuItem
              icon={<Icon as={FiCalendar} />}
              onClick={() => {
                // Handle schedule
                console.log(`Scheduling report: ${report.name}`);
              }}
            >
              Schedule
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  ));
};

export default Reports;
