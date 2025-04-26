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
  Form,
  Input,
  InputNumber,
  Tooltip,
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
  CalculatorOutlined,
  SearchOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { Line, Pie } from '@ant-design/charts';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

// Mock data for commissions
const mockCommissions = [
  {
    id: 'comm-1',
    brandName: 'Fashion Store',
    brandId: 'brand-1',
    product: 'checkout',
    amount: 15000,
    status: 'paid',
    paidDate: '2025-04-15T00:00:00Z',
    dueDate: '2025-04-10T00:00:00Z',
    type: 'referral',
    details: {
      referralDate: '2025-03-15T00:00:00Z',
      referralStage: 'go_live',
      monthlyGMV: 500000,
    },
  },
  {
    id: 'comm-2',
    brandName: 'Tech Gadgets',
    brandId: 'brand-2',
    product: 'checkout',
    amount: 12000,
    status: 'pending',
    paidDate: null,
    dueDate: '2025-05-15T00:00:00Z',
    type: 'referral',
    details: {
      referralDate: '2025-04-01T00:00:00Z',
      referralStage: 'contract_signed',
      monthlyGMV: 400000,
    },
  },
  {
    id: 'comm-3',
    brandName: 'Beauty Brand',
    brandId: 'brand-3',
    product: 'all',
    amount: 18000,
    status: 'processing',
    paidDate: null,
    dueDate: '2025-06-01T00:00:00Z',
    type: 'referral',
    details: {
      referralDate: '2025-04-10T00:00:00Z',
      referralStage: 'ba_shared',
      monthlyGMV: 600000,
    },
  },
  {
    id: 'comm-4',
    brandName: 'Home Decor',
    brandId: 'brand-4',
    product: 'rto',
    amount: 9000,
    status: 'paid',
    paidDate: '2025-03-20T00:00:00Z',
    dueDate: '2025-03-15T00:00:00Z',
    type: 'referral',
    details: {
      referralDate: '2025-02-10T00:00:00Z',
      referralStage: 'go_live',
      monthlyGMV: 300000,
    },
  },
  {
    id: 'comm-5',
    brandName: 'Sports Store',
    brandId: 'brand-5',
    product: 'engage',
    amount: 7500,
    status: 'paid',
    paidDate: '2025-02-15T00:00:00Z',
    dueDate: '2025-02-10T00:00:00Z',
    type: 'referral',
    details: {
      referralDate: '2025-01-05T00:00:00Z',
      referralStage: 'go_live',
      monthlyGMV: 250000,
    },
  },
];

// Mock monthly earnings data
const monthlyEarningsData = [
  { month: 'Jan', earnings: 5000 },
  { month: 'Feb', earnings: 7500 },
  { month: 'Mar', earnings: 9000 },
  { month: 'Apr', earnings: 15000 },
  { month: 'May', earnings: 0 },
  { month: 'Jun', earnings: 0 },
];

// Mock product distribution data
const productDistributionData = [
  { type: 'Checkout', value: 60 },
  { type: 'RTO Prime', value: 20 },
  { type: 'Engage', value: 20 },
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
    details: 'Fashion Store - Checkout Referral',
  },
  {
    id: 'payment-2',
    amount: 9000,
    date: '2025-03-20T00:00:00Z',
    method: 'Bank Transfer',
    reference: 'REF123457',
    status: 'completed',
    details: 'Home Decor - RTO Referral',
  },
  {
    id: 'payment-3',
    amount: 7500,
    date: '2025-02-15T00:00:00Z',
    method: 'Bank Transfer',
    reference: 'REF123458',
    status: 'completed',
    details: 'Sports Store - Engage Referral',
  },
];

