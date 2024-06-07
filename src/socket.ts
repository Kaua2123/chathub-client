import { io } from 'socket.io-client';
import { tokenDecoder } from './utils/tokenDecoder';

const token = localStorage.getItem('token');
const decodedToken = tokenDecoder(token);

const userId = decodedToken?.id;
const queryParams = { userId };

export const socket = io('http://localhost:3000', {
  transports: ['websocket'],
  upgrade: false,
  query: queryParams,
  reconnection: false,
});
