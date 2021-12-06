require('dotenv').config();

import express, { Request, Response } from 'express';
import { serverRuntimeConfig } from '../../next.config';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();

    server.use(
      `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${serverRuntimeConfig.scrapedIframeUrl}`,
      express.static(serverRuntimeConfig.scrapedFilesFolder)
    );

    server.all('*', (req: Request, res: Response) => {
      return handle(req, res);
    });
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
