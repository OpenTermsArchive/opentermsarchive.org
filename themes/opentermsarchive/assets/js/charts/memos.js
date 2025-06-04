import Chart from 'chart.js/auto';
import 'date-fns';
import 'chartjs-adapter-date-fns';
import Annotation from 'chartjs-plugin-annotation';

Chart.register(Annotation);

const languages = {
  en: 'Anglais',
  fr: 'Français',
  de: 'Allemand',
};
const dataMemos = { months: [ '2020-06', '2020-07', '2021-09', '2021-11', '2022-02', '2022-03', '2022-04', '2022-05', '2022-06', '2023-10', '2023-11', '2023-12', '2024-01', '2024-03', '2024-05', '2024-09', '2025-01', '2025-02', '2025-03', '2025-05' ], languages: [ 'en', 'fr', 'de' ], languagesByDate: [ 'de', 'fr', 'en' ], counts: { fr: [ 1, 2, 3, 5, 9, 13, 21, 24, 28, 28, 28, 28, 28, 28, 28, 29, 30, 31, 31, 32 ], en: [ 1, 2, 3, 5, 9, 13, 21, 24, 28, 29, 33, 37, 40, 41, 43, 44, 46, 47, 48, 49 ], de: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2 ] } };

const colors = {
  en: 'rgb(75, 192, 192)',
  fr: 'rgb(255, 99, 132)',
  de: 'rgb(54, 162, 235)',
  default: 'rgb(201, 203, 207)',
};

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('memosChart');
  const ctx = canvas.getContext('2d');

  const datasets = dataMemos.languagesByDate.map(lang => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    const color = colors[lang] || colors.default;

    gradient.addColorStop(0, color.replace('rgb', 'rgba').replace(')', ', 0.3)'));
    gradient.addColorStop(1, color.replace('rgb', 'rgba').replace(')', ', 0.05)'));

    return {
      label: languages[lang],
      data: dataMemos.months.map((month, i) => ({
        x: new Date(month),
        y: dataMemos.counts[lang][i],
      })),
      borderColor: color,
      backgroundColor: gradient,
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: color,
      pointBorderColor: 'white',
      pointHoverRadius: 5,
      fill: true,
      tension: 0.4,
    };
  });

  // eslint-disable-next-line no-unused-vars
  const memosChart = new Chart(canvas, {
    type: 'line',
    data: {
      datasets: datasets.map((dataset, index) => ({
        ...dataset,
        fill: index === 0 ? 'origin' : '-1',
        stack: 'stack0',
      })),
    },
    options: {
      responsive: true,
      layout: { padding: { right: 40 } },
      plugins: {
        title: {
          display: false,
          text: 'Evolution of published memos by language (stacked)',
          font: { size: 24, weight: 'bold', family: 'system-ui, -apple-system, sans-serif' },
          color: '#333',
          padding: { top: 20, bottom: 30 },
        },
        legend: {
          labels: {
            font: { size: 16, family: 'system-ui, -apple-system, sans-serif' },
            color: '#333',
            usePointStyle: true,
            pointStyle: 'rect',
          },
        },
        annotation: {
          annotations: {
            latestValue: {
              type: 'label',
              xValue: new Date(dataMemos.months[dataMemos.months.length - 1]),
              yValue: dataMemos.languages.reduce((sum, lang) => sum + dataMemos.counts[lang][dataMemos.counts[lang].length - 1], 0),
              content: dataMemos.languages.reduce((sum, lang) => sum + dataMemos.counts[lang][dataMemos.counts[lang].length - 1], 0).toString(),
              backgroundColor: 'rgb(75, 192, 192)',
              color: 'white',
              font: { size: 14, weight: 'bold' },
              padding: 6,
              borderRadius: 4,
              yAdjust: -20,
              clip: false,
            },
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          displayColors: true,
          callbacks: {
            title(context) {
              const date = new Date(context[0].raw.x);

              return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
            },
            label(context) {
              const { dataset } = context;
              const value = context.raw.y;

              return `${dataset.label}: ${value}`;
            },
            footer(context) {
              const total = context.reduce((sum, item) => sum + item.raw.y, 0);

              return `Total: ${total} memos`;
            },
          },
        },
      },
      scales: {
        x: {
          type: 'time',
          max: new Date(new Date(dataMemos.months[dataMemos.months.length - 1]).setMonth(new Date(dataMemos.months[dataMemos.months.length - 1]).getMonth() + 1)),
          time: {
            unit: 'year',
            displayFormats: { month: 'yyyy' },
          },
          title: {
            display: false,
            text: 'Month',
            font: { size: 18, family: 'system-ui, -apple-system, sans-serif' },
            color: '#333',
          },
          grid: { color: 'rgba(0, 0, 0, 0.1)' },
        },
        y: {
          beginAtZero: true,
          title: {
            display: false,
            text: 'Cumulative number of memos',
            font: { size: 18, family: 'system-ui, -apple-system, sans-serif' },
            color: '#333',
          },
          grid: { color: 'rgba(0, 0, 0, 0.1)' },
        },
      },
    },
  });
});
