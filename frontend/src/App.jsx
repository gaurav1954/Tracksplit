import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'
import Signup from './pages/Signup'
import LandingPage from './pages/Landing';
import FriendsPage from './pages/Friends';
import CreateGroup from './pages/Group';
import AddExpense from './pages/AddE'; // Import the AddExpense component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/group" element={<CreateGroup />} />
        <Route path="/add-expense" element={<AddExpense />} /> {/* Add route for Add Expense */}
      </Routes>
    </Router>
  );
}

export default App;
