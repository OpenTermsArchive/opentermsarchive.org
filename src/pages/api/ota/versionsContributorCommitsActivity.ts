// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import HttpStatusCode from 'http-status-codes';
import { getAllVersionsContributorCommitActivity } from 'modules/Github/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return res.json(await getAllVersionsContributorCommitActivity());
  }

  res.statusCode = HttpStatusCode.FORBIDDEN;
  res.json({ status: 'ko', message: 'Nothing there' });
};
