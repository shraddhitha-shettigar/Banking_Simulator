# Banking Simulator Frontend

A modern, responsive React frontend for a comprehensive banking simulation system built with React, TailwindCSS, React Router, and Axios.

## 🚀 Features

### User Features
- **User Authentication**: Sign up and login for regular users
- **Customer Management**: Add, search, edit, and delete customer records
- **Account Management**: Create and manage bank accounts
- **Transaction Processing**: Make transfers and view transaction history
- **Query System**: Send queries to admin for support
- **Excel Download**: Download transaction reports in Excel format

### Admin Features
- **Admin Authentication**: Secure admin login with hardcoded credentials
- **Comprehensive Dashboard**: View all customers, accounts, transactions, and queries
- **Data Management**: Search, filter, and manage all system data
- **Real-time Updates**: Refresh data and monitor system activity

## 🛠️ Technology Stack

- **React 19.2.0**: Modern React with hooks
- **TailwindCSS**: Utility-first CSS framework for styling
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client for API requests
- **SweetAlert2**: Beautiful popup notifications
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
src/
├── api/
│   └── axiosInstance.js          # Axios configuration with interceptors
├── components/
│   ├── Auth/
│   │   ├── UserLogin.jsx         # User login component
│   │   ├── UserSignup.jsx        # User registration
│   │   └── AdminLogin.jsx        # Admin authentication
│   ├── Dashboard/
│   │   ├── UserDashboard.jsx     # User main dashboard
│   │   └── AdminDashboard.jsx    # Admin control panel
│   ├── Customer/
│   │   ├── CreateCustomer.jsx    # Add new customer
│   │   ├── SearchCustomer.jsx    # Find customer by Aadhar
│   │   └── EditCustomer.jsx      # Update customer info
│   ├── Account/
│   │   ├── CreateAccount.jsx     # Create bank account
│   │   ├── SearchAccount.jsx     # Find account by number
│   │   └── EditAccount.jsx       # Update account details
│   ├── Transaction/
│   │   ├── MakeTransaction.jsx   # Process money transfers
│   │   └── SearchTransaction.jsx  # View transaction history
│   ├── Query/
│   │   └── QueryForm.jsx         # Send queries to admin
│   └── Common/
│       ├── Navbar.jsx            # Navigation component
│       └── Footer.jsx            # Footer component
├── App.js                        # Main app component with routing
├── index.js                      # React entry point
└── index.css                     # Global styles with TailwindCSS
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:8080/bank-simulator/api`

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Backend API
The application is configured to connect to:
```
Base URL: http://localhost:8080/bank-simulator/api
```

### Admin Credentials
Default admin credentials (hardcoded):
- **Username**: admin
- **Password**: admin123
- **Email**: bankingsimulator10@gmail.com

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with sidebars and tables
- **Tablet**: Adapted layouts with collapsible menus
- **Mobile**: Touch-friendly interface with stacked layouts

## 🎨 UI/UX Features

### Design System
- **Color Scheme**: Banking blue theme with professional gradients
- **Typography**: Inter font family for readability
- **Components**: Custom banking-themed cards, buttons, and forms
- **Animations**: Smooth transitions and hover effects

### User Experience
- **Intuitive Navigation**: Clear menu structure and breadcrumbs
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Spinner animations during API calls
- **Success/Error Notifications**: SweetAlert2 popups for all actions
- **Responsive Tables**: Mobile-friendly data display

## 🔐 Authentication & Security

### User Authentication
- JWT token-based authentication
- Secure localStorage for session management
- Automatic token refresh and error handling
- Protected routes with authentication checks

### Admin Security
- Hardcoded admin credentials for demo purposes
- Separate admin dashboard with elevated permissions
- Secure API endpoints for admin operations

## 📊 API Integration

### Endpoints Used
- **Authentication**: `/user/login`, `/user/signup`, `/admin/login`
- **Customer Management**: `/customer/create`, `/customer/get/{aadhar}`, `/customer/update/{aadhar}`, `/customer/delete/{aadhar}`, `/customer/getAll`
- **Account Management**: `/account/create`, `/account/get/{accountNumber}`, `/account/update/{accountNumber}`, `/account/delete/{accountNumber}`, `/account/getAll`
- **Transactions**: `/transaction/create`, `/transaction/get/{accountNumber}`, `/transaction/getAll`, `/transaction/{accountNumber}/download`
- **Queries**: `/admin/query`, `/admin/queries`

### Error Handling
- Global axios interceptors for consistent error handling
- Custom error messages for different HTTP status codes
- Network error detection and user-friendly messages
- Automatic logout on authentication errors

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
Create a `.env` file for environment-specific configurations:
```env
REACT_APP_API_BASE_URL=http://localhost:8080/bank-simulator/api
```

## 🧪 Testing

The application includes comprehensive error handling and user feedback:
- Form validation with real-time feedback
- API error handling with user-friendly messages
- Loading states for all async operations
- Success confirmations for all actions

## 📝 Features Overview

### User Dashboard
1. **Customer Management**
   - Add new customer with complete details
   - Search customer by Aadhar number
   - Edit customer information
   - Delete customer records

2. **Account Management**
   - Create bank accounts for customers
   - Search accounts by account number
   - Update account details
   - Delete accounts

3. **Transaction Management**
   - Make secure money transfers
   - View transaction history
   - Download Excel reports
   - Transaction validation and security

4. **Query System**
   - Send queries to admin
   - Email notifications
   - Query tracking

### Admin Dashboard
1. **Data Overview**
   - View all customers
   - View all accounts
   - View all transactions
   - View all queries

2. **System Management**
   - Search and filter data
   - Refresh data in real-time
   - Comprehensive data tables
   - Export capabilities

## 🔧 Customization

### Styling
- TailwindCSS configuration in `tailwind.config.js`
- Custom CSS classes in `src/index.css`
- Responsive breakpoints and utilities
- Banking-themed color palette

### Components
- Modular component structure
- Reusable UI components
- Consistent design patterns
- Easy to extend and modify

## 📞 Support

For questions or issues:
1. Check the browser console for error messages
2. Verify backend API is running on the correct port
3. Ensure all required dependencies are installed
4. Check network connectivity for API calls

## 🎯 Future Enhancements

- Real-time notifications
- Advanced reporting features
- Multi-language support
- Enhanced security features
- Mobile app integration
- Advanced analytics dashboard

---

**Built with ❤️ using React, TailwindCSS, and modern web technologies.**