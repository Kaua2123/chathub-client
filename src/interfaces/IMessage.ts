export interface IMessage {
  id: number;
  content: string;
  is_saved: number | boolean;
  createdAt: string;
  updatedAt: string;
  ConversationId: number;
  UserId: number;
}
