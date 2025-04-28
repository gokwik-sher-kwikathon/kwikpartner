import React, { useState, useEffect } from 'react';
import {
  Table,
  Tag,
  Space,
  Button,
  Typography,
  Card,
  Drawer,
  Descriptions,
  Timeline,
  Statistic,
  Row,
  Col,
  Badge,
  Tabs,
  Divider,
  message,
} from 'antd';
import {
  EyeOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { useApp } from '../../context/AppContext';
import { Referral } from '../../context/AppContext';
import AdvancedSearch from '../common/AdvancedSearch';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Define the SearchField type to match the one in AdvancedSearch
interface SearchField {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'dateRange' | 'number';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

const ReferralTracker: React.FC = () => {
  const { state, updateReferral, addNudge } = useApp();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [activeTab, setActiveTab] = useState('1');
  const [searchCriteria, setSearchCriteria] = useState<Record<string, any>>({});

  // Mock referrals data (in a real app, this would come from the API)
  const [referrals, setReferrals] = useState<Referral[]>([
    {
      id: 'ref-1',
      partnerId: '1',
      brandName: 'Fashion Store',
      contactName: 'Alice Brown',
      contactEmail: 'alice@fashionstore.com',
      contactPhone: '+91 9876543220',
      monthlyGMV: 500000,
      vertical: 'fashion',
      platform: 'shopify',
      product: 'checkout',
      stage: 'signed',
      stageUpdatedAt: '2025-04-20T10:30:00Z',
      commissionEarned: 15000,
      commissionPending: 0,
      notes: 'High-end fashion brand with good potential',
      activities: [
        {
          date: '2025-04-10T08:30:00Z',
          action: 'Referral Created',
          user: 'John Doe',
        },
        {
          date: '2025-04-15T14:20:00Z',
          action: 'Demo Scheduled',
          user: 'John Doe',
        },
        {
          date: '2025-04-20T10:30:00Z',
          action: 'Contract Signed',
          user: 'GoKwik Sales',
        },
      ],
    },
    {
      id: 'ref-2',
      partnerId: '1',
      brandName: 'Tech Gadgets',
      contactName: 'David Lee',
      contactEmail: 'david@techgadgets.com',
      contactPhone: '+91 9876543221',
      monthlyGMV: 800000,
      vertical: 'electronics',
      platform: 'woocommerce',
      product: 'rto',
      stage: 'pitch',
      stageUpdatedAt: '2025-04-22T09:15:00Z',
      commissionEarned: 0,
      commissionPending: 0,
      notes: 'Interested in reducing RTO rates',
      activities: [
        {
          date: '2025-04-22T09:15:00Z',
          action: 'Referral Created',
          user: 'John Doe',
        },
      ],
    },
    {
      id: 'ref-3',
      partnerId: '1',
      brandName: 'Beauty Brand',
      contactName: 'Emma Wilson',
      contactEmail: 'emma@beautybrand.com',
      contactPhone: '+91 9876543222',
      monthlyGMV: 350000,
      vertical: 'beauty',
      platform: 'magento',
      product: 'all',
      stage: 'ba_shared',
      stageUpdatedAt: '2025-04-18T16:45:00Z',
      commissionEarned: 0,
      commissionPending: 17500,
      notes: 'Looking for full suite of solutions',
      activities: [
        {
          date: '2025-04-12T11:30:00Z',
          action: 'Referral Created',
          user: 'John Doe',
        },
        {
          date: '2025-04-15T13:20:00Z',
          action: 'Initial Call',
          user: 'John Doe',
        },
        {
          date: '2025-04-18T16:45:00Z',
          action: 'Business Agreement Shared',
          user: 'GoKwik Sales',
        },
      ],
    },
  ]);

  // In a real app, we would fetch referrals from the API
  useEffect(() => {
    // This would be an API call in a real app
    // For now, we'll use the mock data
  }, []);

  // Get stage color
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospecting':
        return 'blue';
      case 'pitch':
        return 'cyan';
      case 'objection':
        return 'orange';
      case 'ba_shared':
        return 'purple';
      case 'signed':
        return 'green';
      case 'lost':
        return 'red';
      case 'go_live':
        return 'magenta';
      default:
        return 'default';
    }
  };

  // Get stage display name
  const getStageDisplayName = (stage: string) => {
    switch (stage) {
      case 'prospecting':
        return 'Prospecting';
      case 'pitch':
        return 'Pitch';
      case 'objection':
        return 'Objection';
      case 'ba_shared':
        return 'BA Shared';
      case 'signed':
        return 'Signed';
      case 'lost':
        return 'Lost';
      case 'go_live':
        return 'Go Live';
      default:
        return stage;
    }
  };

  // Handle search
  const handleSearch = (criteria: Record<string, any>) => {
    setSearchCriteria(criteria);
  };

  // Update referral stage
  const handleStageUpdate = (referralId: string, newStage: string) => {
    // Find the referral
    const referral = referrals.find((r) => r.id === referralId);
    if (!referral) return;

    // Create activity entry
    const activity = {
      date: new Date().toISOString(),
      action: `Stage updated to ${getStageDisplayName(newStage)}`,
      user: state.user?.name || 'Partner',
    };

    // Update the referral
    const updatedReferral = {
      ...referral,
      stage: newStage,
      stageUpdatedAt: new Date().toISOString(),
      activities: [...referral.activities, activity],
    };

    // Update in state
    setReferrals(referrals.map((r) => (r.id === referralId ? updatedReferral : r)));

    // If stage is BA shared, create a nudge for KYC collection
    if (newStage === 'ba_shared') {
      addNudge({
        id: `nudge-kyc-${Date.now()}`,
        message: `Please collect and submit KYC documents for ${referral.brandName}`,
        priority: 'high',
        action: 'Collect KYC',
        timestamp: new Date().toISOString(),
        referralId: referralId,
      });
    }
  };

  // Filter referrals based on search criteria
  const filteredReferrals = referrals.filter((referral) => {
    // Quick search (searches across multiple fields)
    if (searchCriteria.quickSearch && searchCriteria.quickSearch.trim() !== '') {
      const searchText = searchCriteria.quickSearch.toLowerCase();
      const matchesQuickSearch =
        referral.brandName.toLowerCase().includes(searchText) ||
        referral.contactName.toLowerCase().includes(searchText) ||
        referral.contactEmail.toLowerCase().includes(searchText) ||
        referral.notes.toLowerCase().includes(searchText);

      if (!matchesQuickSearch) return false;
    }

    // Filter by stage
    if (searchCriteria.stage && searchCriteria.stage.length > 0) {
      if (!searchCriteria.stage.includes(referral.stage)) return false;
    }

    // Filter by product
    if (searchCriteria.product && searchCriteria.product.length > 0) {
      if (!searchCriteria.product.includes(referral.product)) return false;
    }

    // Filter by vertical
    if (searchCriteria.vertical && searchCriteria.vertical.length > 0) {
      if (!searchCriteria.vertical.includes(referral.vertical)) return false;
    }

    // Filter by platform
    if (searchCriteria.platform && searchCriteria.platform.length > 0) {
      if (!searchCriteria.platform.includes(referral.platform)) return false;
    }

    // Filter by GMV range
    if (searchCriteria.gmvMin && referral.monthlyGMV < searchCriteria.gmvMin) return false;
    if (searchCriteria.gmvMax && referral.monthlyGMV > searchCriteria.gmvMax) return false;

    return true;
  });

  // Table columns
  const columns = [
    {
      title: 'Brand',
      dataIndex: 'brandName',
      key: 'brandName',
      render: (text: string, record: Referral) => (
        <div>
          <Text strong>{text}</Text>
          <div>
            <Text type='secondary'>{record.vertical}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Contact',
      dataIndex: 'contactName',
      key: 'contactName',
      render: (text: string, record: Referral) => (
        <div>
          <Text>{text}</Text>
          <div>
            <Text type='secondary'>{record.contactEmail}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Monthly GMV',
      dataIndex: 'monthlyGMV',
      key: 'monthlyGMV',
      render: (value: number) => <Text>₹{value.toLocaleString()}</Text>,
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (product: string) => {
        let color = 'blue';
        let displayName = 'Unknown';

        switch (product) {
          case 'checkout':
            color = 'blue';
            displayName = 'Checkout';
            break;
          case 'rto':
            color = 'green';
            displayName = 'Return Prime';
            break;
          case 'engage':
            color = 'purple';
            displayName = 'Engage';
            break;
          case 'all':
            color = 'magenta';
            displayName = 'All Products';
            break;
        }

        return <Tag color={color}>{displayName}</Tag>;
      },
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
      render: (stage: string) => <Tag color={getStageColor(stage)}>{getStageDisplayName(stage)}</Tag>,
    },
    {
      title: 'KYC',
      key: 'kycHandling',
      render: (text: string, record: Referral) => {
        if (record.kycHandling === 'partner') {
          return (
            <Tag color='blue' icon={<CheckCircleOutlined />}>
              Partner Assisted
            </Tag>
          );
        } else {
          return <Tag color='default'>GoKwik Handled</Tag>;
        }
      },
    },
    {
      title: 'Commission',
      key: 'commission',
      render: (text: string, record: Referral) => (
        <div>
          {record.commissionEarned > 0 && (
            <div>
              <Text type='success'>₹{record.commissionEarned.toLocaleString()} earned</Text>
            </div>
          )}
          {record.commissionPending > 0 && (
            <div>
              <Text type='warning'>₹{record.commissionPending.toLocaleString()} pending</Text>
            </div>
          )}
          {record.commissionEarned === 0 && record.commissionPending === 0 && <Text type='secondary'>-</Text>}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Referral) => (
        <Space size='small'>
          <Space size='small'>
            <Button
              type='primary'
              icon={<EyeOutlined />}
              size='small'
              onClick={() => {
                setSelectedReferral(record);
                setDrawerVisible(true);
              }}
            >
              View
            </Button>
            {record.stage !== 'ba_shared' &&
              record.stage !== 'signed' &&
              record.stage !== 'go_live' &&
              record.stage !== 'lost' && (
                <Button type='default' size='small' onClick={() => handleStageUpdate(record.id, 'ba_shared')}>
                  Move to BA Shared
                </Button>
              )}
          </Space>
        </Space>
      ),
    },
  ];

  // Handle drawer close
  const handleDrawerClose = () => {
    setDrawerVisible(false);
    setSelectedReferral(null);
  };

  // Define search fields for AdvancedSearch
  const searchFields: SearchField[] = [
    {
      key: 'stage',
      label: 'Stage',
      type: 'select',
      options: [
        { value: 'prospecting', label: 'Prospecting' },
        { value: 'pitch', label: 'Pitch' },
        { value: 'objection', label: 'Objection' },
        { value: 'ba_shared', label: 'BA Shared' },
        { value: 'signed', label: 'Signed' },
        { value: 'lost', label: 'Lost' },
        { value: 'go_live', label: 'Go Live' },
      ],
    },
    {
      key: 'product',
      label: 'Product',
      type: 'select',
      options: [
        { value: 'checkout', label: 'Checkout' },
        { value: 'rto', label: 'Return Prime' },
        { value: 'engage', label: 'Engage' },
        { value: 'all', label: 'All Products' },
      ],
    },
    {
      key: 'vertical',
      label: 'Vertical',
      type: 'select',
      options: [
        { value: 'fashion', label: 'Fashion' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'beauty', label: 'Beauty' },
        { value: 'home', label: 'Home & Decor' },
        { value: 'food', label: 'Food & Grocery' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      key: 'platform',
      label: 'Platform',
      type: 'select',
      options: [
        { value: 'shopify', label: 'Shopify' },
        { value: 'woocommerce', label: 'WooCommerce' },
        { value: 'magento', label: 'Magento' },
        { value: 'custom', label: 'Custom' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      key: 'gmvMin',
      label: 'Min GMV',
      type: 'number',
      placeholder: 'Min GMV',
    },
    {
      key: 'gmvMax',
      label: 'Max GMV',
      type: 'number',
      placeholder: 'Max GMV',
    },
    {
      key: 'dateRange',
      label: 'Date Range',
      type: 'dateRange',
    },
  ];

  return (
    <div>
      <Title level={2}>Referral Tracker</Title>
      <Paragraph>Track the status of your referrals and monitor their progress through the sales funnel.</Paragraph>

      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]} align='middle'>
          <Col xs={24} sm={8} md={6}>
            <Statistic title='Total Referrals' value={referrals.length} prefix={<FilterOutlined />} />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Statistic
              title='Active Referrals'
              value={referrals.filter((r) => r.stage !== 'lost').length}
              prefix={<ClockCircleOutlined />}
            />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Statistic
              title='Converted'
              value={referrals.filter((r) => r.stage === 'signed' || r.stage === 'go_live').length}
              prefix={<CheckCircleOutlined />}
            />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Statistic
              title='Total Commission'
              value={referrals.reduce((sum, r) => sum + r.commissionEarned + r.commissionPending, 0)}
              prefix={
                <>
                  <DollarOutlined /> ₹
                </>
              }
            />
          </Col>
        </Row>
      </Card>

      <AdvancedSearch fields={searchFields} onSearch={handleSearch} searchType='referral' />

      <Card>
        <Table columns={columns} dataSource={filteredReferrals} rowKey='id' pagination={{ pageSize: 10 }} />
      </Card>

      {/* Referral Detail Drawer */}
      <Drawer
        title={selectedReferral ? `Referral: ${selectedReferral.brandName}` : 'Referral Details'}
        placement='right'
        onClose={handleDrawerClose}
        open={drawerVisible}
        width={600}
      >
        {selectedReferral && (
          <div>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab='Details' key='1'>
                <Descriptions bordered column={1}>
                  <Descriptions.Item label='Brand Name'>{selectedReferral.brandName}</Descriptions.Item>
                  <Descriptions.Item label='Vertical'>{selectedReferral.vertical}</Descriptions.Item>
                  <Descriptions.Item label='Platform'>{selectedReferral.platform}</Descriptions.Item>
                  <Descriptions.Item label='Monthly GMV'>
                    ₹{selectedReferral.monthlyGMV.toLocaleString()}
                  </Descriptions.Item>
                  <Descriptions.Item label='Contact Person'>{selectedReferral.contactName}</Descriptions.Item>
                  <Descriptions.Item label='Email'>{selectedReferral.contactEmail}</Descriptions.Item>
                  <Descriptions.Item label='Phone'>{selectedReferral.contactPhone}</Descriptions.Item>
                  <Descriptions.Item label='Product'>
                    <Tag
                      color={
                        selectedReferral.product === 'checkout'
                          ? 'blue'
                          : selectedReferral.product === 'rto'
                          ? 'green'
                          : 'purple'
                      }
                    >
                      {selectedReferral.product === 'checkout'
                        ? 'Checkout'
                        : selectedReferral.product === 'rto'
                        ? 'Return Prime'
                        : selectedReferral.product === 'engage'
                        ? 'Engage'
                        : 'All Products'}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label='Current Stage'>
                    <Tag color={getStageColor(selectedReferral.stage)}>
                      {getStageDisplayName(selectedReferral.stage)}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label='KYC Handling'>
                    {selectedReferral.kycHandling === 'partner' ? (
                      <Tag color='blue' icon={<CheckCircleOutlined />}>
                        Partner Assisted KYC
                      </Tag>
                    ) : (
                      <Tag color='default'>GoKwik Handled KYC</Tag>
                    )}
                    {selectedReferral.kycHandling === 'partner' && (
                      <div style={{ marginTop: 8 }}>
                        <Button
                          type='primary'
                          size='small'
                          onClick={() => {
                            // In a real app, this would navigate to a KYC upload page
                            message.info('KYC document upload functionality would open here');
                          }}
                        >
                          Upload KYC Documents
                        </Button>
                      </div>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label='Last Updated'>
                    {new Date(selectedReferral.stageUpdatedAt).toLocaleString()}
                  </Descriptions.Item>
                  <Descriptions.Item label='Notes'>{selectedReferral.notes || '-'}</Descriptions.Item>
                </Descriptions>
              </TabPane>

              <TabPane tab='Activity' key='2'>
                <Timeline mode='left'>
                  {selectedReferral.activities.map((activity, index) => (
                    <Timeline.Item key={index} label={new Date(activity.date).toLocaleString()}>
                      <Text strong>{activity.action}</Text>
                      <div>
                        <Text type='secondary'>by {activity.user}</Text>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </TabPane>

              <TabPane tab='Commission' key='3'>
                <Card>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Statistic
                        title='Earned Commission'
                        value={selectedReferral.commissionEarned}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={
                          <>
                            <DollarOutlined /> ₹
                          </>
                        }
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title='Pending Commission'
                        value={selectedReferral.commissionPending}
                        precision={2}
                        valueStyle={{ color: '#faad14' }}
                        prefix={
                          <>
                            <ClockCircleOutlined /> ₹
                          </>
                        }
                      />
                    </Col>
                  </Row>

                  <Divider />

                  <Descriptions bordered column={1}>
                    <Descriptions.Item label='Commission Rate'>3% of Monthly GMV</Descriptions.Item>
                    <Descriptions.Item label='Calculation'>
                      ₹{selectedReferral.monthlyGMV.toLocaleString()} × 3% = ₹
                      {(selectedReferral.monthlyGMV * 0.03).toLocaleString()}
                    </Descriptions.Item>
                    <Descriptions.Item label='Payment Status'>
                      {selectedReferral.commissionEarned > 0 ? (
                        <Badge status='success' text='Paid' />
                      ) : selectedReferral.commissionPending > 0 ? (
                        <Badge status='processing' text='Pending' />
                      ) : (
                        <Badge status='default' text='Not Applicable' />
                      )}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </TabPane>
            </Tabs>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default ReferralTracker;
