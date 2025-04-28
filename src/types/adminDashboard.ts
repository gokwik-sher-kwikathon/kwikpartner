// Admin Dashboard Types

// Base metric type with target
export interface TargetMetric {
  name: string;
  currentValue: number;
  target: number;
  unit: string;
  trend?: number; // percentage change
  description?: string;
}

// Time series data for charts
export interface TimeSeriesMetric {
  name: string;
  data: Array<{
    date: string;
    value: number;
  }>;
  target?: number;
}

// Executive Summary Metrics
export interface ExecutiveSummaryMetrics {
  activePartners: TargetMetric;
  avgLeadsPerPartner: TargetMetric;
  leadToActivationRate: TargetMetric;
  revenueFromPartnerBrands: TargetMetric;
  salesCycleReduction: TargetMetric;
  partnerNPS: TargetMetric;
}

// Partner Activation Metrics
export interface PartnerActivationMetrics {
  activePartnersPercentage: TargetMetric;
  timeToFirstLead: TargetMetric;
  portalEngagementRate: TargetMetric;
  partnersByType: {
    referral: number;
    reseller: number;
    service: number;
  };
  partnerActivity: TimeSeriesMetric;
}

// Lead Generation & Conversion Metrics
export interface LeadGenerationMetrics {
  avgLeadsPerPartner: TargetMetric;
  leadToKYCSubmissionRate: TargetMetric;
  leadToActivationRate: TargetMetric;
  leadsByStage: {
    prospecting: number;
    pitch: number;
    objection: number;
    baShared: number;
    signed: number;
    goLive: number;
  };
  leadsByProduct: {
    checkout: number;
    rto: number;
    engage: number;
    other: number;
  };
  leadConversionTrend: TimeSeriesMetric;
}

// Revenue Impact Metrics
export interface RevenueImpactMetrics {
  monthlyRevenueFromPartners: TargetMetric;
  avgRevenuePerPartner: TargetMetric;
  revenueToPayout: TargetMetric;
  revenueByPartnerType: {
    referral: number;
    reseller: number;
    service: number;
  };
  revenueByProduct: {
    checkout: number;
    rto: number;
    engage: number;
    other: number;
  };
  revenueTrend: TimeSeriesMetric;
}

// Efficiency & Cost Metrics
export interface EfficiencyMetrics {
  salesCycleReduction: TargetMetric;
  salesTeamLoadReduction: TargetMetric;
  avgDaysToActivation: {
    direct: number;
    partnerLed: number;
  };
  activationsByType: {
    partnerLed: number;
    salesTeamAssisted: number;
  };
  efficiencyTrend: TimeSeriesMetric;
}

// Partner Satisfaction Metrics
export interface SatisfactionMetrics {
  partnerNPS: TargetMetric;
  commissionPayoutAccuracy: TargetMetric;
  partnerFeedback: Array<{
    partnerId: string;
    partnerName: string;
    score: number;
    feedback: string;
    date: string;
  }>;
  satisfactionTrend: TimeSeriesMetric;
}

// Combined Admin Dashboard Data
export interface AdminDashboardData {
  executiveSummary: ExecutiveSummaryMetrics;
  partnerActivation: PartnerActivationMetrics;
  leadGeneration: LeadGenerationMetrics;
  revenueImpact: RevenueImpactMetrics;
  efficiency: EfficiencyMetrics;
  satisfaction: SatisfactionMetrics;
}
