import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// Types
export type UserRole = 'referralPartner' | 'resellerPartner' | 'servicePartner';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  agency: string;
  contact: string;
  profileComplete: boolean;
}

export interface Referral {
  id: string;
  partnerId: string;
  brandName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  monthlyGMV: number;
  vertical: string;
  platform: string;
  product: string;
  stage: string;
  stageUpdatedAt: string;
  commissionEarned: number;
  commissionPending: number;
  notes: string;
  activities: Array<{
    date: string;
    action: string;
    user: string;
  }>;
}

export interface Commission {
  id: string;
  referralId: string;
  partnerId: string;
  amount: number;
  status: 'pending' | 'paid';
  paidDate: string | null;
  calculationDetails: {
    baseRate: number;
    tier: string;
    bonuses: number;
  };
}

export interface LearningContent {
  id: string;
  title: string;
  type: string;
  content: string;
  tags: string[];
  relevantProducts: string[];
  relevantVerticals: string[];
  relevantRoles: UserRole[];
}

export interface Nudge {
  id: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
  referralId?: string;
  action: string;
}

// State interface
interface AppState {
  user: User | null;
  token: string | null;
  referrals: Referral[];
  commissions: Commission[];
  nudges: Nudge[];
  learningContent: LearningContent[];
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: AppState = {
  user: null,
  token: null,
  referrals: [],
  commissions: [],
  nudges: [],
  learningContent: [],
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Action types
type ActionType =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_TOKEN'; payload: string | null }
  | { type: 'SET_REFERRALS'; payload: Referral[] }
  | { type: 'ADD_REFERRAL'; payload: Referral }
  | { type: 'UPDATE_REFERRAL'; payload: Referral }
  | { type: 'UPDATE_REFERRAL_PARTIAL'; payload: { id: string; updates: Partial<Referral> } }
  | { type: 'SET_COMMISSIONS'; payload: Commission[] }
  | { type: 'SET_NUDGES'; payload: Nudge[] }
  | { type: 'ADD_NUDGE'; payload: Nudge }
  | { type: 'SET_LEARNING_CONTENT'; payload: LearningContent[] }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Reducer
const appReducer = (state: AppState, action: ActionType): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'SET_REFERRALS':
      return { ...state, referrals: action.payload };
    case 'ADD_REFERRAL':
      return { ...state, referrals: [...state.referrals, action.payload] };
    case 'UPDATE_REFERRAL':
      return {
        ...state,
        referrals: state.referrals.map((ref) => (ref.id === action.payload.id ? action.payload : ref)),
      };
    case 'UPDATE_REFERRAL_PARTIAL':
      return {
        ...state,
        referrals: state.referrals.map((ref) =>
          ref.id === action.payload.id ? { ...ref, ...action.payload.updates } : ref,
        ),
      };
    case 'SET_COMMISSIONS':
      return { ...state, commissions: action.payload };
    case 'SET_NUDGES':
      return { ...state, nudges: action.payload };
    case 'ADD_NUDGE':
      return { ...state, nudges: [action.payload, ...state.nudges] };
    case 'SET_LEARNING_CONTENT':
      return { ...state, learningContent: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Create context
interface AppContextProps {
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => Promise<void>;
  submitReferral: (
    referral: Omit<
      Referral,
      'id' | 'partnerId' | 'stageUpdatedAt' | 'commissionEarned' | 'commissionPending' | 'activities'
    >,
  ) => Promise<void>;
  calculateCommission: (data: {
    role: UserRole;
    monthlyGMV: number;
    product: string;
    vertical: string;
  }) => Promise<{ amount: number; details: any }>;
  askEida: (question: string) => Promise<string>;
  addNudge: (nudge: Nudge) => void;
  updateReferral: (referralId: string, updates: Partial<Referral>) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Auth functions
  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null }); // Clear any previous errors

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data
      const user: User = {
        id: '1',
        name: 'John Doe',
        email,
        role: 'referralPartner',
        agency: 'Digital Marketing Agency',
        contact: '+91 9876543210',
        profileComplete: true,
      };

      // Mock token
      const token = 'mock-jwt-token';

      // Set user in state and localStorage
      dispatch({ type: 'SET_USER', payload: user });
      dispatch({ type: 'SET_TOKEN', payload: token });
      dispatch({ type: 'SET_AUTHENTICATED', payload: true });
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      return Promise.resolve(); // Explicitly return resolved promise
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Login failed. Please try again.' });
      return Promise.reject(error); // Explicitly reject promise
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false }); // Always reset loading state
    }
  };

  const logout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'SET_TOKEN', payload: null });
    dispatch({ type: 'SET_AUTHENTICATED', payload: false });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const switchRole = async (role: UserRole) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (state.user) {
        const updatedUser = { ...state.user, role };
        dispatch({ type: 'SET_USER', payload: updatedUser });
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to switch role. Please try again.' });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Referral functions
  const submitReferral = async (
    referral: Omit<
      Referral,
      'id' | 'partnerId' | 'stageUpdatedAt' | 'commissionEarned' | 'commissionPending' | 'activities'
    >,
  ) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create new referral with generated ID and default values
      const newReferral: Referral = {
        id: `ref-${Date.now()}`,
        partnerId: state.user?.id || '',
        stageUpdatedAt: new Date().toISOString(),
        commissionEarned: 0,
        commissionPending: 0,
        activities: [
          {
            date: new Date().toISOString(),
            action: 'Referral Created',
            user: state.user?.name || '',
          },
        ],
        ...referral,
      };

      dispatch({ type: 'ADD_REFERRAL', payload: newReferral });
      dispatch({ type: 'SET_LOADING', payload: false });

      return Promise.resolve();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to submit referral. Please try again.' });
      dispatch({ type: 'SET_LOADING', payload: false });
      return Promise.reject(error);
    }
  };

  // Update a referral with partial data (for real-time updates)
  const updateReferral = (referralId: string, updates: Partial<Referral>) => {
    dispatch({
      type: 'UPDATE_REFERRAL_PARTIAL',
      payload: { id: referralId, updates },
    });
  };

  // Add a new nudge notification
  const addNudge = (nudge: Nudge) => {
    dispatch({ type: 'ADD_NUDGE', payload: nudge });
  };

  // Commission functions
  const calculateCommission = async (data: {
    role: UserRole;
    monthlyGMV: number;
    product: string;
    vertical: string;
  }) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const { role, monthlyGMV, product } = data;

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
          dispatch({ type: 'SET_LOADING', payload: false });
          return { amount: 10000, details: 'Fixed incentive per integration' };
      }

      // Adjust for product
      let productMultiplier = 1;
      if (product === 'checkout') productMultiplier = 1.2;
      if (product === 'rto') productMultiplier = 1.1;

      // Calculate commission
      const commission = monthlyGMV * baseRate * productMultiplier;

      dispatch({ type: 'SET_LOADING', payload: false });

      return {
        amount: commission,
        details: {
          baseRate,
          productMultiplier,
          calculation: `${monthlyGMV} × ${baseRate} × ${productMultiplier}`,
        },
      };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to calculate commission. Please try again.' });
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  // AI functions
  const askEida = async (question: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

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

      dispatch({ type: 'SET_LOADING', payload: false });

      return response;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to get response from EIDA. Please try again.' });
      dispatch({ type: 'SET_LOADING', payload: false });
      return 'Sorry, I encountered an error. Please try again later.';
    }
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        login,
        logout,
        switchRole,
        submitReferral,
        calculateCommission,
        askEida,
        addNudge,
        updateReferral,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
