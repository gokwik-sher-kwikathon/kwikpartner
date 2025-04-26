import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions for mock data
const readMockData = (filename) => {
  try {
    const filePath = path.join(__dirname, 'mock-data', `${filename}.json`);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error(`Error reading ${filename}.json:`, error);
    return [];
  }
};

const writeMockData = (filename, data) => {
  try {
    const dirPath = path.join(__dirname, 'mock-data');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, `${filename}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}.json:`, error);
    return false;
  }
};

// Initialize mock data if it doesn't exist
const initializeMockData = () => {
  // Users data
  if (!fs.existsSync(path.join(__dirname, 'mock-data', 'users.json'))) {
    const users = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password', // In a real app, this would be hashed
        role: 'referralPartner',
        agency: 'Digital Marketing Agency',
        contact: '+91 9876543210',
        profileComplete: true,
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password',
        role: 'resellerPartner',
        agency: 'Tech Solutions Inc.',
        contact: '+91 9876543211',
        profileComplete: true,
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: 'password',
        role: 'servicePartner',
        agency: 'Web Development Co.',
        contact: '+91 9876543212',
        profileComplete: true,
      },
    ];
    writeMockData('users', users);
  }

  // Referrals data
  if (!fs.existsSync(path.join(__dirname, 'mock-data', 'referrals.json'))) {
    const referrals = [
      {
        id: 'ref-1',
        partnerId: '1',
        brandName: 'Fashion Store',
        contactName: 'Alice Brown',
        contactEmail: 'alice@fashionstore.com',
        contactPhone: '+91 9876543220',
        monthlyGMV: 500000,
        vertical: 'fashion',
        platform: 'shopify',
        product: 'checkout',
        stage: 'signed',
        stageUpdatedAt: '2025-04-20T10:30:00Z',
        commissionEarned: 15000,
        commissionPending: 0,
        notes: 'High-end fashion brand with good potential',
        activities: [
          {
            date: '2025-04-10T08:30:00Z',
            action: 'Referral Created',
            user: 'John Doe',
          },
          {
            date: '2025-04-15T14:20:00Z',
            action: 'Demo Scheduled',
            user: 'John Doe',
          },
          {
            date: '2025-04-20T10:30:00Z',
            action: 'Contract Signed',
            user: 'GoKwik Sales',
          },
        ],
      },
      {
        id: 'ref-2',
        partnerId: '1',
        brandName: 'Tech Gadgets',
        contactName: 'David Lee',
        contactEmail: 'david@techgadgets.com',
        contactPhone: '+91 9876543221',
        monthlyGMV: 800000,
        vertical: 'electronics',
        platform: 'woocommerce',
        product: 'rto',
        stage: 'pitch',
        stageUpdatedAt: '2025-04-22T09:15:00Z',
        commissionEarned: 0,
        commissionPending: 0,
        notes: 'Interested in reducing RTO rates',
        activities: [
          {
            date: '2025-04-22T09:15:00Z',
            action: 'Referral Created',
            user: 'John Doe',
          },
        ],
      },
      {
        id: 'ref-3',
        partnerId: '2',
        brandName: 'Beauty Brand',
        contactName: 'Emma Wilson',
        contactEmail: 'emma@beautybrand.com',
        contactPhone: '+91 9876543222',
        monthlyGMV: 350000,
        vertical: 'beauty',
        platform: 'magento',
        product: 'all',
        stage: 'ba_shared',
        stageUpdatedAt: '2025-04-18T16:45:00Z',
        commissionEarned: 0,
        commissionPending: 17500,
        notes: 'Looking for full suite of solutions',
        activities: [
          {
            date: '2025-04-12T11:30:00Z',
            action: 'Referral Created',
            user: 'Jane Smith',
          },
          {
            date: '2025-04-15T13:20:00Z',
            action: 'Initial Call',
            user: 'Jane Smith',
          },
          {
            date: '2025-04-18T16:45:00Z',
            action: 'Business Agreement Shared',
            user: 'GoKwik Sales',
          },
        ],
      },
    ];
    writeMockData('referrals', referrals);
  }

  // Commissions data
  if (!fs.existsSync(path.join(__dirname, 'mock-data', 'commissions.json'))) {
    const commissions = [
      {
        id: 'comm-1',
        referralId: 'ref-1',
        partnerId: '1',
        amount: 15000,
        status: 'paid',
        paidDate: '2025-04-22T00:00:00Z',
        calculationDetails: {
          baseRate: 0.03,
          tier: 'standard',
          bonuses: 0,
        },
      },
      {
        id: 'comm-2',
        referralId: 'ref-3',
        partnerId: '2',
        amount: 17500,
        status: 'pending',
        paidDate: null,
        calculationDetails: {
          baseRate: 0.05,
          tier: 'standard',
          bonuses: 0,
        },
      },
    ];
    writeMockData('commissions', commissions);
  }

  // Learning content data
  if (!fs.existsSync(path.join(__dirname, 'mock-data', 'learning.json'))) {
    const learning = [
      {
        id: 'learn-1',
        title: 'How to Pitch GoKwik Checkout',
        type: 'article',
        content: 'This guide explains the key selling points of GoKwik Checkout...',
        tags: ['checkout', 'sales', 'pitch'],
        relevantProducts: ['checkout'],
        relevantVerticals: ['all'],
        relevantRoles: ['referralPartner', 'resellerPartner'],
      },
      {
        id: 'learn-2',
        title: 'Understanding RTO Prime for Fashion',
        type: 'video',
        content: 'https://example.com/videos/rto-fashion',
        tags: ['rto', 'fashion', 'returns'],
        relevantProducts: ['rto'],
        relevantVerticals: ['fashion'],
        relevantRoles: ['referralPartner', 'resellerPartner'],
      },
      {
        id: 'learn-3',
        title: 'Technical Integration Guide',
        type: 'document',
        content: 'https://example.com/docs/integration-guide',
        tags: ['integration', 'technical', 'api'],
        relevantProducts: ['all'],
        relevantVerticals: ['all'],
        relevantRoles: ['servicePartner'],
      },
      {
        id: 'learn-4',
        title: 'Commission Structure Explained',
        type: 'article',
        content: 'This guide explains how commissions are calculated...',
        tags: ['commission', 'earnings', 'finance'],
        relevantProducts: ['all'],
        relevantVerticals: ['all'],
        relevantRoles: ['referralPartner', 'resellerPartner', 'servicePartner'],
      },
    ];
    writeMockData('learning', learning);
  }
};

