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

// Estructura para el user de google
export interface IUserGoogle {
  displayName: string;
  email: string;
  status: boolean;
  createdAt: Date;
  lastLogin: Date;
  avatar?: string;
  IdGoogle?: unknown;
}
