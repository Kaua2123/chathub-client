import { useContext } from 'react';
import { ChatContext } from '../contexts/contexts';

export function useChatContext() {
  const chatContext = useContext(ChatContext);

  if (!chatContext) {
    throw new Error('useChatContext must be used with a ChatProvider. ');
  }

  return chatContext;
}
