import { GetContributeServiceResponse, PostContributeServiceResponse } from '../../interfaces';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import HttpStatusCode from 'http-status-codes';
import { addService } from '../../managers/ServiceManager';
import axios from 'axios';
import dayjs from 'dayjs';
import { downloadUrl } from 'modules/Scraper/utils/downloader';
import fs from 'fs';
import { getLatestCommit } from 'modules/Github/api';
import merge from 'lodash/merge';
import path from 'path';
const { serverRuntimeConfig } = getConfig();

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

    const folderPath = path.join(serverRuntimeConfig.scrapedFilesFolder, folderName);
    const newUrlPath = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${
      serverRuntimeConfig.scrapedIframeUrl
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

const saveHistoryFile = async ({
  historyFullPath,
  serviceName,
  versionsRepo,
  documentType,
  existingJson,
}: {
  historyFullPath: string;
  serviceName: string;
  existingJson: any;
  versionsRepo: string;
  documentType: string;
}) => {
  if (!fs.existsSync(historyFullPath)) {
    fs.writeFileSync(historyFullPath, '{}');
  }

  let historyJson = JSON.parse(fs.readFileSync(historyFullPath, 'utf8'));

  const latestCommit = await getLatestCommit({
    repo: versionsRepo,
    path: `${encodeURIComponent(serviceName)}/${encodeURIComponent(documentType)}.md`,
  });

  const lastCommitDate = latestCommit?.commit?.author.date;

  const newHistoryJson = {
    ...historyJson,
    [documentType]: [
      {
        ...existingJson.documents[documentType],
        validUntil: dayjs(lastCommitDate || new Date()).format(),
      },
      ...(historyJson[documentType] || []),
    ],
  };
  fs.writeFileSync(historyFullPath, JSON.stringify(newHistoryJson, null, 2));
};

const saveOnLocal =
  (data: string, path: string, versionsRepo: string) =>
  async (_: NextApiRequest, res: NextApiResponse<any>) => {
    try {
      let json = JSON.parse(data);

      const documentType = Object.keys(json.documents)[0];
      const sanitizedName = json.name.replace(/[^\p{L}\.\s\d]/gimu, '');
      const fullPath = `${path}/${sanitizedName}.json`;
      const historyFullPath = `${path}/${sanitizedName}.history.json`;

      if (fs.existsSync(fullPath)) {
        const existingJson = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        if (versionsRepo) {
          await saveHistoryFile({
            serviceName: sanitizedName,
            versionsRepo,
            documentType,
            historyFullPath,
            existingJson,
          });
        }
        json = merge(existingJson, json);
      }

      fs.writeFileSync(fullPath, JSON.stringify(json, null, 2));

      res.json({
        status: 'ok',
        message: `File saved`,
        path: fullPath,
      });
    } catch (e: any) {
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

const addNewService =
  (body: any) => async (_: NextApiRequest, res: NextApiResponse<PostContributeServiceResponse>) => {
    const service: any = await addService({
      destination: body?.destination,
      name: body?.name,
      documentType: body?.documentType,
      json: body?.json,
      url: body?.url,
    });

    return res.json({
      status: 'ok',
      message: `issue available on Github`,
      url: service?.html_url,
    });
  };

const services = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, query } = req;
  if (req.method === 'GET' && query?.url) {
    return get(query.url as string)(req, res);
  }

  if (req.method === 'POST' && body?.json) {
    return addNewService(body)(req, res);
  }

  if (req.method === 'POST' && body?.data) {
    return saveOnLocal(
      body?.data as string,
      body?.path as string,
      body?.versionsRepo as string
    )(req, res);
  }

  res.statusCode = HttpStatusCode.FORBIDDEN;
  res.json({ status: 'ko', message: 'Nothing there' });
};

export default services;
