import { getConnection } from '@models/mongodb/MongodbConnection';
import { GoogleUsers } from '@models/mongodb/GoogleUsers';

export class UsersGoogle {
  private dao: GoogleUsers;
  public constructor() {
    getConnection()
      .then((connection) => {
        this.dao = new GoogleUsers(connection);
      })
      .catch((error) => console.log(error));
  }

  public async signInOrLoginWithGoogle(
    displayName: string,
    avatar: string,
    email: string,
    IdGoogle: string,
  ) {
    try {
      const userExists = await this.dao.getUserByEmail(email);
      if (!!!userExists) {
        const newGoogleUser = {
          displayName,
          email,
          status: true,
          createdAt: new Date(),
          lastLogin: new Date(),
          avatar,
          IdGoogle,
        };

        return this.dao.createAccountUser(newGoogleUser);
      } else {
        // si ya existe pues hace el sign in (en teoría)
        await this.dao.signIn(userExists._id.toString());
        return userExists;
      }
    } catch (error) {
      throw error;
    }
  }
}
