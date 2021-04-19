import * as mongoose from 'mongoose';

import type { NextApiRequest, NextApiResponse } from 'next';

let cachedDb: typeof mongoose;

// mongoose.set('debug', true);

const dbConnect = async () => {
  if (cachedDb) {
    console.log('=> using cached database instance');
    return Promise.resolve(cachedDb);
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not set');
  }

  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const connection = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  cachedDb = connection;

  return connection;
};

export const withDb = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  await dbConnect();

  return handler(req, res);
};

export default dbConnect;
