import React from 'react';
import { Row, Col, Card, Statistic, Typography, Progress, Tooltip, Divider } from 'antd';
import { InfoCircleOutlined, ArrowUpOutlined, ArrowDownOutlined, DollarOutlined } from '@ant-design/icons';
import { RevenueImpactMetrics as RevenueImpactMetricsType, TargetMetric } from '../../types/adminDashboard';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts';

const { Title, Text, Paragraph } = Typography;

interface RevenueImpactMetricsProps {
  data: RevenueImpactMetricsType;
}

const RevenueImpactMetrics: React.FC<RevenueImpactMetricsProps> = ({ data }) => {
  // Helper function to format values based on unit
  const formatValue = (value: number, unit: string): string => {
    if (unit === '₹') {
      // Format as currency in lakhs/crores
      if (value >= 10000000) {
        return `₹${(value / 10000000).toFixed(2)}Cr`;
      } else if (value >= 100000) {
        return `₹${(value / 100000).toFixed(2)}L`;
      } else {
        return `₹${value.toLocaleString()}`;
      }
    } else if (unit === '%') {
      return `${value}%`;
    } else if (unit === 'ratio') {
      return `${value}:1`;
    } else {
      return value.toString();
    }
  };

  // Helper function to render a metric card
  const renderMetricCard = (metric: TargetMetric) => {
    const progressPercent = Math.min(100, Math.round((metric.currentValue / metric.target) * 100));
    const trendColor = metric.trend && metric.trend > 0 ? '#52c41a' : '#f5222d';
    const trendIcon = metric.trend && metric.trend > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />;

    return (
      <Card bordered={false} className='metric-card' style={{ height: '100%' }}>
        <Tooltip title={metric.description}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Text strong>{metric.name}</Text>
            <InfoCircleOutlined style={{ color: '#1890ff' }} />
          </div>
        </Tooltip>

        <Statistic
          value={metric.currentValue}
          formatter={(value) => formatValue(value as number, metric.unit)}
          valueStyle={{ fontSize: '24px' }}
        />

        <div style={{ marginTop: 8, marginBottom: 8 }}>
          <Text type='secondary'>Target: {formatValue(metric.target, metric.unit)}</Text>
        </div>

        <Progress
          percent={progressPercent}
          status={progressPercent >= 100 ? 'success' : 'active'}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
        />

        {metric.trend && (
          <div style={{ marginTop: 8 }}>
            <Text style={{ color: trendColor }}>
              {trendIcon} {metric.trend}% vs last month
            </Text>
          </div>
        )}
      </Card>
    );
  };

  // Prepare data for revenue by partner type
  const revenueByPartnerTypeData = [
    { name: 'Referral Partners', value: data.revenueByPartnerType.referral, color: '#1890ff' },
    { name: 'Reseller Partners', value: data.revenueByPartnerType.reseller, color: '#52c41a' },
    { name: 'Service Partners', value: data.revenueByPartnerType.service, color: '#722ed1' },
  ];

  // Prepare data for revenue by product
  const revenueByProductData = [
    { name: 'Checkout', value: data.revenueByProduct.checkout, color: '#1890ff' },
    { name: 'RTO', value: data.revenueByProduct.rto, color: '#52c41a' },
    { name: 'Engage', value: data.revenueByProduct.engage, color: '#722ed1' },
    { name: 'Other', value: data.revenueByProduct.other, color: '#faad14' },
  ];

  // Prepare data for revenue trend
  const revenueTrendData = data.revenueTrend.data.map((item) => ({
    date: item.date,
    value: item.value,
    target: data.revenueTrend.target,
  }));

  // Format currency for charts
  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)}Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)}L`;
    } else {
      return `₹${value.toLocaleString()}`;
    }
  };

  return (
    <div className='revenue-impact-metrics'>
      <Paragraph>
        Revenue impact metrics track the financial contribution of the KwikPartner program to GoKwik's overall business.
      </Paragraph>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          {renderMetricCard(data.monthlyRevenueFromPartners)}
        </Col>
        <Col xs={24} sm={8}>
          {renderMetricCard(data.avgRevenuePerPartner)}
        </Col>
        <Col xs={24} sm={8}>
          {renderMetricCard(data.revenueToPayout)}
        </Col>
      </Row>

      <Divider />

      {/* Revenue Trend */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24}>
          <Card title='Monthly Revenue Trend' bordered={false}>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart data={revenueTrendData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <RechartsTooltip formatter={(value) => [formatCurrency(value as number), 'Revenue']} />
                  <Legend />
                  <Area
                    type='monotone'
                    dataKey='value'
                    name='Monthly Revenue'
                    stroke='#1890ff'
                    fill='#1890ff'
                    fillOpacity={0.3}
                  />
                  <Area
                    type='monotone'
                    dataKey='target'
                    name='Target'
                    stroke='#52c41a'
                    fill='#52c41a'
                    fillOpacity={0.1}
                    strokeDasharray='5 5'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Revenue Distribution */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title='Revenue by Partner Type' bordered={false}>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={revenueByPartnerTypeData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <RechartsTooltip formatter={(value) => [formatCurrency(value as number), 'Revenue']} />
                  <Legend />
                  <Bar dataKey='value' name='Revenue'>
                    {revenueByPartnerTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title='Revenue by Product' bordered={false}>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={revenueByProductData}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueByProductData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value) => [formatCurrency(value as number), 'Revenue']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Revenue Summary */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card bordered={false}>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title='Total Revenue (YTD)'
                  value={data.monthlyRevenueFromPartners.currentValue * 6} // Approximation for 6 months
                  formatter={(value) => formatCurrency(value as number)}
                  prefix={<DollarOutlined />}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title='Avg. Monthly Growth'
                  value={data.monthlyRevenueFromPartners.trend || 0}
                  suffix='%'
                  prefix={<ArrowUpOutlined />}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title='Projected Annual Revenue'
                  value={data.monthlyRevenueFromPartners.currentValue * 12} // Approximation for 12 months
                  formatter={(value) => formatCurrency(value as number)}
                  prefix={<DollarOutlined />}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RevenueImpactMetrics;
