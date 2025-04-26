import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Tabs,
  List,
  Tag,
  Space,
  Button,
  Row,
  Col,
  Input,
  Select,
  Divider,
  Avatar,
  Carousel,
  Image,
  Form,
  Alert,
  Modal,
  Radio,
  Spin,
  Result,
} from 'antd';
import {
  FileOutlined,
  DownloadOutlined,
  SearchOutlined,
  PlayCircleOutlined,
  ShopOutlined,
  AppstoreOutlined,
  TagOutlined,
  RocketOutlined,
  StarOutlined,
  StarFilled,
  RobotOutlined,
  BulbOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { useApp } from '../../context/AppContext';

// Import images
import Img1 from '../../images/Img_1.png';
import Img2 from '../../images/Img_2.png';
import Image18 from '../../images/image (18).png';
import Image19 from '../../images/image (19).png';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

// Mock playbook data
const mockPlaybooks = [
  {
    id: 'pb-1',
    title: 'Fashion Vertical Playbook',
    description: 'Complete guide to selling GoKwik solutions to fashion brands',
    type: 'presentation',
    vertical: 'fashion',
    product: 'all',
    thumbnail: Img1,
    url: 'https://example.com/fashion-playbook.pdf',
    downloadUrl: 'https://example.com/fashion-playbook.pdf',
    createdAt: '2025-03-15',
    updatedAt: '2025-04-10',
    author: 'GoKwik Sales Team',
    isFavorite: true,
    slides: [Img1, Image18, Image19],
  },
  {
    id: 'pb-2',
    title: 'Electronics Vertical Playbook',
    description: 'Strategies for selling to electronics and gadget brands',
    type: 'presentation',
    vertical: 'electronics',
    product: 'all',
    thumbnail: Img2,
    url: 'https://example.com/electronics-playbook.pdf',
    downloadUrl: 'https://example.com/electronics-playbook.pdf',
    createdAt: '2025-03-20',
    updatedAt: '2025-04-12',
    author: 'GoKwik Sales Team',
    isFavorite: false,
    slides: [Img2, Image19, Image18],
  },
  {
    id: 'pb-3',
    title: 'Checkout Product Demo',
    description: 'Step-by-step demo of GoKwik Checkout for client presentations',
    type: 'video',
    vertical: 'all',
    product: 'checkout',
    thumbnail: Image18,
    url: 'https://example.com/checkout-demo.mp4',
    downloadUrl: 'https://example.com/checkout-demo.mp4',
    createdAt: '2025-03-25',
    updatedAt: '2025-04-15',
    author: 'GoKwik Product Team',
    isFavorite: true,
    videoUrl: 'https://www.youtube.com/embed/-6Mm-yCDrAY?si=_N4KepqLH5n0J39u',
  },
  {
    id: 'pb-4',
    title: 'RTO Prime Sales Pitch',
    description: 'Compelling pitch for GoKwik RTO Prime solution',
    type: 'presentation',
    vertical: 'all',
    product: 'rto',
    thumbnail: Image19,
    url: 'https://example.com/rto-prime-pitch.pdf',
    downloadUrl: 'https://example.com/rto-prime-pitch.pdf',
    createdAt: '2025-04-01',
    updatedAt: '2025-04-18',
    author: 'GoKwik Sales Team',
    isFavorite: false,
    slides: [Image19, Img1, Img2],
  },
  {
    id: 'pb-5',
    title: 'Beauty Vertical Success Stories',
    description: 'Case studies of successful beauty brands using GoKwik',
    type: 'document',
    vertical: 'beauty',
    product: 'all',
    thumbnail: Img1,
    url: 'https://example.com/beauty-success-stories.pdf',
    downloadUrl: 'https://example.com/beauty-success-stories.pdf',
    createdAt: '2025-04-05',
    updatedAt: '2025-04-20',
    author: 'GoKwik Marketing Team',
    isFavorite: false,
  },
  {
    id: 'pb-6',
    title: 'Objection Handling Guide',
    description: 'How to address common client objections and concerns',
    type: 'document',
    vertical: 'all',
    product: 'all',
    thumbnail: Img2,
    url: 'https://example.com/objection-handling.pdf',
    downloadUrl: 'https://example.com/objection-handling.pdf',
    createdAt: '2025-04-10',
    updatedAt: '2025-04-22',
    author: 'GoKwik Sales Team',
    isFavorite: true,
  },
];

// Mock vertical data
const verticals = [
  { key: 'all', name: 'All Verticals' },
  { key: 'fashion', name: 'Fashion' },
  { key: 'electronics', name: 'Electronics' },
  { key: 'beauty', name: 'Beauty' },
  { key: 'home', name: 'Home & Furniture' },
  { key: 'food', name: 'Food & Grocery' },
];

// Mock product data
const products = [
  { key: 'all', name: 'All Products' },
  { key: 'checkout', name: 'Checkout' },
  { key: 'rto', name: 'Return Prime' },
  { key: 'engage', name: 'Engage' },
  { key: 'twidpay', name: 'TwidPay' },
  { key: 'upi_express', name: 'UPI Express' },
];

// Mock customer types
const customerTypes = [
  { key: 'all', name: 'All Customer Types' },
  { key: 'cod_heavy', name: 'COD Heavy (>60% orders)' },
  { key: 'high_rto', name: 'High RTO (>15% returns)' },
  { key: 'low_conversion', name: 'Low Conversion Rate' },
  { key: 'standard', name: 'Standard' },
];

// AI product recommendations based on brand category and customer type
const getAIRecommendations = (vertical: string, customerType: string) => {
  // In a real app, this would call an AI service
  // For now, we'll use predefined recommendations

  const recommendations = {
    fashion: {
      cod_heavy: {
        primary: ['checkout', 'twidpay'],
        secondary: ['rto'],
        reasoning:
          'Fashion brands with high COD rates benefit most from Checkout + TwidPay to reduce cart abandonment and improve payment success rates.',
      },
      high_rto: {
        primary: ['rto', 'checkout'],
        secondary: ['engage'],
        reasoning:
          'Fashion brands with high return rates need RTO Prime to predict and prevent returns, combined with Checkout for address verification.',
      },
      low_conversion: {
        primary: ['checkout', 'engage'],
        secondary: ['twidpay'],
        reasoning:
          'Fashion brands with low conversion rates need Checkout to streamline the purchase process and Engage to recover abandoned carts.',
      },
      standard: {
        primary: ['checkout'],
        secondary: ['engage', 'rto'],
        reasoning:
          'Standard fashion brands benefit from Checkout as a baseline solution, with Engage and RTO Prime as value-adds.',
      },
    },
    electronics: {
      cod_heavy: {
        primary: ['twidpay', 'checkout'],
        secondary: ['upi_express'],
        reasoning:
          'Electronics brands with high COD rates need TwidPay to improve payment success and Checkout for a seamless experience.',
      },
      high_rto: {
        primary: ['rto'],
        secondary: ['checkout'],
        reasoning:
          'Electronics brands with high return rates need RTO Prime to predict and prevent returns, saving significant costs.',
      },
      low_conversion: {
        primary: ['checkout', 'upi_express'],
        secondary: ['engage'],
        reasoning:
          'Electronics brands with low conversion need Checkout and UPI Express to simplify the payment process.',
      },
      standard: {
        primary: ['checkout', 'upi_express'],
        secondary: ['engage'],
        reasoning:
          'Standard electronics brands benefit from Checkout and UPI Express to provide multiple payment options.',
      },
    },
    beauty: {
      cod_heavy: {
        primary: ['twidpay', 'checkout'],
        secondary: ['engage'],
        reasoning:
          'Beauty brands with high COD rates need TwidPay to improve payment success and Checkout for a seamless experience.',
      },
      high_rto: {
        primary: ['rto', 'engage'],
        secondary: ['checkout'],
        reasoning:
          'Beauty brands with high return rates need RTO Prime to predict returns and Engage to build customer loyalty.',
      },
      low_conversion: {
        primary: ['checkout', 'engage'],
        secondary: ['twidpay'],
        reasoning:
          'Beauty brands with low conversion need Checkout and Engage to improve the purchase experience and recover abandoned carts.',
      },
      standard: {
        primary: ['checkout', 'engage'],
        secondary: ['rto'],
        reasoning:
          'Standard beauty brands benefit from Checkout and Engage to provide a seamless experience and build customer loyalty.',
      },
    },
    all: {
      cod_heavy: {
        primary: ['twidpay', 'checkout'],
        secondary: ['upi_express'],
        reasoning:
          'Brands with high COD rates need TwidPay to improve payment success and Checkout for a seamless experience.',
      },
      high_rto: {
        primary: ['rto', 'checkout'],
        secondary: ['engage'],
        reasoning:
          'Brands with high return rates need RTO Prime to predict and prevent returns, combined with Checkout for address verification.',
      },
      low_conversion: {
        primary: ['checkout', 'engage'],
        secondary: ['twidpay'],
        reasoning:
          'Brands with low conversion rates need Checkout to streamline the purchase process and Engage to recover abandoned carts.',
      },
      standard: {
        primary: ['checkout'],
        secondary: ['engage', 'rto'],
        reasoning:
          'Standard brands benefit from Checkout as a baseline solution, with Engage and RTO Prime as value-adds.',
      },
    },
  };

  // Default to 'all' if the vertical or customer type is not found
  const verticalRecs = recommendations[vertical as keyof typeof recommendations] || recommendations.all;
  const typeRecs = verticalRecs[customerType as keyof typeof verticalRecs] || verticalRecs.standard;

  return typeRecs;
};

const GTMPlaybooks: React.FC = () => {
  const {} = useApp(); // Context is imported but not currently used
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [verticalFilter, setVerticalFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [playbooks, setPlaybooks] = useState(mockPlaybooks);
  const [selectedPlaybook, setSelectedPlaybook] = useState<any>(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  // AI Product Fit Intelligence
  const [productFitModalVisible, setProductFitModalVisible] = useState(false);
  const [brandVertical, setBrandVertical] = useState('fashion');
  const [customerType, setCustomerType] = useState('standard');
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [form] = Form.useForm();

  // Filter playbooks based on search and filters
  const filteredPlaybooks = playbooks.filter((playbook) => {
    const matchesSearch =
      searchText === '' ||
      playbook.title.toLowerCase().includes(searchText.toLowerCase()) ||
      playbook.description.toLowerCase().includes(searchText.toLowerCase());

    const matchesVertical =
      verticalFilter === 'all' || playbook.vertical === verticalFilter || playbook.vertical === 'all';
    const matchesProduct = productFilter === 'all' || playbook.product === productFilter || playbook.product === 'all';
    const matchesType = typeFilter === 'all' || playbook.type === typeFilter;

    return matchesSearch && matchesVertical && matchesProduct && matchesType;
  });

  // Get playbooks by tab
  const getPlaybooksByTab = (tab: string) => {
    if (tab === 'all') {
      return filteredPlaybooks;
    } else if (tab === 'favorites') {
      return filteredPlaybooks.filter((playbook) => playbook.isFavorite);
    } else {
      return filteredPlaybooks.filter((playbook) => playbook.type === tab);
    }
  };

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setPlaybooks(
      playbooks.map((playbook) => (playbook.id === id ? { ...playbook, isFavorite: !playbook.isFavorite } : playbook)),
    );
  };

  // Handle playbook preview
  const handlePreview = (playbook: any) => {
    setSelectedPlaybook(playbook);
    setPreviewVisible(true);
  };

  // Get playbook type icon
  const getPlaybookTypeIcon = (type: string) => {
    switch (type) {
      case 'presentation':
        return <FileOutlined style={{ fontSize: 24, color: '#1890ff' }} />;
      case 'video':
        return <PlayCircleOutlined style={{ fontSize: 24, color: '#ff4d4f' }} />;
      case 'document':
        return <FileOutlined style={{ fontSize: 24, color: '#52c41a' }} />;
      default:
        return <FileOutlined style={{ fontSize: 24, color: '#faad14' }} />;
    }
  };

  // Get playbook type tag
  const getPlaybookTypeTag = (type: string) => {
    switch (type) {
      case 'presentation':
        return <Tag color='blue'>Presentation</Tag>;
      case 'video':
        return <Tag color='red'>Video</Tag>;
      case 'document':
        return <Tag color='green'>Document</Tag>;
      default:
        return <Tag>Unknown</Tag>;
    }
  };

  // Generate AI product recommendations
  const generateRecommendations = async () => {
    setLoadingRecommendations(true);

    try {
      // In a real app, this would call an AI service via API
      // For now, we'll use our predefined recommendations
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      const recs = getAIRecommendations(brandVertical, customerType);
      setRecommendations(recs);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  // Get product name from key
  const getProductName = (key: string) => {
    const product = products.find((p) => p.key === key);
    return product ? product.name : key;
  };

  // Render playbook preview
  const renderPlaybookPreview = () => {
    if (!selectedPlaybook) return null;

    return (
      <div style={{ padding: 24 }}>
        <Title level={3}>{selectedPlaybook.title}</Title>
        <Space style={{ marginBottom: 16 }}>
          {getPlaybookTypeTag(selectedPlaybook.type)}
          <Tag color='blue'>{verticals.find((v) => v.key === selectedPlaybook.vertical)?.name}</Tag>
          <Tag color='purple'>{products.find((p) => p.key === selectedPlaybook.product)?.name}</Tag>
        </Space>
        <Paragraph>{selectedPlaybook.description}</Paragraph>

        <Divider />

        {selectedPlaybook.type === 'video' ? (
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <iframe
              width='100%'
              height='400'
              src={selectedPlaybook.videoUrl}
              title={selectedPlaybook.title}
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        ) : selectedPlaybook.slides ? (
          <div style={{ marginBottom: 24 }}>
            <Carousel autoplay>
              {selectedPlaybook.slides.map((slide: string, index: number) => (
                <div key={index}>
                  <Image src={slide} alt={`Slide ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <img
              src={selectedPlaybook.thumbnail}
              alt={selectedPlaybook.title}
              style={{ maxWidth: '100%', maxHeight: 400 }}
            />
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <Button type='primary' icon={<DownloadOutlined />} href={selectedPlaybook.downloadUrl} target='_blank'>
            Download
          </Button>
        </div>

        <Divider />

        <Row>
          <Col span={12}>
            <Text type='secondary'>Created by: {selectedPlaybook.author}</Text>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Text type='secondary'>Last updated: {new Date(selectedPlaybook.updatedAt).toLocaleDateString()}</Text>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div>
      <Title level={2}>GTM Playbooks</Title>
      <Row gutter={[24, 24]} align='middle' style={{ marginBottom: 24 }}>
        <Col xs={24} md={16}>
          <Paragraph style={{ fontSize: 16, marginBottom: 0 }}>
            Access sales and marketing materials to help you pitch GoKwik products to potential clients. These resources
            include presentations, videos, and documents tailored for different verticals and products.
          </Paragraph>
        </Col>
        <Col xs={24} md={8}>
          <img
            src={Image19}
            alt='GTM Playbooks'
            style={{
              width: '100%',
              maxHeight: 120,
              objectFit: 'contain',
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />
        </Col>
      </Row>

      {/* Product Fit Intelligence Card */}
      <Card
        style={{ marginBottom: 24 }}
        title={
          <Space>
            <RobotOutlined />
            <span>AI Product Fit Intelligence</span>
          </Space>
        }
        extra={
          <Button type='primary' icon={<BulbOutlined />} onClick={() => setProductFitModalVisible(true)}>
            Get Product Recommendations
          </Button>
        }
      >
        <Paragraph>
          Our AI-powered Product Fit Intelligence analyzes brand category and customer behavior patterns to recommend
          the optimal GoKwik product bundle. Get personalized recommendations based on your merchant's specific needs.
        </Paragraph>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card bordered={false} style={{ background: '#f0f5ff' }}>
              <Space direction='vertical'>
                <Space>
                  <ShopOutlined style={{ color: '#1890ff', fontSize: 20 }} />
                  <Text strong>Brand Category</Text>
                </Space>
                <Text>Fashion, Electronics, Beauty, etc.</Text>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false} style={{ background: '#f6ffed' }}>
              <Space direction='vertical'>
                <Space>
                  <TagOutlined style={{ color: '#52c41a', fontSize: 20 }} />
                  <Text strong>Customer Type</Text>
                </Space>
                <Text>COD Heavy, High RTO, Low Conversion, etc.</Text>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false} style={{ background: '#fff2e8' }}>
              <Space direction='vertical'>
                <Space>
                  <RocketOutlined style={{ color: '#fa8c16', fontSize: 20 }} />
                  <Text strong>AI Recommendation</Text>
                </Space>
                <Text>Personalized product bundle with reasoning</Text>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Search and Filters */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Search
              placeholder='Search playbooks'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} md={16}>
            <Space wrap>
              <Select placeholder='Vertical' style={{ width: 150 }} value={verticalFilter} onChange={setVerticalFilter}>
                {verticals.map((vertical) => (
                  <Option key={vertical.key} value={vertical.key}>
                    {vertical.name}
                  </Option>
                ))}
              </Select>

              <Select placeholder='Product' style={{ width: 150 }} value={productFilter} onChange={setProductFilter}>
                {products.map((product) => (
                  <Option key={product.key} value={product.key}>
                    {product.name}
                  </Option>
                ))}
              </Select>

              <Select placeholder='Type' style={{ width: 150 }} value={typeFilter} onChange={setTypeFilter}>
                <Option value='all'>All Types</Option>
                <Option value='presentation'>Presentations</Option>
                <Option value='video'>Videos</Option>
                <Option value='document'>Documents</Option>
              </Select>
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={24}>
        <Col xs={24} lg={previewVisible ? 12 : 24}>
          <Card>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab='All Playbooks' key='all'>
                <List
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: previewVisible ? 2 : 3, xl: previewVisible ? 2 : 4 }}
                  dataSource={getPlaybooksByTab('all')}
                  renderItem={(playbook) => (
                    <List.Item>
                      <Card
                        hoverable
                        cover={
                          <div style={{ height: 150, overflow: 'hidden' }}>
                            <img
                              alt={playbook.title}
                              src={playbook.thumbnail}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        }
                        actions={[
                          <Button
                            type='text'
                            icon={playbook.isFavorite ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />}
                            onClick={() => toggleFavorite(playbook.id)}
                          />,
                          <Button
                            type='text'
                            icon={<DownloadOutlined />}
                            href={playbook.downloadUrl}
                            target='_blank'
                          />,
                          <Button type='text' icon={<SearchOutlined />} onClick={() => handlePreview(playbook)} />,
                        ]}
                      >
                        <Card.Meta
                          avatar={getPlaybookTypeIcon(playbook.type)}
                          title={playbook.title}
                          description={
                            <div>
                              <Paragraph ellipsis={{ rows: 2 }}>{playbook.description}</Paragraph>
                              <Space>
                                {getPlaybookTypeTag(playbook.type)}
                                <Tag color='blue'>{verticals.find((v) => v.key === playbook.vertical)?.name}</Tag>
                              </Space>
                            </div>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab='Presentations' key='presentation'>
                <List
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: previewVisible ? 2 : 3, xl: previewVisible ? 2 : 4 }}
                  dataSource={getPlaybooksByTab('presentation')}
                  renderItem={(playbook) => (
                    <List.Item>
                      <Card
                        hoverable
                        cover={
                          <div style={{ height: 150, overflow: 'hidden' }}>
                            <img
                              alt={playbook.title}
                              src={playbook.thumbnail}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        }
                        actions={[
                          <Button
                            type='text'
                            icon={playbook.isFavorite ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />}
                            onClick={() => toggleFavorite(playbook.id)}
                          />,
                          <Button
                            type='text'
                            icon={<DownloadOutlined />}
                            href={playbook.downloadUrl}
                            target='_blank'
                          />,
                          <Button type='text' icon={<SearchOutlined />} onClick={() => handlePreview(playbook)} />,
                        ]}
                      >
                        <Card.Meta
                          avatar={getPlaybookTypeIcon(playbook.type)}
                          title={playbook.title}
                          description={
                            <div>
                              <Paragraph ellipsis={{ rows: 2 }}>{playbook.description}</Paragraph>
                              <Space>
                                <Tag color='blue'>{verticals.find((v) => v.key === playbook.vertical)?.name}</Tag>
                              </Space>
                            </div>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab='Videos' key='video'>
                <Row gutter={[16, 16]}>
                  {getPlaybooksByTab('video').map((playbook) => (
                    <Col xs={24} md={12} key={playbook.id}>
                      <Card
                        hoverable
                        title={playbook.title}
                        extra={
                          <Button
                            type='text'
                            icon={playbook.isFavorite ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />}
                            onClick={() => toggleFavorite(playbook.id)}
                          />
                        }
                      >
                        <div style={{ marginBottom: 16 }}>
                          <iframe
                            width='100%'
                            height='250'
                            src={playbook.videoUrl}
                            title={playbook.title}
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                          ></iframe>
                        </div>
                        <Paragraph
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            marginBottom: 16,
                          }}
                        >
                          {playbook.description}
                        </Paragraph>
                        <Space>
                          <Tag color='red'>Video</Tag>
                          <Tag color='blue'>{verticals.find((v) => v.key === playbook.vertical)?.name}</Tag>
                          <Tag color='purple'>{products.find((p) => p.key === playbook.product)?.name}</Tag>
                        </Space>
                      </Card>
                    </Col>
                  ))}

                  {/* Additional embedded videos */}
                  <Col xs={24} md={12}>
                    <Card
                      hoverable
                      title='Product Demo: UPI Express'
                      extra={<Button type='text' icon={<StarOutlined />} />}
                    >
                      <div style={{ marginBottom: 16 }}>
                        <iframe
                          width='100%'
                          height='250'
                          src='https://www.youtube.com/embed/aV8lZ21g6EM?si=Y5VBjDVHvu_1C_hK'
                          title='UPI Express Demo'
                          frameBorder='0'
                          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                          allowFullScreen
                        ></iframe>
                      </div>
                      <Paragraph
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          marginBottom: 16,
                        }}
                      >
                        Comprehensive demo of GoKwik's UPI Express solution for faster payments
                      </Paragraph>
                      <Space>
                        <Tag color='red'>Video</Tag>
                        <Tag color='blue'>All Verticals</Tag>
                        <Tag color='purple'>UPI Express</Tag>
                      </Space>
                    </Card>
                  </Col>

                  <Col xs={24} md={12}>
                    <Card
                      hoverable
                      title='Success Story: Fashion Brand'
                      extra={<Button type='text' icon={<StarOutlined />} />}
                    >
                      <div style={{ marginBottom: 16 }}>
                        <iframe
                          width='100%'
                          height='250'
                          src='https://www.youtube.com/embed/oojthLgRMmo?si=tOIEAmsc2tqk-wvT'
                          title='Fashion Brand Success Story'
                          frameBorder='0'
                          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                          allowFullScreen
                        ></iframe>
                      </div>
                      <Paragraph
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          marginBottom: 16,
                        }}
                      >
                        How a leading fashion brand increased conversions by 35% with GoKwik
                      </Paragraph>
                      <Space>
                        <Tag color='red'>Video</Tag>
                        <Tag color='blue'>Fashion</Tag>
                        <Tag color='purple'>Checkout</Tag>
                      </Space>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab='Documents' key='document'>
                <List
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: previewVisible ? 2 : 3, xl: previewVisible ? 2 : 4 }}
                  dataSource={getPlaybooksByTab('document')}
                  renderItem={(playbook) => (
                    <List.Item>
                      <Card
                        hoverable
                        cover={
                          <div style={{ height: 150, overflow: 'hidden' }}>
                            <img
                              alt={playbook.title}
                              src={playbook.thumbnail}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        }
                        actions={[
                          <Button
                            type='text'
                            icon={playbook.isFavorite ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />}
                            onClick={() => toggleFavorite(playbook.id)}
                          />,
                          <Button
                            type='text'
                            icon={<DownloadOutlined />}
                            href={playbook.downloadUrl}
                            target='_blank'
                          />,
                          <Button type='text' icon={<SearchOutlined />} onClick={() => handlePreview(playbook)} />,
                        ]}
                      >
                        <Card.Meta
                          avatar={getPlaybookTypeIcon(playbook.type)}
                          title={playbook.title}
                          description={
                            <div>
                              <Paragraph ellipsis={{ rows: 2 }}>{playbook.description}</Paragraph>
                              <Space>
                                <Tag color='green'>Document</Tag>
                                <Tag color='blue'>{verticals.find((v) => v.key === playbook.vertical)?.name}</Tag>
                              </Space>
                            </div>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab='Favorites' key='favorites'>
                <List
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: previewVisible ? 2 : 3, xl: previewVisible ? 2 : 4 }}
                  dataSource={getPlaybooksByTab('favorites')}
                  renderItem={(playbook) => (
                    <List.Item>
                      <Card
                        hoverable
                        cover={
                          <div style={{ height: 150, overflow: 'hidden' }}>
                            <img
                              alt={playbook.title}
                              src={playbook.thumbnail}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        }
                        actions={[
                          <Button
                            type='text'
                            icon={<StarFilled style={{ color: '#faad14' }} />}
                            onClick={() => toggleFavorite(playbook.id)}
                          />,
                          <Button
                            type='text'
                            icon={<DownloadOutlined />}
                            href={playbook.downloadUrl}
                            target='_blank'
                          />,
                          <Button type='text' icon={<SearchOutlined />} onClick={() => handlePreview(playbook)} />,
                        ]}
                      >
                        <Card.Meta
                          avatar={getPlaybookTypeIcon(playbook.type)}
                          title={playbook.title}
                          description={
                            <div>
                              <Paragraph ellipsis={{ rows: 2 }}>{playbook.description}</Paragraph>
                              <Space>
                                {getPlaybookTypeTag(playbook.type)}
                                <Tag color='blue'>{verticals.find((v) => v.key === playbook.vertical)?.name}</Tag>
                              </Space>
                            </div>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>

        {previewVisible && (
          <Col xs={24} lg={12}>
            <Card
              title='Playbook Preview'
              extra={
                <Button type='text' onClick={() => setPreviewVisible(false)}>
                  Close
                </Button>
              }
              style={{ marginBottom: 24 }}
            >
              {renderPlaybookPreview()}
            </Card>
          </Col>
        )}
      </Row>

      {/* Product Fit Intelligence Modal */}
      <Modal
        title={
          <Space>
            <RobotOutlined />
            <span>AI Product Fit Intelligence</span>
          </Space>
        }
        open={productFitModalVisible}
        onCancel={() => setProductFitModalVisible(false)}
        footer={null}
        width={700}
      >
        <Form layout='vertical' form={form}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label='Brand Category' required>
                <Select value={brandVertical} onChange={setBrandVertical} style={{ width: '100%' }}>
                  {verticals
                    .filter((v) => v.key !== 'all')
                    .map((vertical) => (
                      <Option key={vertical.key} value={vertical.key}>
                        {vertical.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='Customer Type' required>
                <Select value={customerType} onChange={setCustomerType} style={{ width: '100%' }}>
                  {customerTypes
                    .filter((t) => t.key !== 'all')
                    .map((type) => (
                      <Option key={type.key} value={type.key}>
                        {type.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Button
              type='primary'
              icon={<RobotOutlined />}
              onClick={generateRecommendations}
              loading={loadingRecommendations}
              size='large'
            >
              Generate AI Recommendations
            </Button>
          </div>
        </Form>

        {loadingRecommendations && (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <Spin size='large' />
            <div style={{ marginTop: 16 }}>
              <Text>Analyzing brand category and customer type...</Text>
            </div>
          </div>
        )}

        {!loadingRecommendations && recommendations && (
          <div>
            <Alert
              message='AI-Powered Product Recommendation'
              description={recommendations.reasoning}
              type='info'
              showIcon
              icon={<RobotOutlined />}
              style={{ marginBottom: 24 }}
            />

            <Card title='Recommended Product Bundle' bordered={false} style={{ marginBottom: 24 }}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card title='Primary Products' bordered={false} style={{ background: '#f6ffed' }}>
                    <ul style={{ paddingLeft: 20 }}>
                      {recommendations.primary.map((product: string) => (
                        <li key={product}>
                          <Space>
                            <CheckCircleOutlined style={{ color: '#52c41a' }} />
                            <Text strong>{getProductName(product)}</Text>
                          </Space>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title='Secondary Products' bordered={false} style={{ background: '#f0f5ff' }}>
                    <ul style={{ paddingLeft: 20 }}>
                      {recommendations.secondary.map((product: string) => (
                        <li key={product}>
                          <Space>
                            <InfoCircleOutlined style={{ color: '#1890ff' }} />
                            <Text>{getProductName(product)}</Text>
                          </Space>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Col>
              </Row>
            </Card>

            <div style={{ textAlign: 'center' }}>
              <Button type='primary' onClick={() => setProductFitModalVisible(false)}>
                Got It
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default GTMPlaybooks;
