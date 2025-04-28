import React, { useState, useEffect } from 'react';
import { Tabs, Spin, Alert, Typography, Row, Col } from 'antd';
import { PageLayout } from '../../components/common';
import { getAdminDashboardData } from '../../services/adminDashboardService';
import { AdminDashboardData } from '../../types/adminDashboard';
import ExecutiveSummary from '../../components/admin/ExecutiveSummary';
import PartnerActivationMetrics from '../../components/admin/PartnerActivationMetrics';
import LeadGenerationMetrics from '../../components/admin/LeadGenerationMetrics';
import RevenueImpactMetrics from '../../components/admin/RevenueImpactMetrics';
import EfficiencyMetrics from '../../components/admin/EfficiencyMetrics';
import PartnerSatisfactionMetrics from '../../components/admin/PartnerSatisfactionMetrics';

const { Title } = Typography;
const { TabPane } = Tabs;

const AdminDashboardPage: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('1');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAdminDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error('Error fetching admin dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <PageLayout
      title='GoKwik Admin Dashboard'
      subtitle='Comprehensive analytics and metrics for the KwikPartner platform'
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size='large' />
          <p style={{ marginTop: 16 }}>Loading dashboard data...</p>
        </div>
      ) : error ? (
        <Alert message='Error' description={error} type='error' showIcon style={{ marginBottom: 24 }} />
      ) : dashboardData ? (
        <>
          {/* Executive Summary - Always visible */}
          <div style={{ marginBottom: 24 }}>
            <Title level={4}>Executive Summary</Title>
            <ExecutiveSummary data={dashboardData.executiveSummary} />
          </div>

          {/* Detailed Metrics Tabs */}
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab='Partner Activation' key='1'>
              <PartnerActivationMetrics data={dashboardData.partnerActivation} />
            </TabPane>
            <TabPane tab='Lead Generation' key='2'>
              <LeadGenerationMetrics data={dashboardData.leadGeneration} />
            </TabPane>
            <TabPane tab='Revenue Impact' key='3'>
              <RevenueImpactMetrics data={dashboardData.revenueImpact} />
            </TabPane>
            <TabPane tab='Efficiency & Cost' key='4'>
              <EfficiencyMetrics data={dashboardData.efficiency} />
            </TabPane>
            <TabPane tab='Partner Satisfaction' key='5'>
              <PartnerSatisfactionMetrics data={dashboardData.satisfaction} />
            </TabPane>
          </Tabs>
        </>
      ) : (
        <Alert message='No Data' description='No dashboard data available.' type='info' showIcon />
      )}
    </PageLayout>
  );
};

export default AdminDashboardPage;
