import React from 'react';
import { Row, Col, Card, Progress, Statistic, Typography, Tooltip } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { ExecutiveSummaryMetrics, TargetMetric } from '../../types/adminDashboard';

const { Text } = Typography;

interface ExecutiveSummaryProps {
  data: ExecutiveSummaryMetrics;
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ data }) => {
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

  return (
    <div className='executive-summary'>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={8} xl={4}>
          {renderMetricCard(data.activePartners)}
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={4}>
          {renderMetricCard(data.avgLeadsPerPartner)}
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={4}>
          {renderMetricCard(data.leadToActivationRate)}
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={4}>
          {renderMetricCard(data.revenueFromPartnerBrands)}
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={4}>
          {renderMetricCard(data.salesCycleReduction)}
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={4}>
          {renderMetricCard(data.partnerNPS)}
        </Col>
      </Row>
    </div>
  );
};

export default ExecutiveSummary;
