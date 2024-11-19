import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ['Food', 'Fuel', 'Snacks', 'Entertainment', 'Others'], // Categories
    datasets: [
      {
        label: 'Category-wise Spending',
        data: [300, 150, 100, 50, 80], // Example spending data
        backgroundColor: [
          '#FF9F68', // Food: Soft Peach
          '#78C5D6', // Fuel: Light Sky Blue
          '#FFE156', // Snacks: Vibrant Yellow
          '#E36488', // Entertainment: Rosy Pink
          '#A29BFE', // Others: Lavender Blue
        ],
        hoverBackgroundColor: [
          '#FFB891', // Slightly lighter shades for hover
          '#A3D6E7',
          '#FFEA8D',
          '#EB879C',
          '#C2BEFF',
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
            family: "'Poppins', sans-serif", // Modern font
          },
          color: '#4A4A4A', // Dark gray for readability
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.label}: ₹${tooltipItem.raw.toLocaleString()}`,
        },
        backgroundColor: '#f4f4f4', // Light background for tooltips
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: '#ddd',
        borderWidth: 1,
      },
    },
  };

  return (
    <div
      style={{
        maxWidth: '450px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
      }}
    >
      <h3
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '20px',
          color: '#4A4A4A',
        }}
      >
        Spending Categories
      </h3>
      <div style={{ height: '320px' }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
