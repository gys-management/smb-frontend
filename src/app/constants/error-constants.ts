export class ErrorConstant {
  // Generic Error Messages
  static readonly ERR_BAD_REQUEST = 'Bad Request';
  static readonly ERR_GENERIC_CODE = 'ERR_GENERIC_EXCEPTION';
  static readonly ERR_GENERIC_EXCEPTION = 'Something went wrong. Please try again later!!!';

  // Login Error Messages
  static readonly ERR_CUSTOM = 'Could not login, please try again.';
  static readonly ERR_UNAUTHENTICATED = `User not authenticate, Kindly login.`;
  static readonly ERR_INVALID_CREDENTIALS = 'The LoginId or Password is incorrect';
  static readonly ERR_EMAIL_NOT_REGISTERED = 'User detail is not present. kindly sign up for login';
  static readonly ERR_TOKEN_EXPIRED = 'The token has expired';
  static readonly ERR_INVALID_TOKEN = 'The token is invalid';
  static readonly ERR_USER_NOT_FOUND = 'The request user does not exists';
  static readonly ERR_REGISTRATION = 'Error while Registering. Kindly try again';
  static readonly ERR_PHONE_NUMBER_ALREADY_EXISTS = 'This phone number already exists. kindly try another';
  static readonly ERR_EMAIL_CHECK = 'Error while checking Email is already registered. Kindly try again';
  static readonly ERR_OAUTH_GOOGLE = 'Error while auth with Google. Kindly try again';
  static readonly EMAIL_ALREADY_EXISTS = 'Organization is already registered';
  static readonly ERR_LOGIN_ID_ALREADY_EXISTS = 'This login id already exists in our system';
  static readonly ERR_UNAUTHORIZED_EXCEPTION = 'The user does not have access to the requested resource';

  // Role
  static readonly ERR_ROLE_NOT_FOUND = 'The requested role does not exists';

  // Staff Error
  static readonly ERR_STAFF_NOT_FOUND = 'The requested staff does not exists';

  // Dealer Error
  static readonly ERR_DEALER_NOT_FOUND = 'The requested dealer does not exists';

  // Route
  static readonly ERR_ROUTE_NOT_FOUND = 'The requested route does not exists';

  // Product
  static readonly ERR_PRODUCT_NOT_FOUND = 'The requested product does not exists';

  // Volume Unit
  static readonly ERR_VOLUME_UNIT_NOT_FOUND = 'The requested volume unit does not exists';

  // Gst
  static readonly ERR_GST_NOT_FOUND = 'The requested gst does not exists';

  // Order
  static readonly ERR_SELECTED_DEALER = 'Kindly select the Dealer';
  static readonly ERR_SELECTED_PRODUCT = 'Kindly select Atleast One Product & add the Quantity';
  static readonly ERR_UPDATED_PRODUCT_QUANTITY = 'Kindly Update the Quantity for ';
  static readonly ERR_FILLING_MANDATORY = 'Kindly update All Mandatory fields';

  // Product
  static readonly ERR_BRAND_MAPPING_TO_CATEGORY = 'No Brand mapped for this category. Kindly map it and try again';

  static readonly NO_DATA_TO_DISPLAY = 'No data to display!';

}
