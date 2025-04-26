import React from 'react';
import { Card, Row, Col, Statistic, Progress, Typography, Space, Divider } from 'antd';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  DollarOutlined,
  ShopOutlined,
  RiseOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

// Mock data for charts
const monthlyReferrals = [
  { name: 'Jan', value: 4 },
  { name: 'Feb', value: 6 },
  { name: 'Mar', value: 8 },
  { name: 'Apr', value: 12 },
  { name: 'May', value: 9 },
  { name: 'Jun', value: 14 },
];

const monthlyCommissions = [
  { name: 'Jan', value: 12000 },
  { name: 'Feb', value: 18000 },
  { name: 'Mar', value: 22000 },
  { name: 'Apr', value: 32000 },
  { name: 'May', value: 28000 },
  { name: 'Jun', value: 42000 },
];

const verticalDistribution = [
  { name: 'Fashion', value: 45 },
  { name: 'Electronics', value: 25 },
  { name: 'Beauty', value: 15 },
  { name: 'Home', value: 10 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AnalyticsDashboard: React.FC = () => {
  return (
    <div>
      <Title level={4}>Performance Analytics</Title>
      <Text type='secondary'>Overview of your partnership performance</Text>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} style={{ marginTop: 16, marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title='Total Referrals' value={14} prefix={<UserOutlined />} valueStyle={{ color: '#1890ff' }} />
            <div style={{ marginTop: 8 }}>
              <Text type='secondary'>
                <ArrowUpOutlined style={{ color: '#3f8600' }} /> 16% vs last month
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title='Total Earnings'
              value={42500}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix='₹'
            />
            <div style={{ marginTop: 8 }}>
              <Text type='secondary'>
                <ArrowUpOutlined style={{ color: '#3f8600' }} /> 24% vs last month
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title='Conversion Rate'
              value={28.6}
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#faad14' }}
              suffix='%'
            />
            <div style={{ marginTop: 8 }}>
              <Text type='secondary'>
                <ArrowUpOutlined style={{ color: '#3f8600' }} /> 5% vs last month
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title='Active Brands' value={8} prefix={<ShopOutlined />} valueStyle={{ color: '#722ed1' }} />
            <div style={{ marginTop: 8 }}>
              <Text type='secondary'>
                <ArrowUpOutlined style={{ color: '#3f8600' }} /> 33% vs last month
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title='Monthly Referrals'>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={monthlyReferrals}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} Referrals`, 'Count']} />
                <Legend />
                <Bar dataKey='value' name='Referrals' fill='#1890ff' />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title='Monthly Commissions'>
            <ResponsiveContainer width='100%' height={300}>
              <AreaChart data={monthlyCommissions}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value}`, 'Commission']} />
                <Legend />
                <Area
                  type='monotone'
                  dataKey='value'
                  name='Commission'
                  stroke='#52c41a'
                  fill='#52c41a'
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title='Product Distribution'>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={verticalDistribution}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {verticalDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title='Funnel Conversion'>
            <div style={{ padding: '20px 0' }}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>Prospecting</Text>
                    <Text>14 leads</Text>
                  </div>
                  <Progress percent={100} showInfo={false} strokeColor='#1890ff' />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>Pitch</Text>
                    <Text>10 leads</Text>
                  </div>
                  <Progress percent={71} showInfo={false} strokeColor='#52c41a' />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>Objection</Text>
                    <Text>8 leads</Text>
                  </div>
                  <Progress percent={57} showInfo={false} strokeColor='#faad14' />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>BA Shared</Text>
                    <Text>5 leads</Text>
                  </div>
                  <Progress percent={36} showInfo={false} strokeColor='#722ed1' />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>Signed</Text>
                    <Text>4 leads</Text>
                  </div>
                  <Progress percent={29} showInfo={false} strokeColor='#13c2c2' />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>Go Live</Text>
                    <Text>3 leads</Text>
                  </div>
                  <Progress percent={21} showInfo={false} strokeColor='#eb2f96' />
                </div>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AnalyticsDashboard;
