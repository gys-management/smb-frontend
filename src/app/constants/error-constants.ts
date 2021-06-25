export class ErrorConstant {
  // Generic Error Messages
  static readonly ERR_BAD_REQUEST = 'Bad Request';
  static readonly ERR_GENERIC_CODE = 'ERR_GENERIC_EXCEPTION';
  static readonly ERR_GENERIC_EXCEPTION = 'Something went wrong. Please try again later!!!';
  static readonly NO_DATA_TO_DISPLAY = 'No data to display!';

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
  static readonly ERR_FETCH = 'Error while Fetching Product Detail. Kindly try again';
  static readonly ERR_ADDING = 'Error while Saving Product Detail. Kindly try again';
  static readonly ERR_UPDATING = 'Error while Updating Product Detail. Kindly try again';
  static readonly ERR_DELETEING = 'Error while Deleting Product Detail. Kindly try again';
  static readonly ERR_QTY_ADDING = 'Error while Adding Quantity. Kindly try again';
  static readonly ERR_PRODUCTDETAILS_FOUND = 'Product Details already exists';
  static readonly ERR_PRODUCTDETAILS_NOT_FOUND = 'Requested Product Details does not exists';
  static readonly ERR_QTY_GREATER_THAN_ZERO = 'Quanitity should be greater than zero';
  static readonly ERR_PRODUCT_CATEGORY = 'No Product Category added. Kinldy add in product category and select here';
  static readonly ERR_BRAND_MAPPING_TO_CATEGORY = 'No Brand mapped for this category. Kindly map it and try again';
  static readonly ERR_TYPE_MAPPING_TO_BRAND = 'No Type mapped for this brand. Kindly map it and try again';


  // Order Messages
  static readonly ERR_ORDER_FETCH = 'Error while Fetching Orders. Kindly try again';
  static readonly ERR_ORDER_ADDING = 'Error while Saving Orders. Kindly try again';
  static readonly ERR_ORDER_UPDATING = 'Error while Updating Orders. Kindly try again';
  static readonly ERR_DELETED = 'Error while Deleting Orders. Kindly try again';
  static readonly ERR_TOTALPAID = 'Total Paid Amount should be greater than zero and less than Total Amount';
  static readonly ERR_FETCHING_TOTAL_COUNT = 'Error while fetching product detail count. Kindly reload page';
  static readonly ERR_FETCHING_ORDER_DETAILS = 'Error while fetching order detail. Kindly reload page';
  static readonly ERR_MANDTORY_FIELDS = 'Kindly select all mandatory fields';
  static readonly ERR_SELECT_CUSTOMER = 'Kindly select the Customer';
  static readonly ERR_SELECT_PRODDUCT = 'Kindly select at least one product';
  static readonly ERR_SELECT_PAYMENTMODE = 'Kindly select Payment Mode';
  static readonly ERR_AMT_GREATER_PAYMENT = 'Amount paid should not be greater than Final Amount';
  static readonly ERR_NEGATIVE_PAYMENT = 'Amount paid should not be negative';
  static readonly ERR_FIELD_INVOICE = 'Kindly enter the Invoice';
  static readonly ERR_UPDATE_QUANTITY = 'Quantity should be more than one';
  static readonly ERR_UPDATE_QUANTITY_NULL = 'Quantity should not be null';
  static readonly ERR_UPDATE_DISCOUNT = 'Discount should not be negative';
  static readonly ERR_UPDATE_DISCOUNT_NULL = 'Discount should not be null';
  static readonly ERR_INSUFFICIENT_QUANTITY = ' quantity is insufficient';
  static readonly ERR_ORDER_CANCEL = 'Error while Cancelling Orders. Kindly try again';
  static readonly ERR_ORDER_COMPLETED = 'Error while Completed Orders. Kindly try again';
  static readonly ERR_EMAIL_SENDING = 'Error while sending Email. Kindly try again';
  static readonly ERR_EDITING_ORDERS = 'Can\'t edit completed/cancelled/Paid orders';

  // Payment
  static readonly ERR_PAYMENT_AMOUNT_INVALID = 'The payment amount is greater than the order value';

  // Org config
  static readonly ERR_FETCH_CONFIG = 'Error while fetching configuration. kindly try agian';
  static readonly ERR_UPDATE_CONFIG = 'Error while Updating configuration. kindly try agian';


  // Internet
  static readonly ERR_INTERNET = 'Check your Internet Connection!!!';

  // Dashboard
  static readonly ERR_FETCH_COUNTS = 'Error while Fetching Value. Kindly try again';


}
