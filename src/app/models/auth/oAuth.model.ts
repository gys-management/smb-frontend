export class OAuthModel {
  name: string;
  email: string;
  given_name: string;
  family_name: string;
  providerId: string;

  constructor(
    name: string,
    email: string,
    given_name: string,
    family_name: string,
    providerId: string
  ) {
    this.name = name;
    this.email = email;
    this.given_name = given_name;
    this.family_name = family_name;
    this.providerId = providerId;
  }
}
