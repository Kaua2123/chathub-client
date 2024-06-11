import { useMemo } from 'react';
import { tokenDecoder } from '../utils/tokenDecoder';
import { AuthContext } from './context';

type AuthProviderProps = {
  children: JSX.Element;
};

function AuthProvider({ children }: AuthProviderProps) {
  const token = localStorage.getItem('token');
  const decodedToken = useMemo(
    () => (token ? tokenDecoder(token) : undefined),
    [token],
  );

  return (
    <div>
      <AuthContext.Provider value={decodedToken}>
        {children}
      </AuthContext.Provider>
    </div>
  );
}

export default AuthProvider;
