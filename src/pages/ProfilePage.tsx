import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, Row, Col, Divider, Select, Avatar, Upload, message, Tabs } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  BankOutlined,
  TeamOutlined,
  UploadOutlined,
  LockOutlined,
  ShopOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { useApp, UserRole } from '../context/AppContext';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const ProfilePage: React.FC = () => {
  const { state, dispatch, switchRole } = useApp();
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  // Initialize form with user data
  React.useEffect(() => {
    if (state.user) {
      form.setFieldsValue({
        name: state.user.name,
        email: state.user.email,
        agency: state.user.agency,
        contact: state.user.contact,
        role: state.user.role,
      });
    }
  }, [state.user, form]);

  const handleProfileUpdate = async (values: any) => {
    try {
      setLoading(true);

      // Check if role has changed
      const roleChanged = values.role !== state.user?.role;

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update user in state
      if (state.user) {
        const updatedUser = { ...state.user, ...values };
        dispatch({ type: 'SET_USER', payload: updatedUser });
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      // If role changed, call switchRole
      if (roleChanged) {
        await switchRole(values.role as UserRole);
      }

      message.success('Profile updated successfully');
    } catch (error) {
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (values: any) => {
    try {
      setLoading(true);

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success('Password updated successfully');
      passwordForm.resetFields();
    } catch (error) {
      message.error('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  // Role icon mapping
  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'referralPartner':
        return <TeamOutlined />;
      case 'resellerPartner':
        return <ShopOutlined />;
      case 'servicePartner':
        return <ToolOutlined />;
      default:
        return <UserOutlined />;
    }
  };

  // Role description mapping
  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case 'referralPartner':
        return 'Submit leads and track referrals to earn commissions';
      case 'resellerPartner':
        return 'Own the full sales motion with higher commission rates';
      case 'servicePartner':
        return 'Help onboard brands and earn incentives per integration';
      default:
        return '';
    }
  };

  return (
    <div>
      <Title level={2}>Profile</Title>
      <Paragraph>Manage your profile information and partner role settings.</Paragraph>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab='Personal Information' key='1'>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <Avatar
                    size={100}
                    icon={<UserOutlined />}
                    src={state.user?.profileImage}
                    style={{ backgroundColor: '#1890ff' }}
                  />
                  <div style={{ marginTop: 16 }}>
                    <Upload
                      showUploadList={false}
                      beforeUpload={() => {
                        message.info('Profile picture upload is not implemented in this demo');
                        return false;
                      }}
                    >
                      <Button icon={<UploadOutlined />}>Change Picture</Button>
                    </Upload>
                  </div>
                  <Divider />
                  <div>
                    <Title level={4}>{state.user?.name}</Title>
                    <Text type='secondary'>{state.user?.agency}</Text>
                    <div style={{ marginTop: 8 }}>
                      <Text type='secondary'>{state.user?.email}</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} md={16}>
              <Card title='Edit Profile'>
                <Form
                  form={form}
                  layout='vertical'
                  onFinish={handleProfileUpdate}
                  initialValues={{
                    name: state.user?.name,
                    email: state.user?.email,
                    agency: state.user?.agency,
                    contact: state.user?.contact,
                    role: state.user?.role,
                  }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name='name'
                        label='Full Name'
                        rules={[{ required: true, message: 'Please enter your name' }]}
                      >
                        <Input prefix={<UserOutlined />} placeholder='Full Name' />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name='email'
                        label='Email'
                        rules={[
                          { required: true, message: 'Please enter your email' },
                          { type: 'email', message: 'Please enter a valid email' },
                        ]}
                      >
                        <Input prefix={<MailOutlined />} placeholder='Email' disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name='agency'
                        label='Agency / Company'
                        rules={[{ required: true, message: 'Please enter your agency name' }]}
                      >
                        <Input prefix={<BankOutlined />} placeholder='Agency / Company' />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name='contact'
                        label='Contact Number'
                        rules={[{ required: true, message: 'Please enter your contact number' }]}
                      >
                        <Input prefix={<PhoneOutlined />} placeholder='Contact Number' />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name='role'
                    label='Partner Role'
                    rules={[{ required: true, message: 'Please select your partner role' }]}
                  >
                    <Select placeholder='Select your partner role'>
                      <Option value='referralPartner'>
                        <TeamOutlined /> Referral Partner
                      </Option>
                      <Option value='resellerPartner'>
                        <ShopOutlined /> Reseller Partner
                      </Option>
                      <Option value='servicePartner'>
                        <ToolOutlined /> Service Partner
                      </Option>
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <Button type='primary' htmlType='submit' loading={loading}>
                      Save Changes
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab='Security' key='2'>
          <Card title='Change Password'>
            <Form form={passwordForm} layout='vertical' onFinish={handlePasswordChange}>
              <Form.Item
                name='currentPassword'
                label='Current Password'
                rules={[{ required: true, message: 'Please enter your current password' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder='Current Password' />
              </Form.Item>

              <Form.Item
                name='newPassword'
                label='New Password'
                rules={[
                  { required: true, message: 'Please enter your new password' },
                  { min: 8, message: 'Password must be at least 8 characters' },
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder='New Password' />
              </Form.Item>

              <Form.Item
                name='confirmPassword'
                label='Confirm New Password'
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Please confirm your new password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match'));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder='Confirm New Password' />
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit' loading={loading}>
                  Update Password
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>

        <TabPane tab='Partner Role' key='3'>
          <Card title='Partner Role Settings'>
            <Paragraph>
              Your current role is:{' '}
              <Text strong>
                {state.user?.role === 'referralPartner'
                  ? 'Referral Partner'
                  : state.user?.role === 'resellerPartner'
                  ? 'Reseller Partner'
                  : 'Service Partner'}
              </Text>
            </Paragraph>

            <Divider />

            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <Card
                  hoverable
                  style={{
                    borderColor: state.user?.role === 'referralPartner' ? '#1890ff' : undefined,
                    boxShadow: state.user?.role === 'referralPartner' ? '0 0 0 2px #1890ff' : undefined,
                  }}
                  onClick={() => {
                    form.setFieldsValue({ role: 'referralPartner' });
                    handleProfileUpdate({ ...form.getFieldsValue(), role: 'referralPartner' });
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <TeamOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                    <Title level={4}>Referral Partner</Title>
                    <Paragraph>Submit leads and track referrals to earn commissions</Paragraph>
                  </div>
                </Card>
              </Col>

              <Col xs={24} md={8}>
                <Card
                  hoverable
                  style={{
                    borderColor: state.user?.role === 'resellerPartner' ? '#1890ff' : undefined,
                    boxShadow: state.user?.role === 'resellerPartner' ? '0 0 0 2px #1890ff' : undefined,
                  }}
                  onClick={() => {
                    form.setFieldsValue({ role: 'resellerPartner' });
                    handleProfileUpdate({ ...form.getFieldsValue(), role: 'resellerPartner' });
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <ShopOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                    <Title level={4}>Reseller Partner</Title>
                    <Paragraph>Own the full sales motion with higher commission rates</Paragraph>
                  </div>
                </Card>
              </Col>

              <Col xs={24} md={8}>
                <Card
                  hoverable
                  style={{
                    borderColor: state.user?.role === 'servicePartner' ? '#1890ff' : undefined,
                    boxShadow: state.user?.role === 'servicePartner' ? '0 0 0 2px #1890ff' : undefined,
                  }}
                  onClick={() => {
                    form.setFieldsValue({ role: 'servicePartner' });
                    handleProfileUpdate({ ...form.getFieldsValue(), role: 'servicePartner' });
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <ToolOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                    <Title level={4}>Service Partner</Title>
                    <Paragraph>Help onboard brands and earn incentives per integration</Paragraph>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
