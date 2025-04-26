import React, { useState, useEffect } from 'react';
import { Layout, theme, Drawer, Button, Grid } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import AIChat from './AIChat';
import { MenuOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Automatically collapse sidebar on small screens
  useEffect(() => {
    if (screens.xs || screens.sm) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screens]);

  // Handle drawer visibility
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // Determine if we're on a mobile device
  const isMobile = !screens.md;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar collapsed={collapsed} />}

      {/* Mobile Drawer Sidebar */}
      <Drawer
        placement='left'
        closable={false}
        onClose={closeDrawer}
        open={drawerVisible}
        width={250}
        bodyStyle={{ padding: 0, backgroundColor: '#001529' }}
      >
        <Sidebar collapsed={false} onMenuClick={closeDrawer} />
      </Drawer>

      <Layout>
        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          showChat={() => setChatVisible(true)}
          showDrawer={showDrawer}
          isMobile={isMobile}
        />

        <Content
          style={{
            margin: isMobile ? '16px 8px' : '24px 16px',
            padding: isMobile ? 16 : 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 280,
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>

      {/* AI Chat Widget */}
      <AIChat visible={chatVisible} onClose={() => setChatVisible(false)} />
    </Layout>
  );
};

export default AppLayout;
