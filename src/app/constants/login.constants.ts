export class LoginConstant {

  // Error Messages
  static readonly ERR_CUSTOM = 'Could not login, please try again.';
  static readonly ERR_GENERIC_EXCEPTION = 'Could not login, please try again.';
  static readonly ERR_UNAUTHENTICATED = `User not authenticate, Kindly login.`;

  static readonly ERR_INVALID_CREDENTIALS = 'The phone number or password is incorrect';
  static readonly ERR_EMAIL_NOT_REGISTERED = 'User detail is not present. kindly sign up for login';
  static readonly ERR_TOKEN_EXPIRED = 'The token has expired';
  static readonly ERR_INVALID_TOKEN = 'The token is invalid';
  static readonly ERR_USER_NOT_FOUND = 'The request user does not exists';

  // Signup details

  // Error
  static readonly ERR_REGISTRATION = 'Error while Registering. Kindly try again';
  static readonly ERR_PHONE_NUMBER_ALREADY_EXISTS = 'This phone number already exists. kindly try another';
  static readonly ERR_EMAIL_CHECK = 'Error while checking Email is already registered. Kindly try again';
  static readonly ERR_OAUTH_GOOGLE = 'Error while auth with Google. Kindly try again';

  // success
  static readonly SUCCESS_OAUTH_GOOGLE = 'Successfully singed with Google. Kindly click Next';
  static readonly SUCCESS_REGISTRATION = 'Successfully Registered. Kindly click Next';

  static readonly EMAIL_ALREADY_EXISTS = 'Organization is already registered';

}
