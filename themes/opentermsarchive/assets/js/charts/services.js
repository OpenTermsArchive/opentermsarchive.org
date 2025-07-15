import Chart from 'chart.js/auto';
import 'date-fns';
import 'chartjs-adapter-date-fns';
import Annotation from 'chartjs-plugin-annotation';

Chart.register(Annotation);

const dataServices = [{ date: '2021-10-31T00:00:00.000Z', services: 280, repoServices: { 'contrib-declarations': 280 } }, { date: '2021-11-30T00:00:00.000Z', services: 284, repoServices: { 'contrib-declarations': 280, 'dating-declarations': 4 } }, { date: '2021-12-31T00:00:00.000Z', services: 305, repoServices: { 'contrib-declarations': 280, 'dating-declarations': 24, 'france-declarations': 1 } }, { date: '2022-01-31T00:00:00.000Z', services: 378, repoServices: { 'contrib-declarations': 283, 'dating-declarations': 24, 'france-declarations': 71 } }, { date: '2022-02-28T00:00:00.000Z', services: 415, repoServices: { 'contrib-declarations': 283, 'dating-declarations': 24, 'france-declarations': 103, 'france-elections-declarations': 5 } }, { date: '2022-03-31T00:00:00.000Z', services: 413, repoServices: { 'contrib-declarations': 283, 'dating-declarations': 24, 'france-declarations': 101, 'france-elections-declarations': 5, 'pga-declarations': 0 } }, { date: '2022-04-30T00:00:00.000Z', services: 417, repoServices: { 'contrib-declarations': 283, 'dating-declarations': 24, 'france-declarations': 105, 'france-elections-declarations': 5, 'pga-declarations': 0 } }, { date: '2022-05-31T00:00:00.000Z', services: 418, repoServices: { 'contrib-declarations': 283, 'dating-declarations': 25, 'france-declarations': 105, 'france-elections-declarations': 5, 'pga-declarations': 0 } }, { date: '2022-06-30T00:00:00.000Z', services: 447, repoServices: { 'contrib-declarations': 283, 'dating-declarations': 25, 'france-declarations': 107, 'france-elections-declarations': 5, 'p2b-compliance-declarations': 9, 'pga-declarations': 18 } }, { date: '2022-07-31T00:00:00.000Z', services: 593, repoServices: { 'contrib-declarations': 283, 'dating-declarations': 25, 'france-declarations': 107, 'france-elections-declarations': 5, 'p2b-compliance-declarations': 155, 'pga-declarations': 18 } }, { date: '2022-08-31T00:00:00.000Z', services: 641, repoServices: { 'contrib-declarations': 283, 'dating-declarations': 25, 'france-declarations': 107, 'france-elections-declarations': 5, 'p2b-compliance-declarations': 203, 'pga-declarations': 18 } }, { date: '2022-09-30T00:00:00.000Z', services: 641, repoServices: { 'contrib-declarations': 283, 'dating-declarations': 25, 'france-declarations': 107, 'france-elections-declarations': 5, 'p2b-compliance-declarations': 203, 'pga-declarations': 18 } }, { date: '2022-10-31T00:00:00.000Z', services: 645, repoServices: { 'contrib-declarations': 287, 'dating-declarations': 25, 'france-declarations': 107, 'france-elections-declarations': 5, 'p2b-compliance-declarations': 203, 'pga-declarations': 18 } }, { date: '2022-11-30T00:00:00.000Z', services: 645, repoServices: { 'contrib-declarations': 287, 'dating-declarations': 25, 'france-declarations': 107, 'france-elections-declarations': 5, 'p2b-compliance-declarations': 203, 'pga-declarations': 18 } }, { date: '2022-12-31T00:00:00.000Z', services: 649, repoServices: { 'contrib-declarations': 291, 'dating-declarations': 25, 'france-declarations': 107, 'france-elections-declarations': 5, 'p2b-compliance-declarations': 203, 'pga-declarations': 18 } }, { date: '2023-01-31T00:00:00.000Z', services: 650, repoServices: { 'contrib-declarations': 292, 'dating-declarations': 25, 'france-declarations': 107, 'france-elections-declarations': 5, 'p2b-compliance-declarations': 203, 'pga-declarations': 18 } }, { date: '2023-02-28T00:00:00.000Z', services: 652, repoServices: { 'contrib-declarations': 294, 'dating-declarations': 25, 'france-declarations': 107, 'france-elections-declarations': 5, 'p2b-compliance-declarations': 203, 'pga-declarations': 18 } }, { date: '2023-03-31T00:00:00.000Z', services: 656, repoServices: { 'contrib-declarations': 296, 'dating-declarations': 25, 'demo-declarations': 2, 'france-declarations': 107, 'france-elections-declarations': 5, 'p2b-compliance-declarations': 203, 'pga-declarations': 18 } }, { date: '2023-04-30T00:00:00.000Z', services: 656, repoServices: { 'contrib-declarations': 296, 'dating-declarations': 25, 'demo-declarations': 2, 'france-declarations': 107, 'france-elections-declarations': 5, 'p2b-compliance-declarations': 203, 'pga-declarations': 18 } }, { date: '2023-05-31T00:00:00.000Z', services: 656, repoServices: { 'contrib-declarations': 296, 'dating-declarations': 25, 'demo-declarations': 2, 'france-declarations': 107, 'france-elections-declarations': 5, 'p2b-compliance-declarations': 203, 'pga-declarations': 18 } }, { date: '2023-06-30T00:00:00.000Z', services: 657, repoServices: { 'contrib-declarations': 297, 'dating-declarations': 25, 'demo-declarations': 2, 'france-declarations': 107, 'france-elections-declarations': 5, 'p2b-compliance-declarations': 203, 'pga-declarations': 18 } }, { date: '2023-07-31T00:00:00.000Z', services: 670, repoServices: { 'contrib-declarations': 310, 'dating-declarations': 25, 'demo-declarations': 2, 'france-declarations': 107, 'france-elections-declarations': 5, 'p2b-compliance-declarations': 203, 'pga-declarations': 18 } }, { date: '2023-08-31T00:00:00.000Z', services: 674, repoServices: { 'contrib-declarations': 312, 'dating-declarations': 25, 'demo-declarations': 4, 'france-declarations': 107, 'france-elections-declarations': 5, 'genai-declarations': 0, 'p2b-compliance-declarations': 203, 'pga-declarations': 18 } }, { date: '2023-09-30T00:00:00.000Z', services: 688, repoServices: { 'contrib-declarations': 313, 'dating-declarations': 25, 'demo-declarations': 4, 'france-declarations': 108, 'france-elections-declarations': 5, 'genai-declarations': 12, 'p2b-compliance-declarations': 203, 'pga-declarations': 18 } }, { date: '2023-10-31T00:00:00.000Z', services: 691, repoServices: { 'contrib-declarations': 313, 'dating-declarations': 25, 'demo-declarations': 4, 'france-declarations': 108, 'france-elections-declarations': 5, 'genai-declarations': 15, 'p2b-compliance-declarations': 203, 'pga-declarations': 18 } }, { date: '2023-11-30T00:00:00.000Z', services: 692, repoServices: { 'contrib-declarations': 314, 'dating-declarations': 25, 'demo-declarations': 4, 'france-declarations': 108, 'france-elections-declarations': 5, 'genai-declarations': 15, 'p2b-compliance-declarations': 203, 'pga-declarations': 18 } }, { date: '2023-12-31T00:00:00.000Z', services: 693, repoServices: { 'contrib-declarations': 315, 'dating-declarations': 25, 'demo-declarations': 4, 'france-declarations': 108, 'france-elections-declarations': 5, 'genai-declarations': 15, 'p2b-compliance-declarations': 203, 'pga-declarations': 18 } }, { date: '2024-01-31T00:00:00.000Z', services: 697, repoServices: { 'contrib-declarations': 316, 'dating-declarations': 25, 'demo-declarations': 4, 'france-declarations': 108, 'france-elections-declarations': 5, 'genai-declarations': 17, 'p2b-compliance-declarations': 203, 'pga-declarations': 19 } }, { date: '2024-02-29T00:00:00.000Z', services: 706, repoServices: { 'contrib-declarations': 322, 'dating-declarations': 25, 'demo-declarations': 4, 'france-declarations': 108, 'france-elections-declarations': 5, 'genai-declarations': 17, 'kenya-declarations': 0, 'p2b-compliance-declarations': 203, 'pga-declarations': 22 } }, { date: '2024-03-31T00:00:00.000Z', services: 708, repoServices: { 'contrib-declarations': 322, 'dating-declarations': 25, 'demo-declarations': 5, 'france-declarations': 108, 'france-elections-declarations': 5, 'genai-declarations': 17, 'kenya-declarations': 1, 'p2b-compliance-declarations': 203, 'pga-declarations': 22 } }, { date: '2024-04-30T00:00:00.000Z', services: 719, repoServices: { 'contrib-declarations': 332, 'dating-declarations': 25, 'demo-declarations': 5, 'france-declarations': 108, 'france-elections-declarations': 5, 'genai-declarations': 18, 'kenya-declarations': 1, 'p2b-compliance-declarations': 203, 'pga-declarations': 22 } }, { date: '2024-05-31T00:00:00.000Z', services: 727, repoServices: { 'contrib-declarations': 337, 'dating-declarations': 26, 'demo-declarations': 5, 'france-declarations': 108, 'france-elections-declarations': 5, 'genai-declarations': 19, 'kenya-declarations': 2, 'p2b-compliance-declarations': 203, 'pga-declarations': 22 } }, { date: '2024-06-30T00:00:00.000Z', services: 727, repoServices: { 'contrib-declarations': 337, 'dating-declarations': 26, 'demo-declarations': 5, 'france-declarations': 108, 'france-elections-declarations': 5, 'genai-declarations': 19, 'kenya-declarations': 2, 'p2b-compliance-declarations': 203, 'pga-declarations': 22 } }, { date: '2024-07-31T00:00:00.000Z', services: 732, repoServices: { 'contrib-declarations': 337, 'dating-declarations': 26, 'demo-declarations': 5, 'france-declarations': 108, 'france-elections-declarations': 5, 'france-public-declarations': 5, 'genai-declarations': 19, 'kenya-declarations': 2, 'p2b-compliance-declarations': 203, 'pga-declarations': 22 } }, { date: '2024-08-31T00:00:00.000Z', services: 745, repoServices: { 'contrib-declarations': 338, 'dating-declarations': 26, 'demo-declarations': 5, 'france-declarations': 109, 'france-elections-declarations': 5, 'france-public-declarations': 15, 'genai-declarations': 19, 'kenya-declarations': 3, 'p2b-compliance-declarations': 203, 'pga-declarations': 22 } }, { date: '2024-09-30T00:00:00.000Z', services: 763, repoServices: { 'contrib-declarations': 350, 'dating-declarations': 26, 'demo-declarations': 6, 'france-declarations': 109, 'france-elections-declarations': 5, 'france-public-declarations': 20, 'genai-declarations': 19, 'kenya-declarations': 3, 'p2b-compliance-declarations': 203, 'pga-declarations': 22 } }, { date: '2024-10-31T00:00:00.000Z', services: 768, repoServices: { 'contrib-declarations': 351, 'dating-declarations': 26, 'demo-declarations': 6, 'france-declarations': 112, 'france-elections-declarations': 5, 'france-public-declarations': 21, 'genai-declarations': 19, 'kenya-declarations': 3, 'p2b-compliance-declarations': 203, 'pga-declarations': 22 } }, { date: '2024-11-30T00:00:00.000Z', services: 769, repoServices: { 'contrib-declarations': 351, 'dating-declarations': 26, 'demo-declarations': 6, 'france-declarations': 113, 'france-elections-declarations': 5, 'france-public-declarations': 21, 'genai-declarations': 19, 'kenya-declarations': 3, 'p2b-compliance-declarations': 203, 'pga-declarations': 22 } }, { date: '2024-12-31T00:00:00.000Z', services: 771, repoServices: { 'contrib-declarations': 351, 'dating-declarations': 26, 'demo-declarations': 6, 'france-declarations': 113, 'france-elections-declarations': 5, 'france-public-declarations': 21, 'genai-declarations': 21, 'kenya-declarations': 3, 'p2b-compliance-declarations': 203, 'pga-declarations': 22 } }, { date: '2025-01-31T00:00:00.000Z', services: 797, repoServices: { 'contrib-declarations': 352, 'dating-declarations': 26, 'demo-declarations': 6, 'france-declarations': 113, 'france-elections-declarations': 5, 'france-public-declarations': 22, 'genai-declarations': 32, 'kenya-declarations': 16, 'p2b-compliance-declarations': 203, 'pga-declarations': 22 } }, { date: '2025-02-28T00:00:00.000Z', services: 797, repoServices: { 'contrib-declarations': 352, 'dating-declarations': 26, 'demo-declarations': 6, 'france-declarations': 113, 'france-elections-declarations': 5, 'france-public-declarations': 22, 'genai-declarations': 32, 'kenya-declarations': 16, 'p2b-compliance-declarations': 203, 'pga-declarations': 22 } }, { date: '2025-03-31T00:00:00.000Z', services: 801, repoServices: { 'contrib-declarations': 354, 'dating-declarations': 26, 'demo-declarations': 7, 'france-declarations': 114, 'france-elections-declarations': 5, 'france-public-declarations': 22, 'genai-declarations': 32, 'kenya-declarations': 16, 'p2b-compliance-declarations': 203, 'pga-declarations': 22 } }, { date: '2025-04-30T00:00:00.000Z', services: 804, repoServices: { 'contrib-declarations': 357, 'dating-declarations': 26, 'demo-declarations': 7, 'france-declarations': 114, 'france-elections-declarations': 5, 'france-public-declarations': 22, 'genai-declarations': 32, 'kenya-declarations': 16, 'p2b-compliance-declarations': 203, 'pga-declarations': 22 } }];

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('servicesChart');
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);

  gradient.addColorStop(0, 'rgba(75,192,192,0.3)');
  gradient.addColorStop(1, 'rgba(75,192,192,0.05)');

  // eslint-disable-next-line no-unused-vars
  const servicesChart = new Chart(canvas, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Total services',
        data: dataServices.map(d => ({
          x: new Date(d.date),
          y: d.services,
          repoServices: d.repoServices,
        })),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: gradient,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(75, 192, 192)',
        pointBorderColor: '#fff',
        pointHoverRadius: 5,
        fill: true,
        tension: 0.4,
      }],
    },
    options: {
      responsive: true,
      layout: { padding: { right: 40 } },
      plugins: {
        title: {
          display: false,
          text: 'Evolution of total tracked services',
          font: { size: 24, weight: 'bold', family: 'system-ui, -apple-system, sans-serif' },
          color: '#333',
          padding: { top: 20, bottom: 30 },
        },
        legend: {
          display: false,
          labels: {
            font: { size: 16, family: 'system-ui, -apple-system, sans-serif' },
            color: '#333',
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          displayColors: false,
          callbacks: {
            title(context) {
              const date = new Date(context[0].raw.x);
              const total = context[0].raw.y;

              return [
                date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }), // use user's locale, see https://stackoverflow.com/a/31873738
                `${total} services`,
              ];
            },
            label(context) {
              const dataPoint = context.raw;
              const label = [];

              if (dataPoint.repoServices) {
                Object.entries(dataPoint.repoServices)
                  .sort((a, b) => b[1] - a[1])
                  .forEach(([ repo, count ]) => {
                    if (count > 0) {
                      label.push(`${repo.replace('-declarations', '')}: ${count}`);
                    }
                  });
              }

              return label;
            },
          },
        },
        annotation: {
          annotations: {
            latestValue: {
              type: 'label',
              xValue: dataServices[dataServices.length - 1].date,
              yValue: dataServices[dataServices.length - 1].services,
              content: dataServices[dataServices.length - 1].services.toString(),
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
      },
      scales: {
        x: {
          type: 'time',
          max: new Date(new Date(dataServices[dataServices.length - 1].date).setMonth(new Date(dataServices[dataServices.length - 1].date).getMonth() + 1)),
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
            text: 'Total number of services',
            font: { size: 18, family: 'system-ui, -apple-system, sans-serif' },
            color: '#333',
          },
          grid: { color: 'rgba(0, 0, 0, 0.1)' },
        },
      },
    },
  });
});
