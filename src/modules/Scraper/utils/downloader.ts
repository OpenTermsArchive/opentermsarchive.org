import {
  getHostlevels,
  interceptCookieUrls,
  removeCookieBanners,
} from '../i-dont-care-about-cookies';

import { URL } from 'url';
import debug from 'debug';
import fse from 'fs-extra';
import puppeteer from 'puppeteer';

const logDebug = debug('ota.org:debug');

export const downloadUrl = async (url: string, { folderPath }: { folderPath: string }) => {
  fse.ensureDirSync(folderPath);

  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_BIN,
    headless: true,
    ignoreDefaultArgs: ['--disable-extensions', '--enable-automation'],
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  page.on('console', (consoleObj: any) => logDebug('>> in page', consoleObj.text()));

  const { hostname } = new URL(url);
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

  await page.goto(url, { waitUntil: 'networkidle0' });

  await removeCookieBanners(page, hostname);

  const html = await page.content();
  fse.writeFileSync(`${folderPath}/index.html`, html.replace(/<script.*?>.*?<\/script>/gim, ''));

  browser.close();
  return folderPath;
};
