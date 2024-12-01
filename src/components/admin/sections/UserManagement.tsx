// @ts-nocheck
import React, { useState, useMemo } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Checkbox,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import {
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiSearch,
  FiFilter,
  FiUserCheck,
  FiUserX,
  FiAlertCircle,
  FiKey,
} from 'react-icons/fi';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
}

const mockUsers: User[] = Array.from({ length: 100 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : i % 2 === 0 ? 'Manager' : 'User',
  status: i % 3 === 0 ? 'active' : i % 2 === 0 ? 'inactive' : 'pending',
}));

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'green';
    case 'inactive':
      return 'red';
    case 'pending':
      return 'yellow';
    default:
      return 'gray';
  }
};

const UserManagement: React.FC = () => {
  const [users] = useState<User[]>(mockUsers);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleUserSelect = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (selectedUsers.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map(user => user.id)));
    }
  };

  return (
    <Box>
      {/* Filters and Actions */}
      <HStack spacing={4} mb={6}>
        <InputGroup maxW="xs">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input placeholder="Search users..." />
        </InputGroup>
        <Select placeholder="Filter by role" maxW="xs">
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </Select>
        <Select placeholder="Filter by status" maxW="xs">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </Select>
        <Button leftIcon={<FiFilter />} colorScheme="blue">
          Apply Filters
        </Button>
      </HStack>

      {/* Users Table */}
      <Box
        bg={bgColor}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
        overflow="hidden"
      >
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th px={4} py={4}>
                  <Checkbox
                    isChecked={selectedUsers.size === users.length}
                    isIndeterminate={selectedUsers.size > 0 && selectedUsers.size < users.length}
                    onChange={handleSelectAll}
                  />
                </Th>
                <Th>User</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map(user => (
                <Tr key={user.id}>
                  <Td px={4}>
                    <Checkbox
                      isChecked={selectedUsers.has(user.id)}
                      onChange={() => handleUserSelect(user.id)}
                    />
                  </Td>
                  <Td>
                    <Text fontWeight="medium">{user.name}</Text>
                  </Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>
                    <Badge
                      colorScheme={getStatusColor(user.status)}
                      variant="subtle"
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      {user.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<FiMoreVertical />}
                        variant="ghost"
                        size="sm"
                      />
                      <MenuList>
                        <MenuItem icon={<FiEdit2 />}>Edit User</MenuItem>
                        <MenuItem icon={<FiKey />}>Change Role</MenuItem>
                        <MenuItem icon={<FiMail />}>Send Email</MenuItem>
                        <MenuItem icon={<FiAlertCircle />}>Flag Account</MenuItem>
                        <MenuItem icon={<FiTrash2 />} color="red.500">
                          Delete User
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default UserManagement;
