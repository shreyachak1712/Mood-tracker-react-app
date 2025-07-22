// src/components/MoodChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

function MoodChart({ entries }) {
  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(moodCounts),
    datasets: [
      {
        label: 'Mood Frequency',
        data: Object.values(moodCounts),
        backgroundColor: ['#f39c12', '#e74c3c', '#8e44ad', '#3498db', '#2ecc71'],
      },
    ],
  };

  return (
    <div>
      <h3>Mood Analytics</h3>
      <Bar data={data} />
    </div>
  );
}

export default MoodChart;
