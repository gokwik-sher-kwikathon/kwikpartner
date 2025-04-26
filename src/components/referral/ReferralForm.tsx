import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Card,
  Typography,
  message,
  Divider,
  Row,
  Col,
  Steps,
  Radio,
  Modal,
  Alert,
  Space,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  ShopOutlined,
  DollarOutlined,
  TagOutlined,
  AppstoreOutlined,
  FileAddOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Step } = Steps;

const ReferralForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { submitReferral, state, addNudge } = useApp();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [kycHandlingModalVisible, setKycHandlingModalVisible] = useState(false);
  const [kycHandling, setKycHandling] = useState<'partner' | 'gokwik' | undefined>(undefined);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);

      // Add KYC handling information to the referral
      const referralWithKyc = {
        ...values,
        kycHandling: kycHandling || 'gokwik', // Default to GoKwik handling if not specified
        stage: 'prospecting', // Initial stage
      };

      await submitReferral(referralWithKyc);

      // Create a nudge if the partner will handle KYC
      if (kycHandling === 'partner') {
        addNudge({
          id: `nudge-kyc-${Date.now()}`,
          message: `Remember to collect and submit KYC documents for ${values.brandName}`,
          priority: 'medium',
          action: 'Collect KYC',
          timestamp: new Date().toISOString(),
          referralId: `ref-${Date.now()}`, // This should match the ID generated in submitReferral
        });
      }

      message.success('Referral submitted successfully!');
      navigate('/referral/tracker');
    } catch (error) {
      message.error('Failed to submit referral. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show KYC handling modal before final submission
  const handleFinalSubmit = () => {
    setKycHandlingModalVisible(true);
  };

  // Handle KYC selection and submit the form
  const handleKycSelection = (handling: 'partner' | 'gokwik') => {
    setKycHandling(handling);
    setKycHandlingModalVisible(false);
    form.submit();
  };

  const steps = [
    {
      title: 'Brand Details',
      content: (
        <>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='brandName'
                label='Brand Name'
                rules={[{ required: true, message: 'Please enter the brand name' }]}
              >
                <Input prefix={<ShopOutlined />} placeholder='Brand Name' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='vertical'
                label='Vertical'
                rules={[{ required: true, message: 'Please select the vertical' }]}
              >
                <Select placeholder='Select vertical'>
                  <Option value='fashion'>Fashion</Option>
                  <Option value='beauty'>Beauty</Option>
                  <Option value='electronics'>Electronics</Option>
                  <Option value='home'>Home & Furniture</Option>
                  <Option value='food'>Food & Grocery</Option>
                  <Option value='other'>Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='platform'
                label='E-commerce Platform'
                rules={[{ required: true, message: 'Please select the platform' }]}
              >
                <Select placeholder='Select platform'>
                  <Option value='shopify'>Shopify</Option>
                  <Option value='woocommerce'>WooCommerce</Option>
                  <Option value='magento'>Magento</Option>
                  <Option value='custom'>Custom Platform</Option>
                  <Option value='other'>Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name='monthlyGMV'
            label='Monthly GMV (₹)'
            rules={[{ required: true, message: 'Please enter the monthly GMV' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/₹\s?|(,*)/g, '')}
              placeholder='Monthly GMV'
              min={0}
            />
          </Form.Item>

          <Form.Item
            name='customerType'
            label='Customer Type'
            tooltip='This helps us recommend the right GoKwik products'
            rules={[{ required: true, message: 'Please select the customer type' }]}
          >
            <Select placeholder='Select customer type'>
              <Option value='cod_heavy'>COD Heavy ({'>'}60% orders)</Option>
              <Option value='high_rto'>High RTO ({'>'}15% returns)</Option>
              <Option value='low_conversion'>Low Conversion Rate</Option>
              <Option value='standard'>Standard</Option>
            </Select>
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Contact Details',
      content: (
        <>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='contactName'
                label='Contact Person'
                rules={[{ required: true, message: 'Please enter the contact person name' }]}
              >
                <Input prefix={<UserOutlined />} placeholder='Contact Person' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='contactEmail'
                label='Email'
                rules={[
                  { required: true, message: 'Please enter the email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder='Email' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='contactPhone'
                label='Phone'
                rules={[{ required: true, message: 'Please enter the phone number' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder='Phone' />
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
    {
      title: 'Product Details',
      content: (
        <>
          <Form.Item
            name='product'
            label='Interested Product'
            rules={[{ required: true, message: 'Please select the product' }]}
          >
            <Select placeholder='Select product'>
              <Option value='checkout'>GoKwik Checkout</Option>
              <Option value='rto'>Return Prime</Option>
              <Option value='engage'>KwikEngage</Option>
              <Option value='all'>All Products</Option>
            </Select>
          </Form.Item>

          <Form.Item name='notes' label='Additional Notes'>
            <Input.TextArea rows={4} placeholder='Any additional information about the brand or requirements' />
          </Form.Item>
        </>
      ),
    },
  ];

  const next = () => {
    form
      .validateFields(
        steps[currentStep].content.props.children.flatMap((row) =>
          React.Children.toArray(row.props.children).flatMap((col) =>
            React.Children.toArray(col.props.children)
              .map((item) => item.props?.name)
              .filter(Boolean),
          ),
        ),
      )
      .then(() => {
        setCurrentStep(currentStep + 1);
      });
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      <Title level={2}>Submit New Lead</Title>
      <Paragraph>
        Refer a brand to GoKwik and earn commissions on successful onboarding. Fill in the details below to submit a new
        lead.
      </Paragraph>

      <Card>
        <Steps current={currentStep} style={{ marginBottom: 24 }}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <div style={{ minHeight: '300px' }}>
          <Form
            form={form}
            layout='vertical'
            onFinish={handleSubmit}
            initialValues={{
              vertical: 'fashion',
              platform: 'shopify',
              product: 'checkout',
              customerType: 'standard',
            }}
          >
            {steps[currentStep].content}
          </Form>
        </div>

        <Divider />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {currentStep > 0 && <Button onClick={prev}>Previous</Button>}
          <div style={{ flex: 1 }}></div>
          {currentStep < steps.length - 1 && (
            <Button type='primary' onClick={next}>
              Next
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type='primary' onClick={handleFinalSubmit} loading={loading}>
              Submit Referral
            </Button>
          )}
        </div>
      </Card>

      {/* KYC Handling Modal */}
      <Modal
        title={
          <Space>
            <QuestionCircleOutlined />
            <span>KYC Handling Preference</span>
          </Space>
        }
        open={kycHandlingModalVisible}
        footer={null}
        closable={false}
        maskClosable={false}
      >
        <Alert
          message='Important: KYC Document Collection'
          description='KYC documents are required for merchant onboarding. Please select who will handle the KYC document collection process.'
          type='info'
          showIcon
          style={{ marginBottom: 16 }}
        />

        <div style={{ marginBottom: 24 }}>
          <Radio.Group style={{ width: '100%' }} onChange={(e) => handleKycSelection(e.target.value)}>
            <Space direction='vertical' style={{ width: '100%' }}>
              <Radio.Button value='partner' style={{ width: '100%', height: 'auto', padding: '8px 16px' }}>
                <div>
                  <Text strong>I will collect KYC documents</Text>
                  <div>
                    <Text type='secondary'>
                      You'll be responsible for collecting and submitting all required KYC documents from the merchant.
                    </Text>
                  </div>
                </div>
              </Radio.Button>

              <Radio.Button value='gokwik' style={{ width: '100%', height: 'auto', padding: '8px 16px' }}>
                <div>
                  <Text strong>GoKwik will handle KYC</Text>
                  <div>
                    <Text type='secondary'>
                      GoKwik team will reach out to the merchant directly to collect KYC documents.
                    </Text>
                  </div>
                </div>
              </Radio.Button>
            </Space>
          </Radio.Group>
        </div>
      </Modal>
    </div>
  );
};

export default ReferralForm;
