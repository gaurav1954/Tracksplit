import React, { useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const chartRef = useRef(null);
  const user = useSelector((state) => state.user.user);

  // State for start and end dates
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filter expenses based on the selected date range, including both start and end dates
  const filteredExpenses = user.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date).setHours(0, 0, 0, 0);
    const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
    const end = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;

    return (
      (!start || expenseDate >= start) &&
      (!end || expenseDate <= end)
    );
  });

  // Calculate total expenditure for the selected time period
  const totalExpenditure = filteredExpenses.reduce((sum, expense) => {
    return sum + expense.amount / expense.splitBetween.length;
  }, 0);

  // Calculate category-wise totals for filtered expenses
  const categoryTotals = {};
  filteredExpenses.forEach((expense) => {
    const category = expense.category.toLowerCase(); // Ensure category is lowercase
    const userShare = expense.amount / expense.splitBetween.length; // User's share of the expense
    categoryTotals[category] = (categoryTotals[category] || 0) + userShare; // Accumulate total for the category
  });

  // Extract labels and data from the categoryTotals object
  const labels = Object.keys(categoryTotals);
  const dataValues = Object.values(categoryTotals);

  // Create the data object for the Pie chart
  const data = {
    labels, // Dynamic labels
    datasets: [
      {
        label: 'Category-wise Spending',
        data: dataValues, // Dynamic data
        backgroundColor: [
          '#FF6F61', '#FFB74D', '#4FC3F7', '#9575CD', '#81C784', '#FFD54F', '#E0E0E0',
        ],
        hoverBackgroundColor: [
          '#FF8A77', '#FFCB7D', '#74D0F4', '#B39DDB', '#A5D6A7', '#FFE27B', '#F5F5F5',
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  // Chart options
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

      {/* Date range selectors */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ marginLeft: '5px' }}
            />
          </label>
        </div>
        <div>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ marginLeft: '5px' }}
            />
          </label>
        </div>
      </div>

      {/* Display total expenditure */}
      <p
        style={{
          textAlign: 'center',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '18px',
          color: '#4A4A4A',
          marginBottom: '10px',
        }}
      >
        Total Expenditure: ₹{totalExpenditure.toLocaleString()}
      </p>

      {/* Conditionally render chart or message */}
      {filteredExpenses.length > 0 ? (
        <div style={{ height: '320px' }}>
          <Pie ref={chartRef} data={data} options={options} />
        </div>
      ) : (
        <p
          style={{
            textAlign: 'center',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '16px',
            color: '#FF6F61',
          }}
        >
          No expenses found in the selected date range.
        </p>
      )}
    </div>
  );
};

export default PieChart;
