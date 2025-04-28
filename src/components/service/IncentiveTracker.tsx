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
  DatePicker,
  Select,
  Divider,
  Timeline,
  Badge,
  Alert,
  Modal,
  Tooltip,
  List,
} from 'antd';
import {
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  RiseOutlined,
  BarChartOutlined,
  CalendarOutlined,
  ShopOutlined,
  FileOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
  TrophyOutlined,
  TeamOutlined,
  RocketOutlined,
  StarOutlined,
  StarFilled,
} from '@ant-design/icons';
import { Line, Pie } from '@ant-design/charts';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

// Mock data for incentives
const mockIncentives = [
  {
    id: 'inc-1',
    brandName: 'Fashion Store',
    brandId: 'brand-1',
    product: 'checkout',
    amount: 15000,
    status: 'paid',
    paidDate: '2025-04-15T00:00:00Z',
    dueDate: '2025-04-10T00:00:00Z',
    type: 'integration',
    details: {
      integrationType: 'checkout',
      completionDate: '2025-04-05T00:00:00Z',
    },
  },
  {
    id: 'inc-2',
    brandName: 'Fashion Store',
    brandId: 'brand-1',
    product: 'rto',
    amount: 10000,
    status: 'paid',
    paidDate: '2025-04-15T00:00:00Z',
    dueDate: '2025-04-10T00:00:00Z',
    type: 'integration',
    details: {
      integrationType: 'rto',
      completionDate: '2025-04-05T00:00:00Z',
    },
  },
  {
    id: 'inc-3',
    brandName: 'Tech Gadgets',
    brandId: 'brand-2',
    product: 'checkout',
    amount: 15000,
    status: 'pending',
    paidDate: null,
    dueDate: '2025-05-15T00:00:00Z',
    type: 'integration',
    details: {
      integrationType: 'checkout',
      completionDate: '2025-04-25T00:00:00Z',
    },
  },
  {
    id: 'inc-4',
    brandName: 'Beauty Brand',
    brandId: 'brand-3',
    product: 'checkout',
    amount: 15000,
    status: 'processing',
    paidDate: null,
    dueDate: '2025-06-01T00:00:00Z',
    type: 'integration',
    details: {
      integrationType: 'checkout',
      completionDate: null,
    },
  },
  {
    id: 'inc-5',
    brandName: 'Fashion Store',
    brandId: 'brand-1',
    product: 'all',
    amount: 5000,
    status: 'paid',
    paidDate: '2025-03-15T00:00:00Z',
    dueDate: '2025-03-10T00:00:00Z',
    type: 'referral',
    details: {
      referralDate: '2025-02-15T00:00:00Z',
      referralSource: 'Direct',
    },
  },
];

// Mock monthly earnings data
const monthlyEarningsData = [
  { month: 'Jan', earnings: 15000 },
  { month: 'Feb', earnings: 20000 },
  { month: 'Mar', earnings: 25000 },
  { month: 'Apr', earnings: 30000 },
  { month: 'May', earnings: 0 },
  { month: 'Jun', earnings: 0 },
];

// Mock product distribution data
const productDistributionData = [
  { type: 'Checkout', value: 60 },
  { type: 'RTO Prime', value: 30 },
  { type: 'Engage', value: 10 },
];

// Mock incentive type distribution data
const typeDistributionData = [
  { type: 'Integration', value: 80 },
  { type: 'Referral', value: 20 },
];

// Mock payment history
const paymentHistory = [
  {
    id: 'payment-1',
    amount: 15000,
    date: '2025-04-15T00:00:00Z',
    method: 'Bank Transfer',
    reference: 'REF123456',
    status: 'completed',
    details: 'Fashion Store - Checkout Integration',
  },
  {
    id: 'payment-2',
    amount: 10000,
    date: '2025-04-15T00:00:00Z',
    method: 'Bank Transfer',
    reference: 'REF123457',
    status: 'completed',
    details: 'Fashion Store - RTO Integration',
  },
  {
    id: 'payment-3',
    amount: 5000,
    date: '2025-03-15T00:00:00Z',
    method: 'Bank Transfer',
    reference: 'REF123458',
    status: 'completed',
    details: 'Fashion Store - Referral',
  },
];

// Mock leaderboard data
const leaderboardData = [
  {
    rank: 1,
    name: 'John Doe',
    earnings: 50000,
    completions: 5,
    avatar: 'https://via.placeholder.com/40',
  },
  {
    rank: 2,
    name: 'Jane Smith',
    earnings: 45000,
    completions: 4,
    avatar: 'https://via.placeholder.com/40',
  },
  {
    rank: 3,
    name: 'Bob Johnson',
    earnings: 40000,
    completions: 4,
    avatar: 'https://via.placeholder.com/40',
  },
  {
    rank: 4,
    name: 'Alice Brown',
    earnings: 35000,
    completions: 3,
    avatar: 'https://via.placeholder.com/40',
  },
  {
    rank: 5,
    name: 'Charlie Davis',
    earnings: 30000,
    completions: 3,
    avatar: 'https://via.placeholder.com/40',
  },
];

