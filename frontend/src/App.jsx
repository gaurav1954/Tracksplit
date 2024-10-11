import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import store from './Store'; // Import your Redux store
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/Landing';
import FriendsPage from './pages/Friends';
import CreateGroup from './pages/Group';
import AddExpense from './pages/AddE'; // Import the AddExpense component

function AppRoutes() {
  // Get authentication status from the Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Routes>
      {/* Redirect the root path to login if not authenticated */}
      <Route path="/" element={isAuthenticated ? <LandingPage /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/friends" element={isAuthenticated ? <FriendsPage /> : <Navigate to="/login" />} />
      <Route path="/group" element={isAuthenticated ? <CreateGroup /> : <Navigate to="/login" />} />
      <Route path="/add-expense" element={isAuthenticated ? <AddExpense /> : <Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}> {/* Provide the Redux store */}
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;
