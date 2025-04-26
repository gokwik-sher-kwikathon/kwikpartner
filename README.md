# KwikPartner - GoKwik Partner Portal

KwikPartner is GoKwik's next-generation partner portal, built to activate and empower its 225+ agency partners across India. This platform enables Referral, Reseller, and Service partners to onboard, refer merchants, track progress, and earn commissions with full-funnel visibility and AI-powered nudges.

## Features

- **Multi-Role Support**: Tailored experiences for Referral, Reseller, and Service partners
- **Full-Funnel Visibility**: Track referrals from prospecting to go-live
- **Commission Management**: View earnings, pending payouts, and forecasts
- **AI-Powered Features**: Smart nudges, EIDA assistant, and personalized recommendations
- **Learning Hub**: Role-specific GTM playbooks and training materials

## Tech Stack

- **Frontend**: React with TypeScript
- **UI Library**: Ant Design
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Backend**: Node.js with Express (mock implementation)
- **Data Storage**: JSON files (for demo purposes)

## Project Structure

```
kwikpartner/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable components
│   │   ├── common/          # Shared components
│   │   ├── auth/            # Authentication components
│   │   ├── dashboard/       # Dashboard components
│   │   ├── referral/        # Referral partner components
│   │   ├── reseller/        # Reseller partner components
│   │   └── service/         # Service partner components
│   ├── pages/               # Page components
│   ├── context/             # Context providers
│   ├── services/            # API services
│   ├── utils/               # Utility functions
│   ├── hooks/               # Custom hooks
│   ├── App.tsx              # Main App component
│   └── main.tsx             # Entry point
├── server/                  # Mock backend server
│   ├── server.js            # Express server
│   └── mock-data/           # JSON data files
└── package.json             # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository

   ```
   git clone <repository-url>
   cd kwikpartner
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

### Running the Application

1. Start the mock backend server

   ```
   npm run server
   # or
   yarn server
   ```

2. In a separate terminal, start the frontend development server

   ```
   npm run dev
   # or
   yarn dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

### Demo Accounts

You can use the following demo accounts to test different partner roles:

1. **Referral Partner**

   - Email: john@example.com
   - Password: password

2. **Reseller Partner**

   - Email: jane@example.com
   - Password: password

3. **Service Partner**
   - Email: bob@example.com
   - Password: password

## Key User Flows

1. **Authentication Flow**

   - Login → Role Selection → Dashboard

2. **Referral Partner Flow**

   - Submit Lead → Track in Referral Tracker → View Commission

3. **Reseller Partner Flow**

   - Manage Lead Pipeline → Upload Documents → Close Deals

4. **Service Partner Flow**

   - View Assigned Brands → Track Setup Progress → Access Dev Guides

5. **AI Features**
   - Ask EIDA questions → Receive Smart Nudges → Get Learning Recommendations

## Development Notes

- The backend is mocked for demonstration purposes. In a production environment, it would connect to a real database and authentication system.
- AI features are simulated with predefined responses. In a production environment, these would connect to OpenAI or a similar service.
- The application uses React Context API for state management. For larger applications, consider using Redux or a similar state management library.

## Future Enhancements

- Real backend integration with a database
- Advanced AI features with more training data
- Analytics dashboard with detailed performance metrics
- Mobile responsiveness optimization
- Integration with CRM systems
- Gamification features (leaderboards, badges)
- Email notifications for nudges and updates

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## Acknowledgements

- [React](https://reactjs.org/)
- [Ant Design](https://ant.design/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
