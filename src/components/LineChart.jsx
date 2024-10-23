import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const LineChart = ({ data }) => {
  const labels = data.map(item => item.date);
  const temperatures = data.map(item => item.temp);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature',
        data: temperatures, 
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(75, 192, 192, 0.2)');
          gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');
          return gradient;
        },
        borderColor: 'black',
        borderWidth: 2,
        pointBackgroundColor: 'white',
        pointBorderColor: 'black',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;