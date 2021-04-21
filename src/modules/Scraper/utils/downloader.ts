import PuppeteerPlugin from 'website-scraper-puppeteer';
import scrape from 'website-scraper';

interface DownloaderActions {
  [key: string]: (data?: any) => any;
}

class ActionsPlugin {
  private actions: DownloaderActions;
  constructor(actions: DownloaderActions) {
    this.actions = actions;
  }
  apply(registerAction: any) {
    Object.keys(this.actions).forEach((actionName) => {
      registerAction(actionName, this.actions[actionName]);
    });
  }
}

export const downloadUrl = async (url: string, { folderPath }: { folderPath: string }) => {
  return new Promise((resolve, reject) =>
    scrape({
      // Provide the URL(s) of the website(s) that you want to clone
      urls: [url],
      directory: folderPath,
      plugins: [
        new PuppeteerPlugin({
          launchOptions: {
            executablePath: process.env.CHROME_BIN || null,
            headless: true,
            args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage'],
          } /* optional */,
          blockNavigation: true,
          scrollToBottom: {
            timeout: 5000,
            viewportN: 10,
          } /* optional */,
        }),
        new ActionsPlugin({
          afterFinish: () => {
            resolve(folderPath);
          },
          error: (error) => {
            reject(error);
          },
        }),
      ],
    })
  );
};
