// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { GetContributeServiceResponse } from '../../interfaces';
import HttpStatusCode from 'http-status-codes';
import axios from 'axios';
import { downloadUrl } from 'modules/Scraper/utils/downloader';
import fs from 'fs';
import merge from 'lodash/merge';
import path from 'path';

const isPdf = async (url: string) => {
  try {
    const response = await axios.head(url);
    return response.headers['content-type'] === 'application/pdf';
  } catch (e) {
    return false;
  }
};

const get =
  (url: string) =>
  async (_: NextApiRequest, res: NextApiResponse<GetContributeServiceResponse>) => {
    if (await isPdf(url)) {
      res.json({
        status: 'ok',
        message: 'OK',
        url,
        isPdf: true,
      });
      return res;
    }

    const folderName = url.replace(/[^\p{L}\d_]/gimu, '_');

    const folderPath = path.join(process.env.TMP_SCRAPED_SERVICES_FOLDER || '', folderName);
    const newUrlPath = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${
      process.env.TMP_SCRAPED_SERVICES_URL || ''
    }/${folderName}`;

    const newUrl = `${newUrlPath}/index.html`;

    if (fs.existsSync(folderPath)) {
      console.log(`Folder ${folderPath} exists`);
      res.statusCode = HttpStatusCode.OK;
      res.json({
        status: 'ok',
        message: 'OK',
        url: newUrl,
      });
      return res;
    }

    try {
      console.log(`Folder ${folderPath} does not exist`);
      console.log(`downloading ${url}`);
      console.time('downloading');
      const { error } = await downloadUrl(url, { folderPath, newUrlPath });
      console.timeEnd('downloading');

      if (error) {
        res.statusCode = HttpStatusCode.OK;
        res.json({
          status: 'ko',
          message: 'Could not download url',
          url: '',
          error,
        });
        return res;
      }

      res.statusCode = HttpStatusCode.OK;
      res.json({
        status: 'ok',
        message: 'OK',
        url: newUrl,
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

const saveOnLocal = (data: string) => async (_: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    let json = JSON.parse(data);
    const sanitizedName = json.name.replace(/[^\p{L}\.\s\d]/gimu, '');
    const fullPath = `${process.env.NEXT_PUBLIC_OTA_SERVICES_PATH}/${sanitizedName}.json`;

    if (fs.existsSync(fullPath)) {
      const existingJson = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      json = merge(existingJson, json);
    }

    fs.writeFileSync(fullPath, JSON.stringify(json, null, 2));
    res.json({
      status: 'ok',
      message: `File saved`,
      path: fullPath,
    });
  } catch (e) {
    res.statusCode = HttpStatusCode.METHOD_FAILURE;
    res.json({
      status: 'ko',
      message: 'Could not download url',
      error: e.toString(),
    });
    return res;
  }

  return res;
};

const services = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET' && req?.query?.url) {
    return get(req?.query?.url as string)(req, res);
  }

  if (req.method === 'POST' && req?.body?.data) {
    return saveOnLocal(req?.body?.data as string)(req, res);
  }

  res.statusCode = HttpStatusCode.FORBIDDEN;
  res.json({ status: 'ko', message: 'Nothing there' });
};

export default services;
