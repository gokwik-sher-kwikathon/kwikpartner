import React from 'react';
import { Layout, Button, Dropdown, Badge, Space, Avatar, Typography } from 'antd';
import type { MenuProps } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  showChat: () => void;
  showDrawer?: () => void;
  isMobile?: boolean;
}

const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed, showChat, showDrawer, isMobile = false }) => {
  const navigate = useNavigate();
  const { state, logout } = useApp();
  const { user, nudges } = state;

  // User dropdown menu items
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/profile'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => {
        logout();
        navigate('/login');
      },
    },
  ];

  // Notifications dropdown menu
  const notificationItems: MenuProps['items'] =
    nudges.length > 0
      ? nudges.map((nudge, index) => ({
          key: `notification-${index}`,
          label: (
            <div>
              <Text strong>{nudge.message}</Text>
              <br />
              <Text type='secondary' style={{ fontSize: '12px' }}>
                {nudge.priority === 'high'
                  ? '⚠️ High Priority'
                  : nudge.priority === 'medium'
                  ? '⚡ Medium Priority'
                  : '📌 Low Priority'}
              </Text>
            </div>
          ),
        }))
      : [
          {
            key: 'no-notifications',
            label: 'No new notifications',
            disabled: true,
          },
        ];

  return (
    <AntHeader className='flex justify-between bg-white items-center pr-4 pl-0'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isMobile ? (
          <Button
            type='text'
            icon={<MenuOutlined />}
            onClick={showDrawer}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
        ) : (
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
        )}
        {!isMobile && (
          <Text strong style={{ fontSize: '16px' }}>
            {user?.role === 'referralPartner'
              ? 'Referral Partner Dashboard'
              : user?.role === 'resellerPartner'
              ? 'Reseller Partner Dashboard'
              : 'Service Partner Dashboard'}
          </Text>
        )}
      </div>

      <Space>
        {/* AI Assistant Button */}
        <Button
          type='primary'
          icon={<QuestionCircleOutlined />}
          onClick={showChat}
          style={{
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            height: isMobile ? '32px' : '36px',
            padding: isMobile ? '0 12px' : '0 16px',
          }}
          size={isMobile ? 'small' : 'middle'}
        >
          {!isMobile && 'Ask EiDA'}
        </Button>

        {/* Notifications */}
        <Dropdown
          menu={{ items: notificationItems }}
          placement='bottomRight'
          arrow={{ pointAtCenter: true }}
          trigger={['click']}
        >
          <Badge count={nudges.length} size='small'>
            <Button type='text' icon={<BellOutlined />} />
          </Badge>
        </Dropdown>

        {/* User Profile */}
        <Dropdown menu={{ items: userMenuItems }} placement='bottomRight' arrow={{ pointAtCenter: true }}>
          <div className='flex gap-2 items-center'>
            <Avatar
              style={{
                backgroundColor: '#1890ff',
              }}
              icon={<UserOutlined />}
              src={user?.profileImage}
              size={isMobile ? 'default' : 36}
            />
            {!isMobile && <div>{user?.name || 'User'}</div>}
          </div>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Header;
