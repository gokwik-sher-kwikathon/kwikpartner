import React, { useState } from 'react';
import { Table, TableProps, Input, Button, Space, Tooltip } from 'antd';
import { SearchOutlined, ReloadOutlined, DownloadOutlined } from '@ant-design/icons';
import { chartColors } from '../../theme/themeConfig';

interface EnhancedTableProps<RecordType> extends TableProps<RecordType> {
  /**
   * Title of the table
   */
  tableTitle?: string;

  /**
   * Whether to show the search input
   */
  showSearch?: boolean;

  /**
   * Placeholder text for the search input
   */
  searchPlaceholder?: string;

  /**
   * Callback function for search
   */
  onSearch?: (value: string) => void;

  /**
   * Whether to show the refresh button
   */
  showRefresh?: boolean;

  /**
   * Callback function for refresh
   */
  onRefresh?: () => void;

  /**
   * Whether to show the export button
   */
  showExport?: boolean;

  /**
   * Callback function for export
   */
  onExport?: () => void;

  /**
   * Whether to show the table header
   */
  showHeader?: boolean;

  /**
   * Whether to show alternating row colors
   */
  striped?: boolean;

  /**
   * Whether to show hover effect on rows
   */
  hoverable?: boolean;

  /**
   * Whether to show box shadow around the table
   */
  elevated?: boolean;

  /**
   * Additional CSS class for the table container
   */
  containerClassName?: string;

  /**
   * Additional CSS style for the table container
   */
  containerStyle?: React.CSSProperties;
}

/**
 * An enhanced table component with search, refresh, and export functionality
 */
function EnhancedTable<RecordType extends object = any>({
  tableTitle,
  showSearch = true,
  searchPlaceholder = 'Search...',
  onSearch,
  showRefresh = true,
  onRefresh,
  showExport = true,
  onExport,
  showHeader = true,
  striped = true,
  hoverable = true,
  elevated = true,
  containerClassName,
  containerStyle,
  pagination = { pageSize: 10 },
  ...tableProps
}: EnhancedTableProps<RecordType>) {
  const [searchText, setSearchText] = useState('');

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  // Handle refresh button click
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  // Handle export button click
  const handleExport = () => {
    if (onExport) {
      onExport();
    }
  };

  // Render the table header with title and actions
  const renderTableHeader = () => {
    if (!showHeader) return null;

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--color-text-primary)' }}>{tableTitle}</div>

        <Space size='middle'>
          {showSearch && (
            <Input
              placeholder={searchPlaceholder}
              value={searchText}
              onChange={handleSearchChange}
              prefix={<SearchOutlined style={{ color: 'var(--color-text-tertiary)' }} />}
              style={{ width: 200 }}
              allowClear
            />
          )}

          {showRefresh && (
            <Tooltip title='Refresh'>
              <Button icon={<ReloadOutlined />} onClick={handleRefresh} type='text' />
            </Tooltip>
          )}

          {showExport && (
            <Tooltip title='Export'>
              <Button icon={<DownloadOutlined />} onClick={handleExport} type='text' />
            </Tooltip>
          )}
        </Space>
      </div>
    );
  };

  // Apply custom row class for striped effect
  const rowClassName = (record: RecordType, index: number) => {
    const classes = [];

    if (striped && index % 2 === 1) {
      classes.push('enhanced-table-row-striped');
    }

    return classes.join(' ');
  };

  // Container styles
  const containerStyles: React.CSSProperties = {
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    ...(elevated ? { boxShadow: 'var(--shadow-sm)' } : {}),
    background: 'white',
    ...containerStyle,
  };

  return (
    <div className={`enhanced-table-container responsive-table ${containerClassName || ''}`} style={containerStyles}>
      {renderTableHeader()}

      <Table<RecordType>
        {...tableProps}
        pagination={pagination}
        rowClassName={rowClassName}
        className={`enhanced-table ${hoverable ? 'enhanced-table-hoverable' : ''}`}
        style={{
          ...tableProps.style,
        }}
      />

      <style jsx>{`
        :global(.enhanced-table) {
          margin: 0 !important;
        }

        :global(.enhanced-table .ant-table) {
          border-radius: 0 !important;
        }

        :global(.enhanced-table-row-striped) {
          background-color: #f9f9f9;
        }

        :global(.enhanced-table-hoverable .ant-table-tbody > tr:hover > td) {
          background-color: var(--color-accent-light) !important;
        }

        :global(.enhanced-table .ant-table-thead > tr > th) {
          background-color: #f5f5f5;
          font-weight: 600;
          color: var(--color-text-primary);
          padding: 16px;
        }

        :global(.enhanced-table .ant-table-tbody > tr > td) {
          padding: 16px;
          transition: background-color var(--transition-fast);
        }
      `}</style>
    </div>
  );
}

export default EnhancedTable;
