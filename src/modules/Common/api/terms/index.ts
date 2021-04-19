// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import HttpStatusCode from 'http-status-codes';
import { withDb } from 'utils/db';

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  // const { name } = req.body as CreateHashtagInput;
  //
  // if (!name) {
  //   res.statusCode = HttpStatusCode.BAD_REQUEST;
  //   res.json({
  //     status: 'ko',
  //     message: 'Hashtag not provided',
  //   });
  //   return res;
  // }
  //
  // const sanitizedName = sanitizeHashtag(name);
  //
  // let existingHashtag: any = await HashtagManager.get({ name: sanitizedName });
  //
  // if (!existingHashtag) {
  //   existingHashtag = await HashtagManager.create({ name: sanitizedName });
  // }

  res.statusCode = HttpStatusCode.OK;
  res.json({
    status: 'ok',
    message: 'OK',
  });
  return res;
};

const list = async (_: any, res: NextApiResponse) => {
  try {
    const results: any[] = [];

    res.statusCode = HttpStatusCode.OK;
    res.json({ status: 'ok', message: 'List of hashtags', results });
    return res;
  } catch (e) {
    res.statusCode = HttpStatusCode.METHOD_FAILURE;
    res.json({ status: 'ko', message: e.toString() });
  }
};

const terms = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return create(req, res);
  }
  if (req.method === 'GET') {
    return list(req, res);
  }

  res.statusCode = HttpStatusCode.FORBIDDEN;
  res.json({ status: 'ko', message: 'Nothing there' });
};

export default withDb(terms);
