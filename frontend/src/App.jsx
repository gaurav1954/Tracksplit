import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store, persistor } from './Store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FriendsPage from './pages/Friends';
import CreateGroup from './pages/Group';
import AddExpense from './pages/AddE'; // Import the AddExpense component

function AppRoutes() {
  // Get authentication status from the Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      {/* If the user is authenticated, redirect them to FriendsPage, otherwise to Login */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/friends" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* Protected routes: Only accessible when authenticated */}
      <Route path="/friends" element={isAuthenticated ? <FriendsPage /> : <Navigate to="/login" />} />
      <Route path="/group" element={isAuthenticated ? <CreateGroup /> : <Navigate to="/login" />} />
      <Route path="/add-expense" element={isAuthenticated ? <AddExpense /> : <Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> {/* Add PersistGate */}
        <Router>
          <AppRoutes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
