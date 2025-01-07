import { UserRole } from '../enum/user-role.enum';
import { UrlConstant } from './url.constants';

export class MenuBarConstants {
  static readonly adminMenu = [
    {
      title: 'Dashboard',
      url: UrlConstant.URL_ADMIN_DASHBOARD,
      icon: 'speedometer',
      open: '',
      role: [UserRole.ADMIN, UserRole.STAFF],
    },
    {
      title: 'People',
      icon: 'man',
      role: [UserRole.ADMIN, UserRole.STAFF],
      subPages: [
        {
          title: 'Staff',
          url: UrlConstant.URL_ADMIN_STAFF,
          icon: 'people',
          role: [UserRole.ADMIN],
        },
        {
          title: 'Customer',
          url: UrlConstant.URL_ADMIN_CUSTOMER,
          icon: 'man',
          role: [UserRole.ADMIN, UserRole.STAFF],
        },
      ],
    },
    // {
    //   title: 'Payments',
    //   url: UrlConstant.URL_ADMIN_PAYMENTS,
    //   icon: 'cash',
    //   role: [UserRole.ADMIN, UserRole.STAFF]
    // },
    {
      title: 'Orders',
      url: UrlConstant.URL_ADMIN_ORDER,
      icon: 'bookmarks',
      role: [UserRole.ADMIN, UserRole.STAFF],
    },
    {
      title: 'Products',
      icon: 'cube',
      role: [UserRole.ADMIN],
      subPages: [
        {
          title: 'Product/Service',
          url: UrlConstant.URL_ADMIN_PRODUCTS_DETAILS,
          icon: 'rocket',
          role: [UserRole.ADMIN],
        },
        {
          title: 'Brand',
          url: UrlConstant.URL_ADMIN_PRODUCTS_BRAND,
          icon: 'tv',
          role: [UserRole.ADMIN],
        },
        // {
        //   title: 'Category',
        //   url: UrlConstant.URL_ADMIN_PRODUCTS_CATEGORY,
        //   icon: 'man',
        //   role: [UserRole.ADMIN, UserRole.STAFF]
        // }
      ],
    },
    {
      title: 'Settings',
      url: UrlConstant.URL_ADMIN_SETTINGS,
      icon: 'cog',
      role: [UserRole.ADMIN, UserRole.STAFF],
    },
  ];

  static readonly customerMenu = [
    {
      title: 'Dashboard',
      url: UrlConstant.URL_CUSTOMER_DASHBOARD,
      icon: 'speedometer',
      open: '',
      role: [UserRole.CUSTOMER],
    },
  ];
}
