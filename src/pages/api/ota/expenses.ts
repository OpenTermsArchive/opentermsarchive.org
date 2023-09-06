import type { NextApiRequest, NextApiResponse } from 'next';

import { CommonResponse } from 'interfaces';
import HttpStatusCode from 'http-status-codes';
import dayjs from 'dayjs';

export interface ExpensesData {
  expenses: typeof expenses;
  accumulatedExpenditures: number;
  totalExpendituresData: {
    x: string;
    y: number;
  }[];
}

const expenses = {
  '2020-06-01': 20164,
  '2020-07-01': 41225,
  '2020-08-01': 65980,
  '2020-09-01': 82662,
  '2020-10-01': 113006,
  '2020-11-01': 134122,
  '2020-12-01': 157444,
  '2021-01-01': 160489,
  '2021-02-01': 163535,
  '2021-03-01': 175102,
  '2021-04-01': 189532,
  '2021-05-01': 201578,
  '2021-06-01': 214084,
  '2021-07-01': 224887,
  '2021-08-01': 237278,
  '2021-09-01': 252117,
  '2021-10-01': 294596,
  '2021-11-01': 326758,
  '2021-12-01': 340544,
  '2022-01-01': 342250,
  '2022-02-01': 354120,
  '2022-03-01': 401509,
  '2022-04-01': 431689,
  '2022-05-01': 472800,
  '2022-06-01': 512906,
  '2022-07-01': 551087,
  '2022-08-01': 572105,
  '2022-09-01': 609376,
  '2022-10-01': 638153,
  '2022-11-01': 685259,
  '2022-12-01': 699557,
  '2023-01-01': 733520,
  '2023-02-01': 753788,
  '2023-03-01': 779472,
  '2023-04-01': 797888,
  '2023-05-01': 818257,
  '2023-06-01': 826478,
  '2023-07-01': 832870,
};

export const buildExpensesData = (): ExpensesData => {
  const totalExpendituresData: any = [];
  let accumulatedExpenditures = 0;

  Object.entries(expenses).forEach(([month, accumulatedExpendituresThisMonth]) => {
    accumulatedExpenditures = Math.max(accumulatedExpenditures, accumulatedExpendituresThisMonth);

    totalExpendituresData.push({
      x: dayjs(month).toISOString(),
      y: accumulatedExpendituresThisMonth,
    });
  });
  return {
    expenses,
    accumulatedExpenditures,
    totalExpendituresData,
  };
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CommonResponse | (ExpensesData & CommonResponse)>
) => {
  if (req.method === 'GET') {
    return res.json({
      status: 'ok',
      ...buildExpensesData(),
    });
  }

  res.statusCode = HttpStatusCode.FORBIDDEN;
  res.json({ status: 'ko', message: 'Nothing there' });
};
