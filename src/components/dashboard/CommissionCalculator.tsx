import React, { useState } from 'react';
import { Card, Form, Input, Select, Button, Typography, Divider, Row, Col, Statistic, Alert } from 'antd';
import { CalculatorOutlined, DollarOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const CommissionCalculator: React.FC = () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState<{
    commission: number;
    breakdown: { label: string; value: string | number }[];
  } | null>(null);

  const handleCalculate = (values: any) => {
    const { partnerType, monthlyGMV, product, vertical } = values;

    // Base rates by partner type
    let baseRate = 0;
    switch (partnerType) {
      case 'referral':
        baseRate = 0.03; // 3%
        break;
      case 'reseller':
        baseRate = 0.05; // 5%
        break;
      case 'service':
        // Fixed amount for service partners
        const commission = 10000;
        setResult({
          commission,
          breakdown: [
            { label: 'Partner Type', value: 'Service Partner' },
            { label: 'Commission Type', value: 'Fixed Incentive' },
            { label: 'Fixed Amount', value: `₹${commission.toLocaleString()}` },
          ],
        });
        return;
    }

    // Product multiplier
    let productMultiplier = 1;
    switch (product) {
      case 'checkout':
        productMultiplier = 1.2;
        break;
      case 'rto':
        productMultiplier = 1.1;
        break;
      case 'engage':
        productMultiplier = 1.05;
        break;
      case 'all':
        productMultiplier = 1.3;
        break;
    }

    // Vertical bonus
    let verticalBonus = 0;
    switch (vertical) {
      case 'fashion':
        verticalBonus = 0.01; // Additional 1%
        break;
      case 'electronics':
        verticalBonus = 0.005; // Additional 0.5%
        break;
    }

    // Calculate commission
    const effectiveRate = baseRate * productMultiplier + verticalBonus;
    const commission = monthlyGMV * effectiveRate;

    // Set result
    setResult({
      commission,
      breakdown: [
        { label: 'Monthly GMV', value: `₹${parseInt(monthlyGMV).toLocaleString()}` },
        { label: 'Base Rate', value: `${(baseRate * 100).toFixed(1)}%` },
        { label: 'Product Multiplier', value: productMultiplier.toFixed(2) },
        { label: 'Vertical Bonus', value: `${(verticalBonus * 100).toFixed(1)}%` },
        { label: 'Effective Rate', value: `${(effectiveRate * 100).toFixed(2)}%` },
        {
          label: 'Calculation',
          value: `₹${parseInt(monthlyGMV).toLocaleString()} × ${(effectiveRate * 100).toFixed(2)}%`,
        },
      ],
    });
  };

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CalculatorOutlined style={{ fontSize: 20, marginRight: 8 }} />
          <span>Commission Calculator</span>
        </div>
      }
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={handleCalculate}
        initialValues={{ partnerType: 'referral', product: 'checkout', vertical: 'fashion' }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name='partnerType'
              label='Partner Type'
              rules={[{ required: true, message: 'Please select partner type' }]}
            >
              <Select>
                <Option value='referral'>Referral Partner</Option>
                <Option value='reseller'>Reseller Partner</Option>
                <Option value='service'>Service Partner</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name='monthlyGMV'
              label='Monthly GMV (₹)'
              rules={[{ required: true, message: 'Please enter monthly GMV' }]}
            >
              <Input prefix='₹' type='number' min={0} placeholder='e.g. 500000' />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name='product' label='Product' rules={[{ required: true, message: 'Please select product' }]}>
              <Select>
                <Option value='checkout'>Kwik Checkout</Option>
                <Option value='rto'>Return Prime</Option>
                <Option value='engage'>KwikEngage</Option>
                <Option value='all'>All Products</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name='vertical' label='Vertical' rules={[{ required: true, message: 'Please select vertical' }]}>
              <Select>
                <Option value='fashion'>Fashion</Option>
                <Option value='electronics'>Electronics</Option>
                <Option value='beauty'>Beauty</Option>
                <Option value='home'>Home & Furniture</Option>
                <Option value='food'>Food & Grocery</Option>
                <Option value='other'>Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type='primary' htmlType='submit' icon={<CalculatorOutlined />} block>
            Calculate Commission
          </Button>
        </Form.Item>
      </Form>

      {result && (
        <>
          <Divider />
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <Statistic
              title='Estimated Commission'
              value={result.commission}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix='₹'
              suffix=''
            />
            <Paragraph type='secondary'>This is an estimate based on the provided information</Paragraph>
          </div>

          <Alert
            message='Commission Breakdown'
            description={
              <div>
                {result.breakdown.map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text>{item.label}:</Text>
                    <Text strong>{item.value}</Text>
                  </div>
                ))}
              </div>
            }
            type='info'
            showIcon
          />
        </>
      )}
    </Card>
  );
};

export default CommissionCalculator;
