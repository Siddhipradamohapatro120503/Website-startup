import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  IconButton,
  useColorModeValue,
  Avatar,
  Spinner,
} from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';
import api from '../../api/axios';
import { useAuth } from '../../hooks/useAuth';

interface Message {
  _id: string;
  serviceId: string;
  senderId: string;
  senderRole: 'user' | 'admin';
  content: string;
  timestamp: Date;
  read: boolean;
}

interface ServiceChatProps {
  serviceId: string;
}

const ServiceChat: React.FC<ServiceChatProps> = ({ serviceId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    if (serviceId) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    } else {
      setLoading(false);
      setError('Invalid service ID');
    }
  }, [serviceId]);

  useEffect(() => {
    if (shouldScroll) {
      scrollToBottom();
      setShouldScroll(false);
    }
  }, [messages, shouldScroll]);

  const fetchMessages = async () => {
    if (!serviceId) {
      setLoading(false);
      setError('Invalid service ID');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        setError('Authentication token not found');
        return;
      }

      const response = await api.get(`/messages/service/${serviceId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Only scroll if new messages are added
      const shouldAutoScroll = messages.length < response.data.length;
      setMessages(response.data);
      setShouldScroll(shouldAutoScroll);
      setError(null);
      setLoading(false);
      markMessagesAsRead();
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to fetch messages');
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      messagesContainerRef.current.scrollTop = maxScroll;
    }
  };

  const markMessagesAsRead = async () => {
    if (!serviceId) return;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await api.patch(`/messages/service/${serviceId}/read`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const sendMessage = async () => {
    if (!serviceId || !newMessage.trim()) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found');
        return;
      }

      const response = await api.post(`/messages/service/${serviceId}`, {
        content: newMessage.trim()
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setMessages(prev => [...prev, response.data]);
      setNewMessage('');
      setError(null);
      setShouldScroll(true);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="300px">
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="300px">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      h="500px"
      display="flex"
      flexDirection="column"
    >
      <VStack
        ref={messagesContainerRef}
        flex="1"
        overflowY="auto"
        p={4}
        spacing={4}
        align="stretch"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: borderColor,
            borderRadius: '24px',
          },
        }}
      >
        {messages.map((message) => (
          <HStack
            key={message._id}
            alignSelf={message.senderId === user?.id ? 'flex-end' : 'flex-start'}
            maxW="70%"
          >
            {message.senderId !== user?.id && (
              <Avatar
                size="sm"
                name={message.senderRole === 'admin' ? 'Admin' : 'User'}
                bg={message.senderRole === 'admin' ? 'red.500' : 'blue.500'}
              />
            )}
            <Box
              bg={message.senderId === user?.id ? 'blue.500' : 'gray.100'}
              color={message.senderId === user?.id ? 'white' : 'black'}
              borderRadius="lg"
              px={4}
              py={2}
            >
              <Text>{message.content}</Text>
              <Text
                fontSize="xs"
                color={message.senderId === user?.id ? 'white' : 'gray.500'}
                textAlign="right"
              >
                {new Date(message.timestamp).toLocaleTimeString()}
              </Text>
            </Box>
          </HStack>
        ))}
        <div ref={messagesEndRef} />
      </VStack>

      <HStack p={4} borderTopWidth="1px" borderColor={borderColor}>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          variant="filled"
        />
        <IconButton
          aria-label="Send message"
          icon={<FiSend />}
          colorScheme="blue"
          onClick={sendMessage}
          isDisabled={!newMessage.trim()}
        />
      </HStack>
    </Box>
  );
};

export default ServiceChat;
