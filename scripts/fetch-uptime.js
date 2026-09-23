const fs = require('fs');
const path = require('path');

require('dotenv').config();

const outputPath = path.join(__dirname, '../data/uptime.json');

function writeEmptyData() {
  fs.writeFileSync(outputPath, JSON.stringify({ monitors: [] }, null, 2));
  console.warn('⚠️ Empty uptime data written to data/uptime.json');
}

async function fetchUptimeData() {
  if (!process.env.UPTIMEROBOT_API_KEY) {
    console.warn('⚠️ UPTIMEROBOT_API_KEY environment variable is not set; uptime data will not be displayed.');
    writeEmptyData();
    return;
  }

  const options = {
    method: 'POST',
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      api_key: process.env.UPTIMEROBOT_API_KEY,
      format: 'json',
      custom_uptime_ratios: '30',
    }),
  };

  try {
    const response = await fetch('https://api.uptimerobot.com/v2/getMonitors', options);

    if (!response.ok) {
      console.warn(`⚠️ Failed to fetch UptimeRobot data: ${response.status} ${response.statusText}; uptime data will not be displayed.`);
      writeEmptyData();
      return;
    }

    const data = await response.json();

    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log('✅ Uptime data successfully written to data/uptime.json');
  } catch (error) {
    console.warn(`⚠️ Failed to fetch UptimeRobot data: ${error.message}; uptime data will not be displayed.`);
    writeEmptyData();
  }
}

fetchUptimeData();
