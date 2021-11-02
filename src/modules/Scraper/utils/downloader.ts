import 'ts-replace-all';

import { getHostname, removeCookieBanners } from '../i-dont-care-about-cookies';

import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import UserAgent from 'user-agents';
import debug from 'debug';
import fse from 'fs-extra';
import puppeteer from 'puppeteer-extra';

const DOWNLOAD_TIMEOUT = 30 * 1000;
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

  const browser = await puppeteer
    .use(RecaptchaPlugin())
    .use(StealthPlugin())
    .launch({
      executablePath: process.env.CHROME_BIN,
      args: [
        '--no-sandbox',
        '--disable-gpu',
        '--headless',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
      ],
    });
  const page = await browser.newPage();
  await page.setUserAgent(new UserAgent().toString());
  page.on('console', (consoleObj: any) => logDebug('>> in page', consoleObj.text()));

  const hostname = getHostname(url, true);

  let assets: { from: string; to: string }[] = [];

  page.on('response', async (response) => {
    const resourceType = response.request().resourceType();
    const status = response.status();

    const { hostname, pathname } = new URL(response.url());

    if (
      (status >= 300 && status <= 399) ||
      !hostname.includes(domainname) ||
      !['image', 'stylesheet'].includes(resourceType)
    ) {
      return;
    }
    const buffer = await response.buffer();
    const { pathname: newUrlPathname, search: newUrlSearch } = new URL(response.url());
    const newUrl = `${newUrlPathname}${newUrlSearch}`;
    const relativeUrl = newUrl.replace(parsedUrl.pathname, '');

    // sometimes the url is relative to the root of the domain, so we need to remove both
    // and in order to prevent string to be replaced twice, we need to replace it along with the surrounding quotes
    assets.push({ from: `"${newUrl}"`, to: `"${newUrlPath}${pathname}"` });
    assets.push({ from: `'${newUrl}'`, to: `'${newUrlPath}${pathname}'` });

    // in case a relative link is present such as "libs/style.min.css" when url is "https://www.tchap.gouv.fr/faq/#_Toc4344724_04"
    assets.push({ from: `"${relativeUrl}"`, to: `"${newUrlPath}${pathname}"` });
    assets.push({ from: `'${relativeUrl}'`, to: `'${newUrlPath}${pathname}'` });

    assets.push({ from: response.url(), to: `${newUrlPath}${pathname}` });

    fse.outputFile(`${folderPath}${pathname}`, buffer, 'base64');
  });

  let message: any;
  try {
    await page.goto(url, {
      waitUntil: ['domcontentloaded', 'networkidle0', 'networkidle2'],
      timeout: DOWNLOAD_TIMEOUT,
    });
    if (parsedUrl.hash) {
      try {
        const hashLinkSelector = `[href="${parsedUrl.hash}"]`;

        await page.waitForSelector(hashLinkSelector, { timeout: 1000 });
        await page.click(hashLinkSelector);
      } catch (e) {
        // no link found, do nothing
      }
    }

    await removeCookieBanners(page, hostname);

    const html = await page.content();

    // https://stackoverflow.com/questions/6659351/removing-all-script-tags-from-html-with-js-regular-expression
    // replace all scripts with empty string
    let filteredHtml = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gim, '');

    assets.forEach(({ from, to }) => {
      filteredHtml = filteredHtml.replaceAll(from, to);
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
