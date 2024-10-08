import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './Store'; // Import your Redux store
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/Landing';
import FriendsPage from './pages/Friends';
import CreateGroup from './pages/Group';
import AddExpense from './pages/AddE'; // Import the AddExpense component

function App() {
  return (
    <Provider store={store}> {/* Provide the Redux store */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/group" element={<CreateGroup />} />
          <Route path="/add-expense" element={<AddExpense />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
