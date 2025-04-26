import React, { ReactNode } from 'react';
import { Typography, Breadcrumb, Space, Divider } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import layout from 'antd/es/layout';

const { Title, Text } = Typography;

interface BreadcrumbItem {
  /**
   * The title of the breadcrumb item
   */
  title: string;

  /**
   * Optional path for the breadcrumb item
   */
  path?: string;

  /**
   * Optional icon for the breadcrumb item
   */
  icon?: ReactNode;
}

interface PageLayoutProps {
  /**
   * The title of the page
   */
  title: string;

  /**
   * Optional subtitle for the page
   */
  subtitle?: string;

  /**
   * Optional breadcrumb items
   */
  breadcrumbs?: BreadcrumbItem[];

  /**
   * Optional actions to display in the header
   */
  actions?: ReactNode;

  /**
   * The main content of the page
   */
  children: ReactNode;

  /**
   * Whether to show a divider between the header and content
   */
  showDivider?: boolean;

  /**
   * Whether to add padding to the content
   */
  contentPadding?: boolean;

  /**
   * Additional CSS class for the page container
   */
  className?: string;

  /**
   * Additional CSS style for the page container
   */
  style?: React.CSSProperties;

  /**
   * Additional CSS class for the content container
   */
  contentClassName?: string;

  /**
   * Additional CSS style for the content container
   */
  contentStyle?: React.CSSProperties;
}

/**
 * A page layout component with title, subtitle, breadcrumbs, and actions
 */
const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
  children,
  showDivider = true,
  contentPadding = true,
  className,
  style,
  contentClassName,
  contentStyle,
}) => {
  // Render breadcrumbs
  const renderBreadcrumbs = () => {
    if (!breadcrumbs || breadcrumbs.length === 0) return null;

    return (
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to='/'>
            <HomeOutlined /> Home
          </Link>
        </Breadcrumb.Item>

        {breadcrumbs.map((item, index) => (
          <Breadcrumb.Item key={index}>
            {item.path ? (
              <Link to={item.path}>
                {item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>}
                {item.title}
              </Link>
            ) : (
              <>
                {item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>}
                {item.title}
              </>
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  };

  // Render page header
  const renderHeader = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // Changed from 'flex-start' to 'center'
        marginBottom: showDivider ? 16 : 24,
      }}
    >
      <style>
        {`
        .ant-layout-content {
            background: #f5f5f5 !important;
          }`}
      </style>

      <div>
        {renderBreadcrumbs()}

        <Title level={2} style={{ margin: 0, marginBottom: subtitle ? 8 : 0 }}>
          {title}
        </Title>

        {subtitle && (
          <Text type='secondary' style={{ fontSize: 16 }}>
            {subtitle}
          </Text>
        )}
      </div>

      {actions && (
        <Space size='middle' align='center' style={{ marginTop: 0 }}>
          {' '}
          {/* Removed conditional margin */}
          {actions}
        </Space>
      )}
    </div>
  );

  return (
    <div className={`page-layout ${className || ''}`} style={style}>
      {renderHeader()}

      {showDivider && <Divider style={{ margin: '0 0 24px 0' }} />}

      <div
        className={`page-content ${contentClassName || ''}`}
        style={{
          padding: contentPadding ? '0 0 24px 0' : 0,
          ...contentStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
