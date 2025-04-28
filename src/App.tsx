import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { themeConfig } from './theme/themeConfig';
import './styles/global.css';
import './components/dashboard/leads/LeadForms.css';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import NudgesPage from './pages/NudgesPage';

// Referral Partner Pages
import ReferralFormPage from './pages/referral/ReferralFormPage';
import ReferralTrackerPage from './pages/referral/ReferralTrackerPage';
import LearningHubPage from './pages/referral/LearningHubPage';
import CommissionTrackerPage from './pages/referral/CommissionTrackerPage';

// Reseller Partner Pages
import LeadPipelinePage from './pages/reseller/LeadPipelinePage';
import DocumentUploadPage from './pages/reseller/DocumentUploadPage';
import GTMPlaybooksPage from './pages/reseller/GTMPlaybooksPage';
import CloseDealsPage from './pages/reseller/CloseDealsPage';
import ResellerCommissionPage from './pages/reseller/ResellerCommissionPage';

// Service Partner Pages
import AssignedBrandsPage from './pages/service/AssignedBrandsPage';
import SetupTrackerPage from './pages/service/SetupTrackerPage';
import TechDocumentationPage from './pages/service/TechDocumentationPage';
import IncentiveTrackerPage from './pages/service/IncentiveTrackerPage';
import DeveloperGuidesPage from './pages/service/DeveloperGuidesPage';

// Context
import { AppProvider } from './context/AppContext';
import { WebSocketProvider } from './context/WebSocketContext';

// Layout
import AppLayout from './components/common/AppLayout';

// Auth Guard
import AuthGuard from './components/common/AuthGuard';

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize app (load user from localStorage, etc.)
    const initApp = async () => {
      // Simulate initialization delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsInitialized(true);
    };

    initApp();
  }, []);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <AppProvider>
        <WebSocketProvider>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route
              path='/role-selection'
              element={
                <AuthGuard>
                  <RoleSelectionPage />
                </AuthGuard>
              }
            />

            {/* Protected routes */}
            <Route
              path='/'
              element={
                <AuthGuard>
                  <AppLayout />
                </AuthGuard>
              }
            >
              <Route index element={<Navigate to='/dashboard' replace />} />
              <Route path='dashboard' element={<DashboardPage />} />
              <Route path='profile' element={<ProfilePage />} />
              <Route path='nudges' element={<NudgesPage />} />

              {/* Referral Partner Routes */}
              <Route path='referral'>
                <Route path='form' element={<ReferralFormPage />} />
                <Route path='tracker' element={<ReferralTrackerPage />} />
                <Route path='commission' element={<CommissionTrackerPage />} />
                <Route path='learn' element={<LearningHubPage />} />
              </Route>

              {/* Reseller Partner Routes */}
              <Route path='reseller'>
                <Route path='leads' element={<LeadPipelinePage />} />
                <Route path='docs' element={<DocumentUploadPage />} />
                <Route path='close' element={<CloseDealsPage />} />
                <Route path='commission' element={<ResellerCommissionPage />} />
                <Route path='playbooks' element={<GTMPlaybooksPage />} />
              </Route>

              {/* Service Partner Routes */}
              <Route path='service'>
                <Route path='assigned' element={<AssignedBrandsPage />} />
                <Route path='setup' element={<SetupTrackerPage />} />
                <Route path='docs' element={<TechDocumentationPage />} />
                <Route path='incentives' element={<IncentiveTrackerPage />} />
                <Route path='guides' element={<DeveloperGuidesPage />} />
              </Route>
            </Route>

            {/* Fallback route */}
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </WebSocketProvider>
      </AppProvider>
    </ConfigProvider>
  );
};

export default App;
