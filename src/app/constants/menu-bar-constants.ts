import { UserRole } from '../enum/user-role.enum';
import { UrlConstant } from './url.constants';


export class MenuBarConstants {
  static readonly adminMenu = [
    {
      title: 'Dashboard',
      url: UrlConstant.URL_ADMIN_DASHBOARD,
      icon: 'speedometer',
      open: '',
      role: [UserRole.ADMIN, UserRole.STAFF]
    },
    {
      title: 'People',
      icon: 'cart',
      role: [UserRole.ADMIN, UserRole.STAFF],
      subPages: [
        {
          title: 'Staff',
          url: UrlConstant.URL_ADMIN_STAFF,
          icon: 'people',
          role: [UserRole.ADMIN]
        },
        {
          title: 'Customer',
          url: UrlConstant.URL_ADMIN_CUSTOMER,
          icon: 'man',
          role: [UserRole.ADMIN, UserRole.STAFF]
        }
      ],
    },
    {
      title: 'Orders',
      url: UrlConstant.URL_ADMIN_ORDER,
      icon: 'bookmarks',
      role: [UserRole.ADMIN, UserRole.STAFF]
    },
    // {
    //     title: 'Payments',
    //     url: UrlConstant.URL_ADMIN_PAYMENTS,
    //     icon: 'cog',
    //     role: [UserRole.ADMIN, UserRole.STAFF]
    // },
    {
      title: 'Products',
      url: UrlConstant.URL_ADMIN_PRODUCTS,
      icon: 'cog',
      role: [UserRole.ADMIN, UserRole.STAFF]
    },
    {
      title: 'Routes',
      url: UrlConstant.URL_ADMIN_ROUTE,
      icon: 'car-sport',
      role: [UserRole.ADMIN, UserRole.STAFF]
    }
  ];

  static readonly customerMenu = [
    {
      title: 'Dashboard',
      url: UrlConstant.URL_CUSTOMER_DASHBOARD,
      icon: 'speedometer',
      open: '',
      role: [UserRole.CUSTOMER]
    }
  ];
}
