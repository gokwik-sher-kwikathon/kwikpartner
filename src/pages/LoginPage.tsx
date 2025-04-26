import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, Divider, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import GKLogo from '../images/GK_Logo.png';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, state } = useApp();
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  if (state.isAuthenticated) {
    return <Navigate to='/dashboard' replace />;
  }

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      await login(values.email, values.password);
      navigate('/dashboard');
    } catch (error) {
      message.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      // Mock Google login
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await login('demo@example.com', 'password');
      navigate('/dashboard');
    } catch (error) {
      message.error('Google login failed. Please try again.');
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
      }}
    >
      <Row gutter={[24, 24]} style={{ width: '100%', maxWidth: '1200px' }}>
        <Col xs={24} sm={24} md={12} lg={14} xl={16}>
          <div style={{ padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <img
                src={GKLogo}
                alt='KwikPartner Logo'
                style={{
                  width: 60,
                  height: 60,
                  marginRight: '16px',
                  borderRadius: '8px',
                  objectFit: 'contain',
                }}
              />
              <Title level={1} style={{ margin: 0, color: '#1890ff' }}>
                KwikPartner
              </Title>
            </div>
            <Title level={3} style={{ marginBottom: '16px' }}>
              GoKwik's Next-Generation Partner Portal
            </Title>
            <Text style={{ fontSize: '16px', display: 'block', marginBottom: '24px' }}>
              Activate and empower your partnership with GoKwik. Access full-funnel visibility, KYC tools, GTM support,
              and AI-driven insights to maximize your earnings.
            </Text>

            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card className='login-role-card' style={{ textAlign: 'center' }}>
                  <Title level={4}>Referral Partners</Title>
                  <Text>Submit leads and track payouts with AI-powered nudges</Text>
                </Card>
              </Col>
              <Col span={8}>
                <Card className='login-role-card' style={{ textAlign: 'center' }}>
                  <Title level={4}>Reseller Partners</Title>
                  <Text>Own the full sales motion with commission-based incentives</Text>
                </Card>
              </Col>
              <Col span={8}>
                <Card className='login-role-card' style={{ textAlign: 'center' }}>
                  <Title level={4}>Service Partners</Title>
                  <Text>Help onboard brands and track integrations to earn incentives</Text>
                </Card>
              </Col>
            </Row>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={10} xl={8}>
          <Card
            style={{
              maxWidth: '400px',
              margin: '40px auto',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Title level={3}>Partner Login</Title>
              <Text type='secondary'>Sign in to access your partner dashboard</Text>
            </div>

            <Form
              name='login'
              initialValues={{ remember: true }}
              onFinish={handleLogin}
              layout='vertical'
              className='login-form'
            >
              <Form.Item
                name='email'
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder='Email' size='large' />
              </Form.Item>

              <Form.Item name='password' rules={[{ required: true, message: 'Please enter your password' }]}>
                <Input.Password prefix={<LockOutlined />} placeholder='Password' size='large' />
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit' size='large' block loading={loading} className='login-button'>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </Form.Item>

              <Divider plain>Or</Divider>

              <Button
                icon={<GoogleOutlined />}
                size='large'
                block
                onClick={handleGoogleLogin}
                loading={loading}
                style={{ marginBottom: '16px' }}
              >
                Sign in with Google
              </Button>

              <div style={{ textAlign: 'center' }}>
                <Text type='secondary'>
                  Don't have an account? <a href='mailto:partners@gokwik.co'>Contact GoKwik</a>
                </Text>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
