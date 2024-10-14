import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store, persistor } from './Store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FriendsPage from './pages/Friends';
import CreateGroup from './pages/Group';
import AddExpense from './pages/AddE';
import Navbar from './components/Navbar'; // Import the Navbar
import Layout from './pages/Layout';

function AppRoutes() {
  // Get authentication status from the Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      {/* Redirect to /friends if authenticated or /login if not */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/friends" /> : <Navigate to="/login" />} />

      {/* Public routes (no Navbar) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes (with Layout) */}
      <Route
        path="/friends"
        element={isAuthenticated ? <Layout><FriendsPage /></Layout> : <Navigate to="/login" />}
      />
      <Route
        path="/group"
        element={isAuthenticated ? <Layout><CreateGroup /></Layout> : <Navigate to="/login" />}
      />
      <Route
        path="/add-expense"
        element={isAuthenticated ? <Layout><AddExpense /></Layout> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppRoutes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
