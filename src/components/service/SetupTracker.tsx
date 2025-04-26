import React, { useState } from 'react';
import {
  Card,
  Typography,
  Steps,
  Button,
  List,
  Tag,
  Space,
  Row,
  Col,
  Statistic,
  Progress,
  Tabs,
  Collapse,
  Timeline,
  Divider,
  Badge,
  Select,
  Input,
  Form,
  Modal,
  Alert,
  Switch,
} from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  RightCircleOutlined,
  ShopOutlined,
  CodeOutlined,
  ApiOutlined,
  SettingOutlined,
  BugOutlined,
  RocketOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;

// Define types for our data
interface Task {
  id: string;
  title: string;
  completed: boolean;
  notes: string;
}

interface TimelineEvent {
  date: string;
  action: string;
  user: string;
}

interface Setup {
  id: string;
  brandName: string;
  brandId: string;
  product: string;
  status: string;
  progress: number;
  startDate: string | null;
  completionDate: string | null;
  tasks: Task[];
  timeline: TimelineEvent[];
}

// Mock data for setup tasks
const mockSetups: Setup[] = [
  {
    id: 'setup-1',
    brandName: 'Fashion Store',
    brandId: 'brand-1',
    product: 'checkout',
    status: 'completed',
    progress: 100,
    startDate: '2025-03-15T00:00:00Z',
    completionDate: '2025-04-15T00:00:00Z',
    tasks: [
      { id: 'task-1-1', title: 'API Integration', completed: true, notes: 'API keys generated and integrated' },
      { id: 'task-1-2', title: 'Webhook Setup', completed: true, notes: 'Webhooks configured for order events' },
      {
        id: 'task-1-3',
        title: 'UI Customization',
        completed: true,
        notes: 'Checkout UI customized to match brand style',
      },
      { id: 'task-1-4', title: 'Testing', completed: true, notes: 'All test cases passed' },
      { id: 'task-1-5', title: 'Go Live', completed: true, notes: 'Successfully deployed to production' },
    ],
    timeline: [
      { date: '2025-03-15T00:00:00Z', action: 'Setup Started', user: 'John Doe' },
      { date: '2025-03-20T00:00:00Z', action: 'API Integration Completed', user: 'John Doe' },
      { date: '2025-03-25T00:00:00Z', action: 'Webhook Setup Completed', user: 'John Doe' },
      { date: '2025-04-05T00:00:00Z', action: 'UI Customization Completed', user: 'John Doe' },
      { date: '2025-04-10T00:00:00Z', action: 'Testing Completed', user: 'John Doe' },
      { date: '2025-04-15T00:00:00Z', action: 'Go Live', user: 'John Doe' },
    ],
  },
  {
    id: 'setup-2',
    brandName: 'Fashion Store',
    brandId: 'brand-1',
    product: 'rto',
    status: 'completed',
    progress: 100,
    startDate: '2025-03-20T00:00:00Z',
    completionDate: '2025-04-15T00:00:00Z',
    tasks: [
      { id: 'task-2-1', title: 'Return Policy Configuration', completed: true, notes: 'Return policy configured' },
      { id: 'task-2-2', title: 'RTO Dashboard Setup', completed: true, notes: 'Dashboard configured for brand' },
      { id: 'task-2-3', title: 'Testing', completed: true, notes: 'All test cases passed' },
      { id: 'task-2-4', title: 'Go Live', completed: true, notes: 'Successfully deployed to production' },
    ],
    timeline: [
      { date: '2025-03-20T00:00:00Z', action: 'Setup Started', user: 'John Doe' },
      { date: '2025-03-30T00:00:00Z', action: 'Return Policy Configuration Completed', user: 'John Doe' },
      { date: '2025-04-05T00:00:00Z', action: 'RTO Dashboard Setup Completed', user: 'John Doe' },
      { date: '2025-04-10T00:00:00Z', action: 'Testing Completed', user: 'John Doe' },
      { date: '2025-04-15T00:00:00Z', action: 'Go Live', user: 'John Doe' },
    ],
  },
  {
    id: 'setup-3',
    brandName: 'Tech Gadgets',
    brandId: 'brand-2',
    product: 'checkout',
    status: 'in_progress',
    progress: 60,
    startDate: '2025-04-15T00:00:00Z',
    completionDate: null,
    tasks: [
      { id: 'task-3-1', title: 'API Integration', completed: true, notes: 'API keys generated and integrated' },
      { id: 'task-3-2', title: 'Webhook Setup', completed: true, notes: 'Webhooks configured for order events' },
      { id: 'task-3-3', title: 'UI Customization', completed: false, notes: 'In progress' },
      { id: 'task-3-4', title: 'Testing', completed: false, notes: '' },
      { id: 'task-3-5', title: 'Go Live', completed: false, notes: '' },
    ],
    timeline: [
      { date: '2025-04-15T00:00:00Z', action: 'Setup Started', user: 'John Doe' },
      { date: '2025-04-20T00:00:00Z', action: 'API Integration Completed', user: 'John Doe' },
      { date: '2025-04-25T00:00:00Z', action: 'Webhook Setup Completed', user: 'John Doe' },
    ],
  },
  {
    id: 'setup-4',
    brandName: 'Beauty Brand',
    brandId: 'brand-3',
    product: 'checkout',
    status: 'pending',
    progress: 0,
    startDate: null,
    completionDate: null,
    tasks: [
      { id: 'task-4-1', title: 'API Integration', completed: false, notes: '' },
      { id: 'task-4-2', title: 'Webhook Setup', completed: false, notes: '' },
      { id: 'task-4-3', title: 'UI Customization', completed: false, notes: '' },
      { id: 'task-4-4', title: 'Testing', completed: false, notes: '' },
      { id: 'task-4-5', title: 'Go Live', completed: false, notes: '' },
    ],
    timeline: [],
  },
  {
    id: 'setup-5',
    brandName: 'Beauty Brand',
    brandId: 'brand-3',
    product: 'engage',
    status: 'pending',
    progress: 0,
    startDate: null,
    completionDate: null,
    tasks: [
      { id: 'task-5-1', title: 'Communication Preferences Setup', completed: false, notes: '' },
      { id: 'task-5-2', title: 'Notification Templates', completed: false, notes: '' },
      { id: 'task-5-3', title: 'Testing', completed: false, notes: '' },
      { id: 'task-5-4', title: 'Go Live', completed: false, notes: '' },
    ],
    timeline: [],
  },
];

