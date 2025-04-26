import React, { useState } from 'react';
import {
  Card,
  Typography,
  Table,
  Tag,
  Space,
  Button,
  Row,
  Col,
  Statistic,
  Progress,
  Tabs,
  Drawer,
  Descriptions,
  Timeline,
  Badge,
  Avatar,
  List,
} from 'antd';
import {
  ShopOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ToolOutlined,
  EyeOutlined,
  PhoneOutlined,
  MailOutlined,
  TeamOutlined,
  AppstoreOutlined,
  CodeOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Mock data for assigned brands
const mockBrands = [
  {
    id: 'brand-1',
    name: 'Fashion Store',
    website: 'https://fashionstore.com',
    vertical: 'fashion',
    platform: 'shopify',
    products: ['checkout', 'rto'],
    status: 'live',
    integrationProgress: 100,
    goLiveDate: '2025-04-15T00:00:00Z',
    contacts: [
      {
        name: 'Alice Brown',
        role: 'Tech Lead',
        email: 'alice@fashionstore.com',
        phone: '+91 9876543220',
      },
      {
        name: 'Bob Smith',
        role: 'CTO',
        email: 'bob@fashionstore.com',
        phone: '+91 9876543221',
      },
    ],
    timeline: [
      {
        date: '2025-03-01T00:00:00Z',
        action: 'Brand Assigned',
        user: 'Admin',
      },
      {
        date: '2025-03-05T00:00:00Z',
        action: 'Kickoff Call',
        user: 'John Doe',
      },
      {
        date: '2025-03-15T00:00:00Z',
        action: 'Integration Started',
        user: 'John Doe',
      },
      {
        date: '2025-04-10T00:00:00Z',
        action: 'Testing Completed',
        user: 'John Doe',
      },
      {
        date: '2025-04-15T00:00:00Z',
        action: 'Go Live',
        user: 'John Doe',
      },
    ],
  },
  {
    id: 'brand-2',
    name: 'Tech Gadgets',
    website: 'https://techgadgets.com',
    vertical: 'electronics',
    platform: 'woocommerce',
    products: ['checkout'],
    status: 'in_progress',
    integrationProgress: 60,
    goLiveDate: '2025-05-15T00:00:00Z',
    contacts: [
      {
        name: 'David Lee',
        role: 'Developer',
        email: 'david@techgadgets.com',
        phone: '+91 9876543222',
      },
    ],
    timeline: [
      {
        date: '2025-04-01T00:00:00Z',
        action: 'Brand Assigned',
        user: 'Admin',
      },
      {
        date: '2025-04-05T00:00:00Z',
        action: 'Kickoff Call',
        user: 'John Doe',
      },
      {
        date: '2025-04-15T00:00:00Z',
        action: 'Integration Started',
        user: 'John Doe',
      },
    ],
  },
  {
    id: 'brand-3',
    name: 'Beauty Brand',
    website: 'https://beautybrand.com',
    vertical: 'beauty',
    platform: 'magento',
    products: ['checkout', 'engage'],
    status: 'pending',
    integrationProgress: 0,
    goLiveDate: '2025-06-01T00:00:00Z',
    contacts: [
      {
        name: 'Emma Wilson',
        role: 'Product Manager',
        email: 'emma@beautybrand.com',
        phone: '+91 9876543223',
      },
    ],
    timeline: [
      {
        date: '2025-04-20T00:00:00Z',
        action: 'Brand Assigned',
        user: 'Admin',
      },
    ],
  },
];

const AssignedBrands: React.FC = () => {
  const [brands, setBrands] = useState(mockBrands);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  // Get status tag
  const getStatusTag = (status: string) => {
    switch (status) {
      case 'live':
        return (
          <Tag icon={<CheckCircleOutlined />} color='success'>
            Live
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

  // Handle brand view
  const handleViewBrand = (brand: any) => {
    setSelectedBrand(brand);
    setDrawerVisible(true);
    setActiveTab('1');
  };

  // Table columns
  const columns = [
    {
      title: 'Brand',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
      render: (platform: string) => platform.charAt(0).toUpperCase() + platform.slice(1),
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      render: (products: string[]) => <Space>{products.map((product) => getProductTag(product))}</Space>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: 'Progress',
      dataIndex: 'integrationProgress',
      key: 'integrationProgress',
      render: (progress: number) => <Progress percent={progress} size='small' />,
    },
    {
      title: 'Go Live Date',
      dataIndex: 'goLiveDate',
      key: 'goLiveDate',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Button type='primary' icon={<EyeOutlined />} size='small' onClick={() => handleViewBrand(record)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Assigned Brands</Title>
      <Paragraph>
        Manage the brands assigned to you for integration and support. Track progress and access technical resources.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title='Total Brands'
              value={brands.length}
              prefix={<ShopOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title='Live Brands'
              value={brands.filter((brand) => brand.status === 'live').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title='In Progress'
              value={brands.filter((brand) => brand.status === 'in_progress').length}
              prefix={<ToolOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Table dataSource={brands} columns={columns} rowKey='id' pagination={{ pageSize: 10 }} />
      </Card>

      {/* Brand Detail Drawer */}
      <Drawer
        title={selectedBrand ? `${selectedBrand.name} Details` : 'Brand Details'}
        placement='right'
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={600}
      >
        {selectedBrand && (
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab='Overview' key='1'>
              <Descriptions bordered column={1}>
                <Descriptions.Item label='Brand Name'>{selectedBrand.name}</Descriptions.Item>
                <Descriptions.Item label='Website'>
                  <a href={selectedBrand.website} target='_blank' rel='noopener noreferrer'>
                    {selectedBrand.website}
                  </a>
                </Descriptions.Item>
                <Descriptions.Item label='Vertical'>{selectedBrand.vertical}</Descriptions.Item>
                <Descriptions.Item label='Platform'>{selectedBrand.platform}</Descriptions.Item>
                <Descriptions.Item label='Products'>
                  <Space>{selectedBrand.products.map((product: string) => getProductTag(product))}</Space>
                </Descriptions.Item>
                <Descriptions.Item label='Status'>{getStatusTag(selectedBrand.status)}</Descriptions.Item>
                <Descriptions.Item label='Integration Progress'>
                  <Progress percent={selectedBrand.integrationProgress} />
                </Descriptions.Item>
                <Descriptions.Item label='Go Live Date'>
                  {new Date(selectedBrand.goLiveDate).toLocaleDateString()}
                </Descriptions.Item>
              </Descriptions>

              <Title level={4} style={{ marginTop: 24 }}>
                Contacts
              </Title>
              <List
                itemLayout='horizontal'
                dataSource={selectedBrand.contacts}
                renderItem={(contact: any) => (
                  <List.Item
                    actions={[
                      <Button
                        type='link'
                        icon={<MailOutlined />}
                        onClick={() => window.open(`mailto:${contact.email}`)}
                      >
                        Email
                      </Button>,
                      <Button type='link' icon={<PhoneOutlined />} onClick={() => window.open(`tel:${contact.phone}`)}>
                        Call
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={contact.name}
                      description={
                        <div>
                          <div>{contact.role}</div>
                          <div>{contact.email}</div>
                          <div>{contact.phone}</div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </TabPane>

            <TabPane tab='Timeline' key='2'>
              <Timeline mode='left'>
                {selectedBrand.timeline.map((event: any, index: number) => (
                  <Timeline.Item key={index} label={new Date(event.date).toLocaleDateString()}>
                    <Text strong>{event.action}</Text>
                    <div>
                      <Text type='secondary'>by {event.user}</Text>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </TabPane>

            <TabPane tab='Integration' key='3'>
              <div style={{ marginBottom: 16 }}>
                <Progress
                  percent={selectedBrand.integrationProgress}
                  status={selectedBrand.integrationProgress === 100 ? 'success' : 'active'}
                />
              </div>

              <List
                itemLayout='horizontal'
                dataSource={selectedBrand.products}
                renderItem={(product: string) => {
                  const isCompleted = selectedBrand.status === 'live';
                  const isInProgress = selectedBrand.status === 'in_progress';

                  return (
                    <List.Item
                      actions={[
                        <Button type='link' icon={<CodeOutlined />}>
                          View Setup
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          isCompleted ? (
                            <Badge status='success' />
                          ) : isInProgress ? (
                            <Badge status='processing' />
                          ) : (
                            <Badge status='default' />
                          )
                        }
                        title={
                          <Space>
                            {getProductTag(product)}
                            {isCompleted && <Tag color='success'>Completed</Tag>}
                            {isInProgress && <Tag color='processing'>In Progress</Tag>}
                            {!isCompleted && !isInProgress && <Tag color='default'>Not Started</Tag>}
                          </Space>
                        }
                        description={
                          <div>
                            <Text type='secondary'>
                              {product === 'checkout'
                                ? 'Checkout integration includes API setup, webhook configuration, and UI customization.'
                                : product === 'rto'
                                ? 'Return Prime integration includes return policy configuration and RTO dashboard setup.'
                                : 'Engage integration includes customer communication preferences and notification templates.'}
                            </Text>
                          </div>
                        }
                      />
                    </List.Item>
                  );
                }}
              />
            </TabPane>
          </Tabs>
        )}
      </Drawer>
    </div>
  );
};

export default AssignedBrands;
