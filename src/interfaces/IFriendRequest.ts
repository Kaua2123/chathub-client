type Status = 'Pending' | 'Accepted';

export interface IFriendRequest {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  User: {
    username: string;
    is_online: boolean;
  };
}
