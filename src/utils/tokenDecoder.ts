import { IToken, jwtDecode } from 'jwt-decode';

export function tokenDecoder(token: string | null): IToken | undefined {
  if (!token) return;

  const decodedToken: IToken = jwtDecode(token);
  return decodedToken;
}
