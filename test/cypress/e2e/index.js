const { spawn, execSync } = require('child_process');
const waitOn = require('wait-on');
const cypress = require('cypress');

console.log('→ Stop running Hugo');
try {
  execSync('pkill -f hugo').toString();
} catch (err) {}

console.log('→ Start new Hugo');
const hugoServer = spawn('hugo', ['serve', '--logLevel', 'error', '--port', '1313'], { shell: true, detached: true });

hugoServer.stderr.on('data', (data) => {
  console.error('Hugo error:', data.toString());
});

waitOn({ resources: ['http://localhost:1313'] }, async (err) => {
    if (err) {
      console.error("Error when waiting for Hugo", err);
      return hugoServer.kill('SIGTERM');
    }

    console.log('→ Start Cypress');
    try {
      const results = await cypress.run({
        configFile: 'test/cypress/cypress.config.js'
      });
    } catch (err) {
      console.error('Cypress error', err);
    } finally {
      try {
        hugoServer.kill('SIGTERM');
      } catch (err) {
        console.error('Error when stopping Hugo', err);
      }
    }
});
