import React from 'react';
import { Form, Input, Select, InputNumber, Switch, Divider, Row, Col, Typography } from 'antd';
import { FormInstance } from 'antd/lib/form';

const { Option } = Select;
const { Text, Title } = Typography;

interface CheckoutLeadFormProps {
  form: FormInstance;
}

const CheckoutLeadForm: React.FC<CheckoutLeadFormProps> = ({ form }) => {
  return (
    <Form
      form={form}
      layout='vertical'
      requiredMark='optional'
      initialValues={{
        platform: 'Shopify',
        merchantCategory: 'Fashion',
        city: 'Mumbai',
        upiPercentage: 2.5,
        upiOnCCPercentage: 2.5,
        codPercentage: 2,
        ccPercentage: 2.5,
        bnplPercentage: 2.5,
        dcAbove2kPercentage: 2.5,
        dcBelow2kPercentage: 2.5,
        netBankingPercentage: 2.5,
        amexPercentage: 3,
        dinersPercentage: 3,
        corporateCCPercentage: 3,
        walletsPercentage: 2.5,
        codSharePercentage: 50,
        ebSignUpDone: false,
      }}
    >
      <Title level={4}>Brand Information</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name='brandName'
            label='Brand Name'
            rules={[{ required: true, message: 'Please enter brand name' }]}
          >
            <Input placeholder='e.g., Skross-StoreFront' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='url' label='URL' rules={[{ required: true, message: 'Please enter URL' }]}>
            <Input placeholder='e.g., www.skrosstravel.com' />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name='platform' label='Platform' rules={[{ required: true, message: 'Please select platform' }]}>
            <Select placeholder='Select platform'>
              <Option value='Shopify'>Shopify</Option>
              <Option value='Magento'>Magento</Option>
              <Option value='WooCommerce'>WooCommerce</Option>
              <Option value='Custom'>Custom</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name='subPlatform' label='Sub Platform'>
            <Select placeholder='Select sub platform'>
              <Option value='Basic'>Basic</Option>
              <Option value='Plus'>Plus</Option>
              <Option value='Advanced'>Advanced</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name='merchantCategory'
            label='Merchant Category'
            rules={[{ required: true, message: 'Please select category' }]}
          >
            <Select placeholder='Select category'>
              <Option value='Fashion'>Fashion</Option>
              <Option value='Electronics'>Electronics</Option>
              <Option value='Beauty'>Beauty</Option>
              <Option value='Home'>Home & Kitchen</Option>
              <Option value='Others'>Others</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name='expectedARR'
            label='Expected ARR (₹)'
            rules={[{ required: true, message: 'Please enter expected ARR' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/₹\s?|(,*)/g, '')}
              placeholder='e.g., 144375.75'
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name='expectedTransactionsPerDay'
            label='Expected Transactions/day'
            rules={[{ required: true, message: 'Please enter expected transactions' }]}
          >
            <InputNumber style={{ width: '100%' }} min={1} placeholder='e.g., 10' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name='aov'
            label='AOV (Average Order Value)'
            rules={[{ required: true, message: 'Please enter AOV' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/₹\s?|(,*)/g, '')}
              placeholder='e.g., 1800.00'
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name='valuePromised' label='Value Promised'>
            <Select mode='multiple' placeholder='Select value promised'>
              <Option value='CR Improvement'>CR Improvement</Option>
              <Option value='RTO Reduction'>RTO Reduction</Option>
              <Option value='RTO Intelligence'>RTO Intelligence</Option>
              <Option value='Checkout Experience'>Checkout Experience</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='valuePromisedComments' label='Value Promised Comments'>
            <Input.TextArea rows={1} placeholder='Additional comments' />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation='left'>Commercials</Divider>

      <Row gutter={16}>
        <Col span={6}>
          <Form.Item name='upiPercentage' label='UPI %'>
            <InputNumber style={{ width: '100%' }} min={0} max={100} step={0.1} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name='upiOnCCPercentage' label='UPI on CC %'>
            <InputNumber style={{ width: '100%' }} min={0} max={100} step={0.1} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name='codPercentage' label='COD %'>
            <InputNumber style={{ width: '100%' }} min={0} max={100} step={0.1} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name='ccPercentage' label='CC %'>
            <InputNumber style={{ width: '100%' }} min={0} max={100} step={0.1} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={6}>
          <Form.Item name='bnplPercentage' label='BNPL %'>
            <InputNumber style={{ width: '100%' }} min={0} max={100} step={0.1} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name='dcAbove2kPercentage' label='DC above 2k %'>
            <InputNumber style={{ width: '100%' }} min={0} max={100} step={0.1} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name='dcBelow2kPercentage' label='DC below 2k %'>
            <InputNumber style={{ width: '100%' }} min={0} max={100} step={0.1} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name='netBankingPercentage' label='Net Banking %'>
            <InputNumber style={{ width: '100%' }} min={0} max={100} step={0.1} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name='minimumGuarantee' label='Minimum Guarantee (₹)'>
            <InputNumber
              style={{ width: '100%' }}
              formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/₹\s?|(,*)/g, '')}
              placeholder='e.g., 3000.00'
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name='codSharePercentage' label='COD Share %'>
            <InputNumber style={{ width: '100%' }} min={0} max={100} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name='rtoPercentage' label='RTO Coverage %'>
            <InputNumber style={{ width: '100%' }} min={0} max={100} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name='city' label='City'>
            <Input placeholder='e.g., Mumbai' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='notes' label='Notes'>
            <Input.TextArea rows={1} placeholder='Additional notes' />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name='ebSignUpDone' label='EB Sign up done' valuePropName='checked'>
            <Switch />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='ebRegisteredEmail' label='EB Registered Email ID'>
            <Input placeholder='e.g., info@example.com' />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CheckoutLeadForm;
