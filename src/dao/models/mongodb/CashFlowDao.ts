import { ICashFlow } from '../entities/Cashflow';
import { AbstractDao } from './AbstractoDao';
import { Db, ObjectId } from 'mongodb';

export class CashFlowDao extends AbstractDao<ICashFlow> {
  public constructor(db: Db) {
    super('cashFlow', db);
  }

  public getCashFlows() {
    return super.findAll();
  }

  public getCashFlowByUser(id: string) {
    return super.findByFilter(
      { userId: new ObjectId(id) },
      {
        sort: { type: -1 },
      },
    );
  }

  // hacer paginación en mongo para manipular en el frontend
  // y no mostrar todos los documentos en una sola página
  public async getCashFlowByUserPaged(
    userId: string,
    page: number = 1,
    itemsPerPage: number = 10,
  ) {
    try {
      const totalDocuments = await super
        .getCollection()
        .countDocuments({ userId: new ObjectId(userId) });

      const totalPages = Math.ceil(totalDocuments / itemsPerPage);
      const items = await super.findByFilter(
        { userId: new ObjectId(userId) },
        {
          sort: { type: -1 },
          skip: (page - 1) * itemsPerPage,
          limit: itemsPerPage,
        },
      );

      return {
        totalDocuments,
        totalPages,
        page,
        itemsPerPage,
        items,
      };
    } catch (error) {
      throw error;
    }
  }

  // no recuerdo para qué era este
  public getTypeSummary(userId: string) {
    const match = { $match: { userId: new ObjectId(userId) } };
    const group = { $group: { _id: '$type', item: { $sum: 1 } } };
    return this.aggregate([match, group], {});
  }

  // cashFlow por id
  public async getCashFlowById(identifier: string) {
    try {
      const result = await super.findById(identifier);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // que cuente los cashFlows que tiene X usuario
  public async getCountCashFlow(userId: string) {
    try {
      return await super
        .getCollection()
        .countDocuments({ userId: new ObjectId(userId) });
    } catch (error) {
      throw error;
    }
  }

  // insertar un nuevo documento, sacando por si trae por defecto un id
  // esto es para un único usuario
  public async insertNewCashFlow(newCashFlow: ICashFlow, userId: string) {
    try {
      const { _id, ...newObject } = newCashFlow;
      newObject.userId = new ObjectId(userId);
      const result = await super.createOne(newObject);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // actualizar registro
  public async updateCashFlow(updateCashFlow: ICashFlow) {
    try {
      const { _id, ...updateObject } = updateCashFlow;
      const result = await super.update(_id as string, updateObject);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // eliminar registro
  public async deleteCashFlow(deleteCashFlow: Partial<ICashFlow>) {
    try {
      const { _id } = deleteCashFlow;
      const result = await super.delete(_id as string);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
