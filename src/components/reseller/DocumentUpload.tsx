import React, { useState } from 'react';
import {
  Card,
  Typography,
  Upload,
  Button,
  List,
  Tag,
  Space,
  Progress,
  Divider,
  Tabs,
  Empty,
  message,
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
} from 'antd';
import {
  UploadOutlined,
  FileOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;
const { TabPane } = Tabs;
const { Option } = Select;

// Mock document categories
const documentCategories = [
  { key: 'kyc', name: 'KYC Documents', required: true },
  { key: 'business', name: 'Business Documents', required: true },
  { key: 'bank', name: 'Banking Details', required: true },
  { key: 'gtm', name: 'GTM Materials', required: false },
  { key: 'other', name: 'Other Documents', required: false },
];

// Mock document types
const documentTypes = {
  kyc: [
    { key: 'pan', name: 'PAN Card', required: true },
    { key: 'gst', name: 'GST Certificate', required: true },
    { key: 'incorporation', name: 'Certificate of Incorporation', required: true },
    { key: 'address', name: 'Address Proof', required: true },
  ],
  business: [
    { key: 'profile', name: 'Company Profile', required: true },
    { key: 'portfolio', name: 'Client Portfolio', required: false },
    { key: 'case_studies', name: 'Case Studies', required: false },
  ],
  bank: [
    { key: 'cancelled_cheque', name: 'Cancelled Cheque', required: true },
    { key: 'bank_statement', name: 'Bank Statement', required: false },
  ],
  gtm: [
    { key: 'pitch_deck', name: 'Pitch Deck', required: false },
    { key: 'marketing_materials', name: 'Marketing Materials', required: false },
    { key: 'product_guides', name: 'Product Guides', required: false },
  ],
  other: [
    { key: 'agreement', name: 'Partnership Agreement', required: false },
    { key: 'other', name: 'Other Documents', required: false },
  ],
};

// Mock uploaded documents
const mockDocuments = [
  {
    uid: '1',
    name: 'PAN Card.pdf',
    status: 'done',
    url: 'https://example.com/pan-card.pdf',
    category: 'kyc',
    type: 'pan',
    uploadedAt: '2025-04-15T10:30:00Z',
    approvalStatus: 'approved',
    approvedBy: 'GoKwik Admin',
    approvedAt: '2025-04-16T14:20:00Z',
    thumbnail: 'https://via.placeholder.com/100x100?text=PDF',
  },
  {
    uid: '2',
    name: 'GST Certificate.pdf',
    status: 'done',
    url: 'https://example.com/gst-certificate.pdf',
    category: 'kyc',
    type: 'gst',
    uploadedAt: '2025-04-15T10:35:00Z',
    approvalStatus: 'approved',
    approvedBy: 'GoKwik Admin',
    approvedAt: '2025-04-16T14:25:00Z',
    thumbnail: 'https://via.placeholder.com/100x100?text=PDF',
  },
  {
    uid: '3',
    name: 'Company Profile.pptx',
    status: 'done',
    url: 'https://example.com/company-profile.pptx',
    category: 'business',
    type: 'profile',
    uploadedAt: '2025-04-15T11:00:00Z',
    approvalStatus: 'pending',
    thumbnail: 'https://via.placeholder.com/100x100?text=PPTX',
  },
  {
    uid: '4',
    name: 'Cancelled Cheque.jpg',
    status: 'done',
    url: 'https://example.com/cancelled-cheque.jpg',
    category: 'bank',
    type: 'cancelled_cheque',
    uploadedAt: '2025-04-15T11:15:00Z',
    approvalStatus: 'pending',
    thumbnail: 'https://via.placeholder.com/100x100?text=JPG',
  },
  {
    uid: '5',
    name: 'Pitch Deck.pdf',
    status: 'done',
    url: 'https://example.com/pitch-deck.pdf',
    category: 'gtm',
    type: 'pitch_deck',
    uploadedAt: '2025-04-15T11:30:00Z',
    approvalStatus: 'approved',
    approvedBy: 'GoKwik Admin',
    approvedAt: '2025-04-16T15:00:00Z',
    thumbnail: 'https://via.placeholder.com/100x100?text=PDF',
  },
];

const DocumentUpload: React.FC = () => {
  const [activeTab, setActiveTab] = useState('kyc');
  const [fileList, setFileList] = useState<UploadFile[]>(mockDocuments);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('kyc');
  const [selectedType, setSelectedType] = useState('');
  const [form] = Form.useForm();

  // Get file icon based on file extension
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FilePdfOutlined style={{ fontSize: 24, color: '#ff4d4f' }} />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileImageOutlined style={{ fontSize: 24, color: '#1890ff' }} />;
      case 'xls':
      case 'xlsx':
        return <FileExcelOutlined style={{ fontSize: 24, color: '#52c41a' }} />;
      case 'doc':
      case 'docx':
        return <FileWordOutlined style={{ fontSize: 24, color: '#1890ff' }} />;
      default:
        return <FileOutlined style={{ fontSize: 24, color: '#faad14' }} />;
    }
  };

  // Get approval status tag
  const getApprovalStatusTag = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Tag icon={<CheckCircleOutlined />} color='success'>
            Approved
          </Tag>
        );
      case 'rejected':
        return (
          <Tag icon={<ExclamationCircleOutlined />} color='error'>
            Rejected
          </Tag>
        );
      case 'pending':
        return (
          <Tag icon={<ClockCircleOutlined />} color='processing'>
            Pending
          </Tag>
        );
      default:
        return <Tag color='default'>Unknown</Tag>;
    }
  };

  // Calculate completion percentage for a category
  const getCategoryCompletion = (category: string) => {
    const types = documentTypes[category as keyof typeof documentTypes];
    const requiredTypes = types.filter((type) => type.required).map((type) => type.key);
    const uploadedRequiredTypes = fileList
      .filter((file) => file.category === category && requiredTypes.includes(file.type))
      .map((file) => file.type);

    const uniqueUploadedTypes = [...new Set(uploadedRequiredTypes)];
    return Math.round((uniqueUploadedTypes.length / requiredTypes.length) * 100);
  };

  // Handle file upload
  const handleUpload = (info: any) => {
    // In a real app, this would handle the actual file upload
    console.log('Upload info:', info);
  };

  // Handle file delete
  const handleDelete = (uid: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this document?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setFileList(fileList.filter((file) => file.uid !== uid));
        message.success('Document deleted successfully');
      },
    });
  };

  // Handle file view
  const handleView = (file: any) => {
    // In a real app, this would open the file for viewing
    console.log('View file:', file);
    message.info(`Viewing ${file.name}`);
  };

  // Handle upload modal submit
  const handleUploadModalSubmit = (values: any) => {
    const newFile = {
      uid: `upload-${Date.now()}`,
      name: values.fileName,
      status: 'done',
      url: `https://example.com/${values.fileName.toLowerCase().replace(/\s+/g, '-')}`,
      category: selectedCategory,
      type: values.documentType,
      uploadedAt: new Date().toISOString(),
      approvalStatus: 'pending',
      thumbnail: `https://via.placeholder.com/100x100?text=${values.fileName.split('.').pop()?.toUpperCase()}`,
    };

    setFileList([...fileList, newFile]);
    setUploadModalVisible(false);
    form.resetFields();
    message.success('Document uploaded successfully');
  };

  // Filter files by category
  const getFilesByCategory = (category: string) => {
    return fileList.filter((file) => file.category === category);
  };

  // Check if a document type has been uploaded
  const isDocumentTypeUploaded = (category: string, type: string) => {
    return fileList.some((file) => file.category === category && file.type === type);
  };

  // Render document list for a category
  const renderDocumentList = (category: string) => {
    const files = getFilesByCategory(category);

    if (files.length === 0) {
      return <Empty description='No documents uploaded yet' />;
    }

    return (
      <List
        itemLayout='horizontal'
        dataSource={files}
        renderItem={(file) => (
          <List.Item
            actions={[
              <Button type='text' icon={<EyeOutlined />} onClick={() => handleView(file)} />,
              <Button type='text' danger icon={<DeleteOutlined />} onClick={() => handleDelete(file.uid)} />,
            ]}
          >
            <List.Item.Meta
              avatar={getFileIcon(file.name)}
              title={
                <Space>
                  <Text strong>{file.name}</Text>
                  {getApprovalStatusTag(file.approvalStatus)}
                </Space>
              }
              description={
                <Space direction='vertical' size={0}>
                  <Text type='secondary'>Uploaded: {new Date(file.uploadedAt).toLocaleString()}</Text>
                  {file.approvalStatus === 'approved' && (
                    <Text type='secondary'>
                      Approved by {file.approvedBy} on {new Date(file.approvedAt!).toLocaleString()}
                    </Text>
                  )}
                </Space>
              }
            />
          </List.Item>
        )}
      />
    );
  };

  // Render upload section for a category
  const renderUploadSection = (category: string) => {
    const types = documentTypes[category as keyof typeof documentTypes];

    return (
      <div>
        <Paragraph>
          Upload the required documents for this category. All documents marked as required must be uploaded.
        </Paragraph>

        <List
          itemLayout='horizontal'
          dataSource={types}
          renderItem={(type) => (
            <List.Item
              actions={[
                isDocumentTypeUploaded(category, type.key) ? (
                  <Tag color='success'>Uploaded</Tag>
                ) : (
                  <Button
                    type='primary'
                    size='small'
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedType(type.key);
                      setUploadModalVisible(true);
                    }}
                  >
                    Upload
                  </Button>
                ),
              ]}
            >
              <List.Item.Meta
                avatar={<FileOutlined />}
                title={
                  <Space>
                    <Text>{type.name}</Text>
                    {type.required && <Tag color='red'>Required</Tag>}
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </div>
    );
  };

  return (
    <div>
      <Title level={2}>Document Upload</Title>
      <Paragraph>
        Upload all required documents to complete your partner onboarding. Documents will be reviewed by the GoKwik
        team.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {documentCategories.map((category) => (
          <Col key={category.key} xs={24} sm={12} md={8} lg={6}>
            <Card>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Progress type='circle' percent={getCategoryCompletion(category.key)} width={80} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <Text strong>{category.name}</Text>
                <div>
                  <Text type='secondary'>{category.required ? 'Required' : 'Optional'}</Text>
                </div>
                <Button
                  type='link'
                  onClick={() => setActiveTab(category.key)}
                  style={{ padding: 0, height: 'auto', marginTop: 8 }}
                >
                  View Documents
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          {documentCategories.map((category) => (
            <TabPane tab={category.name} key={category.key}>
              <div style={{ marginBottom: 16 }}>
                <Button
                  type='primary'
                  icon={<UploadOutlined />}
                  onClick={() => {
                    setSelectedCategory(category.key);
                    setSelectedType('');
                    setUploadModalVisible(true);
                  }}
                >
                  Upload Document
                </Button>
              </div>

              <Divider orientation='left'>Required Documents</Divider>
              {renderUploadSection(category.key)}

              <Divider orientation='left'>Uploaded Documents</Divider>
              {renderDocumentList(category.key)}
            </TabPane>
          ))}
        </Tabs>
      </Card>

      {/* Upload Modal */}
      <Modal
        title='Upload Document'
        open={uploadModalVisible}
        onCancel={() => setUploadModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout='vertical' onFinish={handleUploadModalSubmit}>
          <Form.Item
            name='documentType'
            label='Document Type'
            rules={[{ required: true, message: 'Please select document type' }]}
            initialValue={selectedType}
          >
            <Select placeholder='Select document type'>
              {selectedCategory &&
                documentTypes[selectedCategory as keyof typeof documentTypes].map((type) => (
                  <Option key={type.key} value={type.key}>
                    {type.name} {type.required && '(Required)'}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item name='fileName' label='File Name' rules={[{ required: true, message: 'Please enter file name' }]}>
            <Input placeholder='e.g., PAN Card.pdf' />
          </Form.Item>

          <Form.Item label='Upload File'>
            <Dragger beforeUpload={() => false} onChange={handleUpload} showUploadList={false}>
              <p className='ant-upload-drag-icon'>
                <UploadOutlined />
              </p>
              <p className='ant-upload-text'>Click or drag file to this area to upload</p>
              <p className='ant-upload-hint'>
                Support for a single file upload. PDF, JPG, PNG, DOCX formats supported.
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Upload Document
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DocumentUpload;
