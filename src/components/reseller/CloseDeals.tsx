import React, { useState, useRef, useEffect } from 'react';
import DashboardCard from '../common/DashboardCard';
import StatisticCard from '../common/StatisticCard';
import DealStageProgress from '../common/DealStageProgress';
import { chartColors } from '../../theme/themeConfig';
import {
  Card,
  Typography,
  Steps,
  Button,
  List,
  Tag,
  Space,
  Row,
  Col,
  Statistic,
  Progress,
  Divider,
  Timeline,
  Form,
  Input,
  Select,
  Upload,
  Modal,
  Tabs,
  Alert,
  DatePicker,
  Dropdown,
  Menu,
  message,
  Badge,
  Avatar,
  Tooltip,
  Table,
  Drawer,
  Popconfirm,
  notification,
  Empty,
  Spin,
  Switch,
} from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  RightCircleOutlined,
  UploadOutlined,
  FileOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  CalendarOutlined,
  PhoneOutlined,
  MailOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  UserOutlined,
  TeamOutlined,
  DollarOutlined,
  BarChartOutlined,
  FileTextOutlined,
  MessageOutlined,
  BellOutlined,
  SettingOutlined,
  ArrowRightOutlined,
  FilterOutlined,
  SearchOutlined,
  DownOutlined,
  InboxOutlined,
  StarOutlined,
  StarFilled,
  FlagOutlined,
  FlagFilled,
  LockOutlined,
  UnlockOutlined,
  SyncOutlined,
  ExportOutlined,
  ImportOutlined,
  EyeOutlined,
  CommentOutlined,
  ScheduleOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { useApp } from '../../context/AppContext';
import moment from 'moment';
import type { UploadFile } from 'antd/es/upload/interface';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

// Mock data for deals
const mockDeals = [
  {
    id: 'deal-1',
    brandName: 'Fashion Store',
    contactName: 'Alice Brown',
    contactEmail: 'alice@fashionstore.com',
    contactPhone: '+91 9876543220',
    monthlyGMV: 500000,
    vertical: 'fashion',
    platform: 'shopify',
    product: 'checkout',
    stage: 'contract_signed',
    stageUpdatedAt: '2025-04-20T10:30:00Z',
    closingDate: '2025-04-25T00:00:00Z',
    assignedTo: 'John Doe',
    priority: 'high',
    documents: [
      {
        uid: 'doc-1',
        name: 'Business Agreement.pdf',
        status: 'done',
        url: 'https://example.com/ba.pdf',
        type: 'agreement',
        uploadedAt: '2025-04-18T14:30:00Z',
      },
      {
        uid: 'doc-2',
        name: 'KYC Documents.pdf',
        status: 'done',
        url: 'https://example.com/kyc.pdf',
        type: 'kyc',
        uploadedAt: '2025-04-19T09:15:00Z',
      },
    ],
    activities: [
      {
        date: '2025-04-10T08:30:00Z',
        action: 'Lead Created',
        user: 'John Doe',
        notes: 'Initial contact made through email',
      },
      {
        date: '2025-04-15T14:20:00Z',
        action: 'Demo Scheduled',
        user: 'John Doe',
        notes: 'Demo scheduled for April 18th',
      },
      {
        date: '2025-04-18T11:00:00Z',
        action: 'Demo Completed',
        user: 'John Doe',
        notes: 'Demo went well, client is interested',
      },
      {
        date: '2025-04-19T10:30:00Z',
        action: 'Business Agreement Shared',
        user: 'John Doe',
        notes: 'Sent business agreement for review',
      },
      {
        date: '2025-04-20T10:30:00Z',
        action: 'Contract Signed',
        user: 'John Doe',
        notes: 'Contract signed, implementation to begin next week',
      },
    ],
    checklist: [
      { id: 'check-1', title: 'Initial Contact', completed: true },
      { id: 'check-2', title: 'Product Demo', completed: true },
      { id: 'check-3', title: 'Proposal Shared', completed: true },
      { id: 'check-4', title: 'Business Agreement Signed', completed: true },
      { id: 'check-5', title: 'KYC Documents Collected', completed: true },
      { id: 'check-6', title: 'Technical Integration Started', completed: false },
      { id: 'check-7', title: 'Go Live', completed: false },
    ],
  },
  {
    id: 'deal-2',
    brandName: 'Tech Gadgets',
    contactName: 'David Lee',
    contactEmail: 'david@techgadgets.com',
    contactPhone: '+91 9876543221',
    monthlyGMV: 800000,
    vertical: 'electronics',
    platform: 'woocommerce',
    product: 'rto',
    stage: 'proposal_shared',
    stageUpdatedAt: '2025-04-22T09:15:00Z',
    closingDate: '2025-05-10T00:00:00Z',
    assignedTo: 'John Doe',
    priority: 'medium',
    documents: [
      {
        uid: 'doc-3',
        name: 'Proposal.pdf',
        status: 'done',
        url: 'https://example.com/proposal.pdf',
        type: 'proposal',
        uploadedAt: '2025-04-22T09:15:00Z',
      },
    ],
    activities: [
      {
        date: '2025-04-20T09:15:00Z',
        action: 'Lead Created',
        user: 'John Doe',
        notes: 'Initial contact made through phone',
      },
      {
        date: '2025-04-21T14:30:00Z',
        action: 'Demo Scheduled',
        user: 'John Doe',
        notes: 'Demo scheduled for April 22nd',
      },
      {
        date: '2025-04-22T09:15:00Z',
        action: 'Proposal Shared',
        user: 'John Doe',
        notes: 'Sent proposal for review',
      },
    ],
    checklist: [
      { id: 'check-8', title: 'Initial Contact', completed: true },
      { id: 'check-9', title: 'Product Demo', completed: true },
      { id: 'check-10', title: 'Proposal Shared', completed: true },
      { id: 'check-11', title: 'Business Agreement Signed', completed: false },
      { id: 'check-12', title: 'KYC Documents Collected', completed: false },
      { id: 'check-13', title: 'Technical Integration Started', completed: false },
      { id: 'check-14', title: 'Go Live', completed: false },
    ],
  },
  {
    id: 'deal-3',
    brandName: 'Beauty Brand',
    contactName: 'Emma Wilson',
    contactEmail: 'emma@beautybrand.com',
    contactPhone: '+91 9876543222',
    monthlyGMV: 350000,
    vertical: 'beauty',
    platform: 'magento',
    product: 'all',
    stage: 'demo_scheduled',
    stageUpdatedAt: '2025-04-18T16:45:00Z',
    closingDate: '2025-05-15T00:00:00Z',
    assignedTo: 'John Doe',
    priority: 'high',
    documents: [],
    activities: [
      {
        date: '2025-04-15T11:30:00Z',
        action: 'Lead Created',
        user: 'John Doe',
        notes: 'Initial contact made through email',
      },
      {
        date: '2025-04-18T16:45:00Z',
        action: 'Demo Scheduled',
        user: 'John Doe',
        notes: 'Demo scheduled for April 25th',
      },
    ],
    checklist: [
      { id: 'check-15', title: 'Initial Contact', completed: true },
      { id: 'check-16', title: 'Product Demo', completed: false },
      { id: 'check-17', title: 'Proposal Shared', completed: false },
      { id: 'check-18', title: 'Business Agreement Signed', completed: false },
      { id: 'check-19', title: 'KYC Documents Collected', completed: false },
      { id: 'check-20', title: 'Technical Integration Started', completed: false },
      { id: 'check-21', title: 'Go Live', completed: false },
    ],
  },
];

