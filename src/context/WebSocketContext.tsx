import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useApp } from './AppContext';

// Define the types for our WebSocket context
interface WebSocketContextType {
  connected: boolean;
  sendMessage: (message: any) => void;
  lastMessage: any;
}

// Create the context with default values
const WebSocketContext = createContext<WebSocketContextType>({
  connected: false,
  sendMessage: () => {},
  lastMessage: null,
});

// Custom hook to use the WebSocket context
export const useWebSocket = () => useContext(WebSocketContext);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const { state, addNudge, updateReferral } = useApp();

  // Initialize WebSocket connection
  useEffect(() => {
    // Only connect if user is logged in
    if (!state.user) return;

    // In a real app, this would be a secure WebSocket connection to your backend
    // For demo purposes, we're using a mock WebSocket URL
    const ws = new WebSocket('wss://mock-websocket-server.example.com');

    ws.onopen = () => {
      console.log('WebSocket connected');
      setConnected(true);

      // Send authentication message
      if (state.user) {
        ws.send(
          JSON.stringify({
            type: 'auth',
            userId: state.user.id,
            token: state.token,
          }),
        );
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('WebSocket message received:', message);
        setLastMessage(message);

        // Handle different message types
        handleWebSocketMessage(message);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    setSocket(ws);

    // Clean up on unmount
    return () => {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    };
  }, [state.user]);

  // Handle WebSocket messages
  const handleWebSocketMessage = useCallback(
    (message: any) => {
      switch (message.type) {
        case 'nudge':
          // Add a new nudge notification
          addNudge({
            id: message.id,
            message: message.message,
            priority: message.priority,
            timestamp: message.timestamp,
            referralId: message.referralId,
          });
          break;

        case 'referral_update':
          // Update a referral's status
          updateReferral(message.referralId, {
            status: message.status,
            stage: message.stage,
            updatedAt: message.timestamp,
          });
          break;

        case 'commission_update':
          // Handle commission updates
          // This would update the commission state in a real app
          console.log('Commission update received:', message);
          break;

        default:
          console.log('Unknown message type:', message.type);
      }
    },
    [addNudge, updateReferral],
  );

  // Send a message through the WebSocket
  const sendMessage = useCallback(
    (message: any) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      } else {
        console.error('WebSocket is not connected');
      }
    },
    [socket],
  );

  // Create a mock WebSocket for demo purposes
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Simulate receiving messages in development mode
      const mockMessageInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          // 30% chance of receiving a message
          const mockMessages = [
            {
              type: 'nudge',
              id: `nudge-${Date.now()}`,
              message: 'Follow up with Fashion Store about their KYC documents',
              priority: 'high',
              timestamp: new Date().toISOString(),
              referralId: 'ref-123',
            },
            {
              type: 'referral_update',
              referralId: 'ref-123',
              status: 'active',
              stage: 'ba_shared',
              timestamp: new Date().toISOString(),
            },
            {
              type: 'commission_update',
              commissionId: 'comm-123',
              status: 'processing',
              amount: 15000,
              timestamp: new Date().toISOString(),
            },
          ];

          const randomMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)];
          handleWebSocketMessage(randomMessage);
        }
      }, 30000); // Every 30 seconds

      return () => clearInterval(mockMessageInterval);
    }
  }, [handleWebSocketMessage]);

  return (
    <WebSocketContext.Provider value={{ connected, sendMessage, lastMessage }}>{children}</WebSocketContext.Provider>
  );
};
