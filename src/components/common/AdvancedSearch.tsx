import React, { useState, useEffect } from 'react';
import { Input, Select, Button, Card, Collapse, Form, Row, Col, DatePicker, Space, Tag, Tooltip } from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  CloseOutlined,
  SaveOutlined,
  HistoryOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;

interface SearchField {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'dateRange' | 'number';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface SavedSearch {
  id: string;
  name: string;
  criteria: Record<string, any>;
  timestamp: string;
}

interface AdvancedSearchProps {
  fields: SearchField[];
  onSearch: (criteria: Record<string, any>) => void;
  searchType: string; // e.g., 'referral', 'commission', etc.
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ fields, onSearch, searchType }) => {
  const [form] = Form.useForm();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const [savedSearches, setSavedSearches] = useLocalStorage<SavedSearch[]>(`${searchType}-saved-searches`, []);
  const [saveSearchModalVisible, setSaveSearchModalVisible] = useState(false);
  const [saveSearchName, setSaveSearchName] = useState('');
  const [recentSearches, setRecentSearches] = useLocalStorage<Record<string, any>[]>(
    `${searchType}-recent-searches`,
    [],
  );

  // Handle quick search
  const handleQuickSearch = () => {
    onSearch({ quickSearch });
  };

  // Handle advanced search
  const handleAdvancedSearch = (values: Record<string, any>) => {
    // Filter out empty values
    const filteredValues = Object.entries(values).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    // Add to recent searches
    if (Object.keys(filteredValues).length > 0) {
      const newRecentSearches = [
        filteredValues,
        ...recentSearches.filter((search) => JSON.stringify(search) !== JSON.stringify(filteredValues)).slice(0, 4), // Keep only the 5 most recent searches
      ];
      setRecentSearches(newRecentSearches);
    }

    onSearch(filteredValues);
    setShowAdvanced(false);
  };

  // Handle save search
  const handleSaveSearch = () => {
    const values = form.getFieldsValue();
    const filteredValues = Object.entries(values).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    if (Object.keys(filteredValues).length > 0 && saveSearchName) {
      const newSavedSearch: SavedSearch = {
        id: `search-${Date.now()}`,
        name: saveSearchName,
        criteria: filteredValues,
        timestamp: new Date().toISOString(),
      };

      setSavedSearches([...savedSearches, newSavedSearch]);
      setSaveSearchModalVisible(false);
      setSaveSearchName('');
    }
  };

  // Handle load saved search
  const handleLoadSavedSearch = (search: SavedSearch) => {
    form.setFieldsValue(search.criteria);
    setShowAdvanced(true);
  };

  // Handle delete saved search
  const handleDeleteSavedSearch = (searchId: string) => {
    setSavedSearches(savedSearches.filter((search) => search.id !== searchId));
  };

  // Handle load recent search
  const handleLoadRecentSearch = (search: Record<string, any>) => {
    form.setFieldsValue(search);
    setShowAdvanced(true);
  };

  // Reset form
  const handleReset = () => {
    form.resetFields();
  };

  // Render field based on type
  const renderField = (field: SearchField) => {
    switch (field.type) {
      case 'text':
        return <Input placeholder={field.placeholder || `Enter ${field.label}`} />;
      case 'select':
        return (
          <Select placeholder={field.placeholder || `Select ${field.label}`} allowClear>
            {field.options?.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
      case 'date':
        return <DatePicker style={{ width: '100%' }} />;
      case 'dateRange':
        return <RangePicker style={{ width: '100%' }} />;
      case 'number':
        return <Input type='number' placeholder={field.placeholder || `Enter ${field.label}`} />;
      default:
        return <Input placeholder={field.placeholder || `Enter ${field.label}`} />;
    }
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      {/* Quick Search */}
      <Row gutter={16} style={{ marginBottom: showAdvanced ? 16 : 0 }}>
        <Col flex='auto'>
          <Input
            placeholder='Quick search...'
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            onPressEnter={handleQuickSearch}
            suffix={
              quickSearch ? (
                <CloseOutlined onClick={() => setQuickSearch('')} style={{ cursor: 'pointer' }} />
              ) : (
                <SearchOutlined />
              )
            }
          />
        </Col>
        <Col>
          <Button type='primary' icon={<SearchOutlined />} onClick={handleQuickSearch}>
            Search
          </Button>
        </Col>
        <Col>
          <Button
            type={showAdvanced ? 'primary' : 'default'}
            icon={<FilterOutlined />}
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            Advanced
          </Button>
        </Col>
      </Row>

      {/* Advanced Search */}
      {showAdvanced && (
        <div style={{ marginTop: 16 }}>
          <Form form={form} layout='vertical' onFinish={handleAdvancedSearch}>
            <Row gutter={16}>
              {fields.map((field) => (
                <Col key={field.key} xs={24} sm={12} md={8} lg={6}>
                  <Form.Item name={field.key} label={field.label}>
                    {renderField(field)}
                  </Form.Item>
                </Col>
              ))}
            </Row>

            <Row justify='space-between'>
              <Col>
                <Space>
                  <Button type='primary' htmlType='submit' icon={<SearchOutlined />}>
                    Search
                  </Button>
                  <Button onClick={handleReset} icon={<CloseOutlined />}>
                    Reset
                  </Button>
                </Space>
              </Col>
              <Col>
                <Space>
                  {savedSearches.length > 0 && (
                    <Select
                      placeholder='Saved searches'
                      style={{ width: 200 }}
                      onSelect={(value: string) => {
                        const search = savedSearches.find((s) => s.id === value);
                        if (search) {
                          handleLoadSavedSearch(search);
                        }
                      }}
                    >
                      {savedSearches.map((search) => (
                        <Option key={search.id} value={search.id}>
                          <Space>
                            <span>{search.name}</span>
                            <Tooltip title='Delete this saved search'>
                              <DeleteOutlined
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteSavedSearch(search.id);
                                }}
                              />
                            </Tooltip>
                          </Space>
                        </Option>
                      ))}
                    </Select>
                  )}
                  <Button icon={<SaveOutlined />} onClick={() => setSaveSearchModalVisible(true)}>
                    Save
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <Collapse ghost>
                <Panel header='Recent Searches' key='recent'>
                  <Space wrap>
                    {recentSearches.map((search, index) => {
                      // Create a summary of the search criteria
                      const criteria = Object.entries(search)
                        .map(([key, value]) => {
                          const field = fields.find((f) => f.key === key);
                          if (!field) return null;

                          if (field.type === 'select' && field.options) {
                            const option = field.options.find((o) => o.value === value);
                            return option ? `${field.label}: ${option.label}` : null;
                          }

                          return `${field.label}: ${value}`;
                        })
                        .filter(Boolean)
                        .join(', ');

                      return (
                        <Tag
                          key={index}
                          color='blue'
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleLoadRecentSearch(search)}
                          icon={<HistoryOutlined />}
                        >
                          {criteria.length > 30 ? criteria.substring(0, 30) + '...' : criteria}
                        </Tag>
                      );
                    })}
                  </Space>
                </Panel>
              </Collapse>
            </div>
          )}

          {/* Save Search Modal */}
          {saveSearchModalVisible && (
            <Card size='small' title='Save Search' style={{ marginTop: 16 }}>
              <Row gutter={16}>
                <Col flex='auto'>
                  <Input
                    placeholder='Enter a name for this search'
                    value={saveSearchName}
                    onChange={(e) => setSaveSearchName(e.target.value)}
                  />
                </Col>
                <Col>
                  <Space>
                    <Button type='primary' onClick={handleSaveSearch}>
                      Save
                    </Button>
                    <Button onClick={() => setSaveSearchModalVisible(false)}>Cancel</Button>
                  </Space>
                </Col>
              </Row>
            </Card>
          )}
        </div>
      )}
    </Card>
  );
};

export default AdvancedSearch;
