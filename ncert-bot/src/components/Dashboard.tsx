// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { User, QuizResult, PdfUsage, TimeFilter } from '../types';
import { Link } from 'react-router-dom';

// Mock data - replace with your actual data or API calls
const mockUsers: User[] = [
  { id: 1, name: 'Saurav Singh', email: 'saurav@test.com', lastLogin: '2025-02-14', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-02-14' },
  { id: 2, name: 'Pranav Gorathe', email: 'pranav@test.com', lastLogin: '2025-02-20', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-02-20' },
  { id: 3, name: 'March09 Man', email: 'mar09@test.com', lastLogin: '2025-02-27', subscription: false },
  { id: 4, name: 'March08 Man', email: 'mar08@test.com', lastLogin: '2025-02-28', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-02-28' },
  { id: 5, name: 'March Man', email: 'march@test.com', lastLogin: '2025-02-08', subscription: false },
  { id: 6, name: 'Sagar Tiwari', email: 'sagar@test.com', lastLogin: '2025-03-20', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-03-20' },
  { id: 7, name: 'Waiter Singh', email: 'wait@test.com', lastLogin: '2025-03-04', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-03-04' },
  { id: 8, name: 'Rest Pal', email: 'rest@test.com', lastLogin: '2025-03-05', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-03-05' },
  { id: 9, name: 'Vidhyanshu Gupta', email: 'vidhyanshu@gmail.com', lastLogin: '2025-03-12', subscription: false },
  { id: 10, name: 'Best Man', email: 'best@test.com', lastLogin: '2025-04-01', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-04-01' },
  { id: 11, name: 'Sr Singh', email: 'sr@test.com', lastLogin: '2025-04-03', subscription: false },
  { id: 12, name: 'West Man', email: 'west@test.com', lastLogin: '2025-04-11', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-04-1' },
  { id: 13, name: 'Vids Yadav', email: 'vids@test.com', lastLogin: '2025-04-15', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-04-15' },
  { id: 14, name: 'Best Women', email: 'best@test.com', lastLogin: '2025-04-13', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-04-13' },
  { id: 15, name: 'Test Tiwari', email: 'test@gmail.com', lastLogin: '2025-04-04', subscription: false },
  { id: 16, name: 'Test Demo', email: 'test@test.com', lastLogin: '2025-04-08', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-04-08' },
  { id: 17, name: 'Tara Singh', email: 'tara@test.com', lastLogin: '2025-04-18', subscription: false },
  { id: 18, name: 'A Chaudhri', email: 'a@gmail.com', lastLogin: '2025-04-06', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-04-06' },
];

const mockQuizResults: QuizResult[] = [
  { id: 1, userId: 1, pdfName: 'Class 10 Maths Chapter 1', score: 85, date: '2023-06-10' },
  { id: 2, userId: 1, pdfName: 'Class 10 Science Chapter 3', score: 78, date: '2023-05-28' },
  { id: 3, userId: 2, pdfName: 'Class 9 Science Chapter 3', score: 92, date: '2023-06-05' },
  { id: 4, userId: 3, pdfName: 'Class 8 History Chapter 2', score: 65, date: '2023-05-20' },
  { id: 5, userId: 4, pdfName: 'Class 10 Maths Chapter 1', score: 88, date: '2023-05-15' },
  { id: 6, userId: 5, pdfName: 'Class 7 Geography Chapter 4', score: 72, date: '2023-04-10' },
  { id: 7, userId: 6, pdfName: 'Class 9 Science Chapter 3', score: 95, date: '2023-04-05' },
];

const mockPdfUsage: PdfUsage[] = [
  { id: 1, name: 'Class 10 Maths Chapter 1', subject: 'Mathematics', class: '10', usageCount: 45 },
  { id: 2, name: 'Class 9 Science Chapter 3', subject: 'Science', class: '9', usageCount: 32 },
  { id: 3, name: 'Class 8 History Chapter 2', subject: 'History', class: '8', usageCount: 28 },
  { id: 4, name: 'Class 7 Geography Chapter 4', subject: 'Geography', class: '7', usageCount: 18 },
];

// Fixed credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '92520088';

const Dashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  // Filter users based on time filter and search term
const filteredUsers = mockUsers.filter(user => {
    // Apply time filter
    const now = new Date();
    const lastLoginDate = new Date(user.lastLogin);
    const millisecondsDiff = now.getTime() - lastLoginDate.getTime();
    const daysDiff = millisecondsDiff / (1000 * 60 * 60 * 24); // Convert ms to days
    
    // More precise time filter calculations
    const timeFilterMatch = (() => {
      switch(timeFilter) {
        case 'all': 
          return true;
        case '2months':
          return daysDiff <= 60; // 60 days
        case '1month':
          return daysDiff <= 30; // ~30.44 days
        case '3weeks':
          return daysDiff <= 21; // 21 days
        case '2weeks':
          return daysDiff <= 14; // 14 days
        case '1week':
          return daysDiff <= 7;  // 7 days
        default:
          return true; // Fallback for unknown filters
      }
    })();
    
    // Apply search filter
    const searchMatch = 
      searchTerm === '' ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return timeFilterMatch && searchMatch;
  });

  // Get user's quiz results
  const getUserQuizResults = (userId: number) => {
    return mockQuizResults.filter(quiz => quiz.userId === userId);
  };

  // Get user's most used PDF
  const getUserMostUsedPdf = (userId: number) => {
    const userQuizzes = getUserQuizResults(userId);
    if (userQuizzes.length === 0) return null;
    
    const pdfCounts: Record<string, number> = {};
    userQuizzes.forEach(quiz => {
      pdfCounts[quiz.pdfName] = (pdfCounts[quiz.pdfName] || 0) + 1;
    });
    
    const mostUsed = Object.entries(pdfCounts).reduce((max, current) => 
      current[1] > max[1] ? current : max, ['', 0]);
    
    return mockPdfUsage.find(pdf => pdf.name === mostUsed[0]) || null;
  };

  // Get user's average score
  const getUserAverageScore = (userId: number) => {
    const userQuizzes = getUserQuizResults(userId);
    if (userQuizzes.length === 0) return 0;
    
    const total = userQuizzes.reduce((sum, quiz) => sum + quiz.score, 0);
    return total / userQuizzes.length;
  };

  // Calculate overall stats
  const totalUsers = filteredUsers.length;
  const activeUsers = filteredUsers.filter(user => {
    const daysSinceLogin = (new Date().getTime() - new Date(user.lastLogin).getTime()) / (1000 * 3600 * 24);
    return daysSinceLogin <= 30;
  }).length;
  const subscribedUsers = filteredUsers.filter(user => user.subscription).length;

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <h1>NCERT-Bot Admin Login</h1>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {loginError && <div className="error-message">{loginError}</div>}
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    );
  }

  return (
    
    <div className="dashboard-container">
        <nav className="mb-6 flex items-center text-sm text-gray-600">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        </nav>
      <header className="dashboard-header">
        <h1>NCERT-Bot User Analytics</h1>
        <button 
          className="logout-button"
          onClick={() => {
            setIsAuthenticated(false);
            setUsername('');
            setPassword('');
          }}
        >
          Logout
        </button>
      </header>
      
      {/* Filters Section */}
      <div className="filters-section">
        <div className="time-filters">
          <label>Time Filter:</label>
          <select 
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
          >
            <option value="all">All Time</option>
            <option value="1year">Last 2 Months</option>
            <option value="6months">Last 1 Month</option>
            <option value="3months">Last 3 Weeks</option>
            <option value="1month">Last 2 Weeks</option>
            <option value="3weeks">Last 1 Week</option>
          </select>
        </div>
        
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Active Users (Last 30 days)</h3>
          <p>{activeUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Subscribed Users</h3>
          <p>{subscribedUsers} ({totalUsers > 0 ? Math.round((subscribedUsers / totalUsers) * 100) : 0}%)</p>
        </div>
      </div>
      
      {/* Users List */}
      <div className="users-list">
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Last Login</th>
              <th>Subscription</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr 
                key={user.id} 
                className={selectedUser?.id === user.id ? 'selected' : ''}
              >
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.lastLogin).toLocaleDateString()}</td>
                <td>
                  {user.subscription ? (
                    <span className="subscribed">
                      {user.subscriptionType} (since {user.subscriptionDate})
                    </span>
                  ) : (
                    <span className="not-subscribed">Not subscribed</span>
                  )}
                </td>
                <td>
                  <button onClick={() => setSelectedUser(user)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* User Details */}
      {selectedUser && (
        <div className="user-details">
          <h2>User Details: {selectedUser.name}</h2>
          
          <div className="user-info">
            <div>
              <h3>Basic Information</h3>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Last Login:</strong> {new Date(selectedUser.lastLogin).toLocaleString()}</p>
              <p><strong>Subscription:</strong> {selectedUser.subscription ? 
                `${selectedUser.subscriptionType} (since ${selectedUser.subscriptionDate})` : 
                'Not subscribed'}
              </p>
            </div>
            
            <div>
              <h3>Performance</h3>
              <p><strong>Average Score:</strong> {getUserAverageScore(selectedUser.id).toFixed(1)}%</p>
              <p><strong>Quizzes Taken:</strong> {getUserQuizResults(selectedUser.id).length}</p>
              <p><strong>Most Used PDF:</strong> 
                {getUserMostUsedPdf(selectedUser.id)?.name || 'No quizzes taken'}
              </p>
            </div>
          </div>
          
          <h3>Quiz History</h3>
          <table>
            <thead>
              <tr>
                <th>PDF Name</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {getUserQuizResults(selectedUser.id).length > 0 ? (
                getUserQuizResults(selectedUser.id).map(quiz => (
                  <tr key={quiz.id}>
                    <td>{quiz.pdfName}</td>
                    <td>{quiz.score}%</td>
                    <td>{new Date(quiz.date).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No quiz results found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;