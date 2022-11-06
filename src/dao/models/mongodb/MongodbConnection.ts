import { MongoClient } from 'mongodb';

let connection: MongoClient = null;
let mongoURI = process.env.MONGO_URI || 'mongo://localhost:27017';
let mongodbName = process.env.MONGO_NAME || 'seminario-2022';

export const getConnection = async () => {
  // si no exista una conexión la creará
  if (!connection) {
    connection = await MongoClient.connect(mongoURI);
  }

  // devolvemos el nombre de la base al cual conectarnos
  return connection.db(mongodbName);
};
