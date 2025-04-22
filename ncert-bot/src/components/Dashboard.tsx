// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { User, QuizResult, PdfUsage, TimeFilter } from '../types';
import { Link } from 'react-router-dom';

// Mock data - replace with your actual data or API calls
const mockUsers: User[] = [
  { id: 1, name: 'Saurav Singh', email: 'saurav@test.com', lastLogin: '2025-02-14', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-02-14' },
  { id: 2, name: 'Aarav Mehta', email: 'aarav@test.com', lastLogin: '2025-02-15', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-02-15' },
  { id: 3, name: 'Diya Sharma', email: 'diya@test.com', lastLogin: '2025-02-16', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-02-16' },
  { id: 4, name: 'Ishaan Verma', email: 'ishaan@test.com', lastLogin: '2025-02-17', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-02-17' },
  { id: 5, name: 'Meera Patel', email: 'meera@test.com', lastLogin: '2025-02-18', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-02-18' },
  { id: 6, name: 'Kabir Khan', email: 'kabir@test.com', lastLogin: '2025-02-19', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-02-19' },
  { id: 7, name: 'Anaya Joshi', email: 'anaya@test.com', lastLogin: '2025-02-20', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-02-20' },
  { id: 8, name: 'Reyansh Roy', email: 'reyansh@test.com', lastLogin: '2025-02-21', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-02-21' },
  { id: 9, name: 'Tanya Bansal', email: 'tanya@test.com', lastLogin: '2025-02-22', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-02-22' },
  { id: 10, name: 'Vivaan Kapoor', email: 'vivaan@test.com', lastLogin: '2025-02-23', subscription: true, subscriptionType: 'monthly', subscriptionDate: '2025-02-23' },
];

const mockQuizResults: QuizResult[] = [
  { id: 1, userId: 1, pdfName: 'Class 10 Math Chapter 1', score: 15, date: '2023-06-10' },
  { id: 2, userId: 1, pdfName: 'Class 10 English Chapter 2', score: 8, date: '2023-06-11' },

  { id: 3, userId: 2, pdfName: 'Class 10 Social Science Chapter 1', score: 11, date: '2023-06-10' },
  { id: 4, userId: 2, pdfName: 'Class 10 Math Chapter 2', score: 13, date: '2023-06-11' },
  { id: 5, userId: 2, pdfName: 'Class 10 Science Chapter 3', score: 5, date: '2023-06-12' },

  { id: 6, userId: 3, pdfName: 'Class 10 Geography Chapter 1', score: 12, date: '2023-06-10' },

  { id: 7, userId: 4, pdfName: 'Class 10 Science Chapter 1', score: 9, date: '2023-06-10' },
  { id: 8, userId: 4, pdfName: 'Class 10 Social Science Chapter 2', score: 12, date: '2023-06-11' },
  { id: 9, userId: 4, pdfName: 'Class 10 English Chapter 3', score: 8, date: '2023-06-12' },
  { id: 10, userId: 4, pdfName: 'Class 10 Math Chapter 4', score: 8, date: '2023-06-13' },
  { id: 11, userId: 4, pdfName: 'Class 10 Geography Chapter 5', score: 7, date: '2023-06-14' },

  { id: 12, userId: 5, pdfName: 'Class 10 Science Chapter 1', score: 9, date: '2023-06-10' },
  { id: 13, userId: 5, pdfName: 'Class 10 Math Chapter 2', score: 12, date: '2023-06-11' },
  { id: 14, userId: 5, pdfName: 'Class 10 English Chapter 3', score: 8, date: '2023-06-12' },

  { id: 15, userId: 6, pdfName: 'Class 10 Math Chapter 1', score: 14, date: '2023-06-10' },
  { id: 16, userId: 6, pdfName: 'Class 10 Geography Chapter 2', score: 12, date: '2023-06-11' },

  { id: 17, userId: 7, pdfName: 'Class 10 Social Science Chapter 1', score: 11, date: '2023-06-10' },
  { id: 18, userId: 7, pdfName: 'Class 10 Science Chapter 2', score: 8, date: '2023-06-11' },
  { id: 19, userId: 7, pdfName: 'Class 10 Math Chapter 3', score: 9, date: '2023-06-12' },
  { id: 20, userId: 7, pdfName: 'Class 10 English Chapter 4', score: 7, date: '2023-06-13' },
  { id: 21, userId: 7, pdfName: 'Class 10 Geography Chapter 5', score: 15, date: '2023-06-14' },

  { id: 22, userId: 8, pdfName: 'Class 10 English Chapter 1', score: 13, date: '2023-06-10' },
  { id: 23, userId: 8, pdfName: 'Class 10 Social Science Chapter 2', score: 10, date: '2023-06-11' },
  { id: 24, userId: 8, pdfName: 'Class 10 Math Chapter 3', score: 8, date: '2023-06-12' },

  { id: 25, userId: 9, pdfName: 'Class 10 Science Chapter 1', score: 11, date: '2023-06-10' },

  { id: 26, userId: 10, pdfName: 'Class 10 Geography Chapter 1', score: 14, date: '2023-06-10' },
  { id: 27, userId: 10, pdfName: 'Class 10 English Chapter 2', score: 13, date: '2023-06-11' },
  { id: 28, userId: 10, pdfName: 'Class 10 Social Science Chapter 3', score: 15, date: '2023-06-12' },
  { id: 29, userId: 10, pdfName: 'Class 10 Science Chapter 4', score: 14, date: '2023-06-13' },
];

const mockPdfUsage: PdfUsage[] = [
  { id: 1, name: 'Class 10 Maths Chapter 1', subject: 'Mathematics', class: '10', usageCount: 45 },
  { id: 2, name: 'Class 10 English Chapter 2', subject: 'English', class: '10', usageCount: 38 },
  { id: 3, name: 'Class 10 Social Science Chapter 1', subject: 'Social Science', class: '10', usageCount: 51 },
  { id: 4, name: 'Class 10 Geography Chapter 3', subject: 'Geography', class: '10', usageCount: 29 },
  { id: 5, name: 'Class 10 Science Chapter 2', subject: 'Science', class: '10', usageCount: 62 },
  { id: 6, name: 'Class 10 English Chapter 4', subject: 'English', class: '10', usageCount: 27 },
  { id: 7, name: 'Class 10 Maths Chapter 3', subject: 'Mathematics', class: '10', usageCount: 55 },
  { id: 8, name: 'Class 10 Science Chapter 4', subject: 'Science', class: '10', usageCount: 33 },
  { id: 9, name: 'Class 10 Social Science Chapter 3', subject: 'Social Science', class: '10', usageCount: 47 },
  { id: 10, name: 'Class 10 Geography Chapter 5', subject: 'Geography', class: '10', usageCount: 21 },
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

  const filteredUsers = mockUsers.filter(user => {
    const now = new Date();
    const lastLoginDate = new Date(user.lastLogin);
    const daysSinceLastLogin = (now.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24);
    
    // Time filter logic
    const isTimeMatch = (() => {
      switch (timeFilter) {
        case 'all':
          return true;
        case '2months':
          return daysSinceLastLogin <= 60;
        case '1month':
          return daysSinceLastLogin <= 30;
        case '3weeks':
          return daysSinceLastLogin <= 21;
        case '2weeks':
          return daysSinceLastLogin <= 14;
        case '1week':
          return daysSinceLastLogin <= 7;
        default:
          return true;
      }
    })();
  
    // Search filter logic
    const isSearchMatch =
      searchTerm.trim() === '' ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
  
    return isTimeMatch && isSearchMatch;
  });
  
  

  // Get user's quiz results
  const getUserQuizResults = (userId: number) => {
    return mockQuizResults.filter(quiz => quiz.userId === userId);
  };

  // Get user's most used PDF
  const getUserMostUsedPdf = (userId: number) => {
    const userQuizzes = getUserQuizResults(userId); // assumes this returns an array of { pdfName }

    if (!userQuizzes || userQuizzes.length === 0) return null;

    // Count usage of each PDF
    const pdfCounts: Record<string, number> = {};
    userQuizzes.forEach(quiz => {
      const name = quiz.pdfName;
      pdfCounts[name] = (pdfCounts[name] || 0) + 1;
    });

    // Determine the most used PDF
    const mostUsedEntry = Object.entries(pdfCounts).reduce(
      (max, curr) => (curr[1] > max[1] ? curr : max),
      ['', 0] // initial value
    );

    const mostUsedPdfName = mostUsedEntry[0];
    return mockPdfUsage.find(pdf => pdf.name === mostUsedPdfName) || null;
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

      {/* Filters Section 
      
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
      */}

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
        {/* <div className="stat-card">
          <h3>Active Users (Last 30 days)</h3>
          <p>{activeUsers}</p>
        </div> */}
        <div className="stat-card">
          <h3>Subscribed Users</h3>
          <p>{subscribedUsers}</p>
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
                    <td>{quiz.score}</td>
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