// Initialize mock data
initializeMockData();

// Auth Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const users = readMockData('users');

  // Simulate API delay
  setTimeout(() => {
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      // Generate mock JWT
      const token = `mock-jwt-${Date.now()}`;

      res.json({
        user: userWithoutPassword,
        token,
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  }, 500);
});

app.get('/api/auth/profile', (req, res) => {
  // In a real app, we would verify the JWT token
  // For this mock, we'll just return a user based on the ID in the header
  const userId = req.headers['user-id'] || '1';
  const users = readMockData('users');

  const user = users.find((u) => u.id === userId);

  if (user) {
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.put('/api/auth/profile', (req, res) => {
  const userId = req.headers['user-id'] || '1';
  const userData = req.body;
  const users = readMockData('users');

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex !== -1) {
    // Update user data, preserving the password
    const updatedUser = {
      ...users[userIndex],
      ...userData,
      // Ensure password is not updated through this endpoint
      password: users[userIndex].password,
    };

    users[userIndex] = updatedUser;

    if (writeMockData('users', users)) {
      // Remove password from response
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } else {
      res.status(500).json({ error: 'Failed to update profile' });
    }
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.put('/api/auth/role', (req, res) => {
  const userId = req.headers['user-id'] || '1';
  const { role } = req.body;
  const users = readMockData('users');

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex !== -1) {
    // Update user role
    users[userIndex].role = role;

    if (writeMockData('users', users)) {
      // Remove password from response
      const { password, ...userWithoutPassword } = users[userIndex];
      res.json(userWithoutPassword);
    } else {
      res.status(500).json({ error: 'Failed to update role' });
    }
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Referral Routes
app.post('/api/referrals', (req, res) => {
  const userId = req.headers['user-id'] || '1';
  const referralData = req.body;
  const referrals = readMockData('referrals');

  // Create new referral
  const newReferral = {
    id: `ref-${Date.now()}`,
    partnerId: userId,
    stageUpdatedAt: new Date().toISOString(),
    commissionEarned: 0,
    commissionPending: 0,
    activities: [
      {
        date: new Date().toISOString(),
        action: 'Referral Created',
        user: referralData.createdBy || 'Partner',
      },
    ],
    ...referralData,
  };

  referrals.push(newReferral);

  if (writeMockData('referrals', referrals)) {
    res.status(201).json(newReferral);
  } else {
    res.status(500).json({ error: 'Failed to create referral' });
  }
});

app.get('/api/referrals', (req, res) => {
  const userId = req.headers['user-id'] || '1';
  const referrals = readMockData('referrals');

  // Filter referrals by partner ID
  const partnerReferrals = referrals.filter((r) => r.partnerId === userId);

  res.json(partnerReferrals);
});

app.get('/api/referrals/:id', (req, res) => {
  const { id } = req.params;
  const referrals = readMockData('referrals');

  const referral = referrals.find((r) => r.id === id);

  if (referral) {
    res.json(referral);
  } else {
    res.status(404).json({ error: 'Referral not found' });
  }
});

app.put('/api/referrals/:id/stage', (req, res) => {
  const { id } = req.params;
  const { stage } = req.body;
  const referrals = readMockData('referrals');

  const referralIndex = referrals.findIndex((r) => r.id === id);

  if (referralIndex !== -1) {
    // Update referral stage
    referrals[referralIndex].stage = stage;
    referrals[referralIndex].stageUpdatedAt = new Date().toISOString();

    // Add activity
    referrals[referralIndex].activities.push({
      date: new Date().toISOString(),
      action: `Stage updated to ${stage}`,
      user: req.body.updatedBy || 'System',
    });

    if (writeMockData('referrals', referrals)) {
      res.json(referrals[referralIndex]);
    } else {
      res.status(500).json({ error: 'Failed to update referral stage' });
    }
  } else {
    res.status(404).json({ error: 'Referral not found' });
  }
});

app.post('/api/referrals/:id/activity', (req, res) => {
  const { id } = req.params;
  const { action, user } = req.body;
  const referrals = readMockData('referrals');

  const referralIndex = referrals.findIndex((r) => r.id === id);

  if (referralIndex !== -1) {
    // Add activity
    const newActivity = {
      date: new Date().toISOString(),
      action,
      user: user || 'System',
    };

    referrals[referralIndex].activities.push(newActivity);

    if (writeMockData('referrals', referrals)) {
      res.json(newActivity);
    } else {
      res.status(500).json({ error: 'Failed to add activity' });
    }
  } else {
    res.status(404).json({ error: 'Referral not found' });
  }
});

// Commission Routes
app.get('/api/commissions', (req, res) => {
  const userId = req.headers['user-id'] || '1';
  const commissions = readMockData('commissions');

  // Filter commissions by partner ID
  const partnerCommissions = commissions.filter((c) => c.partnerId === userId);

  res.json(partnerCommissions);
});

app.get('/api/commissions/:id', (req, res) => {
  const { id } = req.params;
  const commissions = readMockData('commissions');

  const commission = commissions.find((c) => c.id === id);

  if (commission) {
    res.json(commission);
  } else {
    res.status(404).json({ error: 'Commission not found' });
  }
});

app.post('/api/commissions/calculate', (req, res) => {
  const { role, monthlyGMV, product, vertical } = req.body;

  let baseRate = 0;

  // Base rates by role
  switch (role) {
    case 'referralPartner':
      baseRate = 0.03; // 3%
      break;
    case 'resellerPartner':
      baseRate = 0.05; // 5%
      break;
    case 'servicePartner':
      // Fixed amount per integration
      return res.json({
        amount: 10000,
        details: {
          calculation: 'Fixed incentive per integration',
        },
      });
  }

  // Adjust for product
  let productMultiplier = 1;
  if (product === 'checkout') productMultiplier = 1.2;
  if (product === 'rto') productMultiplier = 1.1;

  // Calculate commission
  const commission = monthlyGMV * baseRate * productMultiplier;

  res.json({
    amount: commission,
    details: {
      baseRate,
      productMultiplier,
      calculation: `${monthlyGMV} × ${baseRate} × ${productMultiplier}`,
    },
  });
});

app.get('/api/commissions/forecast', (req, res) => {
  const userId = req.headers['user-id'] || '1';
  const referrals = readMockData('referrals');

  // Filter referrals by partner ID
  const partnerReferrals = referrals.filter((r) => r.partnerId === userId);

  // Calculate forecast based on referral stages
  const forecast = {
    nextMonth: 0,
    nextQuarter: 0,
    annual: 0,
  };

  partnerReferrals.forEach((referral) => {
    let probability = 0;

    // Assign probability based on stage
    switch (referral.stage) {
      case 'prospecting':
        probability = 0.1;
        break;
      case 'pitch':
        probability = 0.3;
        break;
      case 'objection':
        probability = 0.5;
        break;
      case 'ba_shared':
        probability = 0.7;
        break;
      case 'signed':
        probability = 0.9;
        break;
      case 'go_live':
        probability = 1.0;
        break;
      default:
        probability = 0;
    }

    // Calculate potential commission
    let baseRate = 0.03; // Default to referral partner rate

    // Get user to determine role
    const users = readMockData('users');
    const user = users.find((u) => u.id === userId);

    if (user) {
      if (user.role === 'resellerPartner') {
        baseRate = 0.05;
      } else if (user.role === 'servicePartner') {
        // Fixed amount, not GMV-based
        const potentialCommission = 10000 * probability;
        forecast.nextMonth += potentialCommission;
        forecast.nextQuarter += potentialCommission;
        forecast.annual += potentialCommission;
        return; // Skip the rest of this iteration
      }
    }

    // Product multiplier
    let productMultiplier = 1;
    if (referral.product === 'checkout') productMultiplier = 1.2;
    if (referral.product === 'rto') productMultiplier = 1.1;

    const potentialCommission = referral.monthlyGMV * baseRate * productMultiplier * probability;

    // Add to forecasts
    forecast.nextMonth += potentialCommission;
    forecast.nextQuarter += potentialCommission * 3;
    forecast.annual += potentialCommission * 12;
  });

  res.json(forecast);
});

// Learning Content Routes
app.get('/api/learning', (req, res) => {
  const learning = readMockData('learning');
  res.json(learning);
});

app.get('/api/learning/recommended', (req, res) => {
  const userId = req.headers['user-id'] || '1';
  const role = req.query.role;
  const product = req.query.product;
  const vertical = req.query.vertical;

  const learning = readMockData('learning');

  // Filter by role if provided
  let filtered = learning;
  if (role) {
    filtered = filtered.filter((item) => item.relevantRoles.includes(role));
  }

  // Further filter by product if provided
  if (product) {
    filtered = filtered.filter(
      (item) => item.relevantProducts.includes(product) || item.relevantProducts.includes('all'),
    );
  }

  // Further filter by vertical if provided
  if (vertical) {
    filtered = filtered.filter(
      (item) => item.relevantVerticals.includes(vertical) || item.relevantVerticals.includes('all'),
    );
  }

  // Return top 3 recommendations
  res.json(filtered.slice(0, 3));
});

app.get('/api/learning/:id', (req, res) => {
  const { id } = req.params;
  const learning = readMockData('learning');

  const content = learning.find((item) => item.id === id);

  if (content) {
    res.json(content);
  } else {
    res.status(404).json({ error: 'Learning content not found' });
  }
});

// AI Features Routes
app.post('/api/ai/chat', (req, res) => {
  const { question } = req.body;

  // Simple keyword matching for mock responses
  let response = "I'm EIDA, your partner assistant. How can I help you today?";

  if (question.toLowerCase().includes('pitch')) {
    response =
      'To pitch GoKwik effectively, focus on how our solutions reduce RTO rates, improve checkout conversion, and increase GMV. For fashion brands specifically, emphasize our Return Prime solution that reduces returns fraud.';
  } else if (question.toLowerCase().includes('commission')) {
    response =
      'Commissions are calculated based on the monthly GMV of the referred brand and your partner tier. Referral partners earn 3% base rate, while reseller partners earn 5%. Service partners receive fixed incentives per integration.';
  } else if (question.toLowerCase().includes('checkout')) {
    response =
      'GoKwik Checkout is our flagship product that offers a seamless one-click checkout experience with address verification and RTO prediction. It typically improves conversion rates by 25-30%.';
  } else if (question.toLowerCase().includes('document') || question.toLowerCase().includes('kyc')) {
    response =
      'For KYC, brands need to submit: Business PAN, GST certificate, bank account details, and authorized signatory details. You can upload these in the Documents section.';
  }

  // Simulate API delay
  setTimeout(() => {
    res.json({ answer: response });
  }, 1000);
});

app.get('/api/ai/nudges', (req, res) => {
  const userId = req.headers['user-id'] || '1';
  const referrals = readMockData('referrals');

  // Filter referrals by partner ID
  const partnerReferrals = referrals.filter((r) => r.partnerId === userId);

  const nudges = [];

  partnerReferrals.forEach((referral) => {
    const stageUpdatedAt = new Date(referral.stageUpdatedAt);
    const now = new Date();
    const daysSinceUpdate = Math.floor((now - stageUpdatedAt) / (1000 * 60 * 60 * 24));

    // Stuck in pitch stage for 3+ days
    if (referral.stage === 'pitch' && daysSinceUpdate >= 3) {
      nudges.push({
        id: `nudge-${referral.id}-1`,
        referralId: referral.id,
        message: `Time to schedule a demo call for ${referral.brandName}`,
        priority: 'high',
        action: 'Schedule Demo',
      });
    }

    // Stuck in BA shared stage for 5+ days
    if (referral.stage === 'ba_shared' && daysSinceUpdate >= 5) {
      nudges.push({
        id: `nudge-${referral.id}-2`,
        referralId: referral.id,
        message: `Remind ${referral.brandName} to upload KYC documents`,
        priority: 'medium',
        action: 'Send Reminder',
      });
    }

    // No activity for 7+ days
    if (daysSinceUpdate >= 7) {
      nudges.push({
        id: `nudge-${referral.id}-3`,
        referralId: referral.id,
        message: `No activity on ${referral.brandName} for ${daysSinceUpdate} days`,
        priority: 'low',
        action: 'Check Status',
      });
    }
  });

  res.json(nudges);
});

app.post('/api/ai/analyze-doc', (req, res) => {
  // In a real app, this would use AI to analyze the document
  // For this mock, we'll return predefined data

  res.json({
    extractedData: {
      brandName: 'Sample Brand',
      contactName: 'Contact Person',
      contactEmail: 'contact@samplebrand.com',
      contactPhone: '+91 9876543299',
      monthlyGMV: 450000,
      vertical: 'fashion',
      platform: 'shopify',
    },
    confidence: 0.85,
  });
});

app.post('/api/ai/gtm-strategy', (req, res) => {
  const { vertical, monthlyGMV } = req.body;

  let recommendedProducts = [];
  let pitchPoints = [];

  // Recommendations based on vertical
  switch (vertical) {
    case 'fashion':
      recommendedProducts = ['checkout', 'rto'];
      pitchPoints = ['Reduce RTO rates by up to 30%', 'Improve checkout conversion by 25%', 'Reduce cart abandonment'];
      break;
    case 'electronics':
      recommendedProducts = ['checkout', 'engage'];
      pitchPoints = [
        'Increase average order value',
        'Improve customer trust with address verification',
        'Enhance post-purchase experience',
      ];
      break;
    case 'beauty':
      recommendedProducts = ['checkout', 'engage', 'rto'];
      pitchPoints = [
        'Comprehensive solution for the entire customer journey',
        'Reduce returns and improve cash flow',
        'Enhance customer engagement',
      ];
      break;
    default:
      recommendedProducts = ['checkout'];
      pitchPoints = ['Improve checkout experience', 'Increase conversion rates', 'Enhance customer trust'];
  }

  // Adjust based on GMV
  if (monthlyGMV > 1000000) {
    recommendedProducts.push('premium_support');
    pitchPoints.push('Dedicated account manager for high-volume brands');
  }

  res.json({
    recommendedProducts,
    pitchPoints,
    estimatedImpact: {
      conversionIncrease: '25-30%',
      rtoReduction: '20-35%',
      gmvGrowth: '15-20%',
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock API server running on port ${PORT}`);
});
