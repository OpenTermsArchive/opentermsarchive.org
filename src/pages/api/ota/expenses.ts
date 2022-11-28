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
  '2020-07-01': 21061,
  '2020-08-01': 24755,
  '2020-09-01': 16682,
  '2020-10-01': 30325,
  '2020-11-01': 21116,
  '2020-12-01': 23322,
  '2021-01-01': 3045,
  '2021-02-01': 3045,
  '2021-03-01': 11566,
  '2021-04-01': 14430,
  '2021-05-01': 12045,
  '2021-06-01': 12483,
  '2021-07-01': 10803,
  '2021-08-01': 12390,
  '2021-09-01': 14839,
  '2021-10-01': 42477,
  '2021-11-01': 32106,
  '2021-12-01': 13784,
  '2022-01-01': 1174,
  '2022-02-01': 11206,
  '2022-03-01': 46724,
  '2022-04-01': 29928,
  '2022-05-01': 41109,
  '2022-06-01': 40104,
  '2022-07-01': 38179,
  '2022-08-01': 21016,
  '2022-09-01': 37269,
  '2022-10-01': 28765,
  '2022-11-01': 46915,
  '2022-12-01': 14278,
};

export const buildExpensesData = (): ExpensesData => {
  const totalExpendituresData: any = [];
  let accumulatedExpenditures = 0;

  Object.entries(expenses).forEach(([month, expendituresThisMonth]) => {
    accumulatedExpenditures += expendituresThisMonth;
    totalExpendituresData.push({
      x: dayjs(month).toISOString(),
      y: accumulatedExpenditures,
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
