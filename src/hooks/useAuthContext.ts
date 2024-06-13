import { useContext } from 'react';
import { AuthContext } from '../contexts/contexts';

export function useAuthContext() {
  const decodedToken = useContext(AuthContext);

  return decodedToken;
}
