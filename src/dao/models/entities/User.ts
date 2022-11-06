export interface IUser {
  name: string;
  email: string;
  status: string;
  password?: string;
  oldPasswords: string[];
  created: Date;
  updated: Date;
  avatar?: string;
  failedAttempts?: number;
  lastLogin?: Date;
  roles: string[];
  _id?: unknown;
}
