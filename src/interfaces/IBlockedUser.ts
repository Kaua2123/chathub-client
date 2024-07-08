type User = {
  id: number;
  image: string;
  image_url: string;
  username: string;
};

export interface IBlockedUser {
  id: number;
  user_who_blocked_id: number;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  User: User;
}
