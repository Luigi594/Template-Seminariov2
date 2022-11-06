import { IDaoObject } from '@server/dao/daoBase';
import {
  ObjectId,
  Db,
  Collection,
  WithId,
  Filter,
  Document,
  InsertOneResult,
  OptionalUnlessRequiredId,
  UpdateFilter,
  UpdateResult,
  DeleteResult,
  FindOptions,
  AggregateOptions,
} from 'mongodb';

export abstract class AbstractDao<T> implements IDaoObject {
  public persistanceName: string;
  private connection: Db;
  private collection: Collection<T>; // collection de tipo generica

  constructor(persistanceName: string, connection?: Db) {
    this.persistanceName = persistanceName;

    if (connection) {
      this.connection = connection;
      this.collection = this.connection.collection(persistanceName);
    } else {
      throw new Error('No DB connection found');
    }
  }

  // encontrar todos
  public async findAll(): Promise<WithId<T>[]> {
    return await this.collection.find({}).toArray();
  }

  // encontrar por un id
  public async findById(identifier: string): Promise<WithId<T>> {
    const _id = new ObjectId(identifier) as Filter<T>;
    return await this.collection.findOne({ _id });
  }

  // encontrar varios documentos por un filtro
  public async findByFilter(
    filter: Filter<T>,
    options: FindOptions<T> = {},
  ): Promise<WithId<T>[]> {
    return this.collection.find(filter, options).toArray();
  }

  // encontrar un solo documento por un filtro
  public findOneByFilter(
    filter: Filter<T>,
    options: FindOptions<T> = {},
  ): Promise<WithId<T>> {
    return this.collection.findOne(filter, options);
  }

  // para crear un documento
  public async createOne(
    data: OptionalUnlessRequiredId<T>,
  ): Promise<InsertOneResult<T>> {
    return await this.collection.insertOne(data);
  }

  //para actualizar un documento
  public async update(
    identifier: string,
    data: Partial<T>,
  ): Promise<UpdateResult> {
    const _id = new ObjectId(identifier) as Filter<T>;
    return this.collection.updateOne({ _id }, {
      $set: data,
    } as UpdateFilter<T>);
  }

  // otra manera de poder actualizar
  public async UpdateRaw(
    identifier: string,
    data: UpdateFilter<T>,
  ): Promise<UpdateResult> {
    const _id = new ObjectId(identifier) as Filter<T>;
    return this.collection.updateOne({ _id }, data);
  }

  // eliminar registro
  public async delete(identifier: string): Promise<DeleteResult> {
    const _id = new ObjectId(identifier) as Filter<T>;
    return this.collection.deleteOne({ _id });
  }

  // funciones de agregación
  public async aggregate(
    stages: Document[],
    options: AggregateOptions,
  ): Promise<Document[]> {
    return this.collection.aggregate(stages, options).toArray();
  }

  // obtener la collection
  public getCollection(): Collection<T> {
    return this.collection;
  }
}
