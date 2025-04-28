import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Tabs, List, Button, Tag, Space, Divider, Alert, Dropdown, Menu, Tooltip } from 'antd';
import { ElevatedCard, EnhancedStatisticCard, PageLayout, WebSocketStatus } from '../components/common';
import {
  DollarOutlined,
  TeamOutlined,
  RiseOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  FileOutlined,
  RobotOutlined,
  ArrowUpOutlined,
  BulbOutlined,
  ToolOutlined,
  DownOutlined,
  PlusOutlined,
  MoreOutlined,
  LineChartOutlined,
  BookOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import FunnelChart from '../components/dashboard/FunnelChart';
import CommissionCalculator from '../components/dashboard/CommissionCalculator';
import AnalyticsDashboard from '../components/dashboard/AnalyticsDashboard';
import { chartColors } from '../theme/themeConfig';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Mock data for funnel stages with subtle color palette
const funnelStages = [
  { name: 'Prospecting', count: 5, color: chartColors.pastel.blue },
  { name: 'Pitch', count: 3, color: chartColors.pastel.green },
  { name: 'Objection', count: 2, color: chartColors.pastel.beige },
  { name: 'BA Shared', count: 1, color: chartColors.pastel.rose },
  { name: 'Signed', count: 2, color: chartColors.pastel.lavender },
  { name: 'Go Live', count: 1, color: chartColors.pastel.teal },
];

// Mock data for learning content
const learningContent = [
  {
    id: '1',
    title: 'How to Pitch GoKwik Checkout',
    type: 'article',
    tags: ['checkout', 'sales'],
    duration: '5 min read',
  },
  {
    id: '2',
    title: 'Understanding RTO Prime for Fashion',
    type: 'video',
    tags: ['rto', 'fashion'],
    duration: '8 min video',
  },
  {
    id: '3',
    title: 'Commission Structure Explained',
    type: 'article',
    tags: ['commission', 'earnings'],
    duration: '3 min read',
  },
];

import DynamicLeadForm from '../components/dashboard/leads/DynamicLeadForm';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('1');
  const [dashboardTab, setDashboardTab] = useState('1');
  const [leadFormVisible, setLeadFormVisible] = useState(false);

  // 1. Commission Snapshot moved to top with AI prediction
  const renderCommissionSnapshot = () => {
    return (
      <ElevatedCard
        title={
          <Space>
            <DollarOutlined />
            <span>Commission Snapshot</span>
          </Space>
        }
        style={{
          marginBottom: 24,
        }}
        elevation={2}
        accentColor={chartColors.secondary}
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab='Earned' key='1'>
            <Row gutter={[16, 16]} className='dashboard-stats-row'>
              <Col span={6}>
                <EnhancedStatisticCard title='This Month' value={12500} isCurrency={true} elevation={1} />
              </Col>
              <Col span={6}>
                <EnhancedStatisticCard title='Last Month' value={18000} isCurrency={true} elevation={1} />
              </Col>
              <Col span={6}>
                <EnhancedStatisticCard title='Total Earned' value={42500} isCurrency={true} elevation={1} />
              </Col>
              <Col span={6}>
                <EnhancedStatisticCard
                  title='Growth Rate'
                  value={15.4}
                  precision={1}
                  valueStyle={{ color: chartColors.success }}
                  prefix={<ArrowUpOutlined />}
                  suffix='%'
                  trend={15.4}
                  trendLabel='vs last quarter'
                  elevation={1}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tab='Pending' key='2'>
            <Row gutter={[16, 16]} className='dashboard-stats-row'>
              <Col span={6}>
                <EnhancedStatisticCard title='In Process' value={8500} isCurrency={true} elevation={1} />
              </Col>
              <Col span={6}>
                <EnhancedStatisticCard title='Awaiting Approval' value={15000} isCurrency={true} elevation={1} />
              </Col>
              <Col span={6}>
                <EnhancedStatisticCard title='Total Pending' value={23500} isCurrency={true} elevation={1} />
              </Col>
              <Col span={6}>
                <EnhancedStatisticCard
                  title='Expected Date'
                  value='May 15, 2025'
                  valueStyle={{ fontSize: '16px' }}
                  elevation={1}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tab='Forecast' key='3'>
            <Row gutter={[16, 16]} className='dashboard-stats-row'>
              <Col span={6}>
                <EnhancedStatisticCard title='Next Month' value={22000} isCurrency={true} elevation={1} />
              </Col>
              <Col span={6}>
                <EnhancedStatisticCard title='Next Quarter' value={65000} isCurrency={true} elevation={1} />
              </Col>
              <Col span={6}>
                <EnhancedStatisticCard title='Annual Projection' value={250000} isCurrency={true} elevation={1} />
              </Col>
              <Col span={6}>
                <EnhancedStatisticCard
                  title='Year-over-Year'
                  value={32}
                  precision={0}
                  valueStyle={{ color: chartColors.success }}
                  prefix={<ArrowUpOutlined />}
                  suffix='%'
                  trend={32}
                  elevation={1}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tab='AI Prediction' key='4'>
            <Row gutter={[16, 16]} className='dashboard-stats-row'>
              <Col span={18}>
                <Alert
                  message='AI-Powered Earnings Prediction'
                  description={
                    <div>
                      <p>Based on your current referral pipeline and historical conversion rates, our AI predicts:</p>
                      <ul>
                        <li>
                          Next month earnings: <strong>₹28,500</strong> (↑ 14% from current month)
                        </li>
                        <li>
                          Q3 2025 total earnings: <strong>₹95,000</strong>
                        </li>
                        <li>Highest potential referral: Fashion Store (₹15,000)</li>
                      </ul>
                      <p>Recommendation: Focus on Beauty Brand referral which is close to conversion.</p>
                    </div>
                  }
                  type='info'
                  showIcon
                  icon={<RobotOutlined />}
                />
              </Col>
              <Col span={6}>
                <EnhancedStatisticCard
                  title='AI Confidence'
                  value={92}
                  suffix='%'
                  valueStyle={{ color: chartColors.primary }}
                  elevation={1}
                />
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </ElevatedCard>
    );
  };

  // 2. Enhanced Commission Calculator with animation
  const renderCommissionCalculator = () => {
    return (
      <ElevatedCard
        className='commission-calculator-container'
        style={{
          marginBottom: 24,
          position: 'relative',
        }}
        elevation={3}
        title='Commission Calculator'
      >
        <style>
          {`
            @keyframes pulse {
              0% {
                box-shadow: 0 0 0 0 rgba(24, 144, 255, 0.4);
              }
              70% {
                box-shadow: 0 0 0 10px rgba(24, 144, 255, 0);
              }
              100% {
                box-shadow: 0 0 0 0 rgba(24, 144, 255, 0);
              }
            }
            
            .commission-calculator-container {
              animation: pulse 2s infinite;
            }
          `}
        </style>
        <CommissionCalculator />
      </ElevatedCard>
    );
  };

  // Handle lead form submission
  const handleLeadSubmit = (values: any, productType: string) => {
    console.log('Lead submitted:', values, 'Product Type:', productType);
    // Here you would typically send this data to your API
  };

  // Quick Actions dropdown menu
  const getQuickActionsMenu = () => {
    switch (state.user?.role) {
      case 'referralPartner':
        return (
          <Menu>
            <Menu.Item key='1' icon={<LineChartOutlined />} onClick={() => navigate('/referral/tracker')}>
              Track Referrals
            </Menu.Item>
            <Menu.Item key='2' icon={<DollarOutlined />} onClick={() => navigate('/referral/commission')}>
              View Commissions
            </Menu.Item>
          </Menu>
        );
      case 'resellerPartner':
        return (
          <Menu>
            <Menu.Item key='1' icon={<TeamOutlined />} onClick={() => navigate('/reseller/leads')}>
              Manage Lead Pipeline
            </Menu.Item>
            <Menu.Item key='2' icon={<FileOutlined />} onClick={() => navigate('/reseller/docs')}>
              Upload Documents
            </Menu.Item>
            <Menu.Item key='3' icon={<BookOutlined />} onClick={() => navigate('/reseller/playbooks')}>
              Access GTM Playbooks
            </Menu.Item>
          </Menu>
        );
      case 'servicePartner':
        return (
          <Menu>
            <Menu.Item key='1' icon={<TeamOutlined />} onClick={() => navigate('/service/assigned')}>
              Assigned Brands
            </Menu.Item>
            <Menu.Item key='2' icon={<ToolOutlined />} onClick={() => navigate('/service/setup')}>
              Setup Tracker
            </Menu.Item>
            <Menu.Item key='3' icon={<BulbOutlined />} onClick={() => navigate('/service/guides')}>
              Dev Guides
            </Menu.Item>
          </Menu>
        );
      default:
        return (
          <Menu>
            <Menu.Item key='1' icon={<LineChartOutlined />} onClick={() => navigate('/referral/tracker')}>
              Track Referrals
            </Menu.Item>
          </Menu>
        );
    }
  };

  // Quick Actions icon dropdown
  const renderQuickActionsDropdown = () => {
    return (
      <Tooltip title='Quick Actions'>
        <Dropdown overlay={getQuickActionsMenu()} trigger={['click']}>
          <Button
            type='text'
            icon={<ThunderboltOutlined />}
            className='quick-actions-icon'
            style={{ fontSize: '16px' }}
          />
        </Dropdown>
      </Tooltip>
    );
  };

  // Add Lead button
  const renderAddLeadButton = () => {
    return (
      <Button
        type='primary'
        size='large'
        icon={<PlusOutlined />}
        onClick={() => setLeadFormVisible(true)}
        className='add-lead-button'
        style={{ fontWeight: 500 }}
      >
        Add Lead
      </Button>
    );
  };

  return (
    <PageLayout
      title='Dashboard'
      subtitle={`Welcome back, ${state.user?.name}! Here's an overview of your partnership with GoKwik.`}
      actions={
        <Space size='middle' align='center'>
          <WebSocketStatus />
          {renderQuickActionsDropdown()}
          {renderAddLeadButton()}
        </Space>
      }
    >
      {/* Dynamic Lead Form Modal */}
      <DynamicLeadForm
        visible={leadFormVisible}
        onCancel={() => setLeadFormVisible(false)}
        onSubmit={handleLeadSubmit}
      />
      {/* 1. Commission Snapshot moved to top */}
      {renderCommissionSnapshot()}

      {/* 3. Enhanced Commission Calculator with animation */}
      {renderCommissionCalculator()}

      {/* 4. Full-width Overview and Analytics tabs */}
      <Tabs activeKey={dashboardTab} onChange={setDashboardTab}>
        <TabPane tab='Overview' key='1'>
          <Row gutter={[24, 24]} className='dashboard-stats-row'>
            {/* Key Metrics */}
            <Col xs={24} sm={8}>
              <EnhancedStatisticCard
                title='Total Referrals'
                value={14}
                prefix={<TeamOutlined />}
                valueStyle={{ color: chartColors.primary }}
                elevation={2}
                tooltip="Total number of brands you've referred to GoKwik"
              />
            </Col>
            <Col xs={24} sm={8}>
              <EnhancedStatisticCard
                title='Total Earnings'
                value={42500}
                prefix={<DollarOutlined />}
                valueStyle={{ color: chartColors.success }}
                isCurrency={true}
                elevation={2}
                tooltip='Your total earnings from all referrals'
              />
            </Col>
            <Col xs={24} sm={8}>
              <EnhancedStatisticCard
                title='Leads in Progress'
                value={8}
                prefix={<RiseOutlined />}
                valueStyle={{ color: chartColors.warning }}
                elevation={2}
                tooltip='Leads currently moving through the sales pipeline'
                trend={12.5}
                trendLabel='vs last month'
              />
            </Col>

            {/* Funnel Chart - Full Width */}
            <Col xs={24}>
              <ElevatedCard elevation={2} style={{ padding: '16px' }} className='content-section'>
                <div className='responsive-table'>
                  <FunnelChart stages={funnelStages} />
                </div>
              </ElevatedCard>
            </Col>

            {/* Learning Recommendations - Full Width */}
            <Col xs={24}>
              <ElevatedCard title='Learning Recommendations' elevation={2} accentColor={chartColors.quaternary}>
                <List
                  grid={{ gutter: 16, column: 3 }}
                  dataSource={learningContent}
                  renderItem={(item) => (
                    <List.Item>
                      <ElevatedCard hoverable elevation={1}>
                        <List.Item.Meta
                          avatar={
                            item.type === 'video' ? (
                              <ClockCircleOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                            ) : (
                              <FileOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                            )
                          }
                          title={item.title}
                          description={
                            <Space>
                              <Tag color='blue'>{item.type}</Tag>
                              <Text type='secondary'>{item.duration}</Text>
                            </Space>
                          }
                        />
                        <Button type='link' style={{ padding: 0 }} onClick={() => navigate('/referral/learn')}>
                          View
                        </Button>
                      </ElevatedCard>
                    </List.Item>
                  )}
                />
                <Divider style={{ margin: '12px 0' }} />
                <Button type='link' block onClick={() => navigate('/referral/learn')}>
                  View All Learning Content
                </Button>
              </ElevatedCard>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab='Analytics' key='2'>
          <AnalyticsDashboard />
        </TabPane>
      </Tabs>
    </PageLayout>
  );
};

export default DashboardPage;
