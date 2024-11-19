import React, { useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const chartRef = useRef(null);

  const data = {
    labels: ['Food', 'Drinks', 'Fuel', 'Entertainment', 'Groceries', 'Travel', 'Other'], // Enum categories
    datasets: [
      {
        label: 'Category-wise Spending',
        data: [400, 200, 150, 100, 250, 300, 180], // Example spending data
        backgroundColor: [
          '#FF6F61', // Food: Vibrant Coral
          '#FFB74D', // Drinks: Bright Orange
          '#4FC3F7', // Fuel: Sky Blue
          '#9575CD', // Entertainment: Amethyst Purple
          '#81C784', // Groceries: Fresh Green
          '#FFD54F', // Travel: Sunflower Yellow
          '#E0E0E0', // Other: Neutral Gray
        ],
        hoverBackgroundColor: [
          '#FF8A77', // Food: Slightly lighter
          '#FFCB7D', // Drinks: Slightly lighter
          '#74D0F4', // Fuel: Slightly lighter
          '#B39DDB', // Entertainment: Slightly lighter
          '#A5D6A7', // Groceries: Slightly lighter
          '#FFE27B', // Travel: Slightly lighter
          '#F5F5F5', // Other: Slightly lighter
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
            family: "'Poppins', sans-serif",
          },
          color: '#4A4A4A',
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataset = tooltipItem.dataset;
            const total = dataset.data.reduce((sum, value) => sum + value, 0);
            const currentValue = dataset.data[tooltipItem.dataIndex];
            const percentage = ((currentValue / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ₹${currentValue.toLocaleString()} (${percentage}%)`;
          },
        },
        backgroundColor: '#f4f4f4',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: '#ddd',
        borderWidth: 1,
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const chart = chartRef.current;
        const datasetIndex = elements[0].datasetIndex;
        const dataIndex = elements[0].index;

        const category = data.labels[dataIndex];
        const amount = data.datasets[datasetIndex].data[dataIndex];
        const total = data.datasets[datasetIndex].data.reduce((sum, value) => sum + value, 0);
        const percentage = ((amount / total) * 100).toFixed(2);
      }
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
        <Pie ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
