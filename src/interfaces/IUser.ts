export interface IUser {
  id: number;
  username: string;
  email: string;
  image?: string;
  password_hash: string;
  is_online: boolean;
  createdAt: string;
  updatedAt: string;
}
