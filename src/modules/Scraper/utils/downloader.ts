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

export const downloadUrl = async (
  url: string,
  { folderPath, newUrlPath }: { folderPath: string; newUrlPath: string }
) => {
  fse.ensureDirSync(folderPath);
  const parsedUrl = new URL(url);
  // extract domain name from subdomain
  const [extension, domain] = parsedUrl.hostname.split('.').reverse();
  const domainname = `${domain}.${extension}`;

  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_BIN,
    // ignoreDefaultArgs: ['--disable-extensions', '--enable-automation'],
    args: [
      '--no-sandbox',
      '--disable-gpu',
      '--headless',
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

  let assets: { from: string; to: string }[] = [];

  page.on('response', async (response) => {
    const resourceType = response.request().resourceType();
    const { hostname, pathname } = new URL(response.url());

    if (!hostname.includes(domainname) || !['image', 'stylesheet'].includes(resourceType)) {
      return;
    }
    const buffer = await response.buffer();
    const { pathname: newUrlPathname, search: newUrlSearch } = new URL(response.url());
    const newUrl = `${newUrlPathname}${newUrlSearch}`;

    // sometimes the url is relative to the root of the domain, so we need to remove both
    // and in order to prevent string to be replaced twice, we need to replace it along with the surrounding quotes
    assets.push({ from: `"${newUrl}"`, to: `"${newUrlPath}${pathname}"` });
    assets.push({ from: `'${newUrl}'`, to: `'${newUrlPath}${pathname}'` });

    assets.push({ from: response.url(), to: `${newUrlPath}${pathname}` });

    fse.outputFile(`${folderPath}${pathname}`, buffer, 'base64');
  });

  let message: any;
  try {
    await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle0', 'networkidle2'] });

    await removeCookieBanners(page, hostname);

    const html = await page.content();

    // https://stackoverflow.com/questions/6659351/removing-all-script-tags-from-html-with-js-regular-expression
    // replace all scripts with empty string
    let filteredHtml = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gim, '');

    assets.forEach(({ from, to }) => {
      filteredHtml = filteredHtml.replace(from, to);
    });

    fse.writeFileSync(`${folderPath}/index.html`, filteredHtml);

    message = { status: 'ok' };
  } catch (e) {
    console.error(e.toString());
    fse.removeSync(folderPath);
    message = { status: 'ko', error: e.toString() };
  }
  await page.close();
  await browser.close();

  return message;
};
