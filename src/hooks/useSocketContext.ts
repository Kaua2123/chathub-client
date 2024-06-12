import { useContext } from 'react';
import { SocketContext } from '../contexts/contexts';

export function useSocketContext() {
  const socket = useContext(SocketContext);

  if (!socket) {
    throw new Error('useSocketContext must be used with a SocketProvider. ');
  }

  return socket;
}
