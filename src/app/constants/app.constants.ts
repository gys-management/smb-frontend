import { ChartOptions, ChartType } from 'chart.js';

export class AppConstant {
  // Storage Constants
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
  static readonly SUCCESS = 'success';
  static readonly CANCEL = 'cancel';

  // Dashboard
  static readonly DASHBOARD = 'Dashboard';

  // Org
  static readonly ORGINIZATION = 'Orginization';

  // Staff
  static readonly STAFF = 'Staff';

  // Customer
  static readonly CUSTOMER = 'Customer';

  // Route
  static readonly ROUTE = 'Route';

  // Product
  static readonly PRODUCT = 'Product';
  static readonly PRODUCT_CATEGORY = 'Category';
  static readonly PRODUCT_BRAND = 'Brand';
  static readonly PRODUCT_CATEGORY_STRING = 'ProductCategory';
  static readonly PRODUCT_CATEGORY_ID_PRODUCT = '60aa7f6d89477f5cff9fb1f4';
  static readonly PRODUCT_CATEGORY_ID_SERVICE = '60aa7f7889477f5cff9fb1f5';

  // Payment
  static readonly PAYMENT = 'Payment';

  // Order
  static readonly ORDER = 'Order';
  static readonly ORDER_ITEM = 'OrderItem';
  static readonly INCENTIVE_MONTHLY_DATE = 1;

  // Internet Error Messages
  static readonly NETWORK_ERROR = 'Network Error';
  static readonly ERR_INTERNET = 'No internet! Check your internet conection';

  // CSS Classname
  static readonly CSS_MODAL_75_PER_SCREEN = 'modal-75-percentage-screen';

  // Dashboard
  static readonly TOP_SELLING_PRODUCT_DEFAULT_COUNT = 5;
  static readonly PRODUCT_DETAILS_CHART_LEGEND_TITLE =
    'Number of Products Sold';
  static readonly ORDER_COUNT_CHART_LEGEND_TITLE = 'Number of Orders';

  // Default chart configs.
  static readonly DEFAULT_CHART_OPTIONS: ChartOptions = {
    responsiveAnimationDuration: 2000,
    animation: {},
    responsive: true,
  };
  static readonly CHART_TYPE: {
    [key: string]: ChartType;
  } = {
    LINE_CHART: 'line',
    PIE_CHART: 'pie',
    BAR_CHART: 'bar',
    DOUGNHUT_CHART: 'doughnut',
  };
  static readonly CHART_COLOR: {
    [key: string]: string;
  } = {
    PRIMARY: 'rgba(56,128,255,0.8)',
    SECONDARY: 'rgba(61,194,255,0.8)',
    TERTIARY: 'rgba(82,96,255,0.8)',
    SUCCESS: 'rgba(45,211,111,0.8)',
    WARNING: 'rgba(255,196,9,0.8)',
    DANGER: 'rgba(235,68,90,0.8)',
    DARK: 'rgba(34,36,40,0.8)',
    MEDIUM: 'rgba(146,148,156,0.8)',
    LIGHT: 'rgba(244,245,248,0.8)',
    CYAN: 'rgba(28,130,130,0.8)',
    STEEL_BLUE: 'rgba(123,104,238,0.8)',

    BG_PRIMARY: 'rgba(56,128,255,0.5)',
    BG_SECONDARY: 'rgba(61,194,255,0.5)',
    BG_TERTIARY: 'rgba(82,96,255,0.5)',
    BG_SUCCESS: 'rgba(45,211,111,0.5)',
    BG_WARNING: 'rgba(255,196,9,0.5)',
    BG_DANGER: 'rgba(235,68,90,0.5)',
    BG_DARK: 'rgba(34,36,40,0.5)',
    BG_MEDIUM: 'rgba(146,148,156,0.5)',
    BG_LIGHT: 'rgba(244,245,248,0.5)',
    BG_CYAN: 'rgba(28,130,130,0.5)',
    BG_STEEL_BLUE: 'rgba(123,104,238,0.5)',
  };

  static readonly countryList: string[] = ['India'];
  static readonly stateList: string[] = [
    'Andaman and Nicobar Islands',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Ladakh',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];

  static reload() {
    document.location.reload();
  }
}
