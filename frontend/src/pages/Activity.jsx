import React from 'react';
import PieChart from '../components/PieChart'; // Import the PieChart component
import './Activity.css'; // Import custom styles

const Activity = () => {
  return (
    <div className="activity-page">
      <div className="activity-header">
        <h1>Activity Page</h1>
        <p>Here's the breakdown of payment distribution:</p>
      </div>
      <PieChart />
    </div>
  );
};

export default Activity;
