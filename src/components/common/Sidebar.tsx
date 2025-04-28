import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Avatar, Divider, Tooltip, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import GKLogo from '../../images/GK_Logo.png';
import {
  DashboardOutlined,
  UserOutlined,
  FormOutlined,
  LineChartOutlined,
  BookOutlined,
  FileOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  ToolOutlined,
  BulbOutlined,
  DollarOutlined,
  BellOutlined,
  NotificationOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useApp } from '../../context/AppContext';
import { chartColors } from '../../theme/themeConfig';

const { Sider } = Layout;
const { Title, Text } = Typography;

interface SidebarProps {
  collapsed: boolean;
  onMenuClick?: () => void; // Optional callback for mobile drawer
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useApp();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // Update selected keys when location changes
  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      setSelectedKeys([pathSegments.join('/')]);
    } else {
      setSelectedKeys(['dashboard']);
    }
  }, [location.pathname]);

  // Handle menu item click
  const handleMenuClick = (path: string) => {
    navigate(path);
    // If onMenuClick is provided (for mobile drawer), call it
    if (onMenuClick) {
      onMenuClick();
    }
  };

  // Get menu items based on user role
  const getMenuItems = () => {
    const commonItems = [
      {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
        onClick: () => handleMenuClick('/dashboard'),
      },
      {
        key: 'nudges',
        icon: <BellOutlined />,
        label: 'Todo Tasks',
        onClick: () => handleMenuClick('/nudges'),
      },
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: 'Profile',
        onClick: () => handleMenuClick('/profile'),
      },
    ];

    // Admin menu items
    const adminItems = [
      {
        key: 'admin',
        label: 'GoKwik Admin',
        type: 'group',
        children: [
          {
            key: 'admin/dashboard',
            icon: <LineChartOutlined />,
            label: 'Admin Dashboard',
            onClick: () => handleMenuClick('/admin/dashboard'),
          },
        ],
      },
    ];

    // Role-specific menu items
    const roleItems = {
      admin: adminItems,
      referralPartner: [
        {
          key: 'referral',
          label: 'Referral Partner',
          type: 'group',
          children: [
            {
              key: 'referral/form',
              icon: <FormOutlined />,
              label: 'Submit Lead',
              onClick: () => handleMenuClick('/referral/form'),
            },
            {
              key: 'referral/tracker',
              icon: <LineChartOutlined />,
              label: 'Referral Tracker',
              onClick: () => handleMenuClick('/referral/tracker'),
            },
            {
              key: 'referral/commission',
              icon: <DollarOutlined />,
              label: 'Commissions',
              onClick: () => handleMenuClick('/referral/commission'),
            },
            {
              key: 'referral/learn',
              icon: <BookOutlined />,
              label: 'Learn',
              onClick: () => handleMenuClick('/referral/learn'),
            },
          ],
        },
      ],
      resellerPartner: [
        {
          key: 'reseller',
          label: 'Reseller Partner',
          type: 'group',
          children: [
            {
              key: 'reseller/leads',
              icon: <TeamOutlined />,
              label: 'Lead Pipeline',
              onClick: () => handleMenuClick('/reseller/leads'),
            },
            {
              key: 'reseller/docs',
              icon: <FileOutlined />,
              label: 'Upload Docs / KYC',
              onClick: () => handleMenuClick('/reseller/docs'),
            },
            {
              key: 'reseller/close',
              icon: <CheckCircleOutlined />,
              label: 'Close Deals',
              onClick: () => handleMenuClick('/reseller/close'),
            },
            {
              key: 'reseller/commission',
              icon: <DollarOutlined />,
              label: 'Commissions',
              onClick: () => handleMenuClick('/reseller/commission'),
            },
            {
              key: 'reseller/playbooks',
              icon: <BookOutlined />,
              label: 'GTM Playbooks',
              onClick: () => handleMenuClick('/reseller/playbooks'),
            },
          ],
        },
      ],
      servicePartner: [
        {
          key: 'service',
          label: 'Service Partner',
          type: 'group',
          children: [
            {
              key: 'service/assigned',
              icon: <TeamOutlined />,
              label: 'Assigned Brands',
              onClick: () => handleMenuClick('/service/assigned'),
            },
            {
              key: 'service/setup',
              icon: <ToolOutlined />,
              label: 'Setup Tracker',
              onClick: () => handleMenuClick('/service/setup'),
            },
            {
              key: 'service/docs',
              icon: <FileOutlined />,
              label: 'Tech Documentation',
              onClick: () => handleMenuClick('/service/docs'),
            },
            {
              key: 'service/incentives',
              icon: <DollarOutlined />,
              label: 'Incentive Tracker',
              onClick: () => handleMenuClick('/service/incentives'),
            },
            {
              key: 'service/guides',
              icon: <BulbOutlined />,
              label: 'Dev Guides',
              onClick: () => handleMenuClick('/service/guides'),
            },
          ],
        },
      ],
    };

    // Return menu items based on user role
    if (state.user?.role && roleItems[state.user.role]) {
      return [...commonItems, ...roleItems[state.user.role]];
    }

    // Default to referral partner if no role is set
    return [...commonItems, ...roleItems.referralPartner];
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={260}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
        boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
        zIndex: 1000,
        background: '#003c71', // Deep blue background (updated)
        transition: 'all var(--transition-normal)',
      }}
    >
      {/* Logo and Brand */}
      <div
        style={{
          padding: collapsed ? '20px 8px' : '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          marginBottom: 20,
          background: 'rgba(0,0,0,0.1)', // Slightly darker background for header
        }}
      >
        <img
          src={GKLogo}
          alt='KwikPartner Logo'
          style={{
            width: collapsed ? 36 : 40,
            height: collapsed ? 36 : 40,
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)', // Subtle shadow for depth
            objectFit: 'contain',
            background: 'white',
            padding: '2px',
          }}
        />
        {!collapsed && (
          <Title level={4} style={{ margin: '0 0 0 12px', color: 'white', fontWeight: 600 }}>
            KwikPartner
          </Title>
        )}
      </div>

      {/* Main Menu */}
      <Menu
        theme='dark'
        mode='inline'
        selectedKeys={selectedKeys}
        items={getMenuItems() as any}
        style={{
          border: 'none',
          padding: '0 12px',
          background: 'transparent', // Transparent background
          fontSize: '14px',
        }}
      />

      {/* Collapse Toggle Button */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 0,
          width: '100%',
          textAlign: 'center',
          padding: '12px 0',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(0,0,0,0.1)', // Slightly darker background
        }}
      >
        <Tooltip title={collapsed ? 'Expand' : 'Collapse'} placement='right'>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => onMenuClick && onMenuClick()}
            style={{
              color: 'rgba(255,255,255,0.8)',
              transition: 'all var(--transition-fast)',
            }}
            className='animate-hover'
          />
        </Tooltip>
      </div>

      {/* User Profile Section */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          padding: collapsed ? '16px 8px' : '16px 24px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)', // Frosted glass effect
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          <Avatar
            size={36}
            icon={<UserOutlined />}
            style={{
              background: chartColors.secondary, // Light blue avatar background
              color: 'white',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)', // Subtle shadow for depth
            }}
          />
          {!collapsed && (
            <div style={{ marginLeft: 12 }}>
              <Text
                style={{
                  color: 'white',
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 500, // Medium weight for better readability
                }}
              >
                {state.user?.name || 'John Doe'}
              </Text>
              <Text
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: 12,
                  fontWeight: 400, // Regular weight for secondary text
                }}
              >
                {state.user?.role === 'referralPartner'
                  ? 'Referral Partner'
                  : state.user?.role === 'resellerPartner'
                  ? 'Reseller Partner'
                  : state.user?.role === 'servicePartner'
                  ? 'Service Partner'
                  : state.user?.role === 'admin'
                  ? 'Admin'
                  : 'Partner'}
              </Text>
            </div>
          )}
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
