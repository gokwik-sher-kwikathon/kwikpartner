import React from 'react';
import { Row, Col, Card, Statistic, Typography, Progress, Tooltip, Divider } from 'antd';
import { InfoCircleOutlined, ArrowUpOutlined, ArrowDownOutlined, UserOutlined } from '@ant-design/icons';
import { PartnerActivationMetrics as PartnerActivationMetricsType, TargetMetric } from '../../types/adminDashboard';
import { Pie, Line } from 'recharts';
import {
  ResponsiveContainer,
  PieChart,
  Cell,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts';

const { Title, Text, Paragraph } = Typography;

interface PartnerActivationMetricsProps {
  data: PartnerActivationMetricsType;
}

const PartnerActivationMetrics: React.FC<PartnerActivationMetricsProps> = ({ data }) => {
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

  // Prepare data for partner type pie chart
  const partnerTypeData = [
    { name: 'Referral Partners', value: data.partnersByType.referral, color: '#1890ff' },
    { name: 'Reseller Partners', value: data.partnersByType.reseller, color: '#52c41a' },
    { name: 'Service Partners', value: data.partnersByType.service, color: '#722ed1' },
  ];

  // Prepare data for partner activity line chart
  const partnerActivityData = data.partnerActivity.data.map((item) => ({
    date: item.date,
    value: item.value,
    target: data.partnerActivity.target,
  }));

  return (
    <div className='partner-activation-metrics'>
      <Paragraph>
        Partner activation metrics track how effectively we're onboarding and engaging partners on the KwikPartner
        platform.
      </Paragraph>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          {renderMetricCard(data.activePartnersPercentage)}
        </Col>
        <Col xs={24} sm={8}>
          {renderMetricCard(data.timeToFirstLead)}
        </Col>
        <Col xs={24} sm={8}>
          {renderMetricCard(data.portalEngagementRate)}
        </Col>
      </Row>

      <Divider />

      {/* Partner Distribution */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title='Partner Distribution by Type' bordered={false}>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={partnerTypeData}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {partnerTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value) => [`${value} partners`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <Statistic
                title='Total Partners'
                value={data.partnersByType.referral + data.partnersByType.reseller + data.partnersByType.service}
                prefix={<UserOutlined />}
              />
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title='Partner Activity Trend (Weekly Login %)' bordered={false}>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={partnerActivityData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' />
                  <YAxis domain={[0, 100]} />
                  <RechartsTooltip formatter={(value) => [`${value}%`, 'Active Partners']} />
                  <Legend />
                  <Line type='monotone' dataKey='value' name='Weekly Login %' stroke='#1890ff' activeDot={{ r: 8 }} />
                  <Line type='monotone' dataKey='target' name='Target' stroke='#52c41a' strokeDasharray='5 5' />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PartnerActivationMetrics;
