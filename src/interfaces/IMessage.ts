export interface IMessage {
  id: number;
  content: string;
  is_saved: number | boolean;
  is_sender: boolean;
  createdAt: string;
  updatedAt: string;
  ConversationId: number;
  UserId: number;
}
