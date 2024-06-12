import { io } from 'socket.io-client';
import { SocketContext } from './contexts';

export type SocketProviderProps = {
  children: JSX.Element;
};

function SocketProvider({ children }: SocketProviderProps) {
  const socket = io('http://localhost:3000');

  return (
    <div>
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    </div>
  );
}

export default SocketProvider;
