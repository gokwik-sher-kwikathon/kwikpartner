import React from 'react';
import { Card, CardProps } from 'antd';

interface DashboardCardProps extends CardProps {
  hoverable?: boolean;
  loading?: boolean;
}

/**
 * A styled Card component for dashboard use with consistent styling
 *
 * @param children - Card content
 * @param hoverable - Whether the card should have hover effects
 * @param loading - Whether the card is in loading state
 * @param props - Additional Card props
 */
const DashboardCard: React.FC<DashboardCardProps> = ({ children, hoverable = true, loading = false, ...props }) => {
  return (
    <Card
      {...props}
      className={`dashboard-card ${props.className || ''}`}
      style={{
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        height: '100%',
        ...props.style,
      }}
      hoverable={hoverable}
      loading={loading}
    >
      {children}
    </Card>
  );
};

export default DashboardCard;
