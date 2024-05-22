import { io } from 'socket.io-client';

export const socket = () => io('http://localhost:3000'); // o socket deve rodar na porta do servidor