const CommissionTracker: React.FC = () => {
  const [commissions, setCommissions] = useState(mockCommissions);
  const [activeTab, setActiveTab] = useState('1');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [productFilter, setProductFilter] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<[any, any]>([null, null]);
  const [selectedCommission, setSelectedCommission] = useState<any>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [calculatorModalVisible, setCalculatorModalVisible] = useState(false);
  const [calculatorForm] = Form.useForm();

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

  // Get stage tag
  const getStageTag = (stage: string) => {
    switch (stage) {
      case 'go_live':
        return <Tag color='success'>Go Live</Tag>;
      case 'contract_signed':
        return <Tag color='processing'>Contract Signed</Tag>;
      case 'ba_shared':
        return <Tag color='warning'>BA Shared</Tag>;
      default:
        return <Tag color='default'>{stage}</Tag>;
    }
  };

  // Filter commissions
  const filteredCommissions = commissions.filter((commission) => {
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(commission.status);
    const matchesProduct = productFilter.length === 0 || productFilter.includes(commission.product);

    let matchesDate = true;
    if (dateRange[0] && dateRange[1]) {
      const commissionDate = new Date(commission.paidDate || commission.dueDate);
      const startDate = dateRange[0].startOf('day').toDate();
      const endDate = dateRange[1].endOf('day').toDate();
      matchesDate = commissionDate >= startDate && commissionDate <= endDate;
    }

    return matchesStatus && matchesProduct && matchesDate;
  });

  // Calculate totals
  const totalEarned = filteredCommissions
    .filter((commission) => commission.status === 'paid')
    .reduce((sum, commission) => sum + commission.amount, 0);

  const totalPending = filteredCommissions
    .filter((commission) => commission.status === 'pending' || commission.status === 'processing')
    .reduce((sum, commission) => sum + commission.amount, 0);

  const totalCommissions = totalEarned + totalPending;

  // Handle commission view
  const handleViewCommission = (commission: any) => {
    setSelectedCommission(commission);
    setDetailModalVisible(true);
  };

  // Calculate commission
  const calculateCommission = (values: any) => {
    const { monthlyGMV, product, vertical, tier } = values;

    // Mock commission calculation logic
    let commissionRate = 0.03; // Base rate: 3%

    // Adjust rate based on product
    if (product === 'all') {
      commissionRate += 0.01; // +1% for all products
    }

    // Adjust rate based on vertical
    if (vertical === 'fashion' || vertical === 'beauty') {
      commissionRate += 0.005; // +0.5% for fashion and beauty
    }

    // Adjust rate based on tier
    if (tier === 'gold') {
      commissionRate += 0.01; // +1% for gold tier
    } else if (tier === 'platinum') {
      commissionRate += 0.02; // +2% for platinum tier
    }

    // Calculate commission amount
    const commissionAmount = monthlyGMV * commissionRate;

    // Show result in modal
    Modal.info({
      title: 'Commission Calculation Result',
      content: (
        <div>
          <p>Based on the provided information:</p>
          <ul>
            <li>Monthly GMV: ₹{monthlyGMV.toLocaleString()}</li>
            <li>Product: {product}</li>
            <li>Vertical: {vertical}</li>
            <li>Partner Tier: {tier}</li>
          </ul>
          <Divider />
          <p>Commission Rate: {(commissionRate * 100).toFixed(1)}%</p>
          <p style={{ fontWeight: 'bold' }}>Estimated Commission: ₹{commissionAmount.toLocaleString()}</p>
          <Alert
            message='Note'
            description='This is an estimate. Actual commission may vary based on additional factors and terms of your partnership agreement.'
            type='info'
            showIcon
            style={{ marginTop: 16 }}
          />
        </div>
      ),
      width: 500,
    });
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
        <Button type='primary' size='small' onClick={() => handleViewCommission(record)}>
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
      <Title level={2}>Commission Tracker</Title>
      <Paragraph>
        Track your earnings from referrals. View payment history, calculate potential commissions, and analyze your
        performance.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title='Total Earned'
              value={totalEarned}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarOutlined />}
              suffix='₹'
            />
            <div style={{ marginTop: 8 }}>
              <Text type='secondary'>
                From {filteredCommissions.filter((c) => c.status === 'paid').length} paid commissions
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
              prefix={<ClockCircleOutlined />}
              suffix='₹'
            />
            <div style={{ marginTop: 8 }}>
              <Text type='secondary'>
                From {filteredCommissions.filter((c) => c.status !== 'paid').length} pending commissions
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title='Conversion Rate'
              value={75}
              precision={1}
              valueStyle={{ color: '#1890ff' }}
              prefix={<RiseOutlined />}
              suffix='%'
            />
            <div style={{ marginTop: 8 }}>
              <Text type='secondary'>Based on referral to go-live ratio</Text>
            </div>
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab='Commissions' key='1'>
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

                    <Button icon={<DownloadOutlined />}>Export</Button>

                    <Button
                      type='primary'
                      icon={<CalculatorOutlined />}
                      onClick={() => setCalculatorModalVisible(true)}
                    >
                      Commission Calculator
                    </Button>
                  </Space>
                </Col>
              </Row>
            </div>

            <Table dataSource={filteredCommissions} columns={columns} rowKey='id' pagination={{ pageSize: 10 }} />
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
            <Col xs={24}>
              <Card title='Performance Metrics' style={{ marginBottom: 24 }}>
                <div style={{ padding: 24 }}>
                  <Row gutter={[16, 24]}>
                    <Col xs={24} sm={8}>
                      <Statistic
                        title='Total Referrals'
                        value={12}
                        prefix={<ShopOutlined />}
                        valueStyle={{ color: '#1890ff' }}
                      />
                    </Col>
                    <Col xs={24} sm={8}>
                      <Statistic
                        title='Successful Referrals'
                        value={9}
                        prefix={<CheckCircleOutlined />}
                        valueStyle={{ color: '#52c41a' }}
                      />
                    </Col>
                    <Col xs={24} sm={8}>
                      <Statistic
                        title='Avg. Commission'
                        value={12300}
                        prefix={<DollarOutlined />}
                        suffix='₹'
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
      </Tabs>

      {/* Commission Detail Modal */}
      <Modal
        title='Commission Details'
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key='close' onClick={() => setDetailModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedCommission && (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text type='secondary'>Brand</Text>
                <div>
                  <Text strong>{selectedCommission.brandName}</Text>
                </div>
              </Col>
              <Col span={12}>
                <Text type='secondary'>Product</Text>
                <div>{getProductTag(selectedCommission.product)}</div>
              </Col>
              <Col span={12}>
                <Text type='secondary'>Amount</Text>
                <div>
                  <Text strong>₹{selectedCommission.amount.toLocaleString()}</Text>
                </div>
              </Col>
              <Col span={12}>
                <Text type='secondary'>Status</Text>
                <div>{getStatusTag(selectedCommission.status)}</div>
              </Col>
              <Col span={12}>
                <Text type='secondary'>Due Date</Text>
                <div>
                  <Text>{new Date(selectedCommission.dueDate).toLocaleDateString()}</Text>
                </div>
              </Col>
              {selectedCommission.paidDate && (
                <Col span={12}>
                  <Text type='secondary'>Paid Date</Text>
                  <div>
                    <Text>{new Date(selectedCommission.paidDate).toLocaleDateString()}</Text>
                  </div>
                </Col>
              )}
            </Row>

            <Divider />

            <div>
              <Title level={5}>Referral Details</Title>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text type='secondary'>Referral Date</Text>
                  <div>
                    <Text>{new Date(selectedCommission.details.referralDate).toLocaleDateString()}</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <Text type='secondary'>Referral Stage</Text>
                  <div>{getStageTag(selectedCommission.details.referralStage)}</div>
                </Col>
                <Col span={12}>
                  <Text type='secondary'>Monthly GMV</Text>
                  <div>
                    <Text>₹{selectedCommission.details.monthlyGMV.toLocaleString()}</Text>
                  </div>
                </Col>
              </Row>
            </div>

            <Divider />

            <Alert
              message='Payment Information'
              description={
                selectedCommission.status === 'paid' ? (
                  <div>
                    <Text>
                      This commission was paid on {new Date(selectedCommission.paidDate).toLocaleDateString()} via Bank
                      Transfer.
                    </Text>
                  </div>
                ) : selectedCommission.status === 'processing' ? (
                  <div>
                    <Text>This commission is being processed and will be paid within 7 business days.</Text>
                  </div>
                ) : (
                  <div>
                    <Text>
                      This commission is pending and will be processed after the referral reaches the Go Live stage.
                    </Text>
                  </div>
                )
              }
              type={selectedCommission.status === 'paid' ? 'success' : 'info'}
              showIcon
            />
          </div>
        )}
      </Modal>

      {/* Commission Calculator Modal */}
      <Modal
        title='Commission Calculator'
        open={calculatorModalVisible}
        onCancel={() => setCalculatorModalVisible(false)}
        footer={null}
        width={600}
      >
        <Alert
          message='Estimate Your Commission'
          description="Use this calculator to estimate potential commissions based on the brand's monthly GMV, product, vertical, and your partner tier."
          type='info'
          showIcon
          style={{ marginBottom: 16 }}
        />

        <Form
          form={calculatorForm}
          layout='vertical'
          onFinish={calculateCommission}
          initialValues={{
            monthlyGMV: 500000,
            product: 'checkout',
            vertical: 'fashion',
            tier: 'silver',
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='monthlyGMV'
                label='Monthly GMV (₹)'
                rules={[{ required: true, message: 'Please enter monthly GMV' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={100000}
                  max={10000000}
                  step={100000}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='product' label='Product' rules={[{ required: true, message: 'Please select product' }]}>
                <Select>
                  <Option value='checkout'>Checkout</Option>
                  <Option value='rto'>Return Prime</Option>
                  <Option value='engage'>Engage</Option>
                  <Option value='all'>All Products</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='vertical'
                label='Vertical'
                rules={[{ required: true, message: 'Please select vertical' }]}
              >
                <Select>
                  <Option value='fashion'>Fashion</Option>
                  <Option value='beauty'>Beauty</Option>
                  <Option value='electronics'>Electronics</Option>
                  <Option value='home'>Home & Decor</Option>
                  <Option value='other'>Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='tier'
                label={
                  <span>
                    Partner Tier{' '}
                    <Tooltip title='Your partner tier affects commission rates. Higher tiers earn higher commissions.'>
                      <InfoCircleOutlined />
                    </Tooltip>
                  </span>
                }
                rules={[{ required: true, message: 'Please select partner tier' }]}
              >
                <Select>
                  <Option value='silver'>Silver</Option>
                  <Option value='gold'>Gold</Option>
                  <Option value='platinum'>Platinum</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Calculate Commission
            </Button>
          </Form.Item>
        </Form>

        <Divider />

        <div style={{ textAlign: 'center' }}>
          <Text type='secondary'>
            Note: This calculator provides an estimate based on standard commission rates. Actual commissions may vary
            based on your specific partnership agreement.
          </Text>
        </div>
      </Modal>
    </div>
  );
};

export default CommissionTracker;
