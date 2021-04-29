import fse from 'fs-extra';
import puppeteer from 'puppeteer';

export const downloadUrl = async (url: string, { folderPath }: { folderPath: string }) => {
  const browser = await puppeteer.launch({
    // @ts-ignore
    executablePath: process.env.CHROME_BIN || null,
    headless: true,
    args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  console.log(`Create dir ${folderPath}`);

  fse.ensureDirSync(folderPath);

  await page.goto(url, {
    waitUntil: 'networkidle0',
  });

  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (req.isNavigationRequest() && req.frame() === page.mainFrame() && req.url() !== url) {
      req.abort('aborted');
    } else {
      req.continue();
    }
  });

  await page.screenshot({ path: `${folderPath}/example.png` });
  const html = await page.content();
  fse.writeFileSync(`${folderPath}/index.html`, html.replace(/<script.*?>.*?<\/script>/gim, ''));

  return folderPath;
};
