import React from 'react';
import { Card, Typography, Button, Space, Badge } from 'antd';
import { BellOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Nudge } from '../../context/AppContext';

const { Text, Title } = Typography;

interface NudgeCardProps {
  nudge: Nudge;
  onAction: (nudge: Nudge) => void;
  onDismiss: (nudgeId: string) => void;
}

const NudgeCard: React.FC<NudgeCardProps> = ({ nudge, onAction, onDismiss }) => {
  // Determine color based on priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ff4d4f';
      case 'medium':
        return '#faad14';
      case 'low':
        return '#52c41a';
      default:
        return '#1890ff';
    }
  };

  // Determine icon based on priority
  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return '⚠️ High Priority';
      case 'medium':
        return '⚡ Medium Priority';
      case 'low':
        return '📌 Low Priority';
      default:
        return 'Priority';
    }
  };

  return (
    <Badge.Ribbon text={getPriorityLabel(nudge.priority)} color={getPriorityColor(nudge.priority)}>
      <Card
        hoverable
        style={{ marginBottom: 16 }}
        actions={[
          <Button key='action' type='primary' onClick={() => onAction(nudge)}>
            {nudge.action} <ArrowRightOutlined />
          </Button>,
          <Button key='dismiss' type='text' onClick={() => onDismiss(nudge.id)}>
            Dismiss
          </Button>,
        ]}
      >
        <Space direction='vertical' size='small'>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <BellOutlined style={{ fontSize: 18, marginRight: 8, color: getPriorityColor(nudge.priority) }} />
            <Title level={5} style={{ margin: 0 }}>
              Todo Tasks
            </Title>
          </div>
          <Text>{nudge.message}</Text>
          {nudge.timestamp && (
            <Text type='secondary' style={{ fontSize: '12px', marginTop: 4 }}>
              {new Date(nudge.timestamp).toLocaleString()}
            </Text>
          )}
        </Space>
      </Card>
    </Badge.Ribbon>
  );
};

export default NudgeCard;
