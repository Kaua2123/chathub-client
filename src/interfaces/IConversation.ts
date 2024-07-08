type ConversationType = 'conversation' | 'group';
type UsersConversations = {
  ConversationId: number;
  UserId: number;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number;
  image: string;
  image_url: string;
  username: string;
  users_conversations: UsersConversations;
};

export interface IConversation {
  id: number;
  type: ConversationType;
  name: string;
  participants: string[];
  image: string;
  image_url: string;
  creator_id: number;
  invited_id: number;
  Users: User[];
}
