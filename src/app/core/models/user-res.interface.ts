export interface IUserRes {
  message: string;
  user: IUser;
  token: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  role: string;
}
