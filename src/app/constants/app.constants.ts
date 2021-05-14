export class AppConstant {

  static readonly AUTH_DATA_STORAGE = 'AuthDataStorage';
  // static readonly HAS_LOGGED_IN = 'hasLoggedIn';


  // Generic
  static readonly CANCEL_MODAL = 'Cancel';
  static readonly CONFIRM_MODAL = 'Confirm';
  static readonly ADD = 'Add';
  static readonly SAVE = 'Save';
  static readonly UPDATE = 'Update';
  static readonly PROFILE = 'Profile';
  static readonly DELETE = 'Delete';
  static readonly CONFIRM = 'Confirm';
  static readonly FILTER = 'Filter';
  static readonly QUANTITY = 'Quantity';
  static readonly DETAILS = 'Details';
  static readonly DEALER_INCENTIVE = 'Dealer Incentive';


  static readonly DASHBOARD = 'Dashboard';

  // Staff
  static readonly STAFF = 'Staff';

  // Customer
  static readonly CUSTOMER = 'Customer';
  // static readonly DEALER_SEGMENT_DETAIL = 'Detail';
  // static readonly DEALER_SEGMENT_ORDER = 'Order';

  // Route
  static readonly ROUTE = 'Route';

  // Product
  static readonly PRODUCT = 'Product';

  // Payment
  static readonly PAYMENT = 'Payment';

  // Order
  static readonly ORDER = 'Order';
  static readonly ORDER_ITEM = 'OrderItem';
  static readonly INCENTIVE_MONTHLY_DATE = 1;


  // CSS Classname
  static readonly CSS_MODAL_75_PER_SCREEN = 'modal-75-percentage-screen';


  static reload() {
    document.location.reload();
  }
}
