import React, { useState } from 'react';
import { Card, CardProps } from 'antd';
import { chartColors } from '../../theme/themeConfig';

export type ElevationLevel = 1 | 2 | 3 | 4;

interface ElevatedCardProps extends CardProps {
  /**
   * The elevation level of the card (1-4)
   * Level 1: Default card with subtle shadow
   * Level 2: Highlighted card with medium shadow
   * Level 3: Prominent card with larger shadow
   * Level 4: Floating card with largest shadow
   */
  elevation?: ElevationLevel;

  /**
   * Whether the card should have a hover effect
   */
  hoverable?: boolean;

  /**
   * Whether the card should animate on hover
   */
  animated?: boolean;

  /**
   * Optional accent color (for styling, no border)
   */
  accentColor?: string;

  /**
   * Optional callback for when the card is clicked
   */
  onClick?: () => void;

  /**
   * Whether the card is in a loading state
   */
  loading?: boolean;

  /**
   * Whether the card is in a disabled state
   */
  disabled?: boolean;
}

/**
 * A card component with configurable elevation levels and hover effects
 */
const ElevatedCard: React.FC<ElevatedCardProps> = ({
  children,
  elevation = 1,
  hoverable = true,
  animated = true,
  accentColor,
  onClick,
  loading = false,
  disabled = false,
  className = '',
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Get shadow based on elevation level
  const getShadow = (level: ElevationLevel) => {
    switch (level) {
      case 1:
        return 'var(--shadow-sm)';
      case 2:
        return 'var(--shadow-md)';
      case 3:
        return 'var(--shadow-lg)';
      case 4:
        return 'var(--shadow-xl)';
      default:
        return 'var(--shadow-sm)';
    }
  };

  // Get transform based on elevation level and hover state
  const getTransform = () => {
    if (!hoverable || disabled) return 'none';

    if (isHovered && animated) {
      switch (elevation) {
        case 1:
          return 'translateY(-2px)';
        case 2:
          return 'translateY(-3px)';
        case 3:
          return 'translateY(-4px)';
        case 4:
          return 'translateY(-5px) scale(1.01)';
        default:
          return 'translateY(-2px)';
      }
    }

    return elevation > 1 ? `translateY(-${elevation - 1}px)` : 'none';
  };

  // Base styles for the card
  const cardStyle: React.CSSProperties = {
    borderRadius: 'var(--radius-md)',
    boxShadow: getShadow(elevation),
    border: 'none',
    transition: 'all var(--transition-normal)',
    transform: getTransform(),
    opacity: disabled ? 0.6 : 1,
    cursor: onClick && !disabled ? 'pointer' : 'default',
    overflow: 'hidden',
    height: '100%',
    // Removed border-left
    ...style,
  };

  // Hover and active handlers
  const handleMouseEnter = () => {
    if (hoverable && !disabled) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (hoverable && !disabled) {
      setIsHovered(false);
    }
  };

  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  return (
    <Card
      {...props}
      className={`elevated-card elevation-${elevation} ${className}`}
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      loading={loading}
      hoverable={false} // We handle hover effects manually
    >
      {children}
    </Card>
  );
};

export default ElevatedCard;
