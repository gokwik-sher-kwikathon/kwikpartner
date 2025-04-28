import {
  AdminDashboardData,
  ExecutiveSummaryMetrics,
  PartnerActivationMetrics,
  LeadGenerationMetrics,
  RevenueImpactMetrics,
  EfficiencyMetrics,
  SatisfactionMetrics,
  TimeSeriesMetric,
} from '../types/adminDashboard';

// Helper function to generate time series data
const generateTimeSeriesData = (
  name: string,
  days: number,
  minValue: number,
  maxValue: number,
  trend: 'up' | 'down' | 'stable' = 'up',
): TimeSeriesMetric => {
  const data = [];
  const now = new Date();
  let value = minValue;

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Generate a value based on the trend
    if (trend === 'up') {
      value = value + (Math.random() * (maxValue - minValue)) / days;
    } else if (trend === 'down') {
      value = value - (Math.random() * (maxValue - minValue)) / days;
    } else {
      value = value + ((Math.random() * 2 - 1) * (maxValue - minValue)) / (days * 2);
    }

    // Keep value within bounds
    value = Math.max(minValue, Math.min(maxValue, value));

    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value * 100) / 100,
    });
  }

  return {
    name,
    data,
    target: maxValue,
  };
};

// Mock data for Executive Summary
const getExecutiveSummary = (): ExecutiveSummaryMetrics => {
  return {
    activePartners: {
      name: 'Active Partners',
      currentValue: 175,
      target: 250,
      unit: 'partners',
      trend: 12.5,
      description: 'Partners who have logged in and submitted at least one lead',
    },
    avgLeadsPerPartner: {
      name: 'Avg. Leads per Partner',
      currentValue: 1.8,
      target: 2.5,
      unit: 'leads',
      trend: 5.2,
      description: 'Average number of leads submitted per partner per month',
    },
    leadToActivationRate: {
      name: 'Lead-to-Activation Rate',
      currentValue: 22,
      target: 30,
      unit: '%',
      trend: 3.5,
      description: 'Percentage of submitted leads that go live',
    },
    revenueFromPartnerBrands: {
      name: 'Revenue from Partner Brands',
      currentValue: 18500000,
      target: 25000000,
      unit: '₹',
      trend: 15.8,
      description: 'Monthly revenue from brands sourced via KwikPartner',
    },
    salesCycleReduction: {
      name: 'Sales Cycle Reduction',
      currentValue: 42,
      target: 50,
      unit: '%',
      trend: 7.2,
      description: 'Reduction in time from lead to brand go-live',
    },
    partnerNPS: {
      name: 'Partner NPS',
      currentValue: 42,
      target: 50,
      unit: 'score',
      trend: 4.5,
      description: 'Net Promoter Score among agency partners',
    },
  };
};

// Mock data for Partner Activation Metrics
const getPartnerActivationMetrics = (): PartnerActivationMetrics => {
  return {
    activePartnersPercentage: {
      name: 'Active Partners',
      currentValue: 65,
      target: 70,
      unit: '%',
      trend: 8.3,
      description: 'Percentage of signed agencies actively using the portal',
    },
    timeToFirstLead: {
      name: 'Time to First Lead',
      currentValue: 12,
      target: 10,
      unit: 'days',
      trend: -5.2,
      description: 'Median days from portal access to first lead submitted',
    },
    portalEngagementRate: {
      name: 'Portal Engagement Rate',
      currentValue: 42,
      target: 50,
      unit: '%',
      trend: 6.7,
      description: 'Percentage of partners logging in weekly',
    },
    partnersByType: {
      referral: 120,
      reseller: 35,
      service: 20,
    },
    partnerActivity: generateTimeSeriesData('Partner Activity', 30, 30, 70, 'up'),
  };
};

// Mock data for Lead Generation Metrics
const getLeadGenerationMetrics = (): LeadGenerationMetrics => {
  return {
    avgLeadsPerPartner: {
      name: 'Avg. Leads/Partner/Month',
      currentValue: 1.8,
      target: 2.5,
      unit: 'leads',
      trend: 5.2,
      description: 'Average number of leads submitted per partner per month',
    },
    leadToKYCSubmissionRate: {
      name: 'Lead-to-KYC Submission Rate',
      currentValue: 52,
      target: 60,
      unit: '%',
      trend: 4.8,
      description: 'Percentage of submitted leads that complete KYC',
    },
    leadToActivationRate: {
      name: 'Lead-to-Activation Rate',
      currentValue: 22,
      target: 30,
      unit: '%',
      trend: 3.5,
      description: 'Percentage of submitted leads that go live',
    },
    leadsByStage: {
      prospecting: 85,
      pitch: 62,
      objection: 43,
      baShared: 28,
      signed: 15,
      goLive: 12,
    },
    leadsByProduct: {
      checkout: 120,
      rto: 65,
      engage: 45,
      other: 15,
    },
    leadConversionTrend: generateTimeSeriesData('Lead Conversion', 30, 15, 35, 'up'),
  };
};

