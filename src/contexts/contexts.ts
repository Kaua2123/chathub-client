import { IToken } from 'jwt-decode';
import { createContext } from 'react';
import { ContextData } from './ChatProvider';

export const AuthContext = createContext<IToken | undefined>(undefined); // precisa de um valor padrão
export const ChatContext = createContext<ContextData | undefined>(undefined);
