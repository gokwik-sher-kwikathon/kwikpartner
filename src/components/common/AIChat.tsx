import React, { useState, useRef, useEffect } from 'react';
import { Drawer, Input, Button, List, Avatar, Typography, Spin } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import { useApp } from '../../context/AppContext';

const { Text } = Typography;

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIChatProps {
  visible: boolean;
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ visible, onClose }) => {
  const { askEida, state } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting message
  useEffect(() => {
    if (visible && messages.length === 0) {
      setMessages([
        {
          id: 'greeting',
          content: `Hi ${state.user?.name || 'there'}! I'm EIDA, your Partner Assistant. How can I help you today?`,
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
    }
  }, [visible, messages.length, state.user?.name]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await askEida(input);

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: response,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Quick suggestions
  const suggestions = [
    'How do I pitch GoKwik to a fashion brand?',
    'How are commissions calculated?',
    'What documents are needed for KYC?',
    'Tell me about Kwik Checkout',
  ];

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#1890ff', marginRight: '10px' }} />
          <span>EIDA - Partner Assistant</span>
        </div>
      }
      placement='right'
      onClose={onClose}
      open={visible}
      width={400}
      footer={
        <div style={{ display: 'flex', padding: '10px 0' }}>
          <Input
            placeholder='Ask EIDA a question...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTyping}
            style={{ flexGrow: 1 }}
          />
          <Button
            type='primary'
            icon={<SendOutlined />}
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            style={{ marginLeft: '8px' }}
          />
        </div>
      }
      bodyStyle={{ padding: '12px', display: 'flex', flexDirection: 'column', height: 'calc(100% - 55px)' }}
    >
      <div style={{ overflowY: 'auto', flexGrow: 1, paddingBottom: '10px' }}>
        <List
          itemLayout='horizontal'
          dataSource={messages}
          renderItem={(message) => (
            <List.Item
              style={{
                textAlign: message.sender === 'user' ? 'right' : 'left',
                padding: '8px 0',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  maxWidth: '80%',
                  padding: '8px 12px',
                  borderRadius: message.sender === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
                  backgroundColor: message.sender === 'user' ? '#1890ff' : '#f0f2f5',
                  color: message.sender === 'user' ? 'white' : 'rgba(0, 0, 0, 0.85)',
                }}
              >
                {message.content}
              </div>
            </List.Item>
          )}
        />
        {isTyping && (
          <div style={{ textAlign: 'left', padding: '8px 0' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                borderRadius: '18px 18px 18px 0',
                backgroundColor: '#f0f2f5',
              }}
            >
              <Spin size='small' style={{ marginRight: '8px' }} />
              <Text type='secondary'>EIDA is typing...</Text>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div style={{ marginTop: '20px' }}>
          <Text strong>Quick questions:</Text>
          <List
            size='small'
            bordered
            dataSource={suggestions}
            renderItem={(item) => (
              <List.Item
                onClick={() => {
                  setInput(item);
                  setTimeout(() => handleSend(), 100);
                }}
                style={{ cursor: 'pointer' }}
              >
                <Text>{item}</Text>
              </List.Item>
            )}
          />
        </div>
      )}
    </Drawer>
  );
};

export default AIChat;
