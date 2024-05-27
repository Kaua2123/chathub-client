import { IUser } from './IUser';

export interface IFriend extends IUser {
  users_friends: {
    createdAt: string;
    updatedAt: string;
    userId: number;
    friendId: number;
  };
}
