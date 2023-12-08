import User from "./user";

export default class LoginResponse {
  jwt: string;
  expiration: string;
  user: User;

  constructor(jwt: string, expiration: string, user: User) {
    this.jwt = jwt;
    this.expiration = expiration;
    this.user = user;
  }
}
