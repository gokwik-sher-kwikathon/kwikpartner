import axios from 'axios';

// This would be provided by the user or stored in environment variables
let OPENAI_API_KEY: string | null = null;

/**
 * Configure the OpenAI API key
 * @param apiKey The OpenAI API key
 */
export const configureOpenAI = (apiKey: string) => {
  OPENAI_API_KEY = apiKey;
};

/**
 * Check if OpenAI is configured
 * @returns True if the API key is set, false otherwise
 */
export const isOpenAIConfigured = (): boolean => {
  return OPENAI_API_KEY !== null;
};

/**
 * Create an axios instance for OpenAI API calls
 * @returns Axios instance configured for OpenAI
 */
const createOpenAIClient = () => {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  return axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
  });
};

/**
 * Generate a nudge based on referral data
 * @param referralData Referral data to base the nudge on
 * @param partnerData Partner data to personalize the nudge
 * @returns Generated nudge message
 */
export const generateNudge = async (referralData: any, partnerData: any): Promise<string> => {
  try {
    if (!isOpenAIConfigured()) {
      // Return a mock response if OpenAI is not configured
      return mockGenerateNudge(referralData, partnerData);
    }

    const openaiClient = createOpenAIClient();

    const response = await openaiClient.post('/chat/completions', {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are an AI assistant for a partner portal called KwikPartner. Generate a helpful nudge for a partner based on their referral data.',
        },
        {
          role: 'user',
          content: `Generate a helpful nudge for a partner based on this referral data: ${JSON.stringify(
            referralData,
          )} and partner data: ${JSON.stringify(partnerData)}`,
        },
      ],
      max_tokens: 150,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    // Fall back to mock response if API call fails
    return mockGenerateNudge(referralData, partnerData);
  }
};

/**
 * Predict earnings based on referral data and historical performance
 * @param referralData Current referral data
 * @param historicalData Historical performance data
 * @returns Predicted earnings and insights
 */
export const predictEarnings = async (referralData: any[], historicalData: any[]): Promise<any> => {
  try {
    if (!isOpenAIConfigured()) {
      // Return a mock response if OpenAI is not configured
      return mockPredictEarnings(referralData, historicalData);
    }

    const openaiClient = createOpenAIClient();

    const response = await openaiClient.post('/chat/completions', {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are an AI assistant for a partner portal called KwikPartner. Predict future earnings based on referral data and historical performance.',
        },
        {
          role: 'user',
          content: `Predict future earnings based on this referral data: ${JSON.stringify(
            referralData,
          )} and historical data: ${JSON.stringify(historicalData)}`,
        },
      ],
      max_tokens: 250,
    });

    // Parse the response to extract structured data
    const content = response.data.choices[0].message.content;

    // In a real implementation, we would parse the content to extract structured data
    // For now, return a mock response
    return mockPredictEarnings(referralData, historicalData);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    // Fall back to mock response if API call fails
    return mockPredictEarnings(referralData, historicalData);
  }
};

/**
 * Mock function to generate a nudge
 * @param referralData Referral data
 * @param partnerData Partner data
 * @returns Mock nudge message
 */
const mockGenerateNudge = (referralData: any, partnerData: any): string => {
  const nudges = [
    "Follow up with the client to check if they've reviewed the proposal.",
    "The client's integration timeline is approaching. Consider scheduling a check-in call.",
    "This referral has been in the 'Pitch' stage for 7 days. It might be time to address any objections.",
    "The client's monthly GMV indicates they could benefit from our premium tier. Consider suggesting an upgrade.",
    "Based on the client's vertical, they might be interested in our new Return Prime feature.",
  ];

  return nudges[Math.floor(Math.random() * nudges.length)];
};

/**
 * Mock function to predict earnings
 * @param referralData Referral data
 * @param historicalData Historical data
 * @returns Mock earnings prediction
 */
const mockPredictEarnings = (referralData: any[], historicalData: any[]): any => {
  return {
    nextMonth: {
      amount: 28500,
      growth: 14,
      confidence: 92,
    },
    nextQuarter: {
      amount: 95000,
      growth: 22,
      confidence: 85,
    },
    highestPotential: {
      referralId: 'ref-123',
      name: 'Fashion Store',
      amount: 15000,
    },
    recommendation: 'Focus on Beauty Brand referral which is close to conversion.',
  };
};
