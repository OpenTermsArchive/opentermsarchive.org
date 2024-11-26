const fs = require('fs');
const path = require('path');

require('dotenv').config();

async function fetchUptimeData() {
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
    const data = await response.json();
    const outputPath = path.join(__dirname, '../data/uptime.json');

    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log('✅ Uptime data successfully written to data/uptime.json');
  } catch (error) {
    console.error('❌ Failed to fetch UptimeRobot data');
    process.exit(1);
  }
}

fetchUptimeData();
