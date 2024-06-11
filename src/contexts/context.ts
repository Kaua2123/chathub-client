import { IToken } from 'jwt-decode';
import { createContext, useContext } from 'react';

export const AuthContext = createContext<IToken | undefined>(undefined); // precisa de um valor padrão

export function useAuthContext() {
  const decodedToken = useContext(AuthContext);

  if (decodedToken === undefined) {
    throw new Error('useAuthContext must be used with a children ');
  }

  return decodedToken;
}
