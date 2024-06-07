import * as jwtDecode from 'jwt-decode';

declare module 'jwt-decode' {
  export interface IToken extends jwtDecode.JwtPayload {
    iat?: number;
    id?: number;
    username?: string;
    is_online?: boolean;
  }
}
