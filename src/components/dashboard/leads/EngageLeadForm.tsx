import React from 'react';
import { Form, Input, Select, InputNumber, Switch, Divider, Row, Col, Typography, DatePicker } from 'antd';
import { FormInstance } from 'antd/lib/form';

const { Option } = Select;
const { Text, Title } = Typography;
const { TextArea } = Input;

interface EngageLeadFormProps {
  form: FormInstance;
}

const EngageLeadForm: React.FC<EngageLeadFormProps> = ({ form }) => {
  return (
    <Form
      form={form}
      layout='vertical'
      requiredMark='optional'
      initialValues={{
        salesType: 'New Account: GoKwik + KwikChat',
        platform: 'Shopify',
        channels: ['SMS', 'Email', 'Whatsapp', 'KwikPass'],
        whatsappChargeType: 'Delivered',
        paymentMode: 'Prepaid',
        merchantLocation: 'Mumbai',
      }}
    >
      <Title level={4}>Account Details</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name='accountName'
            label='Account Name'
            rules={[{ required: true, message: 'Please enter account name' }]}
          >
            <Input placeholder='e.g., Patch Up' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='salesType'
            label='Sales Type'
            rules={[{ required: true, message: 'Please select sales type' }]}
          >
            <Select placeholder='Select sales type'>
              <Option value='New Account: GoKwik + KwikChat'>New Account: GoKwik + KwikChat</Option>
              <Option value='Existing Account: Adding KwikChat'>Existing Account: Adding KwikChat</Option>
              <Option value='KwikChat Only'>KwikChat Only</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name='existingProvider' label='Existing Provider (If Any)'>
            <Input placeholder='e.g., NA' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='platform' label='Platform' rules={[{ required: true, message: 'Please select platform' }]}>
            <Select placeholder='Select platform'>
              <Option value='Shopify'>Shopify</Option>
              <Option value='Magento'>Magento</Option>
              <Option value='WooCommerce'>WooCommerce</Option>
              <Option value='Custom'>Custom</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name='channels'
            label='Channels closed'
            rules={[{ required: true, message: 'Please select at least one channel' }]}
          >
            <Select mode='multiple' placeholder='Select channels'>
              <Option value='SMS'>SMS</Option>
              <Option value='Email'>Email</Option>
              <Option value='Whatsapp'>Whatsapp</Option>
              <Option value='KwikPass'>KwikPass</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation='left'>Pricing Details</Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name='whatsappChargeType' label='Whatsapp: To be charged on'>
            <Select placeholder='Select charge type'>
              <Option value='Delivered'>Delivered</Option>
              <Option value='Sent'>Sent</Option>
              <Option value='Read'>Read</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='totalFixedCost'
            label='Total Fixed Cost (for all channels signed)'
            rules={[{ required: true, message: 'Please enter fixed cost' }]}
          >
            <Input placeholder='e.g., 90000 (6 months subscription)' />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name='whatsappTrialPeriod' label='Whatsapp Trial Period Committed (Days)'>
            <InputNumber style={{ width: '100%' }} min={0} placeholder='e.g., 30' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='whatsappTrialPricing' label='Whatsapp Trial Period Pricing'>
            <Input placeholder='e.g., 0, 0.82, 0.18, 0.15' />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name='whatsappPostTrialPricing' label='Whatsapp Post Trial Period Pricing'>
            <Input placeholder='e.g., 90000, 0.82, 0.18, 0.15' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='smsPricing' label='SMS Pricing'>
            <Input placeholder='e.g., 0.13' />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name='emailPricing' label='Email Pricing'>
            <Input placeholder='e.g., 0.03' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='phaseWiseGoLive' label='Phase-wise Go-Live'>
            <Input placeholder='e.g., NA' />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation='left'>Founder & POC Details</Divider>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name='founderDetails'
            label='Founder Details (Name, Email, Phone, Designation)'
            rules={[{ required: true, message: 'Please enter founder details' }]}
          >
            <TextArea rows={2} placeholder='e.g., Radhika Rajpal, radhika@patchuphealth.com, Founder' />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name='pocDetails'
            label='POC 1 Details (Name, Email, Phone, Designation)'
            rules={[{ required: true, message: 'Please enter POC details' }]}
          >
            <TextArea rows={2} placeholder='e.g., Radhika Rajpal, radhika@patchuphealth.com, Founder' />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name='merchantLocation' label='Merchant HeadOffice Location'>
            <Input placeholder='e.g., Gurugram' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='billingFormFilled'
            label='Billing Form Filled by Merchant'
            valuePropName='checked'
            rules={[{ required: true, message: 'Please confirm billing form' }]}
          >
            <Switch checkedChildren='Confirmed' unCheckedChildren='Not Confirmed' />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name='exhibitBSigned' label='Exhibit B Signed' valuePropName='checked'>
            <Switch checkedChildren='Yes' unCheckedChildren='No' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name='merchantAgreementSigned' label='Merchant Agreement Signed' valuePropName='checked'>
            <Switch checkedChildren='Yes' unCheckedChildren='No' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name='whatsappGroupLink' label='Whatsapp Group Link'>
            <Input placeholder='e.g., TBC' />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation='left'>Additional Information</Divider>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name='salesManager' label='Sales Manager / CSM'>
            <Input placeholder='e.g., Bhavya Suri (Sales)' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name='accountSignupDate' label='Account Signup Date'>
            <DatePicker style={{ width: '100%' }} format='MMM DD, YYYY' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name='ordersLast30Days' label='No. of Orders in last 30 days'>
            <InputNumber style={{ width: '100%' }} min={0} placeholder='e.g., 7000' />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name='paymentMode' label='Mode of Payment committed'>
            <Select placeholder='Select payment mode'>
              <Option value='Prepaid'>Prepaid</Option>
              <Option value='Postpaid'>Postpaid</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='painPoint' label='Pain Point / Challenge'>
            <Input placeholder='e.g., NA' />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default EngageLeadForm;
