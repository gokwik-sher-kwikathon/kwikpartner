import React from 'react';
import { Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import DashboardCard from './DashboardCard';

interface StatisticCardProps {
  title: string;
  value: number | string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  precision?: number;
  valueStyle?: React.CSSProperties;
  trend?: number;
  trendLabel?: string;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A card component that displays a statistic with optional trend indicator
 *
 * @param title - The title of the statistic
 * @param value - The value of the statistic
 * @param prefix - Icon or element to display before the value
 * @param suffix - Icon or element to display after the value
 * @param precision - Number of decimal places for the value
 * @param valueStyle - Custom style for the value
 * @param trend - Percentage change (positive or negative)
 * @param trendLabel - Label for the trend (e.g., "vs last month")
 * @param loading - Whether the card is in loading state
 * @param className - Additional CSS class
 * @param style - Additional CSS style
 */
const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  prefix,
  suffix,
  precision = 0,
  valueStyle,
  trend,
  trendLabel,
  loading = false,
  className,
  style,
}) => {
  const getTrendIcon = () => {
    if (trend === undefined) return null;
    return trend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
  };

  const getTrendColor = () => {
    if (trend === undefined) return {};
    return { color: trend >= 0 ? '#52c41a' : '#ff4d4f' };
  };

  return (
    <DashboardCard loading={loading} bodyStyle={{ padding: '20px' }} className={className} style={style}>
      <Statistic
        title={title}
        value={value}
        precision={precision}
        valueStyle={{ fontSize: 28, fontWeight: 600, ...valueStyle }}
        prefix={prefix}
        suffix={suffix}
      />
      {trend !== undefined && (
        <div style={{ marginTop: 8 }}>
          <span style={{ ...getTrendColor(), fontSize: 14 }}>
            {getTrendIcon()} {Math.abs(trend)}% {trendLabel || ''}
          </span>
        </div>
      )}
    </DashboardCard>
  );
};

export default StatisticCard;
