export interface INotification {
  id: number;
  content: string;
  type: 'friend_request' | 'message';
  createdAt: string;
  updatedAt: string;
  UserId: number;
  ConversationId: number;
}
