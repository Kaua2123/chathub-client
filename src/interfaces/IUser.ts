export interface IUser {
  id: number;
  username: string;
  email: string;
  image?: string;
  image_url: string;
  password_hash: string;
  is_online: boolean;
  createdAt: string;
  updatedAt: string;
}
