import React, { useState } from 'react';
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
  Progress,
  Badge,
  Avatar,
} from 'antd';
import {
  CodeOutlined,
  BookOutlined,
  StarOutlined,
  StarFilled,
  YoutubeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  UserOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

// Import images
import Img1 from '../../images/Img_1.png';
import Img2 from '../../images/Img_2.png';
import Image18 from '../../images/image (18).png';
import Image19 from '../../images/image (19).png';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

// Mock data for guides
const mockGuides = [
  {
    id: 'guide-1',
    title: 'Getting Started with GoKwik Integration',
    type: 'tutorial',
    category: 'general',
    tags: ['beginner', 'integration', 'setup'],
    author: 'GoKwik Dev Team',
    publishedDate: '2025-04-15T00:00:00Z',
    readTime: '10 min',
    views: 1250,
    likes: 85,
    comments: 12,
    isFavorite: true,
    thumbnail: Img1,
    progress: 100,
    completed: true,
    completedDate: '2025-04-20T00:00:00Z',
  },
  {
    id: 'guide-2',
    title: 'Implementing Webhook Handlers',
    type: 'tutorial',
    category: 'checkout',
    tags: ['intermediate', 'webhooks', 'integration'],
    author: 'GoKwik Dev Team',
    publishedDate: '2025-04-10T00:00:00Z',
    readTime: '15 min',
    views: 980,
    likes: 72,
    comments: 8,
    isFavorite: false,
    thumbnail: Img2,
    progress: 75,
    completed: false,
    completedDate: null,
  },
  {
    id: 'guide-3',
    title: 'Return Prime Integration',
    type: 'tutorial',
    category: 'rto',
    tags: ['intermediate', 'returns', 'integration'],
    author: 'GoKwik Dev Team',
    publishedDate: '2025-04-05T00:00:00Z',
    readTime: '20 min',
    views: 850,
    likes: 65,
    comments: 10,
    isFavorite: true,
    thumbnail: Image18,
    progress: 50,
    completed: false,
    completedDate: null,
  },
  {
    id: 'guide-4',
    title: 'KiwkEngage Integration',
    type: 'tutorial',
    category: 'engage',
    tags: ['intermediate', 'communication', 'integration'],
    author: 'GoKwik Dev Team',
    publishedDate: '2025-03-25T00:00:00Z',
    readTime: '15 min',
    views: 720,
    likes: 58,
    comments: 6,
    isFavorite: false,
    thumbnail: Image19,
    progress: 25,
    completed: false,
    completedDate: null,
  },
  {
    id: 'guide-5',
    title: 'Advanced Checkout Customization',
    type: 'tutorial',
    category: 'checkout',
    tags: ['advanced', 'checkout', 'customization'],
    author: 'GoKwik Dev Team',
    publishedDate: '2025-04-20T00:00:00Z',
    readTime: '25 min',
    views: 650,
    likes: 48,
    comments: 5,
    isFavorite: true,
    thumbnail: Img1,
    progress: 0,
    completed: false,
    completedDate: null,
  },
];

// Mock data for video tutorials
const mockVideos = [
  {
    id: 'video-1',
    title: 'GoKwik Integration Walkthrough',
    thumbnail: Image18,
    duration: '15:30',
    views: 1850,
    likes: 120,
    publishedDate: '2025-04-18T00:00:00Z',
    videoUrl: 'https://www.youtube.com/embed/QRBi46yYwIE?si=E0URBCTUaUpNhApi',
    description: 'A step-by-step walkthrough of integrating GoKwik services into your e-commerce platform.',
    tags: ['beginner', 'integration', 'setup'],
    isFavorite: true,
  },
  {
    id: 'video-2',
    title: 'Webhook Implementation Demo',
    thumbnail: Image19,
    duration: '12:45',
    views: 1250,
    likes: 95,
    publishedDate: '2025-04-12T00:00:00Z',
    videoUrl: 'https://www.youtube.com/embed/6GMECip67NM?si=11u-qRsC_5zlZHeB',
    description: 'A demonstration of implementing webhook handlers for GoKwik services.',
    tags: ['intermediate', 'webhooks', 'integration'],
    isFavorite: false,
  },
  {
    id: 'video-3',
    title: 'Return Prime Setup Tutorial',
    thumbnail: Img2,
    duration: '18:20',
    views: 980,
    likes: 85,
    publishedDate: '2025-04-08T00:00:00Z',
    videoUrl: 'https://www.youtube.com/embed/bE14pVYWgps?si=HvO1LKC29s1nUdln',
    description: 'A tutorial on setting up Return Prime for your e-commerce platform.',
    tags: ['intermediate', 'returns', 'integration'],
    isFavorite: true,
  },
];

// Mock data for code samples
const mockCodeSamples = [
  {
    id: 'code-1',
    title: 'Checkout Integration Example',
    language: 'javascript',
    description: 'Example code for integrating GoKwik Checkout into your website.',
    tags: ['checkout', 'integration', 'javascript'],
    isFavorite: true,
  },
  {
    id: 'code-2',
    title: 'Webhook Handler Example',
    language: 'javascript',
    description: 'Example code for implementing a webhook handler for GoKwik events.',
    tags: ['webhooks', 'integration', 'javascript', 'express'],
    isFavorite: false,
  },
];

const DeveloperGuides: React.FC = () => {
  const [guides, setGuides] = useState(mockGuides);
  const [videos, setVideos] = useState(mockVideos);
  const [codeSamples, setCodeSamples] = useState(mockCodeSamples);
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('1');

  // Get guide type tag
  const getGuideTypeTag = (type: string) => {
    switch (type) {
      case 'tutorial':
        return (
          <Tag color='blue' icon={<BookOutlined />}>
            Tutorial
          </Tag>
        );
      case 'reference':
        return <Tag color='purple'>Reference</Tag>;
      case 'video':
        return (
          <Tag color='red' icon={<YoutubeOutlined />}>
            Video
          </Tag>
        );
      default:
        return <Tag color='default'>{type}</Tag>;
    }
  };

  // Get guide category tag
  const getGuideCategoryTag = (category: string) => {
    switch (category) {
      case 'general':
        return <Tag color='default'>General</Tag>;
      case 'checkout':
        return <Tag color='cyan'>Checkout</Tag>;
      case 'rto':
        return <Tag color='orange'>Return Prime</Tag>;
      case 'engage':
        return <Tag color='magenta'>Engage</Tag>;
      default:
        return <Tag color='default'>{category}</Tag>;
    }
  };

  // Toggle favorite
  const toggleFavorite = (id: string, type: 'guide' | 'video' | 'code') => {
    if (type === 'guide') {
      const updatedGuides = guides.map((guide) => {
        if (guide.id === id) {
          return { ...guide, isFavorite: !guide.isFavorite };
        }
        return guide;
      });
      setGuides(updatedGuides);
    } else if (type === 'video') {
      const updatedVideos = videos.map((video) => {
        if (video.id === id) {
          return { ...video, isFavorite: !video.isFavorite };
        }
        return video;
      });
      setVideos(updatedVideos);
    } else if (type === 'code') {
      const updatedCodeSamples = codeSamples.map((code) => {
        if (code.id === id) {
          return { ...code, isFavorite: !code.isFavorite };
        }
        return code;
      });
      setCodeSamples(updatedCodeSamples);
    }
  };

  // Filter guides
  const filteredGuides = guides.filter((guide) => {
    const matchesSearch = searchText === '' || guide.title.toLowerCase().includes(searchText.toLowerCase());

    const matchesCategory = categoryFilter.length === 0 || categoryFilter.includes(guide.category);
    const matchesTags = tagFilter.length === 0 || guide.tags.some((tag) => tagFilter.includes(tag));

    return matchesSearch && matchesCategory && matchesTags;
  });

  // Filter videos
  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      searchText === '' ||
      video.title.toLowerCase().includes(searchText.toLowerCase()) ||
      video.description.toLowerCase().includes(searchText.toLowerCase());

    const matchesTags = tagFilter.length === 0 || video.tags.some((tag) => tagFilter.includes(tag));

    return matchesSearch && matchesTags;
  });

  // Filter code samples
  const filteredCodeSamples = codeSamples.filter((code) => {
    const matchesSearch =
      searchText === '' ||
      code.title.toLowerCase().includes(searchText.toLowerCase()) ||
      code.description.toLowerCase().includes(searchText.toLowerCase());

    const matchesTags = tagFilter.length === 0 || code.tags.some((tag) => tagFilter.includes(tag));

    return matchesSearch && matchesTags;
  });

  // Get all unique tags
  const allTags = Array.from(
    new Set([
      ...guides.flatMap((guide) => guide.tags),
      ...videos.flatMap((video) => video.tags),
      ...codeSamples.flatMap((code) => code.tags),
    ]),
  );

  // Get all unique categories
  const allCategories = Array.from(new Set(guides.map((guide) => guide.category)));

  return (
    <div>
      <Title level={2}>Developer Guides</Title>
      <Paragraph>
        Access developer guides, tutorials, videos, and code samples to help you integrate GoKwik services into your
        e-commerce platform.
      </Paragraph>

      <Row gutter={24}>
        <Col xs={24} lg={6}>
          <Card style={{ marginBottom: 16 }}>
            <Search
              placeholder='Search guides, videos, and code samples'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ marginBottom: 16 }}
            />

            <Divider orientation='left'>Filters</Divider>

            <div style={{ marginBottom: 16 }}>
              <Text strong>Category</Text>
              <Select
                mode='multiple'
                placeholder='Filter by category'
                style={{ width: '100%', marginTop: 8 }}
                value={categoryFilter}
                onChange={setCategoryFilter}
              >
                {allCategories.map((category) => (
                  <Option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Option>
                ))}
              </Select>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Text strong>Tags</Text>
              <Select
                mode='multiple'
                placeholder='Filter by tags'
                style={{ width: '100%', marginTop: 8 }}
                value={tagFilter}
                onChange={setTagFilter}
              >
                {allTags.map((tag) => (
                  <Option key={tag} value={tag}>
                    {tag}
                  </Option>
                ))}
              </Select>
            </div>
          </Card>

          <Card title='Your Progress'>
            <List
              dataSource={guides.filter((guide) => guide.progress > 0)}
              renderItem={(guide) => (
                <List.Item>
                  <List.Item.Meta
                    title={guide.title}
                    description={
                      <Progress
                        percent={guide.progress}
                        size='small'
                        status={guide.progress === 100 ? 'success' : 'active'}
                      />
                    }
                  />
                </List.Item>
              )}
              locale={{ emptyText: 'No guides in progress' }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={18}>
          <Card>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab='Guides' key='1'>
                <Row gutter={[16, 16]}>
                  {filteredGuides.map((guide) => (
                    <Col xs={24} sm={12} md={8} key={guide.id}>
                      <Card
                        hoverable
                        cover={
                          <div style={{ position: 'relative' }}>
                            <img alt={guide.title} src={guide.thumbnail} style={{ height: 150, objectFit: 'cover' }} />
                            {guide.progress > 0 && (
                              <Progress
                                percent={guide.progress}
                                size='small'
                                status={guide.progress === 100 ? 'success' : 'active'}
                                style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
                              />
                            )}
                          </div>
                        }
                        actions={[
                          <Button
                            type='text'
                            icon={guide.isFavorite ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(guide.id, 'guide');
                            }}
                          />,
                          <Button type='text' icon={<EyeOutlined />} />,
                        ]}
                      >
                        <Card.Meta
                          title={
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div
                                style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                              >
                                {guide.title}
                              </div>
                              {guide.completed && (
                                <Badge count={<CheckCircleOutlined style={{ color: '#52c41a' }} />} />
                              )}
                            </div>
                          }
                          description={
                            <div>
                              <Space>
                                {getGuideTypeTag(guide.type)}
                                {getGuideCategoryTag(guide.category)}
                              </Space>
                              <div>
                                <Text type='secondary'>{guide.readTime} read</Text>
                              </div>
                            </div>
                          }
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </TabPane>
              <TabPane tab='Videos' key='2'>
                <Row gutter={[16, 16]}>
                  {filteredVideos.map((video) => (
                    <Col xs={24} md={12} key={video.id}>
                      <Card
                        hoverable
                        title={video.title}
                        extra={
                          <Button
                            type='text'
                            icon={video.isFavorite ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(video.id, 'video');
                            }}
                          />
                        }
                      >
                        <div style={{ marginBottom: 16 }}>
                          <iframe
                            width='100%'
                            height='200'
                            src={video.videoUrl}
                            title={video.title}
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
                          {video.description}
                        </Paragraph>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text type='secondary'>{video.duration}</Text>
                          <Space>
                            {video.tags.slice(0, 2).map((tag) => (
                              <Tag key={tag}>{tag}</Tag>
                            ))}
                          </Space>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </TabPane>
              <TabPane tab='Code Samples' key='3'>
                <List
                  dataSource={filteredCodeSamples}
                  renderItem={(code) => (
                    <List.Item
                      actions={[
                        <Button
                          type='text'
                          icon={code.isFavorite ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />}
                          onClick={() => toggleFavorite(code.id, 'code')}
                        />,
                        <Button type='primary' size='small'>
                          View
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<CodeOutlined style={{ fontSize: 24, color: '#1890ff' }} />}
                        title={code.title}
                        description={
                          <div>
                            <div>
                              <Text type='secondary'>{code.description}</Text>
                            </div>
                            <div>
                              <Space>
                                <Tag color='blue'>{code.language}</Tag>
                                {code.tags.slice(0, 3).map((tag) => (
                                  <Tag key={tag}>{tag}</Tag>
                                ))}
                              </Space>
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab='Favorites' key='4'>
                <Tabs defaultActiveKey='1'>
                  <TabPane tab='Guides' key='1'>
                    <List
                      dataSource={guides.filter((guide) => guide.isFavorite)}
                      renderItem={(guide) => (
                        <List.Item
                          actions={[
                            <Button
                              type='text'
                              icon={<StarFilled style={{ color: '#faad14' }} />}
                              onClick={() => toggleFavorite(guide.id, 'guide')}
                            />,
                            <Button type='primary' size='small'>
                              View
                            </Button>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<BookOutlined style={{ fontSize: 24, color: '#1890ff' }} />}
                            title={guide.title}
                            description={
                              <div>
                                <Space>
                                  {getGuideTypeTag(guide.type)}
                                  {getGuideCategoryTag(guide.category)}
                                </Space>
                                <div>
                                  <Text type='secondary'>{guide.readTime} read</Text>
                                </div>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </TabPane>
                  <TabPane tab='Videos' key='2'>
                    <List
                      dataSource={videos.filter((video) => video.isFavorite)}
                      renderItem={(video) => (
                        <List.Item
                          actions={[
                            <Button
                              type='text'
                              icon={<StarFilled style={{ color: '#faad14' }} />}
                              onClick={() => toggleFavorite(video.id, 'video')}
                            />,
                            <Button type='primary' size='small'>
                              View
                            </Button>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<YoutubeOutlined style={{ fontSize: 24, color: '#ff4d4f' }} />}
                            title={video.title}
                            description={
                              <div>
                                <div>
                                  <Text type='secondary'>{video.duration}</Text>
                                </div>
                                <div>
                                  <Space>
                                    {video.tags.slice(0, 2).map((tag) => (
                                      <Tag key={tag}>{tag}</Tag>
                                    ))}
                                  </Space>
                                </div>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </TabPane>
                  <TabPane tab='Code Samples' key='3'>
                    <List
                      dataSource={codeSamples.filter((code) => code.isFavorite)}
                      renderItem={(code) => (
                        <List.Item
                          actions={[
                            <Button
                              type='text'
                              icon={<StarFilled style={{ color: '#faad14' }} />}
                              onClick={() => toggleFavorite(code.id, 'code')}
                            />,
                            <Button type='primary' size='small'>
                              View
                            </Button>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<CodeOutlined style={{ fontSize: 24, color: '#1890ff' }} />}
                            title={code.title}
                            description={
                              <div>
                                <div>
                                  <Text type='secondary'>{code.description}</Text>
                                </div>
                                <div>
                                  <Space>
                                    <Tag color='blue'>{code.language}</Tag>
                                    {code.tags.slice(0, 3).map((tag) => (
                                      <Tag key={tag}>{tag}</Tag>
                                    ))}
                                  </Space>
                                </div>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </TabPane>
                </Tabs>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DeveloperGuides;
