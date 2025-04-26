import React from 'react';
import { Card, Typography, Badge, Space, Divider, Alert, Tag } from 'antd';
import { useWebSocket } from '../../context/WebSocketContext';

const { Title, Text, Paragraph } = Typography;

const WebSocketStatus: React.FC = () => {
  const { connected, lastMessage } = useWebSocket();

  return (
    <></>
    // <Card size='small' style={{ marginBottom: 16 }}>
    //   <Space direction='vertical' style={{ width: '100%' }}>
    //     <Space>
    //       <Text strong>Real-time Updates:</Text>
    //       {connected ? <Badge status='success' text='Connected' /> : <Badge status='error' text='Disconnected' />}
    //     </Space>

    //     {lastMessage && (
    //       <>
    //         <Divider style={{ margin: '8px 0' }} />
    //         <div>
    //           <Text strong>Last Update:</Text>
    //           <div style={{ marginTop: 8 }}>
    //             {lastMessage.type === 'nudge' && (
    //               <Alert
    //                 message={
    //                   <Space>
    //                     <Tag color='blue'>Nudge</Tag>
    //                     <Text>{lastMessage.message}</Text>
    //                   </Space>
    //                 }
    //                 type='info'
    //                 showIcon
    //               />
    //             )}
    //             {lastMessage.type === 'referral_update' && (
    //               <Alert
    //                 message={
    //                   <Space>
    //                     <Tag color='green'>Referral Update</Tag>
    //                     <Text>
    //                       Referral {lastMessage.referralId} updated to stage: {lastMessage.stage}
    //                     </Text>
    //                   </Space>
    //                 }
    //                 type='success'
    //                 showIcon
    //               />
    //             )}
    //             {lastMessage.type === 'commission_update' && (
    //               <Alert
    //                 message={
    //                   <Space>
    //                     <Tag color='gold'>Commission Update</Tag>
    //                     <Text>
    //                       Commission ₹{lastMessage.amount.toLocaleString()} is now {lastMessage.status}
    //                     </Text>
    //                   </Space>
    //                 }
    //                 type='warning'
    //                 showIcon
    //               />
    //             )}
    //           </div>
    //         </div>
    //       </>
    //     )}

    //     <Paragraph type='secondary' style={{ fontSize: '12px', marginTop: 8, marginBottom: 0 }}>
    //       {connected
    //         ? 'You will receive real-time updates about your referrals, commissions, and nudges.'
    //         : 'Reconnecting to the server...'}
    //     </Paragraph>
    //   </Space>
    // </Card>
  );
};

export default WebSocketStatus;
