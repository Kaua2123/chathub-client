import { useContext } from 'react';
import { AuthContext } from '../contexts/contexts';

export function useAuthContext() {
  const decodedToken = useContext(AuthContext);

  if (!decodedToken) {
    throw new Error('useAuthContext must be used with a AuthProvider. ');
  }

  return decodedToken;
}
