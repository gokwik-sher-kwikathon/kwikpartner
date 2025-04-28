import React from 'react';
import { Row, Col, Card, Statistic, Typography, Progress, Tooltip, Divider, List, Avatar, Tag } from 'antd';
import {
  InfoCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SmileOutlined,
  MehOutlined,
  FrownOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { SatisfactionMetrics, TargetMetric } from '../../types/adminDashboard';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  Cell,
} from 'recharts';

const { Title, Text, Paragraph } = Typography;

interface PartnerSatisfactionMetricsProps {
  data: SatisfactionMetrics;
}

const PartnerSatisfactionMetrics: React.FC<PartnerSatisfactionMetricsProps> = ({ data }) => {
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
    } else if (unit === 'score') {
      return value.toString();
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

  // Helper function to get satisfaction icon based on score
  const getSatisfactionIcon = (score: number) => {
    if (score >= 8) return <SmileOutlined style={{ color: '#52c41a' }} />;
    if (score >= 6) return <MehOutlined style={{ color: '#faad14' }} />;
    return <FrownOutlined style={{ color: '#f5222d' }} />;
  };

  // Helper function to get satisfaction tag based on score
  const getSatisfactionTag = (score: number) => {
    if (score >= 8) return <Tag color='success'>Promoter</Tag>;
    if (score >= 6) return <Tag color='warning'>Passive</Tag>;
    return <Tag color='error'>Detractor</Tag>;
  };

  // Prepare data for satisfaction trend
  const satisfactionTrendData = data.satisfactionTrend.data.map((item) => ({
    date: item.date,
    value: item.value,
    target: data.satisfactionTrend.target,
  }));

  // Prepare data for NPS distribution
  const npsDistributionData = [
    { name: 'Promoters', value: 65, color: '#52c41a' },
    { name: 'Passives', value: 20, color: '#faad14' },
    { name: 'Detractors', value: 15, color: '#f5222d' },
  ];

  return (
    <div className='partner-satisfaction-metrics'>
      <Paragraph>
        Partner satisfaction metrics track how happy and engaged partners are with the KwikPartner program and GoKwik's
        support.
      </Paragraph>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12}>
          {renderMetricCard(data.partnerNPS)}
        </Col>
        <Col xs={24} sm={12}>
          {renderMetricCard(data.commissionPayoutAccuracy)}
        </Col>
      </Row>

      <Divider />

      {/* NPS Distribution and Trend */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title='NPS Distribution' bordered={false}>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={npsDistributionData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                  <RechartsTooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Legend />
                  <Bar dataKey='value' name='Percentage'>
                    {npsDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title='Partner NPS Trend' bordered={false}>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={satisfactionTrendData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' />
                  <YAxis domain={[0, 100]} />
                  <RechartsTooltip formatter={(value) => [`${value}`, 'NPS Score']} />
                  <Legend />
                  <Line type='monotone' dataKey='value' name='NPS Score' stroke='#1890ff' activeDot={{ r: 8 }} />
                  <Line type='monotone' dataKey='target' name='Target' stroke='#52c41a' strokeDasharray='5 5' />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Partner Feedback */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card title='Recent Partner Feedback' bordered={false}>
            <List
              itemLayout='horizontal'
              dataSource={data.partnerFeedback}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{item.partnerName}</span>
                        <div>
                          {getSatisfactionTag(item.score)}
                          <span style={{ marginLeft: 8 }}>
                            Score: <Text strong>{item.score}/10</Text> {getSatisfactionIcon(item.score)}
                          </span>
                        </div>
                      </div>
                    }
                    description={
                      <div>
                        <Text>{item.feedback}</Text>
                        <div style={{ marginTop: 4 }}>
                          <Text type='secondary'>{item.date}</Text>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Satisfaction Summary */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card bordered={false}>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title='Promoters'
                  value={65}
                  suffix='%'
                  valueStyle={{ color: '#52c41a' }}
                  prefix={<SmileOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title='Passives'
                  value={20}
                  suffix='%'
                  valueStyle={{ color: '#faad14' }}
                  prefix={<MehOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title='Detractors'
                  value={15}
                  suffix='%'
                  valueStyle={{ color: '#f5222d' }}
                  prefix={<FrownOutlined />}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PartnerSatisfactionMetrics;
