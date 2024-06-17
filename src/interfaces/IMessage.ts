export interface IMessage {
  id: number;
  content: string;
  is_saved: number | boolean;
  is_sender: boolean;
  is_updated: boolean;
  is_deleted: boolean;
  is_read_by: number[];
  createdAt: string;
  updatedAt: string;
  ConversationId: number;
  UserId: number;
}
