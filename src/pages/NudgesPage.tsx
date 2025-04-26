import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Tabs,
  Button,
  Input,
  Space,
  Empty,
  Spin,
  Row,
  Col,
  Select,
  Tag,
  Alert,
  Modal,
  Form,
} from 'antd';
import {
  BellOutlined,
  PlusOutlined,
  SyncOutlined,
  RobotOutlined,
  NotificationOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import { useApp } from '../context/AppContext';
import NudgeCard from '../components/common/NudgeCard';
import { Nudge } from '../context/AppContext';
import { generateNudge, configureOpenAI, isOpenAIConfigured } from '../services/openai';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

// Mock referrals for the dropdown
const mockReferrals = [
  { id: 'ref-123', name: 'Fashion Store' },
  { id: 'ref-456', name: 'Beauty Brand' },
  { id: 'ref-789', name: 'Tech Gadgets' },
  { id: 'ref-101', name: 'Home Decor' },
  { id: 'ref-102', name: 'Sports Store' },
];

const NudgesPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('1');
  const [loading, setLoading] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [selectedReferral, setSelectedReferral] = useState<string | null>(null);
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [action, setAction] = useState('Take Action');
  const [apiKeyModalVisible, setApiKeyModalVisible] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [openAIConfigured, setOpenAIConfigured] = useState(isOpenAIConfigured());
  const [form] = Form.useForm();

  // Configure OpenAI API key
  const handleConfigureOpenAI = () => {
    if (apiKey.trim()) {
      configureOpenAI(apiKey);
      setOpenAIConfigured(true);
      setApiKeyModalVisible(false);
      Modal.success({
        title: 'OpenAI API Key Configured',
        content: 'Your OpenAI API key has been successfully configured. You can now use AI-powered features.',
      });
    }
  };

  // Handle nudge action
  const handleNudgeAction = (nudge: Nudge) => {
    // In a real app, this would trigger an action based on the nudge type
    console.log('Nudge action triggered:', nudge);
  };

  // Handle nudge dismissal
  const handleNudgeDismiss = (nudgeId: string) => {
    const updatedNudges = state.nudges.filter((n) => n.id !== nudgeId);
    dispatch({ type: 'SET_NUDGES', payload: updatedNudges });
  };

  // Generate AI nudge
  const generateAINudge = async () => {
    setLoading(true);
    try {
      const referral = selectedReferral ? mockReferrals.find((r) => r.id === selectedReferral) : null;

      // Get referral and partner data for the AI
      const referralData = referral || { type: 'general' };
      const partnerData = {
        role: state.user?.role || 'referralPartner',
        name: state.user?.name || 'Partner',
      };

      // Generate nudge message using OpenAI service
      const message = await generateNudge(referralData, partnerData);

      const newNudge: Nudge = {
        id: `nudge-${Date.now()}`,
        message: message,
        priority: priority,
        action: 'Follow Up',
        timestamp: new Date().toISOString(),
        referralId: selectedReferral || undefined,
      };

      dispatch({ type: 'ADD_NUDGE', payload: newNudge });
      setCustomMessage('');
      setSelectedReferral(null);
      setPriority('medium');
    } catch (error) {
      console.error('Error generating AI nudge:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create custom nudge
  const createCustomNudge = () => {
    if (!customMessage.trim()) return;

    const newNudge: Nudge = {
      id: `nudge-${Date.now()}`,
      message: customMessage,
      priority: priority,
      action: action,
      timestamp: new Date().toISOString(),
      referralId: selectedReferral || undefined,
    };

    dispatch({ type: 'ADD_NUDGE', payload: newNudge });
    setCustomMessage('');
    setSelectedReferral(null);
    setPriority('medium');
    setAction('Take Action');
  };

  return (
    <div>
      <Title level={2}>Todo Tasks</Title>
      <Paragraph>
        Smart, context-aware nudges to help you manage your partnerships effectively. Get timely reminders and
        suggestions based on your referral activity.
      </Paragraph>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab='All Nudges' key='1'>
              {state.nudges.length > 0 ? (
                state.nudges.map((nudge) => (
                  <NudgeCard key={nudge.id} nudge={nudge} onAction={handleNudgeAction} onDismiss={handleNudgeDismiss} />
                ))
              ) : (
                <Empty description='No nudges at the moment' image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </TabPane>
            <TabPane tab='High Priority' key='2'>
              {state.nudges.filter((n) => n.priority === 'high').length > 0 ? (
                state.nudges
                  .filter((n) => n.priority === 'high')
                  .map((nudge) => (
                    <NudgeCard
                      key={nudge.id}
                      nudge={nudge}
                      onAction={handleNudgeAction}
                      onDismiss={handleNudgeDismiss}
                    />
                  ))
              ) : (
                <Empty description='No high priority nudges' image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </TabPane>
            <TabPane tab='Medium Priority' key='3'>
              {state.nudges.filter((n) => n.priority === 'medium').length > 0 ? (
                state.nudges
                  .filter((n) => n.priority === 'medium')
                  .map((nudge) => (
                    <NudgeCard
                      key={nudge.id}
                      nudge={nudge}
                      onAction={handleNudgeAction}
                      onDismiss={handleNudgeDismiss}
                    />
                  ))
              ) : (
                <Empty description='No medium priority nudges' image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </TabPane>
          </Tabs>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <Space>
                <NotificationOutlined />
                <span>Create New Nudge</span>
              </Space>
            }
            style={{ marginBottom: 16 }}
          >
            <Space direction='vertical' style={{ width: '100%' }}>
              <Select
                placeholder='Select referral (optional)'
                style={{ width: '100%' }}
                value={selectedReferral}
                onChange={setSelectedReferral}
                allowClear
              >
                {mockReferrals.map((referral) => (
                  <Option key={referral.id} value={referral.id}>
                    {referral.name}
                  </Option>
                ))}
              </Select>

              <Select placeholder='Priority' style={{ width: '100%' }} value={priority} onChange={setPriority}>
                <Option value='high'>High Priority</Option>
                <Option value='medium'>Medium Priority</Option>
                <Option value='low'>Low Priority</Option>
              </Select>

              <TextArea
                rows={4}
                placeholder='Enter nudge message'
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
              />

              <Input placeholder='Action button text' value={action} onChange={(e) => setAction(e.target.value)} />

              <Space>
                <Button type='primary' onClick={createCustomNudge} disabled={!customMessage.trim()}>
                  Create Custom Nudge
                </Button>

                <Button type='default' icon={<RobotOutlined />} onClick={generateAINudge} loading={loading}>
                  Generate AI Nudge
                </Button>
              </Space>
            </Space>
          </Card>

          <Card
            title={
              <Space>
                <RobotOutlined />
                <span>About AI Nudges</span>
              </Space>
            }
          >
            <Paragraph>AI Nudges help you stay on top of your partner activities by providing:</Paragraph>
            <ul>
              <li>Timely reminders for follow-ups</li>
              <li>Suggestions based on referral status</li>
              <li>Personalized recommendations</li>
              <li>Priority-based notifications</li>
            </ul>
            <Alert
              message='OpenAI Integration'
              description={
                openAIConfigured
                  ? 'OpenAI API is configured. AI-powered nudges and recommendations are enabled.'
                  : 'Connect your OpenAI API key to enable advanced AI-powered nudges and recommendations.'
              }
              type={openAIConfigured ? 'success' : 'info'}
              showIcon
              action={
                <Button size='small' type='primary' onClick={() => setApiKeyModalVisible(true)}>
                  {openAIConfigured ? 'Update Key' : 'Configure'}
                </Button>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* OpenAI API Key Modal */}
      <Modal
        title={
          <Space>
            <KeyOutlined />
            <span>Configure OpenAI API Key</span>
          </Space>
        }
        open={apiKeyModalVisible}
        onCancel={() => setApiKeyModalVisible(false)}
        footer={[
          <Button key='cancel' onClick={() => setApiKeyModalVisible(false)}>
            Cancel
          </Button>,
          <Button key='submit' type='primary' onClick={handleConfigureOpenAI} disabled={!apiKey.trim()}>
            Save API Key
          </Button>,
        ]}
      >
        <Form form={form} layout='vertical'>
          <Form.Item
            label='OpenAI API Key'
            required
            help='Your API key will be stored locally and used only for generating AI nudges and predictions.'
          >
            <Input.Password
              placeholder='Enter your OpenAI API key'
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </Form.Item>
          <Alert
            message='Important'
            description="You will need to provide your own OpenAI API key. This key is used to access OpenAI's services for generating AI nudges and predictions."
            type='warning'
            showIcon
            style={{ marginBottom: 16 }}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default NudgesPage;
