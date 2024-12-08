export interface IJwtPayload {
  sub: string;
  email: string;
  jti: string;
  name: string;
  exp: number;
  iat: number;
}
