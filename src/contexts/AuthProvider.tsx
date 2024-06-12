import { useMemo } from 'react';
import { tokenDecoder } from '../utils/tokenDecoder';
import { AuthContext } from './contexts';

type AuthContextProps = {
  children: JSX.Element;
};

function AuthProvider({ children }: AuthContextProps) {
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
