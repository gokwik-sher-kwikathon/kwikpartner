import React, { useState } from 'react';
import { Card, Typography, Button, Row, Col, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserSwitchOutlined, TeamOutlined, ShopOutlined, ToolOutlined } from '@ant-design/icons';
import { useApp } from '../context/AppContext';
import { UserRole } from '../context/AppContext';

const { Title, Text, Paragraph } = Typography;

const RoleSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole, state } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleContinue = async () => {
    if (!selectedRole) {
      message.warning('Please select a partner role to continue');
      return;
    }

    try {
      setLoading(true);
      await switchRole(selectedRole);
      navigate('/dashboard');
    } catch (error) {
      message.error('Failed to set role. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f0f2f5',
        padding: '24px',
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: '900px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2}>Welcome to KwikPartner</Title>
          <Paragraph>
            Select your partner role to customize your experience. You can change your role anytime from your profile.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card
              hoverable
              style={{
                height: '100%',
                borderColor: selectedRole === 'referralPartner' ? '#1890ff' : undefined,
                boxShadow: selectedRole === 'referralPartner' ? '0 0 0 2px #1890ff' : undefined,
              }}
              onClick={() => handleRoleSelect('referralPartner')}
            >
              <div style={{ textAlign: 'center' }}>
                <Space direction='vertical' size='large' style={{ width: '100%' }}>
                  <TeamOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                  <Title level={4}>Referral Partner</Title>
                  <ul style={{ textAlign: 'left' }}>
                    <li>Submit leads to GoKwik</li>
                    <li>Track referral status</li>
                    <li>Earn commissions on successful referrals</li>
                    <li>Get AI nudges for follow-ups</li>
                  </ul>
                </Space>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              hoverable
              style={{
                height: '100%',
                borderColor: selectedRole === 'resellerPartner' ? '#1890ff' : undefined,
                boxShadow: selectedRole === 'resellerPartner' ? '0 0 0 2px #1890ff' : undefined,
              }}
              onClick={() => handleRoleSelect('resellerPartner')}
            >
              <div style={{ textAlign: 'center' }}>
                <Space direction='vertical' size='large' style={{ width: '100%' }}>
                  <ShopOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                  <Title level={4}>Reseller Partner</Title>
                  <ul style={{ textAlign: 'left' }}>
                    <li>Own the full sales motion</li>
                    <li>Pitch, close, and collect KYC</li>
                    <li>Higher commission rates</li>
                    <li>Access to GTM playbooks</li>
                  </ul>
                </Space>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              hoverable
              style={{
                height: '100%',
                borderColor: selectedRole === 'servicePartner' ? '#1890ff' : undefined,
                boxShadow: selectedRole === 'servicePartner' ? '0 0 0 2px #1890ff' : undefined,
              }}
              onClick={() => handleRoleSelect('servicePartner')}
            >
              <div style={{ textAlign: 'center' }}>
                <Space direction='vertical' size='large' style={{ width: '100%' }}>
                  <ToolOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                  <Title level={4}>Service Partner</Title>
                  <ul style={{ textAlign: 'left' }}>
                    <li>Help onboard new and existing brands</li>
                    <li>Track integrations</li>
                    <li>Earn incentives per integration</li>
                    <li>Access to developer guides</li>
                  </ul>
                </Space>
              </div>
            </Card>
          </Col>
        </Row>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Button
            type='primary'
            size='large'
            icon={<UserSwitchOutlined />}
            onClick={handleContinue}
            disabled={!selectedRole}
            loading={loading}
          >
            Continue as{' '}
            {selectedRole === 'referralPartner'
              ? 'Referral Partner'
              : selectedRole === 'resellerPartner'
              ? 'Reseller Partner'
              : selectedRole === 'servicePartner'
              ? 'Service Partner'
              : 'Partner'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RoleSelectionPage;
