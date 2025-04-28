import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Typography,
  Tag,
  Space,
  Button,
  Statistic,
  Row,
  Col,
  Tabs,
  DatePicker,
  Select,
  Form,
  Input,
  Modal,
  Divider,
  Timeline,
  Progress,
  Alert,
} from 'antd';
import {
  DollarOutlined,
  DownloadOutlined,
  FilterOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  BankOutlined,
  RiseOutlined,
  BarChartOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';
import { Line, Pie } from '@ant-design/charts';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

// Mock commission data
const mockCommissions = [
  {
    id: 'comm-1',
    referralId: 'ref-1',
    brandName: 'Fashion Store',
    monthlyGMV: 500000,
    amount: 25000,
    status: 'paid',
    paidDate: '2025-04-22T00:00:00Z',
    dueDate: '2025-04-20T00:00:00Z',
    product: 'checkout',
    vertical: 'fashion',
    calculationDetails: {
      baseRate: 0.05,
      tier: 'standard',
      bonuses: 0,
    },
  },
  {
    id: 'comm-2',
    referralId: 'ref-3',
    brandName: 'Beauty Brand',
    monthlyGMV: 350000,
    amount: 17500,
    status: 'pending',
    paidDate: null,
    dueDate: '2025-05-15T00:00:00Z',
    product: 'all',
    vertical: 'beauty',
    calculationDetails: {
      baseRate: 0.05,
      tier: 'standard',
      bonuses: 0,
    },
  },
  {
    id: 'comm-3',
    referralId: 'ref-4',
    brandName: 'Tech Gadgets',
    monthlyGMV: 800000,
    amount: 44000,
    status: 'processing',
    paidDate: null,
    dueDate: '2025-05-10T00:00:00Z',
    product: 'rto',
    vertical: 'electronics',
    calculationDetails: {
      baseRate: 0.05,
      tier: 'premium',
      bonuses: 0.5,
    },
  },
  {
    id: 'comm-4',
    referralId: 'ref-5',
    brandName: 'Home Decor',
    monthlyGMV: 420000,
    amount: 21000,
    status: 'paid',
    paidDate: '2025-04-10T00:00:00Z',
    dueDate: '2025-04-05T00:00:00Z',
    product: 'checkout',
    vertical: 'home',
    calculationDetails: {
      baseRate: 0.05,
      tier: 'standard',
      bonuses: 0,
    },
  },
  {
    id: 'comm-5',
    referralId: 'ref-6',
    brandName: 'Sports Gear',
    monthlyGMV: 650000,
    amount: 35750,
    status: 'pending',
    paidDate: null,
    dueDate: '2025-05-20T00:00:00Z',
    product: 'engage',
    vertical: 'sports',
    calculationDetails: {
      baseRate: 0.05,
      tier: 'premium',
      bonuses: 0.5,
    },
  },
];

// Mock monthly earnings data
const monthlyEarningsData = [
  { month: 'Jan', earnings: 45000 },
  { month: 'Feb', earnings: 52000 },
  { month: 'Mar', earnings: 61000 },
  { month: 'Apr', earnings: 58000 },
  { month: 'May', earnings: 63000 },
  { month: 'Jun', earnings: 72000 },
];

// Mock product distribution data
const productDistributionData = [
  { type: 'Checkout', value: 45 },
  { type: 'RTO Prime', value: 25 },
  { type: 'Engage', value: 15 },
  { type: 'All Products', value: 15 },
];

// Mock vertical distribution data
const verticalDistributionData = [
  { type: 'Fashion', value: 35 },
  { type: 'Electronics', value: 25 },
  { type: 'Beauty', value: 15 },
  { type: 'Home', value: 10 },
  { type: 'Sports', value: 10 },
  { type: 'Other', value: 5 },
];

// Mock payment history
const paymentHistory = [
  {
    id: 'payment-1',
    amount: 25000,
    date: '2025-04-22T00:00:00Z',
    method: 'Bank Transfer',
    reference: 'REF123456',
    status: 'completed',
  },
  {
    id: 'payment-2',
    amount: 21000,
    date: '2025-04-10T00:00:00Z',
    method: 'Bank Transfer',
    reference: 'REF123457',
    status: 'completed',
  },
  {
    id: 'payment-3',
    amount: 38000,
    date: '2025-03-15T00:00:00Z',
    method: 'Bank Transfer',
    reference: 'REF123458',
    status: 'completed',
  },
  {
    id: 'payment-4',
    amount: 42000,
    date: '2025-02-18T00:00:00Z',
    method: 'Bank Transfer',
    reference: 'REF123459',
    status: 'completed',
  },
];

const ResellerCommission: React.FC = () => {
  const [commissions, setCommissions] = useState(mockCommissions);
  const [activeTab, setActiveTab] = useState('1');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [productFilter, setProductFilter] = useState<string[]>([]);
  const [verticalFilter, setVerticalFilter] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<[any, any]>([null, null]);
  const [calculatorVisible, setCalculatorVisible] = useState(false);
  const [calculationResult, setCalculationResult] = useState<any>(null);
  const [form] = Form.useForm();

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

  // Filter commissions
  const filteredCommissions = commissions.filter((commission) => {
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(commission.status);
    const matchesProduct = productFilter.length === 0 || productFilter.includes(commission.product);
    const matchesVertical = verticalFilter.length === 0 || verticalFilter.includes(commission.vertical);

    let matchesDate = true;
    if (dateRange[0] && dateRange[1]) {
      const commissionDate = new Date(commission.paidDate || commission.dueDate);
      const startDate = dateRange[0].startOf('day').toDate();
      const endDate = dateRange[1].endOf('day').toDate();
      matchesDate = commissionDate >= startDate && commissionDate <= endDate;
    }

    return matchesStatus && matchesProduct && matchesVertical && matchesDate;
  });

  // Calculate totals
  const totalEarned = filteredCommissions
    .filter((commission) => commission.status === 'paid')
    .reduce((sum, commission) => sum + commission.amount, 0);

  const totalPending = filteredCommissions
    .filter((commission) => commission.status === 'pending' || commission.status === 'processing')
    .reduce((sum, commission) => sum + commission.amount, 0);

  const totalCommissions = totalEarned + totalPending;

  // Handle calculator submit
  const handleCalculatorSubmit = (values: any) => {
    const { monthlyGMV, product, vertical, tier } = values;

    // Base rate for reseller
    let baseRate = 0.05;

    // Product multiplier
    let productMultiplier = 1;
    switch (product) {
      case 'checkout':
        productMultiplier = 1.2;
        break;
      case 'rto':
        productMultiplier = 1.1;
        break;
      case 'engage':
        productMultiplier = 1.05;
        break;
      case 'all':
        productMultiplier = 1.3;
        break;
    }

    // Tier bonus
    let tierBonus = 0;
    switch (tier) {
      case 'premium':
        tierBonus = 0.01;
        break;
      case 'elite':
        tierBonus = 0.02;
        break;
    }

    // Vertical bonus
    let verticalBonus = 0;
    switch (vertical) {
      case 'fashion':
        verticalBonus = 0.005;
        break;
      case 'electronics':
        verticalBonus = 0.01;
        break;
    }

    // Calculate commission
    const effectiveRate = baseRate * productMultiplier + tierBonus + verticalBonus;
    const commission = monthlyGMV * effectiveRate;

    // Set calculation result
    setCalculationResult({
      monthlyGMV,
      baseRate,
      productMultiplier,
      tierBonus,
      verticalBonus,
      effectiveRate,
      commission,
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
      title: 'Monthly GMV',
      dataIndex: 'monthlyGMV',
      key: 'monthlyGMV',
      render: (value: number) => <Text>₹{value.toLocaleString()}</Text>,
    },
    {
      title: 'Commission',
      dataIndex: 'amount',
      key: 'amount',
      render: (value: number) => <Text strong>₹{value.toLocaleString()}</Text>,
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (product: string) => getProductTag(product),
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
      <Title level={2}>Commission Management</Title>
      <Paragraph>
        Track your earnings, view payment history, and calculate potential commissions for new deals.
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
              prefix={
                <>
                  <ClockCircleOutlined /> ₹
                </>
              }
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
              title='Commission Rate'
              value={5}
              precision={1}
              valueStyle={{ color: '#1890ff' }}
              prefix={<RiseOutlined />}
              suffix='%'
            />
            <div style={{ marginTop: 8 }}>
              <Button type='link' onClick={() => setCalculatorVisible(true)} style={{ padding: 0 }}>
                Calculate potential earnings
              </Button>
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

                    <Select
                      mode='multiple'
                      placeholder='Vertical'
                      style={{ minWidth: 120 }}
                      value={verticalFilter}
                      onChange={setVerticalFilter}
                    >
                      <Option value='fashion'>Fashion</Option>
                      <Option value='electronics'>Electronics</Option>
                      <Option value='beauty'>Beauty</Option>
                      <Option value='home'>Home</Option>
                      <Option value='sports'>Sports</Option>
                    </Select>

                    <Button icon={<DownloadOutlined />}>Export</Button>
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
              <Card title='Commission by Product' style={{ marginBottom: 24 }}>
                <div style={{ height: 300 }}>
                  <Pie {...pieConfig} />
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title='Commission by Vertical' style={{ marginBottom: 24 }}>
                <div style={{ height: 300 }}>
                  <Pie {...{ ...pieConfig, data: verticalDistributionData }} />
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title='Commission Growth' style={{ marginBottom: 24 }}>
                <div style={{ padding: 24, textAlign: 'center' }}>
                  <Statistic
                    title='Year-over-Year Growth'
                    value={32.5}
                    precision={1}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<RiseOutlined />}
                    suffix='%'
                  />
                  <div style={{ marginTop: 24 }}>
                    <Progress
                      percent={75}
                      status='active'
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                    />
                    <div style={{ marginTop: 8 }}>
                      <Text type='secondary'>75% of annual target achieved</Text>
                    </div>
                  </div>
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
                  dot={<BankOutlined style={{ fontSize: 16 }} />}
                  label={new Date(payment.date).toLocaleDateString()}
                >
                  <div>
                    <Text strong>₹{payment.amount.toLocaleString()}</Text> paid via {payment.method}
                  </div>
                  <div>
                    <Text type='secondary'>Reference: {payment.reference}</Text>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>

            <Divider />

            <div style={{ textAlign: 'center' }}>
              <Space>
                <Button icon={<FilePdfOutlined />}>Download Statement</Button>
                <Button icon={<FileExcelOutlined />}>Export to Excel</Button>
              </Space>
            </div>
          </Card>
        </TabPane>
      </Tabs>

      {/* Commission Calculator Modal */}
      <Modal
        title='Commission Calculator'
        open={calculatorVisible}
        onCancel={() => {
          setCalculatorVisible(false);
          setCalculationResult(null);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={handleCalculatorSubmit}
          initialValues={{
            tier: 'standard',
            product: 'checkout',
            vertical: 'fashion',
          }}
        >
          <Form.Item
            name='monthlyGMV'
            label='Monthly GMV (₹)'
            rules={[{ required: true, message: 'Please enter the monthly GMV' }]}
          >
            <Input prefix='₹' type='number' min={0} placeholder='e.g. 500000' />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='product'
                label='Product'
                rules={[{ required: true, message: 'Please select the product' }]}
              >
                <Select>
                  <Option value='checkout'>Checkout</Option>
                  <Option value='rto'>Return Prime</Option>
                  <Option value='engage'>Engage</Option>
                  <Option value='all'>All Products</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='vertical'
                label='Vertical'
                rules={[{ required: true, message: 'Please select the vertical' }]}
              >
                <Select>
                  <Option value='fashion'>Fashion</Option>
                  <Option value='electronics'>Electronics</Option>
                  <Option value='beauty'>Beauty</Option>
                  <Option value='home'>Home</Option>
                  <Option value='sports'>Sports</Option>
                  <Option value='other'>Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name='tier'
            label='Partner Tier'
            rules={[{ required: true, message: 'Please select the partner tier' }]}
          >
            <Select>
              <Option value='standard'>Standard (5%)</Option>
              <Option value='premium'>Premium (6%)</Option>
              <Option value='elite'>Elite (7%)</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Calculate Commission
            </Button>
          </Form.Item>
        </Form>

        {calculationResult && (
          <>
            <Divider />

            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <Statistic
                title='Estimated Commission'
                value={calculationResult.commission}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix='₹'
              />
            </div>

            <Alert
              message='Commission Breakdown'
              description={
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text>Monthly GMV:</Text>
                    <Text strong>₹{parseInt(calculationResult.monthlyGMV).toLocaleString()}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text>Base Rate:</Text>
                    <Text strong>{(calculationResult.baseRate * 100).toFixed(1)}%</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text>Product Multiplier:</Text>
                    <Text strong>{calculationResult.productMultiplier.toFixed(2)}x</Text>
                  </div>
                  {calculationResult.tierBonus > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <Text>Tier Bonus:</Text>
                      <Text strong>+{(calculationResult.tierBonus * 100).toFixed(1)}%</Text>
                    </div>
                  )}
                  {calculationResult.verticalBonus > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <Text>Vertical Bonus:</Text>
                      <Text strong>+{(calculationResult.verticalBonus * 100).toFixed(1)}%</Text>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text>Effective Rate:</Text>
                    <Text strong>{(calculationResult.effectiveRate * 100).toFixed(2)}%</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text>Calculation:</Text>
                    <Text strong>
                      ₹{parseInt(calculationResult.monthlyGMV).toLocaleString()} ×{' '}
                      {(calculationResult.effectiveRate * 100).toFixed(2)}%
                    </Text>
                  </div>
                </div>
              }
              type='info'
              showIcon
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default ResellerCommission;
