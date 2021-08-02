import {
  getHostlevels,
  getHostname,
  interceptCookieUrls,
  removeCookieBanners,
} from '../i-dont-care-about-cookies';

import UserAgent from 'user-agents';
import debug from 'debug';
import fse from 'fs-extra';
import puppeteer from 'puppeteer';

const logDebug = debug('ota.org:debug');

export const downloadUrl = async (url: string, { folderPath }: { folderPath: string }) => {
  fse.ensureDirSync(folderPath);

  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_BIN,
    headless: true,
    // ignoreDefaultArgs: ['--disable-extensions', '--enable-automation'],
    args: [
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      // `--load-extension=${extensionPath}`,
    ],
  });
  const page = await browser.newPage();
  await page.setUserAgent(new UserAgent().toString());
  page.on('console', (consoleObj: any) => logDebug('>> in page', consoleObj.text()));

  const hostname = getHostname(url, true);
  const hostLevels = getHostlevels(hostname);

  // Intercept not wanted requests
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const reqUrl = req.url();
    if (
      interceptCookieUrls(reqUrl, hostLevels) ||
      (req.isNavigationRequest() && req.frame() === page.mainFrame() && reqUrl !== url)
    ) {
      req.abort('aborted');
    } else {
      req.continue();
    }
  });

  try {
    await page.goto(url, { waitUntil: 'networkidle0' });

    await removeCookieBanners(page, hostname);

    const html = await page.content();
    fse.writeFileSync(`${folderPath}/index.html`, html.replace(/<script.*?>.*?<\/script>/gim, ''));
    browser.close();
    return { status: 'ok' };
  } catch (e) {
    console.error(e);
    fse.removeSync(folderPath);
    browser.close();
    return { status: 'ko', error: e.toString() };
  }
};
