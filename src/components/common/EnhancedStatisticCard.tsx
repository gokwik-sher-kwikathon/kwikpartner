import React from 'react';
import { Statistic, Tooltip, Space } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, InfoCircleOutlined } from '@ant-design/icons';
import ElevatedCard, { ElevationLevel } from './ElevatedCard';
import { chartColors } from '../../theme/themeConfig';
import { formatIndianRupees, formatPercentage } from '../../utils/formatters';

interface EnhancedStatisticCardProps {
  /**
   * The title of the statistic
   */
  title: string;

  /**
   * The value of the statistic
   */
  value: number | string;

  /**
   * Whether the value is a currency (₹)
   */
  isCurrency?: boolean;

  /**
   * Optional prefix icon or element
   */
  prefix?: React.ReactNode;

  /**
   * Optional suffix icon or element
   */
  suffix?: React.ReactNode;

  /**
   * Number of decimal places for the value
   */
  precision?: number;

  /**
   * Custom style for the value
   */
  valueStyle?: React.CSSProperties;

  /**
   * Optional trend percentage (positive or negative)
   */
  trend?: number;

  /**
   * Optional label for the trend (e.g., "vs last month")
   */
  trendLabel?: string;

  /**
   * Optional tooltip content for additional information
   */
  tooltip?: string;

  /**
   * Optional accent color for the card
   */
  accentColor?: string;

  /**
   * The elevation level of the card (1-4)
   */
  elevation?: ElevationLevel;

  /**
   * Whether the card is in a loading state
   */
  loading?: boolean;

  /**
   * Optional callback for when the card is clicked
   */
  onClick?: () => void;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional CSS style
   */
  style?: React.CSSProperties;
}

/**
 * An enhanced statistic card component with trend indicator and tooltip
 */
const EnhancedStatisticCard: React.FC<EnhancedStatisticCardProps> = ({
  title,
  value,
  prefix,
  suffix,
  precision = 0,
  valueStyle,
  trend,
  trendLabel,
  tooltip,
  accentColor,
  elevation = 2,
  loading = false,
  onClick,
  className,
  style,
  isCurrency = false,
}) => {
  // Determine trend icon and color
  const getTrendIcon = () => {
    if (trend === undefined) return null;
    return trend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
  };

  const getTrendColor = () => {
    if (trend === undefined) return {};
    return { color: trend >= 0 ? chartColors.success : chartColors.error };
  };

  // Render the title with optional tooltip
  const renderTitle = () => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      <span style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>{title}</span>
      {tooltip && (
        <Tooltip title={tooltip}>
          <InfoCircleOutlined style={{ marginLeft: 8, color: 'var(--color-text-tertiary)' }} />
        </Tooltip>
      )}
    </div>
  );

  // Format the value if it's a currency
  const formattedValue = isCurrency ? formatIndianRupees(value, precision) : value;

  // If it's a currency, we don't need the suffix since the symbol is already in the formatted value
  const displaySuffix = isCurrency ? undefined : suffix;

  // If it's a currency, we don't need a prefix since the ₹ symbol is already in the formatted value
  const displayPrefix = isCurrency ? undefined : prefix;

  return (
    <ElevatedCard
      elevation={elevation}
      accentColor={accentColor}
      loading={loading}
      onClick={onClick}
      className={`enhanced-statistic-card ${className || ''}`}
      style={style}
      bodyStyle={{ padding: '20px' }}
      hoverable={!!onClick}
    >
      {renderTitle()}

      <Statistic
        value={formattedValue}
        // If we're using a formatted currency value, we don't need precision
        precision={isCurrency ? undefined : precision}
        valueStyle={{
          fontSize: 28,
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          ...valueStyle,
        }}
        prefix={displayPrefix}
        suffix={displaySuffix}
      />

      {trend !== undefined && (
        <div style={{ marginTop: 12 }}>
          <Space>
            <span style={{ ...getTrendColor(), fontSize: 14, fontWeight: 500 }}>
              {getTrendIcon()} {Math.abs(trend)}%
            </span>
            {trendLabel && <span style={{ color: 'var(--color-text-tertiary)', fontSize: 13 }}>{trendLabel}</span>}
          </Space>
        </div>
      )}
    </ElevatedCard>
  );
};

export default EnhancedStatisticCard;
