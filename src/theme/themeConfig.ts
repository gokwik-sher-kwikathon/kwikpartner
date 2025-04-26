import { theme } from 'antd';

export const themeConfig = {
  token: {
    colorPrimary: '#003c71', // Deep blue as primary color (updated)
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
    colorAccent: '#61b5ff', // Light blue as accent color
    borderRadius: 8, // Rounded corners throughout
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  components: {
    Card: {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      borderRadiusLG: 12,
      // Enhanced hover effect
      hoverable: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transform: 'translateY(-2px)',
      },
    },
    Button: {
      borderRadius: 6,
      controlHeight: 38,
    },
    Table: {
      borderRadius: 8,
      headerBg: '#f5f5f5',
    },
    Statistic: {
      contentFontSize: 28,
    },
    Menu: {
      darkItemSelectedBg: 'rgba(97, 181, 255, 0.2)', // Light blue with transparency for selected menu items
      darkItemHoverBg: 'rgba(255, 255, 255, 0.08)', // Subtle hover effect
    },
    Layout: {
      siderBg: '#003c71', // Deep blue for sidebar (updated)
      headerBg: '#ffffff', // White header
    },
  },
};

// Chart colors for consistent data visualization
export const chartColors = {
  primary: '#003c71', // Deep blue (updated)
  secondary: '#61b5ff', // Light blue
  tertiary: '#ff7a00', // Orange
  quaternary: '#4361ee', // Blue
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  gray: '#bfbfbf',

  // Subtle pastel colors for funnel chart
  pastel: {
    blue: '#a8c8ff', // Soft pastel blue
    green: '#b5c9a1', // Sage green
    beige: '#e6d7b9', // Warm beige
    rose: '#d9b8c4', // Dusty rose
    lavender: '#c9c0d3', // Muted lavender
    teal: '#a5d1d7', // Soft teal
  },
  // Elevation system
  shadow: {
    level1: '0 2px 8px rgba(0, 0, 0, 0.08)',
    level2: '0 4px 12px rgba(0, 0, 0, 0.1)',
    level3: '0 8px 24px rgba(0, 0, 0, 0.12)',
    level4: '0 12px 32px rgba(0, 0, 0, 0.16)',
  },
  // Animation durations
  animation: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
};
