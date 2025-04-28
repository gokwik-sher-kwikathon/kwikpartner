import React, { useState } from 'react';
import { Modal, Tabs, Form, Button, message } from 'antd';
import './LeadForms.css';
// @ts-ignore - Importing components that TypeScript doesn't have declarations for
import CheckoutLeadForm from './CheckoutLeadForm';
// @ts-ignore - Importing components that TypeScript doesn't have declarations for
import EngageLeadForm from './EngageLeadForm';

const { TabPane } = Tabs;

interface DynamicLeadFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any, productType: string) => void;
}

const DynamicLeadForm: React.FC<DynamicLeadFormProps> = ({ visible, onCancel, onSubmit }) => {
  const [activeTab, setActiveTab] = useState('checkout');
  const [checkoutForm] = Form.useForm();
  const [engageForm] = Form.useForm();

  const handleSubmit = async () => {
    try {
      let values;

      if (activeTab === 'checkout') {
        values = await checkoutForm.validateFields();
        onSubmit(values, 'checkout');
      } else if (activeTab === 'engage') {
        values = await engageForm.validateFields();
        onSubmit(values, 'engage');
      }

      message.success('Lead submitted successfully!');
      onCancel();

      // Reset forms
      checkoutForm.resetFields();
      engageForm.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title='Add New Lead'
      open={visible}
      onCancel={onCancel}
      width={800}
      className='lead-form-container'
      footer={[
        <Button key='cancel' onClick={onCancel}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={handleSubmit}>
          Submit Lead
        </Button>,
      ]}
      bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab='Checkout Product' key='checkout'>
          <CheckoutLeadForm form={checkoutForm} />
        </TabPane>
        <TabPane tab='Kwik Engage' key='engage'>
          <EngageLeadForm form={engageForm} />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default DynamicLeadForm;
