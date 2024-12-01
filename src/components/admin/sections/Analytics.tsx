// @ts-nocheck
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Text,
  VStack,
  HStack,
  Button,
  IconButton,
  useColorModeValue,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {
  FiDownload,
  FiCalendar,
  FiTrendingUp,
} from 'react-icons/fi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DateRange {
  start: Date;
  end: Date;
}

interface ChartDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
  fill?: boolean;
}

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date(),
  });

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const lineChartData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Users',
        data: [8, 15, 9, 12, 17, 19],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const barChartData: ChartData<'bar'> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Active Users',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Platform Analytics',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box>
      <Grid templateColumns="repeat(4, 1fr)" gap={6} mb={6}>
        {/* Stats Cards */}
        <StatCard
          label="Total Revenue"
          value="$23,000"
          change={12}
          type="increase"
        />
        <StatCard
          label="Active Users"
          value="1,234"
          change={8}
          type="increase"
        />
        <StatCard
          label="Conversion Rate"
          value="3.2%"
          change={-2}
          type="decrease"
        />
        <StatCard
          label="Avg. Session"
          value="12m 30s"
          change={5}
          type="increase"
        />
      </Grid>

      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Line data={lineChartData} options={chartOptions} />
        </Box>
        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Bar data={barChartData} options={chartOptions} />
        </Box>
      </Grid>
    </Box>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  change: number;
  type: 'increase' | 'decrease';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, change, type }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{value}</StatNumber>
        <StatHelpText>
          <StatArrow type={type} />
          {Math.abs(change)}%
        </StatHelpText>
      </Stat>
    </Box>
  );
};

export default Analytics;
