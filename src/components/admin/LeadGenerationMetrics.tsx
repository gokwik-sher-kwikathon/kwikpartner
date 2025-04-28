import React from 'react';
import { Row, Col, Card, Statistic, Typography, Progress, Tooltip, Divider } from 'antd';
import { InfoCircleOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { LeadGenerationMetrics as LeadGenerationMetricsType, TargetMetric } from '../../types/adminDashboard';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
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

interface LeadGenerationMetricsProps {
  data: LeadGenerationMetricsType;
}

const LeadGenerationMetrics: React.FC<LeadGenerationMetricsProps> = ({ data }) => {
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

  // Prepare data for leads by stage funnel
  const leadsByStageData = [
    { name: 'Prospecting', value: data.leadsByStage.prospecting, color: '#1890ff' },
    { name: 'Pitch', value: data.leadsByStage.pitch, color: '#52c41a' },
    { name: 'Objection', value: data.leadsByStage.objection, color: '#faad14' },
    { name: 'BA Shared', value: data.leadsByStage.baShared, color: '#722ed1' },
    { name: 'Signed', value: data.leadsByStage.signed, color: '#eb2f96' },
    { name: 'Go Live', value: data.leadsByStage.goLive, color: '#13c2c2' },
  ];

  // Prepare data for leads by product
  const leadsByProductData = [
    { name: 'Checkout', value: data.leadsByProduct.checkout, color: '#1890ff' },
    { name: 'RTO', value: data.leadsByProduct.rto, color: '#52c41a' },
    { name: 'Engage', value: data.leadsByProduct.engage, color: '#722ed1' },
    { name: 'Other', value: data.leadsByProduct.other, color: '#faad14' },
  ];

  // Prepare data for lead conversion trend
  const leadConversionTrendData = data.leadConversionTrend.data.map((item) => ({
    date: item.date,
    value: item.value,
    target: data.leadConversionTrend.target,
  }));

  return (
    <div className='lead-generation-metrics'>
      <Paragraph>
        Lead generation metrics track how effectively partners are submitting leads and how well those leads are
        converting through the sales funnel.
      </Paragraph>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          {renderMetricCard(data.avgLeadsPerPartner)}
        </Col>
        <Col xs={24} sm={8}>
          {renderMetricCard(data.leadToKYCSubmissionRate)}
        </Col>
        <Col xs={24} sm={8}>
          {renderMetricCard(data.leadToActivationRate)}
        </Col>
      </Row>

      <Divider />

      {/* Lead Funnel and Product Distribution */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title='Lead Funnel by Stage' bordered={false}>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={leadsByStageData} layout='vertical' margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis type='number' />
                  <YAxis dataKey='name' type='category' />
                  <RechartsTooltip formatter={(value) => [`${value} leads`, 'Count']} />
                  <Legend />
                  <Bar dataKey='value' name='Leads'>
                    {leadsByStageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title='Leads by Product' bordered={false}>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={leadsByProductData}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {leadsByProductData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value) => [`${value} leads`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Lead Conversion Trend */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card title='Lead-to-Activation Rate Trend' bordered={false}>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={leadConversionTrendData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' />
                  <YAxis domain={[0, 100]} />
                  <RechartsTooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
                  <Legend />
                  <Line type='monotone' dataKey='value' name='Conversion Rate' stroke='#1890ff' activeDot={{ r: 8 }} />
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

export default LeadGenerationMetrics;
