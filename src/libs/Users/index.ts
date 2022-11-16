import { getConnection } from '@models/mongodb/MongodbConnection';
import { UsersDao } from '@server/dao/models/mongodb/UsersDao';
import { checkPassword, getPassword } from '@server/utils/crypto';
import { sign } from '@server/utils/jwt';

const rolesAvailable = ['public', 'admin', 'auditor', 'support'];

export class Users {
  private dao: UsersDao;
  public constructor() {
    getConnection()
      .then((connection) => {
        this.dao = new UsersDao(connection);
      })
      .catch((err) => console.error(err));
  }

  // método para crear la cuenta del usuario
  public signin(name: string, email: string, password: string) {
    const currentDate = new Date();
    const newUser = {
      name,
      email,
      password: getPassword(password),
      oldPasswords: [] as string[],
      status: 'ACT',
      created: currentDate,
      updated: currentDate,
      failedAttempts: 0,
      lastLogin: currentDate,
      avatar: '',
      roles: ['public'],
      _id: null,
    };

    return this.dao.createUser(newUser);
  }

  // y esta es para el login, cuando ya tiene su cuenta creada
  public async login(email: string, password: string) {
    try {
      const user = await this.dao.getUsersByEmail(email);

      if (!!!user) {
        console.log('LOGIN: NO USER FOUND: ', `${email}`);
        throw new Error('LOGIN NO USER FOUND');
      }

      if (user.status !== 'ACT') {
        console.log(
          'LOGIN: STATUS NOT ACTIVE: ',
          `${user.email} - ${user.status}`,
        );

        await this.dao.updateUserFailed(user._id.toString());
        throw new Error('LOGIN STATUS INVALID');
      }

      if (!checkPassword(password, user.password)) {
        console.log(
          'LOGIN: PASSWORD INVALID: ',
          `${user.email} - ${user.status}`,
        );

        await this.dao.updateUserFailed(user._id.toString());
        throw new Error('LOGIN PASSWORD INVALID');
      }

      const { name, email: emailUser, avatar, _id } = user;
      const returnUser = { name, email: emailUser, avatar, _id };

      await this.dao.updateLoginSuccess(user._id.toString());

      return { ...returnUser, token: sign(returnUser) };
    } catch (error) {
      throw error;
    }
  }

  public async assignRoles(id: string, role: string) {
    if (!rolesAvailable.includes(role)) {
      throw new Error(`Role ${role} must be of ${rolesAvailable.join(', ')}`);
    }

    return this.dao.addRole(id, role);
  }
}
