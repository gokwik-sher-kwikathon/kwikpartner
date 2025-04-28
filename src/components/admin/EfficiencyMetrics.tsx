import React from 'react';
import { Row, Col, Card, Statistic, Typography, Progress, Tooltip, Divider } from 'antd';
import { InfoCircleOutlined, ArrowUpOutlined, ArrowDownOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { EfficiencyMetrics as EfficiencyMetricsType, TargetMetric } from '../../types/adminDashboard';
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

interface EfficiencyMetricsProps {
  data: EfficiencyMetricsType;
}

const EfficiencyMetrics: React.FC<EfficiencyMetricsProps> = ({ data }) => {
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

  // Prepare data for sales cycle comparison
  const salesCycleData = [
    { name: 'Direct Sales', value: data.avgDaysToActivation.direct, color: '#faad14' },
    { name: 'Partner-Led', value: data.avgDaysToActivation.partnerLed, color: '#52c41a' },
  ];

  // Prepare data for activations by type
  const activationsByTypeData = [
    { name: 'Partner-Led', value: data.activationsByType.partnerLed, color: '#52c41a' },
    { name: 'Sales Team Assisted', value: data.activationsByType.salesTeamAssisted, color: '#1890ff' },
  ];

  // Prepare data for efficiency trend
  const efficiencyTrendData = data.efficiencyTrend.data.map((item) => ({
    date: item.date,
    value: item.value,
    target: data.efficiencyTrend.target,
  }));

  return (
    <div className='efficiency-metrics'>
      <Paragraph>
        Efficiency metrics track how the KwikPartner program is improving operational efficiency and reducing costs for
        GoKwik.
      </Paragraph>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12}>
          {renderMetricCard(data.salesCycleReduction)}
        </Col>
        <Col xs={24} sm={12}>
          {renderMetricCard(data.salesTeamLoadReduction)}
        </Col>
      </Row>

      <Divider />

      {/* Sales Cycle Comparison */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title='Average Days to Activation' bordered={false}>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={salesCycleData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                  <RechartsTooltip formatter={(value) => [`${value} days`, 'Avg. Time']} />
                  <Legend />
                  <Bar dataKey='value' name='Days to Activation'>
                    {salesCycleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <Statistic
                title='Time Saved'
                value={data.avgDaysToActivation.direct - data.avgDaysToActivation.partnerLed}
                suffix='days'
                valueStyle={{ color: '#52c41a' }}
                prefix={<ClockCircleOutlined />}
              />
              <Text type='secondary'>
                Partner-led activations are{' '}
                {Math.round(
                  ((data.avgDaysToActivation.direct - data.avgDaysToActivation.partnerLed) /
                    data.avgDaysToActivation.direct) *
                    100,
                )}
                % faster
              </Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title='Activations by Type' bordered={false}>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={activationsByTypeData}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {activationsByTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Efficiency Trend */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card title='Sales Team Load Reduction Trend' bordered={false}>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={efficiencyTrendData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' />
                  <YAxis domain={[0, 100]} label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                  <RechartsTooltip formatter={(value) => [`${value}%`, 'Load Reduction']} />
                  <Legend />
                  <Line type='monotone' dataKey='value' name='Load Reduction' stroke='#1890ff' activeDot={{ r: 8 }} />
                  <Line type='monotone' dataKey='target' name='Target' stroke='#52c41a' strokeDasharray='5 5' />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Efficiency Impact Summary */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card bordered={false}>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title='Est. Annual Time Saved'
                  value={(data.avgDaysToActivation.direct - data.avgDaysToActivation.partnerLed) * 250} // Approximation based on 250 activations per year
                  suffix='days'
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ClockCircleOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title='Sales Team Capacity Freed'
                  value={data.salesTeamLoadReduction.currentValue}
                  suffix='%'
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title='Partner-Led Activations'
                  value={data.activationsByType.partnerLed}
                  suffix='%'
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

export default EfficiencyMetrics;
