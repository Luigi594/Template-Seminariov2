import { getConnection } from '@models/mongodb/MongodbConnection';

export const initMongo = (next) => {
  getConnection()
    .then((_db) => {
      console.log('Mongo Success');
      next();
    })
    .catch((error: unknown) => {
      console.log('Mongo error', error);
      process.exit(1);
    });
};
