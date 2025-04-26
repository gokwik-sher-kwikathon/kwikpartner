import React, { useState } from 'react';
import './TechDocumentation.css';
import {
  Card,
  Typography,
  Tabs,
  Tree,
  List,
  Tag,
  Space,
  Button,
  Row,
  Col,
  Input,
  Select,
  Divider,
  Breadcrumb,
  Alert,
  Tooltip,
  Badge,
  Empty,
} from 'antd';
import {
  FileOutlined,
  FolderOutlined,
  SearchOutlined,
  DownloadOutlined,
  StarOutlined,
  StarFilled,
  CodeOutlined,
  ApiOutlined,
  BookOutlined,
  FileMarkdownOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  FileUnknownOutlined,
  FilterOutlined,
  EyeOutlined,
  CopyOutlined,
  LinkOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;
const { DirectoryTree } = Tree;

// Mock data for documentation
const mockDocumentation = [
  {
    id: 'doc-1',
    title: 'API Reference',
    type: 'api',
    category: 'checkout',
    tags: ['api', 'reference', 'checkout'],
    lastUpdated: '2025-04-15T00:00:00Z',
    content: `# Checkout API Reference

## Overview

The Checkout API allows you to integrate GoKwik's checkout solution into your e-commerce platform. This API handles payment processing, address validation, and order management.

## Authentication

All API requests require authentication using an API key. You can generate an API key from the GoKwik dashboard.

\`\`\`javascript
// Example API request with authentication
const response = await fetch('https://api.gokwik.co/v1/checkout/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    // Request payload
  })
});
\`\`\`

## Endpoints

### Create Checkout Session

\`\`\`
POST /v1/checkout/create
\`\`\`

Creates a new checkout session for a customer.`,
    isFavorite: true,
  },
  {
    id: 'doc-2',
    title: 'Webhook Integration Guide',
    type: 'guide',
    category: 'checkout',
    tags: ['webhook', 'integration', 'checkout'],
    lastUpdated: '2025-04-10T00:00:00Z',
    content: `# Webhook Integration Guide

## Overview

This guide explains how to set up and handle webhooks from GoKwik. Webhooks allow your application to receive real-time notifications about events that occur in the GoKwik system.

## Setting Up Webhooks

1. Log in to your GoKwik dashboard
2. Navigate to Settings > Webhooks
3. Click "Add Webhook Endpoint"
4. Enter the URL where you want to receive webhook events
5. Select the events you want to subscribe to
6. Click "Save"`,
    isFavorite: false,
  },
  {
    id: 'doc-3',
    title: 'Return Prime Integration Guide',
    type: 'guide',
    category: 'rto',
    tags: ['rto', 'integration', 'returns'],
    lastUpdated: '2025-04-05T00:00:00Z',
    content: `# Return Prime Integration Guide

## Overview

This guide explains how to integrate GoKwik's Return Prime solution into your e-commerce platform. Return Prime helps you manage returns and reduce RTO (Return to Origin) rates.

## Integration Steps

### 1. API Integration

First, you need to integrate with the Return Prime API. See the [API Reference](/docs/api-reference) for detailed API documentation.`,
    isFavorite: true,
  },
  {
    id: 'doc-4',
    title: 'KwikEngage Integration Guide',
    type: 'guide',
    category: 'engage',
    tags: ['engage', 'integration', 'communication'],
    lastUpdated: '2025-03-25T00:00:00Z',
    content: `# KwikEngage Integration Guide

## Overview

This guide explains how to integrate GoKwik's KwikEngage solution into your e-commerce platform. KwikEngage helps you communicate with customers throughout their shopping journey.

## Integration Steps

### 1. API Integration

First, you need to integrate with the KwikEngage API. See the [API Reference](/docs/api-reference) for detailed API documentation.`,
    isFavorite: false,
  },
  {
    id: 'doc-5',
    title: 'SDK Reference',
    type: 'reference',
    category: 'checkout',
    tags: ['sdk', 'reference', 'checkout'],
    lastUpdated: '2025-04-20T00:00:00Z',
    content: `# GoKwik SDK Reference

## Overview

The GoKwik SDK provides client-side libraries for integrating GoKwik services into your web and mobile applications.

## Web SDK

### Installation

You can install the GoKwik Web SDK using npm or yarn:

\`\`\`bash
# Using npm
npm install @gokwik/web-sdk

# Using yarn
yarn add @gokwik/web-sdk
\`\`\``,
    isFavorite: true,
  },
];

// Mock data for file tree
const mockFileTree: DataNode[] = [
  {
    title: 'API Reference',
    key: 'api-reference',
    icon: <ApiOutlined />,
    children: [
      {
        title: 'Checkout API',
        key: 'checkout-api',
        icon: <FileOutlined />,
        isLeaf: true,
      },
      {
        title: 'Return Prime API',
        key: 'return-prime-api',
        icon: <FileOutlined />,
        isLeaf: true,
      },
      {
        title: 'KwikEngage API',
        key: 'customer-engage-api',
        icon: <FileOutlined />,
        isLeaf: true,
      },
      {
        title: 'Webhook API',
        key: 'webhook-api',
        icon: <FileOutlined />,
        isLeaf: true,
      },
    ],
  },
  {
    title: 'Integration Guides',
    key: 'integration-guides',
    icon: <BookOutlined />,
    children: [
      {
        title: 'Checkout Integration',
        key: 'checkout-integration',
        icon: <FileOutlined />,
        isLeaf: true,
      },
      {
        title: 'Return Prime Integration',
        key: 'return-prime-integration',
        icon: <FileOutlined />,
        isLeaf: true,
      },
      {
        title: 'KwikEngage Integration',
        key: 'customer-engage-integration',
        icon: <FileOutlined />,
        isLeaf: true,
      },
      {
        title: 'Webhook Integration',
        key: 'webhook-integration',
        icon: <FileOutlined />,
        isLeaf: true,
      },
    ],
  },
  {
    title: 'SDK Documentation',
    key: 'sdk-documentation',
    icon: <CodeOutlined />,
    children: [
      {
        title: 'Web SDK',
        key: 'web-sdk',
        icon: <FileOutlined />,
        isLeaf: true,
      },
      {
        title: 'Android SDK',
        key: 'android-sdk',
        icon: <FileOutlined />,
        isLeaf: true,
      },
      {
        title: 'iOS SDK',
        key: 'ios-sdk',
        icon: <FileOutlined />,
        isLeaf: true,
      },
    ],
  },
];

const TechDocumentation: React.FC = () => {
  const [documents, setDocuments] = useState(mockDocumentation);
  const [selectedDocument, setSelectedDocument] = useState<any>(documents[0]);
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('1');
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['api-reference', 'integration-guides']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>(['checkout-api']);

  // Get document type tag
  const getDocumentTypeTag = (type: string) => {
    switch (type) {
      case 'api':
        return (
          <Tag color='blue' icon={<ApiOutlined />} className='doc-type-tag'>
            API
          </Tag>
        );
      case 'guide':
        return (
          <Tag color='green' icon={<BookOutlined />} className='doc-type-tag'>
            Guide
          </Tag>
        );
      case 'reference':
        return (
          <Tag color='purple' icon={<FileTextOutlined />} className='doc-type-tag'>
            Reference
          </Tag>
        );
      default:
        return (
          <Tag color='default' className='doc-type-tag'>
            {type}
          </Tag>
        );
    }
  };

  // Get document category tag
  const getDocumentCategoryTag = (category: string) => {
    switch (category) {
      case 'checkout':
        return (
          <Tag color='cyan' className='doc-category-tag'>
            Checkout
          </Tag>
        );
      case 'rto':
        return (
          <Tag color='orange' className='doc-category-tag'>
            Return Prime
          </Tag>
        );
      case 'engage':
        return (
          <Tag color='magenta' className='doc-category-tag'>
            Engage
          </Tag>
        );
      default:
        return (
          <Tag color='default' className='doc-category-tag'>
            {category}
          </Tag>
        );
    }
  };

  // Get document icon
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'api':
        return <ApiOutlined className='text-blue-500' style={{ fontSize: 24 }} />;
      case 'guide':
        return <BookOutlined className='text-green-500' style={{ fontSize: 24 }} />;
      case 'reference':
        return <FileTextOutlined className='text-purple-500' style={{ fontSize: 24 }} />;
      default:
        return <FileUnknownOutlined className='text-yellow-500' style={{ fontSize: 24 }} />;
    }
  };

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    const updatedDocuments = documents.map((doc) => {
      if (doc.id === id) {
        return { ...doc, isFavorite: !doc.isFavorite };
      }
      return doc;
    });
    setDocuments(updatedDocuments);

    // Update selected document if it's the one being toggled
    if (selectedDocument && selectedDocument.id === id) {
      setSelectedDocument({ ...selectedDocument, isFavorite: !selectedDocument.isFavorite });
    }
  };

  // Filter documents
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      searchText === '' ||
      doc.title.toLowerCase().includes(searchText.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchText.toLowerCase());

    const matchesCategory = categoryFilter.length === 0 || categoryFilter.includes(doc.category);
    const matchesType = typeFilter.length === 0 || typeFilter.includes(doc.type);
    const matchesTags = tagFilter.length === 0 || doc.tags.some((tag) => tagFilter.includes(tag));

    return matchesSearch && matchesCategory && matchesType && matchesTags;
  });

  // Handle tree select
  const handleTreeSelect = (selectedKeys: React.Key[], info: any) => {
    setSelectedKeys(selectedKeys);
    // In a real app, this would fetch the document based on the selected key
    // For now, just select a random document
    if (selectedKeys.length > 0 && info.node.isLeaf) {
      const randomIndex = Math.floor(Math.random() * documents.length);
      setSelectedDocument(documents[randomIndex]);
    }
  };

  // Get all unique tags
  const allTags = Array.from(new Set(documents.flatMap((doc) => doc.tags)));

  // Get all unique categories
  const allCategories = Array.from(new Set(documents.map((doc) => doc.category)));

  // Get all unique types
  const allTypes = Array.from(new Set(documents.map((doc) => doc.type)));

  // Render document content
  const renderDocumentContent = () => {
    if (!selectedDocument) {
      return <Empty description='Select a document to view' image={Empty.PRESENTED_IMAGE_SIMPLE} className='py-12' />;
    }

    return (
      <div className='document-content'>
        <div className='document-breadcrumb mb-4'>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a>
                <BookOutlined /> Documentation
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a>{selectedDocument.category.charAt(0).toUpperCase() + selectedDocument.category.slice(1)}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{selectedDocument.title}</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className='document-header mb-6'>
          <Row justify='space-between' align='middle'>
            <Col>
              <Space direction='vertical' size={12} className='document-title-area'>
                <Title level={3} className='mb-0'>
                  {selectedDocument.title}
                </Title>
                <Space size={8} wrap>
                  {getDocumentTypeTag(selectedDocument.type)}
                  {getDocumentCategoryTag(selectedDocument.category)}
                  {selectedDocument.tags.map((tag: string) => (
                    <Tag key={tag} color='default' className='doc-tag'>
                      {tag}
                    </Tag>
                  ))}
                </Space>
              </Space>
            </Col>
            <Col>
              <Space className='document-actions'>
                <Tooltip title='Copy link'>
                  <Button icon={<LinkOutlined />} shape='circle' />
                </Tooltip>
                <Tooltip title='Copy content'>
                  <Button icon={<CopyOutlined />} shape='circle' />
                </Tooltip>
                <Tooltip title='Download'>
                  <Button icon={<DownloadOutlined />} shape='circle' />
                </Tooltip>
                <Tooltip title={selectedDocument.isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
                  <Button
                    shape='circle'
                    icon={selectedDocument.isFavorite ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />}
                    onClick={() => toggleFavorite(selectedDocument.id)}
                  />
                </Tooltip>
              </Space>
            </Col>
          </Row>

          <div className='document-meta mt-4'>
            <Alert
              message={
                <Space>
                  <InfoCircleOutlined />
                  <Text type='secondary'>
                    Last updated: {new Date(selectedDocument.lastUpdated).toLocaleDateString()}
                  </Text>
                </Space>
              }
              type='info'
              showIcon={false}
              className='bg-primary-light'
            />
          </div>
        </div>

        <Divider className='mb-6' />

        <div className='markdown-content'>
          <ReactMarkdown
            components={{
              code: ({ className, children }) => {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <div className='code-block-wrapper'>
                    <div className='code-block-header'>
                      <Space>
                        <CodeOutlined />
                        <span>{match[1]}</span>
                      </Space>
                      <Button type='text' size='small' icon={<CopyOutlined />} className='code-copy-btn' />
                    </div>
                    <SyntaxHighlighter
                      style={vscDarkPlus as any}
                      language={match[1]}
                      PreTag='div'
                      showLineNumbers
                      wrapLines
                      className='code-block'
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className={`inline-code ${className || ''}`}>{children}</code>
                );
              },
              h1: ({ children }) => <h1 className='doc-heading-1'>{children}</h1>,
              h2: ({ children }) => <h2 className='doc-heading-2'>{children}</h2>,
              h3: ({ children }) => <h3 className='doc-heading-3'>{children}</h3>,
              p: ({ children }) => <p className='doc-paragraph'>{children}</p>,
              ul: ({ children }) => <ul className='doc-list-ul'>{children}</ul>,
              ol: ({ children }) => <ol className='doc-list-ol'>{children}</ol>,
              li: ({ children }) => <li className='doc-list-item-content'>{children}</li>,
              a: ({ href, children }) => (
                <a href={href} className='doc-link'>
                  {children}
                </a>
              ),
              blockquote: ({ children }) => <blockquote className='doc-blockquote'>{children}</blockquote>,
            }}
          >
            {selectedDocument.content}
          </ReactMarkdown>
        </div>
      </div>
    );
  };

  return (
    <div className='tech-documentation'>
      <div className='page-header'>
        <Title level={2} className='mb-2'>
          Technical Documentation
        </Title>
        <Paragraph className='text-lg text-secondary mb-6'>
          Access technical documentation for GoKwik products. Find API references, integration guides, and SDK
          documentation.
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={7}>
          <Card className='shadow-level2 mb-6' bordered={false}>
            <Search
              placeholder='Search documentation'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ marginBottom: 24 }}
              size='large'
              allowClear
              prefix={<SearchOutlined className='text-secondary' />}
            />

            <Divider orientation='left' className='mb-4'>
              <Space>
                <FilterOutlined />
                <span className='font-medium'>Filters</span>
              </Space>
            </Divider>

            <div className='mb-4'>
              <Text strong className='block mb-2'>
                Category
              </Text>
              <Select
                mode='multiple'
                placeholder='Filter by category'
                style={{ width: '100%' }}
                value={categoryFilter}
                onChange={setCategoryFilter}
                maxTagCount={3}
              >
                {allCategories.map((category) => (
                  <Option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Option>
                ))}
              </Select>
            </div>

            <div className='mb-4'>
              <Text strong className='block mb-2'>
                Type
              </Text>
              <Select
                mode='multiple'
                placeholder='Filter by type'
                style={{ width: '100%' }}
                value={typeFilter}
                onChange={setTypeFilter}
                maxTagCount={3}
              >
                {allTypes.map((type) => (
                  <Option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Option>
                ))}
              </Select>
            </div>

            <div className='mb-4'>
              <Text strong className='block mb-2'>
                Tags
              </Text>
              <Select
                mode='multiple'
                placeholder='Filter by tags'
                style={{ width: '100%' }}
                value={tagFilter}
                onChange={setTagFilter}
                maxTagCount={5}
              >
                {allTags.map((tag) => (
                  <Option key={tag} value={tag}>
                    {tag}
                  </Option>
                ))}
              </Select>
            </div>
          </Card>

          <Card
            title={
              <Space>
                <FolderOutlined />
                <span>Documentation Tree</span>
              </Space>
            }
            className='shadow-level2'
            bordered={false}
          >
            <DirectoryTree
              defaultExpandedKeys={expandedKeys}
              selectedKeys={selectedKeys}
              onSelect={handleTreeSelect}
              treeData={mockFileTree}
              className='custom-directory-tree'
              blockNode
            />
          </Card>
        </Col>

        <Col xs={24} lg={17}>
          <Card className='shadow-level2' bordered={false}>
            <Tabs activeKey={activeTab} onChange={setActiveTab} type='card' className='custom-tabs'>
              <TabPane tab='All Documents' key='1'>
                {filteredDocuments.length > 0 ? (
                  <List
                    itemLayout='horizontal'
                    dataSource={filteredDocuments}
                    className='doc-list'
                    renderItem={(doc) => (
                      <List.Item
                        className='doc-list-item hover-card'
                        actions={[
                          <Button
                            type='text'
                            icon={doc.isFavorite ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />}
                            onClick={() => toggleFavorite(doc.id)}
                            className='favorite-btn'
                          />,
                          <Button
                            type='primary'
                            size='small'
                            onClick={() => setSelectedDocument(doc)}
                            icon={<EyeOutlined />}
                          >
                            View
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<div className='doc-icon'>{getDocumentIcon(doc.type)}</div>}
                          title={
                            <div className='doc-title'>
                              <a onClick={() => setSelectedDocument(doc)} className='doc-link'>
                                {doc.title}
                              </a>
                              <Space className='ml-2'>
                                {getDocumentTypeTag(doc.type)}
                                {getDocumentCategoryTag(doc.category)}
                              </Space>
                            </div>
                          }
                          description={
                            <div className='doc-meta'>
                              <div className='doc-tags mb-1'>
                                <Space size={[0, 8]} wrap>
                                  {doc.tags.map((tag) => (
                                    <Tag key={tag} color='default' className='doc-tag'>
                                      {tag}
                                    </Tag>
                                  ))}
                                </Space>
                              </div>
                              <div>
                                <Text type='secondary' className='doc-date'>
                                  <InfoCircleOutlined className='mr-1' /> Last updated:{' '}
                                  {new Date(doc.lastUpdated).toLocaleDateString()}
                                </Text>
                              </div>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                ) : (
                  <Empty description='No documents found' />
                )}
              </TabPane>
              <TabPane tab='Favorites' key='2'>
                {filteredDocuments.filter((doc) => doc.isFavorite).length > 0 ? (
                  <List
                    itemLayout='horizontal'
                    dataSource={filteredDocuments.filter((doc) => doc.isFavorite)}
                    className='doc-list'
                    renderItem={(doc) => (
                      <List.Item
                        className='doc-list-item hover-card'
                        actions={[
                          <Button
                            type='text'
                            icon={<StarFilled style={{ color: '#faad14' }} />}
                            onClick={() => toggleFavorite(doc.id)}
                            className='favorite-btn'
                          />,
                          <Button
                            type='primary'
                            size='small'
                            onClick={() => setSelectedDocument(doc)}
                            icon={<EyeOutlined />}
                          >
                            View
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<div className='doc-icon'>{getDocumentIcon(doc.type)}</div>}
                          title={
                            <div className='doc-title'>
                              <a onClick={() => setSelectedDocument(doc)} className='doc-link'>
                                {doc.title}
                              </a>
                              <Space className='ml-2'>
                                {getDocumentTypeTag(doc.type)}
                                {getDocumentCategoryTag(doc.category)}
                              </Space>
                            </div>
                          }
                          description={
                            <div className='doc-meta'>
                              <div className='doc-tags mb-1'>
                                <Space size={[0, 8]} wrap>
                                  {doc.tags.map((tag) => (
                                    <Tag key={tag} color='default' className='doc-tag'>
                                      {tag}
                                    </Tag>
                                  ))}
                                </Space>
                              </div>
                              <div>
                                <Text type='secondary' className='doc-date'>
                                  <InfoCircleOutlined className='mr-1' /> Last updated:{' '}
                                  {new Date(doc.lastUpdated).toLocaleDateString()}
                                </Text>
                              </div>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                ) : (
                  <Empty description='No favorite documents' />
                )}
              </TabPane>
              <TabPane
                tab={
                  <Space>
                    <FileTextOutlined />
                    <span>Document Viewer</span>
                  </Space>
                }
                key='3'
              >
                <div className='document-viewer'>{renderDocumentContent()}</div>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TechDocumentation;