// Deal stages
const dealStages = [
  { key: 'initial_contact', name: 'Initial Contact', color: 'blue' },
  { key: 'demo_scheduled', name: 'Demo Scheduled', color: 'cyan' },
  { key: 'proposal_shared', name: 'Proposal Shared', color: 'orange' },
  { key: 'contract_signed', name: 'Contract Signed', color: 'green' },
  { key: 'kyc_collected', name: 'KYC Collected', color: 'purple' },
  { key: 'integration_started', name: 'Integration Started', color: 'magenta' },
  { key: 'go_live', name: 'Go Live', color: 'gold' },
];

// Document types
const documentTypes = [
  { key: 'proposal', name: 'Proposal' },
  { key: 'agreement', name: 'Business Agreement' },
  { key: 'kyc', name: 'KYC Documents' },
  { key: 'technical', name: 'Technical Documentation' },
  { key: 'other', name: 'Other' },
];

const CloseDeals: React.FC = () => {
  const { addNudge } = useApp();
  const [deals, setDeals] = useState(mockDeals);
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('1');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [activityForm] = Form.useForm();
  const [documentForm] = Form.useForm();
  const [newDealForm] = Form.useForm();
  const [taskForm] = Form.useForm();
  const [emailForm] = Form.useForm();
  const [noteForm] = Form.useForm();
  const [proposalForm] = Form.useForm();
  const [documentModalVisible, setDocumentModalVisible] = useState(false);
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [newDealModalVisible, setNewDealModalVisible] = useState(false);
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [proposalModalVisible, setProposalModalVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [filterStage, setFilterStage] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [showClosedDeals, setShowClosedDeals] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Additional state for enhanced functionality
  const [tasks, setTasks] = useState<any[]>([]);
  const [emails, setEmails] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([
    { id: 'user-1', name: 'John Doe', avatar: null, role: 'Sales Manager' },
    { id: 'user-2', name: 'Jane Smith', avatar: null, role: 'Account Executive' },
    { id: 'user-3', name: 'Mike Johnson', avatar: null, role: 'Sales Representative' },
  ]);

  // Function to handle document upload
  const handleDocumentUpload = (info: any) => {
    let newFileList = [...info.fileList];

    // Limit to 5 files
    newFileList = newFileList.slice(-5);

    // Update fileList state
    setFileList(newFileList);

    // Handle status change
    const status = info.file.status;
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);

      // Add document to the selected deal
      if (selectedDeal) {
        const newDocument = {
          uid: info.file.uid,
          name: info.file.name,
          status: 'done',
          url: URL.createObjectURL(info.file.originFileObj),
          type: documentForm.getFieldValue('documentType') || 'other',
          uploadedAt: new Date().toISOString(),
        };

        const updatedDeal = {
          ...selectedDeal,
          documents: [newDocument, ...selectedDeal.documents],
        };

        // Update the deals array
        setDeals(deals.map((deal) => (deal.id === selectedDeal.id ? updatedDeal : deal)));

        // Update the selected deal
        setSelectedDeal(updatedDeal);

        // Add an activity for the document upload
        const newActivity = {
          date: new Date().toISOString(),
          action: `Document Uploaded: ${info.file.name}`,
          user: 'John Doe',
          notes: `Document type: ${
            documentTypes.find((t) => t.key === (documentForm.getFieldValue('documentType') || 'other'))?.name
          }`,
        };

        const updatedDealWithActivity = {
          ...updatedDeal,
          activities: [newActivity, ...updatedDeal.activities],
        };

        // Update the deals array with the new activity
        setDeals(deals.map((deal) => (deal.id === selectedDeal.id ? updatedDealWithActivity : deal)));

        // Update the selected deal with the new activity
        setSelectedDeal(updatedDealWithActivity);
      }
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // Function to add a new activity
  const handleAddActivity = (values: any) => {
    if (!selectedDeal) return;

    const newActivity = {
      date: new Date().toISOString(),
      action: values.action,
      user: 'John Doe', // In a real app, this would be the current user
      notes: values.notes,
    };

    const updatedDeal = {
      ...selectedDeal,
      activities: [newActivity, ...selectedDeal.activities],
    };

    // Update the deals array
    setDeals(deals.map((deal) => (deal.id === selectedDeal.id ? updatedDeal : deal)));

    // Update the selected deal
    setSelectedDeal(updatedDeal);

    // Close the modal and reset form
    setActivityModalVisible(false);
    activityForm.resetFields();

    // Show success message
    message.success('Activity added successfully');
  };

  // Function to add a new task
  const handleAddTask = (values: any) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: values.title,
      description: values.description,
      dueDate: values.dueDate.toISOString(),
      assignedTo: values.assignedTo,
      priority: values.priority,
      status: 'pending',
      dealId: selectedDeal?.id,
      createdAt: new Date().toISOString(),
    };

    setTasks([newTask, ...tasks]);

    // Close the modal and reset form
    setTaskModalVisible(false);
    taskForm.resetFields();

    // Create a nudge for high priority tasks
    if (values.priority === 'high') {
      addNudge({
        id: `nudge-task-${Date.now()}`,
        message: `High priority task: ${values.title} for ${selectedDeal?.brandName}`,
        priority: 'high',
        action: 'View Task',
        timestamp: new Date().toISOString(),
        referralId: selectedDeal?.id,
      });
    }

    // Show success message
    message.success('Task added successfully');
  };

  // Function to add a new email
  const handleAddEmail = (values: any) => {
    const newEmail = {
      id: `email-${Date.now()}`,
      to: values.to,
      subject: values.subject,
      body: values.body,
      status: 'sent',
      dealId: selectedDeal?.id,
      sentAt: new Date().toISOString(),
    };

    setEmails([newEmail, ...emails]);

    // Add an activity for the email
    if (selectedDeal) {
      const newActivity = {
        date: new Date().toISOString(),
        action: `Email Sent: ${values.subject}`,
        user: 'John Doe',
        notes: `Email sent to ${values.to}`,
      };

      const updatedDeal = {
        ...selectedDeal,
        activities: [newActivity, ...selectedDeal.activities],
      };

      // Update the deals array
      setDeals(deals.map((deal) => (deal.id === selectedDeal.id ? updatedDeal : deal)));

      // Update the selected deal
      setSelectedDeal(updatedDeal);
    }

    // Close the modal and reset form
    setEmailModalVisible(false);
    emailForm.resetFields();

    // Show success message
    message.success('Email sent successfully');
  };

  // Function to update deal stage
  const handleUpdateStage = (dealId: string, newStage: string) => {
    // Find the deal
    const deal = deals.find((d) => d.id === dealId);
    if (!deal) return;

    // Get stage names for activity log
    const oldStageName = getStageDisplayName(deal.stage);
    const newStageName = getStageDisplayName(newStage);

    // Create a new activity
    const newActivity = {
      date: new Date().toISOString(),
      action: `Stage Updated: ${oldStageName} → ${newStageName}`,
      user: 'John Doe',
      notes: `Deal moved from ${oldStageName} to ${newStageName}`,
    };

    // Update the deal
    const updatedDeal = {
      ...deal,
      stage: newStage,
      stageUpdatedAt: new Date().toISOString(),
      activities: [newActivity, ...deal.activities],
    };

    // Update the deals array
    setDeals(deals.map((d) => (d.id === dealId ? updatedDeal : d)));

    // If this is the selected deal, update it
    if (selectedDeal && selectedDeal.id === dealId) {
      setSelectedDeal(updatedDeal);
    }

    // If moving to contract_signed stage, create a KYC nudge
    if (newStage === 'contract_signed') {
      addNudge({
        id: `nudge-kyc-${Date.now()}`,
        message: `Please collect KYC documents for ${deal.brandName}`,
        priority: 'high',
        action: 'Collect KYC',
        timestamp: new Date().toISOString(),
        referralId: dealId,
      });
    }

    // Show success message
    message.success(`Deal moved to ${newStageName}`);
  };

  // Get stage color
  const getStageColor = (stage: string) => {
    const stageObj = dealStages.find((s) => s.key === stage);
    return stageObj ? stageObj.color : 'default';
  };

  // Get stage display name
  const getStageDisplayName = (stage: string) => {
    const stageObj = dealStages.find((s) => s.key === stage);
    return stageObj ? stageObj.name : stage;
  };

  // Get stage index
  const getStageIndex = (stage: string) => {
    return dealStages.findIndex((s) => s.key === stage);
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'default';
    }
  };

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

  // Handle deal selection
  const handleSelectDeal = (deal: any) => {
    setSelectedDeal(deal);
    setActiveTab('1');
  };

  // Handle checklist item toggle
  const handleChecklistToggle = (dealId: string, checkId: string) => {
    setDeals(
      deals.map((deal) => {
        if (deal.id === dealId) {
          const updatedChecklist = deal.checklist.map((item) => {
            if (item.id === checkId) {
              return { ...item, completed: !item.completed };
            }
            return item;
          });

          // If selected deal, update it too
          if (selectedDeal && selectedDeal.id === dealId) {
            setSelectedDeal({ ...selectedDeal, checklist: updatedChecklist });
          }

          return { ...deal, checklist: updatedChecklist };
        }
        return deal;
      }),
    );
  };

  // Calculate completion percentage
  const calculateCompletion = (checklist: any[]) => {
    if (checklist.length === 0) return 0;
    const completedItems = checklist.filter((item) => item.completed).length;
    return Math.round((completedItems / checklist.length) * 100);
  };

  // Function to filter deals
  const filterDeals = () => {
    return deals.filter((deal) => {
      // Filter by stage
      const stageMatch = filterStage === 'all' || deal.stage === filterStage;

      // Filter by search text
      const searchMatch =
        searchText === '' ||
        deal.brandName.toLowerCase().includes(searchText.toLowerCase()) ||
        deal.contactName.toLowerCase().includes(searchText.toLowerCase()) ||
        deal.contactEmail.toLowerCase().includes(searchText.toLowerCase());

      // Filter closed deals
      const closedMatch = showClosedDeals || deal.stage !== 'go_live';

      return stageMatch && searchMatch && closedMatch;
    });
  };

  // Function to sort deals
  const sortDeals = (dealsToSort: any[]) => {
    return [...dealsToSort].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'date':
          comparison = new Date(b.stageUpdatedAt).getTime() - new Date(a.stageUpdatedAt).getTime();
          break;
        case 'name':
          comparison = a.brandName.localeCompare(b.brandName);
          break;
        case 'value':
          comparison = b.monthlyGMV - a.monthlyGMV;
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          comparison =
            priorityOrder[b.priority as keyof typeof priorityOrder] -
            priorityOrder[a.priority as keyof typeof priorityOrder];
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'asc' ? -comparison : comparison;
    });
  };

  // Render list view
  const renderListView = () => {
    const filteredDeals = filterDeals();
    const sortedDeals = sortDeals(filteredDeals);

    const columns = [
      {
        title: 'Brand',
        dataIndex: 'brandName',
        key: 'brandName',
        render: (text: string, record: any) => (
          <div>
            <Text strong>{text}</Text>
            <div>
              <Text type='secondary'>{record.vertical}</Text>
            </div>
          </div>
        ),
      },
      {
        title: 'Contact',
        dataIndex: 'contactName',
        key: 'contactName',
        render: (text: string, record: any) => (
          <div>
            <Text>{text}</Text>
            <div>
              <Text type='secondary'>{record.contactEmail}</Text>
            </div>
          </div>
        ),
      },
      {
        title: 'Stage',
        dataIndex: 'stage',
        key: 'stage',
        render: (stage: string) => <Tag color={getStageColor(stage)}>{getStageDisplayName(stage)}</Tag>,
      },
      {
        title: 'Value',
        dataIndex: 'monthlyGMV',
        key: 'monthlyGMV',
        render: (value: number) => <Text>₹{value.toLocaleString()}</Text>,
      },
      {
        title: 'Progress',
        key: 'progress',
        render: (text: string, record: any) => (
          <Progress
            percent={calculateCompletion(record.checklist)}
            size='small'
            status={calculateCompletion(record.checklist) === 100 ? 'success' : 'active'}
          />
        ),
      },
      {
        title: 'Closing Date',
        dataIndex: 'closingDate',
        key: 'closingDate',
        render: (date: string) => (
          <Text>
            <CalendarOutlined style={{ marginRight: 4 }} />
            {moment(date).format('MMM D, YYYY')}
          </Text>
        ),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (text: string, record: any) => (
          <Space>
            <Button type='primary' size='small' onClick={() => handleSelectDeal(record)}>
              View
            </Button>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item
                    key='email'
                    onClick={() => {
                      setSelectedDeal(record);
                      emailForm.setFieldsValue({ to: record.contactEmail });
                      setEmailModalVisible(true);
                    }}
                  >
                    <MailOutlined /> Send Email
                  </Menu.Item>
                  <Menu.Item
                    key='task'
                    onClick={() => {
                      setSelectedDeal(record);
                      setTaskModalVisible(true);
                    }}
                  >
                    <PlusOutlined /> Add Task
                  </Menu.Item>
                  <Menu.Item
                    key='stage'
                    onClick={() => {
                      setSelectedDeal(record);
                      setDrawerVisible(true);
                    }}
                  >
                    <ArrowRightOutlined /> Change Stage
                  </Menu.Item>
                </Menu>
              }
            >
              <Button size='small' icon={<MoreOutlined />} />
            </Dropdown>
          </Space>
        ),
      },
    ];

    return (
      <Table
        dataSource={sortedDeals}
        columns={columns}
        rowKey='id'
        pagination={{ pageSize: 10 }}
        onRow={(record) => ({
          onClick: () => handleSelectDeal(record),
          style: { cursor: 'pointer' },
        })}
      />
    );
  };

  // Render deal list (for sidebar)
  const renderDealList = () => {
    const filteredDeals = filterDeals();
    const sortedDeals = sortDeals(filteredDeals);

    return (
      <List
        dataSource={sortedDeals}
        renderItem={(deal) => (
          <List.Item
            key={deal.id}
            onClick={() => handleSelectDeal(deal)}
            style={{
              cursor: 'pointer',
              backgroundColor: selectedDeal && selectedDeal.id === deal.id ? '#f0f5ff' : 'transparent',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '8px',
              borderLeft: `3px solid ${getPriorityColor(deal.priority)}`,
            }}
          >
            <List.Item.Meta
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text
                    strong
                    style={{
                      marginRight: '8px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '150px',
                      fontSize: '15px',
                      color: chartColors.primary,
                    }}
                  >
                    {deal.brandName}
                  </Text>
                  <Tag color={getStageColor(deal.stage)} style={{ fontWeight: 'bold' }}>
                    {getStageDisplayName(deal.stage)}
                  </Tag>
                </div>
              }
              description={
                <div>
                  <div>
                    <Text type='secondary'>
                      {deal.vertical} | {deal.product}
                    </Text>
                  </div>
                  <div>
                    <Text type='secondary'>
                      <CalendarOutlined style={{ marginRight: 4 }} />
                      Closing: {moment(deal.closingDate).format('MMM D, YYYY')}
                    </Text>
                  </div>
                </div>
              }
            />
            <Progress
              percent={calculateCompletion(deal.checklist)}
              size='small'
              status={calculateCompletion(deal.checklist) === 100 ? 'success' : 'active'}
              style={{ width: 100 }}
            />
          </List.Item>
        )}
      />
    );
  };

  return (
    <div>
      <Title level={2}>Deal Closure Management</Title>
      <Paragraph>
        Manage your deals through the sales pipeline, from initial contact to contract signing and implementation.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <StatisticCard
            title='Total Deals'
            value={deals.length}
            prefix={<TeamOutlined />}
            valueStyle={{ color: chartColors.primary }}
          />
        </Col>
        <Col xs={24} sm={8}>
          <StatisticCard
            title='Deals in Progress'
            value={deals.filter((deal) => deal.stage !== 'go_live').length}
            prefix={<ClockCircleOutlined />}
            valueStyle={{ color: chartColors.secondary }}
            trend={5.2}
            trendLabel='vs last month'
          />
        </Col>
        <Col xs={24} sm={8}>
          <StatisticCard
            title='Closed Deals'
            value={deals.filter((deal) => deal.stage === 'go_live').length}
            prefix={<CheckCircleOutlined />}
            valueStyle={{ color: chartColors.success }}
            trend={8.1}
            trendLabel='vs last month'
          />
        </Col>
      </Row>

      {/* New Deal Button - Moved to top and highlighted */}
      <Row justify='end' style={{ marginBottom: 16 }}>
        <Col>
          <Button
            type='primary'
            size='large'
            icon={<PlusOutlined />}
            onClick={() => setNewDealModalVisible(true)}
            style={{
              background: chartColors.primary,
              borderColor: chartColors.primary,
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
          >
            New Deal
          </Button>
        </Col>
      </Row>

      {/* Filters and View Toggle */}
      <DashboardCard title='Filters & View Options' style={{ marginBottom: 24 }} bodyStyle={{ padding: '16px 24px' }}>
        <Row gutter={[16, 16]} align='middle'>
          <Col xs={24} md={7}>
            <Input
              placeholder='Search deals...'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
              allowClear
            />
          </Col>
          <Col xs={24} md={6}>
            <Select
              placeholder='Filter by stage'
              style={{ width: '100%' }}
              value={filterStage}
              onChange={setFilterStage}
            >
              <Option value='all'>All Stages</Option>
              {dealStages.map((stage) => (
                <Option key={stage.key} value={stage.key}>
                  {stage.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} md={6}>
            <Select placeholder='Sort by' style={{ width: '100%' }} value={sortBy} onChange={setSortBy}>
              <Option value='date'>Last Updated</Option>
              <Option value='name'>Brand Name</Option>
              <Option value='value'>Deal Value</Option>
              <Option value='priority'>Priority</Option>
            </Select>
          </Col>
          <Col xs={24} md={5}>
            <Space>
              <Tooltip title={sortOrder === 'asc' ? 'Ascending Order' : 'Descending Order'}>
                <Button
                  type={sortOrder === 'asc' ? 'primary' : 'default'}
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  {sortOrder === 'asc' ? 'Asc' : 'Desc'}
                </Button>
              </Tooltip>
              <Tooltip title={showClosedDeals ? 'Hide Closed Deals' : 'Show Closed Deals'}>
                <Button
                  type={showClosedDeals ? 'primary' : 'default'}
                  onClick={() => setShowClosedDeals(!showClosedDeals)}
                >
                  {showClosedDeals ? 'Hide Closed' : 'Show Closed'}
                </Button>
              </Tooltip>
            </Space>
          </Col>
        </Row>

        {/* View Toggle Buttons - Repositioned below */}
        <Row justify='center' style={{ marginTop: 16 }}>
          <Col>
            <Space>
              <Button
                type={viewMode === 'list' ? 'primary' : 'default'}
                icon={<UnorderedListOutlined />}
                onClick={() => setViewMode('list')}
              >
                List View
              </Button>
              <Button
                type={viewMode === 'kanban' ? 'primary' : 'default'}
                icon={<AppstoreOutlined />}
                onClick={() => setViewMode('kanban')}
              >
                Kanban View
              </Button>
            </Space>
          </Col>
        </Row>
      </DashboardCard>

      {/* Main Content */}
      {viewMode === 'list' ? (
        <DashboardCard title='All Deals'>{renderListView()}</DashboardCard>
      ) : (
        <Row gutter={24}>
          <Col span={7}>
            <DashboardCard
              title={
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: chartColors.primary }}>Deal Pipeline</span>
              }
              style={{ marginBottom: 24 }}
            >
              {renderDealList()}
            </DashboardCard>
          </Col>

          <Col span={17}>
            <DashboardCard>
              {selectedDeal ? (
                <Tabs activeKey={activeTab} onChange={setActiveTab}>
                  <TabPane tab='Overview' key='1'>
                    <div style={{ marginBottom: 24 }}>
                      <DealStageProgress currentStage={selectedDeal.stage} stages={dealStages} />
                    </div>

                    <Row gutter={[16, 16]}>
                      <Col xs={24} md={16}>
                        <Card title='Deal Information' style={{ marginBottom: 16 }}>
                          <Row gutter={[16, 8]}>
                            <Col span={6}>
                              <Text type='secondary' style={{ fontSize: '12px' }}>
                                Brand Name
                              </Text>
                              <div>
                                <Text strong>{selectedDeal.brandName}</Text>
                              </div>
                            </Col>
                            <Col span={6}>
                              <Text type='secondary' style={{ fontSize: '12px' }}>
                                Vertical
                              </Text>
                              <div>
                                <Text strong>{selectedDeal.vertical}</Text>
                              </div>
                            </Col>
                            <Col span={6}>
                              <Text type='secondary' style={{ fontSize: '12px' }}>
                                Contact Person
                              </Text>
                              <div>
                                <Text strong>{selectedDeal.contactName}</Text>
                              </div>
                            </Col>
                            <Col span={6}>
                              <Text type='secondary' style={{ fontSize: '12px' }}>
                                Contact Email
                              </Text>
                              <div>
                                <Text strong style={{ wordBreak: 'break-word' }}>
                                  {selectedDeal.contactEmail}
                                </Text>
                              </div>
                            </Col>
                            <Col span={6}>
                              <Text type='secondary' style={{ fontSize: '12px' }}>
                                Monthly GMV
                              </Text>
                              <div>
                                <Text strong>₹{selectedDeal.monthlyGMV.toLocaleString()}</Text>
                              </div>
                            </Col>
                            <Col span={6}>
                              <Text type='secondary' style={{ fontSize: '12px' }}>
                                Platform
                              </Text>
                              <div>
                                <Text strong>{selectedDeal.platform}</Text>
                              </div>
                            </Col>
                            <Col span={6}>
                              <Text type='secondary' style={{ fontSize: '12px' }}>
                                Product
                              </Text>
                              <div>
                                <Text strong>{selectedDeal.product}</Text>
                              </div>
                            </Col>
                            <Col span={6}>
                              <Text type='secondary' style={{ fontSize: '12px' }}>
                                Priority
                              </Text>
                              <div>
                                <Tag color={getPriorityColor(selectedDeal.priority)}>{selectedDeal.priority}</Tag>
                              </div>
                            </Col>
                          </Row>
                        </Card>

                        <Card
                          title={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>Closing Checklist</span>}
                          style={{ marginBottom: 16 }}
                        >
                          <List
                            dataSource={selectedDeal.checklist}
                            size='small'
                            renderItem={(item: any) => (
                              <List.Item
                                actions={[
                                  <Button
                                    size='small'
                                    type={item.completed ? 'primary' : 'default'}
                                    icon={item.completed ? <CheckCircleOutlined /> : <RightCircleOutlined />}
                                    onClick={() => handleChecklistToggle(selectedDeal.id, item.id)}
                                  >
                                    {item.completed ? 'Done' : 'Mark'}
                                  </Button>,
                                ]}
                              >
                                <List.Item.Meta
                                  avatar={
                                    item.completed ? (
                                      <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 20 }} />
                                    ) : (
                                      <ClockCircleOutlined style={{ color: '#1890ff', fontSize: 20 }} />
                                    )
                                  }
                                  title={<span style={{ fontSize: '14px' }}>{item.title}</span>}
                                />
                              </List.Item>
                            )}
                          />
                        </Card>
                      </Col>

                      <Col xs={24} md={8}>
                        <Card title='Deal Progress' style={{ marginBottom: 16 }}>
                          <div style={{ textAlign: 'center', marginBottom: 16 }}>
                            <Progress
                              type='circle'
                              percent={calculateCompletion(selectedDeal.checklist)}
                              format={(percent) => `${percent}%`}
                            />
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <Text>
                              {selectedDeal.checklist.filter((item: any) => item.completed).length} of{' '}
                              {selectedDeal.checklist.length} tasks completed
                            </Text>
                          </div>
                        </Card>

                        <Card
                          title={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>Documents</span>}
                          extra={
                            <Button
                              type='primary'
                              size='small'
                              icon={<UploadOutlined />}
                              onClick={() => setDocumentModalVisible(true)}
                            >
                              Upload
                            </Button>
                          }
                          style={{ marginBottom: 16 }}
                          bodyStyle={{ maxHeight: '250px', overflowY: 'auto' }}
                        >
                          {selectedDeal.documents.length > 0 ? (
                            <List
                              dataSource={selectedDeal.documents}
                              renderItem={(doc: any) => (
                                <List.Item
                                  actions={[
                                    <Button type='link' href={doc.url} target='_blank'>
                                      View
                                    </Button>,
                                  ]}
                                >
                                  <List.Item.Meta
                                    avatar={getFileIcon(doc.name)}
                                    title={
                                      <Tooltip title={doc.name}>
                                        <div>{doc.name}</div>
                                      </Tooltip>
                                    }
                                  />
                                </List.Item>
                              )}
                            />
                          ) : (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                              <Text type='secondary'>No documents uploaded yet</Text>
                            </div>
                          )}
                        </Card>

                        <Card
                          title={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>Quick Actions</span>}
                          style={{ marginBottom: 16 }}
                        >
                          <Space direction='vertical' style={{ width: '100%' }}>
                            <Button
                              block
                              type='primary'
                              ghost
                              icon={<MailOutlined />}
                              onClick={() => window.open(`mailto:${selectedDeal.contactEmail}`)}
                            >
                              Send Email
                            </Button>
                            <Button
                              block
                              type='primary'
                              ghost
                              icon={<PhoneOutlined />}
                              onClick={() => window.open(`tel:${selectedDeal.contactPhone}`)}
                            >
                              Call Contact
                            </Button>
                            <Button
                              block
                              type='primary'
                              ghost
                              icon={<PlusOutlined />}
                              onClick={() => setActivityModalVisible(true)}
                            >
                              Add Activity
                            </Button>
                          </Space>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>

                  <TabPane tab='Activity History' key='2'>
                    <Card>
                      <Timeline mode='left'>
                        {selectedDeal.activities.map((activity: any, index: number) => (
                          <Timeline.Item key={index} label={new Date(activity.date).toLocaleString()}>
                            <Text strong>{activity.action}</Text>
                            <div>
                              <Text type='secondary'>by {activity.user}</Text>
                            </div>
                            {activity.notes && <div style={{ marginTop: 8 }}>{activity.notes}</div>}
                          </Timeline.Item>
                        ))}
                      </Timeline>
                    </Card>
                  </TabPane>
                </Tabs>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <Text type='secondary'>Select a deal to view details</Text>
                </div>
              )}
            </DashboardCard>
          </Col>
        </Row>
      )}

      {/* New Deal Modal */}
      <Modal
        title='Create New Deal'
        open={newDealModalVisible}
        onCancel={() => setNewDealModalVisible(false)}
        footer={null}
        width={700}
      >
        <Form
          form={newDealForm}
          layout='vertical'
          onFinish={(values) => {
            const newDeal = {
              id: `deal-${Date.now()}`,
              brandName: values.brandName,
              contactName: values.contactName,
              contactEmail: values.contactEmail,
              contactPhone: values.contactPhone,
              monthlyGMV: values.monthlyGMV,
              vertical: values.vertical,
              platform: values.platform,
              product: values.product,
              stage: 'initial_contact',
              stageUpdatedAt: new Date().toISOString(),
              closingDate: values.closingDate ? values.closingDate.toISOString() : new Date().toISOString(),
              assignedTo: 'John Doe',
              priority: values.priority,
              documents: [],
              activities: [
                {
                  date: new Date().toISOString(),
                  action: 'Lead Created',
                  user: 'John Doe',
                  notes: values.notes || 'New lead created',
                },
              ],
              checklist: [
                { id: `check-${Date.now()}-1`, title: 'Initial Contact', completed: true },
                { id: `check-${Date.now()}-2`, title: 'Product Demo', completed: false },
                { id: `check-${Date.now()}-3`, title: 'Proposal Shared', completed: false },
                { id: `check-${Date.now()}-4`, title: 'Business Agreement Signed', completed: false },
                { id: `check-${Date.now()}-5`, title: 'KYC Documents Collected', completed: false },
                { id: `check-${Date.now()}-6`, title: 'Technical Integration Started', completed: false },
                { id: `check-${Date.now()}-7`, title: 'Go Live', completed: false },
              ],
            };

            setDeals([...deals, newDeal]);
            setNewDealModalVisible(false);
            newDealForm.resetFields();
            setSelectedDeal(newDeal);
          }}
          initialValues={{
            priority: 'medium',
            vertical: 'fashion',
            platform: 'shopify',
            product: 'checkout',
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='brandName'
                label='Brand Name'
                rules={[{ required: true, message: 'Please enter brand name' }]}
              >
                <Input placeholder='Brand Name' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='vertical'
                label='Vertical'
                rules={[{ required: true, message: 'Please select vertical' }]}
              >
                <Select>
                  <Option value='fashion'>Fashion</Option>
                  <Option value='electronics'>Electronics</Option>
                  <Option value='beauty'>Beauty</Option>
                  <Option value='home'>Home</Option>
                  <Option value='sports'>Sports</Option>
                  <Option value='other'>Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='contactName'
                label='Contact Person'
                rules={[{ required: true, message: 'Please enter contact name' }]}
              >
                <Input placeholder='Contact Name' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='contactEmail'
                label='Contact Email'
                rules={[
                  { required: true, message: 'Please enter contact email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input placeholder='Contact Email' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='contactPhone'
                label='Contact Phone'
                rules={[{ required: true, message: 'Please enter contact phone' }]}
              >
                <Input placeholder='Contact Phone' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='monthlyGMV'
                label='Monthly GMV (₹)'
                rules={[{ required: true, message: 'Please enter monthly GMV' }]}
              >
                <Input type='number' placeholder='Monthly GMV' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='platform'
                label='Platform'
                rules={[{ required: true, message: 'Please select platform' }]}
              >
                <Select>
                  <Option value='shopify'>Shopify</Option>
                  <Option value='woocommerce'>WooCommerce</Option>
                  <Option value='magento'>Magento</Option>
                  <Option value='custom'>Custom</Option>
                  <Option value='other'>Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='product' label='Product' rules={[{ required: true, message: 'Please select product' }]}>
                <Select>
                  <Option value='checkout'>Checkout</Option>
                  <Option value='rto'>Return Prime</Option>
                  <Option value='engage'>Engage</Option>
                  <Option value='all'>All Products</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='priority'
                label='Priority'
                rules={[{ required: true, message: 'Please select priority' }]}
              >
                <Select>
                  <Option value='high'>High</Option>
                  <Option value='medium'>Medium</Option>
                  <Option value='low'>Low</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='closingDate'
                label='Expected Closing Date'
                rules={[{ required: true, message: 'Please select closing date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name='notes' label='Notes'>
            <TextArea rows={4} placeholder='Additional notes about this deal' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Create Deal
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Document Upload Modal */}
      <Modal
        title='Upload Document'
        open={documentModalVisible}
        onCancel={() => setDocumentModalVisible(false)}
        footer={null}
      >
        <Form form={documentForm} layout='vertical' onFinish={() => setDocumentModalVisible(false)}>
          <Form.Item
            name='documentType'
            label='Document Type'
            rules={[{ required: true, message: 'Please select document type' }]}
          >
            <Select placeholder='Select document type'>
              {documentTypes.map((type) => (
                <Option key={type.key} value={type.key}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name='document' label='Document' rules={[{ required: true, message: 'Please upload a document' }]}>
            <Upload.Dragger
              name='files'
              fileList={fileList}
              onChange={handleDocumentUpload}
              multiple={false}
              beforeUpload={() => false}
            >
              <p className='ant-upload-drag-icon'>
                <InboxOutlined />
              </p>
              <p className='ant-upload-text'>Click or drag file to this area to upload</p>
              <p className='ant-upload-hint'>
                Support for a single file upload. PDF, Word, Excel, and image files are supported.
              </p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Upload
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Activity Modal */}
      <Modal
        title='Add Activity'
        open={activityModalVisible}
        onCancel={() => setActivityModalVisible(false)}
        footer={null}
      >
        <Form form={activityForm} layout='vertical' onFinish={handleAddActivity}>
          <Form.Item
            name='action'
            label='Activity Type'
            rules={[{ required: true, message: 'Please enter activity type' }]}
          >
            <Input placeholder='e.g., Call, Email, Meeting' />
          </Form.Item>

          <Form.Item name='notes' label='Notes' rules={[{ required: true, message: 'Please enter activity notes' }]}>
            <TextArea rows={4} placeholder='Enter details about the activity' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Add Activity
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Task Modal */}
      <Modal title='Add Task' open={taskModalVisible} onCancel={() => setTaskModalVisible(false)} footer={null}>
        <Form form={taskForm} layout='vertical' onFinish={handleAddTask}>
          <Form.Item name='title' label='Task Title' rules={[{ required: true, message: 'Please enter task title' }]}>
            <Input placeholder='e.g., Follow up with client' />
          </Form.Item>

          <Form.Item name='description' label='Description'>
            <TextArea rows={3} placeholder='Enter task details' />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='dueDate'
                label='Due Date'
                rules={[{ required: true, message: 'Please select due date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='assignedTo'
                label='Assigned To'
                rules={[{ required: true, message: 'Please select assignee' }]}
                initialValue={teamMembers[0]?.id}
              >
                <Select placeholder='Select team member'>
                  {teamMembers.map((member) => (
                    <Option key={member.id} value={member.id}>
                      {member.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name='priority'
            label='Priority'
            rules={[{ required: true, message: 'Please select priority' }]}
            initialValue='medium'
          >
            <Select placeholder='Select priority'>
              <Option value='high'>High</Option>
              <Option value='medium'>Medium</Option>
              <Option value='low'>Low</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Email Modal */}
      <Modal title='Send Email' open={emailModalVisible} onCancel={() => setEmailModalVisible(false)} footer={null}>
        <Form form={emailForm} layout='vertical' onFinish={handleAddEmail}>
          <Form.Item
            name='to'
            label='To'
            rules={[
              { required: true, message: 'Please enter recipient email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder='Recipient email' />
          </Form.Item>

          <Form.Item name='subject' label='Subject' rules={[{ required: true, message: 'Please enter email subject' }]}>
            <Input placeholder='Email subject' />
          </Form.Item>

          <Form.Item name='body' label='Message' rules={[{ required: true, message: 'Please enter email body' }]}>
            <TextArea rows={6} placeholder='Email content' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Send Email
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Stage Change Drawer */}
      <Drawer
        title='Update Deal Stage'
        placement='right'
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={400}
      >
        {selectedDeal && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <Text strong>Current Stage:</Text>
              <div style={{ marginTop: 8 }}>
                <Tag color={getStageColor(selectedDeal.stage)} style={{ padding: '4px 8px' }}>
                  {getStageDisplayName(selectedDeal.stage)}
                </Tag>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <Text strong>Select New Stage:</Text>
              <div style={{ marginTop: 16 }}>
                <Space direction='vertical' style={{ width: '100%' }}>
                  {dealStages.map((stage) => (
                    <Button
                      key={stage.key}
                      block
                      type={selectedDeal.stage === stage.key ? 'primary' : 'default'}
                      onClick={() => handleUpdateStage(selectedDeal.id, stage.key)}
                      disabled={selectedDeal.stage === stage.key}
                      style={{
                        textAlign: 'left',
                        borderLeft: `3px solid ${stage.color}`,
                        marginBottom: 8,
                      }}
                    >
                      {stage.name}
                    </Button>
                  ))}
                </Space>
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <Button type='primary' onClick={() => setDrawerVisible(false)} block>
                Done
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default CloseDeals;
