import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '',
    },
  },
};

const labels = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July','Aug','Sept', 'Oct', 'Nov', 'Dec'];

const monthsNum = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

export function ReactChart({monthlyTransactions}) {
    const data = {
        labels,
        datasets: [
          {
            label: 'Expense',
            data: labels.map((el,i) => monthlyTransactions[monthsNum[i]].totalExpenses),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Income',
            data: labels.map((el,i) => monthlyTransactions[monthsNum[i]].totalIncome),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

  return <Line options={options} data={data} />
}
