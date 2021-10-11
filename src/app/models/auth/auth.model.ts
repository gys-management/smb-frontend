export class AuthModel {
  userName: string;
  tokenExpirationDate: Date;
  role: string;
  private _token: string;


  constructor(userName: string, token: string, tokenExp: Date, role: string) {
    this.userName = userName;
    this._token = token;
    this.tokenExpirationDate = tokenExp;
    this.role = role;
  }

  get token() {
    if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
      return null;
    }
    return this._token;
  }

  get tokenDuration() {
    if (!this.token) {
      return 0;
    }
    return this.tokenExpirationDate.getTime() - new Date().getTime();
  }
}