// Mock data for Revenue Impact Metrics
const getRevenueImpactMetrics = (): RevenueImpactMetrics => {
  return {
    monthlyRevenueFromPartners: {
      name: 'Monthly Revenue from Partner-Led Brands',
      currentValue: 18500000,
      target: 25000000,
      unit: '₹',
      trend: 15.8,
      description: 'Revenue contribution from brands sourced via KwikPartner',
    },
    avgRevenuePerPartner: {
      name: 'Avg. Revenue per Activated Partner',
      currentValue: 85000,
      target: 100000,
      unit: '₹',
      trend: 7.2,
      description: 'Average monthly GMV-linked revenue contribution per active agency',
    },
    revenueToPayout: {
      name: 'Revenue-to-Payout Ratio',
      currentValue: 4.2,
      target: 5,
      unit: 'ratio',
      trend: 3.1,
      description: 'Revenue generated vs. commissions paid',
    },
    revenueByPartnerType: {
      referral: 8500000,
      reseller: 7200000,
      service: 2800000,
    },
    revenueByProduct: {
      checkout: 9800000,
      rto: 5200000,
      engage: 2800000,
      other: 700000,
    },
    revenueTrend: generateTimeSeriesData('Monthly Revenue', 30, 12000000, 20000000, 'up'),
  };
};

// Mock data for Efficiency Metrics
const getEfficiencyMetrics = (): EfficiencyMetrics => {
  return {
    salesCycleReduction: {
      name: 'Reduction in Avg. Sales Cycle Time',
      currentValue: 42,
      target: 50,
      unit: '%',
      trend: 7.2,
      description: 'Reduction in time from lead to brand go-live',
    },
    salesTeamLoadReduction: {
      name: 'Sales Team Load Reduction',
      currentValue: 48,
      target: 60,
      unit: '%',
      trend: 9.5,
      description: 'Percentage of new activations fully managed by partners',
    },
    avgDaysToActivation: {
      direct: 12,
      partnerLed: 7,
    },
    activationsByType: {
      partnerLed: 48,
      salesTeamAssisted: 52,
    },
    efficiencyTrend: generateTimeSeriesData('Efficiency', 30, 30, 60, 'up'),
  };
};

// Mock data for Satisfaction Metrics
const getSatisfactionMetrics = (): SatisfactionMetrics => {
  return {
    partnerNPS: {
      name: 'Partner NPS',
      currentValue: 42,
      target: 50,
      unit: 'score',
      trend: 4.5,
      description: 'Net Promoter Score among agency partners',
    },
    commissionPayoutAccuracy: {
      name: 'Commission Payout Accuracy',
      currentValue: 92,
      target: 95,
      unit: '%',
      trend: 1.8,
      description: 'Percentage of commissions paid on time without disputes',
    },
    partnerFeedback: [
      {
        partnerId: 'p1',
        partnerName: 'Digital Marketing Pro',
        score: 9,
        feedback: 'Great platform, easy to use and track commissions.',
        date: '2025-04-15',
      },
      {
        partnerId: 'p2',
        partnerName: 'E-commerce Solutions',
        score: 8,
        feedback: 'Good experience overall, but would like more training resources.',
        date: '2025-04-12',
      },
      {
        partnerId: 'p3',
        partnerName: 'Tech Integrators',
        score: 7,
        feedback: 'Documentation is helpful, but API integration could be smoother.',
        date: '2025-04-10',
      },
      {
        partnerId: 'p4',
        partnerName: 'Growth Hackers',
        score: 9,
        feedback: 'Love the commission structure and transparent tracking.',
        date: '2025-04-08',
      },
      {
        partnerId: 'p5',
        partnerName: 'Digital Ninjas',
        score: 6,
        feedback: 'Platform is good but payment cycles could be faster.',
        date: '2025-04-05',
      },
    ],
    satisfactionTrend: generateTimeSeriesData('Partner Satisfaction', 30, 35, 50, 'up'),
  };
};

// Main function to get all admin dashboard data
export const getAdminDashboardData = async (): Promise<AdminDashboardData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    executiveSummary: getExecutiveSummary(),
    partnerActivation: getPartnerActivationMetrics(),
    leadGeneration: getLeadGenerationMetrics(),
    revenueImpact: getRevenueImpactMetrics(),
    efficiency: getEfficiencyMetrics(),
    satisfaction: getSatisfactionMetrics(),
  };
};

// Function to get specific sections of the dashboard data
export const getExecutiveSummaryData = async (): Promise<ExecutiveSummaryMetrics> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return getExecutiveSummary();
};

export const getPartnerActivationData = async (): Promise<PartnerActivationMetrics> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return getPartnerActivationMetrics();
};

export const getLeadGenerationData = async (): Promise<LeadGenerationMetrics> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return getLeadGenerationMetrics();
};

export const getRevenueImpactData = async (): Promise<RevenueImpactMetrics> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return getRevenueImpactMetrics();
};

export const getEfficiencyData = async (): Promise<EfficiencyMetrics> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return getEfficiencyMetrics();
};

export const getSatisfactionData = async (): Promise<SatisfactionMetrics> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return getSatisfactionMetrics();
};