const IncentiveTracker: React.FC = () => {
  const [incentives, setIncentives] = useState(mockIncentives);
  const [activeTab, setActiveTab] = useState('1');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [productFilter, setProductFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<[any, any]>([null, null]);
  const [selectedIncentive, setSelectedIncentive] = useState<any>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  // Get status tag
  const getStatusTag = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Tag icon={<CheckCircleOutlined />} color='success'>
            Paid
          </Tag>
        );
      case 'pending':
        return (
          <Tag icon={<ClockCircleOutlined />} color='warning'>
            Pending
          </Tag>
        );
      case 'processing':
        return (
          <Tag icon={<ClockCircleOutlined />} color='processing'>
            Processing
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
      case 'all':
        return <Tag color='magenta'>All Products</Tag>;
      default:
        return <Tag>{product}</Tag>;
    }
  };

  // Get type tag
  const getTypeTag = (type: string) => {
    switch (type) {
      case 'integration':
        return <Tag color='cyan'>Integration</Tag>;
      case 'referral':
        return <Tag color='orange'>Referral</Tag>;
      default:
        return <Tag color='default'>{type}</Tag>;
    }
  };

  // Filter incentives
  const filteredIncentives = incentives.filter((incentive) => {
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(incentive.status);
    const matchesProduct = productFilter.length === 0 || productFilter.includes(incentive.product);
    const matchesType = typeFilter.length === 0 || typeFilter.includes(incentive.type);

    let matchesDate = true;
    if (dateRange[0] && dateRange[1]) {
      const incentiveDate = new Date(incentive.paidDate || incentive.dueDate);
      const startDate = dateRange[0].startOf('day').toDate();
      const endDate = dateRange[1].endOf('day').toDate();
      matchesDate = incentiveDate >= startDate && incentiveDate <= endDate;
    }

    return matchesStatus && matchesProduct && matchesType && matchesDate;
  });

  // Calculate totals
  const totalEarned = filteredIncentives
    .filter((incentive) => incentive.status === 'paid')
    .reduce((sum, incentive) => sum + incentive.amount, 0);

  const totalPending = filteredIncentives
    .filter((incentive) => incentive.status === 'pending' || incentive.status === 'processing')
    .reduce((sum, incentive) => sum + incentive.amount, 0);

  const totalIncentives = totalEarned + totalPending;

  // Handle incentive view
  const handleViewIncentive = (incentive: any) => {
    setSelectedIncentive(incentive);
    setDetailModalVisible(true);
  };

  // Table columns
  const columns = [
    {
      title: 'Brand',
      dataIndex: 'brandName',
      key: 'brandName',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (product: string) => getProductTag(product),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => getTypeTag(type),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => <Text strong>₹{amount.toLocaleString()}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Paid Date',
      dataIndex: 'paidDate',
      key: 'paidDate',
      render: (date: string | null) => (date ? new Date(date).toLocaleDateString() : '-'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Button type='primary' size='small' onClick={() => handleViewIncentive(record)}>
          View Details
        </Button>
      ),
    },
  ];

  // Line chart config
  const lineConfig = {
    data: monthlyEarningsData,
    xField: 'month',
    yField: 'earnings',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  // Pie chart config
  const pieConfig = {
    appendPadding: 10,
    data: productDistributionData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
  };

  return (
    <div>
      <Title level={2}>Incentive Tracker</Title>
      <Paragraph>
        Track your earnings from integrations and referrals. View payment history and analyze your performance.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title='Total Earned'
              value={totalEarned}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={
                <>
                  <DollarOutlined /> ₹
                </>
              }
            />
            <div style={{ marginTop: 8 }}>
              <Text type='secondary'>
                From {filteredIncentives.filter((i) => i.status === 'paid').length} paid incentives
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title='Pending Earnings'
              value={totalPending}
              precision={2}
              valueStyle={{ color: '#faad14' }}
              prefix={
                <>
                  <ClockCircleOutlined /> ₹
                </>
              }
            />
            <div style={{ marginTop: 8 }}>
              <Text type='secondary'>
                From {filteredIncentives.filter((i) => i.status !== 'paid').length} pending incentives
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title='Completion Rate'
              value={85}
              precision={1}
              valueStyle={{ color: '#1890ff' }}
              prefix={<RiseOutlined />}
              suffix='%'
            />
            <div style={{ marginTop: 8 }}>
              <Text type='secondary'>Based on successful integrations</Text>
            </div>
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab='Incentives' key='1'>
          <Card style={{ marginBottom: 24 }}>
            <div style={{ marginBottom: 16 }}>
              <Row gutter={[16, 16]} align='middle'>
                <Col xs={24} md={8}>
                  <RangePicker style={{ width: '100%' }} onChange={(dates) => setDateRange(dates)} />
                </Col>
                <Col xs={24} md={16}>
                  <Space wrap>
                    <Select
                      mode='multiple'
                      placeholder='Status'
                      style={{ minWidth: 120 }}
                      value={statusFilter}
                      onChange={setStatusFilter}
                    >
                      <Option value='paid'>Paid</Option>
                      <Option value='pending'>Pending</Option>
                      <Option value='processing'>Processing</Option>
                    </Select>

                    <Select
                      mode='multiple'
                      placeholder='Product'
                      style={{ minWidth: 120 }}
                      value={productFilter}
                      onChange={setProductFilter}
                    >
                      <Option value='checkout'>Checkout</Option>
                      <Option value='rto'>Return Prime</Option>
                      <Option value='engage'>Engage</Option>
                      <Option value='all'>All Products</Option>
                    </Select>

                    <Select
                      mode='multiple'
                      placeholder='Type'
                      style={{ minWidth: 120 }}
                      value={typeFilter}
                      onChange={setTypeFilter}
                    >
                      <Option value='integration'>Integration</Option>
                      <Option value='referral'>Referral</Option>
                    </Select>

                    <Button icon={<DownloadOutlined />}>Export</Button>
                  </Space>
                </Col>
              </Row>
            </div>

            <Table dataSource={filteredIncentives} columns={columns} rowKey='id' pagination={{ pageSize: 10 }} />
          </Card>
        </TabPane>

        <TabPane tab='Analytics' key='2'>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title='Monthly Earnings' style={{ marginBottom: 24 }}>
                <div style={{ height: 300 }}>
                  <Line {...lineConfig} />
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title='Earnings by Product' style={{ marginBottom: 24 }}>
                <div style={{ height: 300 }}>
                  <Pie {...pieConfig} />
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title='Earnings by Type' style={{ marginBottom: 24 }}>
                <div style={{ height: 300 }}>
                  <Pie {...{ ...pieConfig, data: typeDistributionData }} />
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title='Performance Metrics' style={{ marginBottom: 24 }}>
                <div style={{ padding: 24 }}>
                  <Row gutter={[16, 24]}>
                    <Col span={12}>
                      <Statistic
                        title='Integrations Completed'
                        value={5}
                        prefix={<CheckCircleOutlined />}
                        valueStyle={{ color: '#52c41a' }}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title='Integrations In Progress'
                        value={2}
                        prefix={<ClockCircleOutlined />}
                        valueStyle={{ color: '#faad14' }}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title='Referrals Made'
                        value={3}
                        prefix={<TeamOutlined />}
                        valueStyle={{ color: '#1890ff' }}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title='Avg. Completion Time'
                        value={14}
                        suffix='days'
                        prefix={<CalendarOutlined />}
                        valueStyle={{ color: '#722ed1' }}
                      />
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab='Payment History' key='3'>
          <Card>
            <Timeline mode='left'>
              {paymentHistory.map((payment) => (
                <Timeline.Item
                  key={payment.id}
                  dot={<DollarOutlined style={{ fontSize: 16 }} />}
                  label={new Date(payment.date).toLocaleDateString()}
                >
                  <div>
                    <Text strong>₹{payment.amount.toLocaleString()}</Text> paid via {payment.method}
                  </div>
                  <div>
                    <Text type='secondary'>Reference: {payment.reference}</Text>
                  </div>
                  <div>
                    <Text type='secondary'>{payment.details}</Text>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>

            <Divider />

            <div style={{ textAlign: 'center' }}>
              <Space>
                <Button icon={<FileOutlined />}>Download Statement</Button>
                <Button icon={<DownloadOutlined />}>Export to Excel</Button>
              </Space>
            </div>
          </Card>
        </TabPane>

        <TabPane tab='Leaderboard' key='4'>
          <Card>
            <Alert
              message='April 2025 Leaderboard'
              description='Top performing service partners based on integration completions and earnings.'
              type='info'
              showIcon
              style={{ marginBottom: 16 }}
            />

            <List
              itemLayout='horizontal'
              dataSource={leaderboardData}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div style={{ display: 'flex', alignItems: 'center', width: 60 }}>
                        {item.rank === 1 ? (
                          <TrophyOutlined style={{ fontSize: 24, color: '#ffd700' }} />
                        ) : item.rank === 2 ? (
                          <TrophyOutlined style={{ fontSize: 24, color: '#c0c0c0' }} />
                        ) : item.rank === 3 ? (
                          <TrophyOutlined style={{ fontSize: 24, color: '#cd7f32' }} />
                        ) : (
                          <Text style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{item.rank}</Text>
                        )}
                      </div>
                    }
                    title={
                      <Space>
                        <Text strong>{item.name}</Text>
                        {item.rank <= 3 && (
                          <Badge
                            count={`#${item.rank}`}
                            style={{
                              backgroundColor: item.rank === 1 ? '#ffd700' : item.rank === 2 ? '#c0c0c0' : '#cd7f32',
                            }}
                          />
                        )}
                      </Space>
                    }
                    description={
                      <Space>
                        <Text type='secondary'>{item.completions} integrations completed</Text>
                      </Space>
                    }
                  />
                  <div>
                    <Text strong style={{ fontSize: 16 }}>
                      ₹{item.earnings.toLocaleString()}
                    </Text>
                  </div>
                </List.Item>
              )}
            />

            <Divider />

            <div style={{ textAlign: 'center' }}>
              <Text type='secondary'>Your current rank: #2</Text>
              <div style={{ marginTop: 8 }}>
                <Text>Complete 1 more integration to reach #1!</Text>
              </div>
            </div>
          </Card>
        </TabPane>
      </Tabs>

      {/* Incentive Detail Modal */}
      <Modal
        title='Incentive Details'
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key='close' onClick={() => setDetailModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedIncentive && (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text type='secondary'>Brand</Text>
                <div>
                  <Text strong>{selectedIncentive.brandName}</Text>
                </div>
              </Col>
              <Col span={12}>
                <Text type='secondary'>Product</Text>
                <div>{getProductTag(selectedIncentive.product)}</div>
              </Col>
              <Col span={12}>
                <Text type='secondary'>Type</Text>
                <div>{getTypeTag(selectedIncentive.type)}</div>
              </Col>
              <Col span={12}>
                <Text type='secondary'>Amount</Text>
                <div>
                  <Text strong>₹{selectedIncentive.amount.toLocaleString()}</Text>
                </div>
              </Col>
              <Col span={12}>
                <Text type='secondary'>Status</Text>
                <div>{getStatusTag(selectedIncentive.status)}</div>
              </Col>
              <Col span={12}>
                <Text type='secondary'>Due Date</Text>
                <div>
                  <Text>{new Date(selectedIncentive.dueDate).toLocaleDateString()}</Text>
                </div>
              </Col>
              {selectedIncentive.paidDate && (
                <Col span={12}>
                  <Text type='secondary'>Paid Date</Text>
                  <div>
                    <Text>{new Date(selectedIncentive.paidDate).toLocaleDateString()}</Text>
                  </div>
                </Col>
              )}
            </Row>

            <Divider />

            {selectedIncentive.type === 'integration' && (
              <div>
                <Title level={5}>Integration Details</Title>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Text type='secondary'>Integration Type</Text>
                    <div>
                      <Text>{selectedIncentive.details.integrationType}</Text>
                    </div>
                  </Col>
                  {selectedIncentive.details.completionDate && (
                    <Col span={12}>
                      <Text type='secondary'>Completion Date</Text>
                      <div>
                        <Text>{new Date(selectedIncentive.details.completionDate).toLocaleDateString()}</Text>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            )}

            {selectedIncentive.type === 'referral' && (
              <div>
                <Title level={5}>Referral Details</Title>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Text type='secondary'>Referral Date</Text>
                    <div>
                      <Text>{new Date(selectedIncentive.details.referralDate).toLocaleDateString()}</Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Text type='secondary'>Referral Source</Text>
                    <div>
                      <Text>{selectedIncentive.details.referralSource}</Text>
                    </div>
                  </Col>
                </Row>
              </div>
            )}

            <Divider />

            <Alert
              message='Payment Information'
              description={
                selectedIncentive.status === 'paid' ? (
                  <div>
                    <Text>
                      This incentive was paid on {new Date(selectedIncentive.paidDate).toLocaleDateString()} via Bank
                      Transfer.
                    </Text>
                  </div>
                ) : selectedIncentive.status === 'processing' ? (
                  <div>
                    <Text>This incentive is being processed and will be paid within 7 business days.</Text>
                  </div>
                ) : (
                  <div>
                    <Text>This incentive is pending and will be processed after completion.</Text>
                  </div>
                )
              }
              type={selectedIncentive.status === 'paid' ? 'success' : 'info'}
              showIcon
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default IncentiveTracker;
