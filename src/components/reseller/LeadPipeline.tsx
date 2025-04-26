import React, { useState } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Drawer,
  Typography,
  Tabs,
  Timeline,
  Form,
  Input,
  Select,
  Modal,
  Divider,
  Steps,
  Row,
  Col,
  Statistic,
  Radio,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  ShopOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useApp } from '../../context/AppContext';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { Step } = Steps;
const { confirm } = Modal;

// Mock data for leads
const mockLeads = [
  {
    id: 'lead-1',
    brandName: 'Fashion Store',
    contactName: 'Alice Brown',
    contactEmail: 'alice@fashionstore.com',
    contactPhone: '+91 9876543220',
    monthlyGMV: 500000,
    vertical: 'fashion',
    platform: 'shopify',
    product: 'checkout',
    stage: 'signed',
    stageUpdatedAt: '2025-04-20T10:30:00Z',
    assignedTo: 'John Doe',
    priority: 'high',
    activities: [
      {
        date: '2025-04-10T08:30:00Z',
        action: 'Lead Created',
        user: 'John Doe',
        notes: 'Initial contact made through email',
      },
      {
        date: '2025-04-15T14:20:00Z',
        action: 'Demo Scheduled',
        user: 'John Doe',
        notes: 'Demo scheduled for April 18th',
      },
      {
        date: '2025-04-18T11:00:00Z',
        action: 'Demo Completed',
        user: 'John Doe',
        notes: 'Demo went well, client is interested',
      },
      {
        date: '2025-04-20T10:30:00Z',
        action: 'Contract Signed',
        user: 'John Doe',
        notes: 'Contract signed, implementation to begin next week',
      },
    ],
  },
  {
    id: 'lead-2',
    brandName: 'Tech Gadgets',
    contactName: 'David Lee',
    contactEmail: 'david@techgadgets.com',
    contactPhone: '+91 9876543221',
    monthlyGMV: 800000,
    vertical: 'electronics',
    platform: 'woocommerce',
    product: 'rto',
    stage: 'pitch',
    stageUpdatedAt: '2025-04-22T09:15:00Z',
    assignedTo: 'John Doe',
    priority: 'medium',
    activities: [
      {
        date: '2025-04-22T09:15:00Z',
        action: 'Lead Created',
        user: 'John Doe',
        notes: 'Initial contact made through phone',
      },
    ],
  },
  {
    id: 'lead-3',
    brandName: 'Beauty Brand',
    contactName: 'Emma Wilson',
    contactEmail: 'emma@beautybrand.com',
    contactPhone: '+91 9876543222',
    monthlyGMV: 350000,
    vertical: 'beauty',
    platform: 'magento',
    product: 'all',
    stage: 'ba_shared',
    stageUpdatedAt: '2025-04-18T16:45:00Z',
    assignedTo: 'John Doe',
    priority: 'high',
    activities: [
      {
        date: '2025-04-12T11:30:00Z',
        action: 'Lead Created',
        user: 'John Doe',
        notes: 'Initial contact made through email',
      },
      {
        date: '2025-04-15T13:20:00Z',
        action: 'Initial Call',
        user: 'John Doe',
        notes: 'Discussed requirements and pain points',
      },
      {
        date: '2025-04-18T16:45:00Z',
        action: 'Business Agreement Shared',
        user: 'John Doe',
        notes: 'Sent business agreement for review',
      },
    ],
  },
];

