import { IUserGoogle } from '../entities/User';
import { AbstractDao } from './AbstractoDao';
import { Db } from 'mongodb';

export class GoogleUsers extends AbstractDao<IUserGoogle> {
  public constructor(db: Db) {
    super('google_users', db);
  }

  createAccountUser(user: IUserGoogle) {
    const { IdGoogle, ...newUser } = user;
    return this.createOne(newUser);
  }

  signIn(id: string) {
    return this.update(id, { lastLogin: new Date() });
  }

  getUserByEmail(email: string) {
    const query = { email };
    return this.findOneByFilter(query);
  }
}
