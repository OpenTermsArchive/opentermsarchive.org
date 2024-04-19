const { spawn, execSync } = require('child_process');

const cypress = require('cypress');
const waitOn = require('wait-on');

console.log('→ Start Hugo if necessary');
const hugoServer = spawn('hugo', [ 'serve', '--logLevel', 'error', '--port', '1313' ], { shell: true, detached: true });

hugoServer.stderr.on('data', data => {
  console.error('Error when starting Hugo:', data.toString());
});

waitOn({ resources: ['http://localhost:1313'] }, async error => {
  if (error) {
    console.error('Error when waiting for Hugo', error);

    return hugoServer.kill('SIGTERM');
  }

  console.log('→ Start Cypress');
  try {
    await cypress.run({ configFile: 'test/cypress/cypress.config.js' });
  } catch (error) {
    console.error('Cypress error', error);
  } finally {
    try {
      hugoServer.kill('SIGTERM');
    } catch (error) {
      console.error('Error occurred while trying to kill the Hugo process:', error);
    }
  }
});
