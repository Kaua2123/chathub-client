import { IToken } from 'jwt-decode';
import { createContext } from 'react';
import { ContextData } from './ChatProvider';
import { Socket } from 'socket.io-client';

export const AuthContext = createContext<IToken | undefined>(undefined); // precisa de um valor padrão
export const ChatContext = createContext<ContextData | undefined>(undefined);
export const SocketContext = createContext<Socket | null>(null);
