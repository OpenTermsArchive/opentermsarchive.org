require('dotenv').config();

import express, { Request, Response } from 'express';

// import fs from 'fs';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

if (!process.env.TMP_SCRAPED_SERVICES_FOLDER || !process.env.TMP_SCRAPED_SERVICES_URL) {
  console.error('You need to setup TMP_SCRAPED_SERVICES_FOLDER and TMP_SCRAPED_SERVICES_URL');
  process.exit(1);
}

(async () => {
  try {
    await app.prepare();
    const server = express();

    server.use(
      `${process.env.NEXT_PUBLIC_BASE_PATH}${process.env.TMP_SCRAPED_SERVICES_URL || ''}`,
      express.static(process.env.TMP_SCRAPED_SERVICES_FOLDER || '')
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
