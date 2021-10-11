export class AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;

  constructor(
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    localId: string,
    expiresIn: string,
    registered?: boolean
  ) {
    this.kind = kind;
    this.idToken = idToken;
    this.refreshToken = refreshToken;
    this.email = email;
    this.localId = localId;
    this.expiresIn = expiresIn;
    this.registered = registered;
  }
}
