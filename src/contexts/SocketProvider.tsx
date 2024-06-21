import { io } from 'socket.io-client';
import { SocketContext } from './contexts';

export type SocketProviderProps = {
  children: JSX.Element;
};

const socket = io('http://localhost:3000'); // ta inicializando varias <vezes></vezes>

function SocketProvider({ children }: SocketProviderProps) {
  return (
    <div>
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    </div>
  );
}

export default SocketProvider;
