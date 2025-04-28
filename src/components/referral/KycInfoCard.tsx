import React from 'react';
import { Card, Typography, Collapse, Button, Space } from 'antd';
import {
  CloseOutlined,
  RocketOutlined,
  StarOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import './KycInfoCard.css';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface KycInfoCardProps {
  onClose?: () => void;
}

const KycInfoCard: React.FC<KycInfoCardProps> = ({ onClose }) => {
  return (
    <Card className='kyc-info-card'>
      <div className='kyc-info-header'>
        <Title level={4}>Perform KYC on behalf of your client</Title>
        {onClose && <Button type='text' icon={<CloseOutlined />} onClick={onClose} aria-label='Close' />}
      </div>

      <Collapse defaultActiveKey={['why']} ghost expandIconPosition='end'>
        <Panel
          header={
            <Title level={5} style={{ margin: 0 }}>
              Why should I assist my client with their KYC?
            </Title>
          }
          key='why'
          extra={<QuestionCircleOutlined />}
        >
          <div className='benefit-item'>
            <div className='benefit-icon'>
              <RocketOutlined />
            </div>
            <div className='benefit-content'>
              <Title level={5}>Quicker onboarding</Title>
              <Paragraph>Performing KYC for your clients decreases their onboarding time by 50%</Paragraph>
            </div>
          </div>

          <div className='benefit-item'>
            <div className='benefit-icon'>
              <StarOutlined />
            </div>
            <div className='benefit-content'>
              <Title level={5}>Value added services</Title>
              <Paragraph>Ensure easy onboarding and strengthen client relationships.</Paragraph>
            </div>
          </div>
        </Panel>

        <Panel
          header={
            <Title level={5} style={{ margin: 0 }}>
              What will I have to do to perform their KYC?
            </Title>
          }
          key='what'
          extra={<QuestionCircleOutlined />}
        >
          <Space direction='vertical' style={{ width: '100%' }}>
            <div className='kyc-step'>
              <CheckCircleOutlined className='kyc-step-icon' />
              <div>
                <Text strong>Collect business documents</Text>
                <Paragraph type='secondary'>Business PAN, GST certificate, and business address proof</Paragraph>
              </div>
            </div>

            <div className='kyc-step'>
              <CheckCircleOutlined className='kyc-step-icon' />
              <div>
                <Text strong>Collect bank account details</Text>
                <Paragraph type='secondary'>Bank account number, IFSC code, and a canceled cheque</Paragraph>
              </div>
            </div>

            <div className='kyc-step'>
              <CheckCircleOutlined className='kyc-step-icon' />
              <div>
                <Text strong>Authorized signatory details</Text>
                <Paragraph type='secondary'>Signatory's PAN, Aadhaar, and a recent photograph</Paragraph>
              </div>
            </div>

            <div className='kyc-step'>
              <CheckCircleOutlined className='kyc-step-icon' />
              <div>
                <Text strong>Submit documents through the portal</Text>
                <Paragraph type='secondary'>
                  Upload all collected documents in the KYC section after lead submission
                </Paragraph>
              </div>
            </div>
          </Space>
        </Panel>
      </Collapse>
    </Card>
  );
};

export default KycInfoCard;
