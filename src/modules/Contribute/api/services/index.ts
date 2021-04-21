// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { GetContributeServiceResponse } from '../../interfaces';
import HttpStatusCode from 'http-status-codes';
import { downloadUrl } from 'modules/Scraper/utils/downloader';
import fs from 'fs';
import path from 'path';

const get = (url: string) => async (
  _: NextApiRequest,
  res: NextApiResponse<GetContributeServiceResponse>
) => {
  const folderName = url.replace(/[^\p{L}\d_]/gimu, '_');

  const folderPath = path.join(process.env.TMP_SCRAPED_SERVICES_FOLDER || '', folderName);

  if (fs.existsSync(folderPath)) {
    console.log(`Folder ${folderPath} exists`);
    res.statusCode = HttpStatusCode.OK;
    res.json({
      status: 'ok',
      message: 'OK',
      url: `${process.env.TMP_SCRAPED_SERVICES_URL || ''}/${folderName}/index.html`,
    });
    return res;
  }

  try {
    console.log(`Folder ${folderPath} does not exist`);
    console.log(`downloading ${url}`);
    console.time('downloading');
    await downloadUrl(url, { folderPath });
    console.timeEnd('downloading');
    res.statusCode = HttpStatusCode.OK;
    res.json({
      status: 'ok',
      message: 'OK',
      url: `${process.env.TMP_SCRAPED_SERVICES_URL || ''}/${folderName}/index.html`,
    });
    return res;
  } catch (e) {
    console.error(e);
    res.statusCode = HttpStatusCode.METHOD_FAILURE;
    res.json({
      status: 'ko',
      message: 'Could not download url',
      url: '',
    });
    return res;
  }
};

const services = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET' && req?.query?.url) {
    return get(req?.query?.url as string)(req, res);
  }

  res.statusCode = HttpStatusCode.FORBIDDEN;
  res.json({ status: 'ko', message: 'Nothing there' });
};

export default services;
