import { getConnection } from '@models/mongodb/MongodbConnection';
import { CashFlowDao } from '@models/mongodb/CashFlowDao';

export interface ICashFlow {
  type: 'INCOME' | 'EXPENSE';
  date: Date;
  amount: number;
  description: string;
}

export class CashFlow {
  private dao: CashFlowDao;
  public constructor() {
    getConnection()
      .then((conn) => {
        this.dao = new CashFlowDao(conn);
      })
      .catch((err) => console.log(err));
  }

  // consultas dku
  public getAllCashFlow() {
    return this.dao.getCashFlows();
  }

  public getAllCashFlowFromUser(id: string) {
    return this.dao.getCashFlowByUser(id);
  }

  public getAllCashFlowByUserPaged(
    userId: string,
    page: number,
    items: number,
  ) {
    return this.dao.getCashFlowByUserPaged(userId, page, items);
  }

  public getCashflowById(id: string) {
    return this.dao.getCashFlowById(id);
  }

  public getCountCashFlow(userId: string) {
    return this.dao.getCountCashFlow(userId);
  }

  public getTypeSummary(userId: string) {
    return this.dao.getTypeSummary(userId);
  }

  public addCashFlow(cashFlow: ICashFlow, userId: string) {
    const { type, date, amount, description } = cashFlow;
    return this.dao.insertNewCashFlow(
      {
        type,
        date: new Date(date),
        amount: Number(amount),
        description,
      },
      userId,
    );
  }

  public updateCashFlow(index: string, cashFlow: ICashFlow) {
    return (this.dao as CashFlowDao).updateCashFlow({
      ...cashFlow,
      _id: index,
    });
  }

  public deleteCashFlow(id: string) {
    return this.dao.deleteCashFlow({ _id: id });
  }
}