const LeadPipeline: React.FC = () => {
  const { addNudge } = useApp();
  const [leads, setLeads] = useState(mockLeads);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('1');

  // Get stage color
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospecting':
        return 'blue';
      case 'pitch':
        return 'cyan';
      case 'objection':
        return 'orange';
      case 'ba_shared':
        return 'purple';
      case 'signed':
        return 'green';
      case 'lost':
        return 'red';
      case 'go_live':
        return 'magenta';
      default:
        return 'default';
    }
  };

  // Get stage display name
  const getStageDisplayName = (stage: string) => {
    switch (stage) {
      case 'prospecting':
        return 'Prospecting';
      case 'pitch':
        return 'Pitch';
      case 'objection':
        return 'Objection';
      case 'ba_shared':
        return 'BA Shared';
      case 'signed':
        return 'Signed';
      case 'lost':
        return 'Lost';
      case 'go_live':
        return 'Go Live';
      default:
        return stage;
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'default';
    }
  };

  // Handle lead view
  const handleViewLead = (lead: any) => {
    setSelectedLead(lead);
    setDrawerVisible(true);
    setEditMode(false);
  };

  // Handle lead edit
  const handleEditLead = (lead: any) => {
    setSelectedLead(lead);
    form.setFieldsValue({
      brandName: lead.brandName,
      contactName: lead.contactName,
      contactEmail: lead.contactEmail,
      contactPhone: lead.contactPhone,
      monthlyGMV: lead.monthlyGMV,
      vertical: lead.vertical,
      platform: lead.platform,
      product: lead.product,
      stage: lead.stage,
      priority: lead.priority,
    });
    setDrawerVisible(true);
    setEditMode(true);
  };

  // Handle lead delete
  const handleDeleteLead = (leadId: string) => {
    confirm({
      title: 'Are you sure you want to delete this lead?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setLeads(leads.filter((lead) => lead.id !== leadId));
      },
    });
  };

  // Handle new lead
  const handleNewLead = () => {
    form.resetFields();
    form.setFieldsValue({
      stage: 'prospecting',
      priority: 'medium',
    });
    setModalVisible(true);
  };

  // Handle form submission for new lead
  const handleFormSubmit = (values: any) => {
    // Generate a unique ID for the new lead
    const newLeadId = `lead-${Date.now()}`;

    // Create a new lead object
    const newLead = {
      id: newLeadId,
      ...values,
      stageUpdatedAt: new Date().toISOString(),
      assignedTo: 'John Doe', // In a real app, this would be the current user
      activities: [
        {
          date: new Date().toISOString(),
          action: 'Lead Created',
          user: 'John Doe', // In a real app, this would be the current user
          notes: 'Initial lead creation',
        },
      ],
    };

    // Add the new lead to the leads array
    setLeads([newLead, ...leads]);

    // If stage is BA shared, create a nudge for KYC collection
    if (values.stage === 'ba_shared') {
      addNudge({
        id: `nudge-kyc-${Date.now()}`,
        message: `Please collect and submit KYC documents for ${values.brandName}`,
        priority: 'high',
        action: 'Collect KYC',
        timestamp: new Date().toISOString(),
        referralId: newLeadId,
      });
    }

    // If partner will handle KYC, create a nudge
    if (values.kycHandling === 'partner') {
      addNudge({
        id: `nudge-kyc-reminder-${Date.now()}`,
        message: `Remember to collect and submit KYC documents for ${values.brandName}`,
        priority: 'medium',
        action: 'Collect KYC',
        timestamp: new Date().toISOString(),
        referralId: newLeadId,
      });
    }

    // Close the modal
    setModalVisible(false);

    // Show success message
    Modal.success({
      title: 'Lead Created',
      content: `Lead for ${values.brandName} has been created successfully.`,
    });
  };

  // Table columns
  const columns = [
    {
      title: 'Brand',
      dataIndex: 'brandName',
      key: 'brandName',
      render: (text: string, record: any) => (
        <div>
          <Text strong>{text}</Text>
          <div>
            <Text type='secondary'>{record.vertical}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Contact',
      dataIndex: 'contactName',
      key: 'contactName',
      render: (text: string, record: any) => (
        <div>
          <Text>{text}</Text>
          <div>
            <Text type='secondary'>{record.contactEmail}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Monthly GMV',
      dataIndex: 'monthlyGMV',
      key: 'monthlyGMV',
      render: (value: number) => <Text>₹{value.toLocaleString()}</Text>,
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (product: string) => {
        let color = 'blue';
        let displayName = 'Unknown';

        switch (product) {
          case 'checkout':
            color = 'blue';
            displayName = 'Checkout';
            break;
          case 'rto':
            color = 'green';
            displayName = 'Return Prime';
            break;
          case 'engage':
            color = 'purple';
            displayName = 'Engage';
            break;
          case 'all':
            color = 'magenta';
            displayName = 'All Products';
            break;
        }

        return <Tag color={color}>{displayName}</Tag>;
      },
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
      render: (stage: string) => <Tag color={getStageColor(stage)}>{getStageDisplayName(stage)}</Tag>,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <Tag color={getPriorityColor(priority)}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size='small'>
          <Button type='text' icon={<EyeOutlined />} onClick={() => handleViewLead(record)} />
          <Button type='text' icon={<EditOutlined />} onClick={() => handleEditLead(record)} />
          <Button type='text' danger icon={<DeleteOutlined />} onClick={() => handleDeleteLead(record.id)} />
        </Space>
      ),
    },
  ];

  // Get current stage index
  const getCurrentStageIndex = (stage: string) => {
    const stages = ['prospecting', 'pitch', 'objection', 'ba_shared', 'signed', 'go_live'];
    return stages.indexOf(stage);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2}>Lead Pipeline</Title>
        <Button type='primary' icon={<PlusOutlined />} onClick={handleNewLead}>
          New Lead
        </Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title='Total Leads'
              value={leads.length}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title='Active Deals'
              value={leads.filter((lead) => lead.stage !== 'lost' && lead.stage !== 'go_live').length}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title='Closed Deals'
              value={leads.filter((lead) => lead.stage === 'signed' || lead.stage === 'go_live').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Table dataSource={leads} columns={columns} rowKey='id' pagination={{ pageSize: 10 }} />
      </Card>

      {/* Lead Detail Drawer */}
      <Drawer
        title={editMode ? 'Edit Lead' : 'Lead Details'}
        placement='right'
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={600}
      >
        {selectedLead && (
          <div>
            {!editMode && (
              <Tabs activeKey={activeTab} onChange={setActiveTab}>
                <TabPane tab='Details' key='1'>
                  <div style={{ marginBottom: 24 }}>
                    <Steps current={getCurrentStageIndex(selectedLead.stage)} progressDot>
                      <Step title='Prospecting' />
                      <Step title='Pitch' />
                      <Step title='Objection' />
                      <Step title='BA Shared' />
                      <Step title='Signed' />
                      <Step title='Go Live' />
                    </Steps>
                  </div>

                  <Divider />

                  <div style={{ marginBottom: 16 }}>
                    <Title level={4}>{selectedLead.brandName}</Title>
                    <Space>
                      <Tag color={getStageColor(selectedLead.stage)}>{getStageDisplayName(selectedLead.stage)}</Tag>
                      <Tag color={getPriorityColor(selectedLead.priority)}>
                        {selectedLead.priority.charAt(0).toUpperCase() + selectedLead.priority.slice(1)} Priority
                      </Tag>
                    </Space>
                  </div>

                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Text type='secondary'>Contact Name</Text>
                      <div>
                        <Text strong>{selectedLead.contactName}</Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <Text type='secondary'>Contact Email</Text>
                      <div>
                        <Text strong>{selectedLead.contactEmail}</Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <Text type='secondary'>Contact Phone</Text>
                      <div>
                        <Text strong>{selectedLead.contactPhone}</Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <Text type='secondary'>Monthly GMV</Text>
                      <div>
                        <Text strong>₹{selectedLead.monthlyGMV.toLocaleString()}</Text>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab='Activity History' key='2'>
                  <Timeline mode='left'>
                    {selectedLead.activities.map((activity: any, index: number) => (
                      <Timeline.Item key={index} label={new Date(activity.date).toLocaleString()}>
                        <Text strong>{activity.action}</Text>
                        <div>
                          <Text type='secondary'>by {activity.user}</Text>
                        </div>
                        {activity.notes && <div style={{ marginTop: 8 }}>{activity.notes}</div>}
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </TabPane>
              </Tabs>
            )}
          </div>
        )}
      </Drawer>

      {/* New Lead Modal */}
      <Modal
        title='Create New Lead'
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={700}
      >
        <Form form={form} layout='vertical' onFinish={handleFormSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='brandName'
                label='Brand Name'
                rules={[{ required: true, message: 'Please enter the brand name' }]}
              >
                <Input prefix={<ShopOutlined />} placeholder='Brand Name' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='vertical'
                label='Vertical'
                rules={[{ required: true, message: 'Please select the vertical' }]}
              >
                <Select placeholder='Select vertical'>
                  <Option value='fashion'>Fashion</Option>
                  <Option value='electronics'>Electronics</Option>
                  <Option value='beauty'>Beauty</Option>
                  <Option value='home'>Home & Furniture</Option>
                  <Option value='food'>Food & Grocery</Option>
                  <Option value='other'>Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='contactName'
                label='Contact Person'
                rules={[{ required: true, message: 'Please enter the contact person name' }]}
              >
                <Input prefix={<UserOutlined />} placeholder='Contact Person' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='contactEmail'
                label='Email'
                rules={[
                  { required: true, message: 'Please enter the email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder='Email' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='contactPhone'
                label='Phone'
                rules={[{ required: true, message: 'Please enter the phone number' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder='Phone' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='monthlyGMV'
                label='Monthly GMV (₹)'
                rules={[{ required: true, message: 'Please enter the monthly GMV' }]}
              >
                <Input type='number' prefix={<DollarOutlined />} placeholder='Monthly GMV' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='platform'
                label='E-commerce Platform'
                rules={[{ required: true, message: 'Please select the platform' }]}
              >
                <Select placeholder='Select platform'>
                  <Option value='shopify'>Shopify</Option>
                  <Option value='woocommerce'>WooCommerce</Option>
                  <Option value='magento'>Magento</Option>
                  <Option value='custom'>Custom Platform</Option>
                  <Option value='other'>Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='product'
                label='Interested Product'
                rules={[{ required: true, message: 'Please select the product' }]}
              >
                <Select placeholder='Select product'>
                  <Option value='checkout'>GoKwik Checkout</Option>
                  <Option value='rto'>Return Prime</Option>
                  <Option value='engage'>KwikEngage</Option>
                  <Option value='all'>All Products</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name='stage' label='Stage' rules={[{ required: true, message: 'Please select the stage' }]}>
                <Select placeholder='Select stage'>
                  <Option value='prospecting'>Prospecting</Option>
                  <Option value='pitch'>Pitch</Option>
                  <Option value='objection'>Objection</Option>
                  <Option value='ba_shared'>BA Shared</Option>
                  <Option value='signed'>Signed</Option>
                  <Option value='go_live'>Go Live</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='priority'
                label='Priority'
                rules={[{ required: true, message: 'Please select the priority' }]}
              >
                <Select placeholder='Select priority'>
                  <Option value='high'>High</Option>
                  <Option value='medium'>Medium</Option>
                  <Option value='low'>Low</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name='kycHandling'
            label='KYC Handling Preference'
            rules={[{ required: true, message: 'Please select who will handle KYC' }]}
          >
            <Radio.Group>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Radio
                  value='partner'
                  style={{
                    width: '100%',
                    height: 'auto',
                    padding: '8px 16px',
                    border: '1px solid #f0f0f0',
                    borderRadius: '2px',
                  }}
                >
                  <div>
                    <Text strong>I will collect KYC documents</Text>
                    <div>
                      <Text type='secondary'>
                        You'll be responsible for collecting and submitting all required KYC documents from the
                        merchant.
                      </Text>
                    </div>
                  </div>
                </Radio>

                <Radio
                  value='gokwik'
                  style={{
                    width: '100%',
                    height: 'auto',
                    padding: '8px 16px',
                    border: '1px solid #f0f0f0',
                    borderRadius: '2px',
                  }}
                >
                  <div>
                    <Text strong>GoKwik will handle KYC</Text>
                    <div>
                      <Text type='secondary'>
                        GoKwik team will reach out to the merchant directly to collect KYC documents.
                      </Text>
                    </div>
                  </div>
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button style={{ marginRight: 8 }} onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
              <Button type='primary' htmlType='submit'>
                Create Lead
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LeadPipeline;
