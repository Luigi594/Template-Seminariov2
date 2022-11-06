import { IUser } from '../entities/User';
import { AbstractDao } from './AbstractoDao';
import { Db } from 'mongodb';

export class UsersDao extends AbstractDao<IUser> {
  public constructor(db: Db) {
    super('users', db);
  }

  getUsersByEmail(email: string) {
    const query = { email };
    return this.findOneByFilter(query);
  }

  getAllUsers() {
    return this.findAll();
  }

  // este será para cuando el usuario falle los intentos de loggearse
  updateUserFailed(id: string) {
    return this.UpdateRaw(id, {
      $inc: { failedAttempts: 1 },
      $set: { updated: new Date() },
    });
  }

  // update Logging Success
  updateLoginSuccess(id: string) {
    const currentDate = new Date();
    return this.update(id, {
      lastLogin: currentDate,
      failedAttempts: 0,
      updated: currentDate,
    });
  }

  // añadir un rol para el usuario
  // addToSet añade un nuevo elemento a un arreglo
  // pero si ya existe no lo agrega, el método push si
  addRole(id: string, role: string) {
    return this.UpdateRaw(id, {
      $addToSet: { roles: role },
    });
  }

  // createUser
  createUser(user: IUser) {
    const { _id, ...newUser } = user;
    return this.createOne(newUser);
  }
}
