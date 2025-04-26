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
  Empty,
  Divider,
  Avatar,
  Progress,
} from 'antd';
import {
  FileOutlined,
  VideoCameraOutlined,
  SearchOutlined,
  StarOutlined,
  StarFilled,
  LikeOutlined,
  MessageOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  BookOutlined,
  TrophyOutlined,
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

// Mock learning content data
const allLearningContent = [
  {
    id: '1',
    title: 'How to Pitch GoKwik Checkout',
    type: 'article',
    category: 'sales',
    vertical: 'all',
    product: 'checkout',
    level: 'beginner',
    duration: '5 min read',
    author: 'Sales Team',
    date: '2025-03-15',
    thumbnail: Img1,
    description:
      'Learn the key selling points of GoKwik Checkout and how to effectively pitch it to potential clients.',
    content: 'This comprehensive guide covers everything you need to know about pitching GoKwik Checkout...',
    tags: ['checkout', 'sales', 'pitch'],
    views: 245,
    likes: 42,
    isFavorite: false,
    isCompleted: false,
    progress: 0,
  },
  {
    id: '2',
    title: 'Understanding RTO Prime for Fashion',
    type: 'video',
    category: 'product',
    vertical: 'fashion',
    product: 'rto',
    level: 'intermediate',
    duration: '8 min video',
    author: 'Product Team',
    date: '2025-03-22',
    thumbnail: Img2,
    description: 'Deep dive into GoKwik RTO Prime and how it specifically benefits fashion brands.',
    content:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/QRBi46yYwIE?si=E0URBCTUaUpNhApi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    tags: ['rto', 'fashion', 'returns'],
    views: 189,
    likes: 37,
    isFavorite: true,
    isCompleted: false,
    progress: 60,
  },
  {
    id: '3',
    title: 'Commission Structure Explained',
    type: 'article',
    category: 'finance',
    vertical: 'all',
    product: 'all',
    level: 'beginner',
    duration: '3 min read',
    author: 'Finance Team',
    date: '2025-04-05',
    thumbnail: Image18,
    description: 'A clear explanation of how commissions are calculated and paid out.',
    content: 'This guide explains how commissions are calculated based on GMV, product type, and partner tier...',
    tags: ['commission', 'earnings', 'finance'],
    views: 312,
    likes: 56,
    isFavorite: false,
    isCompleted: true,
    progress: 100,
  },
  {
    id: '4',
    title: 'Case Study: How FashionBrand Reduced RTO by 40%',
    type: 'case-study',
    category: 'success-story',
    vertical: 'fashion',
    product: 'rto',
    level: 'intermediate',
    duration: '10 min read',
    author: 'Success Team',
    date: '2025-04-10',
    thumbnail: Image19,
    description: 'Learn how a leading fashion brand significantly reduced their RTO rates using GoKwik.',
    content:
      'This case study explores how FashionBrand implemented GoKwik RTO Prime and achieved remarkable results...',
    tags: ['case-study', 'fashion', 'rto', 'success'],
    views: 178,
    likes: 34,
    isFavorite: false,
    isCompleted: false,
    progress: 25,
  },
  {
    id: '5',
    title: 'Mastering the GoKwik Dashboard',
    type: 'video',
    category: 'tutorial',
    vertical: 'all',
    product: 'all',
    level: 'beginner',
    duration: '12 min video',
    author: 'Product Team',
    date: '2025-04-15',
    thumbnail: Img1,
    description: 'A step-by-step tutorial on using the GoKwik dashboard effectively.',
    content:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/6GMECip67NM?si=11u-qRsC_5zlZHeB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    tags: ['tutorial', 'dashboard', 'analytics'],
    views: 203,
    likes: 45,
    isFavorite: false,
    isCompleted: false,
    progress: 0,
  },
  {
    id: '6',
    title: 'Objection Handling: Common Client Concerns',
    type: 'article',
    category: 'sales',
    vertical: 'all',
    product: 'all',
    level: 'advanced',
    duration: '7 min read',
    author: 'Sales Team',
    date: '2025-04-18',
    thumbnail: Img2,
    description: 'Learn how to address common objections and concerns raised by potential clients.',
    content:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/bE14pVYWgps?si=HvO1LKC29s1nUdln" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    tags: ['sales', 'objections', 'pitch'],
    views: 156,
    likes: 28,
    isFavorite: false,
    isCompleted: false,
    progress: 0,
  },
];

// Learning paths
const learningPaths = [
  {
    id: 'path-1',
    title: 'New Partner Onboarding',
    description: 'Essential knowledge for new partners to get started with GoKwik',
    level: 'beginner',
    duration: '1 hour',
    progress: 40,
    modules: [
      { id: '1', title: 'How to Pitch GoKwik Checkout', isCompleted: true },
      { id: '3', title: 'Commission Structure Explained', isCompleted: true },
      { id: '5', title: 'Mastering the GoKwik Dashboard', isCompleted: false },
    ],
  },
  {
    id: 'path-2',
    title: 'Fashion Vertical Specialist',
    description: 'Become an expert in serving fashion brands with GoKwik solutions',
    level: 'intermediate',
    duration: '2 hours',
    progress: 25,
    modules: [
      { id: '2', title: 'Understanding RTO Prime for Fashion', isCompleted: true },
      { id: '4', title: 'Case Study: How FashionBrand Reduced RTO by 40%', isCompleted: false },
      { id: '6', title: 'Objection Handling: Common Client Concerns', isCompleted: false },
    ],
  },
];

const LearningHub: React.FC = () => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('1');
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [learningContent, setLearningContent] = useState(allLearningContent);

  // Filter learning content based on search and filters
  useEffect(() => {
    let filtered = allLearningContent;

    // Apply search filter
    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerSearchText) ||
          item.description.toLowerCase().includes(lowerSearchText) ||
          item.tags.some((tag) => tag.toLowerCase().includes(lowerSearchText)),
      );
    }

    // Apply category filter
    if (categoryFilter.length > 0) {
      filtered = filtered.filter((item) => categoryFilter.includes(item.category));
    }

    setLearningContent(filtered);
  }, [searchText, categoryFilter]);

  // Handle favorite toggle
  const handleToggleFavorite = (id: string) => {
    setLearningContent((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item)),
    );
  };

  // Get icon based on content type
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <VideoCameraOutlined style={{ fontSize: 24, color: '#1890ff' }} />;
      case 'article':
        return <FileOutlined style={{ fontSize: 24, color: '#1890ff' }} />;
      case 'case-study':
        return <BookOutlined style={{ fontSize: 24, color: '#1890ff' }} />;
      case 'webinar':
        return <PlayCircleOutlined style={{ fontSize: 24, color: '#1890ff' }} />;
      default:
        return <FileOutlined style={{ fontSize: 24, color: '#1890ff' }} />;
    }
  };

  // Get level color
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'green';
      case 'intermediate':
        return 'blue';
      case 'advanced':
        return 'purple';
      default:
        return 'default';
    }
  };

  // Render recommended content
  const renderRecommendedContent = () => {
    // In a real app, this would be based on user behavior and preferences
    const recommended = allLearningContent.slice(0, 3);

    return (
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
        dataSource={recommended}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              cover={
                <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                  {item.type === 'video' ? (
                    <div style={{ width: '100%', height: '100%' }} dangerouslySetInnerHTML={{ __html: item.content }} />
                  ) : (
                    <img
                      alt={item.title}
                      src={item.thumbnail}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                  {item.progress > 0 && item.progress < 100 && (
                    <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                      <Progress percent={item.progress} showInfo={false} size='small' />
                    </div>
                  )}
                  {item.isCompleted && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        background: '#52c41a',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: 4,
                      }}
                    >
                      Completed
                    </div>
                  )}
                </div>
              }
              actions={[
                <Button
                  type='text'
                  icon={item.isFavorite ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />}
                  onClick={() => handleToggleFavorite(item.id)}
                />,
                <Button type='text' icon={<EyeOutlined />} />,
                <Button type='text' icon={<MessageOutlined />} />,
              ]}
            >
              <div style={{ height: 120 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  {getContentTypeIcon(item.type)}
                  <Tag color={getLevelColor(item.level)} style={{ marginLeft: 8 }}>
                    {item.level}
                  </Tag>
                </div>
                <Title
                  level={5}
                  style={{
                    marginBottom: 8,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.title}
                </Title>
                <Text
                  type='secondary'
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.description}
                </Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <Text type='secondary'>{item.duration}</Text>
                <Space>
                  <Text type='secondary'>
                    <EyeOutlined /> {item.views}
                  </Text>
                  <Text type='secondary'>
                    <LikeOutlined /> {item.likes}
                  </Text>
                </Space>
              </div>
            </Card>
          </List.Item>
        )}
      />
    );
  };

  // Render learning paths
  const renderLearningPaths = () => {
    return (
      <List
        grid={{ gutter: 16, xs: 1, sm: 1, md: 2 }}
        dataSource={learningPaths}
        renderItem={(path) => (
          <List.Item>
            <Card hoverable>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <Avatar
                  size={64}
                  icon={<TrophyOutlined />}
                  style={{ backgroundColor: getLevelColor(path.level), marginRight: 16 }}
                />
                <div>
                  <Title level={4} style={{ marginBottom: 4 }}>
                    {path.title}
                  </Title>
                  <Space>
                    <Tag color={getLevelColor(path.level)}>{path.level}</Tag>
                    <Text type='secondary'>{path.duration}</Text>
                    <Text type='secondary'>{path.modules.length} modules</Text>
                  </Space>
                </div>
              </div>
              <Paragraph
                style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
              >
                {path.description}
              </Paragraph>
              <Progress percent={path.progress} status='active' />
              <Divider style={{ margin: '12px 0' }} />
              <List
                size='small'
                dataSource={path.modules}
                renderItem={(module) => (
                  <List.Item>
                    <Space>
                      {module.isCompleted ? (
                        <div style={{ color: '#52c41a' }}>✓</div>
                      ) : (
                        <div style={{ width: 14, height: 14, borderRadius: 7, border: '1px solid #d9d9d9' }} />
                      )}
                      <Text>{module.title}</Text>
                    </Space>
                  </List.Item>
                )}
              />
              <Button type='primary' block style={{ marginTop: 16 }}>
                {path.progress > 0 ? 'Continue Learning' : 'Start Learning'}
              </Button>
            </Card>
          </List.Item>
        )}
      />
    );
  };

  // Render all content with filters
  const renderAllContent = () => {
    return (
      <>
        <div style={{ marginBottom: 24 }}>
          <Row gutter={[16, 16]} align='middle'>
            <Col xs={24} md={8}>
              <Search
                placeholder='Search learning content'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={24} md={16}>
              <Space wrap>
                <Select
                  mode='multiple'
                  placeholder='Category'
                  style={{ minWidth: 120 }}
                  value={categoryFilter}
                  onChange={setCategoryFilter}
                >
                  <Option value='sales'>Sales</Option>
                  <Option value='product'>Product</Option>
                  <Option value='finance'>Finance</Option>
                  <Option value='success-story'>Success Story</Option>
                  <Option value='tutorial'>Tutorial</Option>
                </Select>
              </Space>
            </Col>
          </Row>
        </div>

        {learningContent.length > 0 ? (
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
            dataSource={learningContent}
            pagination={{
              pageSize: 9,
              showSizeChanger: false,
            }}
            renderItem={(item) => (
              <List.Item>
                <Card
                  hoverable
                  cover={
                    <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                      {item.type === 'video' ? (
                        <div
                          style={{ width: '100%', height: '100%' }}
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                      ) : (
                        <img
                          alt={item.title}
                          src={item.thumbnail}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      )}
                      {item.progress > 0 && item.progress < 100 && (
                        <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                          <Progress percent={item.progress} showInfo={false} size='small' />
                        </div>
                      )}
                      {item.isCompleted && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            background: '#52c41a',
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: 4,
                          }}
                        >
                          Completed
                        </div>
                      )}
                    </div>
                  }
                  actions={[
                    <Button
                      type='text'
                      icon={item.isFavorite ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />}
                      onClick={() => handleToggleFavorite(item.id)}
                    />,
                    <Button type='text' icon={<EyeOutlined />} />,
                    <Button type='text' icon={<MessageOutlined />} />,
                  ]}
                >
                  <div style={{ height: 120 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                      {getContentTypeIcon(item.type)}
                      <Tag color={getLevelColor(item.level)} style={{ marginLeft: 8 }}>
                        {item.level}
                      </Tag>
                    </div>
                    <Title
                      level={5}
                      style={{
                        marginBottom: 8,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.title}
                    </Title>
                    <Text
                      type='secondary'
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.description}
                    </Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <Text type='secondary'>{item.duration}</Text>
                    <Space>
                      <Text type='secondary'>
                        <EyeOutlined /> {item.views}
                      </Text>
                      <Text type='secondary'>
                        <LikeOutlined /> {item.likes}
                      </Text>
                    </Space>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <Empty description='No learning content found matching your filters' />
        )}
      </>
    );
  };

  return (
    <div>
      <Title level={2}>Learning Hub</Title>
      <Row gutter={[24, 24]} align='middle' style={{ marginBottom: 24 }}>
        <Col xs={24} md={16}>
          <Paragraph style={{ fontSize: 16, marginBottom: 0 }}>
            Access educational resources to help you succeed as a GoKwik partner. Learn about products, sales
            techniques, and best practices.
          </Paragraph>
        </Col>
        <Col xs={24} md={8}>
          <img
            src={Image18}
            alt='Learning Hub'
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

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab='Recommended' key='1'>
          {renderRecommendedContent()}
        </TabPane>
        <TabPane tab='Learning Paths' key='2'>
          {renderLearningPaths()}
        </TabPane>
        <TabPane tab='All Content' key='3'>
          {renderAllContent()}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default LearningHub;