const SetupTracker: React.FC = () => {
  const [setups, setSetups] = useState<Setup[]>(mockSetups);
  const [selectedSetup, setSelectedSetup] = useState<Setup | null>(null);
  const [activeTab, setActiveTab] = useState('1');
  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [productFilter, setProductFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [taskForm] = Form.useForm();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Get status tag
  const getStatusTag = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Tag icon={<CheckCircleOutlined />} color='success'>
            Completed
          </Tag>
        );
      case 'in_progress':
        return (
          <Tag icon={<ClockCircleOutlined />} color='processing'>
            In Progress
          </Tag>
        );
      case 'pending':
        return (
          <Tag icon={<ClockCircleOutlined />} color='warning'>
            Pending
          </Tag>
        );
      default:
        return <Tag color='default'>{status}</Tag>;
    }
  };

  // Get product tag
  const getProductTag = (product: string) => {
    switch (product) {
      case 'checkout':
        return <Tag color='blue'>Checkout</Tag>;
      case 'rto':
        return <Tag color='green'>Return Prime</Tag>;
      case 'engage':
        return <Tag color='purple'>Engage</Tag>;
      default:
        return <Tag>{product}</Tag>;
    }
  };

  // Handle setup selection
  const handleSelectSetup = (setup: Setup) => {
    setSelectedSetup(setup);
    setActiveTab('1');
  };

  // Handle task update
  const handleTaskUpdate = (setupId: string, taskId: string, completed: boolean, notes: string) => {
    const updatedSetups = setups.map((setup) => {
      if (setup.id === setupId) {
        const updatedTasks = setup.tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, completed, notes };
          }
          return task;
        });

        // Calculate new progress
        const completedTasks = updatedTasks.filter((task) => task.completed).length;
        const progress = Math.round((completedTasks / updatedTasks.length) * 100);

        // Update timeline if task is newly completed
        let updatedTimeline = [...setup.timeline];
        const task = setup.tasks.find((t) => t.id === taskId);
        if (completed && !task?.completed) {
          updatedTimeline.push({
            date: new Date().toISOString(),
            action: `${updatedTasks.find((t) => t.id === taskId)?.title} Completed`,
            user: 'John Doe',
          });
        }

        // Update status
        let status = setup.status;
        if (progress === 100) {
          status = 'completed';
        } else if (progress > 0) {
          status = 'in_progress';
        }

        // Update completion date if all tasks are completed
        let completionDate = setup.completionDate;
        if (progress === 100 && setup.progress !== 100) {
          completionDate = new Date().toISOString();
        }

        const updatedSetup = {
          ...setup,
          tasks: updatedTasks,
          progress,
          status,
          completionDate,
          timeline: updatedTimeline,
        };

        // Update selected setup if it's the one being modified
        if (selectedSetup && selectedSetup.id === setupId) {
          setSelectedSetup(updatedSetup);
        }

        return updatedSetup;
      }
      return setup;
    });

    setSetups(updatedSetups);
    setTaskModalVisible(false);
    taskForm.resetFields();
  };

  // Filter setups
  const filteredSetups = setups.filter((setup) => {
    const matchesBrand = brandFilter.length === 0 || brandFilter.includes(setup.brandId);
    const matchesProduct = productFilter.length === 0 || productFilter.includes(setup.product);
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(setup.status);
    return matchesBrand && matchesProduct && matchesStatus;
  });

  // Get unique brands
  const uniqueBrands = Array.from(new Set(setups.map((setup) => setup.brandId))).map((brandId) => {
    const setup = setups.find((s) => s.brandId === brandId);
    return { id: brandId, name: setup?.brandName };
  });

  // Get unique products
  const uniqueProducts = Array.from(new Set(setups.map((setup) => setup.product)));

  // Render setup list
  const renderSetupList = () => {
    return (
      <List
        dataSource={filteredSetups}
        renderItem={(setup) => (
          <List.Item
            key={setup.id}
            onClick={() => handleSelectSetup(setup)}
            style={{
              cursor: 'pointer',
              backgroundColor: selectedSetup && selectedSetup.id === setup.id ? '#f0f5ff' : 'transparent',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '12px',
              transition: 'all 0.3s ease',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            <List.Item.Meta
              title={
                <div className='flex flex-col items-start'>
                  <Text strong style={{ fontSize: '16px', marginRight: '12px' }}>
                    {setup.brandName}
                  </Text>
                  <Space size={8}>
                    {getProductTag(setup.product)}
                    {getStatusTag(setup.status)}
                  </Space>
                </div>
              }
              description={
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <Text type='secondary' style={{ fontSize: '14px' }}>
                    {setup.tasks.filter((task) => task.completed).length} of {setup.tasks.length} tasks completed
                  </Text>
                  {setup.startDate && (
                    <Text type='secondary' style={{ fontSize: '14px' }}>
                      Started: {new Date(setup.startDate).toLocaleDateString()}
                    </Text>
                  )}
                </div>
              }
              style={{ marginBottom: '8px' }}
            />
            <Progress
              percent={setup.progress}
              size='small'
              status={setup.progress === 100 ? 'success' : 'active'}
              style={{ width: '120px', marginLeft: '8px' }}
            />
          </List.Item>
        )}
      />
    );
  };

  return (
    <div>
      <Title level={2}>Setup Tracker</Title>
      <Paragraph>
        Track the setup progress for each brand and product. Manage tasks, update status, and view timelines.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card
            style={{
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              height: '100%',
            }}
            bodyStyle={{ padding: '20px' }}
          >
            <Statistic
              title={
                <Text strong style={{ fontSize: '16px' }}>
                  Total Setups
                </Text>
              }
              value={setups.length}
              prefix={
                <CodeOutlined
                  style={{ backgroundColor: '#e6f7ff', padding: '8px', borderRadius: '50%', color: '#1890ff' }}
                />
              }
              valueStyle={{ color: '#1890ff', fontSize: '28px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            style={{
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              height: '100%',
            }}
            bodyStyle={{ padding: '20px' }}
          >
            <Statistic
              title={
                <Text strong style={{ fontSize: '16px' }}>
                  Completed
                </Text>
              }
              value={setups.filter((setup) => setup.status === 'completed').length}
              prefix={
                <CheckCircleOutlined
                  style={{ backgroundColor: '#f6ffed', padding: '8px', borderRadius: '50%', color: '#52c41a' }}
                />
              }
              valueStyle={{ color: '#52c41a', fontSize: '28px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            style={{
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              height: '100%',
            }}
            bodyStyle={{ padding: '20px' }}
          >
            <Statistic
              title={
                <Text strong style={{ fontSize: '16px' }}>
                  In Progress
                </Text>
              }
              value={setups.filter((setup) => setup.status === 'in_progress').length}
              prefix={
                <ClockCircleOutlined
                  style={{ backgroundColor: '#fff7e6', padding: '8px', borderRadius: '50%', color: '#faad14' }}
                />
              }
              valueStyle={{ color: '#faad14', fontSize: '28px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col xs={24} md={8}>
          <Card
            title={
              <Text strong style={{ fontSize: '18px' }}>
                Setup List
              </Text>
            }
            style={{
              marginBottom: 24,
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
            headStyle={{
              borderBottom: '1px solid #f0f0f0',
              padding: '16px 24px',
            }}
            bodyStyle={{
              padding: '16px 24px',
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <div style={{ marginBottom: 12 }}>
                <Text strong style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                  <FilterOutlined style={{ marginRight: 6 }} /> Filters
                </Text>
              </div>
              <Space direction='vertical' style={{ width: '100%' }} size={12}>
                <Select
                  mode='multiple'
                  placeholder='Filter by Brand'
                  style={{ width: '100%' }}
                  value={brandFilter}
                  onChange={setBrandFilter}
                  maxTagCount={2}
                  dropdownStyle={{ borderRadius: '6px' }}
                >
                  {uniqueBrands.map((brand) => (
                    <Option key={brand.id} value={brand.id}>
                      {brand.name}
                    </Option>
                  ))}
                </Select>
                <Select
                  mode='multiple'
                  placeholder='Filter by Product'
                  style={{ width: '100%' }}
                  value={productFilter}
                  onChange={setProductFilter}
                  maxTagCount={2}
                  dropdownStyle={{ borderRadius: '6px' }}
                >
                  {uniqueProducts.map((product) => (
                    <Option key={product} value={product}>
                      {product.charAt(0).toUpperCase() + product.slice(1)}
                    </Option>
                  ))}
                </Select>
                <Select
                  mode='multiple'
                  placeholder='Filter by Status'
                  style={{ width: '100%' }}
                  value={statusFilter}
                  onChange={setStatusFilter}
                  maxTagCount={2}
                  dropdownStyle={{ borderRadius: '6px' }}
                >
                  <Option value='completed'>Completed</Option>
                  <Option value='in_progress'>In Progress</Option>
                  <Option value='pending'>Pending</Option>
                </Select>
              </Space>
              <Divider style={{ margin: '16px 0' }} />
            </div>
            {renderSetupList()}
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card
            style={{
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
            bodyStyle={{
              padding: '16px 24px',
            }}
          >
            {selectedSetup ? (
              <Tabs activeKey={activeTab} onChange={setActiveTab}>
                <TabPane tab='Overview' key='1'>
                  <div style={{ marginBottom: 24 }}>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Text type='secondary'>Brand</Text>
                        <div>
                          <Text strong>{selectedSetup.brandName}</Text>
                        </div>
                      </Col>
                      <Col span={12}>
                        <Text type='secondary'>Product</Text>
                        <div>{getProductTag(selectedSetup.product)}</div>
                      </Col>
                      <Col span={12}>
                        <Text type='secondary'>Status</Text>
                        <div>{getStatusTag(selectedSetup.status)}</div>
                      </Col>
                      <Col span={12}>
                        <Text type='secondary'>Progress</Text>
                        <div>
                          <Progress percent={selectedSetup.progress} />
                        </div>
                      </Col>
                      {selectedSetup.startDate && (
                        <Col span={12}>
                          <Text type='secondary'>Start Date</Text>
                          <div>
                            <Text>{new Date(selectedSetup.startDate).toLocaleDateString()}</Text>
                          </div>
                        </Col>
                      )}
                      {selectedSetup.completionDate && (
                        <Col span={12}>
                          <Text type='secondary'>Completion Date</Text>
                          <div>
                            <Text>{new Date(selectedSetup.completionDate).toLocaleDateString()}</Text>
                          </div>
                        </Col>
                      )}
                    </Row>
                  </div>

                  <Divider orientation='left'>Tasks</Divider>

                  <List
                    dataSource={selectedSetup.tasks}
                    renderItem={(task: Task) => (
                      <List.Item
                        style={{
                          padding: '12px',
                          borderRadius: '6px',
                          marginBottom: '8px',
                          border: '1px solid #f0f0f0',
                          transition: 'all 0.2s ease',
                        }}
                        actions={[
                          <Button
                            type='primary'
                            size='small'
                            onClick={() => {
                              setSelectedTask(task);
                              taskForm.setFieldsValue({
                                completed: task.completed,
                                notes: task.notes,
                              });
                              setTaskModalVisible(true);
                            }}
                          >
                            Update
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            task.completed ? (
                              <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 24 }} />
                            ) : (
                              <ClockCircleOutlined style={{ color: '#1890ff', fontSize: 24 }} />
                            )
                          }
                          title={
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                              <Text strong style={{ marginRight: '8px' }}>
                                {task.title}
                              </Text>
                              {task.completed ? (
                                <Tag color='success'>Completed</Tag>
                              ) : (
                                <Tag color='processing'>Pending</Tag>
                              )}
                            </div>
                          }
                          description={
                            <Text type='secondary' style={{ fontSize: '14px' }}>
                              {task.notes || 'No notes'}
                            </Text>
                          }
                        />
                      </List.Item>
                    )}
                    style={{ marginBottom: '16px' }}
                  />
                </TabPane>

                <TabPane tab='Timeline' key='2'>
                  <Timeline mode='left'>
                    {selectedSetup.timeline.map((event: TimelineEvent, index: number) => (
                      <Timeline.Item key={index} label={new Date(event.date).toLocaleString()}>
                        <Text strong>{event.action}</Text>
                        <div>
                          <Text type='secondary'>by {event.user}</Text>
                        </div>
                      </Timeline.Item>
                    ))}
                    {selectedSetup.timeline.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <Text type='secondary'>No timeline events yet</Text>
                      </div>
                    )}
                  </Timeline>
                </TabPane>

                <TabPane tab='Setup Guide' key='3'>
                  <Alert
                    message={`${
                      selectedSetup.product.charAt(0).toUpperCase() + selectedSetup.product.slice(1)
                    } Setup Guide`}
                    description={`Follow these steps to complete the ${selectedSetup.product} setup for ${selectedSetup.brandName}.`}
                    type='info'
                    showIcon
                    style={{ marginBottom: 16 }}
                  />

                  <Collapse defaultActiveKey={['1']}>
                    {selectedSetup.product === 'checkout' && (
                      <>
                        <Panel header='1. API Integration' key='1'>
                          <Paragraph>
                            <Text strong>API Integration Steps:</Text>
                          </Paragraph>
                          <ol>
                            <li>Generate API keys from the GoKwik dashboard</li>
                            <li>Add the API keys to the brand's platform</li>
                            <li>Configure API endpoints for order processing</li>
                            <li>Test API connectivity</li>
                          </ol>
                          <Paragraph>
                            <Text type='secondary'>
                              Refer to the <a href='#'>API Documentation</a> for detailed instructions.
                            </Text>
                          </Paragraph>
                        </Panel>
                        <Panel header='2. Webhook Setup' key='2'>
                          <Paragraph>
                            <Text strong>Webhook Setup Steps:</Text>
                          </Paragraph>
                          <ol>
                            <li>Configure webhook endpoints in the brand's platform</li>
                            <li>Set up event listeners for order events</li>
                            <li>Test webhook delivery</li>
                          </ol>
                          <Paragraph>
                            <Text type='secondary'>
                              Refer to the <a href='#'>Webhook Documentation</a> for detailed instructions.
                            </Text>
                          </Paragraph>
                        </Panel>
                        <Panel header='3. UI Customization' key='3'>
                          <Paragraph>
                            <Text strong>UI Customization Steps:</Text>
                          </Paragraph>
                          <ol>
                            <li>Customize checkout UI to match brand style</li>
                            <li>Configure payment options</li>
                            <li>Set up address validation</li>
                            <li>Test UI flow</li>
                          </ol>
                          <Paragraph>
                            <Text type='secondary'>
                              Refer to the <a href='#'>UI Customization Guide</a> for detailed instructions.
                            </Text>
                          </Paragraph>
                        </Panel>
                      </>
                    )}

                    {selectedSetup.product === 'rto' && (
                      <>
                        <Panel header='1. Return Policy Configuration' key='1'>
                          <Paragraph>
                            <Text strong>Return Policy Configuration Steps:</Text>
                          </Paragraph>
                          <ol>
                            <li>Configure return policy rules</li>
                            <li>Set up return eligibility criteria</li>
                            <li>Configure return processing workflow</li>
                          </ol>
                          <Paragraph>
                            <Text type='secondary'>
                              Refer to the <a href='#'>Return Policy Guide</a> for detailed instructions.
                            </Text>
                          </Paragraph>
                        </Panel>
                        <Panel header='2. RTO Dashboard Setup' key='2'>
                          <Paragraph>
                            <Text strong>RTO Dashboard Setup Steps:</Text>
                          </Paragraph>
                          <ol>
                            <li>Configure RTO dashboard for the brand</li>
                            <li>Set up user access and permissions</li>
                            <li>Configure reporting and analytics</li>
                          </ol>
                          <Paragraph>
                            <Text type='secondary'>
                              Refer to the <a href='#'>RTO Dashboard Guide</a> for detailed instructions.
                            </Text>
                          </Paragraph>
                        </Panel>
                      </>
                    )}

                    {selectedSetup.product === 'engage' && (
                      <>
                        <Panel header='1. Communication Preferences Setup' key='1'>
                          <Paragraph>
                            <Text strong>Communication Preferences Setup Steps:</Text>
                          </Paragraph>
                          <ol>
                            <li>Configure communication channels</li>
                            <li>Set up customer preference center</li>
                            <li>Configure opt-in/opt-out workflows</li>
                          </ol>
                          <Paragraph>
                            <Text type='secondary'>
                              Refer to the <a href='#'>Communication Preferences Guide</a> for detailed instructions.
                            </Text>
                          </Paragraph>
                        </Panel>
                        <Panel header='2. Notification Templates' key='2'>
                          <Paragraph>
                            <Text strong>Notification Templates Setup Steps:</Text>
                          </Paragraph>
                          <ol>
                            <li>Configure email templates</li>
                            <li>Set up SMS templates</li>
                            <li>Configure push notification templates</li>
                          </ol>
                          <Paragraph>
                            <Text type='secondary'>
                              Refer to the <a href='#'>Notification Templates Guide</a> for detailed instructions.
                            </Text>
                          </Paragraph>
                        </Panel>
                      </>
                    )}

                    <Panel header='Testing' key='4'>
                      <Paragraph>
                        <Text strong>Testing Steps:</Text>
                      </Paragraph>
                      <ol>
                        <li>Create test scenarios</li>
                        <li>Execute test cases</li>
                        <li>Document test results</li>
                        <li>Fix any issues found during testing</li>
                      </ol>
                      <Paragraph>
                        <Text type='secondary'>
                          Refer to the <a href='#'>Testing Guide</a> for detailed instructions.
                        </Text>
                      </Paragraph>
                    </Panel>

                    <Panel header='Go Live' key='5'>
                      <Paragraph>
                        <Text strong>Go Live Steps:</Text>
                      </Paragraph>
                      <ol>
                        <li>Perform final checks</li>
                        <li>Deploy to production</li>
                        <li>Monitor initial transactions</li>
                        <li>Provide post-launch support</li>
                      </ol>
                      <Paragraph>
                        <Text type='secondary'>
                          Refer to the <a href='#'>Go Live Checklist</a> for detailed instructions.
                        </Text>
                      </Paragraph>
                    </Panel>
                  </Collapse>
                </TabPane>
              </Tabs>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Text type='secondary'>Select a setup to view details</Text>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Task Update Modal */}
      <Modal
        title={selectedTask ? `Update: ${selectedTask.title}` : 'Update Task'}
        open={taskModalVisible}
        onCancel={() => setTaskModalVisible(false)}
        footer={null}
      >
        {selectedTask && selectedSetup && (
          <Form
            form={taskForm}
            layout='vertical'
            onFinish={(values) => {
              handleTaskUpdate(selectedSetup.id, selectedTask.id, values.completed, values.notes);
            }}
          >
            <Form.Item name='completed' valuePropName='checked' label='Completed'>
              <Switch />
            </Form.Item>
            <Form.Item name='notes' label='Notes'>
              <TextArea rows={4} placeholder='Add notes about this task' />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' block>
                Update Task
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default SetupTracker;